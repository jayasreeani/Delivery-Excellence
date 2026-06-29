'use client';

import type { Project } from '@/types';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  showDefects?: boolean;
}

export default function ProjectCard({ project, showDefects = true }: ProjectCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 flex flex-col">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-slate-800">{project.name}</h3>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {project.source_tags?.map((tag) => (
              <span key={tag} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{tag}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1.5">
          <span className="text-slate-500">Progress</span>
          <span className="font-medium text-slate-700">{project.progress_pct}%</span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full transition-all"
            style={{ width: `${project.progress_pct}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 text-center mb-4">
        <div>
          <p className="text-lg font-bold text-slate-800">{project.total_tasks}</p>
          <p className="text-xs text-slate-500">Total</p>
        </div>
        <div>
          <p className="text-lg font-bold text-emerald-600">{project.completed}</p>
          <p className="text-xs text-slate-500">Done</p>
        </div>
        <div>
          <p className="text-lg font-bold text-blue-600">{project.in_progress}</p>
          <p className="text-xs text-slate-500">In Progress</p>
        </div>
      </div>

      {showDefects && (
        <div className="flex justify-between text-sm border-t border-slate-100 pt-3 mb-4">
          <span className="text-slate-500">Defects: <span className={project.defects > 5 ? 'text-red-500 font-medium' : 'text-slate-700'}>{project.defects}</span></span>
          <span className="text-slate-500">Velocity: <span className="text-slate-700 font-medium">{Math.round(project.avg_velocity)} pts</span></span>
          <span className="text-slate-500">{project.current_sprint}</span>
        </div>
      )}

      <Link
        href={`/work-items?project=${project.id}`}
        className="mt-auto flex items-center justify-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium py-2 border border-blue-100 rounded-lg hover:bg-blue-50 transition-colors"
      >
        View Details
        <ChevronDown size={16} className="rotate-[-90deg]" />
      </Link>
    </div>
  );
}
