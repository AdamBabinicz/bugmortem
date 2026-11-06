import { TranslationDictionary } from '../types';

export const pl: TranslationDictionary = {
  common: {
    close: 'Zamknij',
  },
  hero: {
    badge: 'PROJEKT NA HACKATHON KIROWEEN 2026',
    title: 'BugMortem – AI Studio Sekcji Zwłok Awarii i Post-Mortem',
    subtitle: 'Inżynieryjne śledztwo post-mortem i zautomatyzowane bezpieczne wzorce SRE dla awarii produkcyjnych.',
    inputCta: '+ WPROWADŹ WŁASNĄ AWARIĘ',
    statusActive: 'Aktywny Incydent (P0 Krytyczny)',
    statusStable: 'System Nominalny (200 OK)',
  },
  navigation: {
    langPl: 'Polski (PL)',
    langEn: 'English (EN)',
    toggleTheme: 'Przełącz Motyw',
  },
  presets: {
    sectionTitle: 'ARCHIWUM SEKCJI ZWŁOK AWARII',
    items: {
      'react-hydration': {
        id: 'react-hydration',
        title: 'Niezgodność Hydratacji Reacta i Zapaść Drzewa DOM',
        badge: 'FRONTEND / SSR',
        severity: 'P0',
        description: 'Niestabilne new Date() lub dostęp do obiektu window podczas SSR wywołuje błąd React Error #418, niszcząc interaktywny stan klienta.',
        codeSnippet: `// ❌ PRZEKLĘTY KOD: Niestabilny znacznik czasu podczas SSR
export default function ClockBanner() {
  // BŁĄD: new Date() generuje inny czas na serwerze i u klienta
  const time = new Date().toLocaleTimeString();
  return <div className="banner">Ostatnia synchronizacja: {time}</div>;
}`,
        revivedCode: `// ✅ WSKRZESZONY KOD SRE: Hydratacja dwufazowa z flagą montowania
'use client';
import { useState, useEffect } from 'react';

export default function ClockBanner() {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    setMounted(true);
    setTime(new Date().toLocaleTimeString());
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return <div className="banner skeleton">Synchronizacja...</div>;
  }

  return <div className="banner">Ostatnia synchronizacja: {time}</div>;
}`,
        stackTrace: `Error: Hydration failed because the initial UI does not match what was rendered on the server.
    at throwOnHydrationMismatch (react-dom-client.development.js:1003)
    at tryToClaimNextHydratableInstance (react-dom-client.development.js:1120)
    at updateHostComponent (react-dom-client.development.js:9840)
    at beginWork (react-dom-client.development.js:10820)`,
        timeline: [
          { time: '14:02:11 UTC', label: 'SSR Render', description: 'Serwer wygenerował HTML z czasem 14:02:11' },
          { time: '14:02:13 UTC', label: 'Client Hydration', description: 'Klient próbuje hydratacji z czasem 14:02:13 — rozbieżność sumy kontrolnej' },
          { time: '14:02:14 UTC', label: 'DOM Crash', description: 'React porzuca drzewo DOM i wymusza pełny kosztowny re-render klienta', isFatal: true },
        ],
        replayerSteps: [
          {
            step: 1,
            timeOffset: '+0.0s [14:02:11 UTC]',
            title: 'Renderowanie SSR w środowisku Node.js',
            description: 'Serwer generuje statyczny HTML z dynamicznym stemplem new Date().',
            telemetry: { latencyMs: 24, errorRate: '0.00%', rps: '1.2k' },
            severity: 'P1',
          },
          {
            step: 2,
            timeOffset: '+1.8s [14:02:13 UTC]',
            title: 'Parsowanie w przeglądarce i wywołanie hydrateRoot',
            description: 'Przeglądarka próbuje dopasować drzewo DOM; wykryto niezgodność tekstu węzła.',
            telemetry: { latencyMs: 140, errorRate: '12.4%', rps: '1.2k' },
            severity: 'P1',
          },
          {
            step: 3,
            timeOffset: '+2.4s [14:02:14 UTC]',
            title: 'Zapaść Hydratacji (React Error #418)',
            description: 'Drzewo DOM zostaje zniszczone i odtworzone od zera; utrata stanu formularzy.',
            telemetry: { latencyMs: 680, errorRate: '100%', rps: '950' },
            severity: 'P0',
          },
        ],
        fiveWhys: [
          'Aplikacja wyrzuca błąd "Minified React error #418" i powoduje zapaść renderowania u klienta.',
          'Komponent renderuje bieżący czas za pomocą new Date().toLocaleTimeString() bezpośrednio w ciele JSX.',
          'Suma kontrolna HTML wygenerowana na serwerze różni się od drzewa zrenderowanego w przeglądarce klienta.',
          'Brak izolacji renderowania po stronie klienta (brak hooka useEffect lub flagi mounted).',
          'Brak reguły ESLint wymuszającej kontrolę hydratacji SSR oraz brak testów regresji renderowania w pipeline CI/CD.',
        ],
        blastRadius: {
          nodes: [
            { id: 'n1', name: 'Frontend SSR (Next.js)', role: 'Warstwa Prezentacji', status: 'epicenter', statusCode: 'FAIL' },
            { id: 'n2', name: 'Przeglądarka Klienta', role: 'Renderowanie DOM', status: 'degraded', statusCode: 'WARN' },
            { id: 'n3', name: 'Bramka API Edge', role: 'Ruch Sieciowy', status: 'healthy', statusCode: '200 OK' },
            { id: 'n4', name: 'Serwis Koszyka', role: 'Backend API', status: 'healthy', statusCode: '200 OK' },
          ],
          summary: { epicenterCount: 1, degradedCount: 1, healthyCount: 2 },
        },
        chaosMetrics: [
          { id: 'm1', name: 'Opóźnienie Hydratacji P99', severity: 'P0', description: 'Wzrost opóźnienia do 680ms z powodu odrzucenia cache DOM', status: 'injecting' },
          { id: 'm2', name: 'Wskaźnik Błędów Klienta', severity: 'P0', description: 'Skok do 12.4% zgłoszeń błędu React Error #418 w Sentry', status: 'injecting' },
        ],
        postMortem: {
          summary: 'Niestabilne stemplowanie czasu w komponencie SSR wywołało kaskadę błędów hydratacji React Error #418.',
          impact: '12% użytkowników doświadczyło zamrożenia interfejsu i utraty wprowadzonych danych w formularzach.',
          actionItems: [
            'Wdrożyć dwufazową hydratację z flagą mounted we wszystkich dynamicznych komponentach.',
            'Dodać regułę ESLint react-hooks/exhaustive-deps oraz zakaz new Date() w ciele komponentów SSR.',
            'Wdrożyć automatyczne testy E2E Playwright sprawdzające czystość konsoli przeglądarki.',
          ],
        },
      },
      'connection-pool': {
        id: 'connection-pool',
        title: 'Spirala Śmierci Puli Połączeń',
        badge: 'BAZA DANYCH / AURORA',
        severity: 'P0',
        description: 'Nieindeksowane zapytania analityczne wyczerpały limit 200 połączeń bazy RDS Aurora, paraliżując wątki transakcyjne w koszyku zakupowym.',
        codeSnippet: `// ❌ PRZEKLĘTY KOD: Nieszczelna pula bez zwrotu połączenia
app.get('/api/analytics', async (req, res) => {
  const client = await pool.connect();
  // BŁĄD: Brak bloku try/finally — błąd powoduje trwały wyciek połączenia
  const data = await client.query('SELECT * FROM orders WHERE status = $1', ['completed']);
  res.json(data.rows);
  client.release(); // Nigdy nieosiągalne przy timeoutcie bazy
});`,
        revivedCode: `// ✅ WSKRZESZONY KOD SRE: Zabezpieczony uchwyt z PgBouncer i timeoutem
app.get('/api/analytics', async (req, res) => {
  let client;
  try {
    client = await pool.connect();
    // Bezpieczny timeout zapytania zapobiegający blokowaniu puli
    await client.query('SET statement_timeout = 2000');
    const data = await client.query(
      'SELECT id, total FROM orders WHERE status = $1 LIMIT 100',
      ['completed']
    );
    res.json(data.rows);
  } catch (err) {
    res.status(503).json({ error: 'Usługa tymczasowo niedostępna' });
  } finally {
    if (client) client.release(); // Gwarantowany zwrot do puli
  }
});`,
        stackTrace: `error: remaining connection slots are reserved for non-replication superuser connections
    at Parser.parseErrorMessage (/app/node_modules/pg-protocol/dist/parser.js:287:98)
    at Pool.connect (/app/node_modules/pg-pool/index.js:56:21)
    at async /app/dist/server.js:142:18`,
        timeline: [
          { time: '09:15:00 UTC', label: 'Cron Trigger', description: 'Uruchomienie porannego raportu analitycznego bez limitu wierszy' },
          { time: '09:16:30 UTC', label: 'Pool Saturation', description: 'Wszystkie 200 slotów bazy Aurora zajęte; kolejka oczekiwania > 500ms' },
          { time: '09:17:02 UTC', label: 'Cascading 503', description: 'Serwis transakcyjny odrzuca zamówienia klientów z kodem 503 Service Unavailable', isFatal: true },
        ],
        replayerSteps: [
          {
            step: 1,
            timeOffset: '+0.0s [09:15:00 UTC]',
            title: 'Uruchomienie nieindeksowanego raportu',
            description: 'Cron analityczny otwiera 30 równoległych zapytań skanujących pełną tabelę orders.',
            telemetry: { latencyMs: 45, errorRate: '0.00%', rps: '2.4k' },
            severity: 'P1',
          },
          {
            step: 2,
            timeOffset: '+90s [09:16:30 UTC]',
            title: 'Wyczerpanie slotów puli (Pool Exhaustion)',
            description: 'Liczba dostępnych połączeń spada do 0; żądania transakcyjne zaczynają kolejkowanie.',
            telemetry: { latencyMs: 1850, errorRate: '14.2%', rps: '1.9k' },
            severity: 'P1',
          },
          {
            step: 3,
            timeOffset: '+122s [09:17:02 UTC]',
            title: 'Całkowity paraliż bazy danych (P0 Outage)',
            description: 'PgPool rzuca "connection slots reserved"; transakcje koszykowe odrzucane z kodem 503.',
            telemetry: { latencyMs: 8400, errorRate: '98.6%', rps: '310' },
            severity: 'P0',
          },
        ],
        fiveWhys: [
          'Wszystkie żądania do bazy danych kończą się błędem "Connection pool exhausted" i kodem 503 w koszyku.',
          'Uruchomiono cykliczne zadanie analityczne generujące raport na tabeli transakcyjnej orders.',
          'Zapytania analityczne nie zwalniały połączeń w bloku try/finally, powodując wyciek uchwytów puli.',
          'Ruch analityczny współdzielił tę samą instancję bazy i pulę połączeń co krytyczny ruch koszykowy.',
          'Brak podziału na repliki do odczytu (read-replicas) oraz brak wymuszonego globalnego limitu statement_timeout.',
        ],
        blastRadius: {
          nodes: [
            { id: 'n1', name: 'Klaster Bazy Aurora RDS', role: 'Magazyn Danych', status: 'epicenter', statusCode: 'FAIL' },
            { id: 'n2', name: 'Serwis Koszyka', role: 'Wątki Transakcyjne', status: 'degraded', statusCode: '503' },
            { id: 'n3', name: 'Bramka Płatności', role: 'Obsługa Kart', status: 'degraded', statusCode: 'WARN' },
            { id: 'n4', name: 'Statyczny Frontend CDN', role: 'Dystrybucja Assetów', status: 'healthy', statusCode: '200 OK' },
          ],
          summary: { epicenterCount: 1, degradedCount: 2, healthyCount: 1 },
        },
        chaosMetrics: [
          { id: 'm1', name: 'Nasycenie Puli Połączeń', severity: 'P0', description: '100% wykorzystania slotów (200/200 połączeń zajętych)', status: 'injecting' },
          { id: 'm2', name: 'Wzrost Opóźnień Bazy P99', severity: 'P0', description: 'Skok opóźnienia do 8400ms w zapytaniach transakcyjnych', status: 'injecting' },
        ],
        postMortem: {
          summary: 'Wyciek połączeń w endpointcie analitycznym doprowadził do wysycenia puli połączeń bazy Aurora i paraliżu transakcji.',
          impact: 'Całkowity przestój kasy fiskalnej i koszyka przez 18 minut; utrata szacunkowo 42 000 PLN przychodu.',
          actionItems: [
            'Wdrożyć PgBouncer przed klastrem RDS w trybie transaction pooling.',
            'Odseparować zapytania analityczne na dedykowaną replikę tylko do odczytu (Read-Only Replica).',
            'Wymusić statement_timeout = 2000ms na poziomie roli aplikacji w PostgreSQL.',
          ],
        },
      },
      'oom-reaper': {
        id: 'oom-reaper',
        title: 'Przebudzenie Żniwiarza OOM',
        badge: 'RUNTIME / PAMIĘĆ',
        severity: 'P0',
        description: 'Masowy eksport 2,5 mln zamówień do pliku CSV załadował cały zbiór do bufora RAM Node.js, aktywując mechanizm Linux OOM killer.',
        codeSnippet: `// ❌ PRZEKLĘTY KOD: Ładowanie 2.5GB danych do pamięci podręcznej
app.get('/export/orders.csv', async (req, res) => {
  // BŁĄD: findAll ładuje miliony rekordów do pamięci sterty V8
  const orders = await Order.findAll();
  let csv = 'id,amount,date\\n';
  for (const o of orders) {
    csv += \`\${o.id},\${o.amount},\${o.date}\\n\`;
  }
  res.send(csv);
});`,
        revivedCode: `// ✅ WSKRZESZONY KOD SRE: Strumieniowanie potokowe z przeciwciśnieniem
import { pipeline } from 'stream/promises';
import { Transform } from 'stream';

app.get('/export/orders.csv', async (req, res) => {
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="orders.csv"');

  const dbStream = Order.getCursorStream(); // Kursor bazodanowy
  const csvTransformer = new Transform({
    objectMode: true,
    transform(chunk, encoding, callback) {
      callback(null, \`\${chunk.id},\${chunk.amount},\${chunk.date}\\n\`);
    }
  });

  // Bezpieczny potok strumieniowy — zużycie RAM poniżej 30MB
  await pipeline(dbStream, csvTransformer, res);
});`,
        stackTrace: `FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory
 1: 0xb09c30 node::Abort() [node]
 2: 0xa1c2c3 node::FatalError(char const*, char const*) [node]
 3: 0xcf824e v8::Utils::ReportOOMFailure(v8::internal::Isolate*, char const*, bool) [node]
Killed (core dumped)`,
        timeline: [
          { time: '11:30:15 UTC', label: 'Export Requested', description: 'Użytkownik klika "Eksportuj całą bazę do CSV"' },
          { time: '11:30:42 UTC', label: 'Heap Limit Reached', description: 'Zużycie sterty V8 przekracza 1.4 GB; garbage collector zamraża wątek' },
          { time: '11:30:45 UTC', label: 'SIGKILL Dispatched', description: 'Linux OOM Killer natychmiast ubija proces; kontener restartuje się', isFatal: true },
        ],
        replayerSteps: [
          {
            step: 1,
            timeOffset: '+0.0s [11:30:15 UTC]',
            title: 'Żądanie masowego eksportu CSV',
            description: 'Inicjalizacja zapytania SELECT * bez klauzuli LIMIT ani stronicowania.',
            telemetry: { latencyMs: 50, errorRate: '0.00%', rps: '850' },
            severity: 'P1',
          },
          {
            step: 2,
            timeOffset: '+27s [11:30:42 UTC]',
            title: 'Wyczerpanie sterty V8 (Heap Exhaustion)',
            description: 'Garbage collector V8 pochłania 100% czasu procesora (GC thrashing); RAM > 1.4 GB.',
            telemetry: { latencyMs: 3200, errorRate: '5.1%', rps: '410' },
            severity: 'P1',
          },
          {
            step: 3,
            timeOffset: '+30s [11:30:45 UTC]',
            title: 'Interwencja Linux OOM Killer (Exit Code 137)',
            description: 'System operacyjny przesyła sygnał SIGKILL; zgon procesu roboczego kontenera.',
            telemetry: { latencyMs: 0, errorRate: '100%', rps: '0' },
            severity: 'P0',
          },
        ],
        fiveWhys: [
          'Kontener Node.js zostaje nagle ubity z kodem 137 (SIGKILL) i wpada w pętlę CrashLoopBackOff.',
          'Użytkownik zażądał eksportu 2,5 miliona wierszy historii transakcji do pliku CSV.',
          'Cały zestaw danych został zbuforowany synchronicznie w pamięci RAM w jednym obiekcie Buffer.',
          'Brak mechanizmu strumieniowania danych (Node.js Streams) i brak bufora z przeciwciśnieniem (backpressure).',
          'Wykonywanie ciężkich zadań analitycznych w synchronicznym procesie webowym zamiast w asynchronicznym workerze kolejkowym.',
        ],
        blastRadius: {
          nodes: [
            { id: 'n1', name: 'Pod Workerów Raportów', role: 'Przetwarzanie Danych', status: 'epicenter', statusCode: 'OOM' },
            { id: 'n2', name: 'Klaster Kubernetes', role: 'Orkiestracja', status: 'degraded', statusCode: 'RESTART' },
            { id: 'n3', name: 'Kolejka Zadań Redis', role: 'Broker Wiadomości', status: 'healthy', statusCode: '200 OK' },
            { id: 'n4', name: 'Magazyn Obiektowy S3', role: 'Archiwizacja', status: 'healthy', statusCode: '200 OK' },
          ],
          summary: { epicenterCount: 1, degradedCount: 1, healthyCount: 2 },
        },
        chaosMetrics: [
          { id: 'm1', name: 'Zużycie Pamięci Sterty V8', severity: 'P0', description: 'Przekroczenie limitu 1400MB i alokacja 100% przydziału RAM', status: 'injecting' },
          { id: 'm2', name: 'Wskaźnik Restartów Kontenerów', severity: 'P0', description: 'Trzykrotny restart poda z kodem wyjścia 137 (SIGKILL)', status: 'injecting' },
        ],
        postMortem: {
          summary: 'Nieograniczona alokacja bufora CSV w pamięci RAM wywołała interwencję jądra Linux OOM Killer i zgon poda.',
          impact: 'Restart 4 kluczowych procesów roboczych w klastrze; 5-minutowa niedostępność panelu administracyjnego.',
          actionItems: [
            'Przepisać wszystkie operacje eksportu danych na strumienie Node.js Stream Pipeline.',
            'Wdrożyć asynchroniczny eksport plików z przesyłaniem linku S3 przez kolejkę zadań BullMQ.',
            'Zdefiniować twarde limity zasobów memory requests/limits w manifestach Kubernetes.',
          ],
        },
      },
      'retry-storm': {
        id: 'retry-storm',
        title: 'Kaskadowa Burza Ponowień',
        badge: 'WSPÓŁBIEŻNOŚĆ / SIEĆ',
        severity: 'P1',
        description: 'Natychmiastowe ponowienia bez losowego rozproszenia (jitter) przy 500ms opóźnieniu spotęgowały ruch o 500%, obalając bazy danych.',
        codeSnippet: `// ❌ PRZEKLĘTY KOD: Synchroniczna burza ponowień bez opóźnienia
async function fetchWithRetry(url, retries = 5) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fetch(url);
    } catch (e) {
      // Natychmiastowe ponowienie bez opóźnienia zwielokrotnia obciążenie
    }
  }
}`,
        revivedCode: `// ✅ WSKRZESZONY KOD SRE: Wykładnicze Wycofywanie z Pełnym Jitterem
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
          { time: '18:32:00 UTC', label: 'Spike Inicjalny', description: 'Krótkotrwały wzrost opóźnienia bazy danych do 450ms' },
          { time: '18:33:15 UTC', label: 'Burst Ponowień', description: '5-krotne ponowienia klientów powodują 500% wzrost zapytań RPS' },
          { time: '18:35:00 UTC', label: 'Zapaść Bramki', description: 'Bramka API Edge odrzuca ruch kodem 504 Gateway Timeout', isFatal: true },
        ],
        replayerSteps: [
          {
            step: 1,
            timeOffset: '+0.0s [18:32:00 UTC]',
            title: 'Chwilowa czkawka bazy danych',
            description: 'Pojedyncza blokada tabeli podbija opóźnienie mikroserwisu do 450ms.',
            telemetry: { latencyMs: 450, errorRate: '1.20%', rps: '3.1k' },
            severity: 'P1',
          },
          {
            step: 2,
            timeOffset: '+75s [18:33:15 UTC]',
            title: 'Kaskadowe zwielokrotnienie zapytań (5x Retry)',
            description: 'Brak backoffu powoduje, że 10 000 klientów ponawia żądania jednocześnie.',
            telemetry: { latencyMs: 2400, errorRate: '41.5%', rps: '15.5k' },
            severity: 'P1',
          },
          {
            step: 3,
            timeOffset: '+180s [18:35:00 UTC]',
            title: 'Zapaść Bramki API Edge (504 Storm)',
            description: 'Pamięć kolejki bramki wyczerpuje się; masowo zwracane błędy 504 Gateway Timeout.',
            telemetry: { latencyMs: 9200, errorRate: '94.8%', rps: '1.1k' },
            severity: 'P0',
          },
        ],
        fiveWhys: [
          'Bramka API Edge odrzuca żądania z kodem 504 Gateway Timeout i 100% użyciem procesora.',
          'Krótkotrwały wzrost opóźnienia bazy danych (450ms) wywołał pierwsze przekroczenia limitu czasu.',
          'Klienci HTTP natychmiast powtarzali nieudane zapytania w pętli bez żadnego opóźnienia ani losowości.',
          'Brak algorytmu wykładniczego wycofywania z losowym rozproszeniem (Exponential Backoff with Full Jitter).',
          'Brak adaptacyjnego ogranicznika przepustowości (Rate Limiting) oraz brak globalnego wzorca Circuit Breaker na bramce ingress.',
        ],
        blastRadius: {
          nodes: [
            { id: 'n1', name: 'Bramka API Edge', role: 'Ingress Proxy', status: 'epicenter', statusCode: 'FAIL' },
            { id: 'n2', name: 'Serwis Uwierzytelniania', role: 'Zarządzanie Sesjami', status: 'degraded', statusCode: 'WARN' },
            { id: 'n3', name: 'Transakcyjna Baza Danych', role: 'Baza Główna', status: 'degraded', statusCode: 'WARN' },
            { id: 'n4', name: 'Frontend Client SPA', role: 'Interfejs Klienta', status: 'healthy', statusCode: '200 OK' },
          ],
          summary: { epicenterCount: 1, degradedCount: 2, healthyCount: 1 },
        },
        chaosMetrics: [
          { id: 'm1', name: 'Sztuczne Opóźnienie Brzegowe', severity: 'P1', description: 'Wstrzyknięcie +2500ms opóźnienia na bramce API Gateway', status: 'injecting' },
          { id: 'm2', name: 'Wskaźnik Kaskadowych Błędów 504', severity: 'P1', description: 'Skok wskaźnika odrzuceń do 94.8% żądań ingress', status: 'injecting' },
        ],
        postMortem: {
          summary: 'Liniowa amplifikacja ponowień wywołała samobójczy rozproszony atak odmowy usługi (DoS).',
          impact: 'Serwisy uwierzytelniania i profili odrzuciły 45 000 żądań w oknie 18 minut.',
          actionItems: [
            'Wymuszenie algorytmu Full Jitter z wykładniczym wycofywaniem we wszystkich klientach RPC.',
            'Wdrożenie circuit breakerów odcinających ruch przed nasyceniem bazy.',
            'Konfiguracja adaptacyjnego ograniczania przepustowości na bramce Envoy.',
          ],
        },
      },
      'cors-nightmare': {
        id: 'cors-nightmare',
        title: 'Koszmar Preflight CORS',
        badge: 'SIEĆ / BEZPIECZEŃSTWO',
        severity: 'P1',
        description: 'Brakujące nagłówki CORS na bramce API spowodowały, że wszystkie żądania OPTIONS z innej domeny zakończyły się błędem 403, blokując całe SPA.',
        codeSnippet: `// ❌ PRZEKLĘTY KOD: Sztywne i niekompletne nagłówki CORS
app.use((req, res, next) => {
  // BŁĄD: Brak obsługi metody OPTIONS i brak nagłówka credentials
  res.header('Access-Control-Allow-Origin', 'https://bugmortem.com');
  next();
});`,
        revivedCode: `// ✅ WSKRZESZONY KOD SRE: Pełny pakiet CORS z bezpieczną białą listą
import cors from 'cors';

const allowedOrigins = new Set([
  'https://bugmortem.vercel.app',
  'https://bugmortem.com'
]);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.has(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Niedozwolone przez politykę CORS SRE'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  maxAge: 86400 // Cache preflight na 24h
}));`,
        stackTrace: `Access to fetch at 'https://api.bugmortem.io/v1/auth' from origin 'https://app.bugmortem.io' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.`,
        timeline: [
          { time: '08:00:00 UTC', label: 'Domain Cutover', description: 'Przełączenie aplikacji frontendowej na nową subdomenę app.bugmortem.io' },
          { time: '08:01:20 UTC', label: 'OPTIONS 403', description: 'Przeglądarki wysyłają żądania preflight OPTIONS, które odbijają się od bramki' },
          { time: '08:02:00 UTC', label: 'Full App Lockout', description: '100% użytkowników nie może zalogować się do aplikacji SPA', isFatal: true },
        ],
        replayerSteps: [
          {
            step: 1,
            timeOffset: '+0.0s [08:00:00 UTC]',
            title: 'Wdrożenie frontendu pod nową subdomeną',
            description: 'Ruch przekierowany na domenę app.bugmortem.io; bramka API nie ma zaktualizowanej reguły.',
            telemetry: { latencyMs: 18, errorRate: '0.00%', rps: '4.2k' },
            severity: 'P1',
          },
          {
            step: 2,
            timeOffset: '+80s [08:01:20 UTC]',
            title: 'Odrzucenie zapytań preflight OPTIONS',
            description: 'Przeglądarki wysyłają żądania weryfikacyjne OPTIONS i otrzymują kod 403 Forbidden.',
            telemetry: { latencyMs: 65, errorRate: '58.3%', rps: '4.1k' },
            severity: 'P1',
          },
          {
            step: 3,
            timeOffset: '+120s [08:02:00 UTC]',
            title: 'Całkowita blokada sesji (Full App Lockout)',
            description: 'Brak nagłówka Access-Control-Allow-Origin blokuje wykonanie skryptów w przeglądarkach.',
            telemetry: { latencyMs: 70, errorRate: '100%', rps: '3.8k' },
            severity: 'P0',
          },
        ],
        fiveWhys: [
          'Przeglądarki użytkowników blokują wszystkie żądania API z błędem "CORS policy: No Access-Control-Allow-Origin".',
          'Frontend SPA został zmigrowany na nową subdomenę app.bugmortem.io bez aktualizacji bramki API.',
          'Bramka API odrzucała zapytania preflight HTTP OPTIONS kodem 403 Forbidden zamiast 204 No Content.',
          'Niejawna konfiguracja nagłówków CORS w kodzie aplikacji zamiast scentralizowanej polityki na bramce API.',
          'Brak automatycznych testów dymnych (smoke tests) sprawdzających żądania OPTIONS w procesie Continuous Deployment.',
        ],
        blastRadius: {
          nodes: [
            { id: 'n1', name: 'Bramka API Gateway', role: 'Zarządzanie Ruchem', status: 'epicenter', statusCode: '403' },
            { id: 'n2', name: 'Aplikacja SPA Klienta', role: 'Warstwa Użytkownika', status: 'degraded', statusCode: 'BLOCKED' },
            { id: 'n3', name: 'Mikroserwis Kont', role: 'Logika Biznesowa', status: 'healthy', statusCode: '200 OK' },
            { id: 'n4', name: 'Baza Danych Użytkowników', role: 'Magazyn Danych', status: 'healthy', statusCode: '200 OK' },
          ],
          summary: { epicenterCount: 1, degradedCount: 1, healthyCount: 2 },
        },
        chaosMetrics: [
          { id: 'm1', name: 'Burza Unieważnienia Sesji', severity: 'P1', description: 'Masowe odrzucenie tokenów JWT w zapytaniach cross-origin', status: 'injecting' },
          { id: 'm2', name: 'Wskaźnik Zablokowanych OPTIONS', severity: 'P1', description: '100% żądań preflight zakończonych błędem przeglądarki', status: 'injecting' },
        ],
        postMortem: {
          summary: 'Brak obsługi preflight OPTIONS na bramce po migracji domeny zablokował komunikację SPA z API.',
          impact: 'Całkowity brak możliwości logowania i wykonywania operacji przez 22 minuty.',
          actionItems: [
            'Wdrożyć scentralizowaną konfigurację CORS z buforowaniem preflight (max-age: 86400).',
            'Dodać automatyczne testy dymne preflight CORS w pipeline CI/CD przed przełączeniem DNS.',
            'Zsynchronizować białą listę dozwolonych domen z konfiguracją infrastruktury Terraform.',
          ],
        },
      },
      'serverless-timeout': {
        id: 'serverless-timeout',
        title: 'Zapaść Zimnego Startu Serverless i Timeout Bramki 504',
        badge: 'CHMURA / SERVERLESS',
        severity: 'P0',
        description: 'Inicjalizacja ciężkich połączeń bazy wewnątrz handlera funkcji wywołała kaskadę zimnych startów, przekraczając 29-sekundowy limit bramki API.',
        codeSnippet: `// ❌ PRZEKLĘTY KOD: Ciężka inicjalizacja bazy wewnątrz handlera Lambda
export const handler = async (event: any) => {
  // BŁĄD: Nowe połączenie SSL/TLS nawiązywane przy KAŻDYM wywołaniu funkcji
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: true }
  });
  await client.connect(); // 800ms opóźnienia przy zimnym starcie
  const result = await client.query('SELECT * FROM inventory WHERE id = $1', [event.pathParameters.id]);
  await client.end();
  return { statusCode: 200, body: JSON.stringify(result.rows) };
};`,
        revivedCode: `// ✅ WSKRZESZONY KOD SRE: Ponowne użycie połączenia poza handlerem z RDS Proxy
