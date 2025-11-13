import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI LinkedIn Daily Posts',
  description: 'Daily, ready-to-post LinkedIn content on trending AI topics with images.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
