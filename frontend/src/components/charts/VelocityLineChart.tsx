'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CHART_COLORS } from '@/lib/utils';

interface Props {
  data: { project: string; sprint: string; velocity: number; date: string }[];
}

export default function VelocityLineChart({ data }: Props) {
  const projects = [...new Set(data.map((d) => d.project))];
  const sprints = [...new Set(data.map((d) => d.sprint))].sort();

  const chartData = sprints.map((sprint) => {
    const point: Record<string, string | number> = { sprint };
    data.filter((d) => d.sprint === sprint).forEach((d) => {
      point[d.project] = d.velocity;
    });
    return point;
  });

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
      <h3 className="font-semibold text-slate-800 mb-4">Velocity Trend</h3>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="sprint" tick={{ fontSize: 11 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          {projects.map((project, i) => (
            <Line
              key={project}
              type="monotone"
              dataKey={project}
              stroke={CHART_COLORS[i % CHART_COLORS.length]}
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
