export interface User {
  id: string;
  email: string;
  name: string;
  role: 'management' | 'client';
}

export interface Project {
  id: string;
  name: string;
  slug: string;
  description: string;
  source_tags: string[];
  current_sprint: string;
  progress_pct: number;
  total_tasks: number;
  completed: number;
  in_progress: number;
  defects: number;
  avg_velocity: number;
  data_source_name: string;
}

export interface WorkItem {
  id: string;
  project_name: string;
  work_item_id: string;
  title: string;
  status: string;
  priority: string;
  sprint: string;
  effort: number;
  assigned_to: string;
  created_date: string;
  closed_date: string | null;
  source_system: string;
  is_defect: boolean;
}

export interface Kpis {
  totalTasks: number;
  completed: number;
  inProgress: number;
  defects: number;
  avgVelocity: number;
  velocityChange: number;
  completionRate: number;
}

export interface Metrics {
  kpis: Kpis;
  statusDistribution: { status: string; count: number }[];
  projectDistribution: { name: string; value: number }[];
  velocityTrend: { project: string; sprint: string; velocity: number; date: string }[];
}

export interface DataSource {
  id: string;
  name: string;
  type: string;
  instance_key: string;
  base_url: string;
  status: 'connected' | 'disconnected' | 'error';
  last_sync_at: string | null;
  last_error: string | null;
}

export interface AiInsight {
  id: string;
  insight_type: string;
  severity: 'info' | 'warning' | 'critical';
  title: string;
  description: string;
  project_name?: string;
}

export interface ReportData {
  generatedAt: string;
  reportType: string;
  audience: string;
  period: { from: string; to: string };
  projects: { name: string; progress: number; sprint: string }[];
  metrics: Kpis;
  statusDistribution: { status: string; count: number }[];
  highlights: { title: string; description: string; severity: string }[];
  topWorkItems: WorkItem[];
}

export interface Filters {
  project?: string;
  sprint?: string;
  source?: string;
  dateFrom?: string;
  dateTo?: string;
  status?: string;
}
