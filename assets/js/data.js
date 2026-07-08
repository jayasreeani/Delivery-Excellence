export const navItems = [
  { section: 'Overview' },
  { path: '/', label: 'Dashboard', icon: 'dashboard' },
  { section: 'People & Delivery' },
  { path: '/employees', label: 'Employees', icon: 'users' },
  { path: '/projects', label: 'Projects', icon: 'folder' },
  { path: '/talent', label: 'Talent (9-Box)', icon: 'grid' },
  { section: 'Reporting' },
  { path: '/weekly-reports', label: 'Weekly Reports', icon: 'calendar' },
  { path: '/monthly-reports', label: 'Monthly / Quarterly', icon: 'chart' },
  { path: '/risks', label: 'Risks & Issues', icon: 'alert' },
  { path: '/resources', label: 'Resources', icon: 'layers' },
  { path: '/insights', label: 'Insights', icon: 'sparkle' },
  { path: '/reports', label: 'Reports', icon: 'file' },
];

export const kpis = {
  totalEmployees: 248,
  totalProjects: 18,
  deliveryHealth: 82,
  atRiskProjects: 3,
  atRiskEmployees: 7,
};

export const projects = [
  { id: 'p1', name: 'Phoenix Modernization', status: 'green', progress: 78, velocityTrend: [42, 45, 48, 51, 49, 52], defects: 12, pm: 'Marcus Webb', team: 14, sprint: 'Sprint 12', sla: 98 },
  { id: 'p2', name: 'Cloud Migration Wave 2', status: 'amber', progress: 54, velocityTrend: [38, 36, 34, 33, 31, 29], defects: 28, pm: 'Priya Sharma', team: 10, sprint: 'Sprint 8', sla: 91 },
  { id: 'p3', name: 'Customer Portal Redesign', status: 'green', progress: 91, velocityTrend: [30, 32, 35, 36, 38, 40], defects: 8, pm: 'James Liu', team: 8, sprint: 'Sprint 15', sla: 99 },
  { id: 'p4', name: 'Data Platform Initiative', status: 'red', progress: 32, velocityTrend: [25, 22, 20, 18, 16, 14], defects: 45, pm: 'Elena Rodriguez', team: 12, sprint: 'Sprint 6', sla: 82 },
  { id: 'p5', name: 'Mobile App v3.0', status: 'amber', progress: 67, velocityTrend: [28, 30, 29, 27, 26, 25], defects: 19, pm: 'David Kim', team: 9, sprint: 'Sprint 10', sla: 94 },
  { id: 'p6', name: 'Security Compliance 2026', status: 'green', progress: 85, velocityTrend: [20, 22, 24, 25, 26, 28], defects: 5, pm: 'Sarah Chen', team: 6, sprint: 'Sprint 9', sla: 100 },
];

