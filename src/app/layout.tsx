import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
import { ThemeProvider } from '@/context/ThemeContext';
import './globals.css';

// Wymuszenie globalnego, statycznego cache na Vercel Edge CDN (TTFB ~30ms)
export const dynamic = 'force-static';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap', // Kluczowe: zapobiega blokowaniu FCP (brak FOIT podczas pobierania fontu)
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://bugmortem.vercel.app'),
  title: 'BugMortem – AI Incident Autopsy & SRE Post-Mortem Studio',
  description:
    'Analyze production crashes, generate blameless post-mortem incident reports, and resurrect fragile codebases with automated SRE recovery patterns. Built for Kiroween 2026.',
  keywords: [
    'BugMortem',
    'Incident Management',
    'SRE',
    'Post-Mortem Generator',
    'Kiroween 2026',
    'DevOps',
    'Error Analysis',
  ],
  authors: [{ name: 'Adam Gierczak', url: 'https://github.com/AdamBabinicz' }],
  creator: 'Adam Gierczak',
  publisher: 'BugMortem',
  verification: {
    google: 'google446cfb165e1d0d78.html',
  },
  openGraph: {
    title: 'BugMortem – AI Incident Autopsy & SRE Post-Mortem Studio',
    description:
      'Digital Incident Morgue and automated SRE post-mortem studio. Built for Devpost Kiroween 2026.',
    url: 'https://bugmortem.vercel.app',
    siteName: 'BugMortem',
    locale: 'pl_PL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BugMortem – AI Incident Autopsy & SRE Post-Mortem Studio',
    description:
      'Digital Incident Morgue and automated SRE post-mortem studio. Built for Devpost Kiroween 2026.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      className={`${geistSans.variable} ${geistMono.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        {/* Krytyczny inline CSS – silnik przeglądarki zalicza FCP natychmiast w pierwszym cyklu malowania */}
        <style
          dangerouslySetInnerHTML={{
            __html: `html{background-color:#0c0a09;color:#fafaf9;}body{background-color:#0c0a09;color:#fafaf9;}`,
          }}
        />
        {/* Optymalizacja połączenia sieciowego z GTM */}
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        {/* Google Consent Mode v2 – domyślne blokowanie przed załadowaniem tagów */}
        <Script id="google-consent-mode-init" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              'analytics_storage': 'denied',
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'wait_for_update': 500
            });
            gtag('set', 'ads_data_redaction', true);
          `}
        </Script>

        {/* Google Tag Manager Container Loader */}
        <Script id="google-tag-manager-loader" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-K77D4NHB');
          `}
        </Script>
      </head>
      <body className="min-h-screen bg-stone-100 text-stone-900 dark:bg-stone-950 dark:text-stone-100 antialiased font-sans">
        {/* Google Tag Manager (noscript fallback) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-K77D4NHB"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}