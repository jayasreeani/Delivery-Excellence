import path from 'path';
import { pathToFileURL } from 'url';
import bcrypt from 'bcryptjs';
import { query } from './pool.js';

const STATUSES = ['To Do', 'In Progress', 'Review', 'Done', 'Blocked'];
const PRIORITIES = ['Highest', 'High', 'Medium', 'Low', 'Lowest'];
const ASSIGNEES = [
  'Alex Torres', 'Priya Sharma', 'James Liu', 'David Kim',
  'Rachel Nguyen', 'Kevin Patel', 'Sophie Martin', 'Tom Bradley',
];

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDate(daysAgo) {
  const d = new Date();
  d.setDate(d.getDate() - Math.floor(Math.random() * daysAgo));
  return d.toISOString().split('T')[0];
}

function generateWorkItems(project, count, prefix, sourceSystem, defectRate = 0.08) {
  const items = [];
  for (let i = 1; i <= count; i++) {
    const status = i <= count * 0.78 ? 'Done' : randomItem(STATUSES.filter((s) => s !== 'Done'));
    const isDefect = Math.random() < defectRate;
    const created = randomDate(90);
    const closed = status === 'Done' ? randomDate(30) : null;
    items.push({
      project_name: project.name,
      work_item_id: `${prefix}-${1000 + i}`,
      title: isDefect
        ? `Defect: ${['Login failure', 'UI alignment', 'API timeout', 'Data sync error'][i % 4]} #${i}`
        : `${['Implement', 'Update', 'Refactor', 'Design', 'Test'][i % 5]} feature module ${i}`,
      status: isDefect && status === 'Done' ? 'Done' : status,
      priority: randomItem(PRIORITIES),
      sprint: project.current_sprint || `Sprint ${Math.ceil(i / 15)}`,
      effort: Math.floor(Math.random() * 8) + 1,
      assigned_to: randomItem(ASSIGNEES),
      created_date: created,
      closed_date: closed,
      source_system: sourceSystem,
      is_defect: isDefect,
    });
  }
  return items;
}

const DATA_SOURCES = [
  { name: 'Jira Instance 1', type: 'jira', instance_key: 'jira1', base_url: 'https://slavic401k.atlassian.net', status: 'connected' },
  { name: 'Jira Instance 2', type: 'jira', instance_key: 'jira2', base_url: 'https://slavic-mobile.atlassian.net', status: 'connected' },
  { name: 'Azure DevOps', type: 'azure_devops', instance_key: 'azure_devops', base_url: 'https://dev.azure.com/slavic401k', status: 'connected' },
];

const PROJECTS = [
  {
    name: '401k Web + Salesforce',
    slug: '401k-web-salesforce',
    description: 'Web platform and Salesforce integration',
    source_tags: ['Jira Instance 1', 'Salesforce'],
    current_sprint: 'Sprint 12',
    progress_pct: 75,
    source_key: 'jira1',
    item_count: 156,
    prefix: 'WEB',
    defect_rate: 0.04,
  },
  {
    name: '401k Mobile',
    slug: '401k-mobile',
    description: 'iOS and Android mobile application',
    source_tags: ['Jira Instance 2', 'iOS/Android'],
    current_sprint: 'Sprint 8',
    progress_pct: 62,
    source_key: 'jira2',
    item_count: 85,
    prefix: 'MOB',
    defect_rate: 0.12,
  },
  {
    name: 'GoGym',
    slug: 'gogym',
    description: 'Health & fitness platform',
    source_tags: ['Azure DevOps', 'Health & Fitness'],
    current_sprint: 'Sprint 15',
    progress_pct: 80,
    source_key: 'azure_devops',
    item_count: 124,
    prefix: 'GG',
    defect_rate: 0.03,
  },
];

const VELOCITY_DATA = {
  '401k-web-salesforce': [38, 40, 39, 41, 42, 42],
  '401k-mobile': [32, 34, 33, 36, 35, 35],
  gogym: [36, 38, 39, 40, 41, 40],
};

