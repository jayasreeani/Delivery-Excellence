import { Router } from 'express';
import { authMiddleware, requireRole } from '../middleware/auth.js';
import { generateReport } from '../services/deliveryService.js';
import { query } from '../db/pool.js';

const router = Router();

router.get('/', authMiddleware, async (req, res) => {
  try {
    const result = await query('SELECT id, title, report_type, audience, date_from, date_to, created_at FROM reports ORDER BY created_at DESC LIMIT 50');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/generate', authMiddleware, async (req, res) => {
  try {
    const { reportType, audience, projectIds, dateFrom, dateTo } = req.body;
    if (!reportType || !audience || !dateFrom || !dateTo) {
      return res.status(400).json({ error: 'reportType, audience, dateFrom, dateTo are required' });
    }
    if (req.user.role === 'client' && audience !== 'client') {
      return res.status(403).json({ error: 'Client users can only generate client-facing reports' });
    }
    const result = await generateReport({
      reportType,
      audience,
      projectIds,
      dateFrom,
      dateTo,
      userId: req.user.id,
    });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const result = await query('SELECT * FROM reports WHERE id = $1', [req.params.id]);
    if (!result.rows[0]) return res.status(404).json({ error: 'Report not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/:id/email', authMiddleware, requireRole('management'), async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'email is required' });

    const result = await query('SELECT * FROM reports WHERE id = $1', [req.params.id]);
    if (!result.rows[0]) return res.status(404).json({ error: 'Report not found' });

    // Mock email delivery — replace with SendGrid/SES in production
    console.log(`[Email] Report "${result.rows[0].title}" sent to ${email}`);
    res.json({
      success: true,
      message: `Report queued for delivery to ${email}`,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
