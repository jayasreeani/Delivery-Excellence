'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import WorkItemsTable from '@/components/WorkItemsTable';
import FiltersBar from '@/components/FiltersBar';
import { api } from '@/lib/api';
import type { WorkItem, Project, Filters } from '@/types';

export default function WorkItemsContent() {
  const searchParams = useSearchParams();
  const [items, setItems] = useState<WorkItem[]>([]);
  const [total, setTotal] = useState(0);
  const [projects, setProjects] = useState<Project[]>([]);
  const [sprints, setSprints] = useState<string[]>([]);
  const [sources, setSources] = useState<string[]>([]);
  const [filters, setFilters] = useState<Filters>({
    project: searchParams.get('project') || undefined,
    status: searchParams.get('status') || undefined,
    sprint: searchParams.get('sprint') || undefined,
  });
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.getProjects(), api.getFilterOptions()])
      .then(([p, f]) => { setProjects(p); setSprints(f.sprints); setSources(f.sources); });
  }, []);

  useEffect(() => {
    setLoading(true);
    api.getWorkItems({ ...filters, search: search || undefined, limit: 100 })
      .then((data) => { setItems(data.items); setTotal(data.total); })
      .finally(() => setLoading(false));
  }, [filters, search]);

  return (
    <div>
      <Header title="Work Items" subtitle={`${total} items — drill-down from charts and projects`} />
      <FiltersBar filters={filters} onChange={setFilters} projects={projects} sprints={sprints} sources={sources} />
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by title or ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-slate-200 rounded-lg text-sm"
        />
      </div>
      <WorkItemsTable items={items} loading={loading} />
    </div>
  );
}
