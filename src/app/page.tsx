'use client';

import React, { useState } from 'react';
import { useTranslation } from '@/i18n/context';
import { useTheme } from '@/context/ThemeContext';
import { SUPPORTED_LOCALES, Locale } from '@/i18n/config';
import { LegalModal } from '@/components/legal/LegalModal';
import {
  Skull,
  Flame,
  Activity,
  Terminal,
  Clock,
  Code2,
  FileText,
  Copy,
  Check,
  Moon,
  Sun,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';

type PresetKey = 'hydration' | 'oom' | 'cors' | 'dbpool';

interface PresetCode {
  crashedCode: string;
  resurrectedCode: string;
  stackTrace: string;
  timeline: { time: string; event: string; level: 'info' | 'warn' | 'error' | 'fatal' }[];
  postMortemReport: {
    summary: string;
    impact: string;
    preventativeMeasures: string[];
  };
}

const PRESET_DATA: Record<PresetKey, PresetCode> = {
  hydration: {
    crashedCode: `// ❌ KOD SKAZANY NA ŚMIERĆ (SSR mismatch)
export default function UserCart() {
  const theme = localStorage.getItem('theme') || 'light';
  const timestamp = new Date().toLocaleTimeString();

  return (
    <div className={theme}>
      <h1>Koszyk klienta</h1>
      <span>Wygenerowano: {timestamp}</span>
    </div>
  );
}`,
    resurrectedCode: `// ✅ KOD WSKRZESZONY (Identyczny render na serwerze i kliencie)
'use client';
import { useState, useEffect } from 'react';

export default function UserCart() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    setMounted(true);
    setTheme(localStorage.getItem('theme') || 'light');
  }, []);

  if (!mounted) {
    return <div className="skeleton-placeholder" aria-hidden="true" />;
  }

  return (
    <div className={theme}>
      <h1>Koszyk klienta</h1>
      <span>Bezpieczny stan po nawodnieniu</span>
    </div>
  );
}`,
    stackTrace: `Error: Hydration failed because the initial UI does not match what was rendered on the server.
Warning: Expected server HTML to contain a matching <div> in <body>.
    at UserCart (src/components/UserCart.tsx:4:17)
FATAL: React Client DOM Mutation Aborted [Status: RIP]`,
    timeline: [
      { time: '14:23:01', event: 'Serwer SSR wyrenderował HTML z domyślnym motywem', level: 'info' },
      { time: '14:23:02', event: 'Przeglądarka odebrała HTML i uruchomiła hydratację DOM', level: 'info' },
      { time: '14:23:02.120', event: 'Wykryto niezgodność drzewa DOM: localStorage różni się od serwera', level: 'warn' },
      { time: '14:23:02.340', event: 'React porzucił renderowanie i wyrzucił Hydration Error P0', level: 'fatal' },
    ],
    postMortemReport: {
      summary: 'Krytyczny błąd hydratacji Reacta z powodu odwołania do localStorage w SSR.',
      impact: '100% użytkowników z innym motywem napotkało biały ekran śmierci.',
      preventativeMeasures: [
        'Wymuszenie reguły ESLint no-restricted-globals dla localStorage.',
        'Wprowadzenie ThemeProvidera z blokadą renderu przed nawodnieniem.',
      ],
    },
  },
  oom: {
    crashedCode: `// ❌ KOD SKAZANY NA ŚMIERĆ (Wyciek w pętli zdarzeń)
import { EventEmitter } from 'events';
const globalBus = new EventEmitter();

export async function handleLogStream(req: Request) {
  const buffer: Buffer[] = [];
  globalBus.on('telemetry', (data) => {
    buffer.push(Buffer.from(data));
  });
  return new Response("Streaming...");
}`,
    resurrectedCode: `// ✅ KOD WSKRZESZONY (Cleanup przy przerwaniu połączenia)
export async function handleLogStream(req: Request) {
  const controller = new AbortController();
  const stream = new ReadableStream({
    start(controllerStream) {
      const onData = (data: string) => controllerStream.enqueue(new TextEncoder().encode(data));
      globalBus.on('telemetry', onData);
      controller.signal.addEventListener('abort', () => globalBus.off('telemetry', onData));
    }
  });
  return new Response(stream);
}`,
    stackTrace: `FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory
SIGABRT: Process killed by kernel OOM killer (exit code 137)`,
    timeline: [
      { time: '02:00:00', event: 'Wdrożenie v2.4.1 z nowym modułem telemetrii', level: 'info' },
      { time: '03:15:20', event: 'Zużycie pamięci sterty przekroczyło próg 80% (3.2 GB)', level: 'warn' },
      { time: '03:44:00', event: 'Jądro Linux wysłało sygnał SIGKILL (Out of Memory - exit 137)', level: 'fatal' },
    ],
    postMortemReport: {
      summary: 'Proces Node.js ubity przez OOM z powodu braku cleanupu EventEmittera.',
      impact: 'Awaria instancji produkcyjnej; 18 minut niedostępności.',
      preventativeMeasures: [
        'Dodanie limitu MaxListeners i automatycznych testów obciążeniowych k6.',
      ],
    },
  },
  cors: {
    crashedCode: `// ❌ KOD SKAZANY NA ŚMIERĆ (Brak OPTIONS i nagłówków CORS)
export async function POST(req: Request) {
  const body = await req.json();
  return Response.json({ status: "success", data: body });
}`,
    resurrectedCode: `// ✅ KOD WSKRZESZONY (Pełna obsługa Preflight)
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGIN || '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
export async function POST(req: Request) {
  const body = await req.json();
  return Response.json({ status: "success", data: body }, {
    headers: { 'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGIN || '*' },
  });
}`,
    stackTrace: `Access to fetch at 'https://api.twojadomena.pl/v1/checkout' has been blocked by CORS policy:
Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header.`,
    timeline: [
      { time: '11:00:00', event: 'Zapytanie preflight OPTIONS do api', level: 'info' },
      { time: '11:00:00.120', event: 'API zwróciło błąd 405 Method Not Allowed', level: 'error' },
      { time: '11:00:00.125', event: 'Przeglądarka zablokowała koszyk klienta', level: 'fatal' },
    ],
    postMortemReport: {
      summary: 'Brak nagłówków CORS zablokował procedurę checkout.',
      impact: 'Zerowa konwersja koszyka przez 45 minut.',
      preventativeMeasures: [
        'Konfiguracja globalnego middleware w Next.js z nagłówkami CORS.',
      ],
    },
  },
  dbpool: {
    crashedCode: `// ❌ KOD SKAZANY NA ŚMIERĆ (Wiszące połączenie po wyjątku)
const client = await pool.connect();
const res = await client.query('SELECT * FROM audit_logs WHERE fatal = true');
client.release();
return res.rows;`,
    resurrectedCode: `// ✅ KOD WSKRZESZONY (Gwarantowane zwolnienie w finally)
const client = await pool.connect();
try {
  const res = await client.query('SELECT * FROM audit_logs WHERE fatal = true');
  return res.rows;
} finally {
  client.release();
}`,
    stackTrace: `error: remaining connection slots are reserved for non-replication superuser connections
FATAL: 53300: too many connections for role "app_prod" (Max pool size exhausted: 100/100)`,
    timeline: [
      { time: '09:12:00', event: 'Nagły skok ruchu', level: 'info' },
      { time: '09:14:15', event: 'PostgreSQL odrzucił połączenia (kod 53300)', level: 'error' },
      { time: '09:14:30', event: 'Crash kaskadowy mikrousług', level: 'fatal' },
    ],
    postMortemReport: {
      summary: 'Wyczerpanie puli połączeń PostgreSQL przez brak bloku finally.',
      impact: 'Całkowity paraliż bazy danych.',
      preventativeMeasures: [
        'Wdrożenie bloku try/finally lub dedykowanego poolera PgBouncer.',
      ],
    },
  },
};

export default function BugMortemDashboard() {
  const { t, locale, setLocale } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  const [activePreset, setActivePreset] = useState<PresetKey>('hydration');
  const [copied, setCopied] = useState(false);
  const [legalType, setLegalType] = useState<'privacy' | 'terms' | null>(null);

  const currentData = PRESET_DATA[activePreset];

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenCookieBanner = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('open_cookie_banner'));
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full max-w-full overflow-x-hidden bg-neutral-50 text-neutral-900 transition-colors duration-200 dark:bg-neutral-950 dark:text-neutral-100">
      {/* RESPONSYWNY HEADER */}
      <header className="sticky top-0 z-40 w-full border-b border-neutral-200/80 bg-white/90 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/80 shadow-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-3 sm:px-6 py-2.5 sm:py-3">
          {/* LOGO & TYTUŁ */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-rose-600 text-white shadow-md shadow-rose-600/20">
              <Skull className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-black text-base sm:text-lg tracking-wider text-rose-600 dark:text-rose-500 truncate">
                  {t.brand.name}
                </span>
                <span className="hidden md:inline-flex rounded-full bg-rose-500/10 px-2 py-0.5 font-bold text-[10px] sm:text-xs text-rose-600 dark:text-rose-400 border border-rose-500/20 shrink-0">
                  {t.brand.badge}
                </span>
              </div>
              <p className="hidden sm:block text-xs text-neutral-500 dark:text-neutral-400 truncate">
                {t.brand.tagline}
              </p>
            </div>
          </div>

          {/* KONTROLKI: JĘZYK & MOTYW */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* PRZEŁĄCZNIK JĘZYKÓW (ZWIĘZŁY NA MOBILE: PL / EN) */}
            <div className="flex items-center rounded-lg border border-neutral-200 p-0.5 sm:p-1 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900">
              {SUPPORTED_LOCALES.map((loc) => (
                <button
                  key={loc}
                  onClick={() => setLocale(loc)}
                  className={`rounded-md px-2 py-1 text-xs font-bold transition-all ${
                    locale === loc
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-neutral-100'
                  }`}
                >
                  <span className="sm:hidden">{loc.toUpperCase()}</span>
                  <span className="hidden sm:inline">
                    {loc === 'pl' ? 'Polski (PL)' : 'English (EN)'}
                  </span>
                </button>
              ))}
            </div>

            {/* PRZEŁĄCZNIK MOTYWU */}
            <button
              onClick={toggleTheme}
              className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-600 shadow-xs transition-colors hover:bg-neutral-100 hover:text-neutral-950 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* GŁÓWNA TREŚĆ */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-3 sm:px-6 py-5 sm:py-8 space-y-6 sm:space-y-8">
        {/* BANNER GŁÓWNY */}
        <section className="relative overflow-hidden rounded-2xl border border-rose-200/80 bg-gradient-to-r from-rose-50/70 via-neutral-50 to-amber-50/50 p-5 sm:p-8 dark:border-rose-500/20 dark:bg-gradient-to-br dark:from-rose-950/20 dark:via-neutral-900/20 dark:to-neutral-950 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-rose-300/80 bg-rose-100/60 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[11px] sm:text-xs font-bold text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-400">
                <Flame className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                <span>KIROWEEN {2026} HACKATHON ENTRY</span>
              </div>
              <h1 className="text-xl sm:text-3xl font-black tracking-tight text-neutral-950 dark:text-neutral-100">
                {t.dashboard.title}
              </h1>
              <p className="max-w-2xl text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {t.dashboard.subtitle}
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2 md:pt-0 border-t border-rose-200/50 md:border-0">
              <div className="flex flex-col md:items-end">
                <span className="text-[10px] sm:text-xs uppercase font-mono tracking-wider text-neutral-500 dark:text-neutral-400">
                  {t.dashboard.ecgStatus}
                </span>
                <span className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400">
                  <Activity className="h-4 w-4 animate-pulse" />
                  {t.dashboard.heartbeat}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* PRESETY KOSZMARÓW PRODUKCYJNYCH */}
        <section className="space-y-2.5">
          <h2 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            {t.dashboard.selectPreset}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
            {(['hydration', 'oom', 'cors', 'dbpool'] as PresetKey[]).map((key) => {
              const presetInfo = t.presets[key];
              const isSelected = activePreset === key;
              return (
                <button
                  key={key}
                  onClick={() => setActivePreset(key)}
                  className={`flex flex-col text-left p-3.5 sm:p-4 rounded-xl border transition-all ${
                    isSelected
                      ? 'border-rose-500 bg-rose-50/80 dark:bg-rose-950/20 shadow-sm ring-2 ring-rose-500/20'
                      : 'border-neutral-200 bg-white hover:border-neutral-300 dark:border-neutral-800 dark:bg-neutral-900/60 dark:hover:border-neutral-700 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="text-[11px] sm:text-xs font-mono font-bold uppercase text-rose-600 dark:text-rose-400">
                      {presetInfo.category}
                    </span>
                    <span className="rounded bg-neutral-100 px-1.5 py-0.5 text-[9px] sm:text-[10px] font-bold text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700">
                      {presetInfo.severity}
                    </span>
                  </div>
                  <h3 className="font-bold text-xs sm:text-sm text-neutral-950 dark:text-neutral-100 mb-1">
                    {presetInfo.name}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 mt-auto leading-relaxed">
                    {presetInfo.rootCause}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        {/* SEKCJA ZWŁOK KODU */}
        <section className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h2 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5">
              <Code2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-rose-500" />
              <span className="truncate">{t.dashboard.autopsyDiff}</span>
            </h2>
            <button
              onClick={() => handleCopy(currentData.resurrectedCode)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-2.5 py-1 sm:px-3 sm:py-1.5 text-xs font-semibold text-neutral-700 shadow-xs hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 transition-colors shrink-0"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? t.dashboard.copied : t.dashboard.copyCode}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
            {/* PRZEKLĘTY KOD */}
            <div className="rounded-xl border border-rose-300/80 bg-rose-50/50 p-3.5 sm:p-4 font-mono text-[11px] sm:text-xs dark:border-red-500/30 dark:bg-neutral-900 shadow-xs overflow-hidden">
              <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-rose-200 dark:border-neutral-800 text-rose-700 dark:text-red-400">
                <span className="flex items-center gap-1.5 font-bold">
                  <ShieldAlert className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span className="truncate">{t.dashboard.crashedCodeTitle}</span>
                </span>
                <span className="text-[9px] sm:text-[10px] bg-rose-100 text-rose-800 px-1.5 py-0.5 rounded font-bold border border-rose-300 dark:bg-red-950 dark:text-red-300 dark:border-red-800 shrink-0">
                  FATAL / P0
                </span>
              </div>
              <pre className="whitespace-pre-wrap break-words leading-relaxed text-rose-950 dark:text-red-200/90 font-medium">
                {currentData.crashedCode}
              </pre>
            </div>

            {/* WSKRZESZONY KOD */}
            <div className="rounded-xl border border-emerald-300/80 bg-emerald-50/50 p-3.5 sm:p-4 font-mono text-[11px] sm:text-xs dark:border-emerald-500/30 dark:bg-neutral-900 shadow-xs overflow-hidden">
              <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-emerald-200 dark:border-neutral-800 text-emerald-700 dark:text-emerald-400">
                <span className="flex items-center gap-1.5 font-bold">
                  <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span className="truncate">{t.dashboard.resurrectedCodeTitle}</span>
                </span>
                <span className="text-[9px] sm:text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold border border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800 shrink-0">
                  VERIFIED / SRE READY
                </span>
              </div>
              <pre className="whitespace-pre-wrap break-words leading-relaxed text-emerald-950 dark:text-emerald-200/90 font-medium">
                {currentData.resurrectedCode}
              </pre>
            </div>
          </div>
        </section>

        {/* ZRZUT AWARII & OŚ CZASU */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <section className="space-y-2.5">
            <h2 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5">
              <Terminal className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-neutral-500" />
              <span>{t.dashboard.stackTraceTitle}</span>
            </h2>
            <div className="rounded-xl border border-neutral-200 bg-white p-3.5 sm:p-4 font-mono text-[11px] sm:text-xs shadow-xs h-56 sm:h-64 overflow-y-auto dark:border-neutral-800 dark:bg-neutral-950">
              <pre className="whitespace-pre-wrap break-words leading-relaxed text-rose-700 dark:text-rose-400 font-medium">
                {currentData.stackTrace}
              </pre>
            </div>
          </section>

          <section className="space-y-2.5">
            <h2 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-neutral-500" />
              <span>{t.dashboard.timelineTitle}</span>
            </h2>
            <div className="rounded-xl border border-neutral-200 bg-white p-3.5 sm:p-4 shadow-xs h-56 sm:h-64 overflow-y-auto space-y-2.5 sm:space-y-3 dark:border-neutral-800 dark:bg-neutral-900/60">
              {currentData.timeline.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-[11px] sm:text-xs">
                  <span className="font-mono text-neutral-500 dark:text-neutral-400 font-semibold shrink-0">
                    {item.time}
                  </span>
                  <div className="flex-1">
                    <span
                      className={`font-semibold ${
                        item.level === 'fatal'
                          ? 'text-rose-600 dark:text-red-400 font-bold'
                          : item.level === 'error'
                          ? 'text-rose-500'
                          : item.level === 'warn'
                          ? 'text-amber-600 dark:text-amber-500'
                          : 'text-neutral-700 dark:text-neutral-300'
                      }`}
                    >
                      {item.event}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* OFICJALNY PROTOKÓŁ SEKCJI ZWŁOK */}
        <section className="space-y-2.5">
          <h2 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5">
            <FileText className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-neutral-500" />
            <span>{t.dashboard.postMortemTitle}</span>
          </h2>
          <div className="rounded-xl border border-neutral-200 bg-white p-4 sm:p-6 space-y-3 sm:space-y-4 shadow-xs dark:border-neutral-800 dark:bg-neutral-900/60">
            <div>
              <h3 className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1">
                {t.dashboard.summaryLabel}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed">
                {currentData.postMortemReport.summary}
              </p>
            </div>
            <div>
              <h3 className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1">
                {t.dashboard.impactLabel}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed">
                {currentData.postMortemReport.impact}
              </p>
            </div>
            <div>
              <h3 className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1">
                {t.dashboard.preventativeLabel}
              </h3>
              <ul className="list-disc pl-4 sm:pl-5 text-xs sm:text-sm space-y-1 text-neutral-700 dark:text-neutral-300 leading-relaxed">
                {currentData.postMortemReport.preventativeMeasures.map((measure, idx) => (
                  <li key={idx}>{measure}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>

      {/* RESPONSYWNY FOOTER Z BEZPIECZNYM MARGINESEM PRZYCISKU SCROLL-TO-TOP */}
      <footer className="mt-8 sm:mt-12 border-t border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950 py-6 sm:py-8">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500 dark:text-neutral-400 text-center md:text-left pr-16 md:pr-0">
          <div>
            <p>{t.footer.copyright}</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
            <button
              onClick={() => setLegalType('privacy')}
              className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
            >
              {t.footer.privacyPolicy}
            </button>
            <button
              onClick={() => setLegalType('terms')}
              className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
            >
              {t.footer.termsOfService}
            </button>
            <button
              type="button"
              onClick={handleOpenCookieBanner}
              className="font-medium text-rose-600 hover:text-rose-500 dark:text-rose-400 transition-colors"
            >
              {t.footer.cookieSettings}
            </button>
          </div>
        </div>
      </footer>

      {/* MODAL PRAWNY */}
      <LegalModal
        isOpen={legalType !== null}
        onClose={() => setLegalType(null)}
        type={legalType || 'privacy'}
      />
    </div>
  );
}
