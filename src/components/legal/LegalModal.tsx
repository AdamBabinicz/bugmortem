"use client";
import React from "react";
import { useTranslation } from "../../i18n/context";
import { X, ShieldCheck } from "lucide-react";

export type LegalDocType = "privacy" | "terms" | "cookies" | null;

export function LegalModal({
  docType,
  onClose,
}: {
  docType: LegalDocType;
  onClose: () => void;
}) {
  const { t } = useTranslation();

  if (!docType) return null;

  const titles: Record<NonNullable<LegalDocType>, string> = {
    privacy: t.legal.privacyTitle ?? 'Privacy Policy',
    terms: t.legal.termsTitle ?? 'Terms of Service',
    cookies: t.legal.cookiesTitle ?? 'Cookie Policy',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[80vh] flex flex-col rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-rose-500" />
            <h3 className="text-base font-bold">{titles[docType]}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4 text-xs leading-relaxed text-zinc-600 dark:text-zinc-300 font-sans">
          <p className="font-mono text-[11px] text-zinc-400">{t.legal.lastUpdated}</p>
          
          {docType === "privacy" && (
            <>
              <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">
                {t.legal.privacyAdminHeader}
              </h4>
              <p>{t.legal.privacyAdminText}</p>
              
              <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">
                {t.legal.privacyScopeHeader}
              </h4>
              <p>{t.legal.privacyScopeText}</p>
            </>
          )}

          {docType === "terms" && (
            <>
              <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">
                {t.legal.termsGeneralHeader}
              </h4>
              <p>{t.legal.termsGeneralText}</p>
              
              <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">
                {t.legal.termsLiabilityHeader}
              </h4>
              <p>{t.legal.termsLiabilityText}</p>
            </>
          )}

          {docType === "cookies" && (
            <>
              <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">
                {t.legal.cookiesUsageHeader}
              </h4>
              <p>{t.legal.cookiesUsageText}</p>
            </>
          )}
        </div>

        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-medium bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white text-white dark:text-zinc-900 transition-colors"
          >
            {t.common.close}
          </button>
        </div>
      </div>
    </div>
  );
}
