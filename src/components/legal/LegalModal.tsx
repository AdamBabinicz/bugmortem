"use client";

import React from "react";
import { useI18n } from "@/i18n/context";
import { X, ShieldCheck, FileText, Lock, Database } from "lucide-react";

export type LegalDocType = "privacy" | "terms" | "cookies" | null;

// ── Pomocnicze elementy układu ───────────────────────────────────────────────

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="text-sm font-bold text-stone-900 dark:text-white mt-6 mb-2 first:mt-0">
      {children}
    </h4>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs leading-relaxed text-stone-600 dark:text-stone-300">
      {children}
    </p>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-2 space-y-1.5 pl-3 border-l-2 border-stone-200 dark:border-stone-700">
      {items.map((item, i) => (
        <li key={i} className="text-xs leading-relaxed text-stone-600 dark:text-stone-300 flex gap-2">
          <span className="text-emerald-500 shrink-0 mt-0.5">✓</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function WarningBulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-2 space-y-1.5 pl-3 border-l-2 border-amber-400 dark:border-amber-600">
      {items.map((item, i) => (
        <li key={i} className="text-xs leading-relaxed text-stone-600 dark:text-stone-300 flex gap-2">
          <span className="text-amber-500 shrink-0 mt-0.5">▶</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function KeyTable({
  intro,
  rows,
}: {
  intro: string;
  rows: Array<{ key: string; desc: string }>;
}) {
  return (
    <div className="mt-2 space-y-2">
      <Prose>{intro}</Prose>
      <div className="rounded-lg border border-stone-200 dark:border-stone-700 overflow-hidden">
        {rows.map((row, i) => (
          <div
            key={i}
            className={`flex flex-col sm:flex-row gap-1 sm:gap-3 px-3 py-2.5 text-xs ${
              i % 2 === 0
                ? "bg-stone-50 dark:bg-stone-800/50"
                : "bg-white dark:bg-stone-900"
            }`}
          >
            <code className="font-mono text-emerald-600 dark:text-emerald-400 shrink-0 whitespace-nowrap">
              {row.key}
            </code>
            <span className="text-stone-600 dark:text-stone-300 leading-relaxed">
              {row.desc}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Divider() {
  return <hr className="border-stone-200 dark:border-stone-800 my-4" />;
}

// ── Treść Polityki Prywatności ────────────────────────────────────────────────

function PrivacyContent() {
  const { t } = useI18n();
  const l = t.legal;

  return (
    <>
      <SectionHeader>{l.privacyArchHeader}</SectionHeader>
      <Prose>{l.privacyArchText}</Prose>
      {l.privacyArchBullets && <BulletList items={l.privacyArchBullets} />}

      <Divider />

      <SectionHeader>{l.privacyAdminHeader}</SectionHeader>
      <Prose>{l.privacyAdminText}</Prose>

      <SectionHeader>{l.privacyScopeHeader}</SectionHeader>
      <Prose>{l.privacyScopeText}</Prose>

      <Divider />

      <SectionHeader>{l.privacyLocalStorageHeader}</SectionHeader>
      {l.privacyLocalStorageKeys && (
        <KeyTable
          intro={l.privacyLocalStorageIntro ?? ""}
          rows={l.privacyLocalStorageKeys}
        />
      )}

      <Divider />

      <SectionHeader>{l.privacyNoTrackingHeader}</SectionHeader>
      <Prose>{l.privacyNoTrackingText}</Prose>
      {l.privacyNoTrackingBullets && <BulletList items={l.privacyNoTrackingBullets} />}

      <Divider />

      <SectionHeader>{l.privacyUserRightsHeader}</SectionHeader>
      <Prose>{l.privacyUserRightsText}</Prose>
      {l.privacyUserRightsBullets && <BulletList items={l.privacyUserRightsBullets} />}

      <Divider />

      <SectionHeader>{l.privacyPurgeHeader}</SectionHeader>
      <div className="rounded-lg bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 p-3">
        <Prose>{l.privacyPurgeText}</Prose>
      </div>
    </>
  );
}

// ── Treść Regulaminu ──────────────────────────────────────────────────────────

function TermsContent() {
  const { t } = useI18n();
  const l = t.legal;

  return (
    <>
      <SectionHeader>{l.termsScopeHeader}</SectionHeader>
      <Prose>{l.termsScopeText}</Prose>

      <Divider />

      <SectionHeader>{l.termsGeneralHeader}</SectionHeader>
      <Prose>{l.termsGeneralText}</Prose>

      <Divider />

      <SectionHeader>{l.termsDisclaimerHeader}</SectionHeader>
      <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/50 p-3 space-y-2">
        <Prose>{l.termsDisclaimerIntro}</Prose>
        {l.termsDisclaimerPoints && (
          <WarningBulletList items={l.termsDisclaimerPoints} />
        )}
      </div>

      <Divider />

      <SectionHeader>{l.termsLiabilityHeader}</SectionHeader>
      <Prose>{l.termsLiabilityText}</Prose>

      <Divider />

      <SectionHeader>{l.termsLicenseHeader}</SectionHeader>
      <Prose>{l.termsLicenseText}</Prose>
      {l.termsLicenseBullets && <BulletList items={l.termsLicenseBullets} />}
    </>
  );
}

// ── Treść Polityki Ciasteczek ─────────────────────────────────────────────────

function CookiesContent() {
  const { t } = useI18n();
  const l = t.legal;

  return (
    <>
      <SectionHeader>{l.cookiesUsageHeader}</SectionHeader>
      <Prose>{l.cookiesUsageText}</Prose>
      {l.privacyLocalStorageKeys && (
        <KeyTable
          intro={l.privacyLocalStorageIntro ?? ""}
          rows={l.privacyLocalStorageKeys}
        />
      )}
    </>
  );
}

// ── Powłoka Modalu ────────────────────────────────────────────────────────────

const DOC_META: Record<
  NonNullable<LegalDocType>,
  { icon: React.ElementType; iconColor: string }
> = {
  privacy: { icon: Lock, iconColor: "text-emerald-500" },
  terms: { icon: FileText, iconColor: "text-sky-500" },
  cookies: { icon: Database, iconColor: "text-violet-500" },
};

export function LegalModal({
  docType,
  onClose,
}: {
  docType: LegalDocType;
  onClose: () => void;
}) {
  const { t } = useI18n();

  if (!docType) return null;

  const titles: Record<NonNullable<LegalDocType>, string> = {
    privacy: t.legal.privacyTitle,
    terms: t.legal.termsTitle,
    cookies: t.legal.cookiesTitle,
  };

  const { icon: Icon, iconColor } = DOC_META[docType];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={titles[docType]}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-2xl max-h-[85vh] flex flex-col rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-200 dark:border-stone-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-rose-500 shrink-0" />
            <Icon className={`w-4 h-4 ${iconColor} shrink-0`} />
            <h3 className="text-sm font-bold leading-tight">{titles[docType]}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.common.close}
            className="p-1.5 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500 hover:text-stone-900 dark:hover:text-white transition-colors ml-3 shrink-0 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-5 min-h-0">
          <p className="font-mono text-[10px] text-stone-400 dark:text-stone-500 mb-4 tracking-wide uppercase">
            {t.legal.lastUpdated}
          </p>

          {docType === "privacy" && <PrivacyContent />}
          {docType === "terms" && <TermsContent />}
          {docType === "cookies" && <CookiesContent />}
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 border-t border-stone-200 dark:border-stone-800 flex justify-end shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-white text-white dark:text-stone-900 transition-colors cursor-pointer"
          >
            {t.common.close}
          </button>
        </div>
      </div>
    </div>
  );
}