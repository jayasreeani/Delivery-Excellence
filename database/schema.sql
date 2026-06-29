-- Delivery Reporting & Insights Platform - PostgreSQL Schema

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'management' CHECK (role IN ('management', 'client')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS data_sources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('jira', 'azure_devops')),
  instance_key VARCHAR(50) UNIQUE NOT NULL,
  base_url VARCHAR(500),
  status VARCHAR(50) DEFAULT 'disconnected' CHECK (status IN ('connected', 'disconnected', 'error')),
  last_sync_at TIMESTAMPTZ,
  last_error TEXT,
  config JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  data_source_id UUID REFERENCES data_sources(id),
  source_tags TEXT[] DEFAULT '{}',
  current_sprint VARCHAR(100),
  progress_pct NUMERIC(5,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS work_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  project_name VARCHAR(255) NOT NULL,
  work_item_id VARCHAR(100) NOT NULL,
  title TEXT NOT NULL,
  status VARCHAR(100) NOT NULL,
  priority VARCHAR(50),
  sprint VARCHAR(100),
  effort NUMERIC(8,2) DEFAULT 0,
  assigned_to VARCHAR(255),
  created_date DATE,
  closed_date DATE,
  source_system VARCHAR(100) NOT NULL,
  is_defect BOOLEAN DEFAULT FALSE,
  UNIQUE(source_system, work_item_id)
);

CREATE TABLE IF NOT EXISTS sprint_velocity (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  sprint_name VARCHAR(100) NOT NULL,
  velocity NUMERIC(8,2) NOT NULL,
  sprint_end_date DATE,
  UNIQUE(project_id, sprint_name)
);

CREATE TABLE IF NOT EXISTS reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(500) NOT NULL,
  report_type VARCHAR(50) NOT NULL CHECK (report_type IN ('weekly', 'biweekly', 'monthly')),
  audience VARCHAR(50) NOT NULL CHECK (audience IN ('client', 'internal')),
  project_ids UUID[] DEFAULT '{}',
  date_from DATE NOT NULL,
  date_to DATE NOT NULL,
  generated_by UUID REFERENCES users(id),
  report_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ai_insights (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  insight_type VARCHAR(50) NOT NULL,
  severity VARCHAR(20) NOT NULL CHECK (severity IN ('info', 'warning', 'critical')),
  title VARCHAR(500) NOT NULL,
  description TEXT,
  project_id UUID REFERENCES projects(id),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_work_items_project ON work_items(project_id);
CREATE INDEX IF NOT EXISTS idx_work_items_status ON work_items(status);
CREATE INDEX IF NOT EXISTS idx_work_items_sprint ON work_items(sprint);
CREATE INDEX IF NOT EXISTS idx_work_items_source ON work_items(source_system);
CREATE INDEX IF NOT EXISTS idx_work_items_created ON work_items(created_date);
