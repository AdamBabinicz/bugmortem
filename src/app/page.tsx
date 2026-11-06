'use client';

import { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { TopNavbar } from '@/components/TopNavbar';
import { IncidentDispatcherModal } from '@/components/IncidentDispatcherModal';
import { IncidentReplayer } from '@/components/IncidentReplayer';
import { FiveWhysTree } from '@/components/FiveWhysTree';
import { SrePrescriptionModal } from '@/components/SrePrescriptionModal';
import { CustomAutopsyModal } from '@/components/CustomAutopsyModal';
import { BlastRadiusMap } from '@/components/BlastRadiusMap';
import { ChaosSandbox } from '@/components/ChaosSandbox';
import { PostMortemSection } from '@/components/PostMortemSection';
import { EcgMonitor, WaveformState } from '@/components/EcgMonitor';
import { LegalModal, LegalDocType } from '@/components/legal/LegalModal';
import { useTheme } from '@/context/ThemeContext';
import { useI18n } from '@/i18n/context';
import { IncidentPreset, TimelineEvent } from '@/i18n/types';
import { useAudioEngine, SeverityMode } from '@/hooks/useAudioEngine';

// Likwidacja wiszących spójników (sierotek typograficznych w języku polskim)
export function fixOrphans(text?: string | null): string {
  if (!text || typeof text !== 'string') return text || '';
  return text.replace(/(^|\s)([aiouwz]|do|na|od|po|ze|we|za|co|że|to)(\s+)/gi, '$1$2\u00A0');
}

export default function Home() {
  // Global Theme & I18n Context
  const { theme, toggleTheme } = useTheme();
  const { locale, setLocale, t } = useI18n();

  // Modal States
  const [isDispatcherOpen, setIsDispatcherOpen] = useState<boolean>(false);
  const [isPrescriptionOpen, setIsPrescriptionOpen] = useState<boolean>(false);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState<boolean>(false);
  const [legalDoc, setLegalDoc] = useState<LegalDocType>(null);

  // Chaos & Telemetry State
  const [activeChaos, setActiveChaos] = useState<string | null>(null);
  const [waveformState, setWaveformState] = useState<WaveformState>('flatline');

  // Incident Registry State
  const [selectedPreset, setSelectedPreset] = useState<string>('react-hydration');
  const [customIncidents, setCustomIncidents] = useState<Record<string, IncidentPreset>>({});
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [copyrightYears, setCopyrightYears] = useState<string>('2026');

  // Dynamiczny rok praw autorskich i ładowanie incydentów z localStorage
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    if (currentYear > 2026) {
      setCopyrightYears(`2026 - ${currentYear}`);
    } else {
      setCopyrightYears('2026');
    }

    try {
      const storedIncidents = localStorage.getItem('bugmortem_custom_incidents');
      if (storedIncidents) {
        const parsed = JSON.parse(storedIncidents);
        const valid: Record<string, IncidentPreset> = {};
        Object.entries(parsed).forEach(([k, v]) => {
          const item = v as IncidentPreset;
          if (item && item.title && (item.codeSnippet || (item as any).crashedCode)) {
            valid[k] = item;
          }
        });
        setCustomIncidents(valid);
      }
    } catch {
      localStorage.removeItem('bugmortem_custom_incidents');
    }
  }, []);

  const changeLocale = (newLocale: 'pl' | 'en') => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setLocale(newLocale);
  };

  const presetsMap = t?.presets?.items || (t as any)?.presets || {};
  const allIncidents: Record<string, IncidentPreset> = {
    ...presetsMap,
    ...customIncidents,
  };

  const defaultFallback: IncidentPreset = {
    id: 'react-hydration',
    badge: 'Frontend / SSR',
    severity: 'P0',
    title: 'React Hydration Mismatch',
    description: 'Incident active in production',
    codeSnippet: '// Crash state',
    revivedCode: '// Resurrected SRE pattern',
    stackTrace: 'Error trace',
    timeline: [],
    postMortem: { summary: '', impact: '', actionItems: [] },
    blastRadius: {
      nodes: [],
      summary: { epicenterCount: 1, degradedCount: 1, healthyCount: 2 },
    },
    chaosMetrics: [],
  };

  const activeIncident: IncidentPreset =
    allIncidents[selectedPreset] ||
    presetsMap['react-hydration'] ||
    Object.values(presetsMap)[0] ||
    defaultFallback;

  const activeSeverity = activeIncident?.severity ?? 'P1';

  // Dynamiczne mapowanie dźwięku: pełna synchronizacja z wykresem EKG
  const dynamicAudioSeverity: SeverityMode =
    waveformState === 'flatline'
      ? 'P0'
      : waveformState === 'resurrected'
      ? 'P2'
      : 'P1';

  const { audioEnabled, toggleAudio, playResurrectionChime } = useAudioEngine(dynamicAudioSeverity);

  // Synchronizacja fali EKG przy zmianie incydentu
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    const sev = activeIncident?.severity ?? '';
    if (sev === 'P0') {
      setWaveformState('flatline');
    } else {
      setWaveformState('p1-heartbeat');
    }
  }, [selectedPreset, activeIncident?.severity]);

  const safeTimeline: TimelineEvent[] = Array.isArray(activeIncident?.timeline)
    ? activeIncident.timeline
    : [];

  const activeCrashedCode = activeIncident?.codeSnippet || (activeIncident as any)?.crashedCode || '';
  const activeRevivedCode = activeIncident?.revivedCode || (activeIncident as any)?.resurrectedCode || '';

  // Obsługa kroków Replayera
  const handleReplayerStepChange = (_stepIndex: number, isFatal: boolean) => {
    if (isFatal) {
      setWaveformState('flatline');
    } else {
      setWaveformState('p1-heartbeat');
    }
  };

  const handleReplayerReset = () => {
    const sev = activeIncident?.severity ?? '';
    if (sev === 'P0') {
      setWaveformState('flatline');
    } else {
      setWaveformState('p1-heartbeat');
    }
  };

  // Chaos handlers
  const handleTriggerChaos = (scenarioId: string, severity: 'P0' | 'P1') => {
    setActiveChaos(scenarioId);
    if (severity === 'P0') {
      setWaveformState('flatline');
    } else {
      setWaveformState('p1-heartbeat');
    }
  };

  const handleMitigateChaos = () => {
    setActiveChaos(null);
    playResurrectionChime();
    setWaveformState('resurrected');
    setTimeout(() => {
      const sev = activeIncident?.severity ?? '';
      if (sev === 'P0') {
        setWaveformState('flatline');
      } else {
        setWaveformState('p1-heartbeat');
      }
    }, 4000);
  };

  const handleCopyCode = async () => {
    if (!activeRevivedCode) return;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(activeRevivedCode);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = activeRevivedCode;
        textarea.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setIsCopied(true);
      playResurrectionChime();
      setWaveformState('resurrected');
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      // Ignore
    }
  };

  const handleSaveCustomIncident = (newIncident: IncidentPreset) => {
    const updated = { ...customIncidents, [newIncident.id]: newIncident };
    setCustomIncidents(updated);
    localStorage.setItem('bugmortem_custom_incidents', JSON.stringify(updated));
    setSelectedPreset(newIncident.id);
  };

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 dark:bg-stone-950 dark:text-stone-100 font-sans">
      {/* 1. Top Navbar */}
      <TopNavbar
        locale={locale}
        onChangeLocale={changeLocale}
        theme={theme}
        toggleTheme={toggleTheme}
        t={t}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* 2. Hero Section */}
        <div className="bg-white border-stone-200 text-stone-900 dark:bg-stone-900/60 dark:border-stone-800 dark:text-white rounded-2xl border p-5 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden shadow-xl dark:shadow-2xl">
          <div className="space-y-3 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold tracking-wider uppercase bg-rose-100 text-rose-700 border border-rose-300 dark:bg-rose-950/60 dark:text-rose-400 dark:border-rose-800/40">
              <span className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_#f43f5e]" />
              {t?.hero?.badge}
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white">
              {fixOrphans(t?.hero?.title)}
            </h1>
            <p className="text-stone-700 dark:text-stone-300 max-w-2xl text-xs sm:text-base leading-relaxed">
              {fixOrphans(t?.hero?.subtitle)}
            </p>
          </div>

          <div className="z-10 flex flex-col items-start md:items-end gap-3 w-full md:w-auto">
            <div className="w-full md:w-auto bg-stone-100 border-stone-200 dark:bg-stone-950/80 dark:border-stone-800 rounded-xl px-3 sm:px-4 py-3 border shadow-inner">
              <div className="flex items-center gap-3">
                {/* Audio toggle */}
                <button
                  type="button"
                  onClick={toggleAudio}
                  aria-label={audioEnabled ? 'Mute' : 'Unmute'}
                  title={audioEnabled ? 'Mute' : 'Unmute'}
                  className={`p-1.5 rounded-lg border transition-all cursor-pointer shrink-0 ${
                    audioEnabled
                      ? 'bg-emerald-100 border-emerald-400 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-950/60 dark:border-emerald-700 dark:text-emerald-400 dark:hover:bg-emerald-900/60 shadow-[0_0_8px_rgba(16,185,129,0.35)]'
                      : 'bg-stone-200 border-stone-300 text-stone-500 hover:bg-stone-300 dark:bg-stone-800 dark:border-stone-700 dark:text-stone-400 dark:hover:bg-stone-700'
                  }`}
                >
                  {audioEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                </button>

                {/* ECG Waveform */}
                <div className="flex-1 min-w-0">
                  <EcgMonitor state={waveformState} />
                </div>

                {/* Status indicator */}
                <div className="shrink-0 text-right">
                  <div className="text-[10px] uppercase font-bold tracking-widest text-stone-700 dark:text-stone-300 whitespace-nowrap">
                    STATUS
                  </div>
                  <div className={`text-[10px] sm:text-xs font-mono font-bold flex items-center justify-end gap-1.5 leading-tight ${
                    waveformState === 'resurrected'
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : waveformState === 'p1-heartbeat'
                      ? 'text-amber-600 dark:text-amber-400'
                      : 'text-rose-600 dark:text-rose-500'
                  }`}>
                    <span className={`inline-block w-2 h-2 rounded-full shrink-0 animate-pulse ${
                      waveformState === 'resurrected'
                        ? 'bg-emerald-500 shadow-[0_0_6px_#10b981]'
                        : waveformState === 'p1-heartbeat'
                        ? 'bg-amber-500 shadow-[0_0_6px_#f59e0b]'
                        : 'bg-rose-500 shadow-[0_0_6px_#f43f5e]'
                    }`} />
                    <span className="whitespace-nowrap">
                      {waveformState === 'resurrected'
                        ? (t?.hero?.statusStable || '200 OK')
                        : waveformState === 'p1-heartbeat'
                        ? 'P1 DEGRADED'
                        : (t?.hero?.statusActive || 'P0 FATAL')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsCustomModalOpen(true)}
              className="w-full md:w-auto px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/30 dark:shadow-rose-900/40 border border-rose-400/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="text-sm">⚡</span>
              {t?.hero?.inputCta}
            </button>
          </div>
        </div>

        {/* 3. Preset Cards Grid */}
        <section className="space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-stone-700 dark:text-stone-300">
              {t?.presets?.sectionTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
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
                  <span className="block space-y-2 w-full">
                    <span className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                        {incident?.badge}
                      </span>
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-stone-100 text-stone-800 border border-stone-300 dark:bg-stone-800 dark:text-stone-200 dark:border-stone-700">
                        {incident?.severity}
                      </span>
                    </span>
                    <strong className="block font-bold text-sm text-stone-900 dark:text-stone-100 line-clamp-1">
                      {fixOrphans(incident?.title)}
                    </strong>
                    <span className="block text-xs text-stone-700 dark:text-stone-300 line-clamp-2 font-normal">
                      {fixOrphans(incident?.description || (incident as any)?.desc)}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* 4. Side-by-Side Code Autopsy */}
        <section
          style={{ contentVisibility: 'auto', containIntrinsicSize: '450px' }}
          className="space-y-3 sm:space-y-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-stone-700 dark:text-stone-300 flex items-center gap-2">
              <span>&lt;/&gt;</span>
              {t?.codeSection?.cursedTitle}
            </h2>
            <button
              type="button"
              onClick={handleCopyCode}
              className="text-xs font-mono px-3 py-1.5 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-800 border border-stone-300 dark:bg-stone-800 dark:hover:bg-stone-700 dark:text-stone-200 dark:border-stone-700 transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <span>📋</span>
              {isCopied ? t?.codeSection?.copied : t?.codeSection?.copyCta}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Cursed Code */}
            <div className="rounded-xl border border-rose-300 bg-rose-50/40 dark:border-rose-900/40 dark:bg-stone-950/80 overflow-hidden shadow-lg">
              <div className="bg-rose-100/80 border-b border-rose-200 dark:bg-rose-950/30 dark:border-rose-900/40 px-3 sm:px-4 py-2.5 flex items-center justify-between gap-2">
                <span className="text-xs font-mono font-bold tracking-wider text-rose-700 dark:text-rose-400 flex items-center gap-1.5 truncate">
                  <span>💀</span>
                  {t?.codeSection?.cursedTitle}
                </span>
                <span className="text-[10px] font-mono uppercase font-bold px-1.5 sm:px-2 py-0.5 rounded bg-rose-200 text-rose-800 border border-rose-300 dark:bg-rose-500/20 dark:text-rose-300 dark:border-rose-500/40 shrink-0">
                  {t?.codeSection?.cursedBadge}
                </span>
              </div>
              <pre className="p-3 sm:p-4 font-mono text-xs leading-relaxed text-rose-950 dark:text-rose-200 overflow-x-auto whitespace-pre selection:bg-rose-200 dark:selection:bg-rose-900/50">
                <code>{activeCrashedCode}</code>
              </pre>
            </div>

            {/* Resurrected Code */}
            <div className="rounded-xl border border-emerald-300 bg-emerald-50/40 dark:border-emerald-900/40 dark:bg-stone-950/80 overflow-hidden shadow-lg">
              <div className="bg-emerald-100/80 border-b border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-900/40 px-3 sm:px-4 py-2.5 flex items-center justify-between gap-2">
                <span className="text-xs font-mono font-bold tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5 truncate">
                  <span>✨</span>
                  {t?.codeSection?.resurrectedTitle}
                </span>
                <span className="text-[10px] font-mono uppercase font-bold px-1.5 sm:px-2 py-0.5 rounded bg-emerald-200 text-emerald-800 border border-emerald-300 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/40 shrink-0">
                  {t?.codeSection?.resurrectedBadge}
                </span>
              </div>
              <pre className="p-3 sm:p-4 font-mono text-xs leading-relaxed text-emerald-950 dark:text-emerald-200 overflow-x-auto whitespace-pre selection:bg-emerald-200 dark:selection:bg-emerald-900/50">
                <code>{activeRevivedCode}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* 5. Stack Trace & Timeline Replayer */}
        <div
          style={{ contentVisibility: 'auto', containIntrinsicSize: '350px' }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6"
        >
          {/* Surowy Ślad Stosu */}
          <section className="space-y-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-stone-700 dark:text-stone-300 flex items-center gap-2">
              <span>&gt;_</span>
              {t?.stackTrace?.title}
            </h2>
            <div className="rounded-xl border border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-950 p-3 sm:p-4 font-mono text-xs text-rose-700 dark:text-rose-400/90 leading-relaxed overflow-x-auto shadow-sm dark:shadow-inner h-[280px]">
              <pre className="whitespace-pre-wrap">{activeIncident?.stackTrace}</pre>
            </div>
          </section>

          {/* Odtwarzacz Zapaści w Czasie & Oś Czasu Awarii (Zero sztywnych fallbacków) */}
          <section className="space-y-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-stone-700 dark:text-stone-300 flex items-center gap-2">
              <span>⏱</span>
              {t?.timeline?.title}
            </h2>

            <IncidentReplayer
              timeline={safeTimeline}
              activeSeverity={activeSeverity}
              t={t}
              onStepChange={handleReplayerStepChange}
              onReset={handleReplayerReset}
            />
          </section>
        </div>

        {/* 6. MODUŁ 2: Drzewo Analizy Przyczyn Źródłowych 5-Whys */}
        <FiveWhysTree incident={activeIncident} t={t} />

        {/* 7. MODUŁ 3: Mapa Skażenia Architektury (Blast Radius Heatmap) */}
        <BlastRadiusMap
          incidentId={activeIncident?.id || selectedPreset}
          category={activeIncident?.badge}
          isResurrected={waveformState === 'resurrected'}
        />

        {/* 8. MODUŁ 4: Piaskownica Inżynierii Chaosu (Live Chaos Sandbox) */}
        <ChaosSandbox
          t={t}
          activeChaos={activeChaos}
          onTriggerChaos={handleTriggerChaos}
          onMitigate={handleMitigateChaos}
          isResurrected={waveformState === 'resurrected'}
        />

        {/* 9. Oficjalny Raport Sekcji Zwłok (Post-Mortem Section) */}
        <PostMortemSection
          incident={activeIncident}
          safeTimeline={safeTimeline}
          locale={locale}
          t={t}
          onOpenDispatcher={() => setIsDispatcherOpen(true)}
          onOpenPrescription={() => setIsPrescriptionOpen(true)}
        />

        {/* 10. Modale */}
        <IncidentDispatcherModal
          isOpen={isDispatcherOpen}
          onClose={() => setIsDispatcherOpen(false)}
          incident={activeIncident}
          postMortem={activeIncident?.postMortem || (activeIncident as any)?.postMortemReport || null}
          isResurrected={waveformState === 'resurrected'}
          t={t}
        />

        <SrePrescriptionModal
          isOpen={isPrescriptionOpen}
          onClose={() => setIsPrescriptionOpen(false)}
          incident={activeIncident}
          t={t}
        />

        <CustomAutopsyModal
          isOpen={isCustomModalOpen}
          onClose={() => setIsCustomModalOpen(false)}
          onSaveIncident={handleSaveCustomIncident}
          locale={locale}
        />
      </main>

      {/* Legal Modal */}
      {legalDoc && <LegalModal docType={legalDoc} onClose={() => setLegalDoc(null)} />}

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-white dark:border-stone-900 dark:bg-stone-950 py-8 text-xs text-stone-700 dark:text-stone-300">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            {fixOrphans(t?.footer?.disclaimer || `© ${copyrightYears} BugMortem. Wszelkie prawa zastrzeżone.`)}
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setLegalDoc('privacy')}
              className="text-stone-700 hover:text-stone-950 dark:text-stone-300 dark:hover:text-white underline cursor-pointer"
            >
              {t?.footer?.privacy}
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => setLegalDoc('terms')}
              className="text-stone-700 hover:text-stone-950 dark:text-stone-300 dark:hover:text-white underline cursor-pointer"
            >
              {t?.footer?.terms}
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event('open_cookie_banner'))}
              className="text-stone-700 hover:text-stone-950 dark:text-stone-300 dark:hover:text-white underline cursor-pointer"
            >
              {t?.footer?.cookieSettings}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}