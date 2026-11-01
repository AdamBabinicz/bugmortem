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

export function CookieBanner() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [consent, setConsent] = useState<CookieConsentState>({
    essential: true,
    analytics: false,
    marketing: false,
    decided: false,
  });

  useEffect(() => {
    // Sprawdź stan w pamięci
    const saved = localStorage.getItem('bm_cookie_consent');
    if (!saved) {
      setIsVisible(true);
    } else {
      try {
        setConsent(JSON.parse(saved));
      } catch {
        setIsVisible(true);
      }
    }

    // Nasłuchuj na żądanie ponownego otwarcia (np. ze stopki)
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

    // Przekaż zdarzenie do Google Tag Manager / GA4 dataLayer
    if (typeof window !== 'undefined') {
      (window as unknown as { dataLayer?: unknown[] }).dataLayer = (window as unknown as { dataLayer?: unknown[] }).dataLayer || [];
      (window as unknown as { dataLayer: unknown[] }).dataLayer.push({
        event: 'consent_update',
        consent_analytics: updated.analytics,
        consent_marketing: updated.marketing,
      });
    }
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
            {t.cookies.title}
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
            {t.cookies.description}
          </p>

          {showDetails && (
            <div className="mt-3 space-y-2 border-t border-neutral-200 pt-3 dark:border-neutral-800">
              {/* Ciasteczka niezbędne */}
              <div className="flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-neutral-800 dark:text-neutral-200">{t.cookies.essential}</span>
                  <p className="text-[10px] text-neutral-500">{t.cookies.essentialDesc}</p>
                </div>
                <span className="rounded bg-neutral-100 px-2 py-0.5 font-mono text-[10px] font-bold text-neutral-500 dark:bg-neutral-800">
                  {t.cookies.alwaysActive}
                </span>
              </div>

              {/* Analityka (GTM/GA4) */}
              <div className="flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-neutral-800 dark:text-neutral-200">{t.cookies.analytics}</span>
                  <p className="text-[10px] text-neutral-500">{t.cookies.analyticsDesc}</p>
                </div>
                <input
                  type="checkbox"
                  checked={consent.analytics}
                  onChange={(e) => setConsent({ ...consent, analytics: e.target.checked })}
                  className="h-4 w-4 rounded border-neutral-300 text-rose-600 focus:ring-rose-500 dark:border-neutral-700 dark:bg-neutral-800"
                />
              </div>

              {/* Marketing */}
              <div className="flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-neutral-800 dark:text-neutral-200">{t.cookies.marketing}</span>
                  <p className="text-[10px] text-neutral-500">{t.cookies.marketingDesc}</p>
                </div>
                <input
                  type="checkbox"
                  checked={consent.marketing}
                  onChange={(e) => setConsent({ ...consent, marketing: e.target.checked })}
                  className="h-4 w-4 rounded border-neutral-300 text-rose-600 focus:ring-rose-500 dark:border-neutral-700 dark:bg-neutral-800"
                />
              </div>
            </div>
          )}

          {/* PRZYCISKI AKCJI */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {showDetails ? (
              <button
                onClick={handleSaveCustom}
                className="flex items-center gap-1.5 rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-rose-500 transition-colors"
              >
                <Check className="h-3.5 w-3.5" />
                {t.cookies.savePreferences}
              </button>
            ) : (
              <>
                <button
                  onClick={handleAcceptAll}
                  className="rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-rose-500 transition-colors"
                >
                  {t.cookies.acceptAll}
                </button>
                <button
                  onClick={handleRejectNonEssential}
                  className="rounded-lg border border-neutral-300 bg-neutral-100 px-3 py-1.5 text-xs font-semibold text-neutral-700 hover:bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700 transition-colors"
                >
                  {t.cookies.rejectAll}
                </button>
              </>
            )}

            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex items-center gap-1 text-xs font-semibold text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors ml-auto"
            >
              <Sliders className="h-3.5 w-3.5" />
              {showDetails ? t.cookies.hideDetails : t.cookies.customize}
            </button>
          </div>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
