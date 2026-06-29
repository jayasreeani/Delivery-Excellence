import clsx from 'clsx';

const STATUS_COLORS: Record<string, string> = {
  'Done': 'bg-status-done',
  'In Progress': 'bg-status-progress',
  'Review': 'bg-status-review',
  'To Do': 'bg-status-todo',
  'Blocked': 'bg-status-blocked',
};

export function statusColor(status: string) {
  return STATUS_COLORS[status] || 'bg-slate-400';
}

export function statusBadge(status: string) {
  const colors: Record<string, string> = {
    'Done': 'bg-emerald-100 text-emerald-700',
    'In Progress': 'bg-blue-100 text-blue-700',
    'Review': 'bg-purple-100 text-purple-700',
    'To Do': 'bg-slate-100 text-slate-600',
    'Blocked': 'bg-red-100 text-red-700',
  };
  return clsx('px-2 py-0.5 rounded-full text-xs font-medium', colors[status] || 'bg-slate-100 text-slate-600');
}

export function severityColor(severity: string) {
  const map: Record<string, string> = {
    critical: 'border-l-red-500 bg-red-50',
    warning: 'border-l-amber-500 bg-amber-50',
    info: 'border-l-blue-500 bg-blue-50',
  };
  return map[severity] || 'border-l-slate-300 bg-slate-50';
}

export const CHART_COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444', '#06b6d4'];
