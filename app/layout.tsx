import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CivicGuide India | Understand government services',
  description: 'An independent guide to finding and understanding Indian government services.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en-IN"><body>{children}</body></html>;
}
