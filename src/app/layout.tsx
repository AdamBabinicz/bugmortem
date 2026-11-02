import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/Providers';

const title = 'BugMortem: Incident Autopsy & Post-Mortem SRE Tool';
const description = 'Digital incident morgue and automated post-mortem generator. Ingest stack traces, conduct autopsies, and export reliable SRE circuit breaker patterns.';

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL('https://bugmortem.vercel.app'),
  openGraph: {
    title,
    description,
    url: 'https://bugmortem.vercel.app',
    siteName: 'BugMortem',
    images: [
      {
        url: 'https://bugmortem.vercel.app/1.jpeg',
        width: 1200,
        height: 630,
        alt: 'BugMortem – Digital Incident Morgue',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['https://bugmortem.vercel.app/1.jpeg'],
  },
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
