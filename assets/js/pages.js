import {
  kpis, projects, employees, alerts, aiInsights, teamMetrics,
  resourceUtilization, weeklySummary, velocityTrend, defectTrend,
  predictabilityTrend, reportTemplates, getEmployeeById, getProjectById
} from './data.js';

import {
  renderKPICards, renderProjectTable, renderNineBox, renderAlerts,
  renderAIInsights, renderResourceHeatmap, destroyCharts, initSparklines,
  initLineChart, initBarChart, initDoughnutChart, showToast, bindNineBoxClicks,
  getStatusBadge, getPerformanceBadge
} from './components.js';

export function renderDashboard() {
  return `
    <div class="page-header">
      <h1 class="page-title">Executive Dashboard</h1>
      <p class="page-subtitle">Unified control tower — people, projects, and delivery health at a glance</p>
    </div>

    ${renderKPICards(kpis)}

    <div class="section">
      ${renderProjectTable(projects.slice(0, 5))}
    </div>

    <div class="grid-2 section">
      <div class="card">
        <div class="card-header"><div><div class="card-title">Team Overview</div><div class="card-subtitle">Capacity and composition</div></div></div>
        <div class="card-body">
          <div class="info-grid" style="margin-bottom:20px">
            <div class="info-item"><label>Total Team Size</label><span>${teamMetrics.totalSize}</span></div>
            <div class="info-item"><label>Available</label><span style="color:var(--success)">${teamMetrics.available}</span></div>
            <div class="info-item"><label>Allocated</label><span>${teamMetrics.allocated}</span></div>
            <div class="info-item"><label>Over-utilized</label><span style="color:var(--danger)">${teamMetrics.overUtilized}</span></div>
          </div>
          <div class="grid-2" style="gap:16px">
            <div>
              <div style="font-size:12px;font-weight:600;color:var(--gray-600);margin-bottom:8px">Skill Distribution</div>
              <div class="chart-container-sm"><canvas id="skill-chart"></canvas></div>
            </div>
            <div>
              <div style="font-size:12px;font-weight:600;color:var(--gray-600);margin-bottom:8px">Performance Distribution</div>
              <div class="chart-container-sm"><canvas id="perf-chart"></canvas></div>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <div><div class="card-title">Talent Matrix Snapshot</div><div class="card-subtitle">9-Box performance vs potential</div></div>
          <a href="#/talent" class="btn btn-ghost btn-sm">Full View →</a>
        </div>
        <div class="card-body">${renderNineBox()}</div>
      </div>
    </div>

    <div class="section">
      <div class="section-header"><h2 class="section-title">Delivery Health & Analytics</h2></div>
      <div class="grid-3">
        <div class="card"><div class="card-header"><div class="card-title">Velocity Trend</div></div><div class="card-body"><div class="chart-container"><canvas id="velocity-chart"></canvas></div></div></div>
        <div class="card"><div class="card-header"><div class="card-title">Defect Trend</div></div><div class="card-body"><div class="chart-container"><canvas id="defect-chart"></canvas></div></div></div>
        <div class="card"><div class="card-header"><div class="card-title">Delivery Predictability</div></div><div class="card-body"><div class="chart-container"><canvas id="predict-chart"></canvas></div></div></div>
      </div>
    </div>

    <div class="grid-2 section">
      <div class="card">
        <div class="card-header"><div><div class="card-title">Resource Utilization</div><div class="card-subtitle">Team allocation across projects</div></div><a href="#/resources" class="btn btn-ghost btn-sm">Details →</a></div>
        <div class="card-body">${renderResourceHeatmap(resourceUtilization)}</div>
      </div>

      <div class="card">
        <div class="card-header"><div><div class="card-title">Weekly Status Summary</div><div class="card-subtitle">Week ending Jun 14, 2026</div></div></div>
        <div class="card-body">
          <div style="margin-bottom:16px">
            <div style="font-size:12px;font-weight:600;color:var(--gray-600);margin-bottom:8px">✓ Completed</div>
            <ul class="summary-list">${weeklySummary.completed.map(i => `<li><span class="summary-bullet"></span>${i}</li>`).join('')}</ul>
          </div>
          <div style="margin-bottom:16px">
            <div style="font-size:12px;font-weight:600;color:var(--gray-600);margin-bottom:8px">→ Planned</div>
            <ul class="summary-list">${weeklySummary.planned.map(i => `<li><span class="summary-bullet" style="background:var(--teal-500)"></span>${i}</li>`).join('')}</ul>
          </div>
          <div style="margin-bottom:16px">
            <div style="font-size:12px;font-weight:600;color:var(--success);margin-bottom:8px">★ Achievements</div>
            <ul class="summary-list">${weeklySummary.achievements.map(i => `<li><span class="summary-bullet" style="background:var(--success)"></span>${i}</li>`).join('')}</ul>
          </div>
          <div>
            <div style="font-size:12px;font-weight:600;color:var(--danger);margin-bottom:8px">⚠ Risks & Blockers</div>
            <ul class="summary-list">${weeklySummary.risks.map(i => `<li><span class="summary-bullet" style="background:var(--danger)"></span>${i}</li>`).join('')}</ul>
          </div>
        </div>
        <div class="card-footer" style="display:flex;gap:8px">
          <button class="btn btn-primary btn-sm" id="gen-weekly-btn">Generate Weekly Report</button>
          <button class="btn btn-secondary btn-sm export-btn" data-format="PPT">Export PPT</button>
          <button class="btn btn-secondary btn-sm export-btn" data-format="PDF">Export PDF</button>
        </div>
      </div>
    </div>

    <div class="grid-2-1 section">
      <div class="card">
        <div class="card-header"><div><div class="card-title">Risk & Alert Center</div><div class="card-subtitle">Project and people risks requiring action</div></div><a href="#/risks" class="btn btn-ghost btn-sm">View All →</a></div>
        <div class="card-body">${renderAlerts(alerts, 4)}</div>
      </div>
      <div class="card">
        <div class="card-header"><div><div class="card-title">AI Insights</div><div class="card-subtitle">Auto-generated recommendations</div></div><a href="#/insights" class="btn btn-ghost btn-sm">More →</a></div>
        <div class="card-body">${renderAIInsights(aiInsights)}</div>
      </div>
    </div>`;
}

