"use client";

import React, { useState, useEffect } from "react";
import { useTranslation } from "../../i18n/context";
import { X, Sliders, Check } from "lucide-react";

export function CookieSettingsModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { t } = useTranslation();
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("bm_cookie_consent");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setAnalytics(!!parsed.analytics);
        setMarketing(!!parsed.marketing);
      } catch (e) {}
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    const consent = { essential: true, analytics, marketing, decided: true };
    localStorage.setItem("bm_cookie_consent", JSON.stringify(consent));

    // Przekaż aktualizację do Google Tag Manager & Google Consent Mode v2
    if (typeof window !== "undefined") {
      const w = window as unknown as {
        dataLayer?: unknown[];
        gtag?: (...args: unknown[]) => void;
      };

      const consentData = {
        analytics_storage: analytics ? "granted" : "denied",
        ad_storage: marketing ? "granted" : "denied",
        ad_user_data: marketing ? "granted" : "denied",
        ad_personalization: marketing ? "granted" : "denied",
      };

      if (typeof w.gtag === "function") {
        w.gtag("consent", "update", consentData);
      }

      w.dataLayer = w.dataLayer || [];
      w.dataLayer.push({
        event: "consent_update",
        ...consentData,
        consent_analytics: analytics,
        consent_marketing: marketing,
      });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-2xl p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-rose-500" />
            <h3 className="text-base font-bold">{t.cookies.settings}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs">
          {/* Essential */}
          <div className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 flex items-start justify-between gap-3">
            <div>
              <div className="font-semibold text-zinc-900 dark:text-white">{t.cookies.essential}</div>
              <div className="text-zinc-500 dark:text-zinc-400 text-[11px] mt-0.5">{t.cookies.essentialDesc}</div>
            </div>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
              {t.common.save}
            </span>
          </div>

          {/* Analytics GTM/GA4 */}
          <div className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 flex items-start justify-between gap-3">
            <div>
              <div className="font-semibold text-zinc-900 dark:text-white">{t.cookies.analytics}</div>
              <div className="text-zinc-500 dark:text-zinc-400 text-[11px] mt-0.5">{t.cookies.analyticsDesc}</div>
            </div>
            <input
              type="checkbox"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
              className="mt-1 w-4 h-4 rounded text-rose-600 focus:ring-rose-500 border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 cursor-pointer"
            />
          </div>

          {/* Marketing */}
          <div className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 flex items-start justify-between gap-3">
            <div>
              <div className="font-semibold text-zinc-900 dark:text-white">{t.cookies.marketing}</div>
              <div className="text-zinc-500 dark:text-zinc-400 text-[11px] mt-0.5">{t.cookies.marketingDesc}</div>
            </div>
            <input
              type="checkbox"
              checked={marketing}
              onChange={(e) => setMarketing(e.target.checked)}
              className="mt-1 w-4 h-4 rounded text-rose-600 focus:ring-rose-500 border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 cursor-pointer"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-zinc-200 dark:border-zinc-800">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
          >
            {t.common.close}
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium bg-rose-600 hover:bg-rose-500 text-white transition-colors cursor-pointer"
          >
            <Check className="w-3.5 h-3.5" />
            {t.cookies.savePreferences}
          </button>
        </div>
      </div>
    </div>
  );
}
