import assert from 'node:assert/strict';
import test from 'node:test';
import request from 'supertest';
import { createApp } from '../src/app.js';

test('health endpoint reports service status', async () => {
  const app = createApp({ agent: { generate: async () => ({}) } });
  const response = await request(app).get('/health');

  assert.equal(response.status, 200);
  assert.equal(response.body.service, 'test-case-agent');
});

test('generation endpoint validates the request', async () => {
  const app = createApp({ agent: { generate: async () => ({}) } });
  const response = await request(app)
    .post('/api/test-cases')
    .send({ testCount: 1 });

  assert.equal(response.status, 400);
  assert.match(response.body.details.join(' '), /userStory is required/);
});

test('generation endpoint returns the generated suite', async () => {
  let receivedInput;
  const app = createApp({
    agent: {
      generate: async (input) => {
        receivedInput = input;
        return { summary: 'Generated', testCases: [] };
      },
    },
  });

  const response = await request(app)
    .post('/api/test-cases')
    .send({
      userStory: 'As a user, I can save a draft.',
      scenarios: ['The network disconnects while saving'],
      testCount: 5,
    });

  assert.equal(response.status, 200);
  assert.equal(response.body.summary, 'Generated');
  assert.equal(receivedInput.testCount, 5);
  assert.deepEqual(receivedInput.scenarios, [
    'The network disconnects while saving',
  ]);
});
