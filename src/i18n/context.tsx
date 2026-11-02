'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Locale, Dictionary } from './types';
import * as enModule from './locales/en';
import * as plModule from './locales/pl';
import { DEFAULT_LOCALE } from './config';

// Bezpieczny import obsługujący zarówno export const jak i export default
const en: Dictionary = (enModule as any).en || (enModule as any).default || enModule;
const pl: Dictionary = (plModule as any).pl || (plModule as any).default || plModule;

const dictionaries: Record<Locale, Dictionary> = { en, pl };

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
}

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE || 'en');

  useEffect(() => {
    const saved = localStorage.getItem('bugmortem_locale') as Locale;
    if (saved && (saved === 'en' || saved === 'pl')) {
      setLocaleState(saved);
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('bugmortem_locale', newLocale);
  };

  const t = dictionaries[locale] || dictionaries.pl || dictionaries.en;

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextType {
  const context = useContext(I18nContext);
  if (!context) {
    const fallbackT = dictionaries['pl'] || dictionaries['en'] || pl || en;
    return {
      locale: 'pl',
      setLocale: () => {},
      t: fallbackT
    };
  }
  return context;
}

export const useTranslation = useI18n;