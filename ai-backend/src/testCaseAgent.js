import OpenAI from 'openai';
import { buildUserPrompt, SYSTEM_PROMPT } from './prompt.js';
import { testCaseResponseFormat } from './testCaseSchema.js';

export class AgentConfigurationError extends Error {}
export class AgentResponseError extends Error {}

export function createTestCaseAgent(options = {}) {
  const apiKey = options.apiKey ?? process.env.OPENAI_API_KEY;
  const model = options.model ?? process.env.OPENAI_MODEL ?? 'gpt-4.1-mini';
  const client = options.client ?? (apiKey ? new OpenAI({ apiKey }) : null);

  async function generate(input) {
    if (!client) {
      throw new AgentConfigurationError(
        'OPENAI_API_KEY is not configured on the server',
      );
    }

    const completion = await client.chat.completions.create({
      model,
      temperature: 0.7,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: buildUserPrompt(input) },
      ],
      response_format: testCaseResponseFormat,
    });

    const message = completion.choices?.[0]?.message;
    if (message?.refusal) {
      throw new AgentResponseError(`The model declined the request: ${message.refusal}`);
    }
    if (!message?.content) {
      throw new AgentResponseError('The model returned an empty response');
    }

    let suite;
    try {
      suite = JSON.parse(message.content);
    } catch {
      throw new AgentResponseError('The model returned invalid JSON');
    }

    if (!Array.isArray(suite.testCases) || suite.testCases.length === 0) {
      throw new AgentResponseError('The model did not return any test cases');
    }

    return {
      ...suite,
      metadata: {
        model,
        requestedTestCount: input.testCount,
        generatedTestCount: suite.testCases.length,
        generatedAt: new Date().toISOString(),
      },
    };
  }

  return { generate };
}
