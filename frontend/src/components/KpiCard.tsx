'use client';

import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import clsx from 'clsx';

interface KpiCardProps {
  label: string;
  value: number | string;
  change?: number;
  changeLabel?: string;
  variant?: 'default' | 'danger' | 'success';
  suffix?: string;
}

export default function KpiCard({ label, value, change, changeLabel, variant = 'default', suffix }: KpiCardProps) {
  const trend = change !== undefined ? (change > 0 ? 'up' : change < 0 ? 'down' : 'flat') : null;

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
      <p className="text-sm text-slate-500 mb-1">{label}</p>
      <p className={clsx(
        'text-3xl font-bold',
        variant === 'danger' ? 'text-red-500' : variant === 'success' ? 'text-emerald-600' : 'text-slate-800'
      )}>
        {value}{suffix && <span className="text-lg font-medium text-slate-500 ml-1">{suffix}</span>}
      </p>
      {trend && changeLabel && (
        <div className={clsx(
          'flex items-center gap-1 mt-2 text-xs font-medium',
          trend === 'up' ? 'text-emerald-600' : trend === 'down' ? 'text-red-500' : 'text-slate-400'
        )}>
          {trend === 'up' && <TrendingUp size={14} />}
          {trend === 'down' && <TrendingDown size={14} />}
          {trend === 'flat' && <Minus size={14} />}
          {change !== undefined && `${change > 0 ? '+' : ''}${change}%`} {changeLabel}
        </div>
      )}
    </div>
  );
}
