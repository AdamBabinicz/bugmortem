import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { Providers } from '@/components/Providers';

const title = 'BugMortem: Incident Autopsy & Post-Mortem SRE Tool';
const description =
  'Digital incident morgue and automated post-mortem generator. Ingest stack traces, conduct autopsies, and export reliable SRE circuit breaker patterns.';

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL('https://bugmortem.vercel.app'),
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
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
      <head>
        {/* 1. Google Consent Mode v2 – Zgodnie z RODO stan początkowy jest ZAWSZE 'denied' */}
        <Script id="google-consent-default" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}

            gtag('consent', 'default', {
              'analytics_storage': 'denied',
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied'
            });
          `}
        </Script>

        {/* 2. Google Tag Manager Container */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-K77D4NHB');
          `}
        </Script>
      </head>

      <body className="min-h-screen bg-neutral-50 text-neutral-900 transition-colors duration-200 dark:bg-neutral-950 dark:text-neutral-100 antialiased selection:bg-rose-500 selection:text-white">
        {/* Google Tag Manager (noscript fallback) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-K77D4NHB"
            height="0"
            width="0"
            className="hidden invisible"
          />
        </noscript>

        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
