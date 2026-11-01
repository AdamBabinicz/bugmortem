"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { Locale, DEFAULT_LOCALE, SUPPORTED_LOCALES } from "./config";
import { pl } from "./locales/pl";
import { en } from "./locales/en";

const dictionaries = { pl, en };

interface I18nContextType {
  locale: Locale;
  setLocale: (loc: Locale) => void;
  t: typeof pl;
}

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    const saved = localStorage.getItem("bm_locale") as Locale;
    if (saved && SUPPORTED_LOCALES.includes(saved)) {
      setLocaleState(saved);
    }
  }, []);

  const setLocale = (newLoc: Locale) => {
    setLocaleState(newLoc);
    localStorage.setItem("bm_locale", newLoc);
  };

  const t = dictionaries[locale] || dictionaries[DEFAULT_LOCALE];

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useTranslation must be used within I18nProvider");
  return ctx;
}