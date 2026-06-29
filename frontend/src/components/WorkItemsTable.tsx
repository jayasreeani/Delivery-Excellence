'use client';

import type { WorkItem } from '@/types';
import { statusBadge } from '@/lib/utils';

interface Props {
  items: WorkItem[];
  loading?: boolean;
}

export default function WorkItemsTable({ items, loading }: Props) {
  if (loading) {
    return <div className="text-center py-12 text-slate-400">Loading work items...</div>;
  }

  if (!items.length) {
    return <div className="text-center py-12 text-slate-400">No work items found.</div>;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 text-left text-slate-500">
              <th className="px-4 py-3 font-medium">ID</th>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Project</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Priority</th>
              <th className="px-4 py-3 font-medium">Sprint</th>
              <th className="px-4 py-3 font-medium">Assignee</th>
              <th className="px-4 py-3 font-medium">Source</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3 font-mono text-xs text-slate-600">{item.work_item_id}</td>
                <td className="px-4 py-3 text-slate-800 max-w-xs truncate">{item.title}</td>
                <td className="px-4 py-3 text-slate-600">{item.project_name}</td>
                <td className="px-4 py-3"><span className={statusBadge(item.status)}>{item.status}</span></td>
                <td className="px-4 py-3 text-slate-600">{item.priority}</td>
                <td className="px-4 py-3 text-slate-600">{item.sprint}</td>
                <td className="px-4 py-3 text-slate-600">{item.assigned_to || '—'}</td>
                <td className="px-4 py-3 text-slate-500 text-xs">{item.source_system}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
