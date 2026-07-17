import assert from 'node:assert/strict';
import test from 'node:test';
import {
  AgentConfigurationError,
  createTestCaseAgent,
} from '../src/testCaseAgent.js';

const input = {
  userStory: 'As a customer, I can reset my password.',
  scenarios: [],
  acceptanceCriteria: ['A reset link is sent to a registered email.'],
  productContext: 'Consumer web application',
  userPersonas: ['Customer using a screen reader'],
  constraints: [],
  testCount: 3,
};

test('fails clearly when OpenAI is not configured', async () => {
  const agent = createTestCaseAgent({ apiKey: '' });
  await assert.rejects(() => agent.generate(input), AgentConfigurationError);
});

test('requests structured output and adds generation metadata', async () => {
  let request;
  const client = {
    chat: {
      completions: {
        create: async (value) => {
          request = value;
          return {
            choices: [{
              message: {
                content: JSON.stringify({
                  summary: 'Password reset coverage',
                  assumptions: [],
                  clarifyingQuestions: [],
                  coverage: [],
                  testCases: [{ id: 'TC-001' }],
                }),
              },
            }],
          };
        },
      },
    },
  };

  const agent = createTestCaseAgent({ client, model: 'test-model' });
  const result = await agent.generate(input);

  assert.equal(request.model, 'test-model');
  assert.equal(request.response_format.type, 'json_schema');
  assert.match(request.messages[1].content, /screen reader/);
  assert.equal(result.metadata.model, 'test-model');
  assert.equal(result.metadata.generatedTestCount, 1);
});
