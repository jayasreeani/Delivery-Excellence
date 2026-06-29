import { Router } from 'express';
import { authMiddleware, requireRole } from '../middleware/auth.js';
import { getAiInsights } from '../services/deliveryService.js';

const router = Router();

router.get('/', authMiddleware, requireRole('management'), async (req, res) => {
  try {
    const insights = await getAiInsights();
    res.json(insights);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
