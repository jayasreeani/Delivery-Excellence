'use client';

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CHART_COLORS } from '@/lib/utils';

interface Props {
  data: { name: string; value: number }[];
  onSliceClick?: (name: string) => void;
}

export default function ProjectPieChart({ data, onSliceClick }: Props) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const enriched = data.map((d) => ({
    ...d,
    percent: total > 0 ? ((d.value / total) * 100).toFixed(1) : '0',
  }));

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
      <h3 className="font-semibold text-slate-800 mb-4">Project Task Distribution</h3>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={enriched}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            cursor="pointer"
            onClick={(d) => onSliceClick?.(d.name)}
            label={({ name, percent }) => `${name.split(' ')[0]} ${percent}%`}
          >
            {enriched.map((_, i) => (
              <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => [value, 'Tasks']} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
