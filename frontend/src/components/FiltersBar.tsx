'use client';

import type { Filters, Project } from '@/types';

interface Props {
  filters: Filters;
  onChange: (filters: Filters) => void;
  projects: Project[];
  sprints: string[];
  sources: string[];
}

const DATE_RANGES = [
  { label: 'Last 7 Days', days: 7 },
  { label: 'Last 30 Days', days: 30 },
  { label: 'Last 90 Days', days: 90 },
  { label: 'All Time', days: 0 },
];

export default function FiltersBar({ filters, onChange, projects, sprints, sources }: Props) {
  const setDateRange = (days: number) => {
    if (days === 0) {
      onChange({ ...filters, dateFrom: undefined, dateTo: undefined });
    } else {
      const to = new Date().toISOString().split('T')[0];
      const from = new Date(Date.now() - days * 86400000).toISOString().split('T')[0];
      onChange({ ...filters, dateFrom: from, dateTo: to });
    }
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 mb-6 flex flex-wrap gap-3">
      <select
        value={filters.project || ''}
        onChange={(e) => onChange({ ...filters, project: e.target.value || undefined })}
        className="px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 bg-white min-w-[160px]"
      >
        <option value="">All Projects</option>
        {projects.map((p) => (
          <option key={p.id} value={p.id}>{p.name}</option>
        ))}
      </select>

      <select
        value={filters.sprint || ''}
        onChange={(e) => onChange({ ...filters, sprint: e.target.value || undefined })}
        className="px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 bg-white min-w-[140px]"
      >
        <option value="">All Sprints</option>
        {sprints.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      <select
        onChange={(e) => setDateRange(parseInt(e.target.value, 10))}
        className="px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 bg-white min-w-[140px]"
        defaultValue="30"
      >
        {DATE_RANGES.map((r) => (
          <option key={r.label} value={r.days}>{r.label}</option>
        ))}
      </select>

      <select
        value={filters.source || ''}
        onChange={(e) => onChange({ ...filters, source: e.target.value || undefined })}
        className="px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 bg-white min-w-[140px]"
      >
        <option value="">All Sources</option>
        {sources.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
    </div>
  );
}
