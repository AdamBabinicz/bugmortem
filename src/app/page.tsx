'use client';

import { useState, useEffect } from 'react';
import { IncidentPreset, TimelineEvent } from '../i18n/types';
import { en as enNamed } from '../i18n/locales/en';
import { pl as plNamed } from '../i18n/locales/pl';
import { useTheme } from '@/context/ThemeContext';

const enDict = enNamed || (enNamed as any)?.default;
const plDict = plNamed || (plNamed as any)?.default;

// Likwidacja wiszących spójników (sierotek typograficznych w języku polskim)
export function fixOrphans(text: string): string {
  if (!text || typeof text !== 'string') return text;
  return text.replace(/(^|\s)([aiouwz]|do|na|od|po|ze|we|za|co|że|to)(\s+)/gi, '$1$2\u00A0');
}

// Bezpieczna integracja z Google Consent Mode v2 i GTM
function pushGtmConsent(analytics: boolean, marketing: boolean) {
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

export default function Home() {
  // Global Theme Context
  const { theme, toggleTheme } = useTheme();

  // Locale state
  const [locale, setLocaleState] = useState<'pl' | 'en'>('en');
  const t = locale === 'pl' ? plDict : enDict;

  // Incident state
  const [selectedPreset, setSelectedPreset] = useState<string>('react-hydration');
  const [customIncidents, setCustomIncidents] = useState<Record<string, IncidentPreset>>({});
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [exportNotice, setExportNotice] = useState<boolean>(false);

  // Dynamiczny, automatyczny zakres praw autorskich
  const [copyrightYears, setCopyrightYears] = useState<string>('2026');

  // Custom Autopsy Modal & Form State
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [formTitle, setFormTitle] = useState<string>('');
  const [formCategory, setFormCategory] = useState<'frontend' | 'backend' | 'database' | 'infra'>('frontend');
  const [formSeverity, setFormSeverity] = useState<'P0' | 'P1' | 'P2'>('P0');
  const [formCrashedCode, setFormCrashedCode] = useState<string>('');
  const [formStackTrace, setFormStackTrace] = useState<string>('');
  const [formResurrectedCode, setFormResurrectedCode] = useState<string>('');
  const [formError, setFormError] = useState<string>('');

  // GDPR Cookie State
  const [cookieConsent, setCookieConsent] = useState<string | null>(null);
  const [isCookieDrawerOpen, setIsCookieDrawerOpen] = useState<boolean>(false);
  const [analyticsCookies, setAnalyticsCookies] = useState<boolean>(true);
  const [marketingCookies, setMarketingCookies] = useState<boolean>(false);

  // Inicjalizacja z localStorage oraz bezpieczna kalkulacja daty
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    if (currentYear > 2026) {
      setCopyrightYears(`2026 - ${currentYear}`);
    } else {
      setCopyrightYears('2026');
    }

    const savedLocale = localStorage.getItem('bugmortem_locale') as 'pl' | 'en';
    if (savedLocale === 'pl' || savedLocale === 'en') {
      setLocaleState(savedLocale);
    }

    const storedConsent = localStorage.getItem('bugmortem_cookie_consent');
    setCookieConsent(storedConsent);

    try {
      const storedIncidents = localStorage.getItem('bugmortem_custom_incidents');
      if (storedIncidents) {
        const parsed = JSON.parse(storedIncidents);
        const valid: Record<string, IncidentPreset> = {};
        Object.entries(parsed).forEach(([k, v]: [string, any]) => {
          if (v && v.title && v.crashedCode) {
            valid[k] = v;
          }
        });
        setCustomIncidents(valid);
      }
    } catch {
      localStorage.removeItem('bugmortem_custom_incidents');
    }
  }, []);

  const changeLocale = (newLocale: 'pl' | 'en') => {
    setLocaleState(newLocale);
    localStorage.setItem('bugmortem_locale', newLocale);
  };

  const presetsMap = t?.presets || enDict?.presets || {};
  const allIncidents: Record<string, IncidentPreset> = {
    ...presetsMap,
    ...customIncidents
  };

  const defaultFallback: IncidentPreset = {
    id: 'react-hydration',
    badge: 'Frontend / SSR',
    severity: 'P0',
    title: 'React Hydration Mismatch',
    desc: 'Incident active in production',
    crashedCode: '// Crash state',
    resurrectedCode: '// Resurrected SRE pattern',
    stackTrace: 'Error trace',
    timeline: [],
    postMortemReport: { summary: '', impact: '', actionItems: [] }
  };

  const activeIncident: IncidentPreset =
    allIncidents[selectedPreset] ||
    presetsMap['react-hydration'] ||
    Object.values(presetsMap)[0] ||
    defaultFallback;

  const safeTimeline: TimelineEvent[] = Array.isArray(activeIncident?.timeline)
    ? activeIncident.timeline
    : [];

  const safeActionItems: string[] = Array.isArray(activeIncident?.postMortemReport?.actionItems)
    ? activeIncident.postMortemReport.actionItems
    : [];

  const handleCopyCode = async () => {
    if (!activeIncident?.resurrectedCode) return;
    try {
      await navigator.clipboard.writeText(activeIncident.resurrectedCode);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      // Ignore clipboard restrictions
    }
  };

  const handleExportReport = () => {
    if (!activeIncident) return;

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const mdContent = `# 💀 BugMortem - ${t?.postMortemTitle || 'Incident Protocol'}
**${t?.fieldIncidentTitle || 'Incident'}:** ${activeIncident.title || 'Untitled Incident'}
**${t?.fieldCategory || 'Category'}:** ${activeIncident.badge || 'N/A'} | **${t?.fieldSeverity || 'Severity'}:** ${activeIncident.severity || 'P0'}
**Timestamp:** ${new Date().toUTCString()}

---

## 1. ${t?.postMortemSummaryHeading || 'Summary'}
${activeIncident.postMortemReport?.summary || ''}

## 2. ${t?.postMortemImpactHeading || 'Impact'}
${activeIncident.postMortemReport?.impact || ''}

## 3. ${t?.postMortemActionsHeading || 'Actions'}
${safeActionItems.map((item) => `- ${item}`).join('\n')}

---

## 4. ${t?.timelineTitle || 'Timeline'}
${safeTimeline.map((evt) => `- [${evt.time}] ${evt.desc} ${evt.isFatal ? '⚠️ (FATAL CRASH)' : ''}`).join('\n')}

---

## 5. ${t?.stackTraceTitle || 'Stack Trace'}
\`\`\`
${activeIncident.stackTrace || ''}
\`\`\`

---

## 6. ${t?.crashedCodeTitle || 'Cursed Code'}
\`\`\`javascript
${activeIncident.crashedCode || ''}
\`\`\`

---

## 7. ${t?.resurrectedCodeTitle || 'Resurrected Code'}
\`\`\`javascript
${activeIncident.resurrectedCode || ''}
\`\`\`

*Report generated by BugMortem (Kiroween 2026 Hackathon Entry).*
`;

    const blob = new Blob([mdContent], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `BugMortem-${activeIncident.id}-${timestamp}.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setExportNotice(true);
    setTimeout(() => setExportNotice(false), 3000);
  };

  const handleCreateCustomAutopsy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formStackTrace.trim()) {
      setFormError(t?.validationErrorRequired || 'Please fill in required fields.');
      return;
    }

    const customId = `custom-${Date.now()}`;
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];

    const categoryBadge =
      formCategory === 'frontend'
        ? t?.categoryFrontend || 'Frontend'
        : formCategory === 'backend'
          ? t?.categoryBackend || 'Backend'
          : formCategory === 'database'
            ? t?.categoryDatabase || 'Database'
            : t?.categoryInfra || 'Infra';

    const severityLabel =
      formSeverity === 'P0'
        ? t?.severityP0 || 'Fatal (P0)'
        : formSeverity === 'P1'
          ? t?.severityP1 || 'Critical (P1)'
          : formSeverity === 'P2'
            ? t?.severityP2 || 'Major (P2)':

    const fallbackResurrected =
      formResurrectedCode.trim() ||
      `// ✅ RESURRECTED SRE PATTERN (Auto-Generated Fallback)
try {
  await executeWithCircuitBreaker(async () => {
    ${formCrashedCode.trim() ? formCrashedCode.split('\n').map((l) => `  ${l}`).join('\n') : '  // Execute protected workload'}
  });
} catch (error) {
  logger.error('Graceful degradation triggered', { error, incidentId: '${customId}' });
  metrics.increment('incident.recovered', { severity: '${formSeverity}' });
  return fallbackResponse();
}`;

    const customTimeline: TimelineEvent[] = [
      { time: timeStr, desc: `${categoryBadge} anomaly initiated under active workload` },
      { time: `${timeStr}.250`, desc: `Exception bubbled up to runtime boundary`, isFatal: true },
      { time: `${timeStr}.500`, desc: `Fatal crash handler terminated process execution`, isFatal: true }
    ];

    const newIncident: IncidentPreset = {
      id: customId,
      badge: categoryBadge,
      severity: severityLabel,
      title: formTitle.trim(),
      desc: formStackTrace.split('\n')[0].slice(0, 140) || formTitle.trim(),
      crashedCode: formCrashedCode.trim() || `// ❌ CRASH STATE\n${formStackTrace.slice(0, 300)}`,
      resurrectedCode: fallbackResurrected,
      stackTrace: formStackTrace.trim(),
      timeline: customTimeline,
      postMortemReport: {
        summary: `${severityLabel} incident in ${categoryBadge}: ${formTitle.trim()}. Captured via live autopsy ingestion.`,
        impact: `Service interruption detected. Immediate mitigation executed via SRE safety guardrails.`,
        actionItems: [
          `Review stack trace root cause in ${categoryBadge} subsystem.`,
          `Implement automated canary regression testing in deployment pipeline.`,
          `Harden error boundaries and apply circuit breaker patterns.`
        ]
      }
    };

    const updatedCustom = { ...customIncidents, [customId]: newIncident };
    setCustomIncidents(updatedCustom);
    localStorage.setItem('bugmortem_custom_incidents', JSON.stringify(updatedCustom));

    setSelectedPreset(customId);
    setIsModalOpen(false);
    setFormTitle('');
    setFormCrashedCode('');
    setFormStackTrace('');
    setFormResurrectedCode('');
    setFormError('');
  };

  const handleAcceptAllCookies = () => {
    localStorage.setItem('bugmortem_cookie_consent', 'all');
    setCookieConsent('all');
    pushGtmConsent(true, true);
  };

  const handleAcceptEssential = () => {
    localStorage.setItem('bugmortem_cookie_consent', 'essential');
    setCookieConsent('essential');
    pushGtmConsent(false, false);
  };

  const handleSaveCookiePreferences = () => {
    const consentVal = `custom_analytics_${analyticsCookies}_marketing_${marketingCookies}`;
    localStorage.setItem('bugmortem_cookie_consent', consentVal);
    setCookieConsent(consentVal);
    setIsCookieDrawerOpen(false);
    pushGtmConsent(analyticsCookies, marketingCookies);
  };

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 dark:bg-stone-950 dark:text-stone-100 font-sans">
      {/* Top Navigation */}
      <header className="border-b border-stone-200 bg-white/80 dark:border-stone-800 dark:bg-stone-900/80 backdrop-blur-md sticky top-0 z-40">
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
                {fixOrphans(t?.subtitle)}
              </p>
            </div>
          </div>

          {/* Controls: Language + Theme */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <div className="flex items-center bg-stone-200 dark:bg-stone-800 rounded-lg p-0.5 sm:p-1 border border-stone-300 dark:border-stone-700 text-xs font-semibold">
              <button
                type="button"
                onClick={() => changeLocale('pl')}
                className={`px-2 sm:px-2.5 py-1 rounded transition-colors cursor-pointer ${
                  locale === 'pl'
                    ? 'bg-rose-600 text-white font-bold shadow-sm'
                    : 'text-stone-800 hover:text-stone-950 dark:text-stone-300 dark:hover:text-white'
                }`}
              >
                <span className="sm:hidden">PL</span>
                <span className="hidden sm:inline">Polski (PL)</span>
              </button>
              <button
                type="button"
                onClick={() => changeLocale('en')}
                className={`px-2 sm:px-2.5 py-1 rounded transition-colors cursor-pointer ${
                  locale === 'en'
                    ? 'bg-rose-600 text-white font-bold shadow-sm'
                    : 'text-stone-800 hover:text-stone-950 dark:text-stone-300 dark:hover:text-white'
                }`}
              >
                <span className="sm:hidden">EN</span>
                <span className="hidden sm:inline">English (EN)</span>
              </button>
            </div>

            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-1.5 sm:p-2 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-800 border border-stone-300 dark:bg-stone-800 dark:hover:bg-stone-700 dark:text-stone-200 dark:border-stone-700 transition-colors cursor-pointer shadow-sm text-sm"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* Hero Section */}
        <div className="bg-white border-stone-200 text-stone-900 dark:bg-stone-900/60 dark:border-stone-800 dark:text-white rounded-2xl border p-5 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden shadow-xl dark:shadow-2xl">
          <div className="space-y-3 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold tracking-wider uppercase bg-rose-100 text-rose-700 border border-rose-300 dark:bg-rose-950/60 dark:text-rose-400 dark:border-rose-800/40">
              {/* Stabilny wskaźnik z poświatą bez ciągłej pętli animacji ping */}
              <span className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.9)]" />
              {t?.badgeHackathon}
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white">
              {fixOrphans(t?.title)}
            </h1>
            <p className="text-stone-700 dark:text-stone-300 max-w-2xl text-xs sm:text-base leading-relaxed">
              {fixOrphans(t?.subtitle)}
            </p>
          </div>

          <div className="z-10 flex flex-col items-start md:items-end gap-3 w-full md:w-auto">
            <div className="w-full md:w-auto bg-stone-100 border-stone-200 dark:bg-stone-950/80 dark:border-stone-800 rounded-xl p-3 sm:p-4 border flex items-center justify-between md:justify-end gap-4 shadow-inner">
              <div className="text-left md:text-right">
                <div className="text-[10px] uppercase font-bold tracking-widest text-stone-700 dark:text-stone-300">
                  {t?.statusLabel}
                </div>
                <div className="text-xs sm:text-sm font-mono font-bold text-rose-600 dark:text-rose-500 flex items-center gap-2">
                  {/* Stabilna dioda neonowa SRE */}
                  <span className="inline-block w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_6px_rgba(244,63,94,0.8)]" />
                  {t?.statusValue}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="w-full md:w-auto px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/30 dark:shadow-rose-900/40 border border-rose-400/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="text-sm">⚡</span>
              {t?.customAutopsyBtn}
            </button>
          </div>
        </div>

        {/* Preset Cards & Case Selection */}
        <section className="space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-stone-700 dark:text-stone-300">
              {t?.presetsSectionTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {Object.entries(allIncidents).map(([incidentKey, incident], idx) => {
              const incidentId = incident?.id || incidentKey;
              const isSelected = selectedPreset === incidentId;
              return (
                <button
                  key={`incident-${incidentId}-${idx}`}
                  type="button"
                  onClick={() => setSelectedPreset(incidentId)}
                  className={`text-left p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-rose-50/80 border-rose-500 shadow-md ring-1 ring-rose-500/50 dark:bg-stone-900 dark:border-rose-500 dark:shadow-lg dark:shadow-rose-950/30'
                      : 'bg-white border-stone-200 hover:border-stone-300 hover:bg-stone-50 dark:bg-stone-900/40 dark:border-stone-800/80 dark:hover:border-stone-700 dark:hover:bg-stone-900/80'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                        {incident?.badge}
                      </span>
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-stone-100 text-stone-800 border border-stone-300 dark:bg-stone-800 dark:text-stone-200 dark:border-stone-700">
                        {incident?.severity}
                      </span>
                    </div>
                    <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100 line-clamp-1">
                      {fixOrphans(incident?.title)}
                    </h3>
                    <p className="text-xs text-stone-700 dark:text-stone-300 line-clamp-2">
                      {fixOrphans(incident?.desc)}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Side-by-Side Code Autopsy – Zoptymalizowany dla Speed Index z content-visibility */}
        <section className="space-y-3 sm:space-y-4 [content-visibility:auto] [contain-intrinsic-size:1px_450px]">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-stone-700 dark:text-stone-300 flex items-center gap-2">
              <span>&lt;/&gt;</span>
              {t?.autopsyTitle}
            </h2>
            <button
              type="button"
              onClick={handleCopyCode}
              className="text-xs font-mono px-3 py-1.5 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-800 border border-stone-300 dark:bg-stone-800 dark:hover:bg-stone-700 dark:text-stone-200 dark:border-stone-700 transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <span>📋</span>
              {isCopied ? t?.copiedCodeBtn : t?.copyCodeBtn}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Cursed Code (Before) */}
            <div className="rounded-xl border border-rose-300 bg-rose-50/40 dark:border-rose-900/40 dark:bg-stone-950/80 overflow-hidden shadow-lg">
              <div className="bg-rose-100/80 border-b border-rose-200 dark:bg-rose-950/30 dark:border-rose-900/40 px-3 sm:px-4 py-2.5 flex items-center justify-between gap-2">
                <span className="text-xs font-mono font-bold tracking-wider text-rose-700 dark:text-rose-400 flex items-center gap-1.5 truncate">
                  <span>💀</span>
                  {t?.crashedCodeTitle}
                </span>
                <span className="text-[10px] font-mono uppercase font-bold px-1.5 sm:px-2 py-0.5 rounded bg-rose-200 text-rose-800 border border-rose-300 dark:bg-rose-500/20 dark:text-rose-300 dark:border-rose-500/40 shrink-0">
                  {t?.crashedBadge}
                </span>
              </div>
              <pre className="p-3 sm:p-4 font-mono text-xs leading-relaxed text-rose-950 dark:text-rose-200 overflow-x-auto whitespace-pre selection:bg-rose-200 dark:selection:bg-rose-900/50">
                <code>{activeIncident?.crashedCode}</code>
              </pre>
            </div>

            {/* Resurrected Code (After) */}
            <div className="rounded-xl border border-emerald-300 bg-emerald-50/40 dark:border-emerald-900/40 dark:bg-stone-950/80 overflow-hidden shadow-lg">
              <div className="bg-emerald-100/80 border-b border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-900/40 px-3 sm:px-4 py-2.5 flex items-center justify-between gap-2">
                <span className="text-xs font-mono font-bold tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5 truncate">
                  <span>✨</span>
                  {t?.resurrectedCodeTitle}
                </span>
                <span className="text-[10px] font-mono uppercase font-bold px-1.5 sm:px-2 py-0.5 rounded bg-emerald-200 text-emerald-800 border border-emerald-300 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/40 shrink-0">
                  {t?.resurrectedBadge}
                </span>
              </div>
              <pre className="p-3 sm:p-4 font-mono text-xs leading-relaxed text-emerald-950 dark:text-emerald-200 overflow-x-auto whitespace-pre selection:bg-emerald-200 dark:selection:bg-emerald-900/50">
                <code>{activeIncident?.resurrectedCode}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* Stack Trace & Timeline – Zoptymalizowany dla Speed Index z content-visibility */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 [content-visibility:auto] [contain-intrinsic-size:1px_350px]">
          <section className="space-y-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-stone-700 dark:text-stone-300 flex items-center gap-2">
              <span>&gt;_</span>
              {t?.stackTraceTitle}
            </h2>
            <div className="rounded-xl border border-stone-800 bg-stone-950 p-3 sm:p-4 font-mono text-xs text-rose-400/90 leading-relaxed overflow-x-auto shadow-inner">
              <pre className="whitespace-pre-wrap">{activeIncident?.stackTrace}</pre>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-stone-700 dark:text-stone-300 flex items-center gap-2">
              <span>⏱</span>
              {t?.timelineTitle}
            </h2>
            <div className="rounded-xl border border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900/40 p-3 sm:p-4 space-y-3 shadow-sm dark:shadow-inner">
              {safeTimeline.map((event, idx) => (
                <div key={`timeline-${idx}-${event.time}`} className="flex items-start gap-2.5 sm:gap-3 text-xs font-mono">
                  {/* WCAG AA / AAA wysoki kontrast dla znacznika czasu */}
                  <span className="text-stone-700 dark:text-stone-300 font-medium shrink-0 select-none text-[11px] sm:text-xs">
                    {event.time}
                  </span>
                  <span className={event.isFatal ? 'text-amber-600 dark:text-amber-400 font-bold' : 'text-stone-900 dark:text-stone-100'}>
                    {fixOrphans(event.desc)}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Official Post-Mortem Report Protocol – Zoptymalizowany dla Speed Index */}
        <section className="rounded-2xl border border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900/50 p-5 sm:p-8 space-y-5 sm:space-y-6 shadow-xl dark:shadow-2xl relative [content-visibility:auto] [contain-intrinsic-size:1px_300px]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border-b border-stone-200 dark:border-stone-800 pb-4">
            <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200 flex items-center gap-2">
              <span>📄</span>
              {t?.postMortemTitle}
            </h2>
            <button
              type="button"
              onClick={handleExportReport}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-stone-200 hover:bg-stone-300 text-stone-800 border border-stone-300 dark:bg-stone-800 dark:hover:bg-stone-700 dark:text-stone-200 dark:border-stone-700 transition-colors cursor-pointer shadow-sm w-full sm:w-auto"
            >
              <span>⬇️</span>
              {t?.exportReportBtn}
            </button>
          </div>

          {exportNotice && (
            <div className="p-3 rounded-lg bg-emerald-100 border border-emerald-300 text-emerald-800 dark:bg-emerald-950/60 dark:border-emerald-800/50 dark:text-emerald-300 text-xs font-mono flex items-center gap-2">
              <span>✓</span>
              {t?.downloadSuccess}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            <div className="space-y-2">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-stone-700 dark:text-stone-300">
                {t?.postMortemSummaryHeading}
              </h3>
              <p className="text-xs text-stone-800 dark:text-stone-200 leading-relaxed">
                {fixOrphans(activeIncident?.postMortemReport?.summary)}
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-stone-700 dark:text-stone-300">
                {t?.postMortemImpactHeading}
              </h3>
              <p className="text-xs text-stone-800 dark:text-stone-200 leading-relaxed">
                {fixOrphans(activeIncident?.postMortemReport?.impact)}
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-stone-700 dark:text-stone-300">
                {t?.postMortemActionsHeading}
              </h3>
              <ul className="space-y-1.5 list-disc list-inside text-xs text-stone-800 dark:text-stone-200 leading-relaxed">
                {safeActionItems.map((item, idx) => (
                  <li key={`action-${idx}`}>{fixOrphans(item)}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>

      {/* Custom Autopsy Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl max-w-2xl w-full p-5 sm:p-8 space-y-5 sm:space-y-6 shadow-2xl relative my-6 text-stone-900 dark:text-stone-100">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2">
                  <span>⚡</span>
                  {t?.customModalTitle}
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-300 mt-1">
                  {fixOrphans(t?.customModalSubtitle)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white text-lg p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {formError && (
              <div className="p-3 rounded-lg bg-rose-100 border border-rose-300 text-rose-800 dark:bg-rose-950/60 dark:border-rose-800/50 dark:text-rose-300 text-xs font-mono">
                {formError}
              </div>
            )}

            <form onSubmit={handleCreateCustomAutopsy} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-stone-800 dark:text-stone-200 mb-1">
                  {t?.fieldIncidentTitle} *
                </label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder={t?.fieldIncidentTitlePlaceholder}
                  className="w-full bg-stone-50 border border-stone-300 text-stone-900 placeholder-stone-500 dark:bg-stone-950 dark:border-stone-800 dark:text-stone-100 dark:placeholder-stone-500 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-stone-800 dark:text-stone-200 mb-1">
                    {t?.fieldCategory}
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as any)}
                    className="w-full bg-stone-50 border border-stone-300 text-stone-900 dark:bg-stone-950 dark:border-stone-800 dark:text-stone-100 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-rose-500"
                  >
                    <option value="frontend">{t?.categoryFrontend}</option>
                    <option value="backend">{t?.categoryBackend}</option>
                    <option value="database">{t?.categoryDatabase}</option>
                    <option value="infra">{t?.categoryInfra}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-stone-800 dark:text-stone-200 mb-1">
                    {t?.fieldSeverity}
                  </label>
                  <select
                    value={formSeverity}
                    onChange={(e) => setFormSeverity(e.target.value as any)}
                    className="w-full bg-stone-50 border border-stone-300 text-stone-900 dark:bg-stone-950 dark:border-stone-800 dark:text-stone-100 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-rose-500"
                  >
                    <option value="P0">{t?.severityP0}</option>
                    <option value="P1">{t?.severityP1}</option>
                    <option value="P2">{t?.severityP2}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-stone-800 dark:text-stone-200 mb-1">
                  {t?.fieldStackTrace} *
                </label>
                <textarea
                  rows={4}
                  value={formStackTrace}
                  onChange={(e) => setFormStackTrace(e.target.value)}
                  placeholder={t?.fieldStackTracePlaceholder}
                  className="w-full bg-stone-900 border border-stone-800 rounded-lg p-3 font-mono text-xs text-rose-300 placeholder-stone-400 focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-stone-800 dark:text-stone-200 mb-1">
                  {t?.fieldCrashedCode}
                </label>
                <textarea
                  rows={3}
                  value={formCrashedCode}
                  onChange={(e) => setFormCrashedCode(e.target.value)}
                  placeholder={t?.fieldCrashedCodePlaceholder}
                  className="w-full bg-stone-50 border border-stone-300 text-stone-900 dark:bg-stone-950 dark:border-stone-800 dark:text-stone-200 placeholder-stone-500 dark:placeholder-stone-500 rounded-lg p-3 font-mono text-xs focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-stone-800 dark:text-stone-200 mb-1">
                  {t?.fieldResurrectedCode}
                </label>
                <textarea
                  rows={3}
                  value={formResurrectedCode}
                  onChange={(e) => setFormResurrectedCode(e.target.value)}
                  placeholder={t?.fieldResurrectedCodePlaceholder}
                  className="w-full bg-stone-50 border border-stone-300 text-stone-900 dark:bg-stone-950 dark:border-stone-800 dark:text-emerald-300 placeholder-stone-500 dark:placeholder-stone-500 rounded-lg p-3 font-mono text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-stone-700 hover:text-stone-950 dark:text-stone-300 dark:hover:text-white cursor-pointer"
                >
                  {t?.btnCancel}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/30 dark:shadow-rose-900/40 border border-rose-400/30 cursor-pointer"
                >
                  {t?.btnAnalyzeAndGenerate}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer – Pełna zgodność z kontrastem WCAG AA / AAA */}
      <footer className="border-t border-stone-200 bg-white dark:border-stone-900 dark:bg-stone-950 py-8 text-xs text-stone-700 dark:text-stone-300">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © {copyrightYears} BugMortem. {t?.footerRights}
          </div>
          <div className="flex items-center gap-4">
            <span className="text-stone-700 hover:text-stone-950 dark:text-stone-300 dark:hover:text-white cursor-pointer">{t?.footerPrivacy}</span>
            <span>•</span>
            <span className="text-stone-700 hover:text-stone-950 dark:text-stone-300 dark:hover:text-white cursor-pointer">{t?.footerTerms}</span>
            <span>•</span>
            <button
              type="button"
              onClick={() => setIsCookieDrawerOpen(true)}
              className="text-stone-700 hover:text-stone-950 dark:text-stone-300 dark:hover:text-white underline cursor-pointer"
            >
              {t?.footerCookieSettings}
            </button>
          </div>
        </div>
      </footer>

      {/* GDPR Cookie Banner – Wysoki kontrast */}
      {!cookieConsent && (
        <aside
          aria-label="Cookie consent banner"
          className="fixed bottom-4 left-3 right-3 sm:left-auto sm:right-4 max-w-md bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-4 sm:p-5 shadow-2xl z-50 space-y-3 sm:space-y-4 text-stone-900 dark:text-stone-100"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-500 text-sm font-bold">
              <span>🛡️</span>
              <h3>{t?.cookieTitle}</h3>
            </div>
            <button
              type="button"
              onClick={handleAcceptEssential}
              className="text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white text-xs p-1 cursor-pointer"
            >
              ✕
            </button>
          </div>
          <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
            {fixOrphans(t?.cookieDesc)}
          </p>
          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={handleAcceptAllCookies}
              className="flex-1 py-2 px-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs tracking-wider transition-colors cursor-pointer text-center shadow-sm"
            >
              {t?.cookieAcceptAll}
            </button>
            <button
              type="button"
              onClick={handleAcceptEssential}
              className="py-2 px-3 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 dark:bg-stone-800 dark:hover:bg-stone-700 dark:text-stone-200 font-bold text-xs transition-colors cursor-pointer text-center"
            >
              {t?.cookieEssentialOnly}
            </button>
          </div>
          <button
            type="button"
            onClick={() => setIsCookieDrawerOpen(true)}
            className="w-full text-center text-xs font-medium text-stone-700 hover:text-stone-950 dark:text-stone-300 dark:hover:text-white underline cursor-pointer"
          >
            {t?.cookieCustomize}
          </button>
        </aside>
      )}

      {/* Cookie Drawer Modal – Wysoki kontrast */}
      {isCookieDrawerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-4">
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl max-w-md w-full p-5 sm:p-6 space-y-5 shadow-2xl text-stone-900 dark:text-stone-100">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-stone-900 dark:text-white flex items-center gap-2">
                <span>🛡️</span>
                {t?.cookieDrawerTitle}
              </h3>
              <button
                type="button"
                onClick={() => setIsCookieDrawerOpen(false)}
                className="text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4 p-3 rounded-xl bg-stone-100 border border-stone-200 dark:bg-stone-950 dark:border-stone-800">
                <div>
                  <div className="text-xs font-bold text-stone-900 dark:text-stone-200">{t?.cookieAnalytics}</div>
                  <div className="text-[11px] text-stone-700 dark:text-stone-300 mt-0.5">{fixOrphans(t?.cookieAnalyticsDesc)}</div>
                </div>
                <input
                  type="checkbox"
                  checked={analyticsCookies}
                  onChange={(e) => setAnalyticsCookies(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-stone-300 text-rose-600 focus:ring-rose-500 cursor-pointer"
                />
              </div>

              <div className="flex items-start justify-between gap-4 p-3 rounded-xl bg-stone-100 border border-stone-200 dark:bg-stone-950 dark:border-stone-800">
                <div>
                  <div className="text-xs font-bold text-stone-900 dark:text-stone-200">{t?.cookieMarketing}</div>
                  <div className="text-[11px] text-stone-700 dark:text-stone-300 mt-0.5">{fixOrphans(t?.cookieMarketingDesc)}</div>
                </div>
                <input
                  type="checkbox"
                  checked={marketingCookies}
                  onChange={(e) => setMarketingCookies(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-stone-300 text-rose-600 focus:ring-rose-500 cursor-pointer"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={handleSaveCookiePreferences}
                className="w-full py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs tracking-wider transition-colors cursor-pointer shadow-sm"
              >
                {t?.cookieSavePreferences}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}