export const employees = [
  { id: 'e1', name: 'Alexandra Torres', role: 'Senior Software Engineer', skills: ['React', 'Node.js', 'AWS'], performance: 'High', availability: 'Allocated', experience: '8 yrs', project: 'Phoenix Modernization', potential: 'high', performanceLevel: 'high', tags: ['High Potential', 'Key Contributor'], nineBox: 'Star', leaveDays: 12, certifications: ['AWS Solutions Architect', 'Scrum Master'], interests: 'Technical leadership, cloud architecture', awards: ['Innovation Award 2025'], managerNotes: 'Exceptional delivery track record. Ready for principal role.' },
  { id: 'e2', name: 'Michael O\'Brien', role: 'Project Manager', skills: ['Agile', 'Jira', 'Stakeholder Mgmt'], performance: 'High', availability: 'Allocated', experience: '12 yrs', project: 'Cloud Migration Wave 2', potential: 'high', performanceLevel: 'high', tags: ['Key Contributor'], nineBox: 'Future Star', leaveDays: 8, certifications: ['PMP', 'SAFe Agilist'], interests: 'Program management, mentoring', awards: ['PM Excellence 2024'], managerNotes: 'Strong cross-functional leadership.' },
  { id: 'e3', name: 'Priya Sharma', role: 'Engineering Lead', skills: ['Java', 'Azure', 'DevOps'], performance: 'High', availability: 'Partial', experience: '10 yrs', project: 'Cloud Migration Wave 2', potential: 'medium', performanceLevel: 'high', tags: ['Key Contributor'], nineBox: 'Core Player', leaveDays: 15, certifications: ['Azure DevOps Expert'], interests: 'Platform engineering', awards: [], managerNotes: 'Reliable delivery lead for complex migrations.' },
  { id: 'e4', name: 'James Liu', role: 'UX Design Lead', skills: ['Figma', 'Design Systems', 'Research'], performance: 'High', availability: 'Allocated', experience: '7 yrs', project: 'Customer Portal Redesign', potential: 'high', performanceLevel: 'high', tags: ['High Potential'], nineBox: 'Star', leaveDays: 10, certifications: ['Google UX Design'], interests: 'Design leadership', awards: ['Design Excellence 2025'], managerNotes: 'Drives user-centric outcomes consistently.' },
  { id: 'e5', name: 'Elena Rodriguez', role: 'Data Architect', skills: ['Python', 'Spark', 'SQL'], performance: 'Medium', availability: 'Allocated', experience: '9 yrs', project: 'Data Platform Initiative', potential: 'medium', performanceLevel: 'medium', tags: [], nineBox: 'Solid Performer', leaveDays: 18, certifications: ['Databricks Certified'], interests: 'Data governance', awards: [], managerNotes: 'Needs support on project timeline pressures.' },
  { id: 'e6', name: 'David Kim', role: 'Mobile Developer', skills: ['React Native', 'iOS', 'Android'], performance: 'Medium', availability: 'Available', experience: '5 yrs', project: 'Mobile App v3.0', potential: 'high', performanceLevel: 'medium', tags: ['High Potential'], nineBox: 'Future Star', leaveDays: 6, certifications: ['Apple Developer'], interests: 'Mobile architecture', awards: [], managerNotes: 'Growing quickly, high upside potential.' },
  { id: 'e7', name: 'Rachel Nguyen', role: 'QA Engineer', skills: ['Automation', 'Selenium', 'API Testing'], performance: 'High', availability: 'Allocated', experience: '6 yrs', project: 'Phoenix Modernization', potential: 'medium', performanceLevel: 'high', tags: ['Key Contributor'], nineBox: 'Core Player', leaveDays: 14, certifications: ['ISTQB Advanced'], interests: 'Test strategy', awards: ['Quality Champion 2024'], managerNotes: 'Critical to release quality.' },
  { id: 'e8', name: 'Tom Bradley', role: 'DevOps Engineer', skills: ['Kubernetes', 'Terraform', 'CI/CD'], performance: 'Low', availability: 'Over-allocated', experience: '4 yrs', project: 'Multiple', potential: 'low', performanceLevel: 'low', tags: ['At Risk'], nineBox: 'Risk', leaveDays: 22, certifications: ['CKA'], interests: 'Infrastructure automation', awards: [], managerNotes: 'Burnout signals detected. Immediate attention needed.' },
  { id: 'e9', name: 'Sophie Martin', role: 'Business Analyst', skills: ['Requirements', 'Process Mapping', 'SQL'], performance: 'Medium', availability: 'Allocated', experience: '6 yrs', project: 'Security Compliance 2026', potential: 'medium', performanceLevel: 'medium', tags: [], nineBox: 'Solid Performer', leaveDays: 11, certifications: ['CBAP'], interests: 'Product strategy', awards: [], managerNotes: 'Steady contributor on compliance work.' },
  { id: 'e10', name: 'Kevin Patel', role: 'Full Stack Developer', skills: ['Angular', '.NET', 'Azure'], performance: 'High', availability: 'Allocated', experience: '7 yrs', project: 'Phoenix Modernization', potential: 'high', performanceLevel: 'high', tags: ['Key Contributor'], nineBox: 'Star', leaveDays: 9, certifications: ['Microsoft Azure Developer'], interests: 'Full-stack architecture', awards: ['Spot Award Q1 2026'], managerNotes: 'Top performer on Phoenix team.' },
];

