import { Dictionary } from '../types';

export const pl: Dictionary = {
  title: 'BugMortem – AI Studio Sekcji Zwłok Awarii i Post-Mortem',
  subtitle: 'Inżynieryjne śledztwo post-mortem i zautomatyzowane bezpieczne wzorce SRE dla awarii produkcyjnych.',
  badgeHackathon: 'Projekt na Hackathon Kiroween 2026',
  statusLabel: 'Status Kostnicy',
  statusValue: 'Aktywny Incydent (P0)',
  customAutopsyBtn: '+ Wprowadź Własną Awarię',
  presetsSectionTitle: 'Archiwum Sekcji Zwłok Awarii',
  autopsyTitle: 'Sekcja Kodu: Przeklęty a Wskrzeszony Kod',
  copyCodeBtn: 'Kopiuj Wskrzeszony Kod',
  copiedCodeBtn: 'Skopiowano do Schowka!',
  crashedCodeTitle: 'Przeklęty Kod (Crash na Produkcji)',
  crashedBadge: 'Błąd Krytyczny',
  resurrectedCodeTitle: 'Wskrzeszony Kod SRE (Bezpieczny Wzorzec)',
  resurrectedBadge: 'Wzorzec: Circuit Breaker',
  stackTraceTitle: 'Surowy Ślad Stosu (Stack Trace)',
  timelineTitle: 'Chronologiczna Oś Czasu Awarii',
  postMortemTitle: 'Oficjalny Raport Sekcji Zwłok Incydentu',
  exportReportBtn: 'Eksportuj Raport do Markdown',
  exportPdfBtn: 'Pobierz Kartę Zgonu (PDF)',
  downloadSuccess: 'Raport Markdown został pomyślnie pobrany!',
  downloadPdfSuccess: 'Karta zgonu (PDF) została pomyślnie wygenerowana!',
  mdReportFooter: '*Raport wygenerowany przez BugMortem (Zgłoszenie na Hackathon Kiroween 2026).*',

  // ── Głosowa Diagnoza Lekarza Sądowego SRE (Speech API) ────────────────────
  coronerVerdictBtn: 'Odsłuchaj Werdykt Koronera',
  coronerVerdictStopBtn: 'Zatrzymaj Werdykt',
  coronerVerdictPlaying: 'Koroner odczytuje diagnozę...',
  coronerSpeechPrefix: 'Oficjalne orzeczenie sekcji zwłok SRE.',
  coronerSpeechIncident: 'Incydent:',
  coronerSpeechSeverity: 'Stopień krytyczności:',
  coronerSpeechTime: 'Czas zgonu usługi:',
  coronerSpeechCause: 'Bezpośrednia przyczyna zapaści:',
  coronerSpeechMitigation: 'Główne zalecenie naprawcze:',

  // ── Urzędowa Karta Zgonu (PDF) ────────────────────────────────────────────
  pdf: {
    certTitle: 'URZĘDOWA KARTA ZGONU AWARII',
    subTitle: 'CYFROWE PROSEKTORIUM SRE // HACKATHON KIROWEEN 2026',
    recordRef: 'NR REJESTRU',
    timestamp: 'ZNACZNIK CZASU',
    labelService: 'Nazwa Usługi / Awarii',
    labelDomain: 'Domena Architektoniczna',
    labelSeverity: 'Krytyczność Zgonu',
    labelStatus: 'Status Prosektorium',
    statusResurrected: 'WSKRZESZONY (SRE 200 OK)',
    section1Title: '1. Sekcja Zwłok: Przyczyna Zgonu i Promień Rażenia',
    section2Title: '2. Chronologia Zapadu Systemowego',
    section3Title: '3. Ślad Stosu w Momencie Zgonu (Biopsja Pamięci)',
    section4Title: '4. Zastosowany Wzorzec Wskrzeszenia SRE (Lekarstwo)',
    summary: 'Podsumowanie',
    impact: 'Wpływ Biznesowy',
    fatalEvent: 'AWARIA KRYTYCZNA',
    noStackTrace: 'Brak zarejestrowanego śladu stosu.',
    appliedFallback: '// Standardowy circuit breaker wdrożony',
    commanderRole: 'Główny Dowódca Incydentu • Silnik BugMortem',
    sealLine1: '✓ SRE WSKRZESZONY',
    sealLine2: 'ZATWIERDZONO PRZEZ BUGMORTEM',
  },

  // ── Mapa Skażenia Architektury (Blast Radius Heatmap) ─────────────────────
  blastRadius: {
    title: 'Topologia Skażenia Architektury (Blast Radius)',
    subtitle: 'Wizualizacja kaskadowego wektora awarii mikroserwisów i izolacja Pacjenta Zero.',
    legendPatientZero: 'Pacjent Zero (Epicentrum P0)',
    legendCascading: 'Skażenie Kaskadowe (P1)',
    legendHealthy: 'Węzeł Zdrowy (200 OK)',
    nodeClientSpa: 'Frontend Client SPA',
    nodeClientSpaDesc: 'Warstwa prezentacji i interakcji użytkownika (Next.js / SSR)',
    nodeEdgeGateway: 'Bramka API Edge',
    nodeEdgeGatewayDesc: 'Ingress Proxy, trasowanie żądań i nagłówki CORS',
    nodeAuthService: 'Serwis Uwierzytelniania',
    nodeAuthServiceDesc: 'Zarządzanie sesjami, tokeny JWT i kontrola dostępu',
    nodeDatabase: 'Transakcyjna Baza Danych',
    nodeDatabaseDesc: 'Klaster Aurora RDS i transakcyjna pula połączeń',
    nodeWorkerPool: 'Klaster Workerów Asynchronicznych',
    nodeWorkerPoolDesc: 'Przetwarzanie zadań w tle, bufor pamięci i kolejki zadań',
    statusPatientZero: 'PACJENT ZERO (P0)',
    statusDegraded: 'DEGRADACJA (P1)',
    statusHealthy: 'ZDROWY (200 OK)',
    statusResurrected: 'WSKRZESZONY (SRE OK)',
    metricCritical: 'Epicentrum P0',
    metricDegraded: 'Degradacja P1',
    metricHealthy: 'Węzły Stabilne',
  },
  dispatcher: {
    openBtn: "Eskalacja On-Call",
    modalTitle: "Dyspozytor Incydentu SRE",
    modalSubtitle: "Generuj ustandaryzowane alerty i tickety eskalacyjne dla zespolu on-call",
    tabSlack: "Slack / Discord",
    tabPagerDuty: "PagerDuty (CEF)",
    tabGithub: "GitHub Issue",
    copyBtn: "Kopiuj do schowka",
    copiedBtn: "Skopiowano!",
    openGithubBtn: "Otworz GitHub Issue",
    closeBtn: "Zamknij",
    fieldIncidentId: "Identyfikator incydentu",
    fieldSeverity: "Poziom krytycznosci",
    fieldService: "Komponent zrodlowy",
    fieldStatus: "Status operacyjny",
    fieldBlastRadius: "Zasieg awarii (Blast Radius)",
    fieldWarRoom: "Mostek incydentu (War Room)",
    fieldRunbook: "Procedura naprawcza (Runbook)",
    fieldChecklist: "Lista kontrolna mitigacji",
    slackHeader: "INCIDENT ALERT - NATYCHMIASTOWA ESKALACJA SRE",
    slackActionRequired: "Wymagane natychmiastowe podjecie dyzuru on-call.",
    slackJoinWarRoom: "Dolacz do mostka incydentu",
    pdRoutingKeyNotice: "Zastap 'SERVICE_INTEGRATION_KEY' kluczem routingu serwisu w PagerDuty.",
    githubLabels: "Labels: incident, sre-triage, production, bugmortem",
  },


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
  fieldResurrectedCodePlaceholder: 'Pozostaw puste, aby wygenerować bezpieczny wzorzec Circuit Breaker...',
  btnCancel: 'Anuluj',
  btnAnalyzeAndGenerate: 'Przeprowadź Sekcję Zwłok',
  validationErrorRequired: 'Proszę podać tytuł awarii oraz ślad stosu.',
  audioToggleEnable: 'Telemetria Audio: Wyciszona — kliknij, aby włączyć',
  audioToggleDisable: 'Telemetria Audio: Włączona — kliknij, aby wyciszyć',
  statusP0: 'Aktywny Incydent (P0 Krytyczny)',
  statusP1: 'Ostrzeżenie Telemetrii (P1 Poważny)',
  statusResurrected: 'Usługa Wskrzeszona (Zdrowa · 200 OK)',
  footerRights: 'Wszelkie prawa zastrzeżone. Stworzone na Kiroween 2026 przez AWS & Devpost.',
  footerPrivacy: 'Polityka Prywatności',
  footerTerms: 'Regulamin',
  footerCookieSettings: 'Ustawienia Cookies',
  cookieTitle: 'Przejrzystość Danych i Ciasteczek',
  cookieDesc: 'BugMortem przetwarza analizy awarii lokalnie w przeglądarce. Telemetria Google Analytics 4 jest domyślnie zablokowana i uruchamia się wyłącznie za Twoją zgodą (Google Consent Mode v2).',
  cookieAcceptAll: 'Akceptuję wszystkie',
  cookieEssentialOnly: 'Tylko niezbędne',
  cookieCustomize: 'Dostosuj preferencje',
  cookieDrawerTitle: 'Preferencje Prywatności i Cookies',
  cookieAnalytics: 'Pomiary analityczne (GA4 / GTM)',
  cookieAnalyticsDesc: 'Anonimowe statystyki odsłon i ruchu serwisu pod kontrolą Google Consent Mode v2.',
  cookieMarketing: 'Pamięć marketingowa',
  cookieMarketingDesc: 'BugMortem nie wyświetla reklam, nie profiluje użytkowników ani nie korzysta z pikseli marketingowych.',
  cookieSavePreferences: 'Zapisz preferencje',

  cookies: {
    title: 'Przejrzystość Danych i Plików Cookies',
    description: 'BugMortem przetwarza Twoje dane i raporty z awarii lokalnie w przeglądarce. Statystyki odwiedzin (GA4) podlegają ścisłej zgodzie użytkownika.',
    essential: 'Niezbędna pamięć lokalna',
    essentialDesc: 'Wymagana do prawidłowego działania aplikacji: zapamiętania motywu ciemnego/jasnego, języka oraz lokalnych sekcji zwłok.',
    alwaysActive: 'Zawsze aktywne',
    analytics: 'Pomiary analityczne (Google Analytics 4)',
    analyticsDesc: 'Anonimowa telemetria ruchu (GA4 / GTM) chroniona przez Google Consent Mode v2 (domyślnie wyłączona; aktywowana wyłącznie po wyrażeniu zgody).',
    marketing: 'Pliki marketingowe',
    marketingDesc: 'Całkowity brak reklam, pikseli śledzących i profilowania przez podmioty trzecie.',
    savePreferences: 'Zapisz preferencje',
    acceptAll: 'Zaakceptuj wszystkie',
    rejectAll: 'Tylko niezbędne',
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
    lastUpdated: 'Ostatnia aktualizacja: 5 listopada 2026',

    // ── Regulamin ────────────────────────────────────────────────────────────
    terms: 'Regulamin Serwisu',
    termsTitle: 'Regulamin Użytkowania BugMortem',

    termsScopeHeader: 'Zakres i Cel Narzędzia',
    termsScopeText:
      'BugMortem to diagnostyczne studio śledcze SRE zgłoszone na Hackathon Kiroween 2026, organizowany przez AWS & Devpost. Narzędzie umożliwia porównawczą sekcję zwłok incydentów, automatyczne generowanie raportów post-mortem oraz przeglądanie wyselekcjonowanych „Wzorców Wskrzeszenia Kodu" — algorytmicznych wzorców odtwarzania systemów zaczerpniętych z rzeczywistych podręczników SRE.',

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

    privacyArchHeader: 'Zero Wycieku Kodu Incydentów — Architektura Local-First',
    privacyArchText:
      'BugMortem jest zbudowany w oparciu o model local-first dla wszelkich danych wrażliwych. Całe przetwarzanie awarii — parsowanie śladów stosu, generowanie sekcji zwłok, analiza kodu oraz renderowanie raportów i kart zgonu PDF — odbywa się wyłącznie w pamięci Twojej przeglądarki. Twój kod produkcyjny i zrzuty błędów nigdy nie opuszczają Twojego urządzenia.',
    privacyArchBullets: [
      'Surowe logi incydentów, fragmenty kodu i ślady stosu istnieją wyłącznie w pamięci operacyjnej JavaScript i nigdy nie są wysyłane do zdalnych serwerów ani systemów AI podmiotów trzecich.',
      'Własne sekcje zwłok incydentów, które zapisujesz, trafiają wyłącznie do pamięci localStorage Twojej przeglądarki.',
      'Eksporty Markdown oraz karty zgonu PDF są generowane w 100% po stronie klienta za pomocą lokalnych silników przeglądarki.',
      'Żadne dane o awariach nie są przekazywane do skryptów analitycznych ani logowania błędów.',
    ],

    privacyAdminHeader: 'Administrator Danych',
    privacyAdminText:
      'Ponieważ BugMortem przetwarza dane incydentów wyłącznie w lokalnym środowisku Twojej przeglądarki, jesteś jedynym administratorem i dysponentem tych informacji. Zespół projektu BugMortem nie gromadzi, nie przechowuje ani nie ma wglądu w żadne logi ani kody wprowadzane do aplikacji.',

    privacyScopeHeader: 'Zakres Przetwarzania Danych',
    privacyScopeText:
      'Aplikacja przetwarza dane podane przez użytkownika (tytuły incydentów, logi błędów, fragmenty kodu) wyłącznie w celu wygenerowania interaktywnej sekcji zwłok i plików do pobrania. Dane te nigdy nie są synchronizowane z zewnętrznymi bazami danych ani odsprzedawane.',

    privacyLocalStorageHeader: 'Pamięć Lokalna (localStorage) i Ciasteczka',
    privacyLocalStorageIntro:
      'BugMortem zapisuje konfigurację sesji w pamięci lokalnej oraz — wyłącznie po wyrażeniu dobrowolnej zgody — w plikach cookies:',
    privacyLocalStorageKeys: [
      { key: 'bm_cookie_consent',           desc: 'Przechowuje Twoją decyzję dotyczącą zgody na telemetrię i cookies (Google Consent Mode v2).' },
      { key: 'bugmortem_custom_incidents',   desc: 'Lokalna baza JSON własnych sekcji zwłok incydentów wprowadzonych przez użytkownika.' },
      { key: 'bugmortem_locale',             desc: 'Wybrany język interfejsu ("pl" lub "en").' },
      { key: 'bm_theme',                     desc: 'Preferencja motywu wizualnego ("dark" lub "light").' },
      { key: '_ga / _ga_* (opcjonalne)',     desc: 'Ciasteczka analityczne Google Analytics 4 zapisywane WYŁĄCZNIE po kliknięciu „Akceptuję wszystkie” w banerze cookies.' },
    ],

    privacyNoTrackingHeader: 'Przejrzystość Telemetrii i Ochrona Prywatności',
    privacyNoTrackingText:
      'Aplikacja korzysta z Google Tag Manager (GTM-K77D4NHB) oraz Google Analytics 4 (G-KVMM511ZWD) wyłącznie do anonimowych statystyk odwiedzin, pod ścisłym nadzorem Google Consent Mode v2. Poniższe zasady gwarantują pełną ochronę prywatności:',
    privacyNoTrackingBullets: [
      'Domyślny brak śledzenia (Consent Mode v2): Przed kliknięciem zgody w banerze cookies wszelkie identyfikatory analityczne i reklamowe posiadają status „denied”.',
      'Zero profilowania kodu: Dane o awariach, ślady stosu i kod źródłowy są całkowicie wyłączone ze zdarzeń telemetrycznych.',
      'Brak sieci reklamowych i retargetingu: Brak pikseli reklamowych Meta (Facebook), LinkedIn, TikTok czy platform DSP/SSP.',
      'Brak inwazyjnego nagrywania sesji: Brak narzędzi typu Hotjar, FullStory, Smartlook czy Microsoft Clarity.',
      'Brak zewnętrznych agregatorów błędów: Brak beacona Sentry lub Datadog RUM wysyłającego ślady awarii na zewnątrz.',
      'Brak zewnętrznych czcionek CDN: Wszystkie czcionki i ikony są wbudowane lub serwowane bezpośrednio z domeny aplikacji.',
    ],

    privacyUserRightsHeader: 'Twoje Prawa — RODO i CCPA',
    privacyUserRightsText:
      'Masz pełną kontrolę nad wszelkimi danymi zapisanymi w Twojej przeglądarce oraz nad statusem zgód telemetrycznych:',
    privacyUserRightsBullets: [
      'Prawo dostępu — Otwórz DevTools → Aplikacja → Lokalne Przechowywanie / Pliki cookie, aby w każdej chwili sprawdzić zapisane wartości.',
      'Prawo do usunięcia — Możesz natychmiast wyczyścić dane za pomocą poniższej instrukcji lub wyczyszczenia pamięci witryny w przeglądarce.',
      'Prawo do wycofania zgody — W każdej chwili możesz zmienić lub wycofać zgodę analityczną, klikając „Ustawienia Cookies” w stopce serwisu.',
      'Suwerenność danych — Żadne dane osobowe ani logi produkcyjne nie są i nigdy nie będą sprzedawane podmiotom trzecim.',
    ],

    privacyPurgeHeader: 'Jednorazowe Czyszczenie Danych Lokalnych',
    privacyPurgeText:
      'Aby trwale usunąć wszystkie dane BugMortem oraz ciasteczka analityczne z przeglądarki, otwórz DevTools (F12) → Aplikacja → Wyczyść dane witryny (Clear site data), lub usuń klucze z prefiksem „bm_" oraz „bugmortem_".',

    // ── Polityka Cookies ─────────────────────────────────────────────────────
    cookies: 'Polityka Cookies',
    cookiesTitle: 'Polityka Cookies i Pamięci Lokalnej',
    cookiesUsageHeader: 'Użycie Ciasteczek i Pamięci Lokalnej',
    cookiesUsageText:
      'BugMortem w warstwie podstawowej opiera się na pamięci lokalnej (localStorage). Pliki cookie HTTP (Google Analytics 4: _ga, _ga_*) są tworzone wyłącznie wtedy, gdy użytkownik wyrazi dobrowolną zgodę w banerze cookies. W przypadku braku zgody lub wyboru trybu „Tylko niezbędne”, Google Consent Mode v2 blokuje zapis ciasteczek analitycznych, a serwis funkcjonuje w trybie całkowicie suwerennym.',
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