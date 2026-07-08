'use client';

import { useCallback, useEffect, useState } from 'react';
import Header from '@/components/Header';
import ProjectCard from '@/components/ProjectCard';
import AddProjectModal from '@/components/AddProjectModal';
import { api } from '@/lib/api';
import { useAuth } from '@/components/AuthProvider';
import type { Project } from '@/types';
import { Plus } from 'lucide-react';

export default function ProjectsPage() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const loadProjects = useCallback(() => {
    setLoading(true);
    api.getProjects()
      .then(setProjects)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const filtered = projects.filter((p) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      p.name.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q) ||
      p.current_sprint?.toLowerCase().includes(q) ||
      p.source_tags?.some((tag) => tag.toLowerCase().includes(q))
    );
  });

  if (loading) return <div className="text-center py-20 text-slate-400">Loading projects...</div>;

  return (
    <div>
      <Header title="Projects" subtitle="Delivery projects across Jira and Azure DevOps">
        {user?.role === 'management' && (
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
          >
            <Plus size={16} />
            Add Project
          </button>
        )}
      </Header>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <p className="text-sm text-slate-500">{filtered.length} of {projects.length} projects</p>
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search projects..."
          className="w-full sm:w-72 rounded-lg border border-slate-200 px-3 py-2 text-sm"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-200 bg-white p-12 text-center">
          <h3 className="text-lg font-semibold text-slate-800">No projects yet</h3>
          <p className="text-sm text-slate-500 mt-2">
            {search ? 'No projects match your search.' : 'Add a project to start tracking delivery work.'}
          </p>
          {user?.role === 'management' && !search && (
            <button
              onClick={() => setShowAddModal(true)}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
            >
              <Plus size={16} />
              Add Project
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <ProjectCard key={p.id} project={p} showDefects={user?.role === 'management'} />
          ))}
        </div>
      )}

      <AddProjectModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onCreated={loadProjects}
      />
    </div>
  );
}
