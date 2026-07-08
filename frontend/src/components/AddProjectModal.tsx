'use client';

import { FormEvent, useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { api } from '@/lib/api';
import type { DataSource } from '@/types';

interface AddProjectModalProps {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
}

export default function AddProjectModal({ open, onClose, onCreated }: AddProjectModalProps) {
  const [sources, setSources] = useState<DataSource[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!open) return;
    api.getDataSources().then(setSources).catch(() => setSources([]));
    setError('');
  }, [open]);

  if (!open) return null;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    const form = new FormData(e.currentTarget);
    const tags = String(form.get('source_tags') || '')
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    try {
      await api.createProject({
        name: String(form.get('name') || ''),
        description: String(form.get('description') || '') || undefined,
        data_source_id: String(form.get('data_source_id') || '') || undefined,
        source_tags: tags.length ? tags : undefined,
        current_sprint: String(form.get('current_sprint') || '') || undefined,
        progress_pct: Number(form.get('progress_pct') || 0),
      });
      onCreated();
      onClose();
      e.currentTarget.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create project');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white shadow-xl border border-slate-100">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">Add Project</h2>
            <p className="text-sm text-slate-500">Create a delivery project to track work items and reports.</p>
          </div>
          <button onClick={onClose} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Project name *</label>
            <input name="name" required className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" placeholder="e.g. API Modernization" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
            <textarea name="description" rows={3} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" placeholder="Brief project summary" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Data source</label>
              <select name="data_source_id" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm">
                <option value="">None</option>
                {sources.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Current sprint</label>
              <input name="current_sprint" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" placeholder="Sprint 1" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Progress (%)</label>
              <input name="progress_pct" type="number" min={0} max={100} defaultValue={0} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Source tags</label>
              <input name="source_tags" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" placeholder="Jira, Azure DevOps" />
            </div>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50">
              Cancel
            </button>
            <button type="submit" disabled={submitting} className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60">
              {submitting ? 'Adding...' : 'Add Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
