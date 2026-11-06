'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/i18n/context';
import { ShieldCheck, Sliders, Check, X } from 'lucide-react';

interface CookieConsentState {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  decided: boolean;
}

export function pushGtmConsent(analytics: boolean, marketing: boolean) {
  if (typeof window === 'undefined') return;

  const w = window as unknown as {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  };

  w.dataLayer = w.dataLayer || [];

  if (typeof w.gtag === 'function') {
    w.gtag('consent', 'update', {
      analytics_storage: analytics ? 'granted' : 'denied',
      ad_storage: marketing ? 'granted' : 'denied',
      ad_user_data: marketing ? 'granted' : 'denied',
      ad_personalization: marketing ? 'granted' : 'denied',
    });
  }

  w.dataLayer.push({
    event: 'consent_update',
    consent_analytics: analytics,
    consent_marketing: marketing,
  });
}

export function CookieBanner() {
  const { t, locale } = useTranslation() as any;
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [consent, setConsent] = useState<CookieConsentState>({
    essential: true,
    analytics: false,
    marketing: false,
    decided: false,
  });

  const isEn = locale === 'en';

  useEffect(() => {
    const saved = localStorage.getItem('bm_cookie_consent');
    if (!saved) {
      setIsVisible(true);
    } else {
      try {
        const parsed: CookieConsentState = JSON.parse(saved);
        setConsent(parsed);
        if (parsed.decided) {
          pushGtmConsent(parsed.analytics, parsed.marketing);
        } else {
          setIsVisible(true);
        }
      } catch {
        setIsVisible(true);
      }
    }

    const handleReopen = () => {
      setIsVisible(true);
      setShowDetails(true);
    };

    window.addEventListener('open_cookie_banner', handleReopen);
    return () => window.removeEventListener('open_cookie_banner', handleReopen);
  }, []);

  const saveConsent = (updated: CookieConsentState) => {
    setConsent(updated);
    localStorage.setItem('bm_cookie_consent', JSON.stringify(updated));
    setIsVisible(false);
    setShowDetails(false);

    pushGtmConsent(updated.analytics, updated.marketing);
  };

  const handleAcceptAll = () => {
    saveConsent({ essential: true, analytics: true, marketing: true, decided: true });
  };

  const handleRejectNonEssential = () => {
    saveConsent({ essential: true, analytics: false, marketing: false, decided: true });
  };

  const handleSaveCustom = () => {
    saveConsent({ ...consent, decided: true });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 max-w-md rounded-2xl border border-neutral-300 bg-white p-5 shadow-2xl transition-all duration-300 dark:border-neutral-800 dark:bg-neutral-900/95 backdrop-blur-md">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400">
          <ShieldCheck className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
            {t?.cookies?.title || (isEn ? 'Privacy & Cookie Settings' : 'Ustawienia prywatności')}
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
            {t?.cookies?.description || (isEn ? 'We utilize sandboxed telemetry and analytics to evaluate system resilience.' : 'Używamy plików cookie i tagów analitycznych do analizy ruchu.')}
          </p>

          {showDetails && (
            <div className="mt-3 space-y-2 border-t border-neutral-200 pt-3 dark:border-neutral-800">
              <div className="flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                    {t?.cookies?.essential || (isEn ? 'Essential' : 'Niezbędne')}
                  </span>
                  <p className="text-[10px] text-neutral-500">
                    {t?.cookies?.essentialDesc || (isEn ? 'Required for core service execution and state persistence' : 'Wymagane do działania serwisu')}
                  </p>
                </div>
                <span className="rounded bg-neutral-100 px-2 py-0.5 font-mono text-[10px] font-bold text-neutral-500 dark:bg-neutral-800">
                  {t?.cookies?.alwaysActive || (isEn ? 'Always Active' : 'Zawsze aktywne')}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                    {t?.cookies?.analytics || (isEn ? 'Analytics' : 'Analityka')}
                  </span>
                  <p className="text-[10px] text-neutral-500">
                    {t?.cookies?.analyticsDesc || (isEn ? 'Google Analytics 4 & GTM' : 'Google Analytics 4 & GTM')}
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={consent.analytics}
                  onChange={(e) => setConsent({ ...consent, analytics: e.target.checked })}
                  className="h-4 w-4 rounded border-neutral-300 text-rose-600 focus:ring-rose-500 dark:border-neutral-700 dark:bg-neutral-800 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                    {t?.cookies?.marketing || (isEn ? 'Marketing' : 'Marketing')}
                  </span>
                  <p className="text-[10px] text-neutral-500">
                    {t?.cookies?.marketingDesc || (isEn ? 'Personalization & Campaigns' : 'Personalizacja i kampanie')}
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={consent.marketing}
                  onChange={(e) => setConsent({ ...consent, marketing: e.target.checked })}
                  className="h-4 w-4 rounded border-neutral-300 text-rose-600 focus:ring-rose-500 dark:border-neutral-700 dark:bg-neutral-800 cursor-pointer"
                />
              </div>
            </div>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <button
              onClick={handleAcceptAll}
              className="rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-rose-500 transition-colors cursor-pointer"
            >
              {t?.cookies?.acceptAll || (isEn ? 'Accept All' : 'Akceptuj wszystkie')}
            </button>
            <button
              onClick={handleRejectNonEssential}
              className="rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-700 shadow-sm hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
            >
              {t?.cookies?.rejectNonEssential || (isEn ? 'Reject Optional' : 'Odrzuć opcjonalne')}
            </button>
            {showDetails ? (
              <button
                onClick={handleSaveCustom}
                className="flex items-center gap-1.5 rounded-lg border border-neutral-300 bg-neutral-100 px-3 py-1.5 text-xs font-semibold text-neutral-700 hover:bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
              >
                <Check className="h-3.5 w-3.5" />
                {t?.cookies?.savePreferences || (isEn ? 'Save Preferences' : 'Zapisz wybrane')}
              </button>
            ) : (
              <button
                onClick={() => setShowDetails(true)}
                className="flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors cursor-pointer"
              >
                <Sliders className="h-3.5 w-3.5" />
                {t?.cookies?.details || (isEn ? 'Customize' : 'Dostosuj')}
              </button>
            )}
          </div>
        </div>

        <button
          onClick={handleRejectNonEssential}
          className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors cursor-pointer"
          title={t?.cookies?.closeAndReject || (isEn ? 'Close and reject optional' : 'Zamknij i odrzuć opcjonalne')}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}