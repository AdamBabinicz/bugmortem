export const SUPPORTED_LOCALES = ['pl', 'en'] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'pl';

export const LOCALE_LABELS: Record<Locale, string> = {
  pl: 'Polski (PL)',
  en: 'English (EN)',
};
