const MAX_STORY_LENGTH = 12_000;
const MAX_CONTEXT_LENGTH = 8_000;
const MAX_LIST_ITEMS = 50;

function stringList(value, field, errors) {
  if (value === undefined) return [];
  if (!Array.isArray(value)) {
    errors.push(`${field} must be an array of strings`);
    return [];
  }
  if (value.length > MAX_LIST_ITEMS) {
    errors.push(`${field} cannot contain more than ${MAX_LIST_ITEMS} items`);
  }
  if (value.some((item) => typeof item !== 'string')) {
    errors.push(`${field} must contain only strings`);
  }
  return value.filter((item) => typeof item === 'string');
}

export function validateGenerationRequest(body) {
  const errors = [];

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return { errors: ['Request body must be a JSON object'] };
  }

  const userStory = typeof body.userStory === 'string' ? body.userStory.trim() : '';
  if (!userStory) errors.push('userStory is required');
  if (userStory.length > MAX_STORY_LENGTH) {
    errors.push(`userStory cannot exceed ${MAX_STORY_LENGTH} characters`);
  }

  const productContext =
    typeof body.productContext === 'string' ? body.productContext.trim() : '';
  if (body.productContext !== undefined && typeof body.productContext !== 'string') {
    errors.push('productContext must be a string');
  }
  if (productContext.length > MAX_CONTEXT_LENGTH) {
    errors.push(`productContext cannot exceed ${MAX_CONTEXT_LENGTH} characters`);
  }

  const requestedCount = body.testCount ?? 15;
  if (!Number.isInteger(requestedCount) || requestedCount < 3 || requestedCount > 40) {
    errors.push('testCount must be an integer between 3 and 40');
  }

  const scenarios = stringList(body.scenarios, 'scenarios', errors);
  const acceptanceCriteria = stringList(
    body.acceptanceCriteria,
    'acceptanceCriteria',
    errors,
  );
  const userPersonas = stringList(body.userPersonas, 'userPersonas', errors);
  const constraints = stringList(body.constraints, 'constraints', errors);

  if (errors.length) return { errors };

  return {
    value: {
      userStory,
      scenarios,
      acceptanceCriteria,
      productContext,
      userPersonas,
      constraints,
      testCount: requestedCount,
    },
  };
}
