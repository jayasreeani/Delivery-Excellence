import { normalizeAzureWorkItem } from './normalizer.js';

const MOCK_AZURE_ITEMS = [
  { id: 5001, fields: { 'System.Title': 'Workout tracking module', 'System.State': 'Done', 'System.WorkItemType': 'User Story', 'Microsoft.VSTS.Scheduling.StoryPoints': 8, 'System.AssignedTo': { displayName: 'James Liu' }, 'System.Created': '2026-01-10T10:00:00.000Z', 'System.ClosedDate': '2026-02-05T10:00:00.000Z', 'System.IterationPath': 'GoGym\\Sprint 15' } },
  { id: 5002, fields: { 'System.Title': 'Nutrition plan API integration', 'System.State': 'In Progress', 'System.WorkItemType': 'User Story', 'Microsoft.VSTS.Scheduling.StoryPoints': 5, 'System.AssignedTo': { displayName: 'Sophie Martin' }, 'System.Created': '2026-02-20T10:00:00.000Z', 'System.IterationPath': 'GoGym\\Sprint 15' } },
  { id: 5003, fields: { 'System.Title': 'Heart rate sync failure on Apple Watch', 'System.State': 'Active', 'System.WorkItemType': 'Bug', 'Microsoft.VSTS.Scheduling.StoryPoints': 3, 'System.AssignedTo': { displayName: 'James Liu' }, 'System.Created': '2026-03-08T10:00:00.000Z', 'System.IterationPath': 'GoGym\\Sprint 15' } },
];

async function fetchAzureWorkItems(org, project, pat) {
  const url = `https://dev.azure.com/${org}/${project}/_apis/wit/wiql?api-version=7.0`;
  const wiql = { query: `SELECT [System.Id] FROM WorkItems WHERE [System.TeamProject] = '${project}' ORDER BY [System.ChangedDate] DESC` };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(':' + pat).toString('base64')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(wiql),
  });

  if (!response.ok) {
    throw new Error(`Azure DevOps API error: ${response.status}`);
  }

  const data = await response.json();
  return data.workItems || [];
}

export async function syncAzureDevOps() {
  const useMock = process.env.USE_MOCK_INTEGRATIONS === 'true';
  const projectName = 'GoGym';

  if (useMock) {
    await new Promise((r) => setTimeout(r, 500));
    return MOCK_AZURE_ITEMS.map((item) => normalizeAzureWorkItem(item, projectName));
  }

  const org = process.env.AZURE_DEVOPS_ORG;
  const project = process.env.AZURE_DEVOPS_PROJECT;
  const pat = process.env.AZURE_DEVOPS_PAT;
  const items = await fetchAzureWorkItems(org, project, pat);
  return items.map((item) => normalizeAzureWorkItem(item, projectName));
}

export function getAzureConfig() {
  return {
    org: process.env.AZURE_DEVOPS_ORG,
    project: process.env.AZURE_DEVOPS_PROJECT,
    pat: process.env.AZURE_DEVOPS_PAT,
    projectName: 'GoGym',
  };
}