export function initDashboard() {
  initSparklines();
  initBarChart('skill-chart', teamMetrics.skillDistribution.map(s => s.skill), teamMetrics.skillDistribution.map(s => s.count), '#6366f1');
  initDoughnutChart('perf-chart', teamMetrics.performanceDistribution.map(p => p.level), teamMetrics.performanceDistribution.map(p => p.count), teamMetrics.performanceDistribution.map(p => p.color));
  initLineChart('velocity-chart', velocityTrend.labels, velocityTrend.data, 'Story Points', '#6366f1');
  initLineChart('defect-chart', defectTrend.labels, defectTrend.data, 'Defects', '#ef4444');
  initLineChart('predict-chart', predictabilityTrend.labels, predictabilityTrend.data, 'Predictability %', '#14b8a6');
  bindNineBoxClicks();

  document.getElementById('gen-weekly-btn')?.addEventListener('click', () => showToast('Weekly report generated successfully'));
  document.querySelectorAll('.export-btn').forEach(btn => {
    btn.addEventListener('click', () => showToast(`Exporting ${btn.dataset.format}... Download will begin shortly.`));
  });
  document.querySelectorAll('.insight-action-btn').forEach(btn => {
    btn.addEventListener('click', () => showToast(`Navigating to: ${btn.dataset.action}`));
  });
}

