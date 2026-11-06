'use client';

import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sun, Moon, Mic, Square, Radio } from 'lucide-react';
import { IncidentDispatcherModal } from '@/components/IncidentDispatcherModal';
import { IncidentReplayer } from '@/components/IncidentReplayer';
import { FiveWhysTree } from '@/components/FiveWhysTree';
import { BlastRadiusMap } from '@/components/BlastRadiusMap';
import { ChaosSandbox } from '@/components/ChaosSandbox';
import { EcgMonitor, WaveformState } from '@/components/EcgMonitor';
import { LegalModal, LegalDocType } from '@/components/legal/LegalModal';
import { useTheme } from '@/context/ThemeContext';
import { useI18n } from '@/i18n/context';
import { IncidentPreset, TimelineEvent } from '@/i18n/types';
import { useAudioEngine, SeverityMode } from '@/hooks/useAudioEngine';

// Bezpieczne rozszerzenie typu zdarzenia na osi czasu
export interface SafeTimelineEvent extends TimelineEvent {
  isFatal?: boolean;
}

// Likwidacja wiszących spójników (sierotek typograficznych w języku polskim)
export function fixOrphans(text?: string | null): string {
  if (!text || typeof text !== 'string') return text || '';
  return text.replace(/(^|\s)([aiouwz]|do|na|od|po|ze|we|za|co|że|to)(\s+)/gi, '$1$2\u00A0');
}

