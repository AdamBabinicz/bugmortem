'use client';

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { TranslationDictionary } from '@/i18n/types';

// Likwidacja wiszących spójników (sierotek typograficznych w języku polskim)
function fixOrphans(text?: string | null): string {
  if (!text || typeof text !== 'string') return text || '';
  return text.replace(/(^|\s)([aiouwz]|do|na|od|po|ze|we|za|co|że|to)(\s+)/gi, '$1$2\u00A0');
}

interface TopNavbarProps {
  locale: 'pl' | 'en';
  onChangeLocale: (newLocale: 'pl' | 'en') => void;
  theme: string;
  toggleTheme: () => void;
  t: TranslationDictionary | any;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  locale,
  onChangeLocale,
  theme,
  toggleTheme,
  t,
}) => {
  return (
    <>
      {/* 1. Przyklejony na stałe pasek nawigacji */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-stone-200 bg-white/85 dark:border-stone-800 dark:bg-stone-900/85 backdrop-blur-md shadow-sm transition-colors">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
          {/* Logo Brand */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 min-w-0">
            <span className="text-xl sm:text-2xl select-none" aria-hidden="true">💀</span>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-black text-base sm:text-lg tracking-wider text-rose-600 dark:text-rose-500 uppercase">
                  BugMortem
                </span>
                <span className="hidden sm:inline-flex text-[9px] sm:text-[10px] uppercase font-bold tracking-widest px-1.5 sm:px-2 py-0.5 rounded bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30 whitespace-nowrap">
                  KIROWEEN 2026
                </span>
              </div>
              <p className="text-[11px] text-stone-700 dark:text-stone-300 hidden md:block truncate">
                {fixOrphans(t?.hero?.subtitle)}
              </p>
            </div>
          </div>

          {/* Controls: Language + Theme */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <div className="flex items-center bg-stone-200 dark:bg-stone-800 rounded-lg p-0.5 sm:p-1 border border-stone-300 dark:border-stone-700 text-xs font-semibold">
              <button
                type="button"
                onClick={() => onChangeLocale('pl')}
                className={`px-2 sm:px-2.5 py-1 rounded transition-colors cursor-pointer ${
                  locale === 'pl'
                    ? 'bg-rose-600 text-white font-bold shadow-sm'
                    : 'text-stone-800 hover:text-stone-950 dark:text-stone-300 dark:hover:text-white'
                }`}
              >
                <span className="sm:hidden">PL</span>
                <span className="hidden sm:inline">{t?.navigation?.langPl || 'Polski (PL)'}</span>
              </button>
              <button
                type="button"
                onClick={() => onChangeLocale('en')}
                className={`px-2 sm:px-2.5 py-1 rounded transition-colors cursor-pointer ${
                  locale === 'en'
                    ? 'bg-rose-600 text-white font-bold shadow-sm'
                    : 'text-stone-800 hover:text-stone-950 dark:text-stone-300 dark:hover:text-white'
                }`}
              >
                <span className="sm:hidden">EN</span>
                <span className="hidden sm:inline">{t?.navigation?.langEn || 'English (EN)'}</span>
              </button>
            </div>

            <button
              type="button"
              onClick={toggleTheme}
              aria-label={t?.navigation?.toggleTheme || 'Toggle theme'}
              className="p-1.5 sm:p-2 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-700 border border-stone-300 dark:bg-stone-800 dark:hover:bg-stone-700 dark:text-stone-300 dark:border-stone-700 transition-colors cursor-pointer shadow-sm"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-stone-600" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* 2. Dyskretny bufor przestrzenny zapobiegający przeskokom treści */}
      <div className="h-16 shrink-0" aria-hidden="true" />
    </>
  );
};