'use client';

import { useEffect, useState, useCallback } from 'react';
import Header from '@/components/Header';
import { api } from '@/lib/api';
import { useAuth } from '@/components/AuthProvider';
import type { DataSource } from '@/types';
import { RefreshCw, CheckCircle, XCircle, AlertCircle, Database } from 'lucide-react';

const TYPE_LABELS: Record<string, string> = {
  jira: 'Atlassian Jira',
  azure_devops: 'Azure DevOps Boards',
};

export default function DataSourcesPage() {
  const { user } = useAuth();
  const isManagement = user?.role === 'management';
  const [sources, setSources] = useState<DataSource[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState<string | null>(null);
  const [message, setMessage] = useState<{ key: string; type: 'success' | 'error'; text: string } | null>(null);

  const loadSources = useCallback(async () => {
    try {
      const data = await api.getDataSources();
      setSources(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadSources(); }, [loadSources]);

  const handleRefresh = async (key: string) => {
    setRefreshing(key);
    setMessage(null);
    try {
      const result = await api.refreshDataSource(key);
      setMessage({ key, type: 'success', text: `Synced ${result.synced} work items successfully.` });
      await loadSources();
    } catch (err) {
      setMessage({
        key,
        type: 'error',
        text: err instanceof Error ? err.message : 'Sync failed',
      });
      await loadSources();
    } finally {
      setRefreshing(null);
    }
  };

  const statusIcon = (status: DataSource['status']) => {
    if (status === 'connected') return <CheckCircle size={20} className="text-emerald-500" />;
    if (status === 'error') return <XCircle size={20} className="text-red-500" />;
    return <AlertCircle size={20} className="text-amber-500" />;
  };

  const statusBadge = (status: DataSource['status']) => {
    const styles = {
      connected: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      error: 'bg-red-50 text-red-700 border-red-200',
      disconnected: 'bg-amber-50 text-amber-700 border-amber-200',
    };
    return (
      <span className={`text-xs font-medium px-2.5 py-1 rounded-full border capitalize ${styles[status]}`}>
        {status}
      </span>
    );
  };

  if (loading) return <div className="text-center py-20 text-slate-400">Loading data sources...</div>;

  return (
    <div>
      <Header
        title="Data Sources"
        subtitle="Manage Jira and Azure DevOps integrations"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {sources.map((source) => (
          <div key={source.id} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                  <Database size={20} className="text-slate-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">{source.name}</h3>
                  <p className="text-xs text-slate-500">{TYPE_LABELS[source.type] || source.type}</p>
                </div>
              </div>
              {statusIcon(source.status)}
            </div>

            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between">
                <span className="text-slate-500">Status</span>
                {statusBadge(source.status)}
              </div>
              {source.base_url && (
                <div className="flex justify-between gap-4">
                  <span className="text-slate-500 shrink-0">URL</span>
                  <span className="text-slate-700 text-right truncate text-xs">{source.base_url}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-slate-500">Last Sync</span>
                <span className="text-slate-700 text-xs">
                  {source.last_sync_at
                    ? new Date(source.last_sync_at).toLocaleString()
                    : 'Never'}
                </span>
              </div>
            </div>

            {source.last_error && source.status === 'error' && (
              <div className="bg-red-50 border border-red-100 rounded-lg p-3 mb-4">
                <p className="text-xs font-medium text-red-700">Last Error</p>
                <p className="text-xs text-red-600 mt-1">{source.last_error}</p>
              </div>
            )}

            {message?.key === source.instance_key && (
              <p className={`text-xs mb-3 ${message.type === 'success' ? 'text-emerald-600' : 'text-red-500'}`}>
                {message.text}
              </p>
            )}

            {isManagement && (
              <button
                onClick={() => handleRefresh(source.instance_key)}
                disabled={refreshing === source.instance_key}
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                <RefreshCw size={16} className={refreshing === source.instance_key ? 'animate-spin' : ''} />
                {refreshing === source.instance_key ? 'Syncing...' : 'Refresh Data'}
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-xl p-6 shadow-sm border border-slate-100">
        <h3 className="font-semibold text-slate-800 mb-2">Integration Notes</h3>
        <ul className="text-sm text-slate-600 space-y-1.5 list-disc list-inside">
          <li>Mock mode is enabled by default (<code className="text-xs bg-slate-100 px-1 rounded">USE_MOCK_INTEGRATIONS=true</code>).</li>
          <li>Configure live credentials in <code className="text-xs bg-slate-100 px-1 rounded">backend/.env</code> to connect to real Jira and Azure DevOps APIs.</li>
          <li>Refresh pulls the latest issues/work items and upserts them into the unified work_items table.</li>
        </ul>
      </div>
    </div>
  );
}
