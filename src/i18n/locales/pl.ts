import { Dictionary } from '../types';

export const pl: Dictionary = {
  appName: 'BugMortem',
  appTagline: 'Cyfrowa Kostnica Awarii i Generator Raportów Post-Mortem',
  hackathonBadge: 'Projekt na Hackathon Kiroween 2026',
  themeToggle: 'Przełącz motyw',
  languageToggle: 'Język',
  incidentsListTitle: 'Archiwum Sekcji Zwłok Awarii',
  customAutopsyBtn: '+ Wprowadź Własną Awarię',

  presetTitles: {
    'incident-1': 'Spirala Śmierci Puli Połączeń',
    'incident-2': 'Przebudzenie Żniwiarza OOM',
    'incident-3': 'Widmowy Protokół DNS TTL',
    'incident-4': 'Kaskadowa Burza Ponowień',
  },

  autopsyModalTitle: 'Sekcja Zwłok Własnego Incydentu',
  autopsyTitleLabel: 'Tytuł / Podsumowanie Awarii',
  autopsyTitlePlaceholder: 'np. Zagłodzenie blokad rozproszonych w bramce płatności',
  autopsyDescLabel: 'Objawy Awarii i Fragment Śladu Stosu (Stack Trace)',
  autopsyDescPlaceholder: 'Opisz objawy awarii, kody błędów, wyczerpanie limitów i co dokładnie padło na produkcji...',
  autopsyCategoryLabel: 'Domena Architektoniczna',
  autopsySeverityLabel: 'Poziom Krytyczności',
  autopsySubmitBtn: 'Generuj Raport Sekcji Zwłok',
  autopsyCancelBtn: 'Anuluj',

  reportTitle: 'Oficjalny Raport Sekcji Zwłok Incydentu',
  reportBadge: 'Zweryfikowany Raport Post-Mortem',
  severityLabel: 'Krytyczność Awarii',
  categoryLabel: 'Domena Architektoniczna',
  impactLabel: 'Zasięg Zniszczeń i Wpływ Biznesowy (Blast Radius)',
  rootCauseLabel: 'Zweryfikowana Przyczyna Pierwotna (Root Cause)',
  timelineTitle: 'Chronologiczna Oś Czasu Awarii',
  safePatternTitle: 'Bezpieczny Wzorzec SRE i Bezpiecznik Obwodowy',
  actionItemsTitle: 'Działania Naprawcze i Prewencyjne',
  exportMarkdownBtn: 'Eksportuj Raport do Markdown',
  copiedNotification: 'Raport w formacie Markdown skopiowany do schowka!',
  taskHeader: 'Działanie Naprawcze',
  ownerHeader: 'Odpowiedzialny (DRI)',
  priorityHeader: 'Priorytet',
  deadlineHeader: 'Docelowy Czas SLA',

  footerCopyright: 'BugMortem. Stworzone na hackathon Kiroween 2026 organizowany przez AWS & Devpost.',
  footerDisclaimer: 'Zero telemetrii. Wszelkie analizy awarii i raporty przetwarzane są wyłącznie w lokalnej pamięci Twojej przeglądarki.',

  categories: {
    database: 'Bazy Danych i Magazyn',
    memory: 'Wyczerpanie Pamięci i Procesora',
    network: 'Sieć i Serwery DNS',
    concurrency: 'Współbieżność i Zakleszczenia',
    security: 'Bezpieczeństwo i Uprawnienia',
    custom: 'Analiza Własnego Incydentu',
  },

  severities: {
    'SEV-1': 'SEV-1 (Krytyczna Awaria Całkowita)',
    'SEV-2': 'SEV-2 (Poważna Degradacja Usługi)',
    'SEV-3': 'SEV-3 (Umiarkowane Zakłócenie)',
    'SEV-4': 'SEV-4 (Drobna Usterka)',
  },

  common: {
    close: 'Zamknij',
    cancel: 'Anuluj',
    save: 'Zapisz',
    back: 'Wstecz',
    loading: 'Ładowanie...',
    status: 'Status',
    filter: 'Filtruj',
    search: 'Szukaj incydentów...',
  },

  cookieConsent: {
    bannerTitle: 'Przejrzystość Danych i Pamięci Podręcznej',
    bannerText: 'BugMortem wykorzystuje pamięć localStorage wyłącznie do zachowania raportów sekcji zwłok oraz preferencji motywu w Twojej przeglądarce. Nie śledzimy ani nie profilujemy Twoich działań.',
    acceptAll: 'Akceptuję i rozumiem',
    customize: 'Ustawienia preferencji',
    decline: 'Odrzuć nieistotne',
    savePreferences: 'Zapisz preferencje',
    necessaryOnly: 'Wyłącznie niezbędne',
  },

  legal: {
    modalTitle: 'Centrum Prawne, Zgodności i Prywatności',
    title: 'Informacje Prawne',
    terms: 'Regulamin Serwisu',
    termsTitle: 'Regulamin Użytkowania BugMortem',
    termsContent: 'BugMortem to otwartoźródłowy symulator sekcji zwłok awarii i generator raportów post-mortem stworzony na hackathon Kiroween 2026. Narzędzie udostępniane jest na licencji MIT w celach edukacyjnych oraz wsparcia stabilności systemów produkcyjnych.',
    privacy: 'Polityka Prywatności',
    privacyTitle: 'Ochrona Prywatności i Suwerenność Danych Lokalnych',
    privacyContent: 'Wszelkie logi, ślady stosu i własne raporty awarii są przetwarzane wyłącznie lokalnie w pamięci Twojej przeglądarki. Żadne poufne dane firmowe, logi ani tokeny nie są wysyłane na serwery telemetryczne podmiotów trzecich.',
    cookies: 'Polityka Cookies',
    cookiesTitle: 'Zasady Wykorzystania Plików Cookies i Pamięci Podręcznej',
    cookiesContent: 'Aplikacja korzysta wyłącznie z mechanizmu browser localStorage do zapamiętania motywu graficznego (ciemny/jasny), szkiców awarii oraz historii wygenerowanych raportów. Nie stosujemy skryptów śledzących ani ciasteczek reklamowych.',
    disclaimer: 'Zastrzeżenia Inżynieryjne',
    disclaimerTitle: 'Zastrzeżenia Dotyczące Niezawodności SRE',
    disclaimerContent: 'Automatycznie generowane bezpieczne wzorce architektoniczne, szacunki promienia rażenia oraz procedury naprawcze stanowią rekomendacje inżynieryjne. Przed wdrożeniem skryptów na środowisko produkcyjne należy zawsze przetestować je na klastrze stagingowym.',
    gdpr: 'Zgodność z RODO',
    gdprTitle: 'Ochrona Danych Osobowych (RODO / GDPR)',
    gdprContent: 'BugMortem jest w pełni zgodny z europejskimi standardami RODO. Użytkownik ma 100% kontroli nad swoimi danymi. Wyczyszczenie pamięci podręcznej przeglądarki trwale usuwa wszystkie zapisane analizy awarii.',
  },

  presets: [
    {
      id: 'incident-1',
      title: 'Spirala Śmierci Puli Połączeń',
      category: 'database',
      severity: 'SEV-1',
      summary: 'Nagły wyrzut nieindeksowanych zapytań analitycznych wyczerpał limit 200 połączeń w klastrze RDS Aurora PostgreSQL, wywołując kaskadowe zakleszczenie wątków w 12 mikroserwisach.',
      impact: '100% odrzuconych płatności w koszyku przez 42 minuty. 14 200 przerwanych transakcji. Straty przychodowe szacowane na $320 000 w rejonach EU i US East.',
      rootCause: 'Zadanie cron raportowania analitycznego o pominęło pulę replik do odczytu i uruchomiło pełny skan sekwencyjny z 60-sekundowym limitem na głównej bazie transakcyjnej, blokując sloty połączeń.',
      timeline: [
        { time: '14:02 UTC', event: 'Automatyczny cron BI uruchamia nieindeksowane zapytanie join na tabeli zamówień.', status: 'nominal' },
        { time: '14:05 UTC', event: 'Użycie CPU głównej bazy RDS osiąga 98%. Pula połączeń dobija do 200/200.', status: 'degraded' },
        { time: '14:08 UTC', event: 'Wątki serwisu zamówień blokują się w oczekiwaniu na wolne połączenia; sondy health check padają.', status: 'critical' },
        { time: '14:22 UTC', event: 'Powiadomienie Incident Commandera. Ruch przekierowany na statyczną stronę techniczną.', status: 'critical' },
        { time: '14:38 UTC', event: 'Zawieszone zapytanie zabite komendą pg_terminate_backend(); pula połączeń resetuje się.', status: 'nominal' },
        { time: '14:44 UTC', event: 'Ruch w pełni znormalizowany. Zero błędów 503 na bramkach brzegowych.', status: 'resolved' },
      ],
      safePattern: {
        name: 'Partycjonowanie Puli Połączeń i Bezpiecznik Obwodowy',
        pattern: 'Odizoluj punkty końcowe transakcji od analitycznych zadań wsadowych za pomocą ścisłych limitów współbieżności i wykładniczego wycofywania.',
        codeSnippet: `// Wzorzec Bezpieczeństwa SRE: Odporne Leasingowanie Połączeń z Timeoutem
import { Pool } from 'pg';

const primaryPool = new Pool({
  max: 50,
  connectionTimeoutMillis: 2000,
  idleTimeoutMillis: 10000,
  statement_timeout: 5000, // Twardy błąd dla przeciągających się zapytań
});

export async function executeCriticalQuery<T>(sql: string, params: unknown[]): Promise<T> {
  const client = await primaryPool.connect();
  try {
    return await client.query(sql, params) as T;
  } finally {
    client.release(); // Zawsze zwalniaj połączenie z powrotem do puli
  }
}`,
      },
      actionItems: [
        { task: 'Wdrożenie routingu zapytań tylko do odczytu wyłącznie na repliki read-only', owner: 'Zespół DBA', priority: 'high', deadline: '24 Godziny' },
        { task: 'Wymuszenie statement_timeout = 3000ms na poziomie roli app_user', owner: 'Infra SRE', priority: 'high', deadline: '48 Godzin' },
        { task: 'Konfiguracja alertu nasycenia puli połączeń przy progu 75%', owner: 'Observability', priority: 'medium', deadline: '7 Dni' },
      ],
    },
    {
      id: 'incident-2',
      title: 'Przebudzenie Żniwiarza OOM',
      category: 'memory',
      severity: 'SEV-1',
      summary: 'Masowy eksport 2,5 miliona zamówień do pliku CSV załadował cały zbiór danych wprost do bufora pamięci Node.js, aktywując mechanizm jądra Linux Out-Of-Memory (OOM) killer na węzłach Kubernetes.',
      impact: 'Pody API rozliczeń wpadły w pętlę restartów (CrashLoopBackOff) na 65 minut. 8 węzłów klastra Kubernetes jednocześnie eksmitowało kontenery z powodu braku pamięci RAM.',
      rootCause: 'Brak strumieniowania: endpoint API używał res.json(await db.query()) zamiast potoków strumieniowych, alokując 4,2 GB pamięci przy twardym limicie kontenera 2 GB.',
      timeline: [
        { time: '09:15 UTC', event: 'Klient korporacyjny zleca eksport pełnej historii zamówień do CSV przez panel.', status: 'nominal' },
        { time: '09:18 UTC', event: 'Pamięć poda billing-api-6f78 gwałtownie rośnie z 420 MB do 1,95 GB w 180 sekund.', status: 'degraded' },
        { time: '09:20 UTC', event: 'Jądro uruchamia oom-killer: "Killed process 1 (node)". Pod wpada w CrashLoopBackOff.', status: 'critical' },
        { time: '09:35 UTC', event: 'Kaskadowe eksmisje podów w klastrze pod wpływem presji pamięci węzłów (MemoryPressure).', status: 'critical' },
        { time: '10:05 UTC', event: 'Ścieżka eksportu tymczasowo zablokowana regułą WAF na poziomie Cloudflare.', status: 'nominal' },
        { time: '10:20 UTC', event: 'Pody ustabilizowane z limitami pamięci i włączonym strumieniowaniem porcjowym.', status: 'resolved' },
      ],
      safePattern: {
        name: 'Potok Strumieniowy z Obsługą Przeciwciśnienia (Backpressure)',
        pattern: 'Nigdy nie ładuj dużych zbiorów do buforów w pamięci RAM. Używaj kursorów bazodanowych i potoków transformujących ze sprzężeniem zwrotnym socketu.',
        codeSnippet: `// Wzorzec Bezpieczeństwa SRE: Potok Strumieniowania Porcjowego
import { pipeline } from 'stream/promises';
import { stringify } from 'csv-stringify';
import QueryStream from 'pg-query-stream';

export async function streamOrdersToClient(client: any, res: any) {
  const query = new QueryStream('SELECT id, amount, created_at FROM orders');
  const stream = client.query(query);
  const csvTransformer = stringify({ header: true });

  res.setHeader('Content-Type', 'text/csv');
  // Backpressure zapobiega OOM wstrzymując zapytanie, gdy bufor socketu klienta jest pełny
  await pipeline(stream, csvTransformer, res);
}`,
      },
      actionItems: [
        { task: 'Przepisanie wszystkich endpointów eksportu na strumienie kursorowe z backpressure', owner: 'Backend Eng', priority: 'high', deadline: '3 Dni' },
        { task: 'Wyrównanie limitu memory limit z requestem i wdrożenie metryk cgroup v2', owner: 'DevOps Lead', priority: 'high', deadline: '5 Dni' },
        { task: 'Przeniesienie ciężkich raportów do asynchronicznych workerów (AWS SQS + pre-signed S3 URLs)', owner: 'Architekt', priority: 'medium', deadline: '14 Dni' },
      ],
    },
    {
      id: 'incident-3',
      title: 'Widmowy Protokół DNS TTL',
      category: 'network',
      severity: 'SEV-2',
      summary: 'Adres IP zewnętrznego procesora płatności został zaktualizowany u dostawcy, lecz kontenery Alpine Linux nie odświeżyły rekordu przez zignorowanie zaleceń i twardy cache DNS TTL na 86 400 sekund.',
      impact: 'Losowe odrzucanie 20% transakcji kartowych przez 3,5 godziny. Klienci otrzymywali komunikaty o przekroczeniu limitu czasu połączenia sieciowego.',
      rootCause: 'Biblioteka resolvera musl libc w Alpine Linux buforowała wyniki getaddrinfo w nieskończoność wewnątrz procesu Node.js, ignorując zmiany w nadrzędnych serwerach nazw.',
      timeline: [
        { time: '03:00 UTC', event: 'Operator bramki płatności migruje adres IP do nowej podsieci.', status: 'nominal' },
        { time: '03:15 UTC', event: 'Wychodzące żądania HTTPS do api.paygate.com kończą się błędem ETIMEDOUT 198.51.100.24:443.', status: 'degraded' },
        { time: '04:45 UTC', event: 'Skuteczność transakcji spada poniżej 80% SLA; uruchamia się alert w PagerDuty.', status: 'critical' },
        { time: '06:10 UTC', event: 'Inżynier SRE diagnozuje nieaktualne tłumaczenie IP w resolverze musl libc.', status: 'degraded' },
        { time: '06:30 UTC', event: 'Konfiguracja CoreDNS nadpisana z maksymalnym TTL wynoszącym 60 sekund.', status: 'nominal' },
        { time: '06:45 UTC', event: 'Restart kroczący podów płatności; 100% transakcji wraca do normy.', status: 'resolved' },
      ],
      safePattern: {
        name: 'Agent Keep-Alive z Rotacją Cache DNS',
        pattern: 'Konfiguruj klientów HTTP z agentami resolvera wymuszającymi maksymalny czas życia TTL i płynne odświeżanie połączeń.',
        codeSnippet: `// Wzorzec Bezpieczeństwa SRE: Agent z Odświeżaniem Cache DNS
import https from 'https';
import dns from 'dns';

// Wymuszenie krótkiego TTL rezolucji DNS dla krytycznych usług zewnętrznych
export const resilientHttpsAgent = new https.Agent({
  keepAlive: true,
  keepAliveMsecs: 10000,
  maxSockets: 100,
  timeout: 5000,
  lookup: (hostname, options, callback) => {
    dns.lookup(hostname, { ...options, verbatim: true }, (err, address, family) => {
      callback(err, address, family);
    });
  },
});`,
      },
      actionItems: [
        { task: 'Wymuszenie max-cache TTL 60s w CoreDNS dla wszystkich zewnętrznych domen FQDN', owner: 'Inżynier Sieci', priority: 'high', deadline: '2 Dni' },
        { task: 'Wdrożenie syntetycznego monitoringu kanarkowego endpointu bramki płatności', owner: 'Lider QA', priority: 'medium', deadline: '7 Dni' },
        { task: 'Standaryzacja agentów HTTP we wszystkich mikroserwisach backendowych', owner: 'Platforma Core', priority: 'medium', deadline: '10 Dni' },
      ],
    },
    {
      id: 'incident-4',
      title: 'Kaskadowa Burza Ponowień',
      category: 'concurrency',
      severity: 'SEV-1',
      summary: 'Krótki, 500-milisekundowy skok opóźnień w mikroserwisie profilu użytkownika wywołał agresywne natychmiastowe ponowienia (5x) w 80 instancjach webowych, potęgując ruch wejściowy o 500%.',
      impact: 'Całkowite załamanie bazy danych uwierzytelniania i profili. Kolejka bramki API Gateway przepełniła się, odrzucając 45 000 żądań z kodem błędu 504.',
      rootCause: 'Liniowe pętle ponowień bez rozproszenia (jitter) i bez wykładniczego wycofywania zmieniły chwilowe zachwianie w samobójczy rozproszony atak odmowy usługi (DoS).',
      timeline: [
        { time: '18:30 UTC', event: 'Krótka pauza odśmiecania pamięci (GC) na user-db powoduje 450 ms opóźnienia.', status: 'nominal' },
        { time: '18:31 UTC', event: 'Serwisy klienckie wysyłają 5 zsynchronizowanych ponowień w oknie 50 ms.', status: 'degraded' },
        { time: '18:32 UTC', event: 'Ruch przychodzący skacze z 2000 żądań/s do 12 500 żądań/s.', status: 'critical' },
        { time: '18:35 UTC', event: 'Pamięć kolejki serwisu wyczerpuje się; masowo zwracane błędy 504 Gateway Timeout.', status: 'critical' },
        { time: '18:55 UTC', event: 'Uruchomienie globalnego ogranicznika przepustowości na proxy Envoy (10% bazy).', status: 'nominal' },
        { time: '19:15 UTC', event: 'Wdrożenie algorytmu Full Jitter z wykładniczym wycofywaniem w serwisach.', status: 'resolved' },
      ],
      safePattern: {
        name: 'Wykładnicze Wycofywanie z Pełnym Rozproszeniem (Full Jitter)',
        pattern: 'Zapobiegaj efektowi tratowania stada (thundering herd), rozpraszając ponowienia losowym opóźnieniem o wykładniczej dynamice.',
        codeSnippet: `// Wzorzec Bezpieczeństwa SRE: Wykładnicze Wycofywanie z Pełnym Jitterem
export async function resilientRetry<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  baseDelayMs = 100,
  maxDelayMs = 3000
): Promise<T> {
  let attempt = 0;
  while (true) {
    try {
      return await fn();
    } catch (error) {
      attempt++;
      if (attempt > maxRetries) throw error;
      // Wzór Full Jitter: losowy czas między 0 a min(maxDelay, base * 2^attempt)
      const calculatedMax = Math.min(maxDelayMs, baseDelayMs * Math.pow(2, attempt));
      const jitteredSleep = Math.floor(Math.random() * calculatedMax);
      await new Promise((resolve) => setTimeout(resolve, jitteredSleep));
    }
  }
}`,
      },
      actionItems: [
        { task: 'Audyt bibliotek HTTP pod kątem natychmiastowych ponowień bez opóźnienia', owner: 'App Sec / SRE', priority: 'high', deadline: '24 Godziny' },
        { task: 'Wdrożenie biblioteki circuit breakera (np. opossum / cockatiel) w wywołaniach RPC', owner: 'Zespół Backend', priority: 'high', deadline: '3 Dni' },
        { task: 'Konfiguracja adaptacyjnego odrzucania ruchu w Envoy przed awarią bazy', owner: 'Infra SRE', priority: 'medium', deadline: '7 Dni' },
      ],
    },
  ],
};

export default pl;