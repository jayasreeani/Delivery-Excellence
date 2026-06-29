'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import ProjectCard from '@/components/ProjectCard';
import { api } from '@/lib/api';
import { useAuth } from '@/components/AuthProvider';
import type { Project } from '@/types';

export default function ProjectsPage() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getProjects()
      .then(setProjects)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-20 text-slate-400">Loading projects...</div>;

  return (
    <div>
      <Header title="Projects" subtitle="Delivery projects across Jira and Azure DevOps" />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} showDefects={user?.role === 'management'} />
        ))}
      </div>
    </div>
  );
}
