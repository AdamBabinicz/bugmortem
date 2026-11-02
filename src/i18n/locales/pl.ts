import { Dictionary } from '../types';

export const pl: Dictionary = {
  title: 'BugMortem – AI Studio Sekcji Zwłok Awarii i Post-Mortem',
  subtitle: 'Inżynieryjne śledztwo post-mortem i zautomatyzowane bezpieczne wzorce SRE dla awarii produkcyjnych.',
  badgeHackathon: 'Projekt na Hackathon Kiroween 2026',
  statusLabel: 'Status Kostnicy',
  statusValue: 'Aktywny Incydent (P0)',
  customAutopsyBtn: '+ Wprowadź Własną Awarię',
  presetsSectionTitle: 'Archiwum Sekcji Zwłok Awarii',
  autopsyTitle: 'Sekcja Kodu: Przeklęty vs Wskrzeszony Kod',
  copyCodeBtn: 'Kopiuj Wskrzeszony Kod',
  copiedCodeBtn: 'Skopiowano do Schowka!',
  crashedCodeTitle: 'Przeklęty Kod (Crash na Produkcji)',
  crashedBadge: 'Błąd Krytyczny',
  resurrectedCodeTitle: 'Wskrzeszony Kod SRE (Bezpieczny Wzorzec)',
  resurrectedBadge: 'Circuit Breaker',
  stackTraceTitle: 'Surowy Ślad Stosu (Stack Trace)',
  timelineTitle: 'Chronologiczna Oś Czasu Awarii',
  postMortemTitle: 'Oficjalny Raport Sekcji Zwłok Incydentu',
  exportReportBtn: 'Eksportuj Raport do Markdown',
  downloadSuccess: 'Raport Markdown został pomyślnie pobrany!',
  postMortemSummaryHeading: 'Podsumowanie Wykonawcze',
  postMortemImpactHeading: 'Promień Rażenia i Wpływ Biznesowy',
  postMortemActionsHeading: 'Działania Prewencyjne i Naprawcze',
  customModalTitle: 'Sekcja Zwłok Własnego Incydentu',
  customModalSubtitle: 'Wklej logi błędów i zrzut stosu z produkcji, aby wygenerować automatyczną analizę post-mortem.',
  fieldIncidentTitle: 'Tytuł Awarii',
  fieldIncidentTitlePlaceholder: 'np. Zagłodzenie blokad rozproszonych w bramce płatności',
  fieldCategory: 'Domena Architektoniczna',
  categoryFrontend: 'Frontend',
  categoryBackend: 'Backend',
  categoryDatabase: 'Baza Danych',
  categoryInfra: 'Infrastruktura',
  fieldSeverity: 'Krytyczność Awarii',
  severityP0: 'Awaria Całkowita (P0)',
  severityP1: 'Krytyczna Degradacja (P1)',
  severityP2: 'Poważna Usterka (P2)',
  fieldStackTrace: 'Ślad Stosu (Stack Trace) / Logi Błędu',
  fieldStackTracePlaceholder: 'Wklej tutaj zrzut stosu lub log z awarii...',
  fieldCrashedCode: 'Przeklęty Kod (Opcjonalnie)',
  fieldCrashedCodePlaceholder: 'Wklej fragment kodu, który wywołał awarię...',
  fieldResurrectedCode: 'Wskrzeszony Kod SRE (Opcjonalnie)',
  fieldResurrectedCodePlaceholder: 'Pozostaw puste, aby wygenerować automatyczny circuit breaker...',
  btnCancel: 'Anuluj',
  btnAnalyzeAndGenerate: 'Przeprowadź Sekcję Zwłok',
  validationErrorRequired: 'Proszę podać tytuł awarii oraz ślad stosu.',
  footerRights: 'Wszelkie prawa zastrzeżone. Stworzone na Kiroween 2026 przez AWS & Devpost.',
  footerPrivacy: 'Polityka Prywatności',
  footerTerms: 'Regulamin',
  footerCookieSettings: 'Ustawienia Cookies',
  cookieTitle: 'Przejrzystość Danych i Ciasteczek',
  cookieDesc: 'BugMortem wykorzystuje localStorage wyłącznie do zapamiętania Twoich raportów awarii i preferencji motywu. Nie śledzimy ani nie profilujemy Twoich działań.',
  cookieAcceptAll: 'Akceptuję wszystkie',
  cookieEssentialOnly: 'Tylko niezbędne',
  cookieCustomize: 'Dostosuj preferencje',
  cookieDrawerTitle: 'Preferencje Prywatności i Cookies',
  cookieAnalytics: 'Pamięć analityczna',
  cookieAnalyticsDesc: 'Umożliwia lokalne zapisywanie symulowanych metryk naprawczych.',
  cookieMarketing: 'Pamięć marketingowa',
  cookieMarketingDesc: 'BugMortem nie wyświetla reklam ani nie korzysta ze skryptów śledzących.',
  cookieSavePreferences: 'Zapisz preferencje',

  common: {
    close: 'Zamknij',
    cancel: 'Anuluj',
    save: 'Zapisz',
    back: 'Wstecz',
    loading: 'Ładowanie...',
  },

  legal: {
    modalTitle: 'Informacje Prawne i Zgodność',
    title: 'Informacje Prawne',
    terms: 'Regulamin Serwisu',
    termsTitle: 'Regulamin Użytkowania BugMortem',
    termsContent: 'BugMortem to otwartoźródłowy symulator sekcji zwłok awarii i generator raportów post-mortem stworzony na hackathon Kiroween 2026. Udostępniany w celach edukacyjnych i prewencji SRE.',
    privacy: 'Polityka Prywatności',
    privacyTitle: 'Polityka Prywatności i Suwerenność Danych',
    privacyContent: 'Wszelkie analizy awarii, logi i wygenerowane raporty są przetwarzane lokalnie w pamięci Twojej przeglądarki. Dane telemetryczne nie są przekazywane podmiotom trzecim.',
    cookies: 'Polityka Cookies',
    cookiesTitle: 'Polityka Cookies i Pamięci Podręcznej',
    cookiesContent: 'Aplikacja wykorzystuje wyłącznie pamięć podręczną localStorage do zachowania motywu, szkiców awarii oraz historii wygenerowanych raportów.',
    disclaimer: 'Zastrzeżenia Inżynieryjne',
    disclaimerTitle: 'Zastrzeżenia Inżynieryjne SRE',
    disclaimerContent: 'Automatycznie generowane bezpieczne wzorce i procedury naprawcze stanowią rekomendacje inżynieryjne. Przed wdrożeniem skryptów na produkcję należy przetestować je na środowisku stagingowym.',
    gdpr: 'RODO',
    gdprTitle: 'Ochrona Danych Osobowych (RODO)',
    gdprContent: 'BugMortem jest w pełni zgodny z zasadami RODO/GDPR. Użytkownik zachowuje pełną kontrolę nad generowanymi raportami markdown i lokalną historią.',
  },

  presets: {
    'react-hydration': {
      id: 'react-hydration',
      badge: 'Frontend / SSR',
      severity: 'P0',
      title: 'Niezgodność Hydratacji Reacta i Zapaść Drzewa DOM',
      desc: 'Niestabilne new Date() lub dostęp do obiektu window podczas SSR wywołuje błąd React Error #418, niszcząc interaktywny stan klienta.',
      crashedCode: `// ❌ PRZEKLĘTY KOD: Rozbieżność HTML między serwerem a klientem
export default function Header() {
  // Bezpośrednie renderowanie daty powoduje natychmiastowy crash hydratacji
  return (
    <div>Aktualny czas: {new Date().toLocaleTimeString()}</div>
  );
}`,
      resurrectedCode: `// ✅ WSKRZESZONY WZORZEC SRE: Bezpieczny Montaż Stanu w Hydratacji
import { useState, useEffect } from 'react';

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState('');

  useEffect(() => {
    setMounted(true);
    setTime(new Date().toLocaleTimeString());
  }, []);

  if (!mounted) return <div className="animate-pulse">Ładowanie zegara...</div>;
  return <div>Aktualny czas: {time}</div>;
}`,
      stackTrace: `Error: Hydration failed because the initial UI does not match what was rendered on the server.
    at throwOnHydrationMismatch (react-dom-client.development.js:12508)
    at tryToClaimNextHydratableInstance (react-dom-client.development.js:12534)
    at completeWork (react-dom-client.development.js:22170)`,
      timeline: [
        { time: '12:00:01 UTC', desc: 'Serwer brzegowy generuje wstępny kod HTML w trybie SSR', isFatal: false },
        { time: '12:00:02 UTC', desc: 'Przeglądarka uruchamia paczkę klienta z rozbieżnością milisekundową', isFatal: false },
        { time: '12:00:03 UTC', desc: 'React rzuca błąd #418; odmontowanie interaktywnego drzewa komponentów', isFatal: true }
      ],
      postMortemReport: {
        summary: 'Krytyczna niezgodność hydratacji Reacta wywołana niedeterministycznym wykonaniem po stronie serwera.',
        impact: 'Użytkownicy doświadczyli mignięcia niestylizowanej treści oraz zablokowania przycisków formularzy na stronach docelowych.',
        actionItems: [
          'Wymuszenie strażników useEffect dla wszystkich atrybutów specyficznych dla przeglądarki.',
          'Dodanie reguły ESLint blokującej new Date() wewnątrz JSX komponentów serwerowych.',
          'Wdrożenie testów regresji wizualnej dla 50 najważniejszych stron serwisu.'
        ]
      }
    },
    'connection-pool': {
      id: 'connection-pool',
      badge: 'Baza Danych / Aurora',
      severity: 'P0',
      title: 'Spirala Śmierci Puli Połączeń',
      desc: 'Nieindeksowane zapytania analityczne wyczerpały limit 200 połączeń bazy RDS Aurora, paraliżując wątki transakcyjne w koszyku zakupowym.',
      crashedCode: `// ❌ PRZEKLĘTY KOD: Wyciek połączeń z puli bazy danych
export async function getOrderReport() {
  const client = await pool.connect();
  // Brak bloku try/finally powoduje trwały wyciek slotu przy jakimkolwiek błędzie
  const res = await client.query('SELECT * FROM orders WHERE heavy_calc = true');
  return res.rows;
}`,
      resurrectedCode: `// ✅ WSKRZESZONY WZORZEC SRE: Odporne Pobieranie Połączenia ze Zwolnieniem
export async function getOrderReport() {
  const client = await pool.connect();
  try {
    const res = await client.query('SELECT * FROM orders WHERE heavy_calc = true');
    return res.rows;
  } finally {
    client.release(); // Połączenie ZAWSZE wraca do puli
  }
}`,
      stackTrace: `error: remaining connection slots are reserved for non-replication superuser connections
    at Parser.parseErrorMessage (pg-protocol/dist/parser.js:287:98)
    at Connection.handlePacket (pg/lib/connection.js:114:12)`,
      timeline: [
        { time: '14:02 UTC', desc: 'Ciężki cron analityczny rozpoczyna sekwencyjny skan tabeli zamówień', isFatal: false },
        { time: '14:05 UTC', desc: 'Aktywna pula połączeń osiąga maksymalny limit 200/200 slotów', isFatal: false },
        { time: '14:08 UTC', desc: 'Wątki serwisu zamówień blokują się; sondy health check zwracają 503', isFatal: true }
      ],
      postMortemReport: {
        summary: 'Zagłodzenie puli połączeń bazy danych zablokowało ruch transakcyjny w szczycie zakupowym.',
        impact: '14 200 przerwanych zamówień. Szacowane straty przychodowe na poziomie $320 000 w rejonach EU i US East.',
        actionItems: [
          'Przekierowanie wszystkich zapytań analitycznych do puli replik tylko do odczytu (read-replica).',
          'Ustawienie twardego limitu statement_timeout = 3000ms na poziomie roli aplikacji.',
          'Konfiguracja alertu przy nasyceniu puli połączeń powyżej 75% przez 60 sekund.'
        ]
      }
    },
    'oom-reaper': {
      id: 'oom-reaper',
      badge: 'Runtime / Pamięć',
      severity: 'P0',
      title: 'Przebudzenie Żniwiarza OOM',
      desc: 'Masowy eksport 2,5 mln zamówień do pliku CSV załadował cały zbiór do bufora RAM Node.js, aktywując mechanizm Linux OOM killer.',
      crashedCode: `// ❌ PRZEKLĘTY KOD: Ładowanie nieograniczonych zbiorów danych wprost do RAM
app.get('/export-orders', async (req, res) => {
  const allOrders = await db.query('SELECT * FROM orders');
  const csvBuffer = Buffer.from(generateCsv(allOrders));
  res.send(csvBuffer);
});`,
      resurrectedCode: `// ✅ WSKRZESZONY WZORZEC SRE: Potok Strumieniowania z Backpressure
import { pipeline } from 'stream/promises';
import QueryStream from 'pg-query-stream';

app.get('/export-orders', async (req, res) => {
  const stream = client.query(new QueryStream('SELECT * FROM orders'));
  res.setHeader('Content-Type', 'text/csv');
  await pipeline(stream, csvTransformStream(), res);
});`,
      stackTrace: `<--- Last few GCs --->
[1:0x55d28a0] 45120 ms: Mark-sweep (reduce) 2045.2 (2055.0) -> 2044.1 (2056.0) MB
FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory`,
      timeline: [
        { time: '09:15 UTC', desc: 'Klient korporacyjny zleca masowy eksport historii zamówień', isFatal: false },
        { time: '09:18 UTC', desc: 'Pamięć kontenera rośnie z 420 MB do 1,95 GB w 180 sekund', isFatal: false },
        { time: '09:20 UTC', desc: 'Kernel uruchamia oom-killer: "Killed process 1 (node)". Pod wpada w CrashLoop', isFatal: true }
      ],
      postMortemReport: {
        summary: 'Niekontrolowana alokacja pamięci wywołała kaskadowe eksmisje podów w klastrze Kubernetes.',
        impact: 'Kluczowe API rozliczeń restartowało się w pętli przez 65 minut na 8 węzłach klastra.',
        actionItems: [
          'Przepisanie wszystkich ścieżek eksportu na strumienie kursorowe z obsługą przeciwciśnienia.',
          'Ustawienie limitu pamięci równego żądaniu i wdrożenie metryk cgroup v2.',
          'Przeniesienie ciężkich zadań generowania raportów do asynchronicznych workerów AWS SQS.'
        ]
      }
    },
    'retry-storm': {
      id: 'retry-storm',
      badge: 'Współbieżność / Sieć',
      severity: 'P1',
      title: 'Kaskadowa Burza Ponowień',
      desc: 'Natychmiastowe ponowienia bez losowego rozproszenia (jitter) przy 500ms opóźnieniu spotęgowały ruch o 500%, obalając bazy danych.',
      crashedCode: `// ❌ PRZEKLĘTY KOD: Synchroniczna burza ponowień bez opóźnienia
async function fetchWithRetry(url, retries = 5) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fetch(url);
    } catch (e) {
      // Natychmiastowe ponowienie bez opóźnienia zwielokrotnia obciążenie
    }
  }
}`,
      resurrectedCode: `// ✅ WSKRZESZONY WZORZEC SRE: Wykładnicze Wycofywanie z Pełnym Jitterem
async function fetchWithRetry(url, retries = 3, baseDelay = 100) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fetch(url);
    } catch (e) {
      if (i === retries - 1) throw e;
      const maxDelay = baseDelay * Math.pow(2, i);
      const jitter = Math.floor(Math.random() * maxDelay);
      await new Promise(r => setTimeout(r, jitter));
    }
  }
}`,
      stackTrace: `FetchError: request to http://profile-service/user failed, reason: connect ECONNREFUSED 10.0.12.44:80
    at ClientRequest.<anonymous> (node_modules/node-fetch/lib/index.js:1491:11)`,
      timeline: [
        { time: '18:30 UTC', desc: 'Chwilowa pauza GC na bazie wywołuje 450 ms opóźnienia zapytań', isFatal: false },
        { time: '18:31 UTC', desc: 'Serwisy klienckie wysyłają 5 natychmiastowych ponowień w oknie 50 ms', isFatal: false },
        { time: '18:35 UTC', desc: 'Pamięć kolejki bramki wyczerpuje się; masowo zwracane błędy 504 Gateway Timeout', isFatal: true }
      ],
      postMortemReport: {
        summary: 'Liniowa amplifikacja ponowień wywołała samobójczy rozproszony atak odmowy usługi (DoS).',
        impact: 'Serwisy uwierzytelniania i profili odrzuciły 45 000 żądań w oknie 18 minut.',
        actionItems: [
          'Wymuszenie algorytmu Full Jitter z wykładniczym wycofywaniem we wszystkich klientach RPC.',
          'Wdrożenie circuit breakerów odcinających ruch przed nasyceniem bazy.',
          'Konfiguracja adaptacyjnego ograniczania przepustowości na bramce Envoy.'
        ]
      }
    }
  }
};

export default pl;