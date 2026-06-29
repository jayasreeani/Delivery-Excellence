import { normalizeJiraIssue } from './normalizer.js';

const MOCK_JIRA1_ISSUES = [
  { key: 'WEB-2001', fields: { summary: 'Salesforce SSO integration', status: { name: 'Done' }, priority: { name: 'High' }, issuetype: { name: 'Story' }, assignee: { displayName: 'Alex Torres' }, created: '2026-01-15T10:00:00.000Z', resolutiondate: '2026-02-01T10:00:00.000Z', customfield_10016: 8 } },
  { key: 'WEB-2002', fields: { summary: 'Dashboard widget performance', status: { name: 'In Progress' }, priority: { name: 'Medium' }, issuetype: { name: 'Story' }, assignee: { displayName: 'Kevin Patel' }, created: '2026-02-10T10:00:00.000Z', customfield_10016: 5 } },
  { key: 'WEB-2003', fields: { summary: 'Login redirect loop on Safari', status: { name: 'Blocked' }, priority: { name: 'Highest' }, issuetype: { name: 'Bug' }, assignee: { displayName: 'Rachel Nguyen' }, created: '2026-03-01T10:00:00.000Z', customfield_10016: 3 } },
];

const MOCK_JIRA2_ISSUES = [
  { key: 'MOB-3001', fields: { summary: 'Push notification setup', status: { name: 'Done' }, priority: { name: 'High' }, issuetype: { name: 'Story' }, assignee: { displayName: 'David Kim' }, created: '2026-01-20T10:00:00.000Z', resolutiondate: '2026-02-15T10:00:00.000Z', customfield_10016: 5 } },
  { key: 'MOB-3002', fields: { summary: 'Biometric auth crash on Android 14', status: { name: 'In Progress' }, priority: { name: 'Highest' }, issuetype: { name: 'Bug' }, assignee: { displayName: 'David Kim' }, created: '2026-03-05T10:00:00.000Z', customfield_10016: 8 } },
];

async function fetchJiraIssues(baseUrl, email, apiToken, projectKey) {
  const auth = Buffer.from(`${email}:${apiToken}`).toString('base64');
  const jql = encodeURIComponent(`project = ${projectKey} ORDER BY updated DESC`);
  const url = `${baseUrl}/rest/api/3/search?jql=${jql}&maxResults=100&fields=summary,status,priority,assignee,created,resolutiondate,issuetype,customfield_10016`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Basic ${auth}`,
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Jira API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.issues || [];
}

export async function syncJiraInstance(instanceKey, config) {
  const { baseUrl, email, apiToken, projectKey, projectName } = config;
  const useMock = process.env.USE_MOCK_INTEGRATIONS === 'true';

  let issues;
  if (useMock) {
    issues = instanceKey === 'jira1' ? MOCK_JIRA1_ISSUES : MOCK_JIRA2_ISSUES;
    await new Promise((r) => setTimeout(r, 500));
  } else {
    issues = await fetchJiraIssues(baseUrl, email, apiToken, projectKey);
  }

  const sourceSystem = instanceKey === 'jira1' ? 'Jira 1' : 'Jira 2';
  return issues.map((issue) => normalizeJiraIssue(issue, projectName, sourceSystem));
}

export function getJiraConfig(instanceKey) {
  if (instanceKey === 'jira1') {
    return {
      baseUrl: process.env.JIRA1_BASE_URL,
      email: process.env.JIRA1_EMAIL,
      apiToken: process.env.JIRA1_API_TOKEN,
      projectKey: process.env.JIRA1_PROJECT_KEY,
      projectName: '401k Web + Salesforce',
    };
  }
  return {
    baseUrl: process.env.JIRA2_BASE_URL,
    email: process.env.JIRA2_EMAIL,
    apiToken: process.env.JIRA2_API_TOKEN,
    projectKey: process.env.JIRA2_PROJECT_KEY,
    projectName: '401k Mobile',
  };
}
