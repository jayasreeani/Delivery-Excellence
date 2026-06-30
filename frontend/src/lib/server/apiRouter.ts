import { NextResponse } from 'next/server';
import { getBearerUser, getUserById, loginUser } from './auth';
import {
  getProjects,
  getMetrics,
  getWorkItems,
  getSprints,
  getSources,
  getDataSources,
  getAiInsights,
  generateReport,
} from './deliveryService';
import { query } from './db';

function json(data: unknown, status = 200) {
  return NextResponse.json(data, { status });
}

function unauthorized() {
  return json({ error: 'Authentication required' }, 401);
}

function forbidden() {
  return json({ error: 'Insufficient permissions' }, 403);
}

async function proxyToBackend(req: Request, path: string[]): Promise<NextResponse | null> {
  const backendUrl = process.env.BACKEND_URL;
  if (!backendUrl) return null;

  const url = new URL(req.url);
  const target = `${backendUrl.replace(/\/$/, '')}/api/${path.join('/')}${url.search}`;
  const headers = new Headers(req.headers);
  headers.delete('host');

  const res = await fetch(target, {
    method: req.method,
    headers,
    body: req.method !== 'GET' && req.method !== 'HEAD' ? await req.text() : undefined,
  });

  const data = await res.text();
  return new NextResponse(data, {
    status: res.status,
    headers: { 'Content-Type': res.headers.get('Content-Type') || 'application/json' },
  });
}

export async function routeRequest(req: Request, path: string[]): Promise<NextResponse> {
  const proxied = await proxyToBackend(req, path);
  if (proxied) return proxied;

  const route = path.join('/');
  const url = new URL(req.url);
  const user = getBearerUser(req);

  try {
    // Health
    if (route === 'health' && req.method === 'GET') {
      return json({ status: 'ok', mode: 'dynamic', timestamp: new Date().toISOString() });
    }

    // Auth
    if (route === 'auth/login' && req.method === 'POST') {
      const body = await req.json();
      if (!body.email || !body.password) {
        return json({ error: 'Email and password required' }, 400);
      }
      const result = await loginUser(body.email, body.password);
      return json(result);
    }

    if (route === 'auth/me' && req.method === 'GET') {
      if (!user) return unauthorized();
      const dbUser = await getUserById(user.id);
      if (!dbUser) return unauthorized();
      return json(dbUser);
    }

    if (!user) return unauthorized();

    // Projects
    if (route === 'projects' && req.method === 'GET') {
      const projects = await getProjects();
      if (user.role === 'client') {
        return json(projects.map((p: Record<string, unknown>) => ({
          ...p,
          defects: undefined,
          avg_velocity: undefined,
        })));
      }
      return json(projects);
    }

    // Metrics
    if (route === 'metrics' && req.method === 'GET') {
      const filters = {
        project: url.searchParams.get('project') || undefined,
        sprint: url.searchParams.get('sprint') || undefined,
        source: url.searchParams.get('source') || undefined,
        dateFrom: url.searchParams.get('dateFrom') || undefined,
        dateTo: url.searchParams.get('dateTo') || undefined,
      };
      return json(await getMetrics(filters));
    }

    if (route === 'metrics/filters' && req.method === 'GET') {
      const [sprints, sources] = await Promise.all([getSprints(), getSources()]);
      return json({ sprints, sources });
    }

    // Work items
    if (route === 'work-items' && req.method === 'GET') {
      const filters = {
        project: url.searchParams.get('project') || undefined,
        sprint: url.searchParams.get('sprint') || undefined,
        source: url.searchParams.get('source') || undefined,
        status: url.searchParams.get('status') || undefined,
        dateFrom: url.searchParams.get('dateFrom') || undefined,
        dateTo: url.searchParams.get('dateTo') || undefined,
        search: url.searchParams.get('search') || undefined,
        limit: parseInt(url.searchParams.get('limit') || '100', 10),
        offset: parseInt(url.searchParams.get('offset') || '0', 10),
      };
      return json(await getWorkItems(filters));
    }

    // Data sources
    if (route === 'data-sources' && req.method === 'GET') {
      return json(await getDataSources());
    }

    const refreshMatch = route.match(/^data-sources\/([^/]+)\/refresh$/);
    if (refreshMatch && req.method === 'POST') {
      if (user.role !== 'management') return forbidden();
      const key = refreshMatch[1];
      await query(
        'UPDATE data_sources SET status = $1, last_sync_at = NOW(), last_error = NULL WHERE instance_key = $2',
        ['connected', key]
      );
      return json({ success: true, synced: 3, message: 'Sync completed (mock refresh in serverless mode)' });
    }

    // Insights
    if (route === 'insights' && req.method === 'GET') {
      return json(await getAiInsights());
    }

    // Reports
    if (route === 'reports' && req.method === 'GET') {
      const result = await query(
        'SELECT id, title, report_type, audience, date_from, date_to, created_at FROM reports ORDER BY created_at DESC LIMIT 50'
      );
      return json(result.rows);
    }

    if (route === 'reports/generate' && req.method === 'POST') {
      const body = await req.json();
      if (!body.reportType || !body.audience || !body.dateFrom || !body.dateTo) {
        return json({ error: 'reportType, audience, dateFrom, dateTo are required' }, 400);
      }
      if (user.role === 'client' && body.audience !== 'client') {
        return forbidden();
      }
      const result = await generateReport({
        reportType: body.reportType,
        audience: body.audience,
        projectIds: body.projectIds,
        dateFrom: body.dateFrom,
        dateTo: body.dateTo,
        userId: user.id,
      });
      return json(result);
    }

    const reportIdMatch = route.match(/^reports\/([^/]+)$/);
    if (reportIdMatch && req.method === 'GET') {
      const result = await query('SELECT * FROM reports WHERE id = $1', [reportIdMatch[1]]);
      if (!result.rows[0]) return json({ error: 'Report not found' }, 404);
      return json(result.rows[0]);
    }

    const emailMatch = route.match(/^reports\/([^/]+)\/email$/);
    if (emailMatch && req.method === 'POST') {
      if (user.role !== 'management') return forbidden();
      const body = await req.json();
      if (!body.email) return json({ error: 'email is required' }, 400);
      return json({ success: true, message: `Report queued for delivery to ${body.email}` });
    }

    return json({ error: 'Not found' }, 404);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    if (message.includes('DATABASE_URL')) {
      return json({ error: 'Database not configured. Set DATABASE_URL environment variable.' }, 503);
    }
    console.error('API error:', err);
    return json({ error: message }, 500);
  }
}
