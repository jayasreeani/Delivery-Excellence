import { query } from '../db/pool.js';
import { syncJiraInstance, getJiraConfig } from '../integrations/jira.js';
import { syncAzureDevOps } from '../integrations/azureDevOps.js';

function buildWhereClause(filters) {
  const conditions = [];
  const params = [];
  let idx = 1;

  if (filters.project) {
    conditions.push(`w.project_id = $${idx++}`);
    params.push(filters.project);
  }
  if (filters.sprint) {
    conditions.push(`w.sprint = $${idx++}`);
    params.push(filters.sprint);
  }
  if (filters.source) {
    conditions.push(`w.source_system = $${idx++}`);
    params.push(filters.source);
  }
  if (filters.status) {
    conditions.push(`w.status = $${idx++}`);
    params.push(filters.status);
  }
  if (filters.dateFrom) {
    conditions.push(`w.created_date >= $${idx++}`);
    params.push(filters.dateFrom);
  }
  if (filters.dateTo) {
    conditions.push(`w.created_date <= $${idx++}`);
    params.push(filters.dateTo);
  }
  if (filters.search) {
    conditions.push(`(w.title ILIKE $${idx} OR w.work_item_id ILIKE $${idx})`);
    params.push(`%${filters.search}%`);
    idx++;
  }

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  return { where, params };
}

export async function getProjects() {
  const result = await query(`
    SELECT p.*, ds.name as data_source_name, ds.status as data_source_status,
      (SELECT COUNT(*) FROM work_items w WHERE w.project_id = p.id) as total_tasks,
      (SELECT COUNT(*) FROM work_items w WHERE w.project_id = p.id AND w.status = 'Done') as completed,
      (SELECT COUNT(*) FROM work_items w WHERE w.project_id = p.id AND w.status = 'In Progress') as in_progress,
      (SELECT COUNT(*) FROM work_items w WHERE w.project_id = p.id AND w.is_defect = true AND w.status != 'Done') as defects,
      (SELECT COALESCE(AVG(sv.velocity), 0) FROM sprint_velocity sv WHERE sv.project_id = p.id) as avg_velocity
    FROM projects p
    LEFT JOIN data_sources ds ON p.data_source_id = ds.id
    ORDER BY p.name
  `);
  return result.rows;
}

export async function getProjectBySlug(slug) {
  const result = await query('SELECT * FROM projects WHERE slug = $1', [slug]);
  return result.rows[0];
}

