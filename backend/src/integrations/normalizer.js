const STATUS_MAP = {
  'To Do': 'To Do',
  'Open': 'To Do',
  'New': 'To Do',
  'Backlog': 'To Do',
  'In Progress': 'In Progress',
  'Active': 'In Progress',
  'Developing': 'In Progress',
  'Review': 'Review',
  'In Review': 'Review',
  'Code Review': 'Review',
  'Done': 'Done',
  'Closed': 'Done',
  'Resolved': 'Done',
  'Completed': 'Done',
  'Blocked': 'Blocked',
  'Impediment': 'Blocked',
};

export function normalizeStatus(rawStatus) {
  return STATUS_MAP[rawStatus] || rawStatus;
}

export function normalizeJiraIssue(issue, projectName, sourceSystem) {
  const fields = issue.fields || {};
  const status = normalizeStatus(fields.status?.name || 'To Do');
  const isDefect = ['Bug', 'Defect'].includes(fields.issuetype?.name);

  return {
    project_name: projectName,
    work_item_id: issue.key,
    title: fields.summary || 'Untitled',
    status,
    priority: fields.priority?.name || 'Medium',
    sprint: fields.sprint?.name || fields.customfield_10020?.[0]?.name || null,
    effort: fields.customfield_10016 || fields.storyPoints || 0,
    assigned_to: fields.assignee?.displayName || null,
    created_date: fields.created?.split('T')[0] || null,
    closed_date: fields.resolutiondate?.split('T')[0] || null,
    source_system: sourceSystem,
    is_defect: isDefect,
  };
}

export function normalizeAzureWorkItem(item, projectName) {
  const fields = item.fields || {};
  const state = fields['System.State'] || 'New';
  const status = normalizeStatus(state);
  const workItemType = fields['System.WorkItemType'] || '';
  const isDefect = ['Bug', 'Defect'].includes(workItemType);

  return {
    project_name: projectName,
    work_item_id: `ADO-${item.id}`,
    title: fields['System.Title'] || 'Untitled',
    status,
    priority: fields['Microsoft.VSTS.Common.Priority']?.toString() || 'Medium',
    sprint: fields['System.IterationPath']?.split('\\').pop() || null,
    effort: fields['Microsoft.VSTS.Scheduling.StoryPoints'] || fields['Microsoft.VSTS.Scheduling.Effort'] || 0,
    assigned_to: fields['System.AssignedTo']?.displayName || fields['System.AssignedTo'] || null,
    created_date: fields['System.Created']?.split('T')[0] || null,
    closed_date: fields['System.ClosedDate']?.split('T')[0] || fields['Microsoft.VSTS.Common.ClosedDate']?.split('T')[0] || null,
    source_system: 'Azure DevOps',
    is_defect: isDefect,
  };
}
