# TEAM360 – Delivery Intelligence Platform

This repository contains two related applications:

1. **Static prototype** (`index.html`) — Employee 360° and project governance UI (no build step)
2. **Full-stack Delivery Platform** (`frontend/` + `backend/`) — Jira/Azure DevOps reporting with PostgreSQL

See **[DELIVERY_PLATFORM.md](./DELIVERY_PLATFORM.md)** for the full-stack app (recommended for development).

## Quick Start (Full-Stack Platform)

Requires Node.js 18+, npm, and PostgreSQL (Docker optional).

```bash
# Install dependencies
npm run install:all

# Start PostgreSQL (Docker) or use a local instance
npm run db:up          # Docker
# — or configure DATABASE_URL in backend/.env for local Postgres

# Initialize database
cp backend/.env.example backend/.env
npm run db:setup && npm run db:seed

# Run API and frontend (separate terminals)
npm run backend:dev    # http://localhost:4000
npm run frontend:dev   # http://localhost:3000

# Verify API
npm run smoke-test
```

Demo logins: `admin@delivery.com` / `password123` (management), `client@delivery.com` / `password123` (client).

## Quick Start (Static Prototype)

Open `index.html` in any modern browser — no build step or Node.js required.

```
Double-click index.html
```

Or serve locally (optional):

```powershell
# Python 3
python -m http.server 8080
# Then open http://localhost:8080
```

## Features

| Module | Description |
|--------|-------------|
| **Executive Dashboard** | KPIs, project/team overview, 9-box snapshot, analytics, resource heatmap, weekly summary, risks, AI insights |
| **Employees** | Filterable table + full 360° profile (skills, performance, leave, certifications, manager notes) |
| **Projects** | Project cards + detail pages (sprint progress, issues, team, risks, metrics) |
| **Talent (9-Box)** | Interactive 3×3 matrix with drill-down modals |
| **Reports** | Weekly, monthly/quarterly views + report templates |
| **Risks & Issues** | Project and people risk center |
| **Resources** | Utilization heatmap and over/under-allocation |
| **Insights** | AI-generated recommendations |

## Design System

- **Primary:** Indigo/Blue (`#6366f1`)
- **Secondary:** Teal, Purple
- **Status:** Green (healthy), Amber (warning), Red (risk)
- **Style:** Rounded cards (12–16px), soft shadows, Inter typography
- **References:** Microsoft Viva, Notion, Power BI, Workday

## Structure

```
Team360 Project/
├── index.html
├── assets/
│   ├── css/main.css
│   └── js/
│       ├── app.js        # Router & app shell
│       ├── components.js # Reusable UI & charts
│       ├── data.js       # Mock data
│       └── pages.js      # Page renderers
└── README.md
```

## Navigation

Use the left sidebar or hash routes:

- `#/` — Dashboard
- `#/employees` — Employee list
- `#/employees/e1` — Employee 360 profile
- `#/projects` — Projects
- `#/projects/p1` — Project details
- `#/talent` — 9-Box matrix
- `#/risks`, `#/resources`, `#/insights`, `#/reports`

## Next Steps (Production)

1. Connect to Jira / Azure DevOps APIs for live project data
2. Integrate HRIS for employee records
3. Add authentication (Azure AD / SSO)
4. Backend for AI insights and report generation
5. Migrate to React/Next.js with Node.js for scalable deployment
