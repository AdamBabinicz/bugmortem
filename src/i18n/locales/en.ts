import { TranslationDictionary } from '../types';

export const en: TranslationDictionary = {
  common: {
    close: 'Close',
  },
  hero: {
    badge: 'PROJECT FOR KIROWEEN HACKATHON 2026',
    title: 'BugMortem – AI Incident Autopsy & SRE Post-Mortem Studio',
    subtitle: 'Forensic post-mortem analysis and automated resilience patterns for catastrophic production outages.',
    inputCta: '+ INPUT CUSTOM OUTAGE',
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
        description: 'Unstable new Date() or window object access during SSR triggers React Error #418, destroying client interactivity.',
        codeSnippet: `// ❌ CURSED CODE: Unstable timestamp evaluation during SSR
export default function ClockBanner() {
  // BUG: new Date() evaluates to different timestamps on server vs client
  const time = new Date().toLocaleTimeString();
  return <div className="banner">Last sync: {time}</div>;
}`,
        revivedCode: `// ✅ RESURRECTED SRE CODE: Two-phase hydration with mounting guard
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
    return <div className="banner skeleton">Synchronizing...</div>;
  }

  return <div className="banner">Last sync: {time}</div>;
}`,
        stackTrace: `Error: Hydration failed because the initial UI does not match what was rendered on the server.
    at throwOnHydrationMismatch (react-dom-client.development.js:1003)
    at tryToClaimNextHydratableInstance (react-dom-client.development.js:1120)
    at updateHostComponent (react-dom-client.development.js:9840)
    at beginWork (react-dom-client.development.js:10820)`,
        timeline: [
          { time: '14:02:11 UTC', label: 'SSR HTML Rendered', desc: 'Server returns static markup with timestamp 14:02:11' },
          { time: '14:02:12 UTC', label: 'Client Bundle Hydrates', desc: 'Browser executes JS bundle at 14:02:12 creating timestamp mismatch' },
          { time: '14:02:12 UTC', label: 'DOM Tree Unmounted', desc: 'React throws minified error #418 and falls back to blank white screen', isFatal: true }
        ],
        replayerSteps: [
          {
            step: 1,
            timeOffset: '+0.0s',
            title: 'Initial SSR Document Generation',
            description: 'Edge server evaluates new Date() and streams HTML with timestamp 14:02:11.',
            telemetry: { latencyMs: 42, errorRate: '0.00%', rps: '14.2k' },
            severity: 'P1'
          },
          {
            step: 2,
            timeOffset: '+0.8s',
            title: 'Client Rehydration Handshake',
            description: 'Browser bundle hydrates at 14:02:12. Checksum validation fails against server markup.',
            telemetry: { latencyMs: 380, errorRate: '8.4%', rps: '11.8k' },
            severity: 'P1'
          },
          {
            step: 3,
            timeOffset: '+1.2s',
            title: 'DOM Desynchronization & Crash',
            description: 'React Error #418 unmounts the interactive DOM root. Total loss of checkout buttons and UI state.',
            telemetry: { latencyMs: 1420, errorRate: '84.6%', rps: '2.1k' },
            severity: 'P0'
          }
        ],
        fiveWhys: [
          'The web application throws "Minified React error #418" and unmounts the interactive client DOM tree.',
          'The component renders current time via new Date().toLocaleTimeString() directly inside the JSX body.',
          'The server-rendered HTML checksum mismatches the initial client-rendered DOM node tree.',
          'Lack of client-side execution boundary (missing mounted state flag or useEffect guard).',
          'Lack of ESLint SSR hydration rules and automated SSR regression tests in the CI/CD pipeline.'
        ],
        blastRadius: {
          nodes: [
            { id: 'client-spa', name: 'client-spa', role: 'Next.js Frontend', status: 'epicenter', statusCode: 'FAIL' },
            { id: 'edge-gateway', name: 'edge-gateway', role: 'Vercel Edge Network', status: 'degraded', statusCode: 'WARN' },
            { id: 'auth-service', name: 'auth-service', role: 'JWT / Session Auth', status: 'healthy', statusCode: '200 OK' },
            { id: 'database', name: 'database', role: 'Neon Postgres', status: 'healthy', statusCode: '200 OK' },
            { id: 'worker-pool', name: 'worker-pool', role: 'Background Queue', status: 'healthy', statusCode: '200 OK' }
          ],
          summary: { epicenterCount: 1, degradedCount: 1, healthyCount: 3 }
        },
        chaosMetrics: [
          { id: 'cm-1', name: 'DOM Tree Integrity', severity: 'P0', description: 'Mismatch detected between SSR and CSR nodes', status: 'injecting' },
          { id: 'cm-2', name: 'Time to Interactive (TTI)', severity: 'P1', description: 'Interactive listeners frozen after crash', status: 'injecting' },
          { id: 'cm-3', name: 'Checkout Conversion', severity: 'P0', description: 'Checkout button unresponsive for 12% of sessions', status: 'injecting' }
        ],
        postMortem: {
          summary: 'Unstable time stamping in server components triggered widespread React Error #418 hydration failures.',
          impact: '12% of visitors experienced UI freezing and total loss of checkout form state.',
          actionItems: [
            'Enforce two-phase mounted state guards across all dynamic time-dependent components.',
            'Deploy ESLint rules banning new Date() and Math.random() in server-rendered JSX blocks.',
            'Integrate automated Playwright SSR consistency tests into CI/CD regression suite.'
          ]
        }
      },
      'connection-pool': {
        id: 'connection-pool',
        title: 'Connection Pool Death Spiral',
        badge: 'DATABASE / AURORA',
        severity: 'P0',
        description: 'Unindexed analytics queries exhausted the 200 connection limit on Amazon RDS Aurora, crippling checkout transaction threads.',
        codeSnippet: `// ❌ CURSED CODE: Runaway unbounded connection leak
export async function getAnalyticsReport(userId: string) {
  // BUG: Direct connection without timeout or pool return
  const client = await pool.connect();
  const query = 'SELECT * FROM orders WHERE user_id = $1 ORDER BY timestamp DESC';
  const result = await client.query(query, [userId]);
  // Missing client.release() in error scenarios leads to pool death
  return result.rows;
}`,
        revivedCode: `// ✅ RESURRECTED SRE CODE: Connection pooling with safe context manager & timeout
export async function getAnalyticsReport(userId: string) {
  const client = await pool.connect();
  try {
    // Set strict transaction timeout
    await client.query('SET statement_timeout = 2000');
    const query = 'SELECT id, total, status FROM orders WHERE user_id = $1 ORDER BY timestamp DESC LIMIT 50';
    const result = await client.query(query, [userId]);
    return result.rows;
  } finally {
    // Always release back to pool
    client.release();
  }
}`,
        stackTrace: `FATAL: remaining connection slots are reserved for non-replication superuser connections
    at Connection.parseE (pg-protocol/dist/parser.js:369)
    at Connection.parseMessage (pg-protocol/dist/parser.js:121)
    at Socket.<anonymous> (pg-protocol/dist/index.js:11)
    at TCP.onStreamRead (node:net:561)`,
        timeline: [
          { time: '03:14:00 UTC', label: 'Heavy Query Influx', desc: 'Unindexed reporting job initiated by automated scheduler' },
          { time: '03:14:22 UTC', label: 'Pool Saturation', desc: 'Active connections climb from 40 to 200/200 ceiling' },
          { time: '03:14:45 UTC', label: 'Checkout Cascade Fail', desc: 'E-commerce API transactions fail with 503 Service Unavailable', isFatal: true }
        ],
        replayerSteps: [
          {
            step: 1,
            timeOffset: '+0.0s',
            title: 'Analytics Batch Job Starts',
            description: 'Nightly unindexed SQL job fires 80 concurrent table-scan queries.',
            telemetry: { latencyMs: 84, errorRate: '0.00%', rps: '16.5k' },
            severity: 'P1'
          },
          {
            step: 2,
            timeOffset: '+12.0s',
            title: 'Connection Ceiling Reached',
            description: 'PostgreSQL max_connections (200/200) exhausted. Healthcheck pings queued.',
            telemetry: { latencyMs: 2450, errorRate: '34.2%', rps: '7.1k' },
            severity: 'P1'
          },
          {
            step: 3,
            timeOffset: '+29.0s',
            title: 'Database Cascade Collapse',
            description: 'Aurora replica auto-failover fails. Microservices throw FATAL connection slots exhausted.',
            telemetry: { latencyMs: 12800, errorRate: '98.4%', rps: '820' },
            severity: 'P0'
          }
        ],
        fiveWhys: [
          'E-commerce API returns 503 Service Unavailable for all checkout transactions.',
          'PostgreSQL server rejects new connections with "remaining connection slots reserved".',
          'A batch analytics job opened hundreds of unindexed query connections and held locks.',
          'Absence of a connection pool proxy (PgBouncer) between microservices and Aurora.',
          'Missing query timeout configurations and lack of separate read-replica routing for heavy analytics.'
        ],
        blastRadius: {
          nodes: [
            { id: 'client-spa', name: 'client-spa', role: 'Web Client', status: 'degraded', statusCode: 'WARN' },
            { id: 'edge-gateway', name: 'edge-gateway', role: 'Kong Gateway', status: 'degraded', statusCode: '503' },
            { id: 'auth-service', name: 'auth-service', role: 'Auth Cluster', status: 'degraded', statusCode: 'FAIL' },
            { id: 'database', name: 'database', role: 'Aurora Postgres Primary', status: 'epicenter', statusCode: 'FATAL' },
            { id: 'worker-pool', name: 'worker-pool', role: 'Celery Workers', status: 'degraded', statusCode: 'FAIL' }
          ],
          summary: { epicenterCount: 1, degradedCount: 4, healthyCount: 0 }
        },
        chaosMetrics: [
          { id: 'cm-db-1', name: 'Aurora Active Connections', severity: 'P0', description: 'Pool utilization at 100% capacity', status: 'injecting' },
          { id: 'cm-db-2', name: 'Transaction Rollback Rate', severity: 'P0', description: 'Over 85% of order checkouts rolled back', status: 'injecting' }
        ],
        postMortem: {
          summary: 'Exhaustion of database connection slots brought down user authentication and order processing across all regions.',
          impact: '48 minutes of full checkout outage; estimated revenue loss of $42,000.',
          actionItems: [
            'Deploy PgBouncer connection proxy in transaction-pooling mode with 5000 client connection ceiling.',
            'Enforce statement_timeout = 2500ms on all non-administrative database roles.',
            'Migrate all analytical workloads to read-only replica with logical isolation.'
          ]
        }
      },
      'oom-reaper': {
        id: 'oom-reaper',
        title: 'Awakening of the OOM Reaper',
        badge: 'RUNTIME / MEMORY',
        severity: 'P0',
        description: 'Bulk export of 2.5M orders into a CSV file allocated the entire dataset into Node.js heap buffer, triggering Linux OOM killer.',
        codeSnippet: `// ❌ CURSED CODE: Loading unbounded dataset into Node.js V8 heap
export async function exportAllOrders() {
  const allOrders = await db.orders.findMany(); // 2.5M records into memory
  let csv = 'id,total,created_at\\n';
  for (const order of allOrders) {
    csv += \`\${order.id},\${order.total},\${order.createdAt}\\n\`;
  }
  return csv;
}`,
        revivedCode: `// ✅ RESURRECTED SRE CODE: Streaming pipeline with memory backpressure
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
        stackTrace: `<--- Last few GCs --->
[1:0x55d49a0]    14820 ms: Mark-sweep (reduce) 2041.4 (2082.1) -> 2040.2 (2082.1) MB, 842.1 / 0.0 ms
[1:0x55d49a0]    15710 ms: Mark-sweep (reduce) 2040.2 (2082.1) -> 2039.8 (2082.1) MB, 890.0 / 0.0 ms

<--- JS stacktrace --->
FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory
1: 0xb09c10 node::Abort() [node]
2: 0xa1c28f node::FatalError(char const*, char const*) [node]`,
        timeline: [
          { time: '11:45:00 UTC', label: 'Export Initiated', desc: 'Admin triggers quarterly 2.5M row CSV transaction export' },
          { time: '11:45:14 UTC', label: 'Heap Saturation', desc: 'V8 heap memory spikes to 2048 MB limit; GC thrashes at 98% CPU' },
          { time: '11:45:16 UTC', label: 'SIGKILL Dispatched', desc: 'Linux kernel OOM killer terminates Node.js PID 1 with exit code 137', isFatal: true }
        ],
        replayerSteps: [
          {
            step: 1,
            timeOffset: '+0.0s',
            title: 'Export Triggered',
            description: 'Administrator requests complete quarterly CSV ledger export.',
            telemetry: { latencyMs: 65, errorRate: '0.00%', rps: '15.1k' },
            severity: 'P1'
          },
          {
            step: 2,
            timeOffset: '+8.4s',
            title: 'Memory Limit Approaching',
            description: 'V8 heap usage crosses 1.8GB. Node process becomes unresponsive during GC pauses.',
            telemetry: { latencyMs: 1820, errorRate: '18.9%', rps: '8.4k' },
            severity: 'P1'
          },
          {
            step: 3,
            timeOffset: '+16.2s',
            title: 'Kernel SIGKILL 137',
            description: 'Linux OOM killer executes container pod. Microservice restarts in CrashLoopBackOff.',
            telemetry: { latencyMs: 6400, errorRate: '62.1%', rps: '2.4k' },
            severity: 'P0'
          }
        ],
        fiveWhys: [
          'Worker node crashed and entered continuous CrashLoopBackOff.',
          'The Linux kernel sent SIGKILL (exit code 137) to the Node.js process.',
          'The V8 runtime hit its 2GB hard heap allocation ceiling.',
          'A bulk export route tried to buffer 2,500,000 database entities into a single memory string.',
          'Missing stream backpressure pipelines and lack of pagination limits in the export handler.'
        ],
        blastRadius: {
          nodes: [
            { id: 'client-spa', name: 'client-spa', role: 'Dashboard SPA', status: 'degraded', statusCode: 'WARN' },
            { id: 'edge-gateway', name: 'edge-gateway', role: 'API Gateway', status: 'healthy', statusCode: '200 OK' },
            { id: 'auth-service', name: 'auth-service', role: 'Auth Service', status: 'healthy', statusCode: '200 OK' },
            { id: 'database', name: 'database', role: 'Database Core', status: 'healthy', statusCode: '200 OK' },
            { id: 'worker-pool', name: 'worker-pool', role: 'Background Async Worker', status: 'epicenter', statusCode: 'CRASH' }
          ],
          summary: { epicenterCount: 1, degradedCount: 1, healthyCount: 3 }
        },
        chaosMetrics: [
          { id: 'cm-oom-1', name: 'Node Heap Used (MB)', severity: 'P0', description: '2048 / 2048 MB allocated', status: 'injecting' },
          { id: 'cm-oom-2', name: 'Garbage Collection Thrash', severity: 'P0', description: '98% CPU spent in Mark-Sweep pauses', status: 'injecting' }
        ],
        postMortem: {
          summary: 'In-memory accumulation of 2.5M orders triggered heap exhaustion and instant kernel SIGKILL termination.',
          impact: 'Background worker pool collapsed; all asynchronous invoice processing delayed by 3 hours.',
          actionItems: [
            'Replace all in-memory bulk data accumulation with stream.pipeline and CSV transform streams.',
            'Configure explicit Kubernetes pod memory limits with 75% soft alert triggers.',
            'Enforce mandatory cursor-based pagination on all export API endpoints.'
          ]
        }
      },
      'retry-storm': {
        id: 'retry-storm',
        title: 'Cascading Retry Storm',
        badge: 'CONCURRENCY / NETWORK',
        severity: 'P1',
        description: 'Instant retries without randomized jitter during a 500ms latency spike multiplied traffic by 500%, collapsing core databases.',
        codeSnippet: `// ❌ CURSED CODE: Instant unjittered retry loop
async function fetchWithRetry(url: string, attempts = 5) {
  for (let i = 0; i < attempts; i++) {
    try {
      return await fetch(url);
    } catch (err) {
      // BUG: Synchronous retry stampede floods failing backend
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
      // Full jitter backoff formula
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
          { time: '14:22:00 UTC', label: '500ms Network Hiccup', desc: 'Brief edge-to-origin packet drop triggers initial client failures' },
          { time: '14:22:01 UTC', label: '10x Traffic Wave', desc: '150,000 mobile clients simultaneously retry at exact 100ms interval' },
          { time: '14:22:05 UTC', label: 'Full System Throttle', desc: 'API Gateways enter rate-limiting state, dropping 92% of incoming legitimate traffic', isFatal: true }
        ],
        replayerSteps: [
          {
            step: 1,
            timeOffset: '+0.0s',
            title: 'Transient Upstream Delay',
            description: 'Network packet reordering introduces minor 400ms lag on gateway.',
            telemetry: { latencyMs: 410, errorRate: '1.2%', rps: '14.0k' },
            severity: 'P1'
          },
          {
            step: 2,
            timeOffset: '+0.5s',
            title: 'Thundering Herd Retry Wave',
            description: 'Synchronous clients fire 5 rapid retry attempts, multiplying ingress traffic 5x.',
            telemetry: { latencyMs: 2540, errorRate: '14.8%', rps: '8.1k' },
            severity: 'P1'
          },
          {
            step: 3,
            timeOffset: '+2.1s',
            title: 'Global Gateway Throttling',
            description: 'Connection queues overflow. Rate limiters clamp down, returning HTTP 429 to 90% of requests.',
            telemetry: { latencyMs: 4800, errorRate: '48.9%', rps: '3.2k' },
            severity: 'P1'
          }
        ],
        fiveWhys: [
          'Upstream API services throttled with HTTP 429 Too Many Requests.',
          'Gateway request volume skyrocketed from 14k RPS to over 70k RPS within 2 seconds.',
          'A minor 500ms network blip triggered automated client retry loops across all mobile apps.',
          'Clients implemented synchronous, fixed 100ms retries without randomization.',
          'Missing exponential backoff with full jitter and absence of client-side circuit breakers.'
        ],
        blastRadius: {
          nodes: [
            { id: 'client-spa', name: 'client-spa', role: 'Mobile / SPA Clients', status: 'degraded', statusCode: '429' },
            { id: 'edge-gateway', name: 'edge-gateway', role: 'Cloudflare Edge', status: 'epicenter', statusCode: 'THROTTLE' },
            { id: 'auth-service', name: 'auth-service', role: 'Auth Core', status: 'degraded', statusCode: 'WARN' },
            { id: 'database', name: 'database', role: 'Primary RDS', status: 'degraded', statusCode: 'WARN' },
            { id: 'worker-pool', name: 'worker-pool', role: 'Task Workers', status: 'healthy', statusCode: '200 OK' }
          ],
          summary: { epicenterCount: 1, degradedCount: 3, healthyCount: 1 }
        },
        chaosMetrics: [
          { id: 'cm-rs-1', name: 'Inbound Multiplier', severity: 'P1', description: '5.2x baseline traffic volume', status: 'injecting' },
          { id: 'cm-rs-2', name: 'Throttled Packet Ratio', severity: 'P1', description: '89.4% requests dropped at edge', status: 'injecting' }
        ],
        postMortem: {
          summary: 'A 500ms origin hiccup cascaded into an catastrophic retry storm due to fixed client backoff intervals.',
          impact: 'Edge gateway throttled traffic for 14 minutes, locking out legitimate users globally.',
          actionItems: [
            'Enforce Exponential Backoff with Full Jitter algorithm across all SDK client libraries.',
            'Implement adaptive circuit breakers on the edge gateway to shed unjittered retry spikes.',
            'Add rate-limit tokens per device fingerprint to prevent thundering herd cascades.'
          ]
        }
      },
      'cors-nightmare': {
        id: 'cors-nightmare',
        title: 'CORS Preflight Nightmare',
        badge: 'NETWORK / SECURITY',
        severity: 'P1',
        description: 'Missing CORS headers on API gateway caused all cross-origin OPTIONS preflight requests to fail with 403, locking out the entire SPA.',
        codeSnippet: `// ❌ CURSED CODE: Insecure & fragile CORS wildcard reflection
app.use((req, res, next) => {
  // BUG: Dynamically reflecting origin without proper credentials validation
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  // Missing OPTIONS preflight handler returns 404/403 for browser preflights
  next();
});`,
        revivedCode: `// ✅ RESURRECTED SRE CODE: Deterministic CORS whitelist with preflight cache
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
    res.header('Access-Control-Max-Age', '86400'); // 24h preflight cache
  }
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});`,
        stackTrace: `Access to fetch at 'https://api.bugmortem.dev/v1/auth' from origin 'https://bugmortem.vercel.app' 
has been blocked by CORS policy: Response to preflight request doesn't pass access control check: 
No 'Access-Control-Allow-Origin' header is present on the requested resource. 
If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.`,
        timeline: [
          { time: '17:00:00 UTC', label: 'Gateway Config Deployed', desc: 'Security patch updates API gateway CORS regex rule' },
          { time: '17:00:05 UTC', label: 'OPTIONS Preflights Fail', desc: 'Browser security engines block all preflight OPTIONS requests with HTTP 403' },
          { time: '17:00:10 UTC', label: 'Complete Web UI Blackout', desc: 'All dynamic API calls from browser fail silently, showing infinite loaders', isFatal: true }
        ],
        replayerSteps: [
          {
            step: 1,
            timeOffset: '+0.0s',
            title: 'Gateway Route Update',
            description: 'Terraform deployment updates CORS headers across API Gateway.',
            telemetry: { latencyMs: 38, errorRate: '0.00%', rps: '15.4k' },
            severity: 'P1'
          },
          {
            step: 2,
            timeOffset: '+1.5s',
            title: 'Preflight OPTIONS Rejections',
            description: 'Browsers fire mandatory preflight OPTIONS requests, receiving 403 Forbidden.',
            telemetry: { latencyMs: 120, errorRate: '45.0%', rps: '9.2k' },
            severity: 'P1'
          },
          {
            step: 3,
            timeOffset: '+4.0s',
            title: 'Universal SPA Lockdown',
            description: 'Zero authenticated requests pass CORS security sandbox. 100% of frontend clients paralyzed.',
            telemetry: { latencyMs: 210, errorRate: '99.8%', rps: '1.2k' },
            severity: 'P1'
          }
        ],
        fiveWhys: [
          'The web frontend cannot log in or fetch any user incident data.',
          'Browser console throws "Blocked by CORS policy: No Access-Control-Allow-Origin header present".',
          'API Gateway returns HTTP 403 for browser preflight OPTIONS requests.',
          'A misconfigured gateway policy stripped CORS headers from non-GET requests.',
          'Absence of automated browser-based integration smoke tests verifying OPTIONS preflight caching in CI.'
        ],
        blastRadius: {
          nodes: [
            { id: 'client-spa', name: 'client-spa', role: 'Browser SPA', status: 'epicenter', statusCode: 'CORS_FAIL' },
            { id: 'edge-gateway', name: 'edge-gateway', role: 'AWS API Gateway', status: 'degraded', statusCode: '403' },
            { id: 'auth-service', name: 'auth-service', role: 'Auth API', status: 'healthy', statusCode: '200 OK' },
            { id: 'database', name: 'database', role: 'Database Core', status: 'healthy', statusCode: '200 OK' },
            { id: 'worker-pool', name: 'worker-pool', role: 'Async Workers', status: 'healthy', statusCode: '200 OK' }
          ],
          summary: { epicenterCount: 1, degradedCount: 1, healthyCount: 3 }
        },
        chaosMetrics: [
          { id: 'cm-cors-1', name: 'Preflight Failure Rate', severity: 'P1', description: '99.8% of OPTIONS queries rejected', status: 'injecting' },
          { id: 'cm-cors-2', name: 'Client Network Errors', severity: 'P1', description: 'Zero authenticated traffic passing edge', status: 'injecting' }
        ],
        postMortem: {
          summary: 'An erroneous CORS configuration update caused all browser preflight checks to fail with 403 Forbidden.',
          impact: 'Universal lockout for all web users across all modern browsers for 22 minutes.',
          actionItems: [
            'Deploy programmatic Access-Control-Max-Age = 86400 (24h) preflight caching headers.',
            'Add automated Playwright cross-origin preflight smoke tests to deployment pipeline.',
            'Maintain strict origin whitelist in centralized infrastructure configuration.'
          ]
        }
      },
      'serverless-timeout': {
        id: 'serverless-timeout',
        title: 'Serverless Cold Start Cascade & Gateway 504 Timeout',
        badge: 'CLOUD / SERVERLESS',
        severity: 'P0',
        description: 'Heavy database client initialization inside the serverless function handler triggered a cold start cascade, exceeding the 29s API Gateway limit.',
        codeSnippet: `// ❌ CURSED CODE: Re-initializing connection pool inside Lambda execution handler
import { Pool } from 'pg';

export const handler = async (event: any) => {
  // BUG: Opening a heavy database pool on every single invocation/cold start
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const client = await pool.connect();
  const res = await client.query('SELECT * FROM checkout_cart WHERE cart_id = $1', [event.cartId]);
  return { statusCode: 200, body: JSON.stringify(res.rows) };
};`,
        revivedCode: `// ✅ RESURRECTED SRE CODE: Global connection reuse & RDS Proxy pooling
import { Pool } from 'pg';

// Global execution context caches pool across warm invocations
const pool = new Pool({
  host: process.env.RDS_PROXY_HOST, // Routed through AWS RDS Proxy
  max: 1, // Single connection per container prevents starvation
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
          { time: '02:15:00 UTC', label: 'Flash Sale Traffic Spike', desc: 'Marketing push triggers 2,000 new concurrent Lambda container allocations' },
          { time: '02:15:15 UTC', label: 'VPC Cold Start & DB Lock', desc: 'Each new container attempts to negotiate TLS & connection pool with primary database' },
          { time: '02:15:29 UTC', label: 'Gateway Timeout Ceiling', desc: 'API Gateway terminates invocations at hard 29-second ceiling with 504 Gateway Timeout', isFatal: true }
        ],
        replayerSteps: [
          {
            step: 1,
            timeOffset: '+0.0s',
            title: 'Concurrency Burst Influx',
            description: 'Traffic surge forces AWS Lambda to spin up 1,200 fresh cold execution environments.',
            telemetry: { latencyMs: 450, errorRate: '0.00%', rps: '18.4k' },
            severity: 'P1'
          },
          {
            step: 2,
            timeOffset: '+12.5s',
            title: 'TLS & Connection Handshake Storm',
            description: '1,200 containers simultaneously initiate database handshakes. Connection queue stalls.',
            telemetry: { latencyMs: 14200, errorRate: '42.8%', rps: '6.1k' },
            severity: 'P1'
          },
          {
            step: 3,
            timeOffset: '+29.0s',
            title: 'Hard API Gateway 504 Drop',
            description: 'API Gateway terminates all pending connections at 29-second hard limit.',
            telemetry: { latencyMs: 29000, errorRate: '99.4%', rps: '410' },
            severity: 'P0'
          }
        ],
        fiveWhys: [
          'API Gateway responds with HTTP 504 Gateway Timeout on checkout endpoints.',
          'Lambda functions failed to return a response before the 29-second API Gateway ceiling.',
          'A sudden concurrency spike forced hundreds of cold container initializations.',
          'Database connection pools were re-instantiated inside the handler function instead of global scope.',
          'Missing database connection proxy (RDS Proxy) and absence of provisioned concurrency on critical routes.'
        ],
        blastRadius: {
          nodes: [
            { id: 'client-spa', name: 'client-spa', role: 'Checkout SPA', status: 'degraded', statusCode: '504' },
            { id: 'edge-gateway', name: 'edge-gateway', role: 'AWS API Gateway', status: 'epicenter', statusCode: 'TIMEOUT' },
            { id: 'auth-service', name: 'auth-service', role: 'Cognito / JWT', status: 'healthy', statusCode: '200 OK' },
            { id: 'database', name: 'database', role: 'Aurora Serverless', status: 'degraded', statusCode: 'STALL' },
            { id: 'worker-pool', name: 'worker-pool', role: 'Lambda Fleet', status: 'degraded', statusCode: 'COLD_START' }
          ],
          summary: { epicenterCount: 1, degradedCount: 3, healthyCount: 1 }
        },
        chaosMetrics: [
          { id: 'cm-srv-1', name: 'Container Cold Start Duration', severity: 'P0', description: 'Avg 28,400ms across new containers', status: 'injecting' },
          { id: 'cm-srv-2', name: 'Gateway 504 Drop Ratio', severity: 'P0', description: '99.4% invocations timed out', status: 'injecting' }
        ],
        postMortem: {
          summary: 'In-handler connection pool instantiation during a burst traffic event exceeded the 29-second API Gateway timeout.',
          impact: 'Flash sale checkout crashed completely for 35 minutes; zero orders processed during peak hour.',
          actionItems: [
            'Refactor all database client instances to global scope outside the function handler.',
            'Deploy AWS RDS Proxy to manage connection pooling and reduce cold start TLS handshake overhead.',
            'Enable Provisioned Concurrency on core checkout paths during scheduled marketing promotions.'
          ]
        }
      },
      's3-lambda-loop': {
        id: 's3-lambda-loop',
        title: 'AWS S3 ⇄ Lambda Recursive Loop Death Spiral',
        badge: 'AWS / SERVERLESS',
        severity: 'P0',
        description: 'An S3 event trigger without a prefix filter caused a Lambda image processor to write thumbnails back into the same source bucket, recursively invoking itself 142,000 times in 4 minutes and exhausting the entire AWS account concurrency limit (1,000/1,000), paralysing all other production services.',
        codeSnippet: `// ❌ CURSED CODE: Lambda writing output to the same S3 bucket that triggers it
export const handler = async (event: S3Event) => {
  for (const record of event.Records) {
    const srcKey = record.s3.object.key;
    const srcBucket = record.s3.bucket.name; // "media-assets"

    // BUG 1: No prefix guard — fires on EVERY object in the bucket,
    //        including the thumbnails this function is about to write.
    // BUG 2: Writing the thumbnail back into srcBucket triggers
    //        another s3:ObjectCreated event → infinite recursive loop.
    const thumbnail = await resizeImage(srcKey, srcBucket);
    await s3.putObject({
      Bucket: srcBucket,          // ← SAME bucket as trigger!
      Key: \`thumb_\${srcKey}\`,
      Body: thumbnail,
    }).promise();
  }
};`,
        revivedCode: `// ✅ RESURRECTED SRE CODE: Separate output bucket + prefix filter + recursion guard
import { S3Event } from 'aws-lambda';
import { S3 } from 'aws-sdk';

const s3 = new S3();
const INPUT_PREFIX = 'uploads/';    // only process originals
const OUTPUT_BUCKET = process.env.THUMBNAIL_BUCKET!; // isolated output bucket

export const handler = async (event: S3Event): Promise<void> => {
  // Recursion guard: reject invocations triggered by our own output bucket
  if (process.env.AWS_LAMBDA_FUNCTION_NAME &&
      event.Records[0]?.s3.bucket.name === OUTPUT_BUCKET) {
    console.warn('[SRE GUARD: recursive invocation blocked — output bucket event rejected]');
    return;
  }

  for (const record of event.Records) {
    const srcKey = record.s3.object.key;
    const srcBucket = record.s3.bucket.name;

    // Guard: only process objects under the uploads/ prefix
    if (!srcKey.startsWith(INPUT_PREFIX)) {
      console.info('[SRE GUARD: skipping ${srcKey} — outside uploads/ prefix]');
      continue;
    }

    const thumbnail = await resizeImage(srcKey, srcBucket);

    // Write to ISOLATED output bucket — cannot trigger this Lambda again
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
          { time: '14:00:00 UTC', label: 'Single Upload Ingress', desc: 'User uploads header.jpg (2.1 MB) to media-assets bucket' },
          { time: '14:00:03 UTC', label: 'Self-Trigger Cycle 1', desc: 'Lambda writes thumb_header.jpg back to media-assets; S3 fires a new s3:ObjectCreated event' },
          { time: '14:00:15 UTC', label: 'Exponential Fanout', desc: 'Each thumbnail write spawns another execution; 1 → 2 → 4 → 8 invocations' },
          { time: '14:01:00 UTC', label: 'Concurrency Exhaustion', desc: 'Image processor occupies 800 of 1,000 account concurrency slots; CloudWatch alarms trip' },
          { time: '14:03:42 UTC', label: 'Account-Wide Blackout', desc: '1,000/1,000 concurrency reached (142,000 invocations total); auth, order, and payment Lambdas throttled globally (HTTP 429)', isFatal: true }
        ],
        replayerSteps: [
          {
            step: 1,
            timeOffset: '+0.0s',
            title: 'Initial Upload & First Recursion Step',
            description: 'User uploads header.jpg to media-assets. Lambda resizes and saves thumb_header.jpg back into media-assets without a key prefix guard.',
            telemetry: { latencyMs: 312, errorRate: '0.00%', rps: '1.2k' },
            severity: 'P1'
          },
          {
            step: 2,
            timeOffset: '+15.0s',
            title: 'Exponential Invocation Fanout',
            description: 'Every newly written thumbnail triggers another Lambda invocation. Queue multiplies: 1 → 2 → 4 → 16 → 256 parallel containers.',
            telemetry: { latencyMs: 1840, errorRate: '12.4%', rps: '14.2k' },
            severity: 'P1'
          },
          {
            step: 3,
            timeOffset: '+231.0s',
            title: 'Account Concurrency Saturation & Outage',
            description: '142,000 executions exhaust all 1,000 reserved concurrency slots for the AWS account. Auth, order, and payment services throttled with HTTP 429.',
            telemetry: { latencyMs: 8400, errorRate: '98.9%', rps: '142.0k' },
            severity: 'P0'
          }
        ],
        fiveWhys: [
          'All AWS Lambda functions across the account return TooManyRequestsException (429) and auth, payment, and order services are unresponsive.',
          'The image-processor Lambda consumed all 1,000 concurrent execution slots of the AWS account within 4 minutes.',
          'The Lambda wrote thumbnail output objects back into the same S3 bucket that triggers it, creating an infinite recursive invocation loop.',
          'The S3 event notification was configured without a key prefix filter, so every object write — including thumbnails — fired the trigger.',
          'Lack of S3 bucket isolation between ingress and egress, absence of Lambda reserved concurrency caps, and no AWS Recursive Loop Detection enabled in IaC.'
        ],
        blastRadius: {
          nodes: [
            { id: 'worker-pool', name: 'worker-pool', role: 'AWS Lambda Fleet (image-processor)', status: 'epicenter', statusCode: 'FAIL' },
            { id: 'edge-gateway', name: 'edge-gateway', role: 'AWS API Gateway', status: 'degraded', statusCode: 'WARN' },
            { id: 'auth-service', name: 'auth-service', role: 'Auth Lambda (throttled)', status: 'degraded', statusCode: 'WARN' },
            { id: 'database', name: 'database', role: 'Order / Payment Lambdas (throttled)', status: 'degraded', statusCode: 'WARN' },
            { id: 'client-spa', name: 'client-spa', role: 'S3 Ingestion Bucket (media-assets)', status: 'healthy', statusCode: '200 OK' }
          ],
          summary: { epicenterCount: 1, degradedCount: 3, healthyCount: 1 }
        },
        chaosMetrics: [
          { id: 'cm-s3-1', name: 'Lambda Concurrent Executions', severity: 'P0', description: '1,000 / 1,000 (100% account limit exhausted)', status: 'injecting' },
          { id: 'cm-s3-2', name: 'Total Invocations (4 min)', severity: 'P0', description: '142,380 runaway invocations', status: 'injecting' },
          { id: 'cm-s3-3', name: 'Account-Wide Throttle Count', severity: 'P0', description: '38,410 requests dropped with HTTP 429', status: 'injecting' }
        ],
        postMortem: {
          summary: 'Missing S3 prefix filter on the Lambda trigger combined with writing output to the source bucket created an infinite recursive invocation loop, exhausting the full AWS account concurrency limit.',
          impact: '142,000 Lambda invocations in 4 minutes paralysed auth, order, and payment services account-wide. Estimated revenue impact: $28,000 in blocked transactions.',
          actionItems: [
            'Isolate Lambda input and output to separate S3 buckets — never write trigger output back into the event-source bucket.',
            'Configure S3 event notifications with explicit key prefix filters (e.g. uploads/) to prevent thumbnail re-triggering.',
            'Enable AWS Recursive Loop Detection (available since Nov 2023) and set a reserved-concurrency ceiling on image-processor.'
          ]
        }
      }
    }
  },
  codeSection: {
    cursedTitle: 'CODE FORENSICS: CURSED VS RESURRECTED CODE',
    resurrectedTitle: 'RESURRECTED SRE CODE (RESILIENCE PATTERN)',
    cursedBadge: 'CRITICAL FAILURE',
    resurrectedBadge: 'PATTERN: SRE RESILIENCE',
    copyCta: 'Copy Resurrected Code',
    copied: 'Code Copied!',
  },
  stackTrace: {
    title: 'RAW STACK TRACE FORENSICS',
  },
  timeline: {
    title: 'CHRONOLOGICAL INCIDENT TIMELINE',
  },
  replayer: {
    title: 'TIME-TO-DEATH INCIDENT REPLAYER',
    subtitle: 'Simulate the failure sequence step-by-step and watch telemetry degrade in real time',
    play: 'Play Simulation',
    pause: 'Pause Simulation',
    reset: 'Reset Timeline',
    speed: 'Speed',
    stepOf: 'Step',
    telemetryLatency: 'Latency P99',
    telemetryErrors: 'Error Rate',
    telemetryRps: 'Throughput',
  },
  fiveWhys: {
    sectionTitle: 'BLAMELESS 5-WHYS ROOT-CAUSE TREE',
    sectionSubtitle: 'Systemic engineering investigation from surface symptom down to architectural flaw.',
    levels: [
      '1. SURFACE SYMPTOM',
      '2. IMMEDIATE TRIGGER',
      '3. FAILURE MECHANISM',
      '4. ARCHITECTURAL FLAW',
      '5. SYSTEMIC ROOT CAUSE'
    ],
    blamelessBadge: 'BLAMELESS SRE CULTURE',
    rootCauseBadge: 'SYSTEMIC ROOT CAUSE',
    copyChain: 'Copy Investigation Chain',
    copied: 'Investigation Copied!',
  },
  blastRadius: {
    title: 'ARCHITECTURE BLAST RADIUS TOPOLOGY',
    subtitle: 'Cascading failure vectors across microservice boundaries and Patient Zero isolation.',
    legendEpicenter: 'Patient Zero',
    legendDegraded: 'Cascading Blast',
    legendHealthy: 'Healthy Node (200 OK)',
    badgeEpicenter: 'Critical',
    badgeDegraded: 'Degraded',
    badgeHealthy: 'Healthy',
  },
  chaos: {
    sectionTitle: 'CHAOS ENGINEERING SANDBOX (LIVE TELEMETRY)',
    sectionSubtitle: 'Inject active failure vectors and observe real-time telemetry degradation',
    btnMitigate: 'Trigger Self-Healing',
    btnInject: 'Inject failure',
    statusNominal: 'SYSTEM NOMINAL',
    metricRps: 'THROUGHPUT',
    metricLatency: 'LATENCY P99',
    metricErrorRate: 'ERROR RATE',
    scenarioLatencyTitle: 'Edge Latency Spike (+2500ms)',
    scenarioLatencyDesc: 'Simulated edge delay on Edge Gateway triggering client-side UI timeouts',
    scenarioDbPoolTitle: 'Database Connection Pool Saturation',
    scenarioDbPoolDesc: '100% PostgreSQL connection consumption resulting in cascading 503 errors',
    scenarioMemoryTitle: 'Worker Heap Memory Leak (OOM)',
    scenarioMemoryDesc: 'Exponential RAM exhaustion in asynchronous worker pool triggering OOM killer',
    scenarioAuthStormTitle: 'Session Invalidation Storm (Auth Storm)',
    scenarioAuthStormDesc: 'Mass cross-origin JWT token rejection and avalanche of re-login requests',
  },
  chaosSandbox: {
    title: 'CHAOS ENGINEERING SANDBOX (LIVE TELEMETRY)',
    subtitle: 'Inject active failure vectors and observe real-time telemetry degradation',
    nominalStatus: 'SYSTEM NOMINAL',
    activeStatus: 'CRITICAL FAILURE ACTIVE',
    metricThroughput: 'THROUGHPUT',
    metricP99: 'LATENCY P99',
    metricErrorRate: 'ERROR RATE',
    injectCta: 'Inject failure',
    recoveringCta: 'Trigger Self-Healing',
  },
  prescription: {
    modalTitle: 'Official SRE Prescription & IaC Generator',
    resilienceBadge: 'RESILIENCE THERAPY',
    doctorOrdersTitle: 'SRE DOCTOR’S ORDERS',
    rxNumberPrefix: 'Rx #',
    dosageLabel: 'DOSAGE / SLA',
    preventionRuleLabel: 'PREVENTION RULE',
    copyFileCta: 'Copy File',
    copiedNotice: 'Copied!',
    downloadCta: 'Download',
    verifiedFooter: 'Configs verified by BugMortem SRE Engine',
    closeCta: 'Close Prescription',
    items: {
      'react-hydration': {
        doctorOrder:
          'Immediate enforcement of two-phase mounted state guards and quarantine of dynamic timestamp primitives during SSR.',
        dosage:
          'Enforce 100% Playwright SSR consistency coverage on every production deployment pipeline.',
        preventionRule:
          'ESLint Rule: zero-tolerance ban on new Date() and Math.random() inside server component render bodies.',
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
];`
          },
          {
            filename: 'playwright-ssr.config.ts',
            language: 'typescript',
            description: 'Playwright console verification smoke test',
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
          'Immediate deployment of PgBouncer in transaction pooling mode with aggressive statement timeout enforcement.',
        dosage:
          'Configure max_client_conn = 5000, default_pool_size = 50, statement_timeout = 2000ms.',
        preventionRule:
          'Zero-tolerance ban on unindexed analytical queries targeting primary production writer instances.',
        files: [
          {
            filename: 'pgbouncer.ini',
            language: 'ini',
            description: 'PgBouncer connection pool protection configuration',
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
            description: 'PostgreSQL statement timeout and idle transaction guard',
            content: `-- SRE Guard: Prevent connection exhaustion
ALTER DATABASE prod_db SET statement_timeout = '2500ms';
ALTER DATABASE prod_db SET idle_in_transaction_session_timeout = '5000ms';
ALTER DATABASE prod_db SET lock_timeout = '1500ms';`
          }
        ]
      },
      'oom-reaper': {
        doctorOrder:
          'Refactor bulk export pipeline from in-memory buffering to Node.js streams with backpressure controls.',
        dosage:
          'Enforce Kubernetes pod limits: resources.limits.memory = 2Gi with alert threshold at 80%.',
        preventionRule:
          'Strict prohibition of loading unbounded datasets into single JavaScript array primitives.',
        files: [
          {
            filename: 'k8s-pod-resilience.yaml',
            language: 'yaml',
            description: 'Kubernetes Pod resource limits and OOM guard',
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
            description: 'Safe streaming pipeline pattern with backpressure',
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
          'Implement Exponential Backoff with Full Jitter and configure circuit breaking in service mesh.',
        dosage:
          'Base Delay = 100ms, Max Delay = 2000ms, Jitter = 1.0, Max Retries = 3.',
        preventionRule:
          'Ban instantaneous, unjittered automated retries on receiving 5xx server responses.',
        files: [
          {
            filename: 'envoy-circuit-breaker.yaml',
            language: 'yaml',
            description: 'Envoy Proxy circuit breaker and connection limits',
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
            description: 'Resilient HTTP client with Full Jitter backoff',
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
          'Implement Access-Control-Max-Age caching on API Gateway and eliminate insecure wildcard origins.',
        dosage:
          'Set Access-Control-Max-Age = 86400 (24h) on all preflight OPTIONS gateway responses.',
        preventionRule:
          'Ban dynamic origin reflection for requests authenticated with credentials.',
        files: [
          {
            filename: 'api-gateway-cors.tf',
            language: 'terraform',
            description: 'Terraform configuration for cached and scoped CORS',
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
            description: 'NGINX reverse proxy cached preflight rules',
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
          'Immediately isolate S3 input and output buckets, enforce strict S3 key prefix filters on Lambda triggers, and cap reserved concurrency to terminate the recursive loop.',
        dosage:
          'Reserved concurrency on image-processor: max 50 instances. S3 prefix filter: uploads/*. Separate output bucket: media-thumbnails.',
        preventionRule:
          'Strictly prohibit configuring S3 triggers without prefix filters or writing Lambda results back into the trigger source bucket. Enable AWS Recursive Loop Detection.',
        files: [
          {
            filename: 's3-lambda-circuit-breaker.tf',
            language: 'terraform',
            description: 'Terraform: separate input/output buckets, S3 prefix filter, concurrency ceiling & SQS DLQ',
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
            description: 'AWS SAM: Recursive loop prevention, concurrency guard & CloudWatch alarm',
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
          'Extract database connection initialization outside Lambda handler and provision AWS RDS Proxy.',
        dosage:
          'Configure RDS Proxy with idle_client_timeout = 1800s and max_connections_percent = 90.',
        preventionRule:
          'Prohibit initializing fresh relational database connection pools inside the execution handler.',
        files: [
          {
            filename: 'serverless-template.yaml',
            language: 'yaml',
            description: 'AWS SAM template with handler pre-warming',
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
            description: 'AWS RDS Proxy Terraform definition',
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
    title: 'OFFICIAL INCIDENT AUTOPSY REPORT',
    executiveSummary: 'EXECUTIVE SUMMARY',
    blastRadiusImpact: 'BLAST RADIUS & BUSINESS IMPACT',
    actionItems: 'PREVENTATIVE & REMEDIAL ACTIONS',
    escalateOnCall: 'Escalate On-Call',
    listenCoroner: 'Play Coroner Verdict',
    exportMarkdown: 'Export Report to Markdown',
    downloadCertificate: 'Download Death Certificate (PDF)',
    broadcastSlack: 'Broadcast to Slack',
    slackCopiedNotice: 'Copied Slack Incident Broadcast to Clipboard!',
  },
  dispatcher: {
    openBtn: 'Escalate On-Call',
    modalTitle: 'INCIDENT DISPATCHER & ESCALATION',
    modalSubtitle: 'Direct bridge to War Room and SRE on-call rotations',
    channelLabel: 'Target Notification Channel',
    severityLabel: 'Incident Severity',
    summaryLabel: 'Automated Diagnostic Summary',
    copyBtn: 'Copy Notification Payload',
    copiedBtn: 'Copied to Clipboard!',
    sendSlackBtn: 'Dispatch to Slack Webhook',
    dispatchSuccess: 'Incident successfully dispatched to channel',
  },
  dispatcherModal: {
    title: 'INCIDENT DISPATCHER & ESCALATION',
    subtitle: 'Direct bridge to War Room, PagerDuty, and GitHub Issue triage.',
    severityLabel: 'Incident Severity',
    serviceLabel: 'Impacted Service',
    commanderLabel: 'Incident Commander',
    channelLabel: 'War Room Slack / Discord Bridge',
    zoomLinkLabel: 'War Room Video Bridge (Zoom)',
    jiraTicketLabel: 'Jira / Incident Key',
    statusPageLabel: 'Public Status Page URL',
    copySummaryCta: 'Copy Incident Summary (Markdown)',
    copiedNotice: 'Incident Summary Copied to Clipboard!',
    dispatchPagingCta: 'Dispatch Siren to On-Call (PagerDuty)',
    pagingTriggered: 'PagerDuty siren dispatched!',
    closeCta: 'Close Console',
  },
  legal: {
    privacyTitle: 'Privacy Policy & Data Sovereignty',
    termsTitle: 'Terms of Service',
    cookiesTitle: 'Cookie Policy & Local Storage',
    lastUpdated: 'Last Updated: November 2026 | Official Kiroween 2026 Submission',
    privacyArchHeader: '1. Zero-Data Leakage Architecture (Local Execution)',
    privacyArchText: 'BugMortem is engineered around strict telemetry and source code confidentiality. All incident autopsies, stack trace parsing, post-mortem report generation, and acoustic telemetry synthesis execute 100% locally within your client browser session.',
    privacyArchBullets: [
      'No proprietary production crash logs, passwords, or code snippets ever leave your local machine.',
      'No remote database backend is used to persist your ingested stack traces.',
      'PDF death certificate rendering and Markdown exports are compiled purely in-browser.',
    ],
    privacyAdminHeader: '2. Data Controller & Project Attribution',
    privacyAdminText: 'BugMortem is an independent developer tool authored by Adam Gierczak (@AdamBabinicz) for the Kiroween 2026 Hackathon (hosted by AWS & Devpost).',
    privacyScopeHeader: '3. Scope of Processed Information',
    privacyScopeText: 'BugMortem collects no personal information, email addresses, or IP addresses. The only persisted state consists of runtime preferences stored locally in your browser\'s localStorage.',
    privacyLocalStorageHeader: '4. Browser Local Storage Utilization',
    privacyLocalStorageIntro: 'The following table details all client-side keys managed by the application:',
    privacyLocalStorageKeys: [
      { key: 'bugmortem_custom_incidents', desc: 'User-ingested custom incident autopsies created via the intake form.' },
      { key: 'bugmortem_theme', desc: 'Selected visual aesthetic (Dracula Morgue vs. Clinical Daylight).' },
      { key: 'bugmortem_locale', desc: 'Active localization language preference (Polish / English).' },
      { key: 'bugmortem_audio_muted', desc: 'Mute toggle state for procedural Web Audio ECG telemetry.' },
    ],
    noTrackingHeader: '5. No Tracking Cookies & Zero Telemetry',
    noTrackingText: 'The application employs zero third-party tracking scripts (no Google Analytics 4, Hotjar, Facebook Pixel, or advertising beacons).',
    noTrackingBullets: [
      'Zero browser fingerprinting.',
      'Zero behavioral profiling.',
      'Strict Google Consent Mode v2 compliance (all tracking tags denied by default).',
    ],
    userRightsHeader: '6. User Data Rights',
    userRightsText: 'You retain total sovereignty over your telemetry. You can delete individual custom incident records at any time via the archive trash icons or clear storage completely.',
    userRightsBullets: [
      'Right to immediately delete ingested incidents via the UI trash button.',
      'Right to export all generated reports in open Markdown format.',
    ],
    purgeHeader: '7. Data Purge & Reset',
    purgeText: 'Clearing your browser cache or clicking "Clear custom outages" permanently and irreversibly purges all stored incidents from your device.',
    termsScopeHeader: '1. Scope & Educational Purpose',
    termsScopeText: 'BugMortem is an interactive SRE forensic analysis and simulation tool designed to showcase resilient distributed systems patterns, 5-Whys root cause discovery, and automated incident documentation.',
    termsGeneralHeader: '2. Permitted Use',
    termsGeneralText: 'Access to BugMortem is free of charge. Users are permitted to input stack traces, simulate chaos scenarios, and download generated Infrastructure-as-Code (IaC) templates for internal system hardening.',
    termsDisclaimerHeader: '3. SRE Remediation Disclaimer',
    termsDisclaimerIntro: 'While BugMortem\'s SRE prescriptions and IaC templates (Terraform, Kubernetes, AWS SAM, PgBouncer, ESLint) reflect proven engineering practices:',
    termsDisclaimerPoints: [
      'All generated remediation blueprints must be thoroughly audited in staging environments prior to production rollout.',
      'The project author assumes no liability for operational disruptions arising from direct application of generated configurations.',
      'The software is provided for forensic, educational, and simulation purposes.',
    ],
    liabilityHeader: '4. Availability & SLA',
    liabilityText: 'The application is statically deployed on Vercel Edge. While reasonable efforts are made to ensure uninterrupted availability, no uptime SLA is provided.',
    licenseHeader: '5. Open-Source License & Attribution',
    licenseText: 'The BugMortem codebase is distributed under the permissive MIT License.',
    licenseBullets: [
      'You may freely inspect, fork, and adapt SRE resilience patterns found in the repository.',
      'All intellectual property rights remain with Adam Gierczak (@AdamBabinicz).',
    ],
    cookiesUsageHeader: '1. Zero Tracking Cookies',
    cookiesUsageText: 'BugMortem stores zero third-party tracking, advertising, or marketing cookies. All state persistence relies exclusively on browser localStorage, which is strictly sandboxed and never transmitted over the network.',
  },
  cookies: {
    title: 'Privacy & Cookie Settings',
    description: 'We utilize sandboxed telemetry and analytics to evaluate system resilience.',
    essential: 'Essential',
    essentialDesc: 'Required for core service execution and state persistence',
    alwaysActive: 'Always Active',
    analytics: 'Analytics',
    analyticsDesc: 'Google Analytics 4 & GTM',
    marketing: 'Marketing',
    marketingDesc: 'Personalization & Campaigns',
    acceptAll: 'Accept All',
    rejectNonEssential: 'Reject Optional',
    savePreferences: 'Save Preferences',
    details: 'Customize',
    settings: 'Privacy & Cookie Preferences',
    closeAndReject: 'Close and reject optional',
  },
  footer: {
    disclaimer: '© 2026 BugMortem. All rights reserved. Created by Adam Gierczak (@AdamBabinicz) for Kiroween 2026 (AWS & Devpost).',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    cookieSettings: 'Cookie Settings',
  },
};
