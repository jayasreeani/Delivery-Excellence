import { query } from './db';

interface Filters {
  project?: string;
  sprint?: string;
  source?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
  search?: string;
  limit?: number;
  offset?: number;
}

function buildWhereClause(filters: Filters) {
  const conditions: string[] = [];
  const params: unknown[] = [];
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
      (SELECT COUNT(*)::int FROM work_items w WHERE w.project_id = p.id) as total_tasks,
      (SELECT COUNT(*)::int FROM work_items w WHERE w.project_id = p.id AND w.status = 'Done') as completed,
      (SELECT COUNT(*)::int FROM work_items w WHERE w.project_id = p.id AND w.status = 'In Progress') as in_progress,
      (SELECT COUNT(*)::int FROM work_items w WHERE w.project_id = p.id AND w.is_defect = true AND w.status != 'Done') as defects,
      (SELECT COALESCE(AVG(sv.velocity), 0) FROM sprint_velocity sv WHERE sv.project_id = p.id) as avg_velocity
    FROM projects p
    LEFT JOIN data_sources ds ON p.data_source_id = ds.id
    ORDER BY p.name
  `);
  return result.rows;
}

export async function getWorkItems(filters: Filters = {}) {
  const { where, params } = buildWhereClause(filters);
  const limit = filters.limit || 500;
  const offset = filters.offset || 0;

  const result = await query(
    `SELECT w.* FROM work_items w ${where} ORDER BY w.created_date DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`,
    [...params, limit, offset]
  );
  const countResult = await query<{ total: string }>(
    `SELECT COUNT(*) as total FROM work_items w ${where}`,
    params
  );
  return { items: result.rows, total: parseInt(countResult.rows[0]?.total || '0', 10) };
}

export async function getMetrics(filters: Filters = {}) {
  const { where, params } = buildWhereClause(filters);

  const kpiResult = await query<{
    total_tasks: string;
    completed: string;
    in_progress: string;
    defects: string;
  }>(`
    SELECT
      COUNT(*) as total_tasks,
      COUNT(*) FILTER (WHERE status = 'Done') as completed,
      COUNT(*) FILTER (WHERE status = 'In Progress') as in_progress,
      COUNT(*) FILTER (WHERE is_defect = true AND status != 'Done') as defects
    FROM work_items w ${where}
  `, params);

  const statusResult = await query<{ status: string; count: string }>(`
    SELECT status, COUNT(*) as count FROM work_items w ${where}
    GROUP BY status ORDER BY count DESC
  `, params);

  const projectDistResult = await query<{ project_name: string; count: string }>(`
    SELECT project_name, COUNT(*) as count FROM work_items w ${where}
    GROUP BY project_name ORDER BY count DESC
  `, params);

  const velocityResult = await query<{
    project_name: string;
    sprint_name: string;
    velocity: string;
    sprint_end_date: string;
  }>(`
    SELECT p.name as project_name, sv.sprint_name, sv.velocity, sv.sprint_end_date
    FROM sprint_velocity sv JOIN projects p ON p.id = sv.project_id
  `);

  const prevSprintResult = await query<{ prev_velocity: string }>(`
    SELECT COALESCE(AVG(sv.velocity), 0) as prev_velocity FROM sprint_velocity sv
    WHERE sv.sprint_name = (
      SELECT sprint_name FROM sprint_velocity ORDER BY sprint_end_date DESC OFFSET 1 LIMIT 1
    )
  `);

  const kpis = kpiResult.rows[0];
  const avgVelocity = velocityResult.rows.length
    ? velocityResult.rows.reduce((s, r) => s + parseFloat(r.velocity), 0) / velocityResult.rows.length
    : 0;
  const prevVelocity = parseFloat(prevSprintResult.rows[0]?.prev_velocity || String(avgVelocity));
  const velocityChange = prevVelocity ? ((avgVelocity - prevVelocity) / prevVelocity * 100) : 0;

  return {
    kpis: {
      totalTasks: parseInt(kpis.total_tasks, 10),
      completed: parseInt(kpis.completed, 10),
      inProgress: parseInt(kpis.in_progress, 10),
      defects: parseInt(kpis.defects, 10),
      avgVelocity: Math.round(avgVelocity),
      velocityChange: parseFloat(velocityChange.toFixed(1)),
      completionRate: kpis.total_tasks > 0
        ? Math.round((parseInt(kpis.completed, 10) / parseInt(kpis.total_tasks, 10)) * 100)
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

export async function getSprints() {
  const result = await query<{ sprint: string }>(
    'SELECT DISTINCT sprint FROM work_items WHERE sprint IS NOT NULL ORDER BY sprint'
  );
  return result.rows.map((r) => r.sprint);
}

export async function getSources() {
  const result = await query<{ source_system: string }>(
    'SELECT DISTINCT source_system FROM work_items ORDER BY source_system'
  );
  return result.rows.map((r) => r.source_system);
}

export async function getDataSources() {
  const result = await query('SELECT * FROM data_sources ORDER BY name');
  return result.rows;
}

export async function getAiInsights() {
  const result = await query(`
    SELECT i.*, p.name as project_name
    FROM ai_insights i
    LEFT JOIN projects p ON p.id = i.project_id
    WHERE i.is_active = true
    ORDER BY CASE i.severity WHEN 'critical' THEN 1 WHEN 'warning' THEN 2 ELSE 3 END, i.created_at DESC
  `);
  return result.rows;
}

export async function generateReport(opts: {
  reportType: string;
  audience: string;
  projectIds?: string[];
  dateFrom: string;
  dateTo: string;
  userId?: string;
}) {
  const filters: Filters = { dateFrom: opts.dateFrom, dateTo: opts.dateTo };
  if (opts.projectIds?.length === 1) filters.project = opts.projectIds[0];

  const metrics = await getMetrics(filters);
  const { items } = await getWorkItems({ ...filters, limit: 100 });

  const projects = opts.projectIds?.length
    ? (await query('SELECT * FROM projects WHERE id = ANY($1)', [opts.projectIds])).rows
    : (await query('SELECT * FROM projects')).rows;

  const insights = (await query(
    `SELECT * FROM ai_insights WHERE is_active = true
     ${opts.projectIds?.length ? 'AND (project_id = ANY($1) OR project_id IS NULL)' : ''}
     ORDER BY created_at DESC LIMIT 5`,
    opts.projectIds?.length ? [opts.projectIds] : []
  )).rows;

  const reportData = {
    generatedAt: new Date().toISOString(),
    reportType: opts.reportType,
    audience: opts.audience,
    period: { from: opts.dateFrom, to: opts.dateTo },
    projects: projects.map((p: Record<string, unknown>) => ({
      name: p.name,
      progress: p.progress_pct,
      sprint: p.current_sprint,
    })),
    metrics: metrics.kpis,
    statusDistribution: metrics.statusDistribution,
    highlights: insights.map((i: Record<string, unknown>) => ({
      title: i.title,
      description: i.description,
      severity: i.severity,
    })),
    topWorkItems: items.slice(0, 20),
  };

  const title = `${opts.reportType.charAt(0).toUpperCase() + opts.reportType.slice(1)} Report — ${opts.dateFrom} to ${opts.dateTo}`;
  const result = await query(
    `INSERT INTO reports (title, report_type, audience, project_ids, date_from, date_to, generated_by, report_data)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
    [title, opts.reportType, opts.audience, opts.projectIds || [], opts.dateFrom, opts.dateTo, opts.userId, JSON.stringify(reportData)]
  );
  return { report: result.rows[0], data: reportData };
}
