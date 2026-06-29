import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { getProjects, getProjectBySlug } from '../services/deliveryService.js';

const router = Router();

router.get('/', authMiddleware, async (req, res) => {
  try {
    const projects = await getProjects();
    if (req.user.role === 'client') {
      return res.json(projects.map((p) => ({
        ...p,
        defects: undefined,
        avg_velocity: undefined,
      })));
    }
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:slug', authMiddleware, async (req, res) => {
  try {
    const project = await getProjectBySlug(req.params.slug);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
