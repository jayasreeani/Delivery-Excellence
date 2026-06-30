'use client';

import { useEffect, useState } from 'react';
import { Wifi, WifiOff } from 'lucide-react';

export default function ConnectionBanner() {
  const [status, setStatus] = useState<'checking' | 'online' | 'offline'>('checking');

  useEffect(() => {
    fetch('/api/health')
      .then((r) => r.json())
      .then(() => setStatus('online'))
      .catch(() => setStatus('offline'));
  }, []);

  if (status === 'checking' || status === 'online') return null;

  return (
    <div className="mb-4 flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 text-sm rounded-lg px-4 py-3">
      <WifiOff size={16} />
      <span>API unavailable — ensure the backend is running or DATABASE_URL is configured.</span>
    </div>
  );
}

export function LiveIndicator({ lastUpdated }: { lastUpdated: Date | null }) {
  if (!lastUpdated) return null;
  return (
    <div className="flex items-center gap-1.5 text-xs text-emerald-600 mb-4">
      <Wifi size={12} />
      <span>Live data · updated {lastUpdated.toLocaleTimeString()}</span>
    </div>
  );
}