import { Pool } from 'pg';

// Połączenie zainicjalizowane RAZ poza handlerem — ponowne użycie w ciepłych kontenerach
const pool = new Pool({
  host: process.env.RDS_PROXY_ENDPOINT, // Połączenie przez Amazon RDS Proxy
  max: 1, // Jedno połączenie na kontener serverless
  idleTimeoutMillis: 120000,
  connectionTimeoutMillis: 2000,
});

export const handler = async (event: any) => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      'SELECT id, quantity FROM inventory WHERE id = $1',
      [event.pathParameters.id]
    );
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(result.rows[0] || {})
    };
  } finally {
    client.release();
  }
};`,
        stackTrace: `2026-11-06T12:00:29.001Z d8e4a1b2-9c3f-4e8a Task timed out after 29.03 seconds
Endpoint request timed out
HTTP/1.1 504 Gateway Timeout
{"message": "Endpoint request timed out"}`,
        timeline: [
          { time: '12:00:00 UTC', label: 'Flash Sale Traffic', description: 'Kampania marketingowa wywołuje nagły skok do 5 000 RPS' },
          { time: '12:00:15 UTC', label: '120 Cold Starts', description: 'Dostawca chmury uruchamia równolegle 120 zimnych instancji mikro-kontenerów' },
          { time: '12:00:29 UTC', label: 'Gateway 504 Timeout', description: 'Inicjalizacja puli przekracza 29s; bramka API odcina połączenia z kodem 504', isFatal: true },
        ],
        replayerSteps: [
          {
            step: 1,
            timeOffset: '+0.0s [12:00:00 UTC]',
            title: 'Start kampanii błyskawicznej (Traffic Surge)',
            description: 'Nagły wzrost zapytań o stany magazynowe wymusza skalowanie w górę.',
            telemetry: { latencyMs: 120, errorRate: '0.00%', rps: '4.8k' },
            severity: 'P1',
          },
          {
            step: 2,
            timeOffset: '+15s [12:00:15 UTC]',
            title: 'Kaskada zimnych startów (120 Cold Starts)',
            description: 'Instancje Lambda równolegle bombardują serwer bazy żądaniami handshaku TLS.',
            telemetry: { latencyMs: 4800, errorRate: '22.4%', rps: '3.6k' },
            severity: 'P1',
          },
          {
            step: 3,
            timeOffset: '+29s [12:00:29 UTC]',
            title: 'Przekroczenie limitu bramki API (504 Timeout)',
            description: 'Twardy limit 29s API Gateway uderza w zapytania; 100% żądań zakończonych timeoutem.',
            telemetry: { latencyMs: 29000, errorRate: '100%', rps: '210' },
            severity: 'P0',
          },
        ],
        fiveWhys: [
          'Klienci otrzymują błędy 504 Gateway Timeout po dokładnie 29 sekundach oczekiwania.',
          'Gwałtowny skok ruchu z kampanii wywołał równoległą alokację 120 nowych instancji funkcji serverless.',
          'Każda zimna instancja wykonywała ciężką inicjalizację TLS i otwierała dedykowane połączenie wewnątrz handlera.',
          'Brak ponownego użycia kontekstu wykonania (execution context reuse) oraz brak pośrednika połączeń RDS Proxy.',
          'Brak mechanizmu Provisioned Concurrency dla krytycznych ścieżek oraz brak standardu architektury serverless dla bazy danych.',
        ],
        blastRadius: {
          nodes: [
            { id: 'n1', name: 'Bramka API Gateway', role: 'Ingress Timeout 29s', status: 'epicenter', statusCode: '504' },
            { id: 'n2', name: 'Klaster Lambda Workerów', role: 'Obliczenia Serverless', status: 'degraded', statusCode: 'TIMEOUT' },
            { id: 'n3', name: 'Baza Danych Magazynu', role: 'Instancja PostgreSQL', status: 'degraded', statusCode: 'SATURATED' },
            { id: 'n4', name: 'Koszyk Zakupowy SPA', role: 'Frontend Klienta', status: 'degraded', statusCode: 'ERROR' },
          ],
          summary: { epicenterCount: 1, degradedCount: 3, healthyCount: 0 },
        },
        chaosMetrics: [
          { id: 'm1', name: 'Zimne Starty Serverless P99', severity: 'P0', description: 'Średni czas zimnego startu wzrósł do 29 000ms z powodu kolejki połączeń', status: 'injecting' },
          { id: 'm2', name: 'Wskaźnik Timeoutów Bramki 504', severity: 'P0', description: '100% żądań odrzuconych po przekroczeniu 29 sekund przez API Gateway', status: 'injecting' },
        ],
        postMortem: {
          summary: 'Inicjalizacja połączeń z bazą danych wewnątrz handlera funkcji serverless wywołała kaskadę zimnych startów i timeout bramki API.',
          impact: 'Niemożność sprawdzenia stanu magazynowego produktów przez 14 minut trwania wyprzedaży błyskawicznej.',
          actionItems: [
            'Wyprowadzić inicjalizację klienta bazy danych poza ciało handlera w celu współdzielenia połączenia.',
            'Wdrożyć Amazon RDS Proxy do agregacji i buforowania połączeń serverless.',
            'Skonfigurować Provisioned Concurrency (min. 20 ciepłych instancji) na okres planowanych kampanii marketingowych.',
          ],
        },
      },
    },
  },
  codeSection: {
    cursedTitle: 'SEKCJA KODU: PRZEKLĘTY A WSKRZESZONY KOD',
    resurrectedTitle: 'WSKRZESZONY KOD SRE (BEZPIECZNY WZORZEC)',
    cursedBadge: 'BŁĄD KRYTYCZNY',
    resurrectedBadge: 'WZORZEC: SRE RESILIENCE',
    copyCta: 'Kopiuj Wskrzeszony Kod',
    copied: 'Skopiowano do schowka!',
  },
  stackTrace: {
    title: '>_ SUROWY ŚLAD STOSU (STACK TRACE)',
  },
  timeline: {
    title: '⏱ CHRONOLOGICZNA OŚ CZASU AWARII',
  },
  replayer: {
    title: 'ODTWARZACZ ZAPAŚCI W CZASIE (INCIDENT REPLAYER)',
    subtitle: 'Symuluj przebieg awarii sekunda po sekundzie i obserwuj degradację telemetrii',
    play: 'Odtwórz Zapaść',
    pause: 'Pauza',
    reset: 'Resetuj',
    speed: 'Prędkość',
    stepOf: 'Krok',
    telemetryLatency: 'Opóźnienie P99',
    telemetryErrors: 'Wskaźnik Błędów',
    telemetryRps: 'Przepustowość RPS',
  },
  fiveWhys: {
    sectionTitle: 'DRZEWO PRZYCZYN ŹRÓDŁOWYCH (BLAMELESS 5-WHYS)',
    sectionSubtitle: 'Systemowe śledztwo inżynieryjne od powierzchownego objawu do luki architektonicznej.',
    levels: [
      '1. Objaw Powierzchowny',
      '2. Bezpośredni Wyzwalacz',
      '3. Mechanizm Awarii',
      '4. Luka Architektoniczna',
      '5. Przyczyna Źródłowa',
    ],
    blamelessBadge: 'KULTURA BEZ OBWINIANIA (BLAMELESS SRE)',
    rootCauseBadge: 'PRZYCZYNA ŹRÓDŁOWA (ROOT CAUSE)',
    copyChain: 'Kopiuj Ścieżkę Dochodzenia',
    copied: 'Skopiowano Ścieżkę!',
  },
  blastRadius: {
    title: 'TOPOLOGIA SKAŻENIA ARCHITEKTURY (BLAST RADIUS)',
    subtitle: 'Wizualizacja kaskadowego wektora awarii mikroserwisów i izolacja Pacjenta Zero.',
    legendEpicenter: 'Pacjent Zero (Epicentrum P0)',
    legendDegraded: 'Skażenie Kaskadowe (P1)',
    legendHealthy: 'Węzeł Zdrowy (200 OK)',
    badgeEpicenter: 'EPICENTRUM P0',
    badgeDegraded: 'DEGRADACJA P1',
    badgeHealthy: 'ZDROWE WĘZŁY',
  },
  chaos: {
    sectionTitle: 'PIASKOWNICA INŻYNIERII CHAOSU (LIVE CHAOS SANDBOX)',
    sectionSubtitle: 'Wstrzykuj awarie w czasie rzeczywistym i obserwuj kaskadową reakcję telemetrii',
    btnMitigate: 'Uruchom Samoleczenie',
    btnInject: 'Wstrzyknij awarię',
    statusNominal: 'SYSTEM NOMINALNY',
    metricRps: 'PRZEPUSTOWOŚĆ',
    metricLatency: 'OPÓŹNIENIE P99',
    metricErrorRate: 'WSKAŹNIK BŁĘDÓW',
    scenarioLatencyTitle: 'Skok opóźnień brzegowych (Latency Spike)',
    scenarioLatencyDesc: 'Sztuczne opóźnienie +2500ms na Edge Gateway, powodujące timeouty w UI',
    scenarioDbPoolTitle: 'Nasycenie puli bazy danych (DB Pool Saturation)',
    scenarioDbPoolDesc: '100% wykorzystania połączeń PostgreSQL, kaskada błędów 503',
    scenarioMemoryTitle: 'Wyciek pamięci (Heap OOM Leak)',
    scenarioMemoryDesc: 'Eksponencjalny wzrost zużycia RAM w puli workerów asynchronicznych',
    scenarioAuthStormTitle: 'Burza unieważnienia sesji (Auth Storm)',
    scenarioAuthStormDesc: 'Zmasowane odrzucenia tokenów JWT i lawina żądań ponownego logowania',
  },
  chaosSandbox: {
    title: 'PIASKOWNICA INŻYNIERII CHAOSU (LIVE CHAOS SANDBOX)',
    subtitle: 'Wstrzykuj awarie w czasie rzeczywistym i obserwuj kaskadową reakcję telemetrii',
    nominalStatus: 'SYSTEM NOMINALNY',
    activeStatus: 'WSTRZYKIWANIE CHAOSU W TOKU',
    metricThroughput: 'PRZEPUSTOWOŚĆ',
    metricP99: 'OPÓŹNIENIE P99',
    metricErrorRate: 'WSKAŹNIK BŁĘDÓW',
    injectCta: 'Wstrzyknij awarię',
    recoveringCta: 'Samoleczenie...',
  },
  postMortem: {
    title: 'OFICJALNY RAPORT SEKCJI ZWŁOK INCYDENTU',
    executiveSummary: 'PODSUMOWANIE WYKONAWCZE',
    blastRadiusImpact: 'PROMIEŃ RAŻENIA I WPŁYW BIZNESOWY',
    actionItems: 'DZIAŁANIA PREWENCYJNE I NAPRAWCZE',
    escalateOnCall: 'Eskalacja On-Call',
    listenCoroner: 'Odsłuchaj Werdykt Koronera',
    exportMarkdown: 'Eksportuj Raport do Markdown',
    downloadCertificate: 'Pobierz Kartę Zgonu (PDF)',
  },
  dispatcher: {
    openBtn: 'Eskalacja On-Call',
  },
  dispatcherModal: {
    title: 'CENTRALA ESKALACJI INCYDENTU ON-CALL',
    subtitle: 'Natychmiastowe powiadomienie inżynierów dyżurnych i utworzenie wojennego pokoju awarii',
    severityLabel: 'PRIORYTET AWARII',
    serviceLabel: 'DOTKNIĘTY KOMPONENT',
    commanderLabel: 'DOWÓDCA INCYDENTU (INCIDENT COMMANDER)',
    channelLabel: 'KANAŁ INCYDENTU SLACK',
    zoomLinkLabel: 'POKÓJ WOJENNY (WAR ROOM)',
    jiraTicketLabel: 'BILET SRE JIRA',
    statusPageLabel: 'KOMUNIKAT STATUSPAGE',
    copySummaryCta: 'Kopiuj Raport Eskalacji',
    copiedNotice: 'Skopiowano do schowka!',
    dispatchPagingCta: 'Wyślij PagerDuty Alarm (P0)',
    pagingTriggered: 'Syrena PagerDuty wysłana!',
    closeCta: 'Zamknij Konsolę',
  },
  legal: {
    privacyTitle: 'Polityka Prywatności & Suwerenność Danych',
    termsTitle: 'Regulamin Świadczenia Usług (Terms of Service)',
    cookiesTitle: 'Polityka Ciasteczek & Pamięci Lokalnej',
    lastUpdated: 'Ostatnia aktualizacja: Listopad 2026 | Oficjalne Zgłoszenie Kiroween 2026',
    privacyArchHeader: '1. Architektura Zero-Data Leakage (Przetwarzanie Lokalne)',
    privacyArchText: 'BugMortem został zaprojektowany z myślą o bezwzględnej poufności danych telemetrycznych oraz kodu źródłowego. Wszelkie analizy sekcji zwłok awarii, parsowanie śladów stosu (stack trace), generowanie raportów post-mortem oraz synteza dźwięku telemetrycznego odbywają się w 100% po stronie Twojej przeglądarki.',
    privacyArchBullets: [
      'Żadne wrażliwe logi produkcyjne, hasła ani fragmenty kodu nie opuszczają Twojego urządzenia.',
      'Aplikacja nie posiada backendu bazodanowego zapisującego Twoje zgłoszenia.',
      'Generowanie certyfikatów zgonu w formacie PDF oraz eksport Markdown zachodzi lokalnie w silniku przeglądarki.',
    ],
    privacyAdminHeader: '2. Administrator Danych i Projekt',
    privacyAdminText: 'Aplikacja stanowi niezależny projekt inżynieryjny stworzony przez Adama Gierczaka (@AdamBabinicz) na hackathon Kiroween 2026 (organizowany przez AWS & Devpost).',
    privacyScopeHeader: '3. Zakres Przetwarzanych Informacji',
    privacyScopeText: 'BugMortem nie gromadzi danych osobowych, adresów e-mail ani numerów IP. Jedyne informacje, które są zapisywane, to parametry sesji przechowywane w pamięci podręcznej Twojej przeglądarki (localStorage).',
    privacyLocalStorageHeader: '4. Wykorzystanie Pamięci Przeglądarki (LocalStorage)',
    privacyLocalStorageIntro: 'Poniższa tabela przedstawia wszystkie klucze wykorzystywane przez aplikację:',
    privacyLocalStorageKeys: [
      { key: 'bugmortem_custom_incidents', desc: 'Zapisane przez Ciebie własne awarie i sekcje zwłok wprowadzone przez formularz.' },
      { key: 'bugmortem_theme', desc: 'Wybrany motyw kolorystyczny (Dracula Morgue lub Clinical Daylight).' },
      { key: 'bugmortem_locale', desc: 'Preferowany język interfejsu (Polski / English).' },
      { key: 'bugmortem_audio_muted', desc: 'Ustawienie wyciszenia proceduralnej aparatury telemetrycznej EKG.' },
    ],
    privacyNoTrackingHeader: '5. Brak Ciasteczek Śledzących i Analityki',
    privacyNoTrackingText: 'Aplikacja nie korzysta z żadnych zewnętrznych skryptów śledzących (brak Google Analytics 4, Hotjar, Facebook Pixel ani telemetrii marketingowej).',
    privacyNoTrackingBullets: [
      'Brak fingerprintingu przeglądarki.',
      'Brak profilowania użytkowników.',
      'Zgodność ze standardem Consent Mode v2 (domyślnie zablokowane wszystkie tagi śledzące).',
    ],
    privacyUserRightsHeader: '6. Prawa Użytkownika',
    privacyUserRightsText: 'Posiadasz pełną suwerenność nad swoimi danymi. Możesz w każdej chwili usunąć własne incydenty bezpośrednio z poziomu kafelków archiwum lub całkowicie wyczyścić pamięć podręczną aplikacji.',
    privacyUserRightsBullets: [
      'Prawo do natychmiastowego usunięcia wpisów przyciskiem kosza w archiwum.',
      'Prawo do pobrania wygenerowanych raportów w otwartym formacie Markdown.',
    ],
    privacyPurgeHeader: '7. Całkowite Czyszczenie Danych',
    privacyPurgeText: 'Wyczyszczenie pamięci podręcznej przeglądarki lub kliknięcie przycisku „Wyczyść własne awarie” bezpowrotnie i trwale usuwa wszelkie zapisane incydenty z Twojego urządzenia.',
    termsScopeHeader: '1. Postanowienia Ogólne i Przeznaczenie',
    termsScopeText: 'BugMortem jest interaktywnym narzędziem edukacyjno-diagnostycznym SRE, stworzonym w celu demonstracji zaawansowanych wzorców odporności systemów rozproszonych, analizy przyczyn źródłowych metodą 5-Whys oraz automatyzacji raportów post-mortem.',
    termsGeneralHeader: '2. Warunki Korzystania',
    termsGeneralText: 'Korzystanie z aplikacji jest całkowicie bezpłatne. Użytkownik ma prawo do wprowadzania własnych śladów stosu, symulowania scenariuszy chaosu oraz pobierania wygenerowanych skryptów infrastruktury jako kodu (IaC).',
    termsDisclaimerHeader: '3. Klauzula Wyłączenia Odpowiedzialności SRE',
    termsDisclaimerIntro: 'Mimo że generowane recepty SRE i szablony IaC (Terraform, Kubernetes, AWS SAM, PgBouncer, ESLint) bazują na sprawdzonych wzorcach produkcyjnych:',
    termsDisclaimerPoints: [
      'Wszelkie wygenerowane skrypty i recepty należy zweryfikować w środowisku testowym (staging) przed wdrożeniem na produkcję.',
      'Autor aplikacji nie ponosi odpowiedzialności za ewentualne przerwy w działaniu zewnętrznych systemów wynikające z bezpośredniego wdrożenia generowanych szablonów.',
      'Narzędzie służy celom szkoleniowym, symulacyjnym i forensicznym.',
    ],
    termsLiabilityHeader: '4. Dostępność Usługi',
    termsLiabilityText: 'Aplikacja jest hostowana statycznie na platformie Vercel Edge. Autor dokłada starań, aby narzędzie było dostępne nieprzerwanie, jednak nie udziela gwarancji SLA na dostępność interfejsu.',
    licenseHeader: '5. Licencja i Prawa Autorskie',
    licenseText: 'Kod źródłowy projektu BugMortem udostępniony jest na warunkach licencji open-source MIT.',
    licenseBullets: [
      'Możesz swobodnie analizować, forkowywać i adaptować wzorce SRE zawarte w repozytorium.',
      'Wszelkie prawa autorskie do projektu należą do Adama Gierczaka (@AdamBabinicz).',
    ],
    cookiesUsageHeader: '1. Brak Ciasteczek Śledzących (Zero Tracking Cookies)',
    cookiesUsageText: 'BugMortem nie zapisuje ani nie odczytuje żadnych ciasteczek (cookies) stron trzecich o charakterze marketingowym, reklamowym lub śledzącym. Jedynym mechanizmem zapisu danych sesyjnych jest lokalna pamięć przeglądarki (localStorage), która nigdy nie jest przesyłana przez sieć.',
  },
  footer: {
    disclaimer: '© 2026 BugMortem. Wszelkie prawa zastrzeżone. Stworzone przez Adama Gierczaka (@AdamBabinicz) na hackathon Kiroween 2026 (AWS & Devpost).',
    privacy: 'Polityka Prywatności',
    terms: 'Regulamin',
    cookieSettings: 'Ustawienia Cookies',
  },
};