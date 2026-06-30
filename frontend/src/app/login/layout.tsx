import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign in — Delivery Platform',
  description: 'Sign in to the Delivery Reporting & Insights Platform',
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
