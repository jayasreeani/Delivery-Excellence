'use client';

import type { ReportData } from '@/types';
import { severityColor } from '@/lib/utils';

interface Props {
  data: ReportData;
  title?: string;
}

export default function ReportPreview({ data, title }: Props) {
  const reportTitle = title || `${data.reportType.charAt(0).toUpperCase() + data.reportType.slice(1)} Delivery Report`;

  return (
    <div id="report-preview" className="bg-white rounded-xl p-8 shadow-sm border border-slate-100 print:shadow-none print:border-0">
      <div className="border-b border-slate-200 pb-6 mb-6">
        <h2 className="text-2xl font-bold text-slate-800">{reportTitle}</h2>
        <p className="text-sm text-slate-500 mt-1">
          {data.period.from} — {data.period.to} · {data.audience === 'client' ? 'Client' : 'Internal'} audience
        </p>
        <p className="text-xs text-slate-400 mt-1">Generated {new Date(data.generatedAt).toLocaleString()}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {[
          { label: 'Total Tasks', value: data.metrics.totalTasks },
          { label: 'Completed', value: data.metrics.completed },
          { label: 'In Progress', value: data.metrics.inProgress },
          { label: 'Defects', value: data.metrics.defects },
          { label: 'Avg Velocity', value: `${data.metrics.avgVelocity} pts` },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-slate-50 rounded-lg p-4 text-center">
            <p className="text-xl font-bold text-slate-800">{kpi.value}</p>
            <p className="text-xs text-slate-500 mt-1">{kpi.label}</p>
          </div>
        ))}
      </div>

      <div className="mb-8">
        <h3 className="font-semibold text-slate-800 mb-3">Projects</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {data.projects.map((p) => (
            <div key={p.name} className="border border-slate-100 rounded-lg p-4">
              <p className="font-medium text-slate-800">{p.name}</p>
              <p className="text-sm text-slate-500 mt-1">{p.sprint} · {p.progress}% complete</p>
            </div>
          ))}
        </div>
      </div>

      {data.highlights.length > 0 && (
        <div className="mb-8">
          <h3 className="font-semibold text-slate-800 mb-3">Key Highlights</h3>
          <div className="space-y-2">
            {data.highlights.map((h, i) => (
              <div key={i} className={`border-l-4 rounded-r-lg p-3 ${severityColor(h.severity as 'info' | 'warning' | 'critical')}`}>
                <p className="font-medium text-sm">{h.title}</p>
                <p className="text-xs text-slate-600 mt-1">{h.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="font-semibold text-slate-800 mb-3">Status Distribution</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left text-slate-500">
              <th className="py-2">Status</th>
              <th className="py-2 text-right">Count</th>
            </tr>
          </thead>
          <tbody>
            {data.statusDistribution.map((s) => (
              <tr key={s.status} className="border-b border-slate-50">
                <td className="py-2">{s.status}</td>
                <td className="py-2 text-right font-medium">{s.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
