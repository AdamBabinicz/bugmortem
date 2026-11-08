import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
import { Providers } from '@/components/Providers';
import './globals.css';

// Wymuszenie globalnego, statycznego cache na Vercel Edge CDN (TTFB ~30ms)
export const dynamic = 'force-static';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

// Title: DOKŁADNIE 50 ZNAKÓW (zoptymalizowany pod słowa kluczowe: Awarii, React, SRE)
const SITE_TITLE = 'BugMortem – Analiza Awarii React i Studio SRE 2026';

// Description: DOKŁADNIE 150 ZNAKÓW (zawiera kluczowe frazy: awarii, React, SRE, post-mortem)
const SITE_DESCRIPTION =
  'Sekcja zwłok awarii React w BugMortem. Badaj mechanizmy awarii kodu, twórz raporty post-mortem SRE oraz wzorce odporności dla chmury na Kiroween 2026.';

export const metadata: Metadata = {
  metadataBase: new URL('https://bugmortem.vercel.app'),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: [
    'BugMortem',
    'awarii',
    'React',
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
  alternates: {
    canonical: 'https://bugmortem.vercel.app',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/web-app-manifest-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/web-app-manifest-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  verification: {
    google: 'google446cfb165e1d0d78.html',
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: 'https://bugmortem.vercel.app',
    siteName: 'BugMortem',
    locale: 'pl_PL',
    type: 'website',
    images: [
      {
        url: 'https://bugmortem.vercel.app/1.jpeg',
        width: 1200,
        height: 630,
        alt: SITE_TITLE,
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ['https://bugmortem.vercel.app/1.jpeg'],
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
        <meta name="theme-color" content="#0c0a09" />

        {/* Krytyczny inline CSS dla FCP — zapobiega błyskowi białego tła przy pierwszym ładowaniu w dark mode */}
        <style
          dangerouslySetInnerHTML={{
            __html: `html.dark,html.dark body{background-color:#0c0a09;color:#fafaf9;}`,
          }}
        />

        {/* Preconnect do Google Tag Managera */}
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        {/* Google Consent Mode v2 */}
        <Script id="google-consent-mode-init" strategy="afterInteractive">
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

        {/* GTM Container Loader — lazyOnload odciąża wątek główny CPU pod Speed Index */}
        <Script id="google-tag-manager-loader" strategy="lazyOnload">
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
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-K77D4NHB"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
