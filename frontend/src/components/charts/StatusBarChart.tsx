'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { statusColor } from '@/lib/utils';

interface Props {
  data: { status: string; count: number }[];
  onBarClick?: (status: string) => void;
}

export default function StatusBarChart({ data, onBarClick }: Props) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
      <h3 className="font-semibold text-slate-800 mb-4">Task Status Distribution</h3>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis type="number" />
          <YAxis type="category" dataKey="status" width={90} tick={{ fontSize: 12 }} />
          <Tooltip />
          <Bar dataKey="count" radius={[0, 4, 4, 0]} cursor="pointer" onClick={(d) => onBarClick?.(d.status)}>
            {data.map((entry) => (
              <Cell key={entry.status} fill={statusColor(entry.status).replace('bg-', '') === 'status-done' ? '#10b981' :
                entry.status === 'In Progress' ? '#3b82f6' :
                entry.status === 'Review' ? '#8b5cf6' :
                entry.status === 'Blocked' ? '#ef4444' : '#94a3b8'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
