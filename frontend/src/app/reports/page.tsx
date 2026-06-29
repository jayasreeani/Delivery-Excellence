'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import ReportPreview from '@/components/ReportPreview';
import { api } from '@/lib/api';
import { useAuth } from '@/components/AuthProvider';
import type { Project, ReportData } from '@/types';
import { FileText, Mail, Eye, Download, Clock } from 'lucide-react';

type ReportType = 'weekly' | 'biweekly' | 'monthly';
type Audience = 'client' | 'internal';

interface SavedReport {
  id: string;
  title: string;
  report_type: string;
  audience: string;
  date_from: string;
  date_to: string;
  created_at: string;
}

function getDateRange(reportType: ReportType) {
  const to = new Date();
  const from = new Date();
  if (reportType === 'weekly') from.setDate(from.getDate() - 7);
  else if (reportType === 'biweekly') from.setDate(from.getDate() - 14);
  else from.setMonth(from.getMonth() - 1);
  return {
    dateFrom: from.toISOString().split('T')[0],
    dateTo: to.toISOString().split('T')[0],
  };
}

export default function ReportsPage() {
  const { user } = useAuth();
  const isManagement = user?.role === 'management';

  const [projects, setProjects] = useState<Project[]>([]);
  const [savedReports, setSavedReports] = useState<SavedReport[]>([]);
  const [reportType, setReportType] = useState<ReportType>('weekly');
  const [audience, setAudience] = useState<Audience>(isManagement ? 'internal' : 'client');
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [preview, setPreview] = useState<ReportData | null>(null);
  const [reportId, setReportId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [emailTo, setEmailTo] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    api.getProjects().then(setProjects);
    api.getReports().then(setSavedReports).catch(() => {});
  }, []);

  useEffect(() => {
    const range = getDateRange(reportType);
    setDateFrom(range.dateFrom);
    setDateTo(range.dateTo);
  }, [reportType]);

  const toggleProject = (id: string) => {
    setSelectedProjects((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleGenerate = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const result = await api.generateReport({
        reportType,
        audience: isManagement ? audience : 'client',
        projectIds: selectedProjects.length ? selectedProjects : undefined,
        dateFrom,
        dateTo,
      });
      setPreview(result.data);
      setReportId(result.report.id);
      setSavedReports((prev) => [
        {
          id: result.report.id,
          title: `${reportType} report`,
          report_type: reportType,
          audience,
          date_from: dateFrom,
          date_to: dateTo,
          created_at: new Date().toISOString(),
        },
        ...prev,
      ]);
      setMessage({ type: 'success', text: 'Report generated successfully.' });
    } catch (err) {
      setMessage({ type: 'error', text: err instanceof Error ? err.message : 'Failed to generate report' });
    } finally {
      setLoading(false);
    }
  };

  const handleExportPdf = () => {
    if (!preview) return;
    window.print();
  };

  const handleEmail = async () => {
    if (!reportId || !emailTo) return;
    setLoading(true);
    setMessage(null);
    try {
      await api.emailReport(reportId, emailTo);
      setMessage({ type: 'success', text: `Report queued for delivery to ${emailTo}` });
    } catch (err) {
      setMessage({ type: 'error', text: err instanceof Error ? err.message : 'Failed to send email' });
    } finally {
      setLoading(false);
    }
  };

  const loadSavedReport = async (id: string) => {
    setLoading(true);
    try {
      const report = await api.getReport(id);
      setPreview(report.report_data as ReportData);
      setReportId(id);
    } catch (err) {
      setMessage({ type: 'error', text: err instanceof Error ? err.message : 'Failed to load report' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header title="Reports" subtitle="Generate weekly, biweekly, and monthly delivery reports" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
            <h3 className="font-semibold text-slate-800 mb-4">Report Configuration</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Report Type</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['weekly', 'biweekly', 'monthly'] as ReportType[]).map((type) => (
                    <button
                      key={type}
                      onClick={() => setReportType(type)}
                      className={`px-3 py-2 rounded-lg text-sm capitalize border transition-colors ${
                        reportType === type
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {isManagement && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Audience</label>
                  <select
                    value={audience}
                    onChange={(e) => setAudience(e.target.value as Audience)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                  >
                    <option value="internal">Internal (Management)</option>
                    <option value="client">Client</option>
                  </select>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">From</label>
                  <input
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">To</label>
                  <input
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Projects</label>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {projects.map((p) => (
                    <label key={p.id} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedProjects.includes(p.id)}
                        onChange={() => toggleProject(p.id)}
                        className="rounded border-slate-300"
                      />
                      {p.name}
                    </label>
                  ))}
                </div>
                <p className="text-xs text-slate-400 mt-1">Leave unchecked for all projects</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-6">
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
              >
                <Eye size={16} />
                {loading ? 'Generating...' : 'Preview Report'}
              </button>
              {preview && (
                <>
                  <button
                    onClick={handleExportPdf}
                    className="flex items-center justify-center gap-2 w-full py-2.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm hover:bg-slate-50"
                  >
                    <Download size={16} />
                    Export PDF
                  </button>
                  {isManagement && (
                    <div className="flex gap-2">
                      <input
                        type="email"
                        placeholder="recipient@email.com"
                        value={emailTo}
                        onChange={(e) => setEmailTo(e.target.value)}
                        className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm"
                      />
                      <button
                        onClick={handleEmail}
                        disabled={loading || !emailTo}
                        className="flex items-center gap-1 px-4 py-2 bg-slate-800 text-white rounded-lg text-sm hover:bg-slate-900 disabled:opacity-50"
                      >
                        <Mail size={16} />
                        Send
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>

            {message && (
              <p className={`mt-4 text-sm ${message.type === 'success' ? 'text-emerald-600' : 'text-red-500'}`}>
                {message.text}
              </p>
            )}
          </div>

          {savedReports.length > 0 && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
              <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <Clock size={16} />
                Recent Reports
              </h3>
              <div className="space-y-2">
                {savedReports.slice(0, 8).map((r) => (
                  <button
                    key={r.id}
                    onClick={() => loadSavedReport(r.id)}
                    className="w-full text-left p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors"
                  >
                    <p className="text-sm font-medium text-slate-800 capitalize">{r.report_type} Report</p>
                    <p className="text-xs text-slate-400">{r.date_from} — {r.date_to}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-2">
          {preview ? (
            <ReportPreview data={preview} />
          ) : (
            <div className="bg-white rounded-xl p-12 shadow-sm border border-slate-100 text-center">
              <FileText size={48} className="mx-auto text-slate-300 mb-4" />
              <p className="text-slate-500">Configure and preview a report to see it here.</p>
              <p className="text-xs text-slate-400 mt-2">Weekly reports are auto-generated every Monday at 8 AM.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
