export const TEST_CATEGORIES = [
  'happy_path',
  'negative',
  'boundary',
  'business_rule',
  'accessibility',
  'security_privacy',
  'usability',
  'compatibility',
  'resilience_recovery',
  'concurrency',
  'localization',
  'abuse_misuse',
];

export const testCaseResponseFormat = {
  type: 'json_schema',
  json_schema: {
    name: 'user_focused_test_suite',
    strict: true,
    schema: {
      type: 'object',
      additionalProperties: false,
      required: ['summary', 'assumptions', 'clarifyingQuestions', 'coverage', 'testCases'],
      properties: {
        summary: { type: 'string' },
        assumptions: {
          type: 'array',
          items: { type: 'string' },
        },
        clarifyingQuestions: {
          type: 'array',
          items: { type: 'string' },
        },
        coverage: {
          type: 'array',
          items: {
            type: 'object',
            additionalProperties: false,
            required: ['category', 'reason'],
            properties: {
              category: { type: 'string', enum: TEST_CATEGORIES },
              reason: { type: 'string' },
            },
          },
        },
        testCases: {
          type: 'array',
          items: {
            type: 'object',
            additionalProperties: false,
            required: [
              'id',
              'title',
              'category',
              'priority',
              'userPerspective',
              'preconditions',
              'testData',
              'steps',
              'expectedResult',
              'rationale',
              'automationCandidate',
              'tags',
            ],
            properties: {
              id: { type: 'string' },
              title: { type: 'string' },
              category: { type: 'string', enum: TEST_CATEGORIES },
              priority: { type: 'string', enum: ['critical', 'high', 'medium', 'low'] },
              userPerspective: { type: 'string' },
              preconditions: {
                type: 'array',
                items: { type: 'string' },
              },
              testData: {
                type: 'array',
                items: { type: 'string' },
              },
              steps: {
                type: 'array',
                items: {
                  type: 'object',
                  additionalProperties: false,
                  required: ['action', 'expected'],
                  properties: {
                    action: { type: 'string' },
                    expected: { type: 'string' },
                  },
                },
              },
              expectedResult: { type: 'string' },
              rationale: { type: 'string' },
              automationCandidate: { type: 'boolean' },
              tags: {
                type: 'array',
                items: { type: 'string' },
              },
            },
          },
        },
      },
    },
  },
};
