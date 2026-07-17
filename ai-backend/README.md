# User-focused test-case agent

A standalone OpenAI-powered API that turns user stories, scenarios, and acceptance
criteria into structured test cases. It considers normal flows as well as plausible
edge cases, misuse, accessibility, privacy, recovery, concurrency, and localization.

## Run locally

Requires Node.js 20 or newer.

```powershell
npm install
Copy-Item .env.example .env
# Add your OPENAI_API_KEY to .env
npm start
```

The API listens on `http://localhost:4100` by default.

## Generate test cases

`POST /api/test-cases`

```json
{
  "userStory": "As a customer, I want to reset my password so that I can regain access.",
  "scenarios": [
    "The customer no longer has access to the registered email"
  ],
  "acceptanceCriteria": [
    "A registered customer receives a single-use reset link",
    "The link expires after 30 minutes"
  ],
  "productContext": "Consumer banking web app containing sensitive data",
  "userPersonas": [
    "Customer using a screen reader",
    "Customer on an unreliable mobile connection"
  ],
  "constraints": [
    "Do not reveal whether an email address is registered"
  ],
  "testCount": 15
}
```

Example request:

```powershell
$body = @{
  userStory = "As a customer, I want to reset my password"
  acceptanceCriteria = @("A single-use link is sent", "The link expires in 30 minutes")
  testCount = 10
} | ConvertTo-Json

Invoke-RestMethod `
  -Uri http://localhost:4100/api/test-cases `
  -Method Post `
  -ContentType "application/json" `
  -Headers @{ "x-api-key" = "your-AGENT_API_KEY" } `
  -Body $body
```

Only `userStory` is required. `testCount` defaults to 15 and accepts 3–40.
If `AGENT_API_KEY` is empty or omitted, the `x-api-key` header is not required.

The response contains:

- story summary, assumptions, and unresolved questions
- selected coverage categories and why they matter
- prioritized, user-perspective test cases
- preconditions, test data, action/expected-result steps, rationale, tags, and
  an automation-candidate flag
- model and generation metadata

## Other endpoints

- `GET /health` — service and OpenAI configuration status

## Test

```powershell
npm test
```

Tests mock OpenAI; they do not spend API credits.
