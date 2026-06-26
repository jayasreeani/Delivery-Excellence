import {
  icons, navItems, nineBoxMatrix, getEmployeesInNineBoxCell, getStatusBadge, getPerformanceBadge
} from './data.js';

let chartInstances = [];

export function destroyCharts() {
  chartInstances.forEach(c => c.destroy());
  chartInstances = [];
}

export function registerChart(chart) {
  chartInstances.push(chart);
}

export function renderSidebar(currentPath) {
  const nav = document.getElementById('sidebar-nav');
  let html = '';
  navItems.forEach(item => {
    if (item.section) {
      html += `<div class="nav-section-label">${item.section}</div>`;
    } else {
      const active = currentPath === item.path || (item.path !== '/' && currentPath.startsWith(item.path)) ? 'active' : '';
      html += `<a href="#${item.path}" class="nav-link ${active}" data-path="${item.path}">${icons[item.icon] || ''}${item.label}</a>`;
    }
  });
  nav.innerHTML = html;
}

export function renderKPICards(kpis) {
  const cards = [
    { label: 'Total Employees', value: kpis.totalEmployees, accent: '#6366f1', iconBg: '#eef2ff', trend: '+12 this quarter', up: true },
    { label: 'Total Projects', value: kpis.totalProjects, accent: '#14b8a6', iconBg: '#ccfbf1', trend: '2 new this month', up: true },
    { label: 'Delivery Health Score', value: kpis.deliveryHealth + '%', accent: '#8b5cf6', iconBg: '#ede9fe', trend: '+4 pts vs last month', up: true },
    { label: 'At-Risk Projects', value: kpis.atRiskProjects, accent: '#f59e0b', iconBg: '#fef3c7', trend: 'Needs attention', up: false },
    { label: 'At-Risk Employees', value: kpis.atRiskEmployees, accent: '#ef4444', iconBg: '#fee2e2', trend: '3 attrition signals', up: false },
  ];
  return `<div class="kpi-grid">${cards.map(c => `
    <div class="kpi-card" style="--kpi-accent: ${c.accent}">
      <div class="kpi-label">${c.label}</div>
      <div class="kpi-value">${c.value}</div>
      <div class="kpi-meta ${c.up ? 'kpi-trend-up' : 'kpi-trend-down'}">
        ${c.up ? '↑' : '⚠'} ${c.trend}
      </div>
    </div>
  `).join('')}</div>`;
}

