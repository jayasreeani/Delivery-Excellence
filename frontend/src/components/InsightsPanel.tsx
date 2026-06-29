'use client';

import type { AiInsight } from '@/types';
import { severityColor } from '@/lib/utils';
import { Sparkles } from 'lucide-react';

interface Props {
  insights: AiInsight[];
}

export default function InsightsPanel({ insights }: Props) {
  if (!insights.length) return null;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles size={18} className="text-purple-500" />
        <h3 className="font-semibold text-slate-800">AI Insights</h3>
      </div>
      <div className="space-y-3">
        {insights.map((insight) => (
          <div key={insight.id} className={`border-l-4 rounded-r-lg p-3 ${severityColor(insight.severity)}`}>
            <p className="font-medium text-sm text-slate-800">{insight.title}</p>
            <p className="text-xs text-slate-600 mt-1">{insight.description}</p>
            {insight.project_name && (
              <p className="text-xs text-slate-400 mt-1">{insight.project_name}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
