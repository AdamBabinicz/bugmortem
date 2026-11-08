'use client';

import React, { useState } from 'react';
import {
  GitCommitHorizontal,
  CheckCircle2,
  Copy,
  Check,
  HelpCircle,
  ShieldAlert,
  ChevronRight,
  Flame,
  Binary,
  Layers,
  Target
} from 'lucide-react';
import { IncidentPreset, TranslationDictionary } from '@/i18n/types';

// Likwidacja wiszących spójników (sierotek typograficznych w języku polskim)
function fixOrphans(text?: string | null): string {
  if (!text || typeof text !== 'string') return text || '';
  return text.replace(/(^|\s)([aiouwz]|do|na|od|po|ze|we|za|co|że|to)(\s+)/gi, '$1$2\u00A0');
}

interface FiveWhysTreeProps {
  incident: IncidentPreset;
  t: TranslationDictionary | any;
}

const STEP_ICONS = [
  <Flame key="s1" className="w-4 h-4 text-rose-500" />,
  <Binary key="s2" className="w-4 h-4 text-amber-500" />,
  <Layers key="s3" className="w-4 h-4 text-indigo-400" />,
  <ShieldAlert key="s4" className="w-4 h-4 text-purple-400" />,
  <Target key="s5" className="w-4 h-4 text-emerald-400" />,
];

