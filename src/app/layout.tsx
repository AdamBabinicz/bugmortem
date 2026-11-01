import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/Providers';

export const metadata: Metadata = {
  title: 'BugMortem – AI Incident Autopsy & Post-Mortem Studio',
  description: 'Zautomatyzowane śledztwo i sekcja zwłok incydentów produkcyjnych dla inżynierów SRE i DevOps.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <body className="min-h-screen bg-neutral-50 text-neutral-900 transition-colors duration-200 dark:bg-neutral-950 dark:text-neutral-100 antialiased selection:bg-rose-500 selection:text-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
