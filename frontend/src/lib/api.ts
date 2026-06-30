const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (typeof window !== 'undefined' ? '/api' : 'http://localhost:4000/api');

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, { ...options, headers });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || 'Request failed');
  }
  return res.json();
}

function toQuery(params: Record<string, string | undefined>) {
  const q = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => { if (v) q.set(k, v); });
  const s = q.toString();
  return s ? `?${s}` : '';
}

export const api = {
  login: (email: string, password: string) =>
    request<{ token: string; user: import('@/types').User }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  getMe: () => request<import('@/types').User>('/auth/me'),

  getProjects: () => request<import('@/types').Project[]>('/projects'),

  getMetrics: (filters: import('@/types').Filters = {}) =>
    request<import('@/types').Metrics>(`/metrics${toQuery(filters as Record<string, string>)}`),

  getFilterOptions: () =>
    request<{ sprints: string[]; sources: string[] }>('/metrics/filters'),

  getWorkItems: (filters: import('@/types').Filters & { limit?: number; offset?: number; search?: string } = {}) =>
    request<{ items: import('@/types').WorkItem[]; total: number }>(`/work-items${toQuery(filters as Record<string, string>)}`),

  getDataSources: () => request<import('@/types').DataSource[]>('/data-sources'),

  refreshDataSource: (key: string) =>
    request<{ success: boolean; synced: number }>(`/data-sources/${key}/refresh`, { method: 'POST' }),

  getInsights: () => request<import('@/types').AiInsight[]>('/insights'),

  getReports: () => request<{ id: string; title: string; report_type: string; audience: string; date_from: string; date_to: string; created_at: string }[]>('/reports'),

  getReport: (id: string) =>
    request<{ id: string; report_data: import('@/types').ReportData }>(`/reports/${id}`),

  generateReport: (body: {
    reportType: string;
    audience: string;
    projectIds?: string[];
    dateFrom: string;
    dateTo: string;
  }) =>
    request<{ report: { id: string }; data: import('@/types').ReportData }>('/reports/generate', {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  emailReport: (reportId: string, email: string) =>
    request<{ success: boolean; message: string }>(`/reports/${reportId}/email`, {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),
};
