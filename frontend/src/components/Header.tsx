'use client';

import { ReactNode } from 'react';
import { Download, Filter } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onExport?: () => void;
  onFilter?: () => void;
  children?: ReactNode;
}

export default function Header({ title, subtitle, onExport, onFilter, children }: HeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
        {subtitle && <p className="text-slate-500 text-sm mt-1">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-2">
        {children}
        {onFilter && (
          <button onClick={onFilter} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 hover:bg-slate-50 transition-colors">
            <Filter size={16} />
            Filters
          </button>
        )}
        {onExport && (
          <button onClick={onExport} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors">
            <Download size={16} />
            Export
          </button>
        )}
      </div>
    </div>
  );
}
