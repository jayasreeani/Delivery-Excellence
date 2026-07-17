import assert from 'node:assert/strict';
import test from 'node:test';
import { validateGenerationRequest } from '../src/validation.js';

test('normalizes a valid generation request and supplies defaults', () => {
  const result = validateGenerationRequest({
    userStory: '  As a customer, I can reset my password.  ',
    acceptanceCriteria: ['Reset link is emailed'],
  });

  assert.deepEqual(result.errors, undefined);
  assert.equal(result.value.userStory, 'As a customer, I can reset my password.');
  assert.equal(result.value.testCount, 15);
  assert.deepEqual(result.value.scenarios, []);
});

test('rejects missing stories and invalid test counts', () => {
  const result = validateGenerationRequest({
    userStory: ' ',
    testCount: 100,
  });

  assert.deepEqual(result.errors, [
    'userStory is required',
    'testCount must be an integer between 3 and 40',
  ]);
});

test('rejects non-string list entries', () => {
  const result = validateGenerationRequest({
    userStory: 'A valid story',
    scenarios: ['valid', 42],
  });

  assert.deepEqual(result.errors, ['scenarios must contain only strings']);
});