export function renderProjectTable(projects, showActions = true) {
  return `
    <div class="card">
      <div class="card-header">
        <div><div class="card-title">Project Overview</div><div class="card-subtitle">Cross-project delivery status</div></div>
        ${showActions ? '<a href="#/projects" class="btn btn-ghost btn-sm">View All →</a>' : ''}
      </div>
      <div class="card-body" style="padding-top:8px">
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Project</th><th>Status</th><th>Progress</th><th>Velocity</th><th>Defects</th><th>PM</th><th></th>
              </tr>
            </thead>
            <tbody>
              ${projects.map(p => `
                <tr>
                  <td><strong>${p.name}</strong></td>
                  <td>${getStatusBadge(p.status)}</td>
                  <td>
                    <div style="display:flex;align-items:center;gap:8px">
                      <div class="progress-bar" style="width:80px">
                        <div class="progress-fill progress-${p.status === 'green' ? 'green' : p.status === 'amber' ? 'amber' : 'red'}" style="width:${p.progress}%"></div>
                      </div>
                      <span style="font-size:12px;font-weight:600">${p.progress}%</span>
                    </div>
                  </td>
                  <td><canvas class="sparkline" data-sparkline="${p.velocityTrend.join(',')}"></canvas></td>
                  <td><span style="font-weight:600;${p.defects > 25 ? 'color:var(--danger)' : ''}">${p.defects}</span></td>
                  <td>${p.pm}</td>
                  <td><a href="#/projects/${p.id}" class="btn btn-ghost btn-sm">Details</a></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>`;
}

export function renderNineBox(options = {}) {
  const { full = false, interactive = true, onClick = '' } = options;
  const sorted = [...nineBoxMatrix.cells].sort((a, b) => a.row !== b.row ? a.row - b.row : a.col - b.col);
  const gridOrder = [0,1,2,3,4,5,6,7,8].map(i => sorted[i]);

  return `
    <div class="nine-box-axes">
      <div class="axis-y">Potential ↑</div>
      <div class="nine-box ${full ? 'nine-box-full' : ''}" ${full ? 'style="max-width:100%"' : ''}>
        ${gridOrder.map(cell => `
          <div class="nine-box-cell cell-${cell.type}"
            ${interactive ? `data-ninebox="${cell.row},${cell.col}" data-tooltip="${cell.description}"` : ''}
            ${onClick ? `onclick="${onClick}(${cell.row},${cell.col})"` : ''}>
            <span class="nine-box-count">${cell.count}</span>
            <span class="nine-box-label">${cell.label}</span>
          </div>
        `).join('')}
      </div>
      <div class="axis-x">Performance → Low &nbsp;&nbsp;&nbsp; Medium &nbsp;&nbsp;&nbsp; High</div>
    </div>`;
}

export function renderAlerts(alerts, limit) {
  const items = limit ? alerts.slice(0, limit) : alerts;
  return `<div class="alert-list">${items.map(a => `
    <div class="alert-item alert-${a.severity}">
      <div class="alert-icon alert-icon-${a.severity}">
        ${a.type === 'project'
          ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>'
          : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>'}
      </div>
      <div class="alert-content">
        <div class="alert-title">${a.title}</div>
        <div class="alert-desc">${a.description}</div>
        <div class="alert-meta">
          <span class="badge badge-${a.severity === 'red' ? 'red' : 'amber'}">${a.priority}</span>
          <span style="font-size:11px;color:var(--gray-400)">${a.time}</span>
        </div>
      </div>
    </div>
  `).join('')}</div>`;
}

export function renderAIInsights(insights) {
  return insights.map(i => `
    <div class="insight-card">
      <div class="insight-header">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" stroke-width="2"><path d="m12 3-1.9 5.8H4.5L10 13.5 8.1 19.3 12 15.8l3.9 3.5L14 13.5l5.5-4.7h-5.6L12 3Z"/></svg>
        <span class="insight-badge">AI Insight</span>
      </div>
      <p class="insight-text">${i.text}</p>
      <div class="insight-action"><button class="btn btn-ghost btn-sm insight-action-btn" data-action="${i.action}">${i.action} →</button></div>
    </div>
  `).join('');
}

export function renderResourceHeatmap(data) {
  const weeks = ['W1','W2','W3','W4','W5','W6','W7','W8'];
  const getUtilClass = (v) => v > 110 ? 'util-over' : v > 100 ? 'util-high' : v >= 80 ? 'util-optimal' : 'util-low';

  return `
    <div class="heatmap">
      <div class="heatmap-row" style="margin-bottom:4px">
        <div class="heatmap-label"></div>
        ${weeks.map(w => `<div style="text-align:center;font-size:10px;font-weight:600;color:var(--gray-400)">${w}</div>`).join('')}
      </div>
      ${data.map(row => `
        <div class="heatmap-row">
          <div class="heatmap-label" title="${row.name}">${row.name}</div>
          ${row.allocation.map(v => `
            <div class="heatmap-cell ${getUtilClass(v)}" data-tooltip="${row.name}: ${v}% utilization">${v}%</div>
          `).join('')}
        </div>
      `).join('')}
    </div>
    <div style="display:flex;gap:12px;margin-top:14px;font-size:11px;color:var(--gray-500)">
      <span><span class="status-dot util-optimal" style="background:#bbf7d0"></span> Optimal (80-100%)</span>
      <span><span class="status-dot util-high" style="background:#fef08a"></span> High (100-110%)</span>
      <span><span class="status-dot util-over" style="background:#fecaca"></span> Over (>110%)</span>
    </div>`;
}

export function initSparklines() {
  document.querySelectorAll('[data-sparkline]').forEach(canvas => {
    const data = canvas.dataset.sparkline.split(',').map(Number);
    const ctx = canvas.getContext('2d');
    const trend = data[data.length - 1] >= data[0];
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map((_, i) => i),
        datasets: [{
          data,
          borderColor: trend ? '#10b981' : '#ef4444',
          borderWidth: 2,
          pointRadius: 0,
          fill: false,
          tension: 0.4,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        scales: { x: { display: false }, y: { display: false } },
      },
    });
    registerChart(chart);
  });
}

export function initLineChart(canvasId, labels, data, label, color = '#6366f1') {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const chart = new Chart(canvas, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label,
        data,
        borderColor: color,
        backgroundColor: color + '20',
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: color,
        fill: true,
        tension: 0.3,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false }, ticks: { font: { size: 11 }, color: '#94a3b8' } },
        y: { grid: { color: '#f1f5f9' }, ticks: { font: { size: 11 }, color: '#94a3b8' } },
      },
    },
  });
  registerChart(chart);
}

export function initBarChart(canvasId, labels, data, colors) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const chart = new Chart(canvas, {
    type: 'bar',
    data: {
      labels,
      datasets: [{ data, backgroundColor: colors || '#6366f1', borderRadius: 6 }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false }, ticks: { font: { size: 11 }, color: '#94a3b8' } },
        y: { grid: { color: '#f1f5f9' }, ticks: { font: { size: 11 }, color: '#94a3b8' } },
      },
    },
  });
  registerChart(chart);
}

export function initDoughnutChart(canvasId, labels, data, colors) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const chart = new Chart(canvas, {
    type: 'doughnut',
    data: {
      labels,
      datasets: [{ data, backgroundColor: colors, borderWidth: 0 }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '65%',
      plugins: {
        legend: { position: 'right', labels: { boxWidth: 12, font: { size: 11 }, padding: 12 } },
      },
    },
  });
  registerChart(chart);
}

export function showToast(message) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

export function showNineBoxModal(row, col) {
  const cell = nineBoxMatrix.cells.find(c => c.row === row && c.col === col);
  if (!cell) return;
  const emps = getEmployeesInNineBoxCell(row, col);
  const overlay = document.getElementById('modal-overlay');
  const modal = document.getElementById('modal');
  modal.innerHTML = `
    <div class="modal-title">${cell.category} (${cell.count} employees)</div>
    <p style="color:var(--gray-500);margin-bottom:16px;font-size:13px">${cell.description}</p>
    <div style="display:flex;flex-direction:column;gap:10px">
      ${emps.length ? emps.map(e => `
        <a href="#/employees/${e.id}" class="alert-item" style="text-decoration:none" onclick="document.getElementById('modal-overlay').classList.add('hidden')">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(e.name)}" class="table-avatar" alt="" />
          <div class="alert-content">
            <div class="alert-title">${e.name}</div>
            <div class="alert-desc">${e.role} · ${e.project}</div>
          </div>
          ${getPerformanceBadge(e.performance)}
        </a>
      `).join('') : '<p class="empty-state">No sample employees in this category.</p>'}
      ${cell.count > emps.length ? `<p style="font-size:12px;color:var(--gray-400);text-align:center">+ ${cell.count - emps.length} more employees</p>` : ''}
    </div>
    <div style="margin-top:20px;text-align:right">
      <button class="btn btn-secondary" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Close</button>
    </div>`;
  overlay.classList.remove('hidden');
}

export function bindNineBoxClicks() {
  document.querySelectorAll('[data-ninebox]').forEach(el => {
    el.addEventListener('click', () => {
      const [row, col] = el.dataset.ninebox.split(',').map(Number);
      showNineBoxModal(row, col);
    });
  });
}

export function bindModalClose() {
  document.getElementById('modal-overlay')?.addEventListener('click', (e) => {
    if (e.target.id === 'modal-overlay') e.target.classList.add('hidden');
  });
}

export { getStatusBadge, getPerformanceBadge };
