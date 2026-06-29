#!/usr/bin/env node
/**
 * Smoke test for the Delivery Platform API.
 * Usage: npm run smoke-test
 * Requires the backend running at API_URL (default http://localhost:4000/api).
 */

const API_URL = process.env.API_URL || 'http://localhost:4000/api';

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, options);
  const body = await res.json().catch(() => ({}));
  return { status: res.status, body };
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function main() {
  console.log(`Running smoke tests against ${API_URL}...\n`);

  const health = await request('/health');
  assert(health.status === 200, `Health check failed: ${health.status}`);
  console.log('✓ Health check');

  const login = await request('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@delivery.com', password: 'password123' }),
  });
  assert(login.status === 200 && login.body.token, `Login failed: ${login.status}`);
  const token = login.body.token;
  console.log('✓ Admin login');

  const auth = { Authorization: `Bearer ${token}` };

  const endpoints = ['/projects', '/metrics', '/work-items', '/data-sources', '/insights', '/reports'];
  for (const ep of endpoints) {
    const res = await request(ep, { headers: auth });
    assert(res.status === 200, `${ep} failed: ${res.status}`);
    console.log(`✓ GET ${ep}`);
  }

  const report = await request('/reports/generate', {
    method: 'POST',
    headers: { ...auth, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      reportType: 'weekly',
      audience: 'internal',
      dateFrom: '2026-06-01',
      dateTo: '2026-06-29',
    }),
  });
  assert(report.status === 200 && report.body.data, `Report generation failed: ${report.status}`);
  console.log('✓ Report generation');

  const clientLogin = await request('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'client@delivery.com', password: 'password123' }),
  });
  assert(clientLogin.status === 200, 'Client login failed');
  const clientAuth = { Authorization: `Bearer ${clientLogin.body.token}` };

  const insights = await request('/insights', { headers: clientAuth });
  assert(insights.status === 403, `Client should not access insights: got ${insights.status}`);
  console.log('✓ Client role restrictions');

  console.log('\nAll smoke tests passed.');
}

main().catch((err) => {
  console.error(`\n✗ ${err.message}`);
  process.exit(1);
});
