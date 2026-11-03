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
  display: 'swap', // Zapobiega blokowaniu FCP
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
  alternates: {
    canonical: 'https://bugmortem.vercel.app',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
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
    images: [
      {
        url: 'https://bugmortem.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'BugMortem – AI Incident Autopsy & SRE Post-Mortem Studio',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BugMortem – AI Incident Autopsy & SRE Post-Mortem Studio',
    description:
      'Digital Incident Morgue and automated SRE post-mortem studio. Built for Devpost Kiroween 2026.',
    images: ['https://bugmortem.vercel.app/og-image.png'],
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
        {/* Canonical URL – zapobieganie duplikatom treści w Google */}
        <link rel="canonical" href="https://bugmortem.vercel.app" />

        {/* Bezpośrednie tagi Open Graph Image dla botów social media i walidatorów */}
        <meta property="og:image" content="https://bugmortem.vercel.app/og-image.png" />
        <meta property="og:image:secure_url" content="https://bugmortem.vercel.app/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="BugMortem – AI Incident Autopsy & SRE Post-Mortem Studio" />
        <meta property="og:image:type" content="image/png" />
        <meta name="twitter:image" content="https://bugmortem.vercel.app/og-image.png" />

        {/* Ikony urządzeń mobilnych – Android Chrome & iOS Safari */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0c0a09" />

        {/* Krytyczny inline CSS dla FCP */}
        <style
          dangerouslySetInnerHTML={{
            __html: `html{background-color:#0c0a09;color:#fafaf9;}body{background-color:#0c0a09;color:#fafaf9;}`,
          }}
        />

        {/* Preconnect do Google Tag Managera */}
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        {/* Google Consent Mode v2 */}
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

        {/* GTM Container Loader */}
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
        {/* Fallback no-script dla GTM */}
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