import { Dictionary } from '../types';

export const pl: Dictionary = {
  badgeHackathon: 'KIROWEEN 2026 HACKATHON ENTRY',
  title: 'Cyfrowa Sekcja Zwłok Awarii Produkcyjnych',
  subtitle: 'Zautomatyzowana rekonstrukcja incydentów, analiza przyczyn zgonu (RCA) i wskrzeszanie kodu.',
  statusLabel: 'STAN SERWISU',
  statusValue: '0 BPM (ZGON / CRASH)',
  presetsSectionTitle: 'SŁYNNE KOSZMARY PRODUKCYJNE (WYBIERZ BŁĄD DO SEKCJI ZWŁOK):',
  crashedBadge: 'KATASTROFALNY / P0',
  resurrectedBadge: 'ZWERYFIKOWANY / SRE READY',
  autopsyTitle: 'SEKCJA ZWŁOK KODU (PRZEKLĘTY KOD VS WSKRZESZONY KOD)',
  crashedCodeTitle: 'KOD SKAZANY NA ŚMIERĆ (STAN PRZED AWARIĄ)',
  resurrectedCodeTitle: 'KOD WSKRZESZONY (EGZORCYZM & SRE FIX)',
  copyCodeBtn: 'Kopiuj kod',
  copiedCodeBtn: 'Skopiowano!',
  stackTraceTitle: 'ZRZUT AWARII / STACK TRACE',
  timelineTitle: 'OŚ CZASU ZGONU (REKONSTRUKCJA)',
  postMortemTitle: 'OFICJALNY PROTOKÓŁ SEKCJI ZWŁOK (SRE POST-MORTEM)',
  postMortemSummaryHeading: 'PODSUMOWANIE INCYDENTU',
  postMortemImpactHeading: 'WPŁYW NA BIZNES I UŻYTKOWNIKÓW',
  postMortemActionsHeading: 'ŚRODKI ZAPOBIEGAWCZE I REKOMENDACJE',
  exportReportBtn: 'Eksportuj protokół (.md)',
  downloadSuccess: 'Protokół pobrany pomyślnie!',

  // Custom Autopsy Form & Modal
  customAutopsyBtn: '+ Przeprowadź własną sekcję zwłok',
  customModalTitle: 'Własna Sekcja Zwłok Incydentu',
  customModalSubtitle: 'Wprowadź własną awarię produkcyjną, wklej stack trace i wygeneruj oficjalny protokół SRE.',
  fieldIncidentTitle: 'Tytuł incydentu',
  fieldIncidentTitlePlaceholder: 'np. Nieobsłużony wyjątek w bramce płatności',
  fieldCategory: 'Podsystem / Kategoria',
  fieldSeverity: 'Poziom krytyczności',
  fieldCrashedCode: 'Przeklęty kod (wadliwa implementacja)',
  fieldCrashedCodePlaceholder: '// Wklej fragment kodu, który doprowadził do katastrofy...',
  fieldStackTrace: 'Zrzut błędu / Stack Trace',
  fieldStackTracePlaceholder: 'Error: Cannot read properties of undefined (reading \'id\')\n    at ProcessPayment (checkout.ts:42)...',
  fieldResurrectedCode: 'Kod wskrzeszony (poprawka SRE)',
  fieldResurrectedCodePlaceholder: '// Wklej naprawiony kod lub pozostaw puste, aby wygenerować bezpieczny wzorzec SRE...',
  btnAnalyzeAndGenerate: 'Wykonaj sekcję zwłok i wygeneruj protokół',
  btnCancel: 'Anuluj',
  validationErrorRequired: 'Podaj co najmniej tytuł incydentu oraz zrzut błędu (Stack Trace).',

  // Categories & Severities
  categoryFrontend: 'Frontend / SSR',
  categoryBackend: 'Backend / Runtime',
  categoryDatabase: 'Baza danych / Storage',
  categoryInfra: 'Infrastruktura / Sieć',
  severityP0: 'Katastrofalny (P0)',
  severityP1: 'Krytyczny (P1)',
  severityP2: 'Poważny (P2)',

  presets: {
    'react-hydration': {
      id: 'react-hydration',
      badge: 'REACT SSR',
      severity: 'Katastrofalny (P0)',
      title: 'Koszmar hydratacji w Next.js',
      desc: 'Niezgodność drzewa DOM między serwerem a przeglądarką z powodu odczytu localStorage podczas renderowania.',
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
        { time: '14:23:01', desc: 'Serwer SSR wyrenderował HTML z domyślnym motywem' },
        { time: '14:23:02', desc: 'Przeglądarka odebrała HTML i uruchomiła hydratację DOM' },
        { time: '14:23:02.120', desc: 'Wykryto niezgodność drzewa DOM: localStorage różni się od serwera', isFatal: true },
        { time: '14:23:02.340', desc: 'React porzucił renderowanie i wyrzucił Hydration Error P0', isFatal: true }
      ],
      postMortemReport: {
        summary: 'Krytyczny błąd hydratacji Reacta z powodu odwołania do localStorage w SSR.',
        impact: '100% użytkowników z innym motywem napotkało biały ekran śmierci przy wejściu do koszyka.',
        actionItems: [
          'Wymuszenie reguły ESLint no-restricted-globals dla localStorage.',
          'Wprowadzenie szkieletu renderu przed nawodnieniem.'
        ]
      }
    },
    'node-heap-oom': {
      id: 'node-heap-oom',
      badge: 'NODE.JS HEAP',
      severity: 'Katastrofalny (P0)',
      title: 'Cichy wyciek pamięci (OOM)',
      desc: 'Brak cleanupu listenera EventEmitter skutkujący zestrzeleniem przez Linux OOM Killer.',
      crashedCode: `// ❌ KOD SKAZANY NA ŚMIERĆ (Niewyczyszczony listener)
import { EventEmitter } from 'events';
const eventHub = new EventEmitter();

export async function handleUserSession(req, res) {
  const sessionData = new Array(100_000).fill('leak_payload_data');
  eventHub.on('audit_event', () => {
    console.log('Sesja sprawdzona:', sessionData.length);
  });
  res.end('Sesja przetworzona');
}`,
      resurrectedCode: `// ✅ KOD WSKRZESZONY (Czyszczenie listenera i WeakRef)
import { EventEmitter } from 'events';
const eventHub = new EventEmitter();

export async function handleUserSession(req, res) {
  const sessionData = new Array(100_000).fill('leak_payload_data');
  const onAudit = () => {
    console.log('Sesja sprawdzona:', sessionData.length);
  };

  eventHub.once('audit_event', onAudit);
  res.on('finish', () => {
    eventHub.removeListener('audit_event', onAudit);
  });

  res.end('Sesja przetworzona');
}`,
      stackTrace: `<--- Last few GCs --->
[34:0x55bc148] 42100 ms: Mark-sweep (reduce) 4091.2 (4140.5) -> 4088.1 (4140.5) MB
<--- JS stacktrace --->
FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory
Killed (SIGKILL 137 by Linux OOM)`,
      timeline: [
        { time: '02:00:00', desc: 'Mikroserwis wystartował z nominalnym obciążeniem (Heap: 85MB)' },
        { time: '02:45:00', desc: 'Liczba listenerów przekroczyła limit ostrzegawczy (> 10 000)' },
        { time: '03:12:15', desc: 'Garbage collector wszedł w pętlę thrashingu (99% CPU na GC)', isFatal: true },
        { time: '03:12:44', desc: 'Kernel systemu Linux zabił proces sygnałem SIGKILL 137 z powodu OOM', isFatal: true }
      ],
      postMortemReport: {
        summary: 'Katastrofalny wyciek pamięci spowodowany wiszącymi domknięciami EventEmitter blokującymi 4GB pamięci heap.',
        impact: 'Kluczowy serwis uwierzytelniania przestał odpowiadać w szczycie ruchu, wymuszając restart kontenerów.',
        actionItems: [
          'Uruchomienie automatycznych testów canary wykrywających wycieki pamięci w CI przy użyciu heapdump.',
          'Ustawienie twardego limitu defaultMaxListeners na szynie zdarzeń z alertem P1.'
        ]
      }
    },
    'cors-auth-abyss': {
      id: 'cors-auth-abyss',
      badge: 'HANDSHAKE HTTP',
      severity: 'Krytyczny (P1)',
      title: 'Masakra nagłówków CORS & Auth',
      desc: 'Brak obsługi preflight OPTIONS i nagłówków Access-Control w zapytaniach cross-origin.',
      crashedCode: `// ❌ KOD SKAZANY NA ŚMIERĆ (Brak nagłówków CORS)
export default function handler(req, res) {
  if (req.method === 'POST') {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ error: 'Brak tokenu' });
    return res.status(200).json({ status: 'ok' });
  }
  return res.status(405).end();
}`,
      resurrectedCode: `// ✅ KOD WSKRZESZONY (Pełna obsługa Preflight i Auth)
export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://bugmortem.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method === 'POST') {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ error: 'Brak tokenu' });
    return res.status(200).json({ status: 'ok' });
  }
  return res.status(405).end();
}`,
      stackTrace: `Access to fetch at 'https://api.bugmortem.internal/v1/auth' from origin 'https://app.bugmortem.com'
has been blocked by CORS policy: Response to preflight request doesn't pass access control check:
No 'Access-Control-Allow-Origin' header is present on the requested resource.
Status: 405 Method Not Allowed`,
      timeline: [
        { time: '09:00:10', desc: 'Klient wysłał zapytanie cross-origin POST z nagłówkiem Authorization' },
        { time: '09:00:10.050', desc: 'Przeglądarka automatycznie wyemitowała zapytanie wstępne OPTIONS' },
        { time: '09:00:10.120', desc: 'Serwer odrzucił OPTIONS statusem 405 Method Not Allowed', isFatal: true },
        { time: '09:00:10.125', desc: 'Przeglądarka zablokowała żądanie główne i rzuciła cichy błąd sieci', isFatal: true }
      ],
      postMortemReport: {
        summary: 'Żądania wstępne CORS (preflight) odrzucane przez backend z powodu nieobsłużonej metody OPTIONS.',
        impact: 'Wszystkie panele webowe utraciły możliwość odświeżania tokenów, wylogowując masowo użytkowników.',
        actionItems: [
          'Wdrożenie globalnego middleware CORS obsługującego preflight na poziomie API Gateway.',
          'Dodanie testów integracyjnych badających nagłówki CORS dla chronionych endpointów.'
        ]
      }
    },
    'postgres-pool-exhaustion': {
      id: 'postgres-pool-exhaustion',
      badge: 'POSTGRESQL / PRISMA',
      severity: 'Poważny (P1)',
      title: 'Śmierć puli połączeń bazy danych',
      desc: 'Brak zwalniania połączeń w bloku finally przy wystąpieniu błędu w kwerendzie.',
      crashedCode: `// ❌ KOD SKAZANY NA ŚMIERĆ (Niezwrócone połączenie)
export async function transferFunds(req, res) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await client.query('UPDATE accounts SET bal = bal - 100');
    if (result.rowCount === 0) throw new Error('Brak konta');
    await client.query('COMMIT');
    client.release();
  } catch (err) {
    // BŁĄD: client.release() zostaje pominięte!
    res.status(500).json({ error: err.message });
  }
}`,
      resurrectedCode: `// ✅ KOD WSKRZESZONY (Gwarantowane zwolnienie w finally)
export async function transferFunds(req, res) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await client.query('UPDATE accounts SET bal = bal - 100');
    if (result.rowCount === 0) throw new Error('Brak konta');
    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    return res.status(500).json({ error: err.message });
  } finally {
    client.release(); // Zawsze zwalniane
  }
  return res.status(200).json({ status: 'transferred' });
}`,
      stackTrace: `error: timeout exceeded when trying to connect
    at Pool.connect (/node_modules/pg-pool/index.js:210:19)
    at transferFunds (src/services/billing.ts:3:28)
FATAL: remaining connection slots are reserved for non-replication superuser connections`,
      timeline: [
        { time: '11:15:00', desc: 'Chwilowa awaria zewnętrznej bramki wywołała serię 100 wyjątków' },
        { time: '11:16:30', desc: 'Pula połączeń osiągnęła limit (20/20 aktywnych połączeń wyciekło)' },
        { time: '11:17:00', desc: 'Kolejne zapytania zawisły w kolejce aż do timeoutu (30 000ms)', isFatal: true },
        { time: '11:18:00', desc: 'Baza PostgreSQL zaczęła odrzucać healthchecki z powodu braku slotów', isFatal: true }
      ],
      postMortemReport: {
        summary: 'Głodzenie puli połączeń bazy danych z powodu ścieżki wyjątku pomijającej zwalnianie uchwytu.',
        impact: 'Kolejka transakcyjna zablokowana na 14 minut, kaskadowe błędy 504 Gateway Timeout.',
        actionItems: [
          'Wymuszenie wzorca try/finally dla wszystkich bezpośrednich połączeń z pulą.',
          'Wdrożenie PgBouncera z agresywnym zabijaniem bezczynnych sesji.'
        ]
      }
    }
  },

  cookieTitle: 'Polityka prywatności i pliki cookies',
  cookieDesc: 'Używamy plików cookie i narzędzi analitycznych (GTM/GA4) w celu zapewnienia prawidłowego działania oraz anonimowej analizy ruchu.',
  cookieAcceptAll: 'Zaakceptuj wszystkie',
  cookieEssentialOnly: 'Tylko niezbędne',
  cookieCustomize: 'Dostosuj zgody',
  cookieDrawerTitle: 'Preferencje plików cookie',
  cookieAnalytics: 'Analityczne pliki cookie (GA4/GTM)',
  cookieAnalyticsDesc: 'Służą do anonimowego mierzenia liczby odwiedzin i źródeł ruchu.',
  cookieMarketing: 'Marketingowe pliki cookie',
  cookieMarketingDesc: 'Używane do mierzenia skuteczności kampanii reklamowych.',
  cookieSavePreferences: 'Zapisz preferencje',
  footerRights: 'Wszelkie prawa zastrzeżone.',
  footerPrivacy: 'Polityka prywatności',
  footerTerms: 'Regulamin serwisu',
  footerCookieSettings: 'Ustawienia cookies'
};

export default pl;