export default function Home() {
  const [isDispatcherOpen, setIsDispatcherOpen] = useState<boolean>(false);
  const [activeChaos, setActiveChaos] = useState<string | null>(null);

  // Global Theme Context
  const { theme, toggleTheme } = useTheme();

  // Locale via shared I18nProvider
  const { locale, setLocale, t } = useI18n();

  // Incident state
  const [selectedPreset, setSelectedPreset] = useState<string>('react-hydration');
  const [customIncidents, setCustomIncidents] = useState<Record<string, IncidentPreset>>({});
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [exportNotice, setExportNotice] = useState<boolean>(false);
  const [pdfNotice, setPdfNotice] = useState<boolean>(false);

  // Stan odtwarzania głosu koronera SRE
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Dynamiczny, automatyczny zakres praw autorskich
  const [copyrightYears, setCopyrightYears] = useState<string>('2026');

  // Legal Modal State
  const [legalDoc, setLegalDoc] = useState<LegalDocType>(null);

  // ECG waveform display state — driven by incident severity and resurrection event
  const [waveformState, setWaveformState] = useState<WaveformState>('flatline');

  // Custom Autopsy Modal & Form State
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [formTitle, setFormTitle] = useState<string>('');
  const [formCategory, setFormCategory] = useState<'frontend' | 'backend' | 'database' | 'infra'>('frontend');
  const [formSeverity, setFormSeverity] = useState<'P0' | 'P1' | 'P2'>('P0');
  const [formCrashedCode, setFormCrashedCode] = useState<string>('');
  const [formStackTrace, setFormStackTrace] = useState<string>('');
  const [formResurrectedCode, setFormResurrectedCode] = useState<string>('');
  const [formError, setFormError] = useState<string>('');

  // Inicjalizacja z localStorage oraz bezpieczna kalkulacja daty
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
      setIsSpeaking(false);
    }
    setLocale(newLocale);
  };

  const presetsMap = t?.presets?.items || (t as any)?.presets || {};
  const allIncidents: Record<string, IncidentPreset> = {
    ...presetsMap,
    ...customIncidents
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
      summary: { epicenterCount: 1, degradedCount: 1, healthyCount: 2 }
    },
    chaosMetrics: []
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

  // Reset mowy i synchronizacja fali EKG przy zmianie incydentu
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    const sev = activeIncident?.severity ?? '';
    if (sev === 'P0') {
      setWaveformState('flatline');
    } else {
      setWaveformState('p1-heartbeat');
    }
  }, [selectedPreset, activeIncident?.severity]);

  const safeTimeline: SafeTimelineEvent[] = Array.isArray(activeIncident?.timeline)
    ? (activeIncident.timeline as SafeTimelineEvent[])
    : [];

  const postMortemData = activeIncident?.postMortem || (activeIncident as any)?.postMortemReport || {
    summary: '',
    impact: '',
    actionItems: []
  };

  const safeActionItems: string[] = Array.isArray(postMortemData?.actionItems)
    ? postMortemData.actionItems
    : [];

  const activeCrashedCode = activeIncident?.codeSnippet || (activeIncident as any)?.crashedCode || '';
  const activeRevivedCode = activeIncident?.revivedCode || (activeIncident as any)?.resurrectedCode || '';

  // Obsługa zmiany kroków z poziomu Replayera
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

  // Chaos triggers
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
      // Ignore silently
    }
  };

  // Procedural Speech API - Werdykt Koronera SRE
  const handlePlayCoronerVerdict = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();

    const prefix = locale === 'pl' ? 'Oficjalny werdykt sekcji zwłok SRE:' : 'Official SRE autopsy verdict:';
    const incLabel = locale === 'pl' ? 'Incydent:' : 'Incident:';
    const sevLabel = locale === 'pl' ? 'Priorytet:' : 'Priority:';
    const timeLabel = locale === 'pl' ? 'Czas zgonu:' : 'Time of failure:';
    const causeLabel = locale === 'pl' ? 'Przyczyna zgonu:' : 'Cause of failure:';
    const mitLabel = locale === 'pl' ? 'Działanie naprawcze:' : 'Remediation:';

    const incidentTitle = activeIncident?.title || '';
    const severity = activeIncident?.severity || 'P0';
    const fatalEvent = safeTimeline.find((e) => e.isFatal) || safeTimeline[safeTimeline.length - 1];
    const fatalTime = fatalEvent?.time || '';
    const cause = postMortemData?.summary || '';
    const mitigation = safeActionItems[0] || '';

    const speechText = `${prefix} ${incLabel} ${incidentTitle}. ${sevLabel} ${severity}. ${timeLabel} ${fatalTime}. ${causeLabel} ${cause}. ${mitLabel} ${mitigation}`;

    const utterance = new SpeechSynthesisUtterance(speechText);
    utterance.lang = locale === 'pl' ? 'pl-PL' : 'en-US';
    utterance.rate = 0.9;
    utterance.pitch = 0.82;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleExportReport = () => {
    if (!activeIncident) return;

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const mdContent = `# 💀 BugMortem - ${t?.postMortem?.title || 'Incident Protocol'}
**${locale === 'pl' ? 'Incydent' : 'Incident'}:** ${activeIncident.title || ''}
**${locale === 'pl' ? 'Kategoria' : 'Category'}:** ${activeIncident.badge || 'N/A'} | **${locale === 'pl' ? 'Priorytet' : 'Severity'}:** ${activeIncident.severity || 'P0'}
**${locale === 'pl' ? 'Znacznik czasu' : 'Timestamp'}:** ${new Date().toUTCString()}

---

## 1. ${t?.postMortem?.executiveSummary || 'Executive Summary'}
${postMortemData?.summary || ''}

## 2. ${t?.postMortem?.blastRadiusImpact || 'Blast Radius Impact'}
${postMortemData?.impact || ''}

## 3. ${t?.postMortem?.actionItems || 'Action Items'}
${safeActionItems.map((item) => `- ${item}`).join('\n')}

---

## 4. ${t?.timeline?.title || 'Timeline'}
${safeTimeline.map((evt) => `- [${evt.time}] ${evt.description || (evt as any).desc} ${evt.isFatal ? '⚠️ (FATAL CRASH)' : ''}`).join('\n')}

---

## 5. ${t?.stackTrace?.title || 'Stack Trace'}
\`\`\`
${activeIncident.stackTrace || ''}
\`\`\`

---

## 6. ${t?.codeSection?.cursedTitle || 'Cursed Code'}
\`\`\`javascript
${activeCrashedCode}
\`\`\`

---

## 7. ${t?.codeSection?.resurrectedTitle || 'Resurrected Code'}
\`\`\`javascript
${activeRevivedCode}
\`\`\`

---
*© 2026 BugMortem. Created for Kiroween 2026 by AWS & Devpost.*
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

  const handleExportPdf = () => {
    if (!activeIncident) return;

    const printDate = new Date().toUTCString();
    const certNumber = `BM-${Date.now().toString(36).toUpperCase()}-${(activeIncident.id || 'INC').toUpperCase()}`;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const certTitle = locale === 'pl' ? 'URZĘDOWA KARTA ZGONU KODU ŹRÓDŁOWEGO' : 'OFFICIAL SOURCE CODE DEATH CERTIFICATE';
    const subTitle = locale === 'pl' ? 'PROTOKÓŁ SRE SEKCJI ZWŁOK INCYDENTU' : 'SRE INCIDENT AUTOPSY PROTOCOL';
    const labelService = locale === 'pl' ? 'Dotknięta Usługa' : 'Affected Service';
    const labelDomain = locale === 'pl' ? 'Domena Awarii' : 'Failure Domain';
    const labelSeverity = locale === 'pl' ? 'Priorytet Awarii' : 'Incident Severity';
    const labelStatus = locale === 'pl' ? 'Stan Końcowy' : 'Terminal Status';
    const statusResurrected = locale === 'pl' ? 'WSKRZESZONY (SRE RESILIENCE)' : 'RESURRECTED (SRE RESILIENCE)';

    const htmlContent = `<!DOCTYPE html>
<html lang="${locale}">
<head>
  <meta charset="UTF-8">
  <title>${certTitle} - ${activeIncident.title || ''}</title>
  <style>
    @page { size: A4 portrait; margin: 12mm 15mm; }
    * { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    body { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; background: #fff; color: #0c0a09; margin: 0; padding: 20px; font-size: 11px; line-height: 1.4; }
    .border-frame { border: 3px double #7f1d1d; padding: 18px; border-radius: 4px; }
    .header { text-align: center; border-bottom: 2px solid #991b1b; padding-bottom: 12px; margin-bottom: 16px; }
    .morgue-badge { display: inline-block; background: #450a0a; color: #fecdd3; padding: 3px 8px; font-size: 9px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase; border-radius: 2px; }
    h1 { margin: 8px 0 4px 0; font-size: 18px; letter-spacing: 1.5px; color: #991b1b; text-transform: uppercase; }
    .meta-sub { font-size: 9px; color: #78716c; letter-spacing: 1px; }
    .vitals-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; background: #fafaf9; border: 1px solid #e7e5e4; padding: 10px; margin-bottom: 14px; border-radius: 4px; }
    .vital-item label { display: block; font-size: 8px; text-transform: uppercase; color: #78716c; font-weight: bold; }
    .vital-item span { font-size: 11px; font-weight: bold; color: #0c0a09; }
    .vital-sev { color: #dc2626 !important; }
    .section-title { font-size: 10px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; color: #991b1b; border-bottom: 1px solid #fca5a5; padding-bottom: 3px; margin: 12px 0 6px 0; }
    .findings { background: #fff5f5; border-left: 3px solid #dc2626; padding: 8px 10px; margin-bottom: 10px; font-size: 10px; }
    pre { background: #1c1917; color: #fecdd3; padding: 8px; border-radius: 3px; font-size: 9px; overflow-x: auto; margin: 4px 0 10px 0; white-space: pre-wrap; word-break: break-all; }
    pre.resurrected { background: #064e3b; color: #a7f3d0; border-left: 3px solid #10b981; }
    .timeline-list { margin: 4px 0 10px 0; padding-left: 16px; font-size: 9px; }
    .timeline-list li { margin-bottom: 3px; }
    .footer-seal { margin-top: 18px; border-top: 2px dashed #d6d3d1; padding-top: 12px; display: flex; justify-content: space-between; align-items: flex-end; }
    .seal-box { border: 2px solid #059669; color: #059669; padding: 6px 12px; text-align: center; font-weight: bold; font-size: 9px; letter-spacing: 1px; transform: rotate(-3deg); border-radius: 4px; line-height: 1.3; }
    .signature-line { border-bottom: 1px solid #0c0a09; width: 220px; text-align: center; font-size: 8px; padding-bottom: 2px; }
  </style>
</head>
<body>
  <div class="border-frame">
    <div class="header">
      <div class="morgue-badge">${subTitle}</div>
      <h1>💀 ${certTitle}</h1>
      <div class="meta-sub">REF: ${certNumber} • TIME: ${printDate}</div>
    </div>

    <div class="vitals-grid">
      <div class="vital-item">
        <label>${labelService}</label>
        <span>${activeIncident?.title || ''}</span>
      </div>
      <div class="vital-item">
        <label>${labelDomain}</label>
        <span>${activeIncident?.badge || 'N/A'}</span>
      </div>
      <div class="vital-item">
        <label>${labelSeverity}</label>
        <span class="vital-sev">${activeIncident?.severity || 'P0'}</span>
      </div>
      <div class="vital-item">
        <label>${labelStatus}</label>
        <span style="color:#059669;">${statusResurrected}</span>
      </div>
    </div>

    <div class="section-title">${t?.postMortem?.executiveSummary || '1. EXECUTIVE SUMMARY'}</div>
    <div class="findings">
      <strong>${locale === 'pl' ? 'Podsumowanie' : 'Summary'}:</strong> ${postMortemData?.summary || ''}<br/>
      <strong>${locale === 'pl' ? 'Wpływ' : 'Impact'}:</strong> ${postMortemData?.impact || ''}
    </div>

    <div class="section-title">${t?.timeline?.title || '2. TIMELINE'}</div>
    <ul class="timeline-list">
      ${safeTimeline.map((e) => `<li><strong>[${e.time}]</strong> ${e.description || (e as any).desc} ${e.isFatal ? '⚠️ <em>(FATAL EVENT)</em>' : ''}</li>`).join('')}
    </ul>

    <div class="section-title">${t?.stackTrace?.title || '3. STACK TRACE'}</div>
    <pre>${activeIncident?.stackTrace || 'No stack trace available'}</pre>

    <div class="section-title">${t?.codeSection?.resurrectedTitle || '4. RESURRECTED SRE CODE'}</div>
    <pre class="resurrected">${activeRevivedCode || '// Safe fallback executed'}</pre>

    <div class="footer-seal">
      <div>
        <div class="signature-line">Adam Gierczak (@AdamBabinicz)</div>
        <div style="font-size:8px;color:#78716c;margin-top:2px;">Lead SRE Incident Commander</div>
      </div>
      <div class="seal-box">
        VERIFIED POST-MORTEM<br/>
        BUGMORTEM KIROWEEN 2026
      </div>
    </div>
  </div>
  <script>
    window.onload = function() {
      setTimeout(function() {
        window.print();
      }, 250);
    };
  </script>
</body>
</html>`;

    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();

    setPdfNotice(true);
    setTimeout(() => setPdfNotice(false), 3000);
  };

  const handleCreateCustomAutopsy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formStackTrace.trim()) {
      setFormError(locale === 'pl' ? 'Wypełnij wymagane pola formularza.' : 'Please fill in required fields.');
      return;
    }

    const customId = `custom-${Date.now()}`;
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];

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

    const customTimeline: SafeTimelineEvent[] = [
      { time: timeStr, label: 'Anomaly Detected', description: `${formCategory} anomaly initiated under active workload` },
      { time: `${timeStr}.250`, label: 'Exception Boundary', description: 'Exception bubbled up to runtime boundary', isFatal: true },
      { time: `${timeStr}.500`, label: 'Process Exit', description: 'Fatal crash handler terminated process execution', isFatal: true }
    ];

    const newIncident: IncidentPreset = {
      id: customId,
      badge: formCategory.toUpperCase(),
      severity: formSeverity === 'P0' ? 'P0' : 'P1',
      title: formTitle.trim(),
      description: formStackTrace.split('\n')[0].slice(0, 140) || formTitle.trim(),
      codeSnippet: formCrashedCode.trim() || `// ❌ CRASH STATE\n${formStackTrace.slice(0, 300)}`,
      revivedCode: fallbackResurrected,
      stackTrace: formStackTrace.trim(),
      timeline: customTimeline,
      postMortem: {
        summary: `Incident in ${formCategory}: ${formTitle.trim()}. Captured via live autopsy ingestion.`,
        impact: 'Service interruption detected. Immediate mitigation executed via SRE safety guardrails.',
        actionItems: [
          `Review stack trace root cause in ${formCategory} subsystem.`,
          'Implement automated canary regression testing in deployment pipeline.',
          'Harden error boundaries and apply circuit breaker patterns.'
        ]
      },
      blastRadius: {
        nodes: [
          { id: 'n1', name: formTitle.trim(), role: 'Epicenter', status: 'epicenter', statusCode: 'FAIL' },
          { id: 'n2', name: 'API Gateway', role: 'Ingress', status: 'degraded', statusCode: '504' }
        ],
        summary: { epicenterCount: 1, degradedCount: 1, healthyCount: 0 }
      },
      chaosMetrics: []
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
                {fixOrphans(t?.hero?.subtitle)}
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
                <span className="hidden sm:inline">{t?.navigation?.langPl || 'Polski (PL)'}</span>
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* Hero Section */}
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
                  {audioEnabled
                    ? <Volume2 className="w-3.5 h-3.5" />
                    : <VolumeX className="w-3.5 h-3.5" />
                  }
                </button>

                {/* ECG waveform */}
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
              onClick={() => setIsModalOpen(true)}
              className="w-full md:w-auto px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/30 dark:shadow-rose-900/40 border border-rose-400/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="text-sm">⚡</span>
              {t?.hero?.inputCta || '+ WPROWADŹ WŁASNĄ AWARIĘ'}
            </button>
          </div>
        </div>

        {/* Preset Cards & Case Selection */}
        <section className="space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-stone-700 dark:text-stone-300">
              {t?.presets?.sectionTitle || 'ARCHIWUM SEKCJI ZWŁOK AWARII'}
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

        {/* Side-by-Side Code Autopsy */}
        <section
          style={{ contentVisibility: 'auto', containIntrinsicSize: '450px' }}
          className="space-y-3 sm:space-y-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-stone-700 dark:text-stone-300 flex items-center gap-2">
              <span>&lt;/&gt;</span>
              {t?.codeSection?.cursedTitle || 'SEKCJA KODU: PRZEKLĘTY A WSKRZESZONY KOD'}
            </h2>
            <button
              type="button"
              onClick={handleCopyCode}
              className="text-xs font-mono px-3 py-1.5 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-800 border border-stone-300 dark:bg-stone-800 dark:hover:bg-stone-700 dark:text-stone-200 dark:border-stone-700 transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <span>📋</span>
              {isCopied ? (t?.codeSection?.copied || 'Skopiowano!') : (t?.codeSection?.copyCta || 'Kopiuj')}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Cursed Code */}
            <div className="rounded-xl border border-rose-300 bg-rose-50/40 dark:border-rose-900/40 dark:bg-stone-950/80 overflow-hidden shadow-lg">
              <div className="bg-rose-100/80 border-b border-rose-200 dark:bg-rose-950/30 dark:border-rose-900/40 px-3 sm:px-4 py-2.5 flex items-center justify-between gap-2">
                <span className="text-xs font-mono font-bold tracking-wider text-rose-700 dark:text-rose-400 flex items-center gap-1.5 truncate">
                  <span>💀</span>
                  {t?.codeSection?.cursedTitle || 'PRZEKLĘTY KOD'}
                </span>
                <span className="text-[10px] font-mono uppercase font-bold px-1.5 sm:px-2 py-0.5 rounded bg-rose-200 text-rose-800 border border-rose-300 dark:bg-rose-500/20 dark:text-rose-300 dark:border-rose-500/40 shrink-0">
                  {t?.codeSection?.cursedBadge || 'BŁĄD KRYTYCZNY'}
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
                  {t?.codeSection?.resurrectedTitle || 'WSKRZESZONY KOD SRE'}
                </span>
                <span className="text-[10px] font-mono uppercase font-bold px-1.5 sm:px-2 py-0.5 rounded bg-emerald-200 text-emerald-800 border border-emerald-300 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/40 shrink-0">
                  {t?.codeSection?.resurrectedBadge || 'WZORZEC: SRE RESILIENCE'}
                </span>
              </div>
              <pre className="p-3 sm:p-4 font-mono text-xs leading-relaxed text-emerald-950 dark:text-emerald-200 overflow-x-auto whitespace-pre selection:bg-emerald-200 dark:selection:bg-emerald-900/50">
                <code>{activeRevivedCode}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* Stack Trace & Timeline Replayer */}
        <div
          style={{ contentVisibility: 'auto', containIntrinsicSize: '350px' }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6"
        >
          {/* Surowy Ślad Stosu (Stack Trace) */}
          <section className="space-y-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-stone-700 dark:text-stone-300 flex items-center gap-2">
              <span>&gt;_</span>
              {t?.stackTrace?.title || '>_ SUROWY ŚLAD STOSU (STACK TRACE)'}
            </h2>
            <div className="rounded-xl border border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-950 p-3 sm:p-4 font-mono text-xs text-rose-700 dark:text-rose-400/90 leading-relaxed overflow-x-auto shadow-sm dark:shadow-inner h-[280px]">
              <pre className="whitespace-pre-wrap">{activeIncident?.stackTrace}</pre>
            </div>
          </section>

          {/* Odtwarzacz Zapaści w Czasie & Oś Czasu Awarii */}
          <section className="space-y-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-stone-700 dark:text-stone-300 flex items-center gap-2">
              <span>⏱</span>
              {t?.timeline?.title || '⏱ CHRONOLOGICZNA OŚ CZASU AWARII'}
            </h2>

            {/* Symulator Zapaści w Czasie (Incident Replayer) */}
            <IncidentReplayer
              timeline={safeTimeline}
              activeSeverity={activeSeverity}
              t={t}
              onStepChange={handleReplayerStepChange}
              onReset={handleReplayerReset}
            />
          </section>
        </div>

        {/* MODUŁ 2: Drzewo Analizy Przyczyn Źródłowych 5-Whys (Blameless 5-Whys Root-Cause Tree) */}
        <FiveWhysTree
          incident={activeIncident}
          t={t}
        />

        {/* MODUŁ 3: Mapa Skażenia Architektury (Blast Radius Heatmap) */}
        <BlastRadiusMap
          incidentId={activeIncident?.id || selectedPreset}
          category={activeIncident?.badge}
          isResurrected={waveformState === 'resurrected'}
        />

        {/* MODUŁ 4: Piaskownica Inżynierii Chaosu (Live Chaos Sandbox) */}
        <ChaosSandbox
          t={t}
          activeChaos={activeChaos}
          onTriggerChaos={handleTriggerChaos}
          onMitigate={handleMitigateChaos}
          isResurrected={waveformState === 'resurrected'}
        />

        {/* Official Post-Mortem Report Protocol & Exporters */}
        <section
          style={{ contentVisibility: 'auto', containIntrinsicSize: '300px' }}
          className="rounded-2xl border border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900/50 p-5 sm:p-8 space-y-5 sm:space-y-6 shadow-xl dark:shadow-2xl relative"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border-b border-stone-200 dark:border-stone-800 pb-4">
            <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200 flex items-center gap-2">
              <span>📄</span>
              {t?.postMortem?.title || 'OFICJALNY RAPORT SEKCJI ZWŁOK INCYDENTU'}
            </h2>

            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              {/* On-Call Dispatcher Button */}
              <button
                type="button"
                onClick={() => setIsDispatcherOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-amber-300 dark:border-amber-800/80 bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 dark:hover:bg-amber-900/50 text-amber-800 dark:text-amber-300 transition-colors shadow-sm cursor-pointer"
              >
                <Radio className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                {t?.postMortem?.escalateOnCall || 'Eskalacja On-Call'}
              </button>

              {/* SRE Coroner Voice Verdict Audio */}
              <button
                type="button"
                onClick={handlePlayCoronerVerdict}
                className={`inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer flex-1 sm:flex-initial shadow-sm ${
                  isSpeaking
                    ? 'bg-amber-500 hover:bg-amber-400 text-stone-950 border border-amber-400 shadow-amber-500/30 animate-pulse'
                    : 'bg-stone-200 hover:bg-stone-300 text-stone-800 border border-stone-300 dark:bg-stone-800 dark:hover:bg-stone-700 dark:text-stone-200 dark:border-stone-700'
                }`}
                title={t?.postMortem?.listenCoroner || 'Odsłuchaj Werdykt Koronera'}
              >
                {isSpeaking ? (
                  <Square className="w-3.5 h-3.5 fill-current" />
                ) : (
                  <Mic className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                )}
                <span>{isSpeaking ? 'Zatrzymaj Koronera' : (t?.postMortem?.listenCoroner || 'Werdykt Koronera')}</span>
              </button>

              {/* Markdown Export */}
              <button
                type="button"
                onClick={handleExportReport}
                className="inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-stone-200 hover:bg-stone-300 text-stone-800 border border-stone-300 dark:bg-stone-800 dark:hover:bg-stone-700 dark:text-stone-200 dark:border-stone-700 transition-colors cursor-pointer shadow-sm flex-1 sm:flex-initial"
              >
                <span>⬇️</span>
                {t?.postMortem?.exportMarkdown || 'Eksportuj do Markdown'}
              </button>

              {/* PDF Death Certificate Export */}
              <button
                type="button"
                onClick={handleExportPdf}
                className="inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-600/30 border border-rose-400/30 transition-all cursor-pointer flex-1 sm:flex-initial"
              >
                <span>📜</span>
                {t?.postMortem?.downloadCertificate || 'Pobierz Kartę Zgonu (PDF)'}
              </button>
            </div>
          </div>

          {exportNotice && (
            <div className="p-3 rounded-lg bg-emerald-100 border border-emerald-300 text-emerald-800 dark:bg-emerald-950/60 dark:border-emerald-800/50 dark:text-emerald-300 text-xs font-mono flex items-center gap-2">
              <span>✓</span>
              Raport Markdown wygenerowany pomyślnie.
            </div>
          )}

          {pdfNotice && (
            <div className="p-3 rounded-lg bg-emerald-100 border border-emerald-300 text-emerald-800 dark:bg-emerald-950/60 dark:border-emerald-800/50 dark:text-emerald-300 text-xs font-mono flex items-center gap-2">
              <span>✓</span>
              Karta Zgonu (PDF) przygotowana do druku.
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            <div className="space-y-2">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-stone-700 dark:text-stone-300">
                {t?.postMortem?.executiveSummary || 'PODSUMOWANIE WYKONAWCZE'}
              </h3>
              <p className="text-xs text-stone-800 dark:text-stone-200 leading-relaxed">
                {fixOrphans(postMortemData?.summary)}
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-stone-700 dark:text-stone-300">
                {t?.postMortem?.blastRadiusImpact || 'PROMIEŃ RAŻENIA I WPŁYW'}
              </h3>
              <p className="text-xs text-stone-800 dark:text-stone-200 leading-relaxed">
                {fixOrphans(postMortemData?.impact)}
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-stone-700 dark:text-stone-300">
                {t?.postMortem?.actionItems || 'DZIAŁANIA PREWENCYJNE I NAPRAWCZE'}
              </h3>
              <ul className="space-y-1.5 list-disc list-inside text-xs text-stone-800 dark:text-stone-200 leading-relaxed">
                {safeActionItems.map((item, idx) => (
                  <li key={`action-${idx}`}>{fixOrphans(item)}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* On-Call Incident Dispatcher Modal */}
        <IncidentDispatcherModal
          isOpen={isDispatcherOpen}
          onClose={() => setIsDispatcherOpen(false)}
          incident={activeIncident}
          postMortem={postMortemData}
          isResurrected={waveformState === 'resurrected'}
          t={t}
        />
      </main>

      {/* Legal Modal */}
      {legalDoc && (
        <LegalModal docType={legalDoc} onClose={() => setLegalDoc(null)} />
      )}

      {/* Custom Autopsy Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl max-w-2xl w-full p-5 sm:p-8 space-y-5 sm:space-y-6 shadow-2xl relative my-6 text-stone-900 dark:text-stone-100">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2">
                  <span>⚡</span>
                  {locale === 'pl' ? 'Wprowadź Własną Awarię do Sekcji Zwłok' : 'Ingest Custom Outage for Autopsy'}
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-300 mt-1">
                  {fixOrphans(locale === 'pl' ? 'Wprowadź ślad stosu (stack trace) lub uszkodzony kod, a silnik BugMortem wygeneruje wzorzec SRE.' : 'Provide stack trace or failing code for automated SRE analysis.')}
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
                <label htmlFor="formTitle" className="block text-xs font-mono font-bold uppercase text-stone-800 dark:text-stone-200 mb-1">
                  {locale === 'pl' ? 'Tytuł / Nazwa Incydentu *' : 'Incident Title *'}
                </label>
                <input
                  id="formTitle"
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder={locale === 'pl' ? 'np. Memory Leak w Workerze Kolejki' : 'e.g. Queue Worker Heap Memory Leak'}
                  className="w-full bg-stone-50 border border-stone-300 text-stone-900 placeholder-stone-500 dark:bg-stone-950 dark:border-stone-800 dark:text-stone-100 dark:placeholder-stone-500 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="formCategory" className="block text-xs font-mono font-bold uppercase text-stone-800 dark:text-stone-200 mb-1">
                    {locale === 'pl' ? 'Kategoria Systemowa' : 'System Category'}
                  </label>
                  <select
                    id="formCategory"
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as any)}
                    className="w-full bg-stone-50 border border-stone-300 text-stone-900 dark:bg-stone-950 dark:border-stone-800 dark:text-stone-100 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-rose-500"
                  >
                    <option value="frontend">Frontend / SSR</option>
                    <option value="backend">Backend / API</option>
                    <option value="database">Database / Storage</option>
                    <option value="infra">Cloud / Infrastructure</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="formSeverity" className="block text-xs font-mono font-bold uppercase text-stone-800 dark:text-stone-200 mb-1">
                    {locale === 'pl' ? 'Priorytet Awarii' : 'Severity Level'}
                  </label>
                  <select
                    id="formSeverity"
                    value={formSeverity}
                    onChange={(e) => setFormSeverity(e.target.value as any)}
                    className="w-full bg-stone-50 border border-stone-300 text-stone-900 dark:bg-stone-950 dark:border-stone-800 dark:text-stone-100 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-rose-500"
                  >
                    <option value="P0">P0 (Fatal Outage)</option>
                    <option value="P1">P1 (Critical Degradation)</option>
                    <option value="P2">P2 (Major Anomaly)</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="formStackTrace" className="block text-xs font-mono font-bold uppercase text-stone-800 dark:text-stone-200 mb-1">
                  {locale === 'pl' ? 'Ślad Stosu (Stack Trace) *' : 'Stack Trace *'}
                </label>
                <textarea
                  id="formStackTrace"
                  rows={4}
                  value={formStackTrace}
                  onChange={(e) => setFormStackTrace(e.target.value)}
                  placeholder="Error: Connection terminated unexpectedly at pg-pool..."
                  className="w-full bg-stone-50 border border-stone-300 text-stone-900 placeholder-stone-500 dark:bg-stone-950 dark:border-stone-800 dark:text-stone-100 dark:placeholder-stone-500 rounded-lg p-3 font-mono text-xs focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label htmlFor="formCrashedCode" className="block text-xs font-mono font-bold uppercase text-stone-800 dark:text-stone-200 mb-1">
                  {locale === 'pl' ? 'Przeklęty Kod (Opcjonalnie)' : 'Cursed Code (Optional)'}
                </label>
                <textarea
                  id="formCrashedCode"
                  rows={3}
                  value={formCrashedCode}
                  onChange={(e) => setFormCrashedCode(e.target.value)}
                  placeholder="// Paste cursed snippet causing the failure..."
                  className="w-full bg-stone-50 border border-stone-300 text-stone-900 dark:bg-stone-950 dark:border-stone-800 dark:text-stone-200 placeholder-stone-500 dark:placeholder-stone-500 rounded-lg p-3 font-mono text-xs focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label htmlFor="formResurrectedCode" className="block text-xs font-mono font-bold uppercase text-stone-800 dark:text-stone-200 mb-1">
                  {locale === 'pl' ? 'Wskrzeszony Kod SRE (Opcjonalnie)' : 'Resurrected Code SRE (Optional)'}
                </label>
                <textarea
                  id="formResurrectedCode"
                  rows={3}
                  value={formResurrectedCode}
                  onChange={(e) => setFormResurrectedCode(e.target.value)}
                  placeholder="// Paste recommended resilient SRE pattern..."
                  className="w-full bg-stone-50 border border-stone-300 text-stone-900 dark:bg-stone-950 dark:border-stone-800 dark:text-emerald-600 dark:placeholder-stone-500 rounded-lg p-3 font-mono text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-stone-700 hover:text-stone-950 dark:text-stone-300 dark:hover:text-white cursor-pointer"
                >
                  {locale === 'pl' ? 'Anuluj' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/30 dark:shadow-rose-900/40 border border-rose-400/30 cursor-pointer"
                >
                  {locale === 'pl' ? 'Przeprowadź Sekcję Zwłok' : 'Execute Forensic Autopsy'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
              {t?.footer?.privacy || 'Polityka Prywatności'}
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => setLegalDoc('terms')}
              className="text-stone-700 hover:text-stone-950 dark:text-stone-300 dark:hover:text-white underline cursor-pointer"
            >
              {t?.footer?.terms || 'Regulamin'}
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event('open_cookie_banner'))}
              className="text-stone-700 hover:text-stone-950 dark:text-stone-300 dark:hover:text-white underline cursor-pointer"
            >
              {t?.footer?.cookieSettings || 'Ustawienia Cookies'}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}