# AGENTS.md

## Cursor Cloud specific instructions

This repo contains a static prototype (`index.html` + `assets/`, no build) and the
recommended full-stack **Delivery Reporting & Insights Platform**: Next.js frontend
(`frontend/`), Express API (`backend/`), and PostgreSQL. Standard commands live in
`README.md`, `DELIVERY_PLATFORM.md`, and the root/`backend`/`frontend` `package.json`
scripts; only the non-obvious cloud caveats are captured here.

### Database (PostgreSQL)
- Docker is **not** available in this environment. Instead of `npm run db:up`, a native
  PostgreSQL 16 server is used (installed via the update-script snapshot). The
  `delivery` role, `delivery_platform` DB, and `backend/.env` connection string all
  match `backend/.env.example` (`postgresql://delivery:delivery123@localhost:5432/delivery_platform`).
- The server is not auto-started on boot. If the API cannot connect, start it with:
  `sudo pg_ctlcluster 16 main start`
- Schema + seed data persist in the VM snapshot. To reset data, re-run
  `npm run db:setup` then `npm run db:seed` from the repo root. Demo logins:
  `admin@delivery.com` / `password123` (management), `client@delivery.com` / `password123` (client).

### Env files
- `backend/.env` and `frontend/.env.local` are git-ignored. They are created from the
  `*.example` files (handled by the update script). `USE_MOCK_INTEGRATIONS=true` is the
  default, so no real Jira/Azure credentials are needed for local development.

### Running services (do NOT put these in the update script)
- Backend API (port 4000): `npm run backend:dev`
- Frontend (port 3000): `npm run frontend:dev`
- Run each in its own long-lived shell/tmux session. The backend uses `node --watch`;
  the frontend uses Next.js dev with hot reload.
- API smoke test (requires the backend running): `npm run smoke-test`.

### Lint caveat
- `cd frontend && npm run lint` (`next lint`) is **interactive** because the repo ships
  no committed ESLint config — it prompts to pick a config and blocks. There is no
  configured, non-interactive lint in this repo; treat lint as not set up rather than
  adding config.
