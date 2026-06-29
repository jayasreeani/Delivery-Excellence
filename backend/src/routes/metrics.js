import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { getMetrics, getSprints, getSources } from '../services/deliveryService.js';

const router = Router();

router.get('/', authMiddleware, async (req, res) => {
  try {
    const filters = {
      project: req.query.project,
      sprint: req.query.sprint,
      source: req.query.source,
      dateFrom: req.query.dateFrom,
      dateTo: req.query.dateTo,
    };
    const metrics = await getMetrics(filters);
    if (req.user.role === 'client') {
      metrics.kpis = { ...metrics.kpis, defects: undefined };
    }
    res.json(metrics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/filters', authMiddleware, async (req, res) => {
  try {
    const [sprints, sources] = await Promise.all([getSprints(), getSources()]);
    res.json({ sprints, sources });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