export function renderEmployees(filters = {}) {
  let filtered = [...employees];
  if (filters.skill) filtered = filtered.filter(e => e.skills.some(s => s.toLowerCase().includes(filters.skill.toLowerCase())));
  if (filters.experience) filtered = filtered.filter(e => parseInt(e.experience) >= parseInt(filters.experience));
  if (filters.availability) filtered = filtered.filter(e => e.availability.toLowerCase().includes(filters.availability.toLowerCase()));

  return `
    <div class="page-header">
      <h1 class="page-title">Employees</h1>
      <p class="page-subtitle">360-degree view of your workforce — skills, performance, and allocation</p>
    </div>

    <div class="filter-bar">
      <div class="filter-group">
        <label class="filter-label">Skill</label>
        <input type="text" class="filter-input" id="filter-skill" placeholder="e.g. React" value="${filters.skill || ''}" />
      </div>
      <div class="filter-group">
        <label class="filter-label">Min Experience</label>
        <select id="filter-experience">
          <option value="">Any</option>
          <option value="3" ${filters.experience === '3' ? 'selected' : ''}>3+ years</option>
          <option value="5" ${filters.experience === '5' ? 'selected' : ''}>5+ years</option>
          <option value="8" ${filters.experience === '8' ? 'selected' : ''}>8+ years</option>
        </select>
      </div>
      <div class="filter-group">
        <label class="filter-label">Availability</label>
        <select id="filter-availability">
          <option value="">Any</option>
          <option value="Available" ${filters.availability === 'Available' ? 'selected' : ''}>Available</option>
          <option value="Allocated" ${filters.availability === 'Allocated' ? 'selected' : ''}>Allocated</option>
          <option value="Partial" ${filters.availability === 'Partial' ? 'selected' : ''}>Partial</option>
        </select>
      </div>
      <div class="filter-group" style="align-self:flex-end">
        <button class="btn btn-primary btn-sm" id="apply-filters">Apply Filters</button>
      </div>
    </div>

    <div class="card">
      <div class="card-body" style="padding-top:8px">
        <div class="table-wrap">
          <table>
            <thead>
              <tr><th>Name</th><th>Role</th><th>Skills</th><th>Performance</th><th>9-Box</th><th>Project</th><th>Availability</th><th></th></tr>
            </thead>
            <tbody>
              ${filtered.map(e => `
                <tr>
                  <td>
                    <div class="table-employee">
                      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(e.name)}" class="table-avatar" alt="" />
                      <strong>${e.name}</strong>
                    </div>
                  </td>
                  <td>${e.role}</td>
                  <td>${e.skills.map(s => `<span class="tag tag-skill">${s}</span>`).join('')}</td>
                  <td>${getPerformanceBadge(e.performance)}</td>
                  <td><span class="badge badge-blue">${e.nineBox}</span></td>
                  <td>${e.project}</td>
                  <td><span class="badge ${e.availability === 'Available' ? 'badge-green' : e.availability === 'Over-allocated' ? 'badge-red' : 'badge-amber'}">${e.availability}</span></td>
                  <td><a href="#/employees/${e.id}" class="btn btn-ghost btn-sm">360 View</a></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>`;
}

export function initEmployees(onFilter) {
  document.getElementById('apply-filters')?.addEventListener('click', () => {
    onFilter({
      skill: document.getElementById('filter-skill').value,
      experience: document.getElementById('filter-experience').value,
      availability: document.getElementById('filter-availability').value,
    });
  });
}

export function renderEmployeeProfile(id) {
  const e = getEmployeeById(id);
  if (!e) return `<div class="empty-state"><h2>Employee not found</h2><a href="#/employees" class="btn btn-primary" style="margin-top:16px">Back to Employees</a></div>`;

  return `
    <a href="#/employees" class="btn btn-ghost btn-sm" style="margin-bottom:16px">← Back to Employees</a>

    <div class="profile-header">
      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(e.name)}" class="profile-photo" alt="${e.name}" />
      <div class="profile-header-info">
        <h1 class="profile-header-name">${e.name}</h1>
        <p class="profile-header-role">${e.role}</p>
        <div class="profile-tags">
          ${e.tags.map(t => `<span class="badge badge-purple">${t}</span>`).join('')}
          <span class="badge badge-blue">${e.nineBox}</span>
          ${getPerformanceBadge(e.performance)}
        </div>
      </div>
      <div style="text-align:right">
        <div class="info-item"><label>Talent Classification</label><span>${e.nineBox}</span></div>
        <div class="info-item" style="margin-top:8px"><label>Current Project</label><span>${e.project}</span></div>
      </div>
    </div>

    <div class="profile-tabs">
      <button class="profile-tab active">Overview</button>
      <button class="profile-tab">Projects</button>
      <button class="profile-tab">Performance</button>
      <button class="profile-tab">Skills</button>
    </div>

    <div class="grid-2">
      <div class="card">
        <div class="card-header"><div class="card-title">AI Summary</div></div>
        <div class="card-body">
          <div class="insight-card" style="margin-bottom:0">
            <p class="insight-text">${e.name} is a ${e.performance.toLowerCase()}-performing ${e.role.toLowerCase()} classified as <strong>${e.nineBox}</strong> in the talent matrix. Currently ${e.availability.toLowerCase()} on <strong>${e.project}</strong>. ${e.managerNotes}</p>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header"><div class="card-title">Quick Stats</div></div>
        <div class="card-body">
          <div class="stat-row"><span class="stat-row-label">Experience</span><span class="stat-row-value">${e.experience}</span></div>
          <div class="stat-row"><span class="stat-row-label">Leave Days (YTD)</span><span class="stat-row-value">${e.leaveDays}</span></div>
          <div class="stat-row"><span class="stat-row-label">Availability</span><span class="stat-row-value">${e.availability}</span></div>
          <div class="stat-row"><span class="stat-row-label">Performance</span><span class="stat-row-value">${e.performance}</span></div>
        </div>
      </div>
    </div>

    <div class="grid-2 section" style="margin-top:20px">
      <div class="card">
        <div class="card-header"><div class="card-title">Projects Contributed</div></div>
        <div class="card-body">
          <div class="alert-item"><div class="alert-content"><div class="alert-title">${e.project}</div><div class="alert-desc">Primary allocation · Active</div></div>${getStatusBadge('green')}</div>
        </div>
      </div>

      <div class="card">
        <div class="card-header"><div class="card-title">Performance Trend</div></div>
        <div class="card-body"><div class="chart-container"><canvas id="emp-perf-chart"></canvas></div></div>
      </div>
    </div>

    <div class="grid-3 section">
      <div class="card">
        <div class="card-header"><div class="card-title">Skills & Certifications</div></div>
        <div class="card-body">
          <div style="margin-bottom:12px">${e.skills.map(s => `<span class="tag tag-skill">${s}</span>`).join('')}</div>
          ${e.certifications.length ? `<div style="font-size:12px;color:var(--gray-500);margin-top:8px">Certifications:</div><ul class="summary-list">${e.certifications.map(c => `<li><span class="summary-bullet"></span>${c}</li>`).join('')}</ul>` : '<p style="color:var(--gray-400);font-size:13px">No certifications on file</p>'}
        </div>
      </div>

      <div class="card">
        <div class="card-header"><div class="card-title">Interests & Aspirations</div></div>
        <div class="card-body"><p style="font-size:13px;color:var(--gray-700)">${e.interests}</p></div>
      </div>

      <div class="card">
        <div class="card-header"><div class="card-title">Awards & Recognition</div></div>
        <div class="card-body">
          ${e.awards.length ? `<ul class="summary-list">${e.awards.map(a => `<li><span class="summary-bullet" style="background:var(--warning)"></span>${a}</li>`).join('')}</ul>` : '<p style="color:var(--gray-400);font-size:13px">No awards recorded</p>'}
        </div>
      </div>
    </div>

    <div class="card section">
      <div class="card-header"><div class="card-title">Manager Notes</div></div>
      <div class="card-body"><p style="font-size:14px;color:var(--gray-700);font-style:italic">"${e.managerNotes}"</p></div>
    </div>`;
}

export function initEmployeeProfile(id) {
  initLineChart('emp-perf-chart', ['Q1', 'Q2', 'Q3', 'Q4'], [3.2, 3.5, 3.8, 4.0], 'Rating', '#8b5cf6');
}

export function renderProjects() {
  return `
    <div class="page-header">
      <h1 class="page-title">Projects</h1>
      <p class="page-subtitle">Multi-project governance across Jira, Azure DevOps, and more</p>
    </div>
    <div class="grid-3">
      ${projects.map(p => `
        <div class="card project-card" onclick="location.hash='#/projects/${p.id}'">
          <div class="project-card-header">
            <div><div class="project-name">${p.name}</div><div class="project-pm">PM: ${p.pm}</div></div>
            ${getStatusBadge(p.status)}
          </div>
          <div style="margin-bottom:8px">
            <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px"><span>Progress</span><strong>${p.progress}%</strong></div>
            <div class="progress-bar"><div class="progress-fill progress-${p.status === 'green' ? 'green' : p.status === 'amber' ? 'amber' : 'red'}" style="width:${p.progress}%"></div></div>
          </div>
          <canvas class="sparkline" data-sparkline="${p.velocityTrend.join(',')}" style="width:100%;height:40px;margin:8px 0"></canvas>
          <div class="project-metrics">
            <div class="project-metric"><label>Defects</label><span>${p.defects}</span></div>
            <div class="project-metric"><label>Team</label><span>${p.team}</span></div>
            <div class="project-metric"><label>SLA</label><span>${p.sla}%</span></div>
          </div>
          <div style="margin-top:14px"><span class="btn btn-ghost btn-sm">View Details →</span></div>
        </div>
      `).join('')}
    </div>`;
}

export function initProjects() {
  initSparklines();
}

export function renderProjectDetail(id) {
  const p = getProjectById(id);
  if (!p) return `<div class="empty-state"><h2>Project not found</h2><a href="#/projects" class="btn btn-primary" style="margin-top:16px">Back to Projects</a></div>`;

  const teamMembers = employees.filter(e => e.project === p.name || (p.name.includes('Phoenix') && e.project.includes('Phoenix'))).slice(0, 6);

  return `
    <a href="#/projects" class="btn btn-ghost btn-sm" style="margin-bottom:16px">← Back to Projects</a>

    <div class="page-header">
      <div style="display:flex;justify-content:space-between;align-items:flex-start">
        <div>
          <h1 class="page-title">${p.name}</h1>
          <p class="page-subtitle">${p.sprint} · PM: ${p.pm} · Team size: ${p.team}</p>
        </div>
        ${getStatusBadge(p.status)}
      </div>
    </div>

    <div class="kpi-grid" style="grid-template-columns:repeat(4,1fr)">
      <div class="kpi-card" style="--kpi-accent:var(--primary-500)"><div class="kpi-label">Progress</div><div class="kpi-value">${p.progress}%</div></div>
      <div class="kpi-card" style="--kpi-accent:var(--teal-500)"><div class="kpi-label">Velocity (SP)</div><div class="kpi-value">${p.velocityTrend[p.velocityTrend.length-1]}</div></div>
      <div class="kpi-card" style="--kpi-accent:var(--danger)"><div class="kpi-label">Open Defects</div><div class="kpi-value">${p.defects}</div></div>
      <div class="kpi-card" style="--kpi-accent:var(--purple-500)"><div class="kpi-label">SLA Compliance</div><div class="kpi-value">${p.sla}%</div></div>
    </div>

    <div class="grid-2 section">
      <div class="card">
        <div class="card-header"><div class="card-title">Sprint Progress</div></div>
        <div class="card-body">
          <div class="progress-bar" style="height:12px;margin-bottom:12px"><div class="progress-fill progress-blue" style="width:${p.progress}%"></div></div>
          <div class="chart-container"><canvas id="project-velocity-chart"></canvas></div>
        </div>
      </div>

      <div class="card">
        <div class="card-header"><div class="card-title">Issues & Tasks</div></div>
        <div class="card-body">
          <div class="stat-row"><span class="stat-row-label">Open Stories</span><span class="stat-row-value">24</span></div>
          <div class="stat-row"><span class="stat-row-label">In Progress</span><span class="stat-row-value">12</span></div>
          <div class="stat-row"><span class="stat-row-label">Blocked</span><span class="stat-row-value" style="color:var(--danger)">3</span></div>
          <div class="stat-row"><span class="stat-row-label">Done (Sprint)</span><span class="stat-row-value" style="color:var(--success)">31</span></div>
        </div>
      </div>
    </div>

    <div class="grid-2 section">
      <div class="card">
        <div class="card-header"><div class="card-title">Team Members</div></div>
        <div class="card-body">
          ${teamMembers.length ? teamMembers.map(e => `
            <a href="#/employees/${e.id}" class="alert-item" style="text-decoration:none;margin-bottom:8px">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(e.name)}" class="table-avatar" alt="" />
              <div class="alert-content"><div class="alert-title">${e.name}</div><div class="alert-desc">${e.role}</div></div>
              ${getPerformanceBadge(e.performance)}
            </a>
          `).join('') : '<p class="empty-state">Team roster syncing from Azure DevOps...</p>'}
        </div>
      </div>

      <div class="card">
        <div class="card-header"><div class="card-title">Risks</div></div>
        <div class="card-body">
          ${p.status === 'green'
            ? '<p style="color:var(--gray-500);font-size:13px">No critical risks identified for this project.</p>'
            : renderAlerts(alerts.filter(a => a.type === 'project').slice(0, 2))}
        </div>
      </div>
    </div>`;
}

export function initProjectDetail(id) {
  const p = getProjectById(id);
  if (p) initLineChart('project-velocity-chart', ['S1','S2','S3','S4','S5','S6'], p.velocityTrend, 'Velocity', p.status === 'green' ? '#10b981' : p.status === 'amber' ? '#f59e0b' : '#ef4444');
}

export function renderTalent() {
  return `
    <div class="page-header">
      <h1 class="page-title">Talent Matrix (9-Box)</h1>
      <p class="page-subtitle">Interactive performance vs potential grid — click cells to drill down</p>
    </div>

    <div class="grid-2-1">
      <div class="card">
        <div class="card-header"><div><div class="card-title">9-Box Grid</div><div class="card-subtitle">Hover cells for category descriptions</div></div></div>
        <div class="card-body">${renderNineBox({ full: true })}</div>
      </div>

      <div class="card">
        <div class="card-header"><div class="card-title">Category Legend</div></div>
        <div class="card-body">
          <div class="alert-item alert-red" style="margin-bottom:10px"><div class="alert-content"><div class="alert-title">Risk / Dilemma</div><div class="alert-desc">Requires immediate intervention or performance plan</div></div></div>
          <div class="alert-item alert-amber" style="margin-bottom:10px"><div class="alert-content"><div class="alert-title">Core / Solid Performers</div><div class="alert-desc">Reliable backbone — maintain engagement and growth</div></div></div>
          <div class="alert-item" style="border-left:3px solid var(--success);background:#f0fdf4;margin-bottom:10px"><div class="alert-content"><div class="alert-title">Stars / Future Stars</div><div class="alert-desc">High potential — invest, retain, and promote</div></div></div>
          <div class="insight-card"><p class="insight-text"><strong>7 employees</strong> flagged at attrition or performance risk. <strong>18 stars</strong> identified for succession planning.</p></div>
        </div>
      </div>
    </div>`;
}

export function initTalent() {
  bindNineBoxClicks();
}

export function renderRisks() {
  return `
    <div class="page-header">
      <h1 class="page-title">Risks & Issues</h1>
      <p class="page-subtitle">Centralized risk register — project delays, defects, burnout, and attrition</p>
    </div>
    <div class="grid-2">
      <div class="card"><div class="card-header"><div class="card-title">Project Risks</div></div><div class="card-body">${renderAlerts(alerts.filter(a => a.type === 'project'))}</div></div>
      <div class="card"><div class="card-header"><div class="card-title">People Risks</div></div><div class="card-body">${renderAlerts(alerts.filter(a => a.type === 'people'))}</div></div>
    </div>`;
}

export function renderResources() {
  return `
    <div class="page-header">
      <h1 class="page-title">Resource Utilization</h1>
      <p class="page-subtitle">Team allocation, over/under-utilization, and capacity planning</p>
    </div>

    <div class="kpi-grid" style="grid-template-columns:repeat(4,1fr)">
      <div class="kpi-card" style="--kpi-accent:var(--primary-500)"><div class="kpi-label">Total Capacity</div><div class="kpi-value">${teamMetrics.totalSize}</div></div>
      <div class="kpi-card" style="--kpi-accent:var(--success)"><div class="kpi-label">Available</div><div class="kpi-value">${teamMetrics.available}</div></div>
      <div class="kpi-card" style="--kpi-accent:var(--warning)"><div class="kpi-label">Over-utilized</div><div class="kpi-value">${teamMetrics.overUtilized}</div></div>
      <div class="kpi-card" style="--kpi-accent:var(--teal-500)"><div class="kpi-label">Avg Utilization</div><div class="kpi-value">87%</div></div>
    </div>

    <div class="card section">
      <div class="card-header"><div><div class="card-title">Allocation Heatmap</div><div class="card-subtitle">Weekly utilization % by project</div></div></div>
      <div class="card-body">${renderResourceHeatmap(resourceUtilization)}</div>
    </div>

    <div class="card">
      <div class="card-header"><div class="card-title">Over / Under Utilized Resources</div></div>
      <div class="card-body">
        <div class="table-wrap">
          <table>
            <thead><tr><th>Employee</th><th>Role</th><th>Utilization</th><th>Projects</th><th>Status</th></tr></thead>
            <tbody>
              ${employees.filter(e => e.availability === 'Over-allocated' || e.availability === 'Available').map(e => `
                <tr>
                  <td><div class="table-employee"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(e.name)}" class="table-avatar" alt="" /><strong>${e.name}</strong></div></td>
                  <td>${e.role}</td>
                  <td><strong style="color:${e.availability === 'Over-allocated' ? 'var(--danger)' : 'var(--success)'}">${e.availability === 'Over-allocated' ? '140%' : '45%'}</strong></td>
                  <td>${e.project}</td>
                  <td><span class="badge ${e.availability === 'Over-allocated' ? 'badge-red' : 'badge-green'}">${e.availability}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>`;
}

export function renderInsights() {
  return `
    <div class="page-header">
      <h1 class="page-title">AI Insights</h1>
      <p class="page-subtitle">Machine-generated recommendations for delivery and talent decisions</p>
    </div>
    <div class="grid-2">${aiInsights.map(i => `
      <div class="insight-card" style="margin-bottom:0;padding:24px">
        <div class="insight-header"><span class="insight-badge">AI Insight</span><span class="badge badge-blue">${i.type}</span></div>
        <p class="insight-text" style="font-size:15px;margin:12px 0">${i.text}</p>
        <button class="btn btn-primary btn-sm insight-action-btn" data-action="${i.action}">${i.action}</button>
      </div>
    `).join('')}</div>
    <div class="card section" style="margin-top:24px">
      <div class="card-header"><div class="card-title">Recommended Actions Today</div></div>
      <div class="card-body">
        <ul class="summary-list">
          <li><span class="summary-bullet" style="background:var(--danger)"></span>Schedule 1:1 with Tom Bradley — burnout intervention</li>
          <li><span class="summary-bullet" style="background:var(--warning)"></span>Review Data Platform scope with Elena Rodriguez</li>
          <li><span class="summary-bullet" style="background:var(--primary-500)"></span>Recognize Alexandra Torres and Kevin Patel — star performers</li>
          <li><span class="summary-bullet" style="background:var(--teal-500)"></span>Rebalance Cloud Migration team allocation</li>
        </ul>
      </div>
    </div>`;
}

export function initInsights() {
  document.querySelectorAll('.insight-action-btn').forEach(btn => {
    btn.addEventListener('click', () => showToast(`Action: ${btn.dataset.action}`));
  });
}

export function renderWeeklyReports() {
  return `
    <div class="page-header">
      <h1 class="page-title">Weekly Reports</h1>
      <p class="page-subtitle">Status summaries, achievements, and blockers for stakeholder communication</p>
    </div>
    <div class="card section">
      <div class="card-header"><div class="card-title">Current Week Summary</div><div class="card-subtitle">Week ending Jun 14, 2026</div></div>
      <div class="card-body">
        <div class="grid-2">
          <div><div style="font-weight:600;margin-bottom:8px">Completed</div><ul class="summary-list">${weeklySummary.completed.map(i => `<li><span class="summary-bullet"></span>${i}</li>`).join('')}</ul></div>
          <div><div style="font-weight:600;margin-bottom:8px">Planned</div><ul class="summary-list">${weeklySummary.planned.map(i => `<li><span class="summary-bullet"></span>${i}</li>`).join('')}</ul></div>
        </div>
      </div>
      <div class="card-footer"><button class="btn btn-primary" id="gen-weekly-btn">Generate Weekly Report</button><button class="btn btn-secondary export-btn" data-format="PDF">Export PDF</button></div>
    </div>`;
}

export function initWeeklyReports() {
  document.getElementById('gen-weekly-btn')?.addEventListener('click', () => showToast('Weekly report generated'));
  document.querySelectorAll('.export-btn').forEach(btn => btn.addEventListener('click', () => showToast(`Exporting ${btn.dataset.format}...`)));
}

export function renderMonthlyReports() {
  return `
    <div class="page-header">
      <h1 class="page-title">Monthly / Quarterly Reports</h1>
      <p class="page-subtitle">Executive roll-ups for delivery performance and organizational health</p>
    </div>
    ${renderKPICards(kpis)}
    <div class="grid-2 section">
      <div class="card"><div class="card-header"><div class="card-title">Monthly Velocity</div></div><div class="card-body"><div class="chart-container"><canvas id="velocity-chart"></canvas></div></div></div>
      <div class="card"><div class="card-header"><div class="card-title">Quarterly Predictability</div></div><div class="card-body"><div class="chart-container"><canvas id="predict-chart"></canvas></div></div></div>
    </div>`;
}

export function initMonthlyReports() {
  initLineChart('velocity-chart', velocityTrend.labels, velocityTrend.data, 'Velocity', '#6366f1');
  initLineChart('predict-chart', predictabilityTrend.labels, predictabilityTrend.data, 'Predictability', '#14b8a6');
}

export function renderReportsModule() {
  return `
    <div class="page-header">
      <h1 class="page-title">Reports</h1>
      <p class="page-subtitle">Pre-built templates with filters for project, team, and time period</p>
    </div>

    <div class="filter-bar">
      <div class="filter-group"><label class="filter-label">Project</label><select><option>All Projects</option>${projects.map(p => `<option>${p.name}</option>`).join('')}</select></div>
      <div class="filter-group"><label class="filter-label">Team</label><select><option>All Teams</option><option>Engineering</option><option>QA</option><option>DevOps</option></select></div>
      <div class="filter-group"><label class="filter-label">Time Period</label><select><option>Last 7 days</option><option>Last 30 days</option><option>Last Quarter</option><option>Custom</option></select></div>
    </div>

    <div class="report-grid">
      ${reportTemplates.map(r => `
        <div class="card report-template" onclick="document.getElementById('toast-container').innerHTML='';document.getElementById('toast-container').appendChild(Object.assign(document.createElement('div'),{className:'toast',textContent:'Opening ${r.title} template...'}))">
          <div class="report-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></div>
          <div style="font-weight:600;font-size:15px;margin-bottom:6px">${r.title}</div>
          <div style="font-size:12px;color:var(--gray-500);margin-bottom:12px">${r.desc}</div>
          <span class="badge badge-blue">${r.period}</span>
        </div>
      `).join('')}
    </div>`;
}

export { destroyCharts };
