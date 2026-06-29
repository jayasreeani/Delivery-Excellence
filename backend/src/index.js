import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cron from 'node-cron';
import authRoutes from './routes/auth.js';
import projectRoutes from './routes/projects.js';
import workItemRoutes from './routes/workItems.js';
import metricsRoutes from './routes/metrics.js';
import reportRoutes from './routes/reports.js';
import dataSourceRoutes from './routes/dataSources.js';
import insightRoutes from './routes/insights.js';
import { generateReport } from './services/deliveryService.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:3000' }));
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/work-items', workItemRoutes);
app.use('/api/metrics', metricsRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/data-sources', dataSourceRoutes);
app.use('/api/insights', insightRoutes);

// Scheduled report generation
cron.schedule('0 8 * * 1', async () => {
  console.log('Running scheduled weekly report...');
  try {
    const dateTo = new Date().toISOString().split('T')[0];
    const dateFrom = new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0];
    await generateReport({ reportType: 'weekly', audience: 'internal', dateFrom, dateTo });
    console.log('Weekly report generated.');
  } catch (err) {
    console.error('Scheduled report failed:', err.message);
  }
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Delivery Platform API running on http://localhost:${PORT}`);
});
