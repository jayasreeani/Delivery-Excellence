import cors from 'cors';
import express from 'express';
import {
  AgentConfigurationError,
  AgentResponseError,
  createTestCaseAgent,
} from './testCaseAgent.js';
import { validateGenerationRequest } from './validation.js';

function requireApiKey(req, res, next) {
  const expectedKey = process.env.AGENT_API_KEY;
  if (!expectedKey || req.get('x-api-key') === expectedKey) return next();
  return res.status(401).json({ error: 'Invalid or missing API key' });
}

export function createApp(options = {}) {
  const app = express();
  const agent = options.agent ?? createTestCaseAgent();
  const allowedOrigin = process.env.CORS_ORIGIN || 'http://localhost:3000';

  app.disable('x-powered-by');
  app.use(cors({ origin: allowedOrigin }));
  app.use(express.json({ limit: '1mb' }));

  app.get('/health', (_req, res) => {
    res.json({
      status: 'ok',
      service: 'test-case-agent',
      openAiConfigured: Boolean(process.env.OPENAI_API_KEY || options.agent),
    });
  });

  app.post('/api/test-cases', requireApiKey, async (req, res) => {
    const validation = validateGenerationRequest(req.body);
    if (validation.errors) {
      return res.status(400).json({
        error: 'Invalid request',
        details: validation.errors,
      });
    }

    try {
      const result = await agent.generate(validation.value);
      return res.status(200).json(result);
    } catch (error) {
      if (error instanceof AgentConfigurationError) {
        return res.status(503).json({ error: error.message });
      }
      if (error instanceof AgentResponseError) {
        return res.status(502).json({ error: error.message });
      }

      console.error('Test-case generation failed:', error);
      const status = Number.isInteger(error?.status) ? error.status : 500;
      const safeStatus = status >= 400 && status < 500 ? status : 500;
      return res.status(safeStatus).json({
        error:
          safeStatus === 429
            ? 'OpenAI rate limit reached; retry later'
            : 'Test-case generation failed',
      });
    }
  });

  app.use((_req, res) => {
    res.status(404).json({ error: 'Not found' });
  });

  app.use((error, _req, res, _next) => {
    if (error instanceof SyntaxError && 'body' in error) {
      return res.status(400).json({ error: 'Request body contains invalid JSON' });
    }
    console.error('Unhandled API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  });

  return app;
}