const AI_INSIGHTS = [
  { insight_type: 'velocity_drop', severity: 'warning', title: 'Velocity decline on 401k Mobile', description: '401k Mobile velocity dropped 5% compared to last sprint. Review sprint capacity and blockers.', project_slug: '401k-mobile' },
  { insight_type: 'risk', severity: 'critical', title: 'Elevated defect count on 401k Mobile', description: '10 open defects exceed the project threshold. Prioritize bug triage.', project_slug: '401k-mobile' },
  { insight_type: 'positive', severity: 'info', title: 'GoGym ahead of schedule', description: 'GoGym is at 80% completion with strong velocity trend.', project_slug: 'gogym' },
  { insight_type: 'velocity_drop', severity: 'warning', title: 'In Progress tasks accumulating', description: '67 tasks in progress across all projects — monitor WIP limits.', project_slug: null },
];

export async function seedDatabase() {
  console.log('Seeding database...');

  await query('DELETE FROM ai_insights');
  await query('DELETE FROM reports');
  await query('DELETE FROM sprint_velocity');
  await query('DELETE FROM work_items');
  await query('DELETE FROM projects');
  await query('DELETE FROM data_sources');
  await query('DELETE FROM users');

  const passwordHash = await bcrypt.hash('password123', 10);
  await query(
    `INSERT INTO users (email, password_hash, name, role) VALUES
     ($1, $2, 'Admin User', 'management'),
     ($3, $2, 'Client Viewer', 'client')`,
    ['admin@delivery.com', passwordHash, 'client@delivery.com']
  );

  const sourceIds = {};
  for (const ds of DATA_SOURCES) {
    const result = await query(
      `INSERT INTO data_sources (name, type, instance_key, base_url, status, last_sync_at)
       VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING id`,
      [ds.name, ds.type, ds.instance_key, ds.base_url, ds.status]
    );
    sourceIds[ds.instance_key] = result.rows[0].id;
  }

  const projectIds = {};
  for (const p of PROJECTS) {
    const result = await query(
      `INSERT INTO projects (name, slug, description, data_source_id, source_tags, current_sprint, progress_pct)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
      [p.name, p.slug, p.description, sourceIds[p.source_key], p.source_tags, p.current_sprint, p.progress_pct]
    );
    projectIds[p.slug] = result.rows[0].id;

    const sourceSystem = p.source_key === 'azure_devops' ? 'Azure DevOps' : `Jira ${p.source_key === 'jira1' ? '1' : '2'}`;
    const items = generateWorkItems(p, p.item_count, p.prefix, sourceSystem, p.defect_rate);

    for (const item of items) {
      await query(
        `INSERT INTO work_items (project_id, project_name, work_item_id, title, status, priority, sprint, effort, assigned_to, created_date, closed_date, source_system, is_defect)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
        [result.rows[0].id, item.project_name, item.work_item_id, item.title, item.status, item.priority, item.sprint, item.effort, item.assigned_to, item.created_date, item.closed_date, item.source_system, item.is_defect]
      );
    }

    const velocities = VELOCITY_DATA[p.slug];
    for (let i = 0; i < velocities.length; i++) {
      await query(
        `INSERT INTO sprint_velocity (project_id, sprint_name, velocity, sprint_end_date)
         VALUES ($1, $2, $3, $4)`,
        [result.rows[0].id, `Sprint ${i + 7}`, velocities[i], randomDate(60 - i * 10)]
      );
    }
  }

  for (const insight of AI_INSIGHTS) {
    const projectId = insight.project_slug ? projectIds[insight.project_slug] : null;
    await query(
      `INSERT INTO ai_insights (insight_type, severity, title, description, project_id)
       VALUES ($1, $2, $3, $4, $5)`,
      [insight.insight_type, insight.severity, insight.title, insight.description, projectId]
    );
  }

  console.log('Seed complete.');
  console.log('  Users: admin@delivery.com / password123 (management)');
  console.log('         client@delivery.com / password123 (client)');
}

if (import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
