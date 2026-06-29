import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { getWorkItems } from '../services/deliveryService.js';

const router = Router();

router.get('/', authMiddleware, async (req, res) => {
  try {
    const filters = {
      project: req.query.project,
      sprint: req.query.sprint,
      source: req.query.source,
      status: req.query.status,
      dateFrom: req.query.dateFrom,
      dateTo: req.query.dateTo,
      search: req.query.search,
      limit: parseInt(req.query.limit, 10) || 100,
      offset: parseInt(req.query.offset, 10) || 0,
    };
    const data = await getWorkItems(filters);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
