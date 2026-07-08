import { renderSidebar, bindModalClose } from './components.js';
import {
  renderDashboard, initDashboard,
  renderEmployees, initEmployees,
  renderEmployeeProfile, initEmployeeProfile,
  renderProjects, initProjects,
  renderProjectDetail, initProjectDetail,
  renderTalent, initTalent,
  renderRisks,
  renderResources,
  renderInsights, initInsights,
  renderWeeklyReports, initWeeklyReports,
  renderMonthlyReports, initMonthlyReports,
  renderReportsModule,
  destroyCharts,
} from './pages.js';

let employeeFilters = {};

function parseRoute() {
  const raw = location.hash.slice(1) || '/';
  const [pathPart, queryPart] = raw.split('?');
  const parts = pathPart.split('/').filter(Boolean);
  const params = new URLSearchParams(queryPart || '');
  return { path: '/' + parts.join('/'), segments: parts, params };
}

function getBasePath(path) {
  const segments = path.split('/').filter(Boolean);
  return segments.length ? '/' + segments[0] : '/';
}

function navigate() {
  destroyCharts();
  const { path, segments, params } = parseRoute();
  const content = document.getElementById('app-content');
  const base = getBasePath(path);

  renderSidebar(base === '/employees' && segments.length > 1 ? '/employees' : base === '/projects' && segments.length > 1 ? '/projects' : path.split('/').slice(0, 2).join('/') || '/');

  let html = '';
  let init = null;

  if (path === '/' || path === '/dashboard') {
    html = renderDashboard();
    init = initDashboard;
  } else if (path === '/employees') {
    html = renderEmployees(employeeFilters);
    init = () => initEmployees((filters) => { employeeFilters = filters; navigate(); });
  } else if (segments[0] === 'employees' && segments[1]) {
    html = renderEmployeeProfile(segments[1]);
    init = () => initEmployeeProfile(segments[1]);
  } else if (path === '/projects') {
    html = renderProjects();
    init = () => initProjects(() => navigate(), { openAdd: params.get('add') === '1' });
  } else if (segments[0] === 'projects' && segments[1]) {
    html = renderProjectDetail(segments[1]);
    init = () => initProjectDetail(segments[1]);
  } else if (path === '/talent') {
    html = renderTalent();
    init = initTalent;
  } else if (path === '/weekly-reports') {
    html = renderWeeklyReports();
    init = initWeeklyReports;
  } else if (path === '/monthly-reports') {
    html = renderMonthlyReports();
    init = initMonthlyReports;
  } else if (path === '/risks') {
    html = renderRisks();
  } else if (path === '/resources') {
    html = renderResources();
  } else if (path === '/insights') {
    html = renderInsights();
    init = initInsights;
  } else if (path === '/reports') {
    html = renderReportsModule();
  } else {
    html = `<div class="empty-state"><h2>Page not found</h2><p style="margin-top:8px">The page "${path}" doesn't exist.</p><a href="#/" class="btn btn-primary" style="margin-top:16px;display:inline-flex">Go to Dashboard</a></div>`;
  }

  content.innerHTML = html;
  content.scrollTop = 0;
  if (init) requestAnimationFrame(() => init());

  const fab = document.getElementById('add-project-fab');
  if (fab) fab.classList.toggle('hidden', path !== '/projects');

  document.querySelectorAll('.nav-link').forEach(link => {
    const linkPath = link.dataset.path;
    const isActive = linkPath === path || (linkPath !== '/' && path.startsWith(linkPath));
    link.classList.toggle('active', isActive);
  });
}

function initGlobalSearch() {
  const input = document.getElementById('global-search');
  input?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const q = input.value.toLowerCase();
      if (!q) return;
      const emp = ['alexandra', 'michael', 'priya', 'james', 'elena', 'david', 'rachel', 'tom', 'sophie', 'kevin'].find(n => n.includes(q));
      if (emp) {
        const match = document.querySelector(`a[href*="/employees/"]`);
        location.hash = match ? match.getAttribute('href').slice(1) : '/employees';
      } else if (q.includes('project') || q.includes('phoenix') || q.includes('cloud')) {
        location.hash = '/projects';
      } else {
        location.hash = '/employees';
      }
    }
  });
}

function initMobileMenu() {
  document.getElementById('mobile-menu-btn')?.addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('open');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  bindModalClose();
  initGlobalSearch();
  initMobileMenu();
  window.addEventListener('hashchange', navigate);
  if (!location.hash) location.hash = '#/';
  else navigate();
});