export const nineBoxMatrix = {
  cells: [
    { row: 0, col: 0, label: 'Enigma', category: 'Enigma', count: 4, type: 'under', description: 'Low performance, high potential — needs coaching and role clarity.' },
    { row: 0, col: 1, label: 'Future Star', category: 'Future Star', count: 12, type: 'future', description: 'Moderate performance with high potential — invest in development.' },
    { row: 0, col: 2, label: 'Star', category: 'Star', count: 18, type: 'star', description: 'High performance and high potential — retain and promote.' },
    { row: 1, col: 0, label: 'Dilemma', category: 'Dilemma', count: 6, type: 'risk', description: 'Low performance and potential — performance plan required.' },
    { row: 1, col: 1, label: 'Core Player', category: 'Core Player', count: 89, type: 'core', description: 'Reliable performers — backbone of the organization.' },
    { row: 1, col: 2, label: 'High Performer', category: 'High Performer', count: 42, type: 'star', description: 'Strong performers — recognize and reward.' },
    { row: 2, col: 0, label: 'Risk', category: 'Risk', count: 7, type: 'risk', description: 'Low performance, low potential — attrition or role change risk.' },
    { row: 2, col: 1, label: 'Solid Performer', category: 'Solid Performer', count: 52, type: 'solid', description: 'Consistent contributors — maintain engagement.' },
    { row: 2, col: 2, label: 'Trusted Professional', category: 'Trusted Professional', count: 18, type: 'core', description: 'High performance, moderate potential — subject matter experts.' },
  ],
};

export const alerts = [
  { id: 'a1', type: 'project', severity: 'red', title: 'Data Platform Initiative — Sprint delay', description: 'Velocity declined 44% over 6 sprints. Release date at risk.', priority: 'P1', time: '2h ago' },
  { id: 'a2', type: 'project', severity: 'amber', title: 'Cloud Migration — High defect rate', description: '28 open defects, 40% above threshold for this phase.', priority: 'P2', time: '4h ago' },
  { id: 'a3', type: 'people', severity: 'red', title: 'Burnout signal — Tom Bradley', description: 'Over-allocated 140% across 3 projects. Leave balance high.', priority: 'P1', time: '1h ago' },
  { id: 'a4', type: 'people', severity: 'amber', title: 'Attrition risk — 3 employees flagged', description: 'Engagement scores dropped in Q2 pulse survey.', priority: 'P2', time: '6h ago' },
  { id: 'a5', type: 'project', severity: 'amber', title: 'Mobile App v3.0 — Velocity declining', description: 'Trend shows 11% drop over last 3 sprints.', priority: 'P3', time: '8h ago' },
];

export const aiInsights = [
  { id: 'i1', type: 'project', text: 'Data Platform Initiative showing declining velocity — recommend sprint retrospective and scope review.', action: 'View Project' },
  { id: 'i2', type: 'people', text: '3 employees are at attrition risk based on engagement and workload signals.', action: 'View Talent Matrix' },
  { id: 'i3', type: 'resource', text: 'Resource over-allocation detected: 4 team members above 110% utilization.', action: 'View Resources' },
  { id: 'i4', type: 'delivery', text: 'Overall delivery predictability improved 6% this quarter — Phoenix and Portal leading.', action: 'View Analytics' },
];

export const teamMetrics = {
  totalSize: 248,
  available: 42,
  allocated: 198,
  overUtilized: 14,
  skillDistribution: [
    { skill: 'Engineering', count: 98 },
    { skill: 'QA / Testing', count: 32 },
    { skill: 'DevOps', count: 28 },
    { skill: 'Design / UX', count: 22 },
    { skill: 'PM / BA', count: 38 },
    { skill: 'Data / Analytics', count: 30 },
  ],
  performanceDistribution: [
    { level: 'Exceeds', count: 68, color: '#10b981' },
    { level: 'Meets', count: 142, color: '#6366f1' },
    { level: 'Developing', count: 31, color: '#f59e0b' },
    { level: 'Below', count: 7, color: '#ef4444' },
  ],
};

export const resourceUtilization = [
  { name: 'Phoenix Modernization', allocation: [95, 100, 88, 92, 85, 90, 78, 95] },
  { name: 'Cloud Migration', allocation: [80, 85, 110, 105, 90, 88, 92, 85] },
  { name: 'Portal Redesign', allocation: [70, 75, 80, 78, 72, 68, 65, 70] },
  { name: 'Data Platform', allocation: [100, 105, 115, 120, 110, 108, 112, 105] },
  { name: 'Mobile App', allocation: [85, 88, 90, 92, 88, 85, 80, 82] },
  { name: 'Security Compliance', allocation: [60, 65, 70, 68, 72, 75, 70, 65] },
];

