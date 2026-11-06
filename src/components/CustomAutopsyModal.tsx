'use client';

import React, { useState } from 'react';
import { X, Sparkles, AlertCircle, FileCode2 } from 'lucide-react';
import { IncidentPreset } from '@/i18n/types';

// Likwidacja wiszących spójników (sierotek typograficznych w języku polskim)
function fixOrphans(text?: string | null): string {
  if (!text || typeof text !== 'string') return text || '';
  return text.replace(/(^|\s)([aiouwz]|do|na|od|po|ze|we|za|co|że|to)(\s+)/gi, '$1$2\u00A0');
}

interface CustomAutopsyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveIncident: (incident: IncidentPreset) => void;
  locale: 'pl' | 'en';
}

export const CustomAutopsyModal: React.FC<CustomAutopsyModalProps> = ({
  isOpen,
  onClose,
  onSaveIncident,
  locale,
}) => {
  const [formTitle, setFormTitle] = useState<string>('');
  const [formCategory, setFormCategory] = useState<'frontend' | 'backend' | 'database' | 'infra'>('frontend');
  const [formSeverity, setFormSeverity] = useState<'P0' | 'P1' | 'P2'>('P0');
  const [formCrashedCode, setFormCrashedCode] = useState<string>('');
  const [formStackTrace, setFormStackTrace] = useState<string>('');
  const [formResurrectedCode, setFormResurrectedCode] = useState<string>('');
  const [formError, setFormError] = useState<string>('');

  if (!isOpen) return null;

  // Inteligentna walidacja danych wejściowych pod kątem realnego błędu SRE
  const validateInput = (): string | null => {
    const cleanTitle = formTitle.trim();
    const cleanStack = formStackTrace.trim();

    if (!cleanTitle || cleanTitle.length < 5) {
      return locale === 'pl'
        ? 'Tytuł incydentu musi mieć co najmniej 5 znaków (np. Wyciek pamięci w workerze).'
        : 'Incident title must be at least 5 characters long (e.g. Worker heap memory leak).';
    }

    if (!cleanStack || cleanStack.length < 20) {
      return locale === 'pl'
        ? 'Ślad stosu (Stack Trace) musi zawierać co najmniej 20 znaków rzeczywistego błędu lub logu awarii.'
        : 'Stack trace must contain at least 20 characters of actual crash logs or stack frames.';
    }

    // Heurystyka: sprawdzenie czy wejście przypomina realny log / wyjątek, a nie przypadkowy ciąg znaków
    const errorIndicators = [
      'error', 'exception', 'failed', 'failure', 'fatal', 'panic', 'crash',
      'timeout', 'rejected', 'rejection', 'cannot', 'undefined', 'null',
      'at ', 'node:', 'http', 'status', 'exit code', 'unhandled', '500', '502', '503', '504',
      '\n'
    ];
    const lowerStack = cleanStack.toLowerCase();
    const hasErrorPattern = errorIndicators.some((indicator) => lowerStack.includes(indicator));

    if (!hasErrorPattern) {
      return locale === 'pl'
        ? 'Wprowadzony tekst nie przypomina realnego błędu ani śladu stosu. Wymagane są rozpoznawalne słowa kluczowe (np. Error, Exception, at ..., timeout, kod błędu lub zrzut wieloliniowy).'
        : 'The provided input does not resemble a valid crash log. Recognizable error keywords or multiline stack frames are required.';
    }

    return null;
  };

  // Funkcja wklejająca przykładowy, wzorcowy błąd SRE jednym kliknięciem
  const handleLoadSample = () => {
    if (locale === 'pl') {
      setFormTitle('Kaskadowy Timeout Puli Połączeń PgBouncer');
      setFormCategory('database');
      setFormSeverity('P0');
      setFormStackTrace(`FATAL: remaining connection slots are reserved for non-replication superuser connections
at Connection.parseE (/node_modules/pg/lib/connection.js:614:13)
at Connection._read (/node_modules/pg/lib/connection.js:418:9)
at Socket.emit (node:events:517:28)
at addChunk (node:internal/streams/readable:368:12)
at TCP.onStreamRead (node:internal/stream_base_commons:190:23)`);
      setFormCrashedCode(`// ❌ Anti-pattern: Direct raw pool allocation without timeout guard
const client = await pgPool.connect();
const result = await client.query('SELECT * FROM large_transactions WHERE status = $1', ['PENDING']);
client.release();`);
      setFormResurrectedCode(`// ✅ SRE Resilience: Dedicated proxy pool with circuit breaker & lease timeouts
const result = await dbCircuitBreaker.execute(async () => {
  return await rdsProxyPool.queryWithTimeout(
    'SELECT * FROM large_transactions WHERE status = $1',
    ['PENDING'],
    { timeoutMs: 2500 }
  );
});`);
    } else {
      setFormTitle('PgBouncer Connection Pool Timeout Cascade');
      setFormCategory('database');
      setFormSeverity('P0');
      setFormStackTrace(`FATAL: remaining connection slots are reserved for non-replication superuser connections
at Connection.parseE (/node_modules/pg/lib/connection.js:614:13)
at Connection._read (/node_modules/pg/lib/connection.js:418:9)
at Socket.emit (node:events:517:28)
at addChunk (node:internal/streams/readable:368:12)
at TCP.onStreamRead (node:internal/stream_base_commons:190:23)`);
      setFormCrashedCode(`// ❌ Anti-pattern: Direct raw pool allocation without timeout guard
const client = await pgPool.connect();
const result = await client.query('SELECT * FROM large_transactions WHERE status = $1', ['PENDING']);
client.release();`);
      setFormResurrectedCode(`// ✅ SRE Resilience: Dedicated proxy pool with circuit breaker & lease timeouts
const result = await dbCircuitBreaker.execute(async () => {
  return await rdsProxyPool.queryWithTimeout(
    'SELECT * FROM large_transactions WHERE status = $1',
    ['PENDING'],
    { timeoutMs: 2500 }
  );
});`);
    }
    setFormError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateInput();
    if (validationError) {
      setFormError(validationError);
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

    const customTimeline = [
      {
        time: timeStr,
        label: locale === 'pl' ? 'Wykrycie Anomalii' : 'Anomaly Detected',
        description: `${formCategory.toUpperCase()} anomaly initiated under active workload`,
      },
      {
        time: `${timeStr}.250`,
        label: locale === 'pl' ? 'Granica Błędu' : 'Exception Boundary',
        description: 'Exception bubbled up to runtime boundary',
        isFatal: true,
      },
      {
        time: `${timeStr}.500`,
        label: locale === 'pl' ? 'Zgon Procesu' : 'Process Exit',
        description: 'Fatal crash handler terminated process execution',
        isFatal: true,
      },
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
          'Harden error boundaries and apply circuit breaker patterns.',
        ],
      },
      blastRadius: {
        nodes: [
          { id: 'n1', name: formTitle.trim(), role: 'Epicenter', status: 'epicenter', statusCode: 'FAIL' },
          { id: 'n2', name: 'API Gateway', role: 'Ingress', status: 'degraded', statusCode: '504' },
        ],
        summary: { epicenterCount: 1, degradedCount: 1, healthyCount: 0 },
      },
      chaosMetrics: [],
    };

    onSaveIncident(newIncident);
    onClose();

    // Reset formularza
    setFormTitle('');
    setFormCrashedCode('');
    setFormStackTrace('');
    setFormResurrectedCode('');
    setFormError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl max-w-2xl w-full p-5 sm:p-8 space-y-5 sm:space-y-6 shadow-2xl relative my-6 text-stone-900 dark:text-stone-100">
        {/* Modal Header */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2">
              <span className="text-rose-500">⚡</span>
              {locale === 'pl' ? 'Wprowadź Własną Awarię do Sekcji Zwłok' : 'Ingest Custom Outage for Autopsy'}
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-300 mt-1">
              {fixOrphans(
                locale === 'pl'
                  ? 'Wprowadź rzeczywisty ślad stosu (stack trace) lub uszkodzony kod, a silnik BugMortem wygeneruje wzorzec SRE.'
                  : 'Provide realistic stack trace or failing code for automated SRE analysis.'
              )}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white p-1 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pasek szybkiego wypełnienia przykładem */}
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-stone-100 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/60 text-xs">
          <span className="text-stone-600 dark:text-stone-300 font-mono text-[11px]">
            {locale === 'pl' ? 'Chcesz szybko przetestować formularz?' : 'Want to quickly test the engine?'}
          </span>
          <button
            type="button"
            onClick={handleLoadSample}
            className="px-2.5 py-1 rounded-lg bg-rose-600/10 hover:bg-rose-600/20 text-rose-600 dark:text-rose-400 border border-rose-500/30 font-semibold cursor-pointer flex items-center gap-1.5 transition-colors"
          >
            <FileCode2 className="w-3.5 h-3.5" />
            <span>{locale === 'pl' ? 'Wklej Przykładowy Log SRE' : 'Load Sample SRE Log'}</span>
          </button>
        </div>

        {formError && (
          <div className="p-3 rounded-lg bg-rose-100 border border-rose-300 text-rose-900 dark:bg-rose-950/70 dark:border-rose-800 dark:text-rose-200 text-xs font-mono flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{formError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="formTitle" className="block text-xs font-mono font-bold uppercase text-stone-800 dark:text-stone-200 mb-1">
              {locale === 'pl' ? 'Tytuł / Nazwa Incydentu *' : 'Incident Title *'}
            </label>
            <input
              id="formTitle"
              type="text"
              value={formTitle}
              onChange={(e) => {
                setFormTitle(e.target.value);
                if (formError) setFormError('');
              }}
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
              onChange={(e) => {
                setFormStackTrace(e.target.value);
                if (formError) setFormError('');
              }}
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
              className="w-full bg-stone-50 border border-stone-300 text-stone-900 dark:bg-stone-950 dark:border-stone-800 dark:text-emerald-500 dark:placeholder-stone-500 rounded-lg p-3 font-mono text-xs focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-stone-700 hover:text-stone-950 dark:text-stone-300 dark:hover:text-white cursor-pointer"
            >
              {locale === 'pl' ? 'Anuluj' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/30 dark:shadow-rose-900/40 border border-rose-400/30 cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{locale === 'pl' ? 'Przeprowadź Sekcję Zwłok' : 'Execute Forensic Autopsy'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};