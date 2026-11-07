import { TranslationDictionary } from '../types';

export const pl: TranslationDictionary = {
  common: {
    close: 'Zamknij',
  },
  hero: {
    badge: 'PROJEKT NA HACKATHON KIROWEEN 2026',
    title: 'BugMortem – Sekcja Zwłok AI i Studio Post-Mortem SRE',
    subtitle: 'Kryminalistyczna analiza powłamaniowa i zautomatyzowane wzorce odporności dla katastrofalnych awarii produkcyjnych.',
    inputCta: '+ WPROWADŹ WŁASNĄ AWARIĘ',
    statusActive: 'Aktywny Incydent (P0 Krytyczny)',
    statusStable: 'System Nominalny (200 OK)',
  },
  navigation: {
    langPl: 'Polski (PL)',
    langEn: 'English (EN)',
    toggleTheme: 'Zmień Motyw',
  },
  presets: {
    sectionTitle: 'ARCHIWUM SEKCJI ZWŁOK AWARII',
    items: {
      'react-hydration': {
        id: 'react-hydration',
        title: 'Niezgodność Hydratacji Reacta i Zapaść Drzewa DOM',
        badge: 'FRONTEND / SSR',
        severity: 'P0',
        description: 'Niestabilne użycie new Date() lub dostęp do obiektu window podczas SSR wyzwala Błąd Reacta #418, całkowicie niszcząc interaktywność klienta.',
        codeSnippet: `// ❌ PRZEKLĘTY KOD: Niestabilna ewaluacja znacznika czasu podczas SSR
export default function ClockBanner() {
  // BŁĄD: new Date() generuje inne znaczniki na serwerze i u klienta
  const time = new Date().toLocaleTimeString();
  return <div className="banner">Ostatnia synchronizacja: {time}</div>;
}`,
        revivedCode: `// ✅ WSKRZESZONY KOD SRE: Dwufazowa hydratacja z flagą mounted
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
          { time: '14:02:11 UTC', label: 'Wygenerowano HTML na serwerze', desc: 'Serwer SSR zwraca statyczny kod z czasem 14:02:11' },
          { time: '14:02:12 UTC', label: 'Hydratacja pakietu w przeglądarce', desc: 'Przeglądarka wykonuje kod JS o 14:02:12, powodując rozbieżność czasu' },
          { time: '14:02:12 UTC', label: 'Odpięcie drzewa DOM', desc: 'React rzuca błąd #418 i zastępuje stronę białym ekranem', isFatal: true }
        ],
        replayerSteps: [
          {
            step: 1,
            timeOffset: '+0.0s',
            title: 'Generowanie dokumentu SSR na krawędzi',
            description: 'Serwer brzegowy ewaluuje new Date() i strumieniuje kod HTML ze znacznikiem 14:02:11.',
            telemetry: { latencyMs: 42, errorRate: '0.00%', rps: '14.2k' },
            severity: 'P1'
          },
          {
            step: 2,
            timeOffset: '+0.8s',
            title: 'Próba powiązania hydratacji klienta',
            description: 'Pakiet przeglądarkowy wykonuje się o 14:02:12. Suma kontrolna różni się od serwera.',
            telemetry: { latencyMs: 380, errorRate: '8.4%', rps: '11.8k' },
            severity: 'P1'
          },
          {
            step: 3,
            timeOffset: '+1.2s',
            title: 'Desynchronizacja DOM i Zapaść UI',
            description: 'Błąd React #418 odmontowuje interaktywne drzewo. Przyciski koszyka przestają reagować.',
            telemetry: { latencyMs: 1420, errorRate: '84.6%', rps: '2.1k' },
            severity: 'P0'
          }
        ],
        fiveWhys: [
          'Aplikacja webowa rzuca wyjątek "Minified React error #418" i odmontowuje interaktywne drzewo DOM klienta.',
          'Komponent wywołuje new Date().toLocaleTimeString() bezpośrednio w ciele renderowanego kodu JSX.',
          'Suma kontrolna wyrenderowanego przez serwer kodu HTML różni się od początkowego drzewa wyrenderowanego przez przeglądarkę.',
          'Brak granicy wykonania po stronie klienta (brak flagi stanu zamontowania mounted lub blokady w useEffect).',
          'Brak reguł ESLint SSR i zautomatyzowanych testów regresyjnych hydratacji w procesie CI/CD.'
        ],
        blastRadius: {
          nodes: [
            { id: 'client-spa', name: 'client-spa', role: 'Frontend Next.js', status: 'epicenter', statusCode: 'FAIL' },
            { id: 'edge-gateway', name: 'edge-gateway', role: 'Sieć Vercel Edge', status: 'degraded', statusCode: 'WARN' },
            { id: 'auth-service', name: 'auth-service', role: 'Sesje JWT / Auth', status: 'healthy', statusCode: '200 OK' },
            { id: 'database', name: 'database', role: 'Neon Postgres', status: 'healthy', statusCode: '200 OK' },
            { id: 'worker-pool', name: 'worker-pool', role: 'Kolejka w Tle', status: 'healthy', statusCode: '200 OK' }
          ],
          summary: { epicenterCount: 1, degradedCount: 1, healthyCount: 3 }
        },
        chaosMetrics: [
          { id: 'cm-1', name: 'Integralność Drzewa DOM', severity: 'P0', description: 'Wykryto niezgodność między węzłami SSR a CSR', status: 'injecting' },
          { id: 'cm-2', name: 'Czas do Interaktywności (TTI)', severity: 'P1', description: 'Nasłuchiwacze zdarzeń zawieszone po błędzie', status: 'injecting' },
          { id: 'cm-3', name: 'Konwersja Koszyka Zakupowego', severity: 'P0', description: 'Przycisk zamówienia zamrożony dla 12% użytkowników', status: 'injecting' }
        ],
        postMortem: {
          summary: 'Niestabilne znaczniki czasu w komponentach serwerowych wywołały masowe błędy hydratacji React #418.',
          impact: '12% odwiedzających doświadczyło zamrożenia interfejsu i utraty danych z formularza zamówienia.',
          actionItems: [
            'Wdrożyć dwufazową flagę mounted we wszystkich komponentach zależnych od czasu.',
            'Zaimplementować regułę ESLint zakazującą new Date() i Math.random() w kodzie renderowanym po stronie serwera.',
            'Dodać automatyczne testy dymne Playwright SSR do głównego rurociągu integracji ciągłej (CI).'
          ]
        }
      },
      'connection-pool': {
        id: 'connection-pool',
        title: 'Śmiertelna Spirala Puli Połączeń',
        badge: 'DATABASE / AURORA',
        severity: 'P0',
        description: 'Niezindeksowane zapytania analityczne wyczerpały limit 200 połączeń w klastrze Amazon RDS Aurora, paraliżując wątki transakcyjne procesu zakupowego.',
        codeSnippet: `// ❌ PRZEKLĘTY KOD: Niekontrolowany wyciek połączeń do bazy danych
export async function getAnalyticsReport(userId: string) {
  // BŁĄD: Bezpośrednie połączenie bez limitu czasu i bez zwrotu do puli
  const client = await pool.connect();
  const query = 'SELECT * FROM orders WHERE user_id = $1 ORDER BY timestamp DESC';
  const result = await client.query(query, [userId]);
  // Brak wywołania client.release() w blokach błędów powoduje śmierć puli
  return result.rows;
}`,
        revivedCode: `// ✅ WSKRZESZONY KOD SRE: Połączenie z menedżerem kontekstu i twardym timeoutem
export async function getAnalyticsReport(userId: string) {
  const client = await pool.connect();
  try {
    // Ustawienie rygorystycznego limitu czasu wykonania zapytania
    await client.query('SET statement_timeout = 2000');
    const query = 'SELECT id, total, status FROM orders WHERE user_id = $1 ORDER BY timestamp DESC LIMIT 50';
    const result = await client.query(query, [userId]);
    return result.rows;
  } finally {
    // Gwarantowany zwrot połączenia do puli w bloku finally
    client.release();
  }
}`,
        stackTrace: `FATAL: remaining connection slots are reserved for non-replication superuser connections
    at Connection.parseE (pg-protocol/dist/parser.js:369)
    at Connection.parseMessage (pg-protocol/dist/parser.js:121)
    at Socket.<anonymous> (pg-protocol/dist/index.js:11)
    at TCP.onStreamRead (node:net:561)`,
        timeline: [
          { time: '03:14:00 UTC', label: 'Napływ ciężkich zapytań', desc: 'Harmonogram zadań uruchamia niezindeksowany raport analityczny' },
          { time: '03:14:22 UTC', label: 'Nasycenie puli bazy', desc: 'Liczba aktywnych połączeń rośnie z 40 do sufitu 200/200' },
          { time: '03:14:45 UTC', label: 'Kaskada błędów koszyka', desc: 'Transakcje w sklepie zaczynają masowo zwracać błąd 503', isFatal: true }
        ],
        replayerSteps: [
          {
            step: 1,
            timeOffset: '+0.0s',
            title: 'Uruchomienie raportu wsadowego',
            description: 'Nocne zadanie analityczne wysyła 80 równoległych zapytań skanujących całe tabele.',
            telemetry: { latencyMs: 84, errorRate: '0.00%', rps: '16.5k' },
            severity: 'P1'
          },
          {
            step: 2,
            timeOffset: '+12.0s',
            title: 'Osiągnięcie limitu połączeń',
            description: 'Limit max_connections (200/200) wyczerpany. Pakiety sprawdzające stan zdrowia zawieszają się.',
            telemetry: { latencyMs: 2450, errorRate: '34.2%', rps: '7.1k' },
            severity: 'P1'
          },
          {
            step: 3,
            timeOffset: '+29.0s',
            title: 'Zapaść kaskadowa bazy danych',
            description: 'Automatyczne przełączenie repliki zawodzi. Mikroserwisy rzucają błędy FATAL connection slots.',
            telemetry: { latencyMs: 12800, errorRate: '98.4%', rps: '820' },
            severity: 'P0'
          }
        ],
        fiveWhys: [
          'Interfejs API zamówień zwraca błąd 503 Service Unavailable dla wszystkich transakcji koszyka.',
          'Serwer PostgreSQL odrzuca nowe połączenia komunikatem "remaining connection slots reserved".',
          'Wsadowy raport analityczny otworzył setki niezindeksowanych połączeń i zablokował tabele.',
          'Brak proxy zarządzającego pulą połączeń (PgBouncer) między mikroserwisami a klastrem Aurora.',
          'Brak limitów czasu dla zapytań (statement_timeout) i brak wydzielonej repliki tylko do odczytu.'
        ],
        blastRadius: {
          nodes: [
            { id: 'client-spa', name: 'client-spa', role: 'Klient WWW', status: 'degraded', statusCode: 'WARN' },
            { id: 'edge-gateway', name: 'edge-gateway', role: 'Brama Kong', status: 'degraded', statusCode: '503' },
            { id: 'auth-service', name: 'auth-service', role: 'Klaster Logowania', status: 'degraded', statusCode: 'FAIL' },
            { id: 'database', name: 'database', role: 'Aurora Postgres Primary', status: 'epicenter', statusCode: 'FATAL' },
            { id: 'worker-pool', name: 'worker-pool', role: 'Kolejka Celery', status: 'degraded', statusCode: 'FAIL' }
          ],
          summary: { epicenterCount: 1, degradedCount: 4, healthyCount: 0 }
        },
        chaosMetrics: [
          { id: 'cm-db-1', name: 'Aktywne Połączenia Aurora', severity: 'P0', description: 'Wykorzystanie puli osiągnęło 100% pojemności', status: 'injecting' },
          { id: 'cm-db-2', name: 'Wskaźnik Wycoﬁanych Transakcji', severity: 'P0', description: 'Ponad 85% zamówień zostało anulowanych przez błąd bazy', status: 'injecting' }
        ],
        postMortem: {
          summary: 'Wyczerpanie puli połączeń bazy danych doprowadziło do paraliżu autoryzacji i składania zamówień.',
          impact: '48 minut pełnej niedostępności koszyka zakupowego; szacowana strata przychodu: 42 000 USD.',
          actionItems: [
            'Wdrożyć proxy PgBouncer w trybie poolingu transakcyjnego z limitem 5000 połączeń klienckich.',
            'Wymusić statement_timeout = 2500ms dla wszystkich nieadministracyjnych ról bazodanowych.',
            'Przenieść zapytania analityczne na odizolowaną replikę read-only.'
          ]
        }
      },
      'oom-reaper': {
        id: 'oom-reaper',
        title: 'Przebudzenie Żniwiarza Pamięci OOM',
        badge: 'RUNTIME / MEMORY',
        severity: 'P0',
        description: 'Masowy eksport 2,5 miliona zamówień do pliku CSV zaalokował cały zbiór danych w stercie Node.js, wyzwalając ubicie procesu przez jądro Linuksa.',
        codeSnippet: `// ❌ PRZEKLĘTY KOD: Ładowanie nieograniczonego zbioru danych do sterty V8
export async function exportAllOrders() {
  const allOrders = await db.orders.findMany(); // 2,5 mln rekordów do pamięci RAM
  let csv = 'id,total,created_at\\n';
  for (const order of allOrders) {
    csv += \`\${order.id},\${order.total},\${order.createdAt}\\n\`;
  }
  return csv;
}`,
        revivedCode: `// ✅ WSKRZESZONY KOD SRE: Potok strumieniowy z regulacją ciśnienia (Backpressure)
import { pipeline } from 'stream/promises';
import { Transform } from 'stream';

export async function exportAllOrders(writeStream: NodeJS.WritableStream) {
  const dbCursor = db.orders.findManyCursor();
  
  const toCsvRow = new Transform({
    objectMode: true,
    transform(order, _, callback) {
      callback(null, \`\${order.id},\${order.total},\${order.createdAt}\\n\`);
    }
  });

  await pipeline(dbCursor, toCsvRow, writeStream);
}`,
        stackTrace: `<--- Ostatnie cykle GC --->
[1:0x55d49a0]    14820 ms: Mark-sweep (reduce) 2041.4 (2082.1) -> 2040.2 (2082.1) MB, 842.1 / 0.0 ms
[1:0x55d49a0]    15710 ms: Mark-sweep (reduce) 2040.2 (2082.1) -> 2039.8 (2082.1) MB, 890.0 / 0.0 ms

<--- Zrzut sterty JS --->
FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory
1: 0xb09c10 node::Abort() [node]
2: 0xa1c28f node::FatalError(char const*, char const*) [node]`,
        timeline: [
          { time: '11:45:00 UTC', label: 'Zlecenie eksportu', desc: 'Administrator uruchamia kwartalny zrzut 2,5 mln transakcji' },
          { time: '11:45:14 UTC', label: 'Zapełnienie sterty pamięci', desc: 'Zużycie pamięci V8 osiąga limit 2048 MB; GC zużywa 98% CPU na sprzątanie' },
          { time: '11:45:16 UTC', label: 'Sygnał SIGKILL z jądra', desc: 'Linux OOM killer natychmiast ubija proces Node.js z kodem wyjścia 137', isFatal: true }
        ],
        replayerSteps: [
          {
            step: 1,
            timeOffset: '+0.0s',
            title: 'Zlecenie pobrania rejestru',
            description: 'Użytkownik z uprawnieniami administratora żąda pełnego pliku CSV z transakcjami.',
            telemetry: { latencyMs: 65, errorRate: '0.00%', rps: '15.1k' },
            severity: 'P1'
          },
          {
            step: 2,
            timeOffset: '+8.4s',
            title: 'Zbliżanie się do granicy RAM',
            description: 'Sterta V8 przekracza 1.8 GB. Proces przestaje odpowiadać z powodu przerw na garbage collection.',
            telemetry: { latencyMs: 1820, errorRate: '18.9%', rps: '8.4k' },
            severity: 'P1'
          },
          {
            step: 3,
            timeOffset: '+16.2s',
            title: 'Ubicie procesu SIGKILL 137',
            description: 'Mechanizm OOM Linuksa zabija kontener. Pod przechodzi w pętlę CrashLoopBackOff.',
            telemetry: { latencyMs: 6400, errorRate: '62.1%', rps: '2.4k' },
            severity: 'P0'
          }
        ],
        fiveWhys: [
          'Węzeł roboczy uległ awarii i wpadł w niekończącą się pętlę CrashLoopBackOff.',
          'Jądro systemu Linux wysłało sygnał SIGKILL (kod wyjścia 137) do procesu Node.js.',
          'Środowisko wykonawcze V8 osiągnęło twardy sufit alokacji sterty wynoszący 2 GB.',
          'Funkcja eksportu próbowała zbuforować 2,5 miliona obiektów bazy danych do jednego ciągu tekstowego w pamięci RAM.',
          'Brak obsługi potoków strumieniowych (backpressure) oraz brak stronicowania zapytań w obsłudze eksportu.'
        ],
        blastRadius: {
          nodes: [
            { id: 'client-spa', name: 'client-spa', role: 'Panel Zarządzania', status: 'degraded', statusCode: 'WARN' },
            { id: 'edge-gateway', name: 'edge-gateway', role: 'Brama API', status: 'healthy', statusCode: '200 OK' },
            { id: 'auth-service', name: 'auth-service', role: 'Serwis Logowania', status: 'healthy', statusCode: '200 OK' },
            { id: 'database', name: 'database', role: 'Baza Danych', status: 'healthy', statusCode: '200 OK' },
            { id: 'worker-pool', name: 'worker-pool', role: 'Węzeł Zadań Asynchronicznych', status: 'epicenter', statusCode: 'CRASH' }
          ],
          summary: { epicenterCount: 1, degradedCount: 1, healthyCount: 3 }
        },
        chaosMetrics: [
          { id: 'cm-oom-1', name: 'Zużycie Sterty Node (MB)', severity: 'P0', description: '2048 / 2048 MB zajęte', status: 'injecting' },
          { id: 'cm-oom-2', name: 'Paraliż Garbage Collector', severity: 'P0', description: '98% czasu procesora poświęcane na próby zwolnienia pamięci', status: 'injecting' }
        ],
        postMortem: {
          summary: 'Ładowanie 2,5 mln rekordów do pamięci RAM doprowadziło do przepełnienia sterty i ubicia procesu przez OOM Killera.',
          impact: 'Pula workerów w tle została sparaliżowana; przetwarzanie faktur opóźnione o 3 godziny.',
          actionItems: [
            'Zastąpić ładowanie tablic do RAM strumieniami stream.pipeline i transformatorami CSV.',
            'Skonfigurować limity pamięci w Kubernetes z progiem ostrzegawczym przy 75% zużycia.',
            'Wprowadzić obowiązkowe stronicowanie kursorowe na wszystkich endpointach eksportu danych.'
          ]
        }
      },
      'retry-storm': {
        id: 'retry-storm',
        title: 'Kaskadowa Burza Ponowień',
        badge: 'CONCURRENCY / NETWORK',
        severity: 'P1',
        description: 'Błyskawiczne ponowienia bez losowego rozrzutu czasu (jitter) podczas 500ms skoku opóźnienia zwielokrotniły ruch o 500%, kładąc bazę.',
        codeSnippet: `// ❌ PRZEKLĘTY KOD: Natychmiastowa pętla ponowień bez rozrzutu czasu
async function fetchWithRetry(url: string, attempts = 5) {
  for (let i = 0; i < attempts; i++) {
    try {
      return await fetch(url);
    } catch (err) {
      // BŁĄD: Równoczesne ponawianie zapytań dobija leżący serwer
      await new Promise(r => setTimeout(r, 100));
    }
  }
}`,
        revivedCode: `// ✅ WSKRZESZONY KOD SRE: Wykładnicze opóźnienie z pełnym szumem losowym
async function fetchWithFullJitter(url: string, maxAttempts = 3, baseDelay = 100) {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      const res = await fetch(url);
      if (res.ok) return res;
      if (res.status < 500) throw new Error(\`Błąd klienta: \${res.status}\`);
    } catch (err) {
      if (attempt === maxAttempts - 1) throw err;
      // Wzór na wykładnicze opóźnienie z pełnym jitterem
      const maxBackoff = baseDelay * (2 ** attempt);
      const sleep = Math.random() * maxBackoff;
      await new Promise(r => setTimeout(r, sleep));
    }
  }
}`,
        stackTrace: `HTTP/1.1 429 Too Many Requests
Date: Fri, 06 Nov 2026 14:22:01 GMT
Retry-After: 30
X-RateLimit-Remaining: 0
X-Throttling-Reason: Global upstream connection queue capacity exceeded (10,000 / 10,000)`,
        timeline: [
          { time: '14:22:00 UTC', label: '500ms skok opóźnienia', desc: 'Chwilowa utrata pakietów powoduje pierwsze błędy w aplikacjach mobilnych' },
          { time: '14:22:01 UTC', label: 'Fala 10x większego ruchu', desc: '150 000 klientów jednocześnie ponawia zapytanie dokładnie po 100 ms' },
          { time: '14:22:05 UTC', label: 'Globalna blokada bramy', desc: 'Bramy API włączają dławienie ruchu, odrzucając 92% żądań', isFatal: true }
        ],
        replayerSteps: [
          {
            step: 1,
            timeOffset: '+0.0s',
            title: 'Chwilowe opóźnienie serwera',
            description: 'Przełączenie tras sieciowych generuje 400ms opóźnienia na bramie brzegowej.',
            telemetry: { latencyMs: 410, errorRate: '1.2%', rps: '14.0k' },
            severity: 'P1'
          },
          {
            step: 2,
            timeOffset: '+0.5s',
            title: 'Fala synchronicznych powtórzeń',
            description: 'Klienci bez opóźnień losowych odpalają 5 jednoczesnych prób, mnożąc ruch 5-krotnie.',
            telemetry: { latencyMs: 2540, errorRate: '14.8%', rps: '8.1k' },
            severity: 'P1'
          },
          {
            step: 3,
            timeOffset: '+2.1s',
            title: 'Dławienie na bramie brzegowej',
            description: 'Kolejki przepełnione. Ograniczniki przepustowości ucinają 90% zapytań błędem HTTP 429.',
            telemetry: { latencyMs: 4800, errorRate: '48.9%', rps: '3.2k' },
            severity: 'P1'
          }
        ],
        fiveWhys: [
          'Usługi nadrzędne dławią ruch zwracając błąd HTTP 429 Too Many Requests.',
          'Liczba zapytań na bramie API wzrosła skokowo z 14k RPS do ponad 70k RPS w 2 sekundy.',
          'Krótkotrwałe 500ms zakłócenie sieci wywołało pętle automatycznych ponowień we wszystkich aplikacjach.',
          'Aplikacje klienckie posiadały sztywne ponawianie co 100ms bez elementu losowego.',
          'Brak algorytmu Exponential Backoff z pełnym jitterem oraz brak wyłączników Circuit Breaker po stronie klienta.'
        ],
        blastRadius: {
          nodes: [
            { id: 'client-spa', name: 'client-spa', role: 'Aplikacje Klientów', status: 'degraded', statusCode: '429' },
            { id: 'edge-gateway', name: 'edge-gateway', role: 'Krawędź Cloudflare', status: 'epicenter', statusCode: 'THROTTLE' },
            { id: 'auth-service', name: 'auth-service', role: 'Serwis Autoryzacji', status: 'degraded', statusCode: 'WARN' },
            { id: 'database', name: 'database', role: 'Baza RDS', status: 'degraded', statusCode: 'WARN' },
            { id: 'worker-pool', name: 'worker-pool', role: 'Kolejka Zadań', status: 'healthy', statusCode: '200 OK' }
          ],
          summary: { epicenterCount: 1, degradedCount: 3, healthyCount: 1 }
        },
        chaosMetrics: [
          { id: 'cm-rs-1', name: 'Mnożnik Ruchu Wejściowego', severity: 'P1', description: '5,2x powyżej średniej', status: 'injecting' },
          { id: 'cm-rs-2', name: 'Wskaźnik Odrzuconych Pakietów', severity: 'P1', description: '89,4% zapytań zablokowanych na krawędzi', status: 'injecting' }
        ],
        postMortem: {
          summary: 'Krótkotrwałe opóźnienie serwera przerodziło się w lawinową burzę ponowień z powodu braku losowego opóźnienia.',
          impact: 'Brama sieciowa blokowała ruch przez 14 minut, odcinając użytkowników na całym świecie.',
          actionItems: [
            'Wymusić algorytm Exponential Backoff z Full Jitter we wszystkich bibliotekach SDK.',
            'Wdrożyć adaptacyjne wyłączniki awaryjne (Circuit Breakers) na bramie brzegowej.',
            'Wprowadzić limity zapytań powiązane z unikalnym identyfikatorem urządzenia.'
          ]
        }
      },
      'cors-nightmare': {
        id: 'cors-nightmare',
        title: 'Koszmar Żądań Wstępnych CORS',
        badge: 'NETWORK / SECURITY',
        severity: 'P1',
        description: 'Brak nagłówków CORS na bramie API spowodował odrzucenie wszystkich zapytań wstępnych OPTIONS z kodem 403, paraliżując interfejs SPA.',
        codeSnippet: `// ❌ PRZEKLĘTY KOD: Podatne dynamiczne odbijanie nagłówka Origin
app.use((req, res, next) => {
  // BŁĄD: Odbijanie nagłówka bez weryfikacji domen
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  // Brak obsługi żądań OPTIONS zwraca błąd 404/403 przy zapytaniu wstępnym
  next();
});`,
        revivedCode: `// ✅ WSKRZESZONY KOD SRE: Bezpieczna biała lista domen i buforowanie zapytań preflight
const ALLOWED_ORIGINS = new Set([
  'https://bugmortem.vercel.app',
  'https://app.bugmortem.dev'
]);

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.header('Access-Control-Max-Age', '86400'); // Buforowanie preflight na 24h
  }
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});`,
        stackTrace: `Access to fetch at 'https://api.bugmortem.dev/v1/auth' from origin 'https://bugmortem.vercel.app' 
has been blocked by CORS policy: Response to preflight request doesn't pass access control check: 
No 'Access-Control-Allow-Origin' header is present on the requested resource. 
If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.`,
        timeline: [
          { time: '17:00:00 UTC', label: 'Wdrożenie konfiguracji bramy', desc: 'Poprawka bezpieczeństwa aktualizuje reguły CORS na bramie API' },
          { time: '17:00:05 UTC', label: 'Błąd zapytań wstępnych', desc: 'Przeglądarki blokują zapytania OPTIONS zwracające kod HTTP 403' },
          { time: '17:00:10 UTC', label: 'Całkowity paraliż UI', desc: 'Aplikacja frontendowa przestaje pobierać jakiekolwiek dane', isFatal: true }
        ],
        replayerSteps: [
          {
            step: 1,
            timeOffset: '+0.0s',
            title: 'Aktualizacja reguł na bramie',
            description: 'Wdrożenie Terraform modyfikuje nagłówki CORS na bramie API.',
            telemetry: { latencyMs: 38, errorRate: '0.00%', rps: '15.4k' },
            severity: 'P1'
          },
          {
            step: 2,
            timeOffset: '+1.5s',
            title: 'Odrzucanie żądań preflight OPTIONS',
            description: 'Przeglądarki wysyłają obowiązkowe zapytania wstępne OPTIONS i otrzymują 403 Forbidden.',
            telemetry: { latencyMs: 120, errorRate: '45.0%', rps: '9.2k' },
            severity: 'P1'
          },
          {
            step: 3,
            timeOffset: '+4.0s',
            title: 'Całkowita blokada interfejsu SPA',
            description: 'Żadne uwierzytelnione zapytanie nie przechodzi weryfikacji CORS. 100% klientów odciętych.',
            telemetry: { latencyMs: 210, errorRate: '99.8%', rps: '1.2k' },
            severity: 'P1'
          }
        ],
        fiveWhys: [
          'Aplikacja internetowa nie może zalogować użytkownika ani pobrać danych o incydentach.',
          'Konsola przeglądarki zgłasza "Blocked by CORS policy: No Access-Control-Allow-Origin header present".',
          'Brama API zwraca kod HTTP 403 na zapytania wstępne OPTIONS wysyłane przez przeglądarkę.',
          'Nieprawidłowa reguła na bramie usunęła nagłówki CORS ze wszystkich zapytań innych niż GET.',
          'Brak automatycznych testów integracyjnych weryfikujących buforowanie zapytań preflight w przeglądarce.'
        ],
        blastRadius: {
          nodes: [
            { id: 'client-spa', name: 'client-spa', role: 'Aplikacja SPA', status: 'epicenter', statusCode: 'CORS_FAIL' },
            { id: 'edge-gateway', name: 'edge-gateway', role: 'Brama AWS API Gateway', status: 'degraded', statusCode: '403' },
            { id: 'auth-service', name: 'auth-service', role: 'API Logowania', status: 'healthy', statusCode: '200 OK' },
            { id: 'database', name: 'database', role: 'Baza Danych', status: 'healthy', statusCode: '200 OK' },
            { id: 'worker-pool', name: 'worker-pool', role: 'Kolejka Zadań', status: 'healthy', statusCode: '200 OK' }
          ],
          summary: { epicenterCount: 1, degradedCount: 1, healthyCount: 3 }
        },
        chaosMetrics: [
          { id: 'cm-cors-1', name: 'Błędy Zapytań Preflight', severity: 'P1', description: '99,8% żądań OPTIONS odrzuconych', status: 'injecting' },
          { id: 'cm-cors-2', name: 'Błędy Sieciowe Klientów', severity: 'P1', description: 'Zero uwierzytelnionego ruchu przepuszczanego przez bramę', status: 'injecting' }
        ],
        postMortem: {
          summary: 'Błędna aktualizacja polityki CORS doprowadziła do odrzucenia wszystkich zapytań wstępnych OPTIONS kodem 403.',
          impact: 'Całkowita blokada aplikacji webowej dla wszystkich użytkowników przez 22 minuty.',
          actionItems: [
            'Wdrożyć nagłówek Access-Control-Max-Age = 86400 (24h) buforujący zapytania wstępne.',
            'Dodać automatyczne testy dymne Playwright sprawdzające nagłówki CORS w procesie wdrożeniowym.',
            'Utrzymywać rygorystyczną białą listę dozwolonych domen w centralnym repozytorium infrastruktury.'
          ]
        }
      },
      'serverless-timeout': {
        id: 'serverless-timeout',
        title: 'Kaskada Zimnego Startu Serverless i Błąd Bramy 504',
        badge: 'CLOUD / SERVERLESS',
        severity: 'P0',
        description: 'Inicjalizacja ciężkiego klienta bazy danych wewnątrz handlera funkcji serverless wywołała kaskadę zimnych startów, przekraczając 29-sekundowy limit API Gateway.',
        codeSnippet: `// ❌ PRZEKLĘTY KOD: Ponowna inicjalizacja puli połączeń wewnątrz funkcji
import { Pool } from 'pg';

export const handler = async (event: any) => {
  // BŁĄD: Otwieranie ciężkiej puli bazy danych przy każdym wywołaniu funkcji
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const client = await pool.connect();
  const res = await client.query('SELECT * FROM checkout_cart WHERE cart_id = $1', [event.cartId]);
  return { statusCode: 200, body: JSON.stringify(res.rows) };
};`,
        revivedCode: `// ✅ WSKRZESZONY KOD SRE: Ponowne wykorzystanie połączeń i pooling RDS Proxy
import { Pool } from 'pg';

// Globalny kontekst wykonawczy zachowuje połączenie między wywołaniami
const pool = new Pool({
  host: process.env.RDS_PROXY_HOST, // Połączenie przekierowane przez AWS RDS Proxy
  max: 1, // Pojedyncze połączenie na kontener zapobiega wyczerpaniu puli
  connectionTimeoutMillis: 2000,
});

export const handler = async (event: any) => {
  const client = await pool.connect();
  try {
    const res = await client.query('SELECT * FROM checkout_cart WHERE cart_id = $1', [event.cartId]);
    return { statusCode: 200, body: JSON.stringify(res.rows) };
  } finally {
    client.release();
  }
};`,
        stackTrace: `HTTP/1.1 504 Gateway Timeout
Content-Type: application/json
Date: Sat, 07 Nov 2026 02:15:31 GMT

{
  "message": "Endpoint request timed out",
  "gateway": "Amazon API Gateway",
  "integrationLatencyMs": 29004,
  "executionTimeout": true
}`,
        timeline: [
          { time: '02:15:00 UTC', label: 'Skok ruchu z kampanii', desc: 'Promocja marketingowa wymusza alokację 2000 nowych kontenerów Lambda' },
          { time: '02:15:15 UTC', label: 'Zimny start i blokada bazy', desc: 'Każdy kontener jednocześnie negocjuje szyfrowanie TLS i połączenie z bazą' },
          { time: '02:15:29 UTC', label: 'Sufit limitu bramy API', desc: 'API Gateway przerywa połączenia po 29 sekundach błędem 504 Gateway Timeout', isFatal: true }
        ],
        replayerSteps: [
          {
            step: 1,
            timeOffset: '+0.0s',
            title: 'Gwałtowny skok wywołań',
            description: 'Nagły wzrost ruchu zmusza AWS Lambda do uruchomienia 1200 nowych środowisk wykonawczych.',
            telemetry: { latencyMs: 450, errorRate: '0.00%', rps: '18.4k' },
            severity: 'P1'
          },
          {
            step: 2,
            timeOffset: '+12.5s',
            title: 'Szturm negocjacji TLS i połączeń',
            description: '1200 kontenerów równolegle łączy się z bazą danych. Kolejka połączeń zostaje zablokowana.',
            telemetry: { latencyMs: 14200, errorRate: '42.8%', rps: '6.1k' },
            severity: 'P1'
          },
          {
            step: 3,
            timeOffset: '+29.0s',
            title: 'Twarde odcięcie 504 na bramie API',
            description: 'API Gateway zrywa wszystkie oczekujące połączenia po osiągnięciu twardego limitu 29 sekund.',
            telemetry: { latencyMs: 29000, errorRate: '99.4%', rps: '410' },
            severity: 'P0'
          }
        ],
        fiveWhys: [
          'Brama API Gateway odpowiada kodem HTTP 504 Gateway Timeout na zapytania w koszyku.',
          'Funkcje Lambda nie zwróciły odpowiedzi przed upływem 29-sekundowego limitu czasu bramy.',
          'Nagły skok ruchu wymusił jednoczesne uruchomienie setek kontenerów w trybie zimnego startu.',
          'Pula połączeń bazy danych była tworzona wewnątrz handlera zamiast w zasięgu globalnym.',
          'Brak proxy połączeń (RDS Proxy) oraz brak zarezerwowanej współbieżności (Provisioned Concurrency) na kluczowych ścieżkach.'
        ],
        blastRadius: {
          nodes: [
            { id: 'client-spa', name: 'client-spa', role: 'Koszyk SPA', status: 'degraded', statusCode: '504' },
            { id: 'edge-gateway', name: 'edge-gateway', role: 'AWS API Gateway', status: 'epicenter', statusCode: 'TIMEOUT' },
            { id: 'auth-service', name: 'auth-service', role: 'Cognito / JWT', status: 'healthy', statusCode: '200 OK' },
            { id: 'database', name: 'database', role: 'Aurora Serverless', status: 'degraded', statusCode: 'STALL' },
            { id: 'worker-pool', name: 'worker-pool', role: 'Flota Lambda', status: 'degraded', statusCode: 'COLD_START' }
          ],
          summary: { epicenterCount: 1, degradedCount: 3, healthyCount: 1 }
        },
        chaosMetrics: [
          { id: 'cm-srv-1', name: 'Czas Zimnego Startu Kontenera', severity: 'P0', description: 'Średnio 28 400ms na nowy kontener', status: 'injecting' },
          { id: 'cm-srv-2', name: 'Wskaźnik Przekroczeń Czasu 504', severity: 'P0', description: '99,4% wywołań zakończonych timeoutem', status: 'injecting' }
        ],
        postMortem: {
          summary: 'Inicjalizacja puli połączeń wewnątrz funkcji podczas skoku ruchu doprowadziła do przekroczenia 29-sekundowego limitu czasu bramy API.',
          impact: 'Koszyk sklepowy całkowicie leżał przez 35 minut; zero przetworzonych zamówień w godzinie szczytu.',
          actionItems: [
            'Przenieść instancje klientów bazy danych do zasięgu globalnego poza funkcję handlera.',
            'Wdrożyć usługę AWS RDS Proxy w celu zarządzania pulą połączeń i wyeliminowania narzutu TLS.',
            'Włączyć funkcję Provisioned Concurrency na kluczowych ścieżkach zakupowych przed akcjami marketingowymi.'
          ]
        }
      },
      's3-lambda-loop': {
        id: 's3-lambda-loop',
        title: 'Spirala Rekurencyjnej Pętli Śmierci AWS S3 ⇄ Lambda',
        badge: 'AWS / SERVERLESS',
        severity: 'P0',
        description: 'Wyzwalacz zdarzeń S3 bez filtra prefiksu spowodował, że funkcja Lambda zapisywała miniatury z powrotem do tego samego bucketa źródłowego, wywołując samą siebie 142 000 razy w 4 minuty i wyczerpując limit współbieżności konta AWS (1000/1000), paraliżując wszystkie inne usługi produkcyjne.',
        codeSnippet: `// ❌ PRZEKLĘTY KOD: Lambda zapisuje wynik do tego samego bucketa S3, który ją wyzwala
export const handler = async (event: S3Event) => {
  for (const record of event.Records) {
    const srcKey = record.s3.object.key;
    const srcBucket = record.s3.bucket.name; // "media-assets"

    // BŁĄD 1: Brak filtra prefiksu — odpala się dla KAŻDEGO obiektu w buckecie,
    //         w tym dla miniatur, które ta funkcja zaraz zapisze.
    // BŁĄD 2: Zapis miniatury z powrotem do srcBucket wyzwala
    //         kolejne zdarzenie s3:ObjectCreated → nieskończona pętla rekurencyjna.
    const thumbnail = await resizeImage(srcKey, srcBucket);
    await s3.putObject({
      Bucket: srcBucket,          // ← TEN SAM bucket co źródło wyzwalacza!
      Key: \`thumb_\${srcKey}\`,
      Body: thumbnail,
    }).promise();
  }
};`,
        revivedCode: `// ✅ WSKRZESZONY KOD SRE: Osobny bucket wyjściowy + filtr prefiksu + blokada pętli
import { S3Event } from 'aws-lambda';
import { S3 } from 'aws-sdk';

const s3 = new S3();
const INPUT_PREFIX = 'uploads/';    // przetwarzaj tylko oryginały
const OUTPUT_BUCKET = process.env.THUMBNAIL_BUCKET!; // odizolowany bucket wyjściowy

export const handler = async (event: S3Event): Promise<void> => {
  // Blokada rekurencji: odrzucaj zdarzenia wywołane przez nasz własny bucket wyjściowy
  if (process.env.AWS_LAMBDA_FUNCTION_NAME &&
      event.Records[0]?.s3.bucket.name === OUTPUT_BUCKET) {
    console.warn('[BLOKADA SRE: odrzucono wywołanie rekurencyjne z bucketa wyjściowego]');
    return;
  }

  for (const record of event.Records) {
    const srcKey = record.s3.object.key;
    const srcBucket = record.s3.bucket.name;

    // Strażnik: przetwarzaj wyłącznie obiekty w katalogu uploads/
    if (!srcKey.startsWith(INPUT_PREFIX)) {
      console.info('[BLOKADA SRE: pomijanie \${srcKey} — poza prefiksem uploads/]');
      continue;
    }

    const thumbnail = await resizeImage(srcKey, srcBucket);

    // Zapis do ODIZOLOWANEGO bucketa wyjściowego — nie może ponownie wywołać tej samej Lambdy
    await s3.putObject({
      Bucket: OUTPUT_BUCKET,
      Key: \`thumbs/\${srcKey.replace(INPUT_PREFIX, '')}\`,
      Body: thumbnail,
      ContentType: 'image/webp',
    }).promise();
  }
};`,
        stackTrace: `START RequestId: d3f2a1b4-8e9c-4f0a Duration: 312.45 ms Billed Duration: 313 ms Memory Size: 512 MB Max Memory Used: 148 MB
REPORT RequestId: d3f2a1b4-8e9c-4f0a Init Duration: 183.12 ms

[ERROR] 14:01:02 TooManyRequestsException: Rate exceeded
    at Request.extractError (node_modules/aws-sdk/lib/protocol/json.js:52:27)
    at Request.callListeners (node_modules/aws-sdk/lib/sequential_executor.js:106:20)
    Status Code: 429, RequestId: a1b2c3d4-0000-ffff-9999-deadbeef0001

[CRITICAL] 14:02:47 AWS Lambda: Account-level concurrency limit reached (1000/1000).
All Lambda invocations for account 123456789012 are being throttled.
Throttled functions: image-processor, auth-token-refresher, order-processor, payment-webhook.`,
        timeline: [
          { time: '14:00:00 UTC', label: 'Pojedynczy upload pliku', desc: 'Użytkownik wgrywa header.jpg (2.1 MB) do bucketa media-assets' },
          { time: '14:00:03 UTC', label: 'Cykl 1: samoistne wywołanie', desc: 'Lambda zapisuje thumb_header.jpg do media-assets; S3 natychmiast odpala nowe zdarzenie s3:ObjectCreated' },
          { time: '14:00:15 UTC', label: 'Eksponencjalna lawina wywołań', desc: 'Każdy zapis miniatury odpala kolejne wykonanie: 1 → 2 → 4 → 8 równoległych procesów' },
          { time: '14:01:00 UTC', label: 'Wyczerpanie współbieżności', desc: 'Przetwarzanie obrazów zajmuje 800 z 1000 slotów współbieżności konta; wyją alarmy CloudWatch' },
          { time: '14:03:42 UTC', label: 'Globalny blackout konta AWS', desc: 'Osiągnięto limit 1000/1000 współbieżności (142 000 wywołań w sumie); autoryzacja, zamówienia i płatności całkowicie zablokowane błędem HTTP 429', isFatal: true }
        ],
        replayerSteps: [
          {
            step: 1,
            timeOffset: '+0.0s',
            title: 'Pierwszy krok rekurencji po uploadzie',
            description: 'Użytkownik wgrywa plik header.jpg do bucketa media-assets. Lambda zmniejsza go i zapisuje thumb_header.jpg do tego samego bucketa bez filtra prefiksu.',
            telemetry: { latencyMs: 312, errorRate: '0.00%', rps: '1.2k' },
            severity: 'P1'
          },
          {
            step: 2,
            timeOffset: '+15.0s',
            title: 'Lawinowy przyrost równoległych wywołań',
            description: 'Każda nowa miniatura wyzwala kolejne uruchomienie Lambdy. Liczba kontenerów rośnie lawinowo: 1 → 2 → 4 → 16 → 256 równoległych instancji.',
            telemetry: { latencyMs: 1840, errorRate: '12.4%', rps: '14.2k' },
            severity: 'P1'
          },
          {
            step: 3,
            timeOffset: '+231.0s',
            title: 'Wyczerpanie limitu konta AWS i całkowita awaria',
            description: '142 000 wywołań wyczerpuje cały limit 1000 slotów współbieżności konta. Serwisy logowania, zamówień i płatności zostają zablokowane kodem HTTP 429.',
            telemetry: { latencyMs: 8400, errorRate: '98.9%', rps: '142.0k' },
            severity: 'P0'
          }
        ],
        fiveWhys: [
          'Wszystkie funkcje AWS Lambda na całym koncie zwracają błąd TooManyRequestsException (429), a usługi logowania, zamówień i płatności nie odpowiadają.',
          'Funkcja Lambda przetwarzająca obrazy zużyła wszystkie 1000 slotów współbieżności konta AWS w ciągu 4 minut.',
          'Funkcja zapisywała miniatury z powrotem do tego samego bucketa S3, który ją wyzwalał, tworząc nieskończoną pętlę samowyzwalania.',
          'Wyzwalacz powiadomień S3 został skonfigurowany bez filtra prefiksu klucza, więc każdy zapis nowego pliku — w tym wygenerowanej miniatury — uruchamiał funkcję.',
          'Brak separacji bucketów na wejściowe i wyjściowe, brak limitu zarezerwowanej współbieżności dla funkcji oraz brak włączonego mechanizmu AWS Recursive Loop Detection w kodzie IaC.'
        ],
        blastRadius: {
          nodes: [
            { id: 'worker-pool', name: 'worker-pool', role: 'Flota AWS Lambda (image-processor)', status: 'epicenter', statusCode: 'FAIL' },
            { id: 'edge-gateway', name: 'edge-gateway', role: 'Brama AWS API Gateway', status: 'degraded', statusCode: 'WARN' },
            { id: 'auth-service', name: 'auth-service', role: 'Lambda Logowania (zdławiona)', status: 'degraded', statusCode: 'WARN' },
            { id: 'database', name: 'database', role: 'Lambdy Płatności i Zamówień (zdławione)', status: 'degraded', statusCode: 'WARN' },
            { id: 'client-spa', name: 'client-spa', role: 'Bucket S3 Ingestion (media-assets)', status: 'healthy', statusCode: '200 OK' }
          ],
          summary: { epicenterCount: 1, degradedCount: 3, healthyCount: 1 }
        },
        chaosMetrics: [
          { id: 'cm-s3-1', name: 'Równoległe Wywołania Lambda', severity: 'P0', description: '1000 / 1000 (100% limitu konta AWS wyczerpane)', status: 'injecting' },
          { id: 'cm-s3-2', name: 'Liczba Wywołań w Pętli (4 min)', severity: 'P0', description: '142 380 niekontrolowanych uruchomień', status: 'injecting' },
          { id: 'cm-s3-3', name: 'Zdławione Żądania Konta', severity: 'P0', description: '38 410 zapytań odrzuconych z błędem HTTP 429', status: 'injecting' }
        ],
        postMortem: {
          summary: 'Brak filtra prefiksu S3 na wyzwalaczu połączony z zapisem wyniku do bucketa źródłowego wywołał nieskończoną pętlę rekurencyjną i całkowite wyczerpanie współbieżności konta AWS.',
          impact: '142 000 wywołań Lambdy w 4 minuty sparaliżowało autoryzację, zamówienia i płatności na całym koncie. Szacowana strata przychodu: 28 000 USD w zablokowanych transakcjach.',
          actionItems: [
            'Odseparować buckety wejściowe i wyjściowe — kategoryczny zakaz zapisu wyniku przetwarzania do bucketa źródłowego zdarzenia.',
            'Skonfigurować powiadomienia S3 ze ścisłym filtrem prefiksu (np. uploads/) w celu zablokowania ponownego wyzwalania przez miniatury.',
            'Włączyć natywną funkcję AWS Recursive Loop Detection oraz nałożyć twardy limit zarezerwowanej współbieżności na funkcję Lambda.'
          ]
        }
      }
    }
  },
  codeSection: {
    cursedTitle: 'SEKCJA ZWŁOK KODU: PRZEKLĘTY VS WSKRZESZONY KOD',
    resurrectedTitle: 'WSKRZESZONY KOD SRE (WZORZEC ODPORNOŚCI)',
    cursedBadge: 'AWARIA KRYTYCZNA',
    resurrectedBadge: 'WZORZEC: ODPORNOŚĆ SRE',
    copyCta: 'Kopiuj Wskrzeszony Kod',
    copied: 'Kod Skopiowany!',
  },
  stackTrace: {
    title: 'SUROWY ZRZUT ŚLADU STOSU (STACK TRACE)',
  },
  timeline: {
    title: 'CHRONOLOGICZNA OŚ CZASU AWARII',
  },
  replayer: {
    title: 'ODTWARZACZ CZASU DO ZGONU AWARII (TIME-TO-DEATH)',
    subtitle: 'Symuluj sekwencję awarii krok po kroku i obserwuj degradację telemetrii w czasie rzeczywistym',
    play: 'Uruchom Symulację',
    pause: 'Wstrzymaj Symulację',
    reset: 'Resetuj Oś Czasu',
    speed: 'Prędkość',
    stepOf: 'Krok',
    telemetryLatency: 'Opóźnienie P99',
    telemetryErrors: 'Wskaźnik Błędów',
    telemetryRps: 'Przepustowość',
  },
  fiveWhys: {
    sectionTitle: 'BEZSTRONNE DRZEWO PRZYCZYN 5-WHYS',
    sectionSubtitle: 'Systemowe dochodzenie inżynieryjne od powierzchownego objawu po lukę architektoniczną.',
    levels: [
      '1. OBJAW POWIERZCHOWNY',
      '2. BEZPOŚREDNI WYZWALACZ',
      '3. MECHANIZM USZKODZENIA',
      '4. WADA ARCHITEKTONICZNA',
      '5. PRZYCZYNA SYSTEMOWA'
    ],
    blamelessBadge: 'KULTURA BEZSTRONNEGO SRE',
    rootCauseBadge: 'PRZYCZYNA ŹRÓDŁOWA',
    copyChain: 'Kopiuj Ciąg Przyczyn',
    copied: 'Ciąg Skopiowany!',
  },
  blastRadius: {
    title: 'TOPOLOGIA PROMIENIA RAŻENIA ARCHITEKTURY',
    subtitle: 'Kaskadowe wektory awarii ponad granicami mikroserwisów i izolacja Pacjenta Zero.',
    legendEpicenter: 'Pacjent Zero',
    legendDegraded: 'Kaskada Zniszczeń',
    legendHealthy: 'Węzeł Zdrowy (200 OK)',
    badgeEpicenter: 'Krytyczny',
    badgeDegraded: 'Zdegradowany',
    badgeHealthy: 'Zdrowy',
  },
  chaos: {
    sectionTitle: 'PIASKOWNICA INŻYNIERII CHAOSU (LIVE TELEMETRY)',
    sectionSubtitle: 'Wstrzykuj aktywne wektory awarii i obserwuj degradację telemetrii w czasie rzeczywistym',
    btnMitigate: 'Uruchom Samoleczenie',
    btnInject: 'Wstrzyknij awarię',
    statusNominal: 'SYSTEM NOMINALNY',
    metricRps: 'PRZEPUSTOWOŚĆ',
    metricLatency: 'OPÓŹNIENIE P99',
    metricErrorRate: 'WSKAŹNIK BŁĘDÓW',
    scenarioLatencyTitle: 'Skok opóźnień brzegowych (+2500ms)',
    scenarioLatencyDesc: 'Sztuczne opóźnienie na Edge Gateway powodujące przekroczenia limitu czasu w UI',
    scenarioDbPoolTitle: 'Nasycenie puli połączeń bazy danych',
    scenarioDbPoolDesc: '100% wykorzystania połączeń PostgreSQL prowadzące do kaskady błędów 503',
    scenarioMemoryTitle: 'Wyciek pamięci sterty workera (OOM)',
    scenarioMemoryDesc: 'Eksponencjalny wzrost zużycia RAM w puli workerów wyzwalający OOM Killera',
    scenarioAuthStormTitle: 'Burza unieważnienia sesji (Auth Storm)',
    scenarioAuthStormDesc: 'Masowe odrzucenia tokenów JWT i lawina żądań ponownego logowania',
  },
  chaosSandbox: {
    title: 'PIASKOWNICA INŻYNIERII CHAOSU (LIVE TELEMETRY)',
    subtitle: 'Wstrzykuj aktywne wektory awarii i obserwuj degradację telemetrii w czasie rzeczywistym',
    nominalStatus: 'SYSTEM NOMINALNY',
    activeStatus: 'AKTYWNA AWARIA KRYTYCZNA',
    metricThroughput: 'PRZEPUSTOWOŚĆ',
    metricP99: 'OPÓŹNIENIE P99',
    metricErrorRate: 'WSKAŹNIK BŁĘDÓW',
    injectCta: 'Wstrzyknij awarię',
    recoveringCta: 'Uruchom Samoleczenie',
  },
  prescription: {
    modalTitle: 'Oficjalna Recepta SRE & Generator IaC',
    resilienceBadge: 'TERAPIA ANTY-AWARIJNA',
    doctorOrdersTitle: 'ZALECENIE LEKARZA SRE (DOCTOR’S ORDERS)',
    rxNumberPrefix: 'Rx #',
    dosageLabel: 'DAWKOWANIE / SLA',
    preventionRuleLabel: 'REGUŁA ZAPOBIEGAWCZA',
    copyFileCta: 'Kopiuj Plik',
    copiedNotice: 'Skopiowano!',
    downloadCta: 'Pobierz Plik',
    verifiedFooter: 'Pliki zweryfikowane przez silnik SRE BugMortem',
    closeCta: 'Zamknij Apteczkę',
    items: {
      'react-hydration': {
        doctorOrder:
          'Natychmiastowe wdrożenie dwufazowej hydratacji z flagą mounted oraz kwarantanna dynamicznych znaczników czasu w komponentach SSR.',
        dosage:
          'Wymusić 100% pokrycia testami E2E Playwright w pipeline CI/CD przed każdym wdrożeniem na produkcję.',
        preventionRule:
          'Reguła ESLint: zakaz stosowania new Date() i Math.random() w ciele renderowanych komponentów Server Components.',
        files: [
          {
            filename: 'eslint.config.mjs',
            language: 'javascript',
            description: 'Reguła ESLint blokująca niestabilne SSR',
            content: `// eslint.config.mjs - SRE Hydration Guard
export default [
  {
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: "CallExpression[callee.name='Date'], NewExpression[callee.name='Date']",
          message: 'SRE GUARD: Dynamic date instantiation forbidden during SSR. Use mounted guard or static seed.'
        }
      ]
    }
  }
];`
          },
          {
            filename: 'playwright-ssr.config.ts',
            language: 'typescript',
            description: 'Test dymny Playwright weryfikujący konsolę',
            content: `// playwright-ssr.config.ts - Automated Console Error Catcher
import { test, expect } from '@playwright/test';

test('verify zero hydration mismatch errors in console', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error' && msg.text().includes('Hydration failed')) {
      errors.push(msg.text());
    }
  });

  await page.goto('/');
  expect(errors).toHaveLength(0);
});`
          }
        ]
      },
      'connection-pool': {
        doctorOrder:
          'Natychmiastowe wdrożenie proxy poolingowego PgBouncer w trybie transakcyjnym oraz rygorystyczny limit statement_timeout.',
        dosage:
          'Skonfigurować max_client_conn = 5000, default_pool_size = 50, statement_timeout = 2000ms.',
        preventionRule:
          'Bezwzględny zakaz wykonywania analitycznych zapytań bez limitu na węźle Primary bazy danych produkcyjnej.',
        files: [
          {
            filename: 'pgbouncer.ini',
            language: 'ini',
            description: 'Konfiguracja PgBouncer dla ochrony puli połączeń',
            content: `[databases]
aurora_prod = host=aurora-cluster.internal port=5432 dbname=prod_db

[pgbouncer]
listen_port = 6432
listen_addr = 0.0.0.0
auth_type = md5
auth_file = /etc/pgbouncer/userlist.txt
pool_mode = transaction
max_client_conn = 5000
default_pool_size = 50
reserve_pool_size = 10
reserve_pool_timeout = 2
server_idle_timeout = 60
query_timeout = 3`
          },
          {
            filename: '001_sre_pool_guard.sql',
            language: 'sql',
            description: 'Ochrona przed wiszącymi transakcjami w PostgreSQL',
            content: `-- SRE Guard: Prevent connection exhaustion
ALTER DATABASE prod_db SET statement_timeout = '2500ms';
ALTER DATABASE prod_db SET idle_in_transaction_session_timeout = '5000ms';
ALTER DATABASE prod_db SET lock_timeout = '1500ms';`
          }
        ]
      },
      'oom-reaper': {
        doctorOrder:
          'Przebudowa potoku eksportu z buforowania w pamięci RAM na strumieniowanie asynchroniczne (Stream Pipeline z backpressure).',
        dosage:
          'Wdrożyć hard-limit pamięci w Kubernetes: resources.limits.memory = 2Gi, alert przy 80% progu.',
        preventionRule:
          'Zakaz ładowania całych kolekcji danych do pojedynczych zmiennych tablicowych w procesach Node.js.',
        files: [
          {
            filename: 'k8s-pod-resilience.yaml',
            language: 'yaml',
            description: 'Limity pamięci i CPU w manifeście Kubernetes',
            content: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: export-worker
spec:
  template:
    spec:
      containers:
      - name: worker
        image: export-worker:stable
        resources:
          requests:
            memory: "512Mi"
            cpu: "250m"
          limits:
            memory: "2048Mi"
            cpu: "1000m"`
          },
          {
            filename: 'stream-export-pipeline.ts',
            language: 'typescript',
            description: 'Wzorzec bezpiecznego strumieniowania z backpressure',
            content: `// stream-export-pipeline.ts - Memory-Bounded Data Exporter
import { pipeline } from 'stream/promises';
import { createReadStream, createWriteStream } from 'fs';
import { Transform } from 'stream';

export async function exportSafeCsv(inputCursor: AsyncIterable<any>, destPath: string) {
  const transform = new Transform({
    objectMode: true,
    transform(chunk, _, callback) {
      callback(null, \`\${chunk.id},\${chunk.total}\\n\`);
    }
  });

  await pipeline(inputCursor, transform, createWriteStream(destPath));
}`
          }
        ]
      },
      'retry-storm': {
        doctorOrder:
          'Wdrożenie algorytmu Exponential Backoff z pełnym szumem losowym (Full Jitter) oraz wyłącznika awaryjnego Circuit Breaker.',
        dosage:
          'Base Delay = 100ms, Max Delay = 2000ms, Jitter = 1.0, Max Retries = 3.',
        preventionRule:
          'Zakaz automatycznych, synchronicznych ponowień zapytań (Zero-Jitter Retries) w przypadku kodów błędów 5xx.',
        files: [
          {
            filename: 'envoy-circuit-breaker.yaml',
            language: 'yaml',
            description: 'Definicja Circuit Breaker w konfiguracji Envoy Proxy',
            content: `circuit_breakers:
  thresholds:
    - priority: DEFAULT
      max_connections: 1024
      max_pending_requests: 100
      max_requests: 1024
      max_retries: 3
outlier_detection:
  consecutive_5xx: 3
  interval: 10s
  base_ejection_time: 30s
  max_ejection_percent: 50`
          },
          {
            filename: 'resilience-retry.ts',
            language: 'typescript',
            description: 'Klient HTTP z algorytmem Full Jitter',
            content: `// resilience-retry.ts - Full Jitter Exponential Backoff Client
export async function fetchWithFullJitter<T>(
  fn: () => Promise<T>,
  retries = 3,
  baseMs = 100,
  maxMs = 2000
): Promise<T> {
  let attempt = 0;
  while (attempt < retries) {
    try {
      return await fn();
    } catch (err) {
      attempt++;
      if (attempt >= retries) throw err;
      const cap = Math.min(maxMs, baseMs * 2 ** attempt);
      const sleepMs = Math.random() * cap; // Full Jitter formula
      await new Promise(r => setTimeout(r, sleepMs));
    }
  }
  throw new Error('Unreachable');
}`
          }
        ]
      },
      'cors-nightmare': {
        doctorOrder:
          'Wdrożenie buforowania zapytań OPTIONS (Access-Control-Max-Age) na bramie API oraz usunięcie wieloznaczników (*).',
        dosage:
          'Skonfigurować Access-Control-Max-Age = 86400 (24h) dla wszystkich odpowiedzi preflight OPTIONS.',
        preventionRule:
          'Bezwzględny zakaz dynamicznego odbijania nagłówka Origin jako dozwolonego dla żądań z credentials: true.',
        files: [
          {
            filename: 'api-gateway-cors.tf',
            language: 'terraform',
            description: 'Konfiguracja Terraform dla bezpiecznego CORS z buforowaniem',
            content: `resource "aws_api_gateway_method_response" "options_200" {
  rest_api_id = aws_api_gateway_rest_api.api.id
  resource_id = aws_api_gateway_resource.resource.id
  http_method = "OPTIONS"
  status_code = "200"

  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = true
    "method.response.header.Access-Control-Allow-Methods" = true
    "method.response.header.Access-Control-Allow-Origin"  = true
    "method.response.header.Access-Control-Max-Age"        = true
  }
}`
          },
          {
            filename: 'nginx-cors.conf',
            language: 'nginx',
            description: 'Reguły NGINX dla preflight OPTIONS',
            content: `if ($request_method = 'OPTIONS') {
    add_header 'Access-Control-Allow-Origin' 'https://app.bugmortem.dev' always;
    add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS, PUT, DELETE' always;
    add_header 'Access-Control-Allow-Headers' 'Authorization, Content-Type, X-Amz-Date' always;
    add_header 'Access-Control-Max-Age' 86400;
    add_header 'Content-Type' 'text/plain; charset=utf-8';
    add_header 'Content-Length' 0;
    return 204;
}`
          }
        ]
      },
      's3-lambda-loop': {
        doctorOrder:
          'Natychmiastowa izolacja bucketów S3 wejścia i wyjścia Lambda oraz wdrożenie filtra prefiksu klucza i pułapu zarezerwowanej współbieżności w celu przerwania pętli rekurencyjnej.',
        dosage:
          'Zarezerwowana współbieżność image-processor: max 50 instancji. Filtr prefiksu S3: uploads/*. Oddzielny bucket wyjściowy: media-thumbnails.',
        preventionRule:
          'Bezwzględny zakaz konfigurowania wyzwalaczy S3 bez filtra prefiksu oraz zapisu wyników Lambdy do bucketa źródłowego zdarzenia. Włączyć AWS Recursive Loop Detection.',
        files: [
          {
            filename: 's3-lambda-circuit-breaker.tf',
            language: 'terraform',
            description: 'Terraform: osobne buckety wejścia/wyjścia, filtr prefiksu S3, pułap współbieżności i SQS DLQ',
            content: `# s3-lambda-circuit-breaker.tf
# SRE Resilience: S3 ⇄ Lambda Recursive Loop Prevention

# --- Isolated input bucket (originals) ---
resource "aws_s3_bucket" "media_input" {
  bucket = "media-assets-input"
}

# --- Separate, isolated output bucket (thumbnails) ---
resource "aws_s3_bucket" "media_output" {
  bucket = "media-assets-thumbnails"
}

# --- Dead-Letter Queue for runaway events ---
resource "aws_sqs_queue" "lambda_dlq" {
  name                      = "image-processor-dlq"
  message_retention_seconds = 1209600 # 14 days
}

# --- Lambda with Reserved Concurrency limit (Circuit Breaker) ---
resource "aws_lambda_function" "processor" {
  function_name                  = "image-processor"
  role                          = aws_iam_role.lambda_exec.arn
  handler                       = "index.handler"
  runtime                       = "nodejs20.x"
  reserved_concurrent_executions = 50 # SRE ceiling: prevents account concurrency starvation (1000/1000)

  dead_letter_config {
    target_arn = aws_sqs_queue.lambda_dlq.arn
  }

  environment {
    variables = {
      INPUT_BUCKET   = aws_s3_bucket.media_input.id
      OUTPUT_BUCKET  = aws_s3_bucket.media_output.id
      RECURSION_GUARD = "ENABLED"
    }
  }
}

# --- S3 Trigger with MANDATORY prefix and suffix filters ---
resource "aws_s3_bucket_notification" "bucket_notification" {
  bucket = aws_s3_bucket.media_input.id

  lambda_function {
    lambda_function_arn = aws_lambda_function.processor.arn
    events              = ["s3:ObjectCreated:*"]
    filter_prefix       = "uploads/"      # MANDATORY: Only process raw uploads
    filter_suffix       = ".jpg"
  }

  depends_on = [aws_lambda_permission.allow_s3]
}

resource "aws_lambda_permission" "allow_s3" {
  statement_id  = "AllowExecutionFromS3"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.processor.function_name
  principal     = "s3.amazonaws.com"
  source_arn    = aws_s3_bucket.media_input.arn
}`
          },
          {
            filename: 'aws-lambda-resilience.yaml',
            language: 'yaml',
            description: 'AWS SAM: Ochrona przed pętlami rekurencyjnymi, limit współbieżności i alarm CloudWatch',
            content: `AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31
Description: >
  SRE Resilience Template: S3-Lambda Circuit Breaker
  Terminates recursive invocation cascades automatically via AWS Recursive Loop Detection.

Resources:
  # Input Bucket (Trigger source)
  InputMediaBucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: !Sub '\${AWS::AccountId}-media-uploads-input'

  # Isolated Output Bucket (Destination - NEVER triggers the lambda)
  OutputThumbnailsBucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: !Sub '\${AWS::AccountId}-media-thumbnails-output'

  # Image Processor Lambda Function
  ImageProcessorFunction:
    Type: AWS::Serverless::Function
    Properties:
      CodeUri: src/
      Handler: index.handler
      Runtime: nodejs20.x
      Timeout: 30
      MemorySize: 512
      ReservedConcurrentExecutions: 50 # Caps concurrency to avoid whole-account starvation
      DeadLetterQueue:
        Type: SQS
        TargetArn: !GetAtt RunawayDLQ.Arn
      Environment:
        Variables:
          OUTPUT_BUCKET_NAME: !Ref OutputThumbnailsBucket
          AWS_LAMBDA_RECURSIVE_LOOP: Terminate # Uses native AWS Lambda loop detection (Nov 2023)
      Events:
        NewImageUpload:
          Type: S3
          Properties:
            Bucket: !Ref InputMediaBucket
            Events: s3:ObjectCreated:*
            Filter:
              S3Key:
                Rules:
                  - Name: prefix
                    Value: uploads/ # Crucial guard: only triggers on uploads/ prefix

  RunawayDLQ:
    Type: AWS::SQS::Queue
    Properties:
      QueueName: image-processor-runaway-dlq
      MessageRetentionPeriod: 1209600

  # CloudWatch Alarm for throttled executions (Early Warning System)
  ThrottlesAlarm:
    Type: AWS::CloudWatch::Alarm
    Properties:
      AlarmDescription: 'Alarm if Lambda throttles exceed safe threshold (possible loop)'
      Namespace: AWS/Lambda
      MetricName: Throttles
      Dimensions:
        - Name: FunctionName
          Value: !Ref ImageProcessorFunction
      Statistic: Sum
      Period: 60
      EvaluationPeriods: 1
      Threshold: 100
      ComparisonOperator: GreaterThanThreshold
      TreatMissingData: notBreaching`
          }
        ]
      },
      'serverless-timeout': {
        doctorOrder:
          'Przeniesienie inicjalizacji klienta bazy poza handler funkcji Lambda oraz wdrożenie AWS RDS Proxy.',
        dosage:
          'Skonfigurować RDS Proxy z pulą idle_client_timeout = 1800s oraz max_connections_percent = 90.',
        preventionRule:
          'Zakaz tworzenia nowych instancji połączenia do bazy danych wewnątrz ciała funkcji wykonawczej.',
        files: [
          {
            filename: 'serverless-template.yaml',
            language: 'yaml',
            description: 'Szablon AWS SAM z optymalizacją inicjalizacji i pre-warmingiem',
            content: `AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31
Resources:
  OrdersFunction:
    Type: AWS::Serverless::Function
    Properties:
      Handler: app.handler
      Runtime: nodejs20.x
      Timeout: 15
      MemorySize: 1024
      Environment:
        Variables:
          DB_PROXY_ENDPOINT: !GetAtt RDSProxy.Endpoint`
          },
          {
            filename: 'rds-proxy.tf',
            language: 'terraform',
            description: 'Definicja AWS RDS Proxy w Terraform',
            content: `resource "aws_db_proxy" "proxy" {
  name                   = "aurora-serverless-proxy"
  debug_logging          = false
  engine_family          = "POSTGRESQL"
  idle_client_timeout    = 1800
  require_tls            = true
  role_arn               = aws_iam_role.proxy_role.arn
  vpc_security_group_ids = [aws_security_group.proxy_sg.id]
  vpc_subnet_ids         = aws_subnet.private[*].id
}`
          }
        ]
      }
    }
  },
  postMortem: {
    title: 'OFICJALNY RAPORT Z SEKCJI ZWŁOK INCYDENTU',
    executiveSummary: 'PODSUMOWANIE DLA KIEROWNICTWA (EXECUTIVE SUMMARY)',
    blastRadiusImpact: 'PROMIEŃ RAŻENIA I WPŁYW NA BIZNES',
    actionItems: 'DZIAŁANIA ZAPOBIEGAWCZE I NAPRAWCZE',
    escalateOnCall: 'Eskaluj do Dyżurnego (On-Call)',
    listenCoroner: 'Odtwórz Werdykt Koronera',
    exportMarkdown: 'Eksportuj Raport do Markdown',
    downloadCertificate: 'Pobierz Akt Zgonu (PDF)',
    broadcastSlack: 'Nadaj Komunikat na Slack',
    slackCopiedNotice: 'Skopiowano Komunikat Awarii na Slacka do Schowka!',
  },
  dispatcher: {
    openBtn: 'Eskaluj do Dyżurnego',
    modalTitle: 'DYSPONOWANIE INCYDENTEM I ESKALACJA',
    modalSubtitle: 'Bezpośredni most do pokoju dowodzenia (War Room) i dyżurów SRE',
    channelLabel: 'Docelowy Kanał Powiadomień',
    severityLabel: 'Krytyczność Incydentu',
    summaryLabel: 'Zautomatyzowane Podsumowanie Diagnostyczne',
    copyBtn: 'Kopiuj Treść Powiadomienia',
    copiedBtn: 'Skopiowano do Schowka!',
    sendSlackBtn: 'Wyślij do Webhooka Slack',
    dispatchSuccess: 'Incydent pomyślnie wysłany na kanał',
  },
  dispatcherModal: {
    title: 'DYSPONOWANIE INCYDENTEM I ESKALACJA',
    subtitle: 'Bezpośredni most do War Roomu, PagerDuty i obsługi zgłoszeń GitHub.',
    severityLabel: 'Krytyczność Incydentu',
    serviceLabel: 'Dotknięta Usługa',
    commanderLabel: 'Dowódca Incydentu',
    channelLabel: 'Mostek Slack / Discord (War Room)',
    zoomLinkLabel: 'Mostek Wideo (Zoom)',
    jiraTicketLabel: 'Klucz Zgłoszenia Jira / Incydentu',
    statusPageLabel: 'Publiczny URL Status Page',
    copySummaryCta: 'Kopiuj Podsumowanie (Markdown)',
    copiedNotice: 'Podsumowanie Incydentu Skopiowane do Schowka!',
    dispatchPagingCta: 'Wyślij Syrenę do Dyżurnego (PagerDuty)',
    pagingTriggered: 'Syrena PagerDuty wysłana!',
    closeCta: 'Zamknij Konsolę',
  },
  legal: {
    privacyTitle: 'Polityka Prywatności i Suwerenność Danych',
    termsTitle: 'Regulamin Świadczenia Usług',
    cookiesTitle: 'Polityka Ciasteczek i Pamięć Lokalna',
    lastUpdated: 'Ostatnia aktualizacja: Listopad 2026 | Oficjalne Zgłoszenie Kiroween 2026',
    privacyArchHeader: '1. Architektura Zerowego Wycieku Danych (Wykonanie Lokalne)',
    privacyArchText: 'BugMortem został zaprojektowany z myślą o bezwzględnej poufności telemetrii i kodu źródłowego. Wszystkie analizy awarii, parsowanie zrzutów stosu, generowanie raportów post-mortem oraz akustyczna synteza telemetrii wykonują się w 100% lokalnie w środowisku przeglądarki klienta.',
    privacyArchBullets: [
      'Żadne poufne logi awarii, hasła ani fragmenty kodu nigdy nie opuszczają Twojego urządzenia.',
      'Aplikacja nie posiada zdalnej bazy danych do przechowywania wprowadzonych logów.',
      'Generowanie Aktu Zgonu PDF i eksport do Markdown kompilują się wyłącznie w silniku przeglądarki.',
    ],
    privacyAdminHeader: '2. Administrator Danych i Prawa Autorskie',
    privacyAdminText: 'BugMortem jest niezależnym narzędziem deweloperskim stworzonym przez Adama Gierczaka (@AdamBabinicz) na hackathon Kiroween 2026 (organizowany przez AWS i Devpost).',
    privacyScopeHeader: '3. Zakres Przetwarzanych Informacji',
    privacyScopeText: 'BugMortem nie gromadzi danych osobowych, adresów e-mail ani adresów IP. Jedyny stan przechowywany przez aplikację to preferencje środowiska zapisywane lokalnie w pamięci localStorage Twojej przeglądarki.',
    privacyLocalStorageHeader: '4. Wykorzystanie Pamięci Lokalnej Przeglądarki (localStorage)',
    privacyLocalStorageIntro: 'Poniższa tabela przedstawia wszystkie klucze wykorzystywane przez aplikację:',
    privacyLocalStorageKeys: [
      { key: 'bugmortem_custom_incidents', desc: 'Zapisane przez użytkownika sekcje zwłok własnych incydentów.' },
      { key: 'bugmortem_theme', desc: 'Wybrany motyw wizualny (Dracula Morgue vs. Clinical Daylight).' },
      { key: 'bugmortem_locale', desc: 'Aktywny język interfejsu (polski / angielski).' },
      { key: 'bugmortem_audio_muted', desc: 'Stan wyciszenia proceduralnego syntezatora audio EKG.' },
    ],
    noTrackingHeader: '5. Brak Śledzących Ciasteczek i Zerowa Telemetria',
    noTrackingText: 'Aplikacja nie korzysta z żadnych skryptów śledzących podmiotów trzecich (brak Google Analytics 4, Hotjar, pikseli reklamowych).',
    noTrackingBullets: [
      'Zero fingerprintingu przeglądarki.',
      'Zero profilowania behawioralnego.',
      'Pełna zgodność z Google Consent Mode v2 (wszystkie tagi domyślnie zablokowane).',
    ],
    userRightsHeader: '6. Prawa Użytkownika do Danych',
    userRightsText: 'Zachowujesz całkowitą kontrolę nad swoimi danymi. Możesz w każdej chwili usunąć poszczególne zapisane awarie za pomocą ikony kosza w archiwum lub całkowicie wyczyścić pamięć.',
    userRightsBullets: [
      'Prawo do natychmiastowego usunięcia wprowadzonych incydentów za pomocą przycisku w UI.',
      'Prawo do eksportu wszystkich wygenerowanych raportów w otwartym formacie Markdown.',
    ],
    purgeHeader: '7. Trwałe Wyczyszczenie Danych',
    purgeText: 'Wyczyszczenie pamięci podręcznej przeglądarki lub kliknięcie przycisku usuwania trwale i bezpowrotnie usuwa wszystkie zapisane dane z Twojego urządzenia.',
    termsScopeHeader: '1. Zakres i Cel Edukacyjny',
    termsScopeText: 'BugMortem jest interaktywnym narzędziem analizy śledczej i symulacji SRE, zaprojektowanym do demonstracji wzorców odporności systemów rozproszonych, analizy przyczyn 5-Whys oraz automatyzacji dokumentacji incydentów.',
    termsGeneralHeader: '2. Dozwolony Użytek',
    termsGeneralText: 'Korzystanie z aplikacji jest bezpłatne. Użytkownicy mają prawo wprowadzać logi awarii, symulować scenariusze chaosu oraz pobierać szablony Infrastructure-as-Code (IaC) na potrzeby utwardzania własnych systemów.',
    termsDisclaimerHeader: '3. Zastrzeżenie Dotyczące Wzorców SRE',
    termsDisclaimerIntro: 'Chociaż recepty SRE i szablony IaC (Terraform, Kubernetes, AWS SAM, PgBouncer, ESLint) odzwierciedlają sprawdzone praktyki inżynieryjne:',
    termsDisclaimerPoints: [
      'Wszystkie wygenerowane pliki muszą zostać przetestowane w środowisku stagingowym przed wdrożeniem produkcyjnym.',
      'Autor projektu nie ponosi odpowiedzialności za zakłócenia operacyjne wynikające z bezpośredniego zastosowania szablonów.',
      'Narzędzie ma charakter symulacyjny, edukacyjny i kryminalistyczny.',
    ],
    liabilityHeader: '4. Dostępność i Gwarancje (SLA)',
    liabilityText: 'Aplikacja jest wdrażana statycznie na platformie Vercel Edge. Dokładane są wszelkie starania w celu zapewnienia ciągłości działania, jednak nie udziela się gwarancji SLA.',
    licenseHeader: '5. Licencja Open-Source i Prawa Autorskie',
    licenseText: 'Kod źródłowy BugMortem jest udostępniany na zasadach permisywnej licencji MIT.',
    licenseBullets: [
      'Możesz swobodnie przeglądać, forkiem powielać i adaptować wzorce odporności zawarte w repozytorium.',
      'Wszelkie prawa autorskie do projektu zachowuje Adam Gierczak (@AdamBabinicz).',
    ],
    cookiesUsageHeader: '1. Brak Ciasteczek Śledzących',
    cookiesUsageText: 'BugMortem nie zapisuje żadnych ciasteczek śledzących ani reklamowych. Całość stanu opiera się wyłącznie na mechanizmie localStorage, który działa ściśle w piaskownicy przeglądarki.',
  },
  cookies: {
    title: 'Ustawienia Prywatności i Plików Cookie',
    description: 'Wykorzystujemy pamięć lokalną i opcjonalną telemetrię do weryfikacji odporności systemowej.',
    essential: 'Niezbędne',
    essentialDesc: 'Wymagane do prawidłowego działania aplikacji i zachowania stanu sesji',
    alwaysActive: 'Zawsze aktywne',
    analytics: 'Analityka',
    analyticsDesc: 'Google Analytics 4 & GTM (Consent Mode v2)',
    marketing: 'Marketing',
    marketingDesc: 'Personalizacja i kampanie reklamowe',
    acceptAll: 'Zaakceptuj Wszystkie',
    rejectNonEssential: 'Odrzuć Opcjonalne',
    savePreferences: 'Zapisz Preferencje',
    details: 'Dostosuj',
    settings: 'Ustawienia Ciasteczek',
    closeAndReject: 'Zamknij i odrzuć opcjonalne',
  },
  footer: {
    disclaimer: '© 2026 BugMortem. Wszelkie prawa zastrzeżone. Autor: Adam Gierczak (@AdamBabinicz) na hackathon Kiroween 2026 (AWS & Devpost).',
    privacy: 'Polityka Prywatności',
    terms: 'Regulamin',
    cookieSettings: 'Ustawienia Cookie',
  },
};
