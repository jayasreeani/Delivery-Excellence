# Delivery Reporting & Insights Platform

A full-stack centralized delivery reporting system that integrates **Jira** (multiple instances) and **Azure DevOps Boards**, consolidates project data, and generates automated reports with Power BI-style dashboards.

## Architecture

```
┌─────────────┐     REST/JWT      ┌──────────────┐     PostgreSQL    ┌────────────┐
│  Next.js    │ ◄──────────────► │  Express API │ ◄──────────────► │  Database  │
│  Frontend   │                   │  Backend     │                   │            │
└─────────────┘                   └──────┬───────┘                   └────────────┘
                                         │
                          ┌──────────────┼──────────────┐
                          ▼              ▼              ▼
                     Jira Inst 1   Jira Inst 2   Azure DevOps
                    (401k Web)    (401k Mobile)    (GoGym)
```

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14, React, Tailwind CSS, Recharts |
| Backend | Node.js, Express |
| Database | PostgreSQL 16 |
| Auth | JWT (management / client roles) |
| Integrations | Jira REST API, Azure DevOps WIT API (mock mode supported) |

## Prerequisites

- **Node.js** 18+
- **Docker Desktop** (for PostgreSQL)
- **npm**

## Quick Start

### 1. Start PostgreSQL

```powershell
docker compose up -d
```

### 2. Backend Setup

```powershell
cd backend
copy .env.example .env
npm install
npm run db:setup
npm run db:seed
npm run dev
```

API runs at **http://localhost:4000**

### 3. Frontend Setup

```powershell
cd frontend
copy .env.local.example .env.local
npm install
npm run dev
```

App runs at **http://localhost:3000**

### Demo Accounts

| Email | Password | Role |
|-------|----------|------|
| admin@delivery.com | password123 | Management (full access) |
| client@delivery.com | password123 | Client (limited view) |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | JWT authentication |
| GET | `/api/projects` | List all projects |
| GET | `/api/work-items` | Unified work items (filterable) |
| GET | `/api/metrics` | KPIs, charts data |
| GET | `/api/metrics/filters` | Sprint & source filter options |
| GET/POST | `/api/reports` | List / generate reports |
| POST | `/api/reports/:id/email` | Email report (mock) |
| GET | `/api/data-sources` | Integration status |
| POST | `/api/data-sources/:key/refresh` | Sync from Jira/Azure |
| GET | `/api/insights` | AI insights (management only) |

## Projects & Data Sources

| Project | Source | System |
|---------|--------|--------|
| 401k Web + Salesforce | Jira Instance 1 | Jira |
| 401k Mobile | Jira Instance 2 | Jira |
| GoGym | Azure DevOps | Azure DevOps |

## Features

- **Dashboard** — KPI cards, status bar chart, velocity line chart, project pie chart, filters
- **Projects** — Progress, velocity, defects per project
- **Work Items** — Drill-down from charts with search and filters
- **Reports** — Weekly / biweekly / monthly, client vs internal audience, PDF export, email
- **Data Sources** — Connection status, manual refresh, error display
- **AI Insights** — Velocity drops, risk highlights (management view)
- **Role-based access** — Client users hide defects and internal insights
- **Scheduled reports** — Auto weekly report every Monday at 8 AM (cron)

## Live Integrations

Set `USE_MOCK_INTEGRATIONS=false` in `backend/.env` and configure:

```env
JIRA1_BASE_URL=https://your-org.atlassian.net
JIRA1_EMAIL=you@company.com
JIRA1_API_TOKEN=your-token
JIRA1_PROJECT_KEY=WEB

JIRA2_BASE_URL=...
AZURE_DEVOPS_ORG=your-org
AZURE_DEVOPS_PROJECT=GoGym
AZURE_DEVOPS_PAT=your-pat
```

## Project Structure

```
├── backend/
│   ├── src/
│   │   ├── routes/          # API route handlers
│   │   ├── services/        # Business logic
│   │   ├── integrations/    # Jira, Azure DevOps, normalizer
│   │   ├── middleware/      # JWT auth
│   │   └── db/              # Pool, setup, seed
│   └── .env.example
├── frontend/
│   └── src/
│       ├── app/             # Next.js pages
│       ├── components/      # UI components & charts
│       ├── lib/             # API client, utilities
│       └── types/           # TypeScript interfaces
├── database/
│   └── schema.sql           # PostgreSQL schema
└── docker-compose.yml
```

## Unified Data Model

The `work_items` table normalizes data from all sources:

| Column | Description |
|--------|-------------|
| project_name | Project display name |
| work_item_id | External ID (e.g. WEB-1001) |
| title | Item summary |
| status | To Do, In Progress, Review, Done, Blocked |
| priority | Highest → Lowest |
| sprint | Sprint/iteration name |
| effort | Story points |
| assigned_to | Assignee name |
| created_date / closed_date | Dates |
| source_system | Jira 1, Jira 2, Azure DevOps |
