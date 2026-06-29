import { Suspense } from 'react';
import WorkItemsContent from './WorkItemsContent';

export default function WorkItemsPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-slate-400">Loading work items...</div>}>
      <WorkItemsContent />
    </Suspense>
  );
}
