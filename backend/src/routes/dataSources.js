import { Router } from 'express';
import { authMiddleware, requireRole } from '../middleware/auth.js';
import { getDataSources, refreshDataSource } from '../services/deliveryService.js';

const router = Router();

router.get('/', authMiddleware, async (req, res) => {
  try {
    const sources = await getDataSources();
    res.json(sources);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/:instanceKey/refresh', authMiddleware, requireRole('management'), async (req, res) => {
  try {
    const result = await refreshDataSource(req.params.instanceKey);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
