import { TranslationDictionary } from '../types';

export const en: TranslationDictionary = {
  common: {
    close: 'Close',
  },
  hero: {
    badge: 'KIROWEEN 2026 HACKATHON ENTRY',
    title: 'BugMortem – AI Autopsy Suite & SRE Post-Mortem Studio',
    subtitle: 'Forensic post-incident analysis and automated resilience patterns for catastrophic production failures.',
    inputCta: '+ SUBMIT YOUR OWN INCIDENT',
    statusActive: 'Active Incident (P0 Critical)',
    statusStable: 'System Nominal (200 OK)',
  },
  navigation: {
    langPl: 'Polski (PL)',
    langEn: 'English (EN)',
    toggleTheme: 'Toggle Theme',
  },
  presets: {
    sectionTitle: 'INCIDENT AUTOPSY ARCHIVE',
    items: {
      'react-hydration': {
        id: 'react-hydration',
        title: 'React Hydration Mismatch & DOM Tree Collapse',
        badge: 'FRONTEND / SSR',
        severity: 'P0',
        description: 'Unstable use of new Date() or access to the window object during SSR triggers React Error #418, completely destroying client interactivity.',
        codeSnippet: `// ❌ CURSED CODE: Unstable timestamp evaluation during SSR
export default function ClockBanner() {
  // BUG: new Date() produces a different timestamp on the server and on the client
  const time = new Date().toLocaleTimeString();
  return <div className="banner">Last sync: {time}</div>;
}`,
        revivedCode: `// ✅ RESURRECTED SRE CODE: Two-phase hydration with a mounted flag
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
    return <div className="banner skeleton">Syncing...</div>;
  }

  return <div className="banner">Last sync: {time}</div>;
}`,
        stackTrace: `Error: Hydration failed because the initial UI does not match what was rendered on the server.
    at throwOnHydrationMismatch (react-dom-client.development.js:1003)
    at tryToClaimNextHydratableInstance (react-dom-client.development.js:1120)
    at updateHostComponent (react-dom-client.development.js:9840)
    at beginWork (react-dom-client.development.js:10820)`,
        timeline: [
          {
            time: '14:02:11 UTC',
            label: 'HTML generated on the server',
            desc: 'The SSR server returns static markup stamped 14:02:11',
          },
          {
            time: '14:02:12 UTC',
            label: 'Bundle hydration in the browser',
            desc: 'The browser executes the JS at 14:02:12, creating a timestamp divergence',
          },
          {
            time: '14:02:12 UTC',
            label: 'DOM tree unmount',
            desc: 'React throws error #418 and replaces the page with a white screen',
            isFatal: true,
          },
        ],
        replayerSteps: [
          {
            step: 1,
            timeOffset: '+0.0s',
            title: 'SSR document generated at the edge',
            description: 'The edge server evaluates new Date() and streams HTML stamped 14:02:11.',
            telemetry: {
              latencyMs: 42,
              errorRate: '0.00%',
              rps: '14.2k',
            },
            severity: 'P1',
          },
          {
            step: 2,
            timeOffset: '+0.8s',
            title: 'Client hydration bind attempt',
            description: 'The browser bundle executes at 14:02:12. Its checksum differs from the server one.',
            telemetry: {
              latencyMs: 380,
              errorRate: '8.4%',
              rps: '11.8k',
            },
            severity: 'P1',
          },
          {
            step: 3,
            timeOffset: '+1.2s',
            title: 'DOM desynchronization and UI collapse',
            description: 'React error #418 unmounts the interactive tree. Cart buttons stop responding.',
            telemetry: {
              latencyMs: 1420,
              errorRate: '84.6%',
              rps: '2.1k',
            },
            severity: 'P0',
          },
        ],
        fiveWhys: [
          'The web application throws "Minified React error #418" and unmounts the interactive client DOM tree.',
          'The component calls new Date().toLocaleTimeString() directly inside the rendered JSX body.',
          'The checksum of the server-rendered HTML differs from the initial tree rendered by the browser.',
          'There is no client-side execution boundary (no mounted state flag and no guard inside useEffect).',
          'There are no SSR ESLint rules and no automated hydration regression tests in the CI/CD pipeline.',
        ],
        blastRadius: {
          nodes: [
            {
              id: 'client-spa',
              name: 'client-spa',
              role: 'Next.js Frontend',
              status: 'epicenter',
              statusCode: 'FAIL',
            },
            {
              id: 'edge-gateway',
              name: 'edge-gateway',
              role: 'Vercel Edge Network',
              status: 'degraded',
              statusCode: 'WARN',
            },
            {
              id: 'auth-service',
              name: 'auth-service',
              role: 'JWT Sessions / Auth',
              status: 'healthy',
              statusCode: '200 OK',
            },
            {
              id: 'database',
              name: 'database',
              role: 'Neon Postgres',
              status: 'healthy',
              statusCode: '200 OK',
            },
            {
              id: 'worker-pool',
              name: 'worker-pool',
              role: 'Background Queue',
              status: 'healthy',
              statusCode: '200 OK',
            },
          ],
          summary: {
            epicenterCount: 1,
            degradedCount: 1,
            healthyCount: 3,
          },
        },
        chaosMetrics: [
          {
            id: 'cm-1',
            name: 'DOM Tree Integrity',
            severity: 'P0',
            description: 'Mismatch detected between SSR and CSR nodes',
            status: 'injecting',
          },
          {
            id: 'cm-2',
            name: 'Time to Interactive (TTI)',
            severity: 'P1',
            description: 'Event listeners frozen after the error',
            status: 'injecting',
          },
          {
            id: 'cm-3',
            name: 'Checkout Cart Conversion',
            severity: 'P0',
            description: 'Order button frozen for 12% of users',
            status: 'injecting',
          },
        ],
        postMortem: {
          summary: 'Unstable timestamps in server components triggered a mass of React #418 hydration errors.',
          impact: '12% of visitors experienced a frozen interface and lost the data they had entered in the order form.',
          actionItems: [
            'Roll out the two-phase mounted flag in every time-dependent component.',
            'Implement an ESLint rule banning new Date() and Math.random() in server-rendered code.',
            'Add automated Playwright SSR smoke tests to the main continuous integration (CI) pipeline.',
          ],
        },
      },
      'connection-pool': {
        id: 'connection-pool',
        title: 'Deadly Connection Pool Spiral',
        badge: 'DATABASE / AURORA',
        severity: 'P0',
        description: 'Unindexed analytical queries exhausted the 200-connection limit on the Amazon RDS Aurora cluster, paralysing the transactional threads of the checkout flow.',
        codeSnippet: `// ❌ CURSED CODE: Uncontrolled database connection leak
export async function getAnalyticsReport(userId: string) {
  // BUG: Direct connection with no timeout and no return to the pool
  const client = await pool.connect();
  const query = 'SELECT * FROM orders WHERE user_id = $1 ORDER BY timestamp DESC';
  const result = await client.query(query, [userId]);
  // A missing client.release() on error paths kills the entire pool
  return result.rows;
}`,
        revivedCode: `// ✅ RESURRECTED SRE CODE: Context-managed connection with a hard timeout
export async function getAnalyticsReport(userId: string) {
  const client = await pool.connect();
  try {
    // Enforce a strict query execution timeout
    await client.query('SET statement_timeout = 2000');
    const query = 'SELECT id, total, status FROM orders WHERE user_id = $1 ORDER BY timestamp DESC LIMIT 50';
    const result = await client.query(query, [userId]);
    return result.rows;
  } finally {
    // Guaranteed return of the connection to the pool in the finally block
    client.release();
  }
}`,
        stackTrace: `FATAL: remaining connection slots are reserved for non-replication superuser connections
    at Connection.parseE (pg-protocol/dist/parser.js:369)
    at Connection.parseMessage (pg-protocol/dist/parser.js:121)
    at Socket.<anonymous> (pg-protocol/dist/index.js:11)
    at TCP.onStreamRead (node:net:561)`,
        timeline: [
          {
            time: '03:14:00 UTC',
            label: 'Flood of heavy queries',
            desc: 'The job scheduler launches an unindexed analytical report',
          },
          {
            time: '03:14:22 UTC',
            label: 'Database pool saturation',
            desc: 'Active connections climb from 40 to the 200/200 ceiling',
          },
          {
            time: '03:14:45 UTC',
            label: 'Checkout error cascade',
            desc: 'Store transactions start returning 503 in bulk',
            isFatal: true,
          },
        ],
        replayerSteps: [
          {
            step: 1,
            timeOffset: '+0.0s',
            title: 'Batch report kick-off',
            description: 'The nightly analytics job fires 80 parallel queries that scan entire tables.',
            telemetry: {
              latencyMs: 84,
              errorRate: '0.00%',
              rps: '16.5k',
            },
            severity: 'P1',
          },
          {
            step: 2,
            timeOffset: '+12.0s',
            title: 'Connection ceiling reached',
            description: 'The max_connections limit (200/200) is exhausted. Health-check probes start hanging.',
            telemetry: {
              latencyMs: 2450,
              errorRate: '34.2%',
              rps: '7.1k',
            },
            severity: 'P1',
          },
          {
            step: 3,
            timeOffset: '+29.0s',
            title: 'Cascading database collapse',
            description: 'Automatic replica failover fails. Microservices throw FATAL connection slots errors.',
            telemetry: {
              latencyMs: 12800,
              errorRate: '98.4%',
              rps: '820',
            },
            severity: 'P0',
          },
        ],
        fiveWhys: [
          'The orders API returns 503 Service Unavailable for every cart transaction.',
          'The PostgreSQL server rejects new connections with "remaining connection slots reserved".',
          'The batch analytics report opened hundreds of unindexed connections and locked tables.',
          'There is no pool-managing proxy (PgBouncer) between the microservices and the Aurora cluster.',
          'There are no query timeouts (statement_timeout) and no dedicated read-only replica.',
        ],
        blastRadius: {
          nodes: [
            {
              id: 'client-spa',
              name: 'client-spa',
              role: 'Web Client',
              status: 'degraded',
              statusCode: 'WARN',
            },
            {
              id: 'edge-gateway',
              name: 'edge-gateway',
              role: 'Kong Gateway',
              status: 'degraded',
              statusCode: '503',
            },
            {
              id: 'auth-service',
              name: 'auth-service',
              role: 'Login Cluster',
              status: 'degraded',
              statusCode: 'FAIL',
            },
            {
              id: 'database',
              name: 'database',
              role: 'Aurora Postgres Primary',
              status: 'epicenter',
              statusCode: 'FATAL',
            },
            {
              id: 'worker-pool',
              name: 'worker-pool',
              role: 'Celery Queue',
              status: 'degraded',
              statusCode: 'FAIL',
            },
          ],
          summary: {
            epicenterCount: 1,
            degradedCount: 4,
            healthyCount: 0,
          },
        },
        chaosMetrics: [
          {
            id: 'cm-db-1',
            name: 'Active Aurora Connections',
            severity: 'P0',
            description: 'Pool utilisation reached 100% of capacity',
            status: 'injecting',
          },
          {
            id: 'cm-db-2',
            name: 'Rolled-Back Transaction Rate',
            severity: 'P0',
            description: 'More than 85% of orders were cancelled by the database error',
            status: 'injecting',
          },
        ],
        postMortem: {
          summary: 'Database connection pool exhaustion paralysed authentication and order placement.',
          impact: '48 minutes of complete checkout unavailability; estimated revenue loss: USD 42,000.',
          actionItems: [
            'Deploy a PgBouncer proxy in transaction pooling mode with a 5,000 client connection limit.',
            'Enforce statement_timeout = 2500ms for all non-administrative database roles.',
            'Move analytical queries onto an isolated read-only replica.',
          ],
        },
      },
      'oom-reaper': {
        id: 'oom-reaper',
        title: 'Awakening of the OOM Memory Reaper',
        badge: 'RUNTIME / MEMORY',
        severity: 'P0',
        description: 'A bulk export of 2.5 million orders into a CSV file allocated the entire dataset on the Node.js heap, triggering a process kill by the Linux kernel.',
        codeSnippet: `// ❌ CURSED CODE: Loading an unbounded dataset into the V8 heap
export async function exportAllOrders() {
  const allOrders = await db.orders.findMany(); // 2.5 million records into RAM
  let csv = 'id,total,created_at\\n';
  for (const order of allOrders) {
    csv += \`\${order.id},\${order.total},\${order.createdAt}\\n\`;
  }
  return csv;
}`,
        revivedCode: `// ✅ RESURRECTED SRE CODE: Streaming pipeline with backpressure control
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
        stackTrace: `<--- Last GC cycles --->
[1:0x55d49a0]    14820 ms: Mark-sweep (reduce) 2041.4 (2082.1) -> 2040.2 (2082.1) MB, 842.1 / 0.0 ms
[1:0x55d49a0]    15710 ms: Mark-sweep (reduce) 2040.2 (2082.1) -> 2039.8 (2082.1) MB, 890.0 / 0.0 ms

<--- JS heap dump --->
FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory
1: 0xb09c10 node::Abort() [node]
2: 0xa1c28f node::FatalError(char const*, char const*) [node]`,
        timeline: [
          {
            time: '11:45:00 UTC',
            label: 'Export job submitted',
            desc: 'An administrator launches the quarterly dump of 2.5 million transactions',
          },
          {
            time: '11:45:14 UTC',
            label: 'Heap memory exhaustion',
            desc: 'V8 memory usage hits the 2048 MB limit; the GC burns 98% of CPU on cleanup',
          },
          {
            time: '11:45:16 UTC',
            label: 'SIGKILL signal from the kernel',
            desc: 'The Linux OOM killer immediately terminates the Node.js process with exit code 137',
            isFatal: true,
          },
        ],
        replayerSteps: [
          {
            step: 1,
            timeOffset: '+0.0s',
            title: 'Ledger download requested',
            description: 'A user with administrator rights requests a full CSV file of transactions.',
            telemetry: {
              latencyMs: 65,
              errorRate: '0.00%',
              rps: '15.1k',
            },
            severity: 'P1',
          },
          {
            step: 2,
            timeOffset: '+8.4s',
            title: 'Approaching the RAM ceiling',
            description: 'The V8 heap passes 1.8 GB. The process stops responding because of garbage collection pauses.',
            telemetry: {
              latencyMs: 1820,
              errorRate: '18.9%',
              rps: '8.4k',
            },
            severity: 'P1',
          },
          {
            step: 3,
            timeOffset: '+16.2s',
            title: 'Process killed with SIGKILL 137',
            description: 'The Linux OOM mechanism kills the container. The pod enters a CrashLoopBackOff cycle.',
            telemetry: {
              latencyMs: 6400,
              errorRate: '62.1%',
              rps: '2.4k',
            },
            severity: 'P0',
          },
        ],
        fiveWhys: [
          'The worker node crashed and fell into an endless CrashLoopBackOff cycle.',
          'The Linux kernel sent a SIGKILL signal (exit code 137) to the Node.js process.',
          'The V8 runtime reached the hard heap allocation ceiling of 2 GB.',
          'The export function tried to buffer 2.5 million database objects into a single in-memory string.',
          'There is no stream pipeline handling (backpressure) and no query pagination in the export path.',
        ],
        blastRadius: {
          nodes: [
            {
              id: 'client-spa',
              name: 'client-spa',
              role: 'Management Panel',
              status: 'degraded',
              statusCode: 'WARN',
            },
            {
              id: 'edge-gateway',
              name: 'edge-gateway',
              role: 'API Gateway',
              status: 'healthy',
              statusCode: '200 OK',
            },
            {
              id: 'auth-service',
              name: 'auth-service',
              role: 'Login Service',
              status: 'healthy',
              statusCode: '200 OK',
            },
            {
              id: 'database',
              name: 'database',
              role: 'Database',
              status: 'healthy',
              statusCode: '200 OK',
            },
            {
              id: 'worker-pool',
              name: 'worker-pool',
              role: 'Async Task Worker',
              status: 'epicenter',
              statusCode: 'CRASH',
            },
          ],
          summary: {
            epicenterCount: 1,
            degradedCount: 1,
            healthyCount: 3,
          },
        },
        chaosMetrics: [
          {
            id: 'cm-oom-1',
            name: 'Node Heap Usage (MB)',
            severity: 'P0',
            description: '2048 / 2048 MB in use',
            status: 'injecting',
          },
          {
            id: 'cm-oom-2',
            name: 'Garbage Collector Paralysis',
            severity: 'P0',
            description: '98% of CPU time spent attempting to free memory',
            status: 'injecting',
          },
        ],
        postMortem: {
          summary: 'Loading 2.5 million records into RAM overflowed the heap and got the process killed by the OOM killer.',
          impact: 'The background worker pool was paralysed; invoice processing fell 3 hours behind.',
          actionItems: [
            'Replace loading arrays into RAM with stream.pipeline streams and CSV transformers.',
            'Configure Kubernetes memory limits with a warning threshold at 75% usage.',
            'Make cursor pagination mandatory on every data export endpoint.',
          ],
        },
      },
      'retry-storm': {
        id: 'retry-storm',
        title: 'Cascading Retry Storm',
        badge: 'CONCURRENCY / NETWORK',
        severity: 'P1',
        description: 'Instant retries with no random jitter during a 500ms latency spike multiplied traffic by 500%, taking the database down.',
        codeSnippet: `// ❌ CURSED CODE: Immediate retry loop with no jitter
async function fetchWithRetry(url: string, attempts = 5) {
  for (let i = 0; i < attempts; i++) {
    try {
      return await fetch(url);
    } catch (err) {
      // BUG: Simultaneous retries finish off an already dying server
      await new Promise(r => setTimeout(r, 100));
    }
  }
}`,
        revivedCode: `// ✅ RESURRECTED SRE CODE: Exponential backoff with full jitter
async function fetchWithFullJitter(url: string, maxAttempts = 3, baseDelay = 100) {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      const res = await fetch(url);
      if (res.ok) return res;
      if (res.status < 500) throw new Error(\`Client error: \${res.status}\`);
    } catch (err) {
      if (attempt === maxAttempts - 1) throw err;
      // Exponential backoff with full jitter formula
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
          {
            time: '14:22:00 UTC',
            label: '500ms latency spike',
            desc: 'Transient packet loss causes the first errors in mobile applications',
          },
          {
            time: '14:22:01 UTC',
            label: 'A 10x larger traffic wave',
            desc: '150,000 clients retry the request at exactly 100 ms at the same time',
          },
          {
            time: '14:22:05 UTC',
            label: 'Global gateway lockdown',
            desc: 'API gateways enable throttling and reject 92% of requests',
            isFatal: true,
          },
        ],
        replayerSteps: [
          {
            step: 1,
            timeOffset: '+0.0s',
            title: 'Transient server latency',
            description: 'A network route switch generates 400ms of latency at the edge gateway.',
            telemetry: {
              latencyMs: 410,
              errorRate: '1.2%',
              rps: '14.0k',
            },
            severity: 'P1',
          },
          {
            step: 2,
            timeOffset: '+0.5s',
            title: 'Wave of synchronous retries',
            description: 'Clients without jitter fire 5 simultaneous attempts, multiplying traffic fivefold.',
            telemetry: {
              latencyMs: 2540,
              errorRate: '14.8%',
              rps: '8.1k',
            },
            severity: 'P1',
          },
          {
            step: 3,
            timeOffset: '+2.1s',
            title: 'Throttling at the edge gateway',
            description: 'Queues overflow. Rate limiters cut 90% of requests with HTTP 429.',
            telemetry: {
              latencyMs: 4800,
              errorRate: '48.9%',
              rps: '3.2k',
            },
            severity: 'P1',
          },
        ],
        fiveWhys: [
          'Upstream services throttle traffic by returning HTTP 429 Too Many Requests.',
          'Requests at the API gateway spiked from 14k RPS to over 70k RPS within 2 seconds.',
          'A brief 500ms network disturbance triggered automatic retry loops in every application.',
          'Client applications had fixed 100ms retries with no randomised component.',
          'There was no Exponential Backoff with full jitter algorithm and no client-side Circuit Breakers.',
        ],
        blastRadius: {
          nodes: [
            {
              id: 'client-spa',
              name: 'client-spa',
              role: 'Customer Applications',
              status: 'degraded',
              statusCode: '429',
            },
            {
              id: 'edge-gateway',
              name: 'edge-gateway',
              role: 'Cloudflare Edge',
              status: 'epicenter',
              statusCode: 'THROTTLE',
            },
            {
              id: 'auth-service',
              name: 'auth-service',
              role: 'Authorization Service',
              status: 'degraded',
              statusCode: 'WARN',
            },
            {
              id: 'database',
              name: 'database',
              role: 'RDS Database',
              status: 'degraded',
              statusCode: 'WARN',
            },
            {
              id: 'worker-pool',
              name: 'worker-pool',
              role: 'Task Queue',
              status: 'healthy',
              statusCode: '200 OK',
            },
          ],
          summary: {
            epicenterCount: 1,
            degradedCount: 3,
            healthyCount: 1,
          },
        },
        chaosMetrics: [
          {
            id: 'cm-rs-1',
            name: 'Inbound Traffic Multiplier',
            severity: 'P1',
            description: '5.2x above the average',
            status: 'injecting',
          },
          {
            id: 'cm-rs-2',
            name: 'Dropped Packet Rate',
            severity: 'P1',
            description: '89.4% of requests blocked at the edge',
            status: 'injecting',
          },
        ],
        postMortem: {
          summary: 'A brief server latency spike turned into an avalanche retry storm because of missing random jitter.',
          impact: 'The network gateway blocked traffic for 14 minutes, cutting off users worldwide.',
          actionItems: [
            'Enforce the Exponential Backoff with Full Jitter algorithm in every SDK library.',
            'Deploy adaptive Circuit Breakers at the edge gateway.',
            'Introduce rate limits tied to a unique device identifier.',
          ],
        },
      },
      'cors-nightmare': {
        id: 'cors-nightmare',
        title: 'CORS Preflight Nightmare',
        badge: 'NETWORK / SECURITY',
        severity: 'P1',
        description: 'Missing CORS headers on the API gateway made every OPTIONS preflight request fail with 403, paralysing the SPA front end.',
        codeSnippet: `// ❌ CURSED CODE: Vulnerable dynamic reflection of the Origin header
app.use((req, res, next) => {
  // BUG: Reflecting the header with no domain verification
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  // No OPTIONS handling returns 404/403 on the preflight request
  next();
});`,
        revivedCode: `// ✅ RESURRECTED SRE CODE: Strict domain allow-list and preflight caching
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
    res.header('Access-Control-Max-Age', '86400'); // Cache the preflight for 24h
  }
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});`,
        stackTrace: `Access to fetch at 'https://api.bugmortem.dev/v1/auth' from origin 'https://bugmortem.vercel.app' 
has been blocked by CORS policy: Response to preflight request doesn't pass access control check: 
No 'Access-Control-Allow-Origin' header is present on the requested resource. 
If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.`,
        timeline: [
          {
            time: '17:00:00 UTC',
            label: 'Gateway configuration deployed',
            desc: 'A security fix updates the CORS rules on the API gateway',
          },
          {
            time: '17:00:05 UTC',
            label: 'Preflight request failure',
            desc: 'Browsers block OPTIONS requests returning HTTP 403',
          },
          {
            time: '17:00:10 UTC',
            label: 'Total UI paralysis',
            desc: 'The front-end application stops fetching any data',
            isFatal: true,
          },
        ],
        replayerSteps: [
          {
            step: 1,
            timeOffset: '+0.0s',
            title: 'Gateway rule update',
            description: 'A Terraform deployment modifies the CORS headers on the API gateway.',
            telemetry: {
              latencyMs: 38,
              errorRate: '0.00%',
              rps: '15.4k',
            },
            severity: 'P1',
          },
          {
            step: 2,
            timeOffset: '+1.5s',
            title: 'OPTIONS preflight requests rejected',
            description: 'Browsers send their mandatory OPTIONS preflight and receive 403 Forbidden.',
            telemetry: {
              latencyMs: 120,
              errorRate: '45.0%',
              rps: '9.2k',
            },
            severity: 'P1',
          },
          {
            step: 3,
            timeOffset: '+4.0s',
            title: 'Complete SPA lock-up',
            description: 'No authenticated request passes the CORS check. 100% of clients are cut off.',
            telemetry: {
              latencyMs: 210,
              errorRate: '99.8%',
              rps: '1.2k',
            },
            severity: 'P1',
          },
        ],
        fiveWhys: [
          'The web application can neither sign the user in nor fetch incident data.',
          'The browser console reports "Blocked by CORS policy: No Access-Control-Allow-Origin header present".',
          'The API gateway returns HTTP 403 for the OPTIONS preflight requests sent by the browser.',
          'A faulty gateway rule stripped the CORS headers from every request other than GET.',
          'There are no automated integration tests verifying preflight request caching in the browser.',
        ],
        blastRadius: {
          nodes: [
            {
              id: 'client-spa',
              name: 'client-spa',
              role: 'SPA Application',
              status: 'epicenter',
              statusCode: 'CORS_FAIL',
            },
            {
              id: 'edge-gateway',
              name: 'edge-gateway',
              role: 'AWS API Gateway',
              status: 'degraded',
              statusCode: '403',
            },
            {
              id: 'auth-service',
              name: 'auth-service',
              role: 'Login API',
              status: 'healthy',
              statusCode: '200 OK',
            },
            {
              id: 'database',
              name: 'database',
              role: 'Database',
              status: 'healthy',
              statusCode: '200 OK',
            },
            {
              id: 'worker-pool',
              name: 'worker-pool',
              role: 'Task Queue',
              status: 'healthy',
              statusCode: '200 OK',
            },
          ],
          summary: {
            epicenterCount: 1,
            degradedCount: 1,
            healthyCount: 3,
          },
        },
        chaosMetrics: [
          {
            id: 'cm-cors-1',
            name: 'Preflight Request Failures',
            severity: 'P1',
            description: '99.8% of OPTIONS requests rejected',
            status: 'injecting',
          },
          {
            id: 'cm-cors-2',
            name: 'Client Network Errors',
            severity: 'P1',
            description: 'Zero authenticated traffic passing through the gateway',
            status: 'injecting',
          },
        ],
        postMortem: {
          summary: 'A faulty CORS policy update made every OPTIONS preflight request fail with 403.',
          impact: 'Complete web application outage for all users for 22 minutes.',
          actionItems: [
            'Deploy the Access-Control-Max-Age = 86400 (24h) header to cache preflight requests.',
            'Add automated Playwright smoke tests that verify the CORS headers in the deployment pipeline.',
            'Maintain a strict allow-list of permitted domains in a central infrastructure repository.',
          ],
        },
      },
      'serverless-timeout': {
        id: 'serverless-timeout',
        title: 'Serverless Cold Start Cascade & Gateway 504',
        badge: 'CLOUD / SERVERLESS',
        severity: 'P0',
        description: 'Initialising a heavy database client inside the serverless function handler triggered a cold start cascade that breached the 29-second API Gateway limit.',
        codeSnippet: `// ❌ CURSED CODE: Re-initialising the connection pool inside the function
import { Pool } from 'pg';

export const handler = async (event: any) => {
  // BUG: Opening a heavy database pool on every function invocation
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const client = await pool.connect();
  const res = await client.query('SELECT * FROM checkout_cart WHERE cart_id = $1', [event.cartId]);
  return { statusCode: 200, body: JSON.stringify(res.rows) };
};`,
        revivedCode: `// ✅ RESURRECTED SRE CODE: Connection reuse and RDS Proxy pooling
import { Pool } from 'pg';

// The global execution context preserves the connection between invocations
const pool = new Pool({
  host: process.env.RDS_PROXY_HOST, // Connection routed through AWS RDS Proxy
  max: 1, // A single connection per container prevents pool exhaustion
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
          {
            time: '02:15:00 UTC',
            label: 'Campaign traffic spike',
            desc: 'A marketing promotion forces 2,000 new Lambda containers to be allocated',
          },
          {
            time: '02:15:15 UTC',
            label: 'Cold start and database lock-up',
            desc: 'Every container negotiates TLS encryption and a database connection at the same time',
          },
          {
            time: '02:15:29 UTC',
            label: 'API gateway time ceiling',
            desc: 'API Gateway severs connections after 29 seconds with a 504 Gateway Timeout',
            isFatal: true,
          },
        ],
        replayerSteps: [
          {
            step: 1,
            timeOffset: '+0.0s',
            title: 'Sudden invocation spike',
            description: 'A traffic surge forces AWS Lambda to start 1,200 new execution environments.',
            telemetry: {
              latencyMs: 450,
              errorRate: '0.00%',
              rps: '18.4k',
            },
            severity: 'P1',
          },
          {
            step: 2,
            timeOffset: '+12.5s',
            title: 'TLS and connection negotiation storm',
            description: '1,200 containers connect to the database in parallel. The connection queue locks up.',
            telemetry: {
              latencyMs: 14200,
              errorRate: '42.8%',
              rps: '6.1k',
            },
            severity: 'P1',
          },
          {
            step: 3,
            timeOffset: '+29.0s',
            title: 'Hard 504 cut-off at the API gateway',
            description: 'API Gateway severs every pending connection once the hard 29-second limit is reached.',
            telemetry: {
              latencyMs: 29000,
              errorRate: '99.4%',
              rps: '410',
            },
            severity: 'P0',
          },
        ],
        fiveWhys: [
          'API Gateway answers checkout requests with HTTP 504 Gateway Timeout.',
          'The Lambda functions did not respond before the 29-second gateway timeout.',
          'A sudden traffic spike forced hundreds of containers to start simultaneously in cold start mode.',
          'The database connection pool was created inside the handler instead of at global scope.',
          'There was no connection proxy (RDS Proxy) and no reserved concurrency (Provisioned Concurrency) on critical paths.',
        ],
        blastRadius: {
          nodes: [
            {
              id: 'client-spa',
              name: 'client-spa',
              role: 'Checkout SPA',
              status: 'degraded',
              statusCode: '504',
            },
            {
              id: 'edge-gateway',
              name: 'edge-gateway',
              role: 'AWS API Gateway',
              status: 'epicenter',
              statusCode: 'TIMEOUT',
            },
            {
              id: 'auth-service',
              name: 'auth-service',
              role: 'Cognito / JWT',
              status: 'healthy',
              statusCode: '200 OK',
            },
            {
              id: 'database',
              name: 'database',
              role: 'Aurora Serverless',
              status: 'degraded',
              statusCode: 'STALL',
            },
            {
              id: 'worker-pool',
              name: 'worker-pool',
              role: 'Lambda Fleet',
              status: 'degraded',
              statusCode: 'COLD_START',
            },
          ],
          summary: {
            epicenterCount: 1,
            degradedCount: 3,
            healthyCount: 1,
          },
        },
        chaosMetrics: [
          {
            id: 'cm-srv-1',
            name: 'Container Cold Start Time',
            severity: 'P0',
            description: '28,400ms average per new container',
            status: 'injecting',
          },
          {
            id: 'cm-srv-2',
            name: '504 Timeout Rate',
            severity: 'P0',
            description: '99.4% of invocations ended in a timeout',
            status: 'injecting',
          },
        ],
        postMortem: {
          summary: 'Initialising the connection pool inside the function during a traffic spike pushed calls past the 29-second API gateway timeout.',
          impact: 'The storefront cart was fully down for 35 minutes; zero orders processed in the peak hour.',
          actionItems: [
            'Move database client instances to global scope outside the handler function.',
            'Deploy AWS RDS Proxy to manage connection pooling and eliminate the TLS overhead.',
            'Enable Provisioned Concurrency on critical checkout paths ahead of marketing campaigns.',
          ],
        },
      },
      's3-lambda-loop': {
        id: 's3-lambda-loop',
        title: 'AWS S3 ⇄ Lambda Recursive Death Loop Spiral',
        badge: 'AWS / SERVERLESS',
        severity: 'P0',
        description: 'An S3 event trigger without a prefix filter made the Lambda function write thumbnails back into the same source bucket, invoking itself 142,000 times in 4 minutes and exhausting the AWS account concurrency limit (1000/1000), paralysing every other production service.',
        codeSnippet: `// ❌ CURSED CODE: Lambda writes its output into the same S3 bucket that triggers it
export const handler = async (event: S3Event) => {
  for (const record of event.Records) {
    const srcKey = record.s3.object.key;
    const srcBucket = record.s3.bucket.name; // "media-assets"

    // BUG 1: No prefix filter — it fires for EVERY object in the bucket,
    //         including the thumbnails this very function is about to write.
    // BUG 2: Writing the thumbnail back into srcBucket triggers
    //         another s3:ObjectCreated event → infinite recursive loop.
    const thumbnail = await resizeImage(srcKey, srcBucket);
    await s3.putObject({
      Bucket: srcBucket,          // ← THE SAME bucket as the trigger source!
      Key: \`thumb_\${srcKey}\`,
      Body: thumbnail,
    }).promise();
  }
};`,
        revivedCode: `// ✅ RESURRECTED SRE CODE: Separate output bucket + prefix filter + loop guard
import { S3Event } from 'aws-lambda';
import { S3 } from 'aws-sdk';

const s3 = new S3();
const INPUT_PREFIX = 'uploads/';    // process originals only
const OUTPUT_BUCKET = process.env.THUMBNAIL_BUCKET!; // isolated output bucket

export const handler = async (event: S3Event): Promise<void> => {
  // Recursion guard: reject events raised by our own output bucket
  if (process.env.AWS_LAMBDA_FUNCTION_NAME &&
      event.Records[0]?.s3.bucket.name === OUTPUT_BUCKET) {
    console.warn('[SRE GUARD: rejected a recursive invocation from the output bucket]');
    return;
  }

  for (const record of event.Records) {
    const srcKey = record.s3.object.key;
    const srcBucket = record.s3.bucket.name;

    // Guard: process only objects under the uploads/ directory
    if (!srcKey.startsWith(INPUT_PREFIX)) {
      console.info('[SRE GUARD: skipping \${srcKey} — outside the uploads/ prefix]');
      continue;
    }

    const thumbnail = await resizeImage(srcKey, srcBucket);

    // Write to the ISOLATED output bucket — it cannot re-invoke this same Lambda
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
          {
            time: '14:00:00 UTC',
            label: 'Single file upload',
            desc: 'A user uploads header.jpg (2.1 MB) into the media-assets bucket',
          },
          {
            time: '14:00:03 UTC',
            label: 'Cycle 1: self-invocation',
            desc: 'Lambda writes thumb_header.jpg into media-assets; S3 immediately fires a new s3:ObjectCreated event',
          },
          {
            time: '14:00:15 UTC',
            label: 'Exponential invocation avalanche',
            desc: 'Every thumbnail write fires another execution: 1 → 2 → 4 → 8 parallel processes',
          },
          {
            time: '14:01:00 UTC',
            label: 'Concurrency exhaustion',
            desc: 'Image processing occupies 800 of the account 1,000 concurrency slots; CloudWatch alarms fire',
          },
          {
            time: '14:03:42 UTC',
            label: 'Global AWS account blackout',
            desc: 'The 1000/1000 concurrency limit was reached (142,000 invocations in total); authentication, orders and payments completely blocked with HTTP 429',
            isFatal: true,
          },
        ],
        replayerSteps: [
          {
            step: 1,
            timeOffset: '+0.0s',
            title: 'First recursion step after the upload',
            description: 'A user uploads header.jpg into the media-assets bucket. Lambda shrinks it and writes thumb_header.jpg into the same bucket with no prefix filter.',
            telemetry: {
              latencyMs: 312,
              errorRate: '0.00%',
              rps: '1.2k',
            },
            severity: 'P1',
          },
          {
            step: 2,
            timeOffset: '+15.0s',
            title: 'Avalanche growth of parallel invocations',
            description: 'Each new thumbnail triggers another Lambda run. The container count grows exponentially: 1 → 2 → 4 → 16 → 256 parallel instances.',
            telemetry: {
              latencyMs: 1840,
              errorRate: '12.4%',
              rps: '14.2k',
            },
            severity: 'P1',
          },
          {
            step: 3,
            timeOffset: '+231.0s',
            title: 'AWS account limit exhausted and total failure',
            description: '142,000 invocations exhaust the entire 1,000-slot account concurrency limit. Login, order and payment services are blocked with HTTP 429.',
            telemetry: {
              latencyMs: 8400,
              errorRate: '98.9%',
              rps: '142.0k',
            },
            severity: 'P0',
          },
        ],
        fiveWhys: [
          'Every AWS Lambda function across the whole account returns TooManyRequestsException (429), and the login, order and payment services stop responding.',
          'The image-processing Lambda function consumed all 1,000 concurrency slots of the AWS account within 4 minutes.',
          'The function wrote thumbnails back into the same S3 bucket that triggered it, creating an infinite self-invocation loop.',
          'The S3 notification trigger was configured without a key prefix filter, so every new object write — including the generated thumbnail — invoked the function.',
          'There was no separation of input and output buckets, no reserved concurrency cap on the function, and no AWS Recursive Loop Detection enabled in the IaC.',
        ],
        blastRadius: {
          nodes: [
            {
              id: 'worker-pool',
              name: 'worker-pool',
              role: 'AWS Lambda Fleet (image-processor)',
              status: 'epicenter',
              statusCode: 'FAIL',
            },
            {
              id: 'edge-gateway',
              name: 'edge-gateway',
              role: 'AWS API Gateway',
              status: 'degraded',
              statusCode: 'WARN',
            },
            {
              id: 'auth-service',
              name: 'auth-service',
              role: 'Login Lambda (throttled)',
              status: 'degraded',
              statusCode: 'WARN',
            },
            {
              id: 'database',
              name: 'database',
              role: 'Payment & Order Lambdas (throttled)',
              status: 'degraded',
              statusCode: 'WARN',
            },
            {
              id: 'client-spa',
              name: 'client-spa',
              role: 'S3 Ingestion Bucket (media-assets)',
              status: 'healthy',
              statusCode: '200 OK',
            },
          ],
          summary: {
            epicenterCount: 1,
            degradedCount: 3,
            healthyCount: 1,
          },
        },
        chaosMetrics: [
          {
            id: 'cm-s3-1',
            name: 'Parallel Lambda Invocations',
            severity: 'P0',
            description: '1000 / 1000 (100% of the AWS account limit exhausted)',
            status: 'injecting',
          },
          {
            id: 'cm-s3-2',
            name: 'Loop Invocation Count (4 min)',
            severity: 'P0',
            description: '142,380 uncontrolled executions',
            status: 'injecting',
          },
          {
            id: 'cm-s3-3',
            name: 'Throttled Account Requests',
            severity: 'P0',
            description: '38,410 requests rejected with HTTP 429',
            status: 'injecting',
          },
        ],
        postMortem: {
          summary: 'A missing S3 prefix filter on the trigger combined with writing the output into the source bucket produced an infinite recursive loop and complete exhaustion of the AWS account concurrency.',
          impact: '142,000 Lambda invocations in 4 minutes paralysed authentication, orders and payments across the whole account. Estimated revenue loss: USD 28,000 in blocked transactions.',
          actionItems: [
            'Separate the input and output buckets — writing processing output into the event source bucket must be categorically forbidden.',
            'Configure S3 notifications with a strict prefix filter (e.g. uploads/) to stop thumbnails from re-triggering the function.',
            'Enable the native AWS Recursive Loop Detection feature and enforce a hard reserved concurrency limit on the Lambda function.',
          ],
        },
      },
    },
  },
  codeSection: {
    cursedTitle: 'CODE AUTOPSY SECTION: CURSED VS RESURRECTED CODE',
    resurrectedTitle: 'RESURRECTED SRE CODE (RESILIENCE PATTERN)',
    cursedBadge: 'CRITICAL FAILURE',
    resurrectedBadge: 'PATTERN: SRE RESILIENCE',
    copyCta: 'Copy Resurrected Code',
    copied: 'Code Copied!',
  },
  stackTrace: {
    title: 'RAW STACK TRACE DUMP',
  },
  timeline: {
    title: 'INCIDENT CHRONOLOGY TIMELINE',
  },
  replayer: {
    title: 'INCIDENT TIME-TO-DEATH REPLAYER',
    subtitle: 'Simulate the failure sequence step by step and watch telemetry degrade in real time',
    play: 'Play Simulation',
    pause: 'Pause Simulation',
    reset: 'Reset Timeline',
    speed: 'Speed',
    stepOf: 'Step',
    telemetryLatency: 'P99 Latency',
    telemetryErrors: 'Error Rate',
    telemetryRps: 'Throughput',
  },
  fiveWhys: {
    sectionTitle: 'BLAMELESS 5-WHYS ROOT CAUSE TREE',
    sectionSubtitle: 'Systematic engineering investigation from the surface symptom down to the architectural gap.',
    levels: [
      '1. SURFACE SYMPTOM',
      '2. DIRECT TRIGGER',
      '3. DAMAGE MECHANISM',
      '4. ARCHITECTURAL FLAW',
      '5. SYSTEMIC ROOT CAUSE',
    ],
    blamelessBadge: 'BLAMELESS SRE CULTURE',
    rootCauseBadge: 'ROOT CAUSE',
    copyChain: 'Copy Cause Chain',
    copied: 'Chain Copied!',
  },
  blastRadius: {
    title: 'ARCHITECTURE BLAST RADIUS TOPOLOGY',
    subtitle: 'Cascading failure vectors across microservice boundaries and Patient Zero isolation.',
    legendEpicenter: 'Patient Zero',
    legendDegraded: 'Damage Cascade',
    legendHealthy: 'Healthy Node (200 OK)',
    badgeEpicenter: 'Critical',
    badgeDegraded: 'Degraded',
    badgeHealthy: 'Healthy',
  },
  chaos: {
    sectionTitle: 'CHAOS ENGINEERING SANDBOX (LIVE TELEMETRY)',
    sectionSubtitle: 'Inject live failure vectors and watch telemetry degrade in real time',
    btnMitigate: 'Run Self-Heal',
    btnInject: 'Inject Failure',
    statusNominal: 'SYSTEM NOMINAL',
    metricRps: 'THROUGHPUT',
    metricLatency: 'P99 LATENCY',
    metricErrorRate: 'ERROR RATE',
    scenarioLatencyTitle: 'Edge latency spike (+2500ms)',
    scenarioLatencyDesc: 'Artificial delay at the Edge Gateway causing UI request timeouts',
    scenarioDbPoolTitle: 'Database connection pool saturation',
    scenarioDbPoolDesc: '100% PostgreSQL connection utilisation leading to a cascade of 503 errors',
    scenarioMemoryTitle: 'Worker heap memory leak (OOM)',
    scenarioMemoryDesc: 'Exponential RAM growth in the worker pool triggering the OOM Killer',
    scenarioAuthStormTitle: 'Session invalidation storm (Auth Storm)',
    scenarioAuthStormDesc: 'Mass JWT token rejections and an avalanche of re-login requests',
  },
  chaosSandbox: {
    title: 'CHAOS ENGINEERING SANDBOX (LIVE TELEMETRY)',
    subtitle: 'Inject live failure vectors and watch telemetry degrade in real time',
    nominalStatus: 'SYSTEM NOMINAL',
    activeStatus: 'ACTIVE CRITICAL FAILURE',
    metricThroughput: 'THROUGHPUT',
    metricP99: 'P99 LATENCY',
    metricErrorRate: 'ERROR RATE',
    injectCta: 'Inject Failure',
    recoveringCta: 'Run Self-Heal',
  },
  prescription: {
    modalTitle: 'Official SRE Prescription & IaC Generator',
    resilienceBadge: 'ANTI-INCIDENT THERAPY',
    doctorOrdersTitle: 'SRE DOCTOR’S ORDERS',
    rxNumberPrefix: 'Rx #',
    dosageLabel: 'DOSAGE / SLA',
    preventionRuleLabel: 'PREVENTION RULE',
    copyFileCta: 'Copy File',
    copiedNotice: 'Copied!',
    downloadCta: 'Download File',
    verifiedFooter: 'Files verified by the BugMortem SRE engine',
    closeCta: 'Close the Medkit',
    items: {
      'react-hydration': {
        doctorOrder: 'Immediate rollout of two-phase hydration with a mounted flag, plus quarantine of dynamic timestamps inside SSR components.',
        dosage: 'Enforce 100% Playwright E2E coverage in the CI/CD pipeline before every production deployment.',
        preventionRule: 'ESLint rule: ban the use of new Date() and Math.random() in the render body of Server Components.',
        files: [
          {
            filename: 'eslint.config.mjs',
            language: 'javascript',
            description: 'ESLint rule blocking unstable SSR',
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
];`,
          },
          {
            filename: 'playwright-ssr.config.ts',
            language: 'typescript',
            description: 'Playwright smoke test verifying the console',
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
});`,
          },
        ],
      },
      'connection-pool': {
        doctorOrder: 'Immediate rollout of a PgBouncer pooling proxy in transaction mode plus a strict statement_timeout ceiling.',
        dosage: 'Configure max_client_conn = 5000, default_pool_size = 50, statement_timeout = 2000ms.',
        preventionRule: 'Absolute ban on running analytical queries without a limit on the Primary node of the production database.',
        files: [
          {
            filename: 'pgbouncer.ini',
            language: 'ini',
            description: 'PgBouncer configuration protecting the connection pool',
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
query_timeout = 3`,
          },
          {
            filename: '001_sre_pool_guard.sql',
            language: 'sql',
            description: 'Protection against hanging transactions in PostgreSQL',
            content: `-- SRE Guard: Prevent connection exhaustion
ALTER DATABASE prod_db SET statement_timeout = '2500ms';
ALTER DATABASE prod_db SET idle_in_transaction_session_timeout = '5000ms';
ALTER DATABASE prod_db SET lock_timeout = '1500ms';`,
          },
        ],
      },
      'oom-reaper': {
        doctorOrder: 'Rebuild the export pipeline from in-memory RAM buffering to asynchronous streaming (stream pipeline with backpressure).',
        dosage: 'Enforce a hard memory limit in Kubernetes: resources.limits.memory = 2Gi, alert at the 80% threshold.',
        preventionRule: 'Ban loading entire data collections into single array variables inside Node.js processes.',
        files: [
          {
            filename: 'k8s-pod-resilience.yaml',
            language: 'yaml',
            description: 'Memory and CPU limits in the Kubernetes manifest',
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
            cpu: "1000m"`,
          },
          {
            filename: 'stream-export-pipeline.ts',
            language: 'typescript',
            description: 'Safe streaming pattern with backpressure',
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
}`,
          },
        ],
      },
      'retry-storm': {
        doctorOrder: 'Deploy an Exponential Backoff algorithm with full random jitter plus a Circuit Breaker safety switch.',
        dosage: 'Base Delay = 100ms, Max Delay = 2000ms, Jitter = 1.0, Max Retries = 3.',
        preventionRule: 'Ban automatic, synchronous request retries (Zero-Jitter Retries) on 5xx error codes.',
        files: [
          {
            filename: 'envoy-circuit-breaker.yaml',
            language: 'yaml',
            description: 'Circuit Breaker definition in the Envoy Proxy configuration',
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
  max_ejection_percent: 50`,
          },
          {
            filename: 'resilience-retry.ts',
            language: 'typescript',
            description: 'HTTP client with the Full Jitter algorithm',
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
}`,
          },
        ],
      },
      'cors-nightmare': {
        doctorOrder: 'Deploy caching of OPTIONS requests (Access-Control-Max-Age) at the API gateway and remove wildcards (*).',
        dosage: 'Set Access-Control-Max-Age = 86400 (24h) for all preflight OPTIONS responses.',
        preventionRule: 'Absolute ban on dynamically reflecting the Origin header as allowed for requests with credentials: true.',
        files: [
          {
            filename: 'api-gateway-cors.tf',
            language: 'terraform',
            description: 'Terraform configuration for secure CORS with caching',
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
}`,
          },
          {
            filename: 'nginx-cors.conf',
            language: 'nginx',
            description: 'NGINX rules for the OPTIONS preflight',
            content: `if ($request_method = 'OPTIONS') {
    add_header 'Access-Control-Allow-Origin' 'https://app.bugmortem.dev' always;
    add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS, PUT, DELETE' always;
    add_header 'Access-Control-Allow-Headers' 'Authorization, Content-Type, X-Amz-Date' always;
    add_header 'Access-Control-Max-Age' 86400;
    add_header 'Content-Type' 'text/plain; charset=utf-8';
    add_header 'Content-Length' 0;
    return 204;
}`,
          },
        ],
      },
      's3-lambda-loop': {
        doctorOrder: 'Immediate isolation of the Lambda input and output S3 buckets plus deployment of a key prefix filter and a reserved concurrency ceiling to break the recursive loop.',
        dosage: 'Reserved concurrency for image-processor: max 50 instances. S3 prefix filter: uploads/*. Separate output bucket: media-thumbnails.',
        preventionRule: 'Absolute ban on configuring S3 triggers without a prefix filter and on writing Lambda output into the event source bucket. Enable AWS Recursive Loop Detection.',
        files: [
          {
            filename: 's3-lambda-circuit-breaker.tf',
            language: 'terraform',
            description: 'Terraform: separate input/output buckets, S3 prefix filter, concurrency ceiling and SQS DLQ',
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
}`,
          },
          {
            filename: 'aws-lambda-resilience.yaml',
            language: 'yaml',
            description: 'AWS SAM: protection against recursive loops, concurrency limit and CloudWatch alarm',
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
      TreatMissingData: notBreaching`,
          },
        ],
      },
      'serverless-timeout': {
        doctorOrder: 'Move database client initialisation outside the Lambda function handler and deploy AWS RDS Proxy.',
        dosage: 'Configure RDS Proxy with idle_client_timeout = 1800s and max_connections_percent = 90.',
        preventionRule: 'Ban creating new database connection instances inside the body of the execution function.',
        files: [
          {
            filename: 'serverless-template.yaml',
            language: 'yaml',
            description: 'AWS SAM template with init optimisation and pre-warming',
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
          DB_PROXY_ENDPOINT: !GetAtt RDSProxy.Endpoint`,
          },
          {
            filename: 'rds-proxy.tf',
            language: 'terraform',
            description: 'AWS RDS Proxy definition in Terraform',
            content: `resource "aws_db_proxy" "proxy" {
  name                   = "aurora-serverless-proxy"
  debug_logging          = false
  engine_family          = "POSTGRESQL"
  idle_client_timeout    = 1800
  require_tls            = true
  role_arn               = aws_iam_role.proxy_role.arn
  vpc_security_group_ids = [aws_security_group.proxy_sg.id]
  vpc_subnet_ids         = aws_subnet.private[*].id
}`,
          },
        ],
      },
    },
  },
  postMortem: {
    title: 'OFFICIAL INCIDENT AUTOPSY REPORT',
    executiveSummary: 'EXECUTIVE SUMMARY',
    blastRadiusImpact: 'BLAST RADIUS AND BUSINESS IMPACT',
    actionItems: 'PREVENTIVE AND CORRECTIVE ACTIONS',
    escalateOnCall: 'Escalate to On-Call',
    listenCoroner: 'Play the Coroner’s Verdict',
    exportMarkdown: 'Export Report to Markdown',
    downloadCertificate: 'Download Death Certificate (PDF)',
    broadcastSlack: 'Broadcast to Slack',
    slackCopiedNotice: 'Incident Message Copied to the Slack Clipboard!',
  },
  dispatcher: {
    openBtn: 'Escalate to On-Call',
    modalTitle: 'INCIDENT DISPATCH AND ESCALATION',
    modalSubtitle: 'Direct bridge to the war room (War Room) and SRE on-call rotations',
    channelLabel: 'Target Notification Channel',
    severityLabel: 'Incident Criticality',
    summaryLabel: 'Automated Diagnostic Summary',
    copyBtn: 'Copy Notification Body',
    copiedBtn: 'Copied to Clipboard!',
    sendSlackBtn: 'Send to Slack Webhook',
    dispatchSuccess: 'Incident successfully dispatched to the channel',
  },
  dispatcherModal: {
    title: 'INCIDENT DISPATCH AND ESCALATION',
    subtitle: 'Direct bridge to the War Room, PagerDuty and GitHub issue handling.',
    severityLabel: 'Incident Criticality',
    serviceLabel: 'Affected Service',
    commanderLabel: 'Incident Commander',
    channelLabel: 'Slack / Discord Bridge (War Room)',
    zoomLinkLabel: 'Video Bridge (Zoom)',
    jiraTicketLabel: 'Jira Issue / Incident Key',
    statusPageLabel: 'Public Status Page URL',
    copySummaryCta: 'Copy Summary (Markdown)',
    copiedNotice: 'Incident Summary Copied to Clipboard!',
    dispatchPagingCta: 'Send the Siren to On-Call (PagerDuty)',
    pagingTriggered: 'PagerDuty siren sent!',
    closeCta: 'Close Console',
  },
  legal: {
    privacyTitle: 'Privacy Policy & Data Sovereignty',
    termsTitle: 'Terms of Service',
    cookiesTitle: 'Cookie Policy & Local Storage',
    lastUpdated: 'Last updated: November 2026 | Official Kiroween 2026 Submission',
    privacyArchHeader: '1. Zero Data Leakage Architecture (Local Execution)',
    privacyArchText: 'BugMortem was designed around absolute confidentiality of telemetry and source code. All incident analysis, stack trace parsing, post-mortem report generation and acoustic telemetry synthesis run 100% locally inside the client browser environment.',
    privacyArchBullets: [
      'No confidential incident logs, passwords or code fragments ever leave your device.',
      'The application has no remote database for storing the logs you enter.',
      'PDF Death Certificate generation and Markdown export compile solely in the browser engine.',
    ],
    privacyAdminHeader: '2. Data Controller and Copyright',
    privacyAdminText: 'BugMortem is an independent developer tool created by Adam Gierczak (@AdamBabinicz) for the Kiroween 2026 hackathon (organised by AWS and Devpost).',
    privacyScopeHeader: '3. Scope of Processed Information',
    privacyScopeText: 'BugMortem does not collect personal data, e-mail addresses or IP addresses. The only state stored by the application is the environment preferences saved locally in your browser localStorage.',
    privacyLocalStorageHeader: '4. Browser Local Storage (localStorage) Usage',
    privacyLocalStorageIntro: 'The table below presents every key used by the application:',
    privacyLocalStorageKeys: [
      {
        key: 'bugmortem_custom_incidents',
        desc: 'Autopsies of their own incidents saved by the user.',
      },
      {
        key: 'bugmortem_theme',
        desc: 'The selected visual theme (Dracula Morgue vs. Clinical Daylight).',
      },
      {
        key: 'bugmortem_locale',
        desc: 'Active interface language (Polish / English).',
      },
      {
        key: 'bugmortem_audio_muted',
        desc: 'Mute state of the procedural ECG audio synthesiser.',
      },
    ],
    noTrackingHeader: '5. No Tracking Cookies and Zero Telemetry',
    noTrackingText: 'The application uses no third-party tracking scripts (no Google Analytics 4, Hotjar or advertising pixels).',
    noTrackingBullets: [
      'Zero browser fingerprinting.',
      'Zero behavioural profiling.',
      'Full compliance with Google Consent Mode v2 (all tags blocked by default).',
    ],
    userRightsHeader: '6. User Data Rights',
    userRightsText: 'You keep full control over your data. You can delete individual saved incidents at any time using the bin icon in the archive, or wipe the storage completely.',
    userRightsBullets: [
      'The right to instantly remove entered incidents with a button in the UI.',
      'The right to export all generated reports in the open Markdown format.',
    ],
    purgeHeader: '7. Permanent Data Erasure',
    purgeText: 'Clearing the browser cache or clicking the delete button permanently and irreversibly removes all data saved on your device.',
    termsScopeHeader: '1. Scope and Educational Purpose',
    termsScopeText: 'BugMortem is an interactive forensic analysis and SRE simulation tool, designed to demonstrate distributed system resilience patterns, 5-Whys root cause analysis and incident documentation automation.',
    termsGeneralHeader: '2. Permitted Use',
    termsGeneralText: 'Use of the application is free of charge. Users are entitled to submit incident logs, simulate chaos scenarios and download Infrastructure-as-Code (IaC) templates in order to harden their own systems.',
    termsDisclaimerHeader: '3. Disclaimer Concerning SRE Patterns',
    termsDisclaimerIntro: 'Although the SRE prescriptions and IaC templates (Terraform, Kubernetes, AWS SAM, PgBouncer, ESLint) reflect proven engineering practice:',
    termsDisclaimerPoints: [
      'All generated files must be tested in a staging environment before production deployment.',
      'The project author accepts no liability for operational disruption resulting from the direct application of the templates.',
      'The tool is simulation, educational and forensic in nature.',
    ],
    liabilityHeader: '4. Availability and Warranties (SLA)',
    liabilityText: 'The application is deployed statically on the Vercel Edge platform. Every effort is made to ensure continuity of service, yet no SLA guarantee is provided.',
    licenseHeader: '5. Open-Source Licence and Copyright',
    licenseText: 'The BugMortem source code is released under the permissive MIT licence.',
    licenseBullets: [
      'You may freely browse, fork and adapt the resilience patterns contained in the repository.',
      'All copyright in the project remains with Adam Gierczak (@AdamBabinicz).',
    ],
    cookiesUsageHeader: '1. No Tracking Cookies',
    cookiesUsageText: 'BugMortem stores no tracking or advertising cookies. All of the state relies exclusively on the localStorage mechanism, which operates strictly inside the browser sandbox.',
  },
  cookies: {
    title: 'Privacy & Cookie Settings',
    description: 'We use local storage and optional telemetry to verify system resilience.',
    essential: 'Essential',
    essentialDesc: 'Required for the application to work correctly and to preserve session state',
    alwaysActive: 'Always active',
    analytics: 'Analytics',
    analyticsDesc: 'Google Analytics 4 & GTM (Consent Mode v2)',
    marketing: 'Marketing',
    marketingDesc: 'Personalisation and advertising campaigns',
    acceptAll: 'Accept All',
    rejectNonEssential: 'Reject Optional',
    savePreferences: 'Save Preferences',
    details: 'Customise',
    settings: 'Cookie Settings',
    closeAndReject: 'Close and reject optional',
  },
  customAutopsy: {
    title: 'Ingest Custom Outage for Autopsy',
    subtitle: 'Provide realistic stack trace or failing code for automated SRE analysis.',
    quickTestPrompt: 'Want to quickly test the engine?',
    loadSampleCta: 'Load Sample SRE Log',
    fieldTitle: 'Incident Title *',
    fieldTitlePlaceholder: 'e.g. Queue Worker Heap Memory Leak',
    fieldCategory: 'System Category',
    fieldSeverity: 'Severity Level',
    fieldStackTrace: 'Stack Trace *',
    fieldStackTracePlaceholder: 'Error: Connection terminated unexpectedly at pg-pool...',
    fieldCrashedCode: 'Cursed Code (Optional)',
    fieldCrashedCodePlaceholder: '// Paste cursed snippet causing the failure...',
    fieldResurrectedCode: 'Resurrected Code SRE (Optional)',
    fieldResurrectedCodePlaceholder: '// Paste recommended resilient SRE pattern...',
    categoryFrontend: 'Frontend / SSR',
    categoryBackend: 'Backend / API',
    categoryDatabase: 'Database / Storage',
    categoryInfra: 'Cloud / Infrastructure',
    severityP0: 'P0 (Fatal Outage)',
    severityP1: 'P1 (Critical Degradation)',
    severityP2: 'P2 (Major Anomaly)',
    cancelCta: 'Cancel',
    submitCta: 'Execute Forensic Autopsy',
    validationTitleShort: 'Incident title must be at least 5 characters long (e.g. Worker heap memory leak).',
    validationStackShort: 'Stack trace must contain at least 20 characters of actual crash logs or stack frames.',
    validationStackInvalid: 'The provided input does not resemble a valid crash log. Recognizable error keywords or multiline stack frames are required.',
    sampleTitle: 'PgBouncer Connection Pool Timeout Cascade',
  },
  footer: {
    disclaimer: '© 2026 BugMortem. All rights reserved. Author: Adam Gierczak (@AdamBabinicz) for the Kiroween 2026 hackathon (AWS & Devpost).',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    cookieSettings: 'Cookie Settings',
  },
};
