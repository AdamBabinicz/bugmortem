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

  cookies: {
    title: 'Przejrzystość Danych i Plików Cookies',
    description: 'BugMortem wykorzystuje pamięć lokalną przeglądarki wyłącznie do zapisu raportów z awarii oraz preferencji interfejsu. Żadne dane telemetryczne nie są sprzedawane.',
    essential: 'Niezbędne pliki cookies',
    essentialDesc: 'Konieczne do prawidłowego działania aplikacji, zapamiętania motywu ciemnego/jasnego i zapisu sekcji zwłok.',
    alwaysActive: 'Zawsze aktywne',
    analytics: 'Pomiary analityczne',
    analyticsDesc: 'Pomagają nam anonimowo badać wydajność symulatora procedur naprawczych SRE.',
    marketing: 'Pliki marketingowe',
    marketingDesc: 'Zero reklam, skryptów śledzących i profilowania przez podmioty trzecie.',
    savePreferences: 'Zapisz preferencje',
    acceptAll: 'Zaakceptuj wszystkie',
    rejectAll: 'Odrzuć opcjonalne',
    hideDetails: 'Ukryj szczegóły',
    customize: 'Dostosuj',
  },

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
    lastUpdated: 'Ostatnia aktualizacja: 4 listopada 2026',

    // ── Regulamin ────────────────────────────────────────────────────────────
    terms: 'Regulamin Serwisu',
    termsTitle: 'Regulamin Użytkowania BugMortem',

    termsScopeHeader: 'Zakres i Cel Narzędzia',
    termsScopeText:
      'BugMortem to forensyczne studio edukacyjne i diagnostyczne SRE zgłoszone na Hackathon Kiroween 2026, organizowany przez AWS & Devpost. Narzędzie umożliwia porównawczą sekcję zwłok incydentów, automatyczne generowanie raportów post-mortem oraz przeglądanie wyselekcjonowanych „Wzorców Wskrzeszenia Kodu" — algorytmicznych wzorców odtwarzania systemów zaczerpniętych z rzeczywistych podręczników SRE.',

    termsGeneralHeader: 'Warunki Ogólne',
    termsGeneralText:
      'BugMortem jest udostępniany w stanie „takim, jaki jest" i „w miarę dostępności", wyłącznie do celów edukacyjnych i prewencji SRE. Nie udziela się żadnych wyraźnych ani dorozumianych gwarancji — w tym gwarancji przydatności handlowej, przydatności do określonego celu ani nienaruszania praw. Korzystanie z narzędzia w jakimkolwiek kontekście podejmowania decyzji produkcyjnych odbywa się wyłącznie na ryzyko użytkownika.',

    termsDisclaimerHeader: '⚠ Zastrzeżenie Inżynieryjne — Wzorce Wskrzeszenia Kodu',
    termsDisclaimerIntro:
      'Wszystkie „Wzorce Wskrzeszenia Kodu" generowane przez BugMortem są algorytmicznymi rekomendacjami naprawczymi produkowanymi przez silnik wspomagany modelem językowym. NIE są to certyfikowane poprawki produkcyjne. Przed wdrożeniem jakiegokolwiek sugerowanego wzorca na środowisko produkcyjne należy:',
    termsDisclaimerPoints: [
      'Zwalidować wszystkie wygenerowane łatki w izolowanym środowisku stagingowym lub canary.',
      'Uzyskać recenzję łatki od kwalifikowanego starszego inżyniera lub SRE przed scaleniem.',
      'Uruchomić pełny zestaw testów integracyjnych i regresyjnych na usłudze z zastosowaną łatką.',
      'Traktować kod wygenerowany przez AI tak samo jak niezaufany kod zewnętrzny — przeprowadzić audyt przed uruchomieniem.',
      'Nigdy nie pomijać bramek CI/CD, bramek wdrożeniowych ani przepływów zatwierdzania wyłącznie na podstawie rekomendacji BugMortem.',
    ],

    termsLiabilityHeader: 'Ograniczenie Odpowiedzialności',
    termsLiabilityText:
      'W maksymalnym zakresie dozwolonym przez obowiązujące prawo autorzy, współtwórcy i sponsorzy BugMortem nie ponoszą odpowiedzialności za jakiekolwiek bezpośrednie, pośrednie, przypadkowe, następcze ani karne szkody wynikające z polegania na wygenerowanych raportach post-mortem, analizach śladów stosu lub bezpiecznych wzorcach SRE — w tym szkody wynikające z utraty danych, zakłócenia przychodów lub incydentów produkcyjnych.',

    termsLicenseHeader: 'Licencja Open Source i Własność Intelektualna',
    termsLicenseText:
      'BugMortem jest wydany na licencji MIT. Możesz swobodnie używać, kopiować, modyfikować, łączyć, publikować, dystrybuować, sublicencjonować i/lub sprzedawać kopie oprogramowania, pod warunkiem spełnienia następujących wymogów:',
    termsLicenseBullets: [
      'Informacja o licencji MIT i informacja o prawach autorskich muszą być zawarte we wszystkich kopiach lub istotnych częściach oprogramowania.',
      'Wszystkie presety incydentów, opisy wzorców SRE i szablony raportów post-mortem zawarte w tym projekcie są oryginalnymi dziełami współtwórców BugMortem.',
      '„Kiroween" i „AWS" są znakami towarowymi ich odpowiednich właścicieli. BugMortem jest niezależnym zgłoszeniem i nie jest popierany ani powiązany z Amazon Web Services, Inc.',
    ],

    // ── Polityka Prywatności ─────────────────────────────────────────────────
    privacy: 'Polityka Prywatności',
    privacyTitle: 'Polityka Prywatności i Suwerenność Danych',

    privacyArchHeader: 'Zero Wycieku Danych — Architektura Local-First',
    privacyArchText:
      'BugMortem jest zbudowany na ścisłym modelu local-first bez ruchu wychodzącego. Całe przetwarzanie — parsowanie śladów stosu, generowanie sekcji zwłok, renderowanie raportów post-mortem — odbywa się wyłącznie w środowisku JavaScript Twojej przeglądarki. Żadne dane nigdy nie opuszczają Twojego urządzenia.',
    privacyArchBullets: [
      'Surowe logi incydentów i ślady stosu istnieją wyłącznie w pamięci sterty JavaScript podczas sesji i nigdy nie są serializowane do zdalnego punktu końcowego.',
      'Własne sekcje zwłok incydentów, które zapisujesz, są zapisywane wyłącznie w localStorage Twojej przeglądarki — nie na żadnym serwerze, w bazie danych ani w pamięci chmurowej.',
      'Eksporty Markdown raportów post-mortem są generowane po stronie klienta i pobierane bezpośrednio do Twojego systemu plików.',
      'Żadne wywołanie WebSocket, XHR ani fetch nie jest kierowane do żadnego punktu końcowego analityki, telemetrii ani logowania.',
      'Żaden service worker nie przechwytuje ani nie buforuje Twoich danych incydentów.',
    ],

    privacyAdminHeader: 'Administrator Danych',
    privacyAdminText:
      'Ponieważ BugMortem przetwarza wszystkie dane wyłącznie w lokalnym środowisku Twojej przeglądarki, jesteś jedynym administratorem i podmiotem przetwarzającym własne dane incydentów. Zespół projektu BugMortem nie otrzymuje, nie przechowuje ani nie ma dostępu do żadnych danych wprowadzonych do aplikacji.',

    privacyScopeHeader: 'Zakres Przetwarzania Danych',
    privacyScopeText:
      'Aplikacja przetwarza wyłącznie dane jawnie podane przez użytkownika: tytuły incydentów, fragmenty śladów stosu, fragmenty kodu i notatki sekcji zwłok. Dane te są wykorzystywane wyłącznie do renderowania interfejsu użytkownika w przeglądarce i generowania plików Markdown do pobrania. Nigdy nie są przesyłane, udostępniane ani sprzedawane.',

    privacyLocalStorageHeader: 'Dokładne Klucze localStorage',
    privacyLocalStorageIntro:
      'BugMortem zapisuje dane pod następującymi kluczami localStorage w Twojej przeglądarce. Możesz je w każdej chwili sprawdzić i usunąć za pomocą DevTools → Aplikacja → Lokalne Przechowywanie:',
    privacyLocalStorageKeys: [
      { key: 'bm_cookie_consent',           desc: 'Przechowuje Twoje preferencje dotyczące plików cookie/przechowywania (zaakceptowane, niezbędne lub własny obiekt JSON). Ustawiane przy pierwszej wizycie.' },
      { key: 'bugmortem_custom_incidents',   desc: 'Tablica JSON własnych sekcji zwłok incydentów, które utworzyłeś i zapisałeś. Nigdy nie synchronizowana zewnętrznie.' },
      { key: 'bugmortem_locale',             desc: 'Wybrany język interfejsu ("en" lub "pl"). Domyślnie "pl", jeśli nie ustawiono.' },
      { key: 'bm_theme',                     desc: 'Wybrany motyw kolorystyczny ("dark" lub "light"). Utrzymywany między sesjami.' },
    ],

    privacyNoTrackingHeader: 'Brak Telemetrii Podmiotów Trzecich, Reklam i Trackerów',
    privacyNoTrackingText:
      'BugMortem nie zawiera żadnych zewnętrznych skryptów śledzących, reklamowych ani analitycznych. Poniższe rozwiązania są jawnie nieobecne w aplikacji:',
    privacyNoTrackingBullets: [
      'Brak Google Analytics, Google Tag Manager ani Firebase Analytics.',
      'Brak Meta Pixel, LinkedIn Insight Tag ani żadnego trackera mediów społecznościowych.',
      'Brak Hotjar, FullStory, Heap, Mixpanel, Segment ani żadnego SDK analityki behawioralnej.',
      'Brak Sentry, Datadog RUM ani żadnego beacona monitorowania błędów przesyłającego ślady stosu na zewnątrz.',
      'Brak sieci reklamowych, platform DSP ani pikseli retargetingowych.',
      'Brak hostowanych zewnętrznie czcionek ani zasobów generujących żądania do podmiotów trzecich (wszystkie zasoby są hostowane lokalnie lub wbudowane).',
    ],

    privacyUserRightsHeader: 'Twoje Prawa — RODO i CCPA',
    privacyUserRightsText:
      'Ponieważ BugMortem jest w pełni aplikacją local-first bez serwerowego przechowywania danych, zespół projektu BugMortem nie posiada żadnych danych osobowych do udostępnienia, poprawienia ani usunięcia na Twoje żądanie. Niemniej jednak posiadasz następujące prawa dotyczące danych przechowywanych w Twojej przeglądarce:',
    privacyUserRightsBullets: [
      'Prawo dostępu — Otwórz DevTools → Aplikacja → Lokalne Przechowywanie, aby w każdej chwili wyświetlić wszystkie zapisane klucze i wartości.',
      'Prawo do usunięcia — Usuń natychmiastowo wszystkie dane BugMortem za pomocą funkcji jednym kliknięciem opisanej poniżej lub przez DevTools.',
      'Prawo do przenoszenia danych — Eksportuj dowolny incydent jako plik Markdown za pomocą przycisku „Eksportuj Raport do Markdown".',
      'Prawo do wycofania zgody — Zaktualizuj lub wycofaj preferencje przechowywania za pomocą przycisku „Ustawienia Cookies" w stopce w dowolnym momencie.',
      'CCPA — BugMortem nie „sprzedaje" danych osobowych, ponieważ nie gromadzi ani nie przechowuje danych osobowych na żadnym serwerze.',
    ],

    privacyPurgeHeader: 'Jednorazowe Czyszczenie Danych Lokalnych',
    privacyPurgeText:
      'Aby trwale usunąć wszystkie dane BugMortem z przeglądarki, otwórz DevTools przeglądarki (F12), przejdź do Aplikacja → Lokalne Przechowywanie → Twoja domena i usuń wszystkie klucze z prefiksem „bm_" lub „bugmortem_". Ewentualnie wyczyszczenie danych witryny dla tej domeny usuwa wszystkie przechowywane dane natychmiastowo.',

    // ── Polityka Cookies ─────────────────────────────────────────────────────
    cookies: 'Polityka Cookies',
    cookiesTitle: 'Polityka Cookies i Pamięci Lokalnej',
    cookiesUsageHeader: 'Użycie Pamięci Lokalnej',
    cookiesUsageText:
      'BugMortem nie ustawia plików cookie HTTP. Wykorzystuje wyłącznie localStorage przeglądarki. Cztery klucze udokumentowane powyżej w Polityce Prywatności stanowią kompletną i wyczerpującą listę wszystkich danych zapisywanych przez tę aplikację w pamięci przeglądarki.',
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
    },
    'cors-nightmare': {
      id: 'cors-nightmare',
      badge: 'Sieć / Bezpieczeństwo',
      severity: 'P1',
      title: 'Koszmar Preflight CORS',
      desc: 'Brakujące nagłówki CORS na bramce API spowodowały, że wszystkie żądania OPTIONS z innej domeny zakończyły się błędem 403, blokując całe SPA.',
      crashedCode: `// ❌ PRZEKLĘTY KOD: Brak nagłówków CORS w Express API
const express = require('express');
const app = express();

// Brak middleware CORS — przeglądarka blokuje preflight OPTIONS z 403
app.get('/api/data', (req, res) => {
  res.json({ data: 'wrażliwe dane' });
});`,
      resurrectedCode: `// ✅ WSKRZESZONY WZORZEC SRE: Jawne Utwardzenie CORS
const express = require('express');
const cors = require('cors');
const app = express();

const DOZWOLONE_DOMENY = [
  'https://app.example.com',
  'https://staging.example.com',
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || DOZWOLONE_DOMENY.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(\`CORS: Domena \${origin} jest niedozwolona\`));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-ID'],
  credentials: true,
  maxAge: 86400, // Buforuj preflight przez 24h
}));

app.options('*', cors()); // Jawna obsługa OPTIONS preflight`,
      stackTrace: `Access to fetch at 'https://api.example.com/data' from origin 'https://app.example.com'
has been blocked by CORS policy: Response to preflight request doesn't pass access control check:
No 'Access-Control-Allow-Origin' header is present on the requested resource.
    at fetch (<anonymous>)
    at loadUserData (app.bundle.js:1:4821)`,
      timeline: [
        { time: '10:00 UTC', desc: 'Frontend SPA wdrożono na nową subdomenę app.example.com', isFatal: false },
        { time: '10:01 UTC', desc: 'Wszystkie żądania API kończą się błędem — preflight OPTIONS zwraca 403 Forbidden', isFatal: false },
        { time: '10:02 UTC', desc: 'Cała aplikacja frontendowa przestaje działać; polityka CORS blokuje każde żądanie cross-origin', isFatal: true }
      ],
      postMortemReport: {
        summary: 'Brak middleware CORS na bramce Express API spowodował 100% niepowodzeń żądań preflight z błędem 403.',
        impact: 'Frontend SPA całkowicie niedostępny dla wszystkich użytkowników po migracji do subdomeny. Pełna awaria serwisu przez 22 minuty.',
        actionItems: [
          'Wdrożenie jawnej listy dozwolonych domen CORS przed każdym handlerem tras.',
          'Dodanie automatycznego testu dymnego OPTIONS preflight do pipeline CI/CD.',
          'Audyt konfiguracji bramek API pod kątem brakujących nagłówków CORS przed zmianami subdomen.'
        ]
      }
    }
  }
};

export default pl;