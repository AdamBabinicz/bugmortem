'use client';

import React from 'react';
import { I18nProvider } from '@/i18n/context';
import { ThemeProvider } from '@/context/ThemeContext';
import { CookieBanner } from '@/components/CookieBanner';
import { ScrollToTop } from '@/components/ScrollToTop';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <I18nProvider>
        {children}
        <CookieBanner />
        <ScrollToTop />
      </I18nProvider>
    </ThemeProvider>
  );
}