export const weeklySummary = {
  completed: ['Phoenix Sprint 12 delivered 34 story points', 'Portal redesign UAT sign-off achieved', 'Security audit phase 1 completed'],
  planned: ['Cloud Migration cutover planning', 'Data Platform architecture review', 'Mobile App beta release prep'],
  achievements: ['Delivery health score up 4 points', '2 critical defects resolved ahead of SLA', 'New hire onboarding completed for 3 engineers'],
  risks: ['Data Platform timeline slip — 2 week delay projected', 'Key DevOps resource over-allocated', 'Third-party API dependency unresolved'],
};

export const velocityTrend = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  data: [180, 195, 188, 210, 205, 218],
};

export const defectTrend = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  data: [145, 132, 128, 118, 112, 98],
};

export const predictabilityTrend = {
  labels: ['Q1', 'Q2', 'Q3', 'Q4'],
  data: [72, 76, 79, 82],
};

export const reportTemplates = [
  { id: 'weekly', title: 'Weekly Status Report', desc: 'Sprint progress, achievements, risks, and next steps', icon: 'calendar', period: 'Weekly' },
  { id: 'monthly', title: 'Monthly Delivery Report', desc: 'KPIs, project health, resource utilization summary', icon: 'chart', period: 'Monthly' },
  { id: 'quarterly', title: 'Quarterly Business Review', desc: 'Executive summary, talent insights, strategic recommendations', icon: 'file', period: 'Quarterly' },
];

export const icons = {
  dashboard: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
  users: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  folder: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>',
  grid: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>',
  calendar: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
  chart: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
  alert: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  layers: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>',
  sparkle: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.9 5.8H4.5L10 13.5 8.1 19.3 12 15.8l3.9 3.5L14 13.5l5.5-4.7h-5.6L12 3Z"/></svg>',
  file: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
};

export function getEmployeeById(id) {
  return employees.find(e => e.id === id);
}

export function getProjectById(id) {
  return getAllProjects().find((p) => p.id === id);
}

const CUSTOM_PROJECTS_KEY = 'team360_custom_projects';

function loadCustomProjects() {
  try {
    const raw = localStorage.getItem(CUSTOM_PROJECTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCustomProjects(list) {
  localStorage.setItem(CUSTOM_PROJECTS_KEY, JSON.stringify(list));
}

export function getAllProjects() {
  return [...projects, ...loadCustomProjects()];
}

export function addProject(input) {
  const name = input.name?.trim();
  if (!name) throw new Error('Project name is required');

  const custom = loadCustomProjects();
  const progress = Math.min(100, Math.max(0, Number(input.progress) || 0));
  const project = {
    id: `p${Date.now()}`,
    name,
    status: input.status || 'green',
    progress,
    velocityTrend: [20, 22, 24, 26, 28, 30],
    defects: Number(input.defects) || 0,
    pm: input.pm?.trim() || 'Unassigned',
    team: Number(input.team) || 5,
    sprint: input.sprint?.trim() || 'Sprint 1',
    sla: Number(input.sla) || 95,
    description: input.description?.trim() || '',
    custom: true,
  };

  custom.push(project);
  saveCustomProjects(custom);
  return project;
}

export function getEmployeesInNineBoxCell(row, col) {
  const cell = nineBoxMatrix.cells.find(c => c.row === row && c.col === col);
  if (!cell) return [];
  return employees.filter(e => e.nineBox === cell.category).slice(0, 8);
}

export function getStatusBadge(status) {
  const map = {
    green: '<span class="badge badge-green"><span class="status-dot status-green"></span> Healthy</span>',
    amber: '<span class="badge badge-amber"><span class="status-dot status-amber"></span> At Risk</span>',
    red: '<span class="badge badge-red"><span class="status-dot status-red"></span> Critical</span>',
  };
  return map[status] || map.amber;
}

export function getPerformanceBadge(perf) {
  const map = {
    High: '<span class="badge badge-green">High</span>',
    Medium: '<span class="badge badge-amber">Medium</span>',
    Low: '<span class="badge badge-red">Low</span>',
  };
  return map[perf] || map.Medium;
}