function slugify(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

async function uniqueSlug(baseSlug) {
  let slug = baseSlug;
  let suffix = 2;
  while (true) {
    const existing = await query('SELECT id FROM projects WHERE slug = $1', [slug]);
    if (!existing.rows.length) return slug;
    slug = `${baseSlug}-${suffix++}`;
  }
}

export async function createProject(input) {
  const name = input.name?.trim();
  if (!name) throw new Error('Project name is required');

  const slug = await uniqueSlug(slugify(name));
  const progress = Math.min(100, Math.max(0, Number(input.progress_pct) || 0));
  const sourceTags = Array.isArray(input.source_tags)
    ? input.source_tags
    : (input.source_tags ? String(input.source_tags).split(',').map((t) => t.trim()).filter(Boolean) : []);

  const result = await query(
    `INSERT INTO projects (name, slug, description, data_source_id, source_tags, current_sprint, progress_pct)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [
      name,
      slug,
      input.description?.trim() || null,
      input.data_source_id || null,
      sourceTags,
      input.current_sprint?.trim() || null,
      progress,
    ]
  );

  return getProjects().then((projects) => projects.find((p) => p.id === result.rows[0].id) || result.rows[0]);
}

export async function getWorkItems(filters = {}) {
  const { where, params } = buildWhereClause(filters);
  const limit = filters.limit || 500;
  const offset = filters.offset || 0;

  const result = await query(
    `SELECT w.* FROM work_items w ${where} ORDER BY w.created_date DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`,
    [...params, limit, offset]
  );

  const countResult = await query(
    `SELECT COUNT(*) as total FROM work_items w ${where}`,
    params
  );

  return { items: result.rows, total: parseInt(countResult.rows[0].total, 10) };
}

export async function getMetrics(filters = {}) {
  const { where, params } = buildWhereClause(filters);

  const kpiResult = await query(`
    SELECT
      COUNT(*) as total_tasks,
      COUNT(*) FILTER (WHERE status = 'Done') as completed,
      COUNT(*) FILTER (WHERE status = 'In Progress') as in_progress,
      COUNT(*) FILTER (WHERE is_defect = true AND status != 'Done') as defects,
      COALESCE(SUM(effort) FILTER (WHERE status = 'Done'), 0) as total_effort_done
    FROM work_items w ${where}
  `, params);

  const statusResult = await query(`
    SELECT status, COUNT(*) as count
    FROM work_items w ${where}
    GROUP BY status ORDER BY count DESC
  `, params);

  const projectDistResult = await query(`
    SELECT project_name, COUNT(*) as count
    FROM work_items w ${where}
    GROUP BY project_name ORDER BY count DESC
  `, params);

  const velocityResult = await query(`
    SELECT p.name as project_name, sv.sprint_name, sv.velocity, sv.sprint_end_date
    FROM sprint_velocity sv
    JOIN projects p ON p.id = sv.project_id
  `);

  const prevSprintResult = await query(`
    SELECT COALESCE(AVG(sv.velocity), 0) as prev_velocity
    FROM sprint_velocity sv
    WHERE sv.sprint_name = (
      SELECT sprint_name FROM sprint_velocity
      ORDER BY sprint_end_date DESC OFFSET 1 LIMIT 1
    )
  `);

  const kpis = kpiResult.rows[0];
  const avgVelocity = velocityResult.rows.length
    ? velocityResult.rows.reduce((s, r) => s + parseFloat(r.velocity), 0) / velocityResult.rows.length
    : 0;
  const prevVelocity = parseFloat(prevSprintResult.rows[0]?.prev_velocity || avgVelocity);
  const velocityChange = prevVelocity ? ((avgVelocity - prevVelocity) / prevVelocity * 100).toFixed(1) : 0;

  return {
    kpis: {
      totalTasks: parseInt(kpis.total_tasks, 10),
      completed: parseInt(kpis.completed, 10),
      inProgress: parseInt(kpis.in_progress, 10),
      defects: parseInt(kpis.defects, 10),
      avgVelocity: Math.round(avgVelocity),
      velocityChange: parseFloat(velocityChange),
      completionRate: kpis.total_tasks > 0
        ? Math.round((kpis.completed / kpis.total_tasks) * 100)
        : 0,
    },
    statusDistribution: statusResult.rows.map((r) => ({
      status: r.status,
      count: parseInt(r.count, 10),
    })),
    projectDistribution: projectDistResult.rows.map((r) => ({
      name: r.project_name,
      value: parseInt(r.count, 10),
    })),
    velocityTrend: velocityResult.rows.map((r) => ({
      project: r.project_name,
      sprint: r.sprint_name,
      velocity: parseFloat(r.velocity),
      date: r.sprint_end_date,
    })),
  };
}

export async function getDataSources() {
  const result = await query('SELECT * FROM data_sources ORDER BY name');
  return result.rows;
}

export async function refreshDataSource(instanceKey) {
  const dsResult = await query('SELECT * FROM data_sources WHERE instance_key = $1', [instanceKey]);
  const dataSource = dsResult.rows[0];
  if (!dataSource) throw new Error('Data source not found');

  try {
    let items = [];
    if (instanceKey === 'jira1' || instanceKey === 'jira2') {
      const config = getJiraConfig(instanceKey);
      items = await syncJiraInstance(instanceKey, config);
    } else if (instanceKey === 'azure_devops') {
      items = await syncAzureDevOps();
    }

    const projectResult = await query(
      'SELECT id FROM projects WHERE data_source_id = $1 LIMIT 1',
      [dataSource.id]
    );
    const projectId = projectResult.rows[0]?.id;

    for (const item of items) {
      await query(
        `INSERT INTO work_items (project_id, project_name, work_item_id, title, status, priority, sprint, effort, assigned_to, created_date, closed_date, source_system, is_defect)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
         ON CONFLICT (source_system, work_item_id) DO UPDATE SET
           title = EXCLUDED.title, status = EXCLUDED.status, priority = EXCLUDED.priority,
           sprint = EXCLUDED.sprint, effort = EXCLUDED.effort, assigned_to = EXCLUDED.assigned_to,
           closed_date = EXCLUDED.closed_date, is_defect = EXCLUDED.is_defect`,
        [projectId, item.project_name, item.work_item_id, item.title, item.status, item.priority, item.sprint, item.effort, item.assigned_to, item.created_date, item.closed_date, item.source_system, item.is_defect]
      );
    }

    await query(
      'UPDATE data_sources SET status = $1, last_sync_at = NOW(), last_error = NULL WHERE instance_key = $2',
      ['connected', instanceKey]
    );

    return { success: true, synced: items.length };
  } catch (err) {
    await query(
      'UPDATE data_sources SET status = $1, last_error = $2 WHERE instance_key = $3',
      ['error', err.message, instanceKey]
    );
    throw err;
  }
}

export async function generateReport({ reportType, audience, projectIds, dateFrom, dateTo, userId }) {
  const filters = { dateFrom, dateTo };
  if (projectIds?.length === 1) filters.project = projectIds[0];

  const metrics = await getMetrics(filters);
  const { items } = await getWorkItems({ ...filters, limit: 100 });

  const projects = projectIds?.length
    ? (await query('SELECT * FROM projects WHERE id = ANY($1)', [projectIds])).rows
    : (await query('SELECT * FROM projects')).rows;

  const insights = (await query(
    `SELECT * FROM ai_insights WHERE is_active = true
     ${projectIds?.length ? 'AND (project_id = ANY($1) OR project_id IS NULL)' : ''}
     ORDER BY created_at DESC LIMIT 5`,
    projectIds?.length ? [projectIds] : []
  )).rows;

  const reportData = {
    generatedAt: new Date().toISOString(),
    reportType,
    audience,
    period: { from: dateFrom, to: dateTo },
    projects: projects.map((p) => ({ name: p.name, progress: p.progress_pct, sprint: p.current_sprint })),
    metrics: metrics.kpis,
    statusDistribution: metrics.statusDistribution,
    highlights: insights.map((i) => ({ title: i.title, description: i.description, severity: i.severity })),
    topWorkItems: items.slice(0, 20),
  };

  const title = `${reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report — ${dateFrom} to ${dateTo}`;
  const result = await query(
    `INSERT INTO reports (title, report_type, audience, project_ids, date_from, date_to, generated_by, report_data)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
    [title, reportType, audience, projectIds || [], dateFrom, dateTo, userId, JSON.stringify(reportData)]
  );

  return { report: result.rows[0], data: reportData };
}

export async function getAiInsights() {
  const result = await query(`
    SELECT i.*, p.name as project_name
    FROM ai_insights i
    LEFT JOIN projects p ON p.id = i.project_id
    WHERE i.is_active = true
    ORDER BY
      CASE i.severity WHEN 'critical' THEN 1 WHEN 'warning' THEN 2 ELSE 3 END,
      i.created_at DESC
  `);
  return result.rows;
}

export async function getSprints() {
  const result = await query('SELECT DISTINCT sprint FROM work_items WHERE sprint IS NOT NULL ORDER BY sprint');
  return result.rows.map((r) => r.sprint);
}

export async function getSources() {
  const result = await query('SELECT DISTINCT source_system FROM work_items ORDER BY source_system');
  return result.rows.map((r) => r.source_system);
}
