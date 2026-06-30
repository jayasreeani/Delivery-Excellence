'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import KpiCard from '@/components/KpiCard';
import FiltersBar from '@/components/FiltersBar';
import StatusBarChart from '@/components/charts/StatusBarChart';
import VelocityLineChart from '@/components/charts/VelocityLineChart';
import ProjectPieChart from '@/components/charts/ProjectPieChart';
import ProjectCard from '@/components/ProjectCard';
import InsightsPanel from '@/components/InsightsPanel';
import ConnectionBanner, { LiveIndicator } from '@/components/ConnectionBanner';
import { api } from '@/lib/api';
import { useAuth } from '@/components/AuthProvider';
import type { Metrics, Project, Filters, AiInsight } from '@/types';

const REFRESH_INTERVAL_MS = 60_000;

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [insights, setInsights] = useState<AiInsight[]>([]);
  const [sprints, setSprints] = useState<string[]>([]);
  const [sources, setSources] = useState<string[]>([]);
  const [filters, setFilters] = useState<Filters>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const loadData = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    setError('');
    try {
      const [m, p, i, f] = await Promise.all([
        api.getMetrics(filters),
        api.getProjects(),
        user?.role === 'management' ? api.getInsights() : Promise.resolve([]),
        api.getFilterOptions(),
      ]);
      setMetrics(m);
      setProjects(p);
      setInsights(i);
      setSprints(f.sprints);
      setSources(f.sources);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load dashboard data');
    } finally {
      if (!silent) setLoading(false);
    }
  }, [filters, user?.role]);

  useEffect(() => { loadData(); }, [loadData]);

  useEffect(() => {
    const interval = setInterval(() => loadData(true), REFRESH_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [loadData]);

  const handleBarClick = (status: string) => {
    router.push(`/work-items?status=${encodeURIComponent(status)}`);
  };

  const handleSliceClick = (name: string) => {
    const project = projects.find((p) => p.name === name);
    if (project) router.push(`/work-items?project=${project.id}`);
  };

  const handleExport = () => {
    if (!metrics) return;
    const blob = new Blob([JSON.stringify(metrics, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dashboard-metrics.json';
    a.click();
  };

  if (loading && !metrics) {
    return <div className="text-center py-20 text-slate-400">Loading dashboard...</div>;
  }

  const kpis = metrics?.kpis;

  return (
    <div>
      <Header
        title="Dashboard"
        subtitle="Overview of all projects and key metrics"
        onExport={handleExport}
      />

      <ConnectionBanner />
      <LiveIndicator lastUpdated={lastUpdated} />

      {error && (
        <div className="mb-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg px-4 py-3">
          {error}
          <button onClick={() => loadData()} className="ml-3 underline font-medium">Retry</button>
        </div>
      )}

      <FiltersBar
        filters={filters}
        onChange={setFilters}
        projects={projects}
        sprints={sprints}
        sources={sources}
      />

      {kpis && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
          <KpiCard label="Total Tasks" value={kpis.totalTasks} change={4} changeLabel="vs last sprint" />
          <KpiCard label="Completed" value={kpis.completed} change={12} changeLabel="vs last sprint" variant="success" />
          <KpiCard label="In Progress" value={kpis.inProgress} change={-5} changeLabel="vs last sprint" />
          <KpiCard label="Defects" value={kpis.defects} changeLabel="open defects" variant="danger" />
          <KpiCard label="Avg Velocity" value={kpis.avgVelocity} suffix="pts" change={kpis.velocityChange} changeLabel="vs last sprint" />
        </div>
      )}

      {metrics && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <StatusBarChart data={metrics.statusDistribution} onBarClick={handleBarClick} />
          <VelocityLineChart data={metrics.velocityTrend} />
          <ProjectPieChart data={metrics.projectDistribution} onSliceClick={handleSliceClick} />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Active Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p} showDefects={user?.role === 'management'} />
            ))}
          </div>
        </div>
        {user?.role === 'management' && (
          <InsightsPanel insights={insights} />
        )}
      </div>
    </div>
  );
}