export const FiveWhysTree: React.FC<FiveWhysTreeProps> = ({ incident, t }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [expandedSteps, setExpandedSteps] = useState<Record<number, boolean>>({
    0: true,
    1: true,
    2: true,
    3: true,
    4: true,
  });

  const fw = t?.fiveWhys || {};
  const levels: string[] = Array.isArray(fw?.levels) && fw.levels.length === 5
    ? fw.levels
    : [
        '1. Objaw Powierzchowny',
        '2. Bezpośredni Wyzwalacz',
        '3. Mechanizm Awarii',
        '4. Luka Architektoniczna',
        '5. Przyczyna Źródłowa',
      ];

  const steps: string[] = Array.isArray(incident?.fiveWhys) && incident.fiveWhys.length === 5
    ? incident.fiveWhys
    : [
        `${incident?.title || 'Incydent produkcyjny'} powoduje niestabilność i degradację usług.`,
        `Wykryto anomalię w warstwie ${incident?.badge || 'systemowej'} pod obciążeniem roboczym.`,
        'Brak izolacji błędu spowodował kaskadowe propagowanie wyjątku w dół stosu wywołań.',
        'Niewystarczające limity bezpieczeństwa, brak circuit breakera i brak defensywnego throttlingu.',
        'Brak automatycznych testów regresji oraz brak polityki odporności (SRE resilience) w pipeline CI/CD.',
      ];

  const toggleStep = (idx: number) => {
    setExpandedSteps((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleCopyChain = async () => {
    const chainMarkdown = `### 🔍 BugMortem – Blameless 5-Whys Root-Cause Tree
**Incydent:** ${incident?.title || ''} (${incident?.badge || 'N/A'} - ${incident?.severity || 'P0'})

${steps
  .map((step, idx) => `**Dlaczego? (${levels[idx]}):**\n> ${step}`)
  .join('\n\n')}

---
*Wygenerowano automatycznie w BugMortem (Kiroween 2026).*`;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(chainMarkdown);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = chainMarkdown;
        textarea.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Ignore
    }
  };

  return (
    <section className="rounded-2xl border border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900/50 p-5 sm:p-7 space-y-5 shadow-xl dark:shadow-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 dark:border-stone-800 pb-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="p-1 rounded bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
              <GitCommitHorizontal className="w-4 h-4" />
            </span>
            <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100">
              {fw?.sectionTitle || 'DRZEWO PRZYCZYN ŹRÓDŁOWYCH (BLAMELESS 5-WHYS)'}
            </h2>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
              {fw?.blamelessBadge || 'KULTURA BEZ OBWINIANIA'}
            </span>
          </div>
          <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">
            {fixOrphans(
              fw?.sectionSubtitle ||
                'Systemowe śledztwo inżynieryjne od powierzchownego objawu do luki architektonicznej.'
            )}
          </p>
        </div>

        <button
          type="button"
          onClick={handleCopyChain}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all border border-stone-300 bg-stone-100 hover:bg-stone-200 text-stone-800 dark:border-stone-700 dark:bg-stone-800 dark:hover:bg-stone-700 dark:text-stone-200 shadow-sm cursor-pointer shrink-0"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              <span>{fw?.copied || 'Skopiowano Ścieżkę!'}</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-stone-500" />
              <span>{fw?.copyChain || 'Kopiuj Ścieżkę Dochodzenia'}</span>
            </>
          )}
        </button>
      </div>

      {/* 5-Whys Stepper Hierarchy Tree */}
      <div className="relative space-y-4">
        {/* Wertykalna linia łącząca — matematycznie wycentrowana (18px = połowa z w-9/36px) */}
        <div className="absolute left-[18px] -translate-x-1/2 top-4 bottom-5 w-0.5 bg-gradient-to-b from-rose-500 via-purple-500 to-emerald-500 z-0" />

        {steps.map((answer, index) => {
          const isRootCause = index === 4;
          const isExpanded = expandedSteps[index] ?? true;

          return (
            <div
              key={`five-why-step-${index}`}
              className="relative flex items-start gap-3 sm:gap-4 group z-10"
            >
              {/* Okrągły węzeł o stałej szerokości 36px (w-9 h-9) */}
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all shrink-0 ${
                  isRootCause
                    ? 'bg-emerald-100 dark:bg-emerald-950 border-emerald-500 text-emerald-700 dark:text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.3)] dark:shadow-[0_0_12px_rgba(16,185,129,0.5)] ring-2 ring-emerald-500/30'
                    : index === 0
                    ? 'bg-rose-100 dark:bg-rose-950 border-rose-500 text-rose-700 dark:text-rose-400 shadow-[0_0_10px_rgba(244,63,94,0.2)] dark:shadow-[0_0_10px_rgba(244,63,94,0.4)]'
                    : 'bg-stone-100 dark:bg-stone-900 border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300'
                }`}
              >
                {STEP_ICONS[index] || <HelpCircle className="w-4 h-4" />}
              </div>

              {/* Karta z treścią */}
              <div
                className={`flex-1 rounded-xl border p-3.5 sm:p-4 transition-all ${
                  isRootCause
                    ? 'bg-emerald-50/70 border-emerald-400 dark:bg-emerald-950/20 dark:border-emerald-600/70 shadow-md ring-1 ring-emerald-500/30'
                    : index === 0
                    ? 'bg-rose-50/60 border-rose-300 dark:bg-rose-950/20 dark:border-rose-900/40'
                    : 'bg-stone-50 border-stone-200 dark:bg-stone-900/40 dark:border-stone-800/80 hover:border-stone-300 dark:hover:border-stone-700'
                }`}
              >
                <div
                  className="flex items-center justify-between gap-2 cursor-pointer select-none"
                  onClick={() => toggleStep(index)}
                >
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`text-[10px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded ${
                        isRootCause
                          ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/40 font-black'
                          : 'bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
                      }`}
                    >
                      {levels[index]}
                    </span>

                    {isRootCause && (
                      <span className="text-[9px] font-mono font-extrabold tracking-widest px-2 py-0.5 rounded bg-emerald-600 text-white uppercase flex items-center gap-1 shadow-sm">
                        <CheckCircle2 className="w-3 h-3" />
                        {fw?.rootCauseBadge || 'PRZYCZYNA ŹRÓDŁOWA'}
                      </span>
                    )}
                  </div>

                  <span className="text-xs text-stone-400 hover:text-stone-600 dark:hover:text-stone-200">
                    <ChevronRight
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isExpanded ? 'rotate-90' : ''
                      }`}
                    />
                  </span>
                </div>

                {isExpanded && (
                  <div className="mt-2 text-xs sm:text-sm leading-relaxed font-sans text-stone-800 dark:text-stone-200">
                    <p className="font-medium">{fixOrphans(answer)}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};