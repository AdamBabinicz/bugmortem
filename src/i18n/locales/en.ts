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
          { time: '14:02:11 UTC', label: 'SSR Render', description: 'Server renders HTML markup with timestamp 14:02:11' },
          { time: '14:02:13 UTC', label: 'Client Hydration', description: 'Client browser hydrates at 14:02:13 — checksum divergence detected' },
          { time: '14:02:14 UTC', label: 'DOM Crash', description: 'React unmounts DOM tree, triggering expensive full client re-render', isFatal: true },
        ],
        replayerSteps: [
          {
            step: 1,
            timeOffset: '+0.0s [14:02:11 UTC]',
            title: 'Node.js SSR HTML Generation',
            description: 'Server evaluates dynamic new Date() into the initial HTML response body.',
            telemetry: { latencyMs: 24, errorRate: '0.00%', rps: '1.2k' },
            severity: 'P1',
          },
          {
            step: 2,
            timeOffset: '+1.8s [14:02:13 UTC]',
            title: 'Browser Parsing & hydrateRoot Mismatch',
            description: 'Client browser encounters mismatched node text during hydration walk.',
            telemetry: { latencyMs: 140, errorRate: '12.4%', rps: '1.2k' },
            severity: 'P1',
          },
          {
            step: 3,
            timeOffset: '+2.4s [14:02:14 UTC]',
            title: 'Hydration Collapse (React Error #418)',
            description: 'React drops DOM tree to rescue render; user input state and focus destroyed.',
            telemetry: { latencyMs: 680, errorRate: '100%', rps: '950' },
            severity: 'P0',
          },
        ],
        fiveWhys: [
          'The web application throws "Minified React error #418" and unmounts the interactive client DOM tree.',
          'The component renders current time via new Date().toLocaleTimeString() directly inside the JSX body.',
          'The server-rendered HTML checksum mismatches the initial client-rendered DOM node tree.',
          'Lack of client-side execution boundary (missing mounted state flag or useEffect guard).',
          'Lack of ESLint SSR hydration rules and automated SSR regression tests in the CI/CD pipeline.',
        ],
        blastRadius: {
          nodes: [
            { id: 'n1', name: 'Frontend SSR (Next.js)', role: 'Presentation Layer', status: 'epicenter', statusCode: 'FAIL' },
            { id: 'n2', name: 'Client Browser DOM', role: 'Render Tree', status: 'degraded', statusCode: 'WARN' },
            { id: 'n3', name: 'Edge API Gateway', role: 'Ingress Proxy', status: 'healthy', statusCode: '200 OK' },
            { id: 'n4', name: 'Cart Microservice', role: 'Backend API', status: 'healthy', statusCode: '200 OK' },
          ],
          summary: { epicenterCount: 1, degradedCount: 1, healthyCount: 2 },
        },
        chaosMetrics: [
          { id: 'm1', name: 'Hydration Latency P99', severity: 'P0', description: 'Latency rose to 680ms due to DOM cache invalidation', status: 'injecting' },
          { id: 'm2', name: 'Client Error Ingestion Rate', severity: 'P0', description: 'Surge to 12.4% React Error #418 reports ingested by Sentry', status: 'injecting' },
        ],
        postMortem: {
          summary: 'Unstable time stamping in server components triggered widespread React Error #418 hydration failures.',
          impact: '12% of visitors experienced UI freezing and total loss of checkout form state.',
          actionItems: [
            'Enforce two-phase mounted state guards across all dynamic time-dependent components.',
            'Deploy ESLint rules banning new Date() and Math.random() in server-rendered JSX blocks.',
            'Integrate automated Playwright SSR consistency tests into CI/CD regression suite.',
          ],
        },
      },
      'connection-pool': {
        id: 'connection-pool',
        title: 'Connection Pool Death Spiral',
        badge: 'DATABASE / AURORA',
        severity: 'P0',
        description: 'Unindexed analytics queries exhausted the 200 connection limit on Amazon RDS Aurora, crippling checkout transaction threads.',
        codeSnippet: `// ❌ CURSED CODE: Leaky database client without release in finally
app.get('/api/analytics', async (req, res) => {
  const client = await pool.connect();
  // BUG: Missing try/finally block — any query error permanently leaks connection
  const data = await client.query('SELECT * FROM orders WHERE status = $1', ['completed']);
  res.json(data.rows);
  client.release(); // Never reached when database timeouts occur
});`,
        revivedCode: `// ✅ RESURRECTED SRE CODE: Guarded client with PgBouncer & statement timeout
app.get('/api/analytics', async (req, res) => {
  let client;
  try {
    client = await pool.connect();
    // Enforce strict statement timeout to prevent pool starvation
    await client.query('SET statement_timeout = 2000');
    const data = await client.query(
      'SELECT id, total FROM orders WHERE status = $1 LIMIT 100',
      ['completed']
    );
    res.json(data.rows);
  } catch (err) {
    res.status(503).json({ error: 'Service temporarily unavailable' });
  } finally {
    if (client) client.release(); // Guaranteed release back to pool
  }
});`,
        stackTrace: `error: remaining connection slots are reserved for non-replication superuser connections
    at Parser.parseErrorMessage (/app/node_modules/pg-protocol/dist/parser.js:287:98)
    at Pool.connect (/app/node_modules/pg-pool/index.js:56:21)
    at async /app/dist/server.js:142:18`,
        timeline: [
          { time: '09:15:00 UTC', label: 'Cron Trigger', description: 'Morning analytics batch job triggered without LIMIT constraints' },
          { time: '09:16:30 UTC', label: 'Pool Saturation', description: 'All 200 Aurora connection slots allocated; wait queue exceeds 500ms' },
          { time: '09:17:02 UTC', label: 'Cascading 503', description: 'Checkout service rejects customer transactions with 503 Service Unavailable', isFatal: true },
        ],
        replayerSteps: [
          {
            step: 1,
            timeOffset: '+0.0s [09:15:00 UTC]',
            title: 'Analytics Batch Job Execution',
            description: 'Cron scheduler triggers 30 unindexed full-table scans across orders.',
            telemetry: { latencyMs: 45, errorRate: '0.00%', rps: '2.4k' },
            severity: 'P1',
          },
          {
            step: 2,
            timeOffset: '+90s [09:16:30 UTC]',
            title: 'Database Pool Starvation (0 Slots Left)',
            description: 'Available connection pool capacity drops to 0; checkout queries queue up.',
            telemetry: { latencyMs: 1850, errorRate: '14.2%', rps: '1.9k' },
            severity: 'P1',
          },
          {
            step: 3,
            timeOffset: '+122s [09:17:02 UTC]',
            title: 'Total Database Lockout (P0 Outage)',
            description: 'PgPool throws "connection slots reserved"; checkout fails with HTTP 503.',
            telemetry: { latencyMs: 8400, errorRate: '98.6%', rps: '310' },
            severity: 'P0',
          },
        ],
        fiveWhys: [
          'All downstream database requests fail with "Connection pool exhausted" and 503 errors at checkout.',
          'A scheduled analytics batch job was executed against the primary transactional orders table.',
          'Analytical queries failed to release database clients in a try/finally block, causing connection leaks.',
          'Heavy analytical queries shared the exact same database instance and connection pool as checkout traffic.',
          'Lack of dedicated read-replicas for analytics and absence of a hard global statement_timeout limit.',
        ],
        blastRadius: {
          nodes: [
            { id: 'n1', name: 'Aurora RDS Cluster', role: 'Primary Datastore', status: 'epicenter', statusCode: 'FAIL' },
            { id: 'n2', name: 'Cart Microservice', role: 'Transaction Threads', status: 'degraded', statusCode: '503' },
            { id: 'n3', name: 'Payment Gateway', role: 'Stripe Adapter', status: 'degraded', statusCode: 'WARN' },
            { id: 'n4', name: 'Static Frontend CDN', role: 'Edge Asset Delivery', status: 'healthy', statusCode: '200 OK' },
          ],
          summary: { epicenterCount: 1, degradedCount: 2, healthyCount: 1 },
        },
        chaosMetrics: [
          { id: 'm1', name: 'Connection Pool Saturation', severity: 'P0', description: '100% capacity consumed (200/200 active connections)', status: 'injecting' },
          { id: 'm2', name: 'Database Query Latency P99', severity: 'P0', description: 'Latency escalated to 8400ms across transaction pool', status: 'injecting' },
        ],
        postMortem: {
          summary: 'Connection leaks in analytical reporting exhausted Aurora database connection pools, shutting down cart checkouts.',
          impact: 'Complete checkout outage lasting 18 minutes; estimated revenue loss of $10,500.',
          actionItems: [
            'Deploy PgBouncer proxy layer in transaction pooling mode ahead of Aurora RDS.',
            'Segregate all analytics reporting queries onto dedicated read-only replicas.',
            'Configure PostgreSQL role-level statement_timeout = 2000ms limit.',
          ],
        },
      },
      'oom-reaper': {
        id: 'oom-reaper',
        title: 'Awakening of the OOM Reaper',
        badge: 'RUNTIME / MEMORY',
        severity: 'P0',
        description: 'Bulk export of 2.5M orders into a CSV file allocated the entire dataset into Node.js heap buffer, triggering Linux OOM killer.',
        codeSnippet: `// ❌ CURSED CODE: Loading 2.5GB unbuffered dataset into memory
app.get('/export/orders.csv', async (req, res) => {
  // BUG: findAll loads millions of records into V8 heap memory at once
  const orders = await Order.findAll();
  let csv = 'id,amount,date\\n';
  for (const o of orders) {
    csv += \`\${o.id},\${o.amount},\${o.date}\\n\`;
  }
  res.send(csv);
});`,
        revivedCode: `// ✅ RESURRECTED SRE CODE: Backpressured streaming pipeline
import { pipeline } from 'stream/promises';
import { Transform } from 'stream';

app.get('/export/orders.csv', async (req, res) => {
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="orders.csv"');

  const dbStream = Order.getCursorStream(); // Cursor-based DB stream
  const csvTransformer = new Transform({
    objectMode: true,
    transform(chunk, encoding, callback) {
      callback(null, \`\${chunk.id},\${chunk.amount},\${chunk.date}\\n\`);
    }
  });

  // Safe stream pipeline — RSS memory consumption remains under 30MB
  await pipeline(dbStream, csvTransformer, res);
});`,
        stackTrace: `FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory
 1: 0xb09c30 node::Abort() [node]
 2: 0xa1c2c3 node::FatalError(char const*, char const*) [node]
 3: 0xcf824e v8::Utils::ReportOOMFailure(v8::internal::Isolate*, char const*, bool) [node]
Killed (core dumped)`,
        timeline: [
          { time: '11:30:15 UTC', label: 'Export Requested', description: 'Admin user clicks "Export All Historical Orders to CSV"' },
          { time: '11:30:42 UTC', label: 'Heap Limit Reached', description: 'V8 heap exceeds 1.4 GB; garbage collector locks the event loop' },
          { time: '11:30:45 UTC', label: 'SIGKILL Dispatched', description: 'Linux kernel OOM killer sends SIGKILL (Exit 137); container restarts', isFatal: true },
        ],
        replayerSteps: [
          {
            step: 1,
            timeOffset: '+0.0s [11:30:15 UTC]',
            title: 'Bulk CSV Export Requested',
            description: 'Initiation of SELECT * without LIMIT or pagination in reporting worker.',
            telemetry: { latencyMs: 50, errorRate: '0.00%', rps: '850' },
            severity: 'P1',
          },
          {
            step: 2,
            timeOffset: '+27s [11:30:42 UTC]',
            title: 'V8 Heap Memory Saturation',
            description: 'Garbage collector consumes 100% CPU thread time (GC thrashing); RAM > 1.4 GB.',
            telemetry: { latencyMs: 3200, errorRate: '5.1%', rps: '410' },
            severity: 'P1',
          },
          {
            step: 3,
            timeOffset: '+30s [11:30:45 UTC]',
            title: 'Linux Kernel OOM Killer (Exit Code 137)',
            description: 'OS kernel dispatches SIGKILL; container process terminated instantly.',
            telemetry: { latencyMs: 0, errorRate: '100%', rps: '0' },
            severity: 'P0',
          },
        ],
        fiveWhys: [
          'The Node.js container process is terminated by signal 137 (SIGKILL) and enters a CrashLoopBackOff.',
          'A user initiated a bulk CSV export of 2.5 million order records from the admin dashboard.',
          'The entire dataset was buffered synchronously into RAM as a monolithic Buffer object.',
          'Lack of streaming architecture (Node.js Stream Pipeline) and backpressure mechanisms.',
          'Running memory-intensive export jobs in the synchronous web request process rather than asynchronous worker queues.',
        ],
        blastRadius: {
          nodes: [
            { id: 'n1', name: 'Report Worker Pod', role: 'Compute Node', status: 'epicenter', statusCode: 'OOM' },
            { id: 'n2', name: 'Kubernetes Cluster', role: 'Orchestrator', status: 'degraded', statusCode: 'RESTART' },
            { id: 'n3', name: 'Redis Job Queue', role: 'Message Broker', status: 'healthy', statusCode: '200 OK' },
            { id: 'n4', name: 'S3 Object Storage', role: 'Archive Store', status: 'healthy', statusCode: '200 OK' },
          ],
          summary: { epicenterCount: 1, degradedCount: 1, healthyCount: 2 },
        },
        chaosMetrics: [
          { id: 'm1', name: 'V8 Heap Memory Consumption', severity: 'P0', description: 'Exceeded 1400MB threshold allocating 100% container quota', status: 'injecting' },
          { id: 'm2', name: 'Pod CrashLoop Frequency', severity: 'P0', description: 'Three consecutive pod terminations via SIGKILL (exit code 137)', status: 'injecting' },
        ],
        postMortem: {
          summary: 'Unbuffered CSV file generation consumed entire container RAM quota, triggering immediate Linux OOM SIGKILL.',
          impact: 'Restart of 4 critical worker nodes; admin dashboard unreachable for 5 minutes.',
          actionItems: [
            'Refactor all bulk exports to stream chunks via Node.js Stream Pipeline with backpressure.',
            'Offload heavy export processing to asynchronous workers with presigned S3 delivery links.',
            'Enforce hard memory requests and limits across all Kubernetes pod specifications.',
          ],
        },
      },
      'retry-storm': {
        id: 'retry-storm',
        title: 'Cascading Retry Storm',
        badge: 'CONCURRENCY / NETWORK',
        severity: 'P1',
        description: 'Instant retries without randomized jitter during a 500ms latency spike multiplied traffic by 500%, collapsing core databases.',
        codeSnippet: `// ❌ CURSED CODE: Synchronous retry storm without jitter or backoff
async function fetchWithRetry(url, retries = 5) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fetch(url);
    } catch (e) {
      // Immediate retry without delay amplifies system load 5x
    }
  }
}`,
        revivedCode: `// ✅ RESURRECTED SRE CODE: Exponential Backoff with Full Jitter
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
          { time: '18:32:00 UTC', label: 'Initial Latency Spike', description: 'Brief database lock increases query latency to 450ms' },
          { time: '18:33:15 UTC', label: 'Retry Burst', description: 'Clients execute 5x immediate retries, spiking traffic by 500%' },
          { time: '18:35:00 UTC', label: 'Gateway Collapse', description: 'Edge API gateway queue saturates, dropping traffic with 504 timeouts', isFatal: true },
        ],
        replayerSteps: [
          {
            step: 1,
            timeOffset: '+0.0s [18:32:00 UTC]',
            title: 'Transient Database Hiccup',
            description: 'Row-level locking elevates microservice request latency to 450ms.',
            telemetry: { latencyMs: 450, errorRate: '1.20%', rps: '3.1k' },
            severity: 'P1',
          },
          {
            step: 2,
            timeOffset: '+75s [18:33:15 UTC]',
            title: 'Cascading Traffic Amplification (5x Retries)',
            description: 'Lack of backoff prompts 10,000 clients to retry concurrently.',
            telemetry: { latencyMs: 2400, errorRate: '41.5%', rps: '15.5k' },
            severity: 'P1',
          },
          {
            step: 3,
            timeOffset: '+180s [18:35:00 UTC]',
            title: 'API Gateway Saturation (504 Storm)',
            description: 'Connection queues exhaust; edge proxies drop traffic with 504 Gateway Timeout.',
            telemetry: { latencyMs: 9200, errorRate: '94.8%', rps: '1.1k' },
            severity: 'P0',
          },
        ],
        fiveWhys: [
          'Edge API Gateway rejects incoming traffic with 504 Gateway Timeout and 100% CPU saturation.',
          'A transient 450ms database latency spike triggered initial client request timeouts.',
          'HTTP clients immediately retried failed requests in a tight loop without delay or randomness.',
          'Lack of exponential backoff with full jitter randomization in HTTP client retry logic.',
          'Absence of ingress circuit breaking and adaptive rate limiting at the Envoy API Gateway layer.',
        ],
        blastRadius: {
          nodes: [
            { id: 'n1', name: 'Edge API Gateway', role: 'Ingress Proxy', status: 'epicenter', statusCode: 'FAIL' },
            { id: 'n2', name: 'Auth Microservice', role: 'Token Verification', status: 'degraded', statusCode: 'WARN' },
            { id: 'n3', name: 'Core Database Cluster', role: 'Data Layer', status: 'degraded', statusCode: 'WARN' },
            { id: 'n4', name: 'Frontend Client SPA', role: 'User Interface', status: 'healthy', statusCode: '200 OK' },
          ],
          summary: { epicenterCount: 1, degradedCount: 2, healthyCount: 1 },
        },
        chaosMetrics: [
          { id: 'm1', name: 'Edge Ingress Latency Injection', severity: 'P1', description: 'Simulated +2500ms delay on edge API routing', status: 'injecting' },
          { id: 'm2', name: 'Cascading 504 Failure Rate', severity: 'P1', description: 'Rejected ingress requests surged to 94.8%', status: 'injecting' },
        ],
        postMortem: {
          summary: 'Linear retry amplification triggered a self-inflicted distributed denial-of-service (DoS) cascade.',
          impact: 'Auth and user profile services rejected 45,000 requests over an 18-minute window.',
          actionItems: [
            'Mandate Exponential Backoff with Full Jitter across all internal RPC and external HTTP clients.',
            'Deploy Envoy circuit breakers to shed excess traffic before downstream database saturation.',
            'Implement token bucket rate limiting on ingress gateway endpoints.',
          ],
        },
      },
      'cors-nightmare': {
        id: 'cors-nightmare',
        title: 'CORS Preflight Nightmare',
        badge: 'NETWORK / SECURITY',
        severity: 'P1',
        description: 'Missing CORS headers on API gateway caused all cross-origin OPTIONS preflight requests to fail with 403, locking out the entire SPA.',
        codeSnippet: `// ❌ CURSED CODE: Hardcoded and incomplete CORS header logic
app.use((req, res, next) => {
  // BUG: Fails to handle OPTIONS preflight and misses credentials header
  res.header('Access-Control-Allow-Origin', 'https://bugmortem.com');
  next();
});`,
        revivedCode: `// ✅ RESURRECTED SRE CODE: Full CORS suite with dynamic allowlist & preflight cache
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
      callback(new Error('Rejected by BugMortem SRE CORS Policy'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  maxAge: 86400 // Cache preflight for 24h
}));`,
        stackTrace: `Access to fetch at 'https://api.bugmortem.io/v1/auth' from origin 'https://app.bugmortem.io' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.`,
        timeline: [
          { time: '08:00:00 UTC', label: 'Domain Cutover', description: 'Production SPA frontend switched over to new app.bugmortem.io subdomain' },
          { time: '08:01:20 UTC', label: 'OPTIONS 403', description: 'Browser clients issue preflight OPTIONS requests, failing at gateway' },
          { time: '08:02:00 UTC', label: 'Full App Lockout', description: '100% of user sessions fail to authenticate due to browser security restrictions', isFatal: true },
        ],
        replayerSteps: [
          {
            step: 1,
            timeOffset: '+0.0s [08:00:00 UTC]',
            title: 'Frontend Domain Cutover',
            description: 'Traffic shifted to new domain app.bugmortem.io without gateway CORS sync.',
            telemetry: { latencyMs: 18, errorRate: '0.00%', rps: '4.2k' },
            severity: 'P1',
          },
          {
            step: 2,
            timeOffset: '+80s [08:01:20 UTC]',
            title: 'OPTIONS Preflight Rejection (403 Forbidden)',
            description: 'Browser security sandbox intercepts cross-origin fetch requests.',
            telemetry: { latencyMs: 65, errorRate: '58.3%', rps: '4.1k' },
            severity: 'P1',
          },
          {
            step: 3,
            timeOffset: '+120s [08:02:00 UTC]',
            title: 'Complete Client Lockout (CORS Block)',
            description: 'Missing Access-Control-Allow-Origin header halts all client execution.',
            telemetry: { latencyMs: 70, errorRate: '100%', rps: '3.8k' },
            severity: 'P0',
          },
        ],
        fiveWhys: [
          'Client web browsers block all API requests with "CORS policy: No Access-Control-Allow-Origin".',
          'The SPA frontend was migrated to a new subdomain app.bugmortem.io without gateway CORS updates.',
          'The API Gateway rejected preflight HTTP OPTIONS requests with 403 Forbidden instead of 204 No Content.',
          'Implicit and decentralized CORS header configuration rather than an infrastructure-level gateway policy.',
          'Lack of automated CORS preflight smoke tests in the continuous deployment pipeline prior to DNS cutover.',
        ],
        blastRadius: {
          nodes: [
            { id: 'n1', name: 'API Gateway Ingress', role: 'Traffic Router', status: 'epicenter', statusCode: '403' },
            { id: 'n2', name: 'Client SPA App', role: 'User Interface', status: 'degraded', statusCode: 'BLOCKED' },
            { id: 'n3', name: 'Account Microservice', role: 'Business Logic', status: 'healthy', statusCode: '200 OK' },
            { id: 'n4', name: 'User Database Cluster', role: 'Persistent Store', status: 'healthy', statusCode: '200 OK' },
          ],
          summary: { epicenterCount: 1, degradedCount: 1, healthyCount: 2 },
        },
        chaosMetrics: [
          { id: 'm1', name: 'Session Token Invalidation Burst', severity: 'P1', description: 'Cross-origin rejection of Authorization bearer tokens', status: 'injecting' },
          { id: 'm2', name: 'Preflight OPTIONS Rejection Rate', severity: 'P1', description: '100% of preflight checks blocked by browser origin sandbox', status: 'injecting' },
        ],
        postMortem: {
          summary: 'Missing OPTIONS preflight handling on the edge gateway after domain cutover severed SPA connectivity.',
          impact: 'Complete user lockout from login and authenticated dashboard for 22 minutes.',
          actionItems: [
            'Deploy unified gateway-level CORS configuration with max-age: 86400 preflight caching.',
            'Incorporate automated curl -X OPTIONS preflight verification into pre-release CI pipelines.',
            'Synchronize allowed origin lists directly via Terraform infrastructure as code.',
          ],
        },
      },
      'serverless-timeout': {
        id: 'serverless-timeout',
        title: 'Serverless Cold Start Cascade & Gateway 504 Timeout',
        badge: 'CLOUD / SERVERLESS',
        severity: 'P0',
        description: 'Heavy database client initialization inside the serverless function handler triggered a cold start cascade, exceeding the 29s API Gateway limit.',
        codeSnippet: `// ❌ CURSED CODE: Database connection instantiated inside Lambda handler
export const handler = async (event: any) => {
  // BUG: New SSL/TLS connection initiated on EVERY single invocation
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: true }
  });
  await client.connect(); // 800ms cold start latency penalty
  const result = await client.query('SELECT * FROM inventory WHERE id = $1', [event.pathParameters.id]);
  await client.end();
  return { statusCode: 200, body: JSON.stringify(result.rows) };
};`,
        revivedCode: `// ✅ RESURRECTED SRE CODE: Shared pool outside handler with RDS Proxy
import { Pool } from 'pg';

// Connection instantiated ONCE outside handler — reused across warm container invocations
const pool = new Pool({
  host: process.env.RDS_PROXY_ENDPOINT, // Routed via Amazon RDS Proxy
  max: 1, // Single connection per serverless micro-container
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
          { time: '12:00:00 UTC', label: 'Flash Sale Traffic', description: 'Marketing blast initiates immediate traffic spike to 5,000 RPS' },
          { time: '12:00:15 UTC', label: '120 Cold Starts', description: 'Cloud provider spins up 120 concurrent micro-container instances' },
          { time: '12:00:29 UTC', label: 'Gateway 504 Timeout', description: 'Connection queue exceeds 29s; API Gateway terminates client sockets', isFatal: true },
        ],
        replayerSteps: [
          {
            step: 1,
            timeOffset: '+0.0s [12:00:00 UTC]',
            title: 'Flash Sale Traffic Ingress',
            description: 'Sudden inventory check volume forces rapid horizontal serverless scaling.',
            telemetry: { latencyMs: 120, errorRate: '0.00%', rps: '4.8k' },
            severity: 'P1',
          },
          {
            step: 2,
            timeOffset: '+15s [12:00:15 UTC]',
            title: 'Cold Start Wave (120 Concurrent Instantiations)',
            description: 'Lambda micro-containers concurrently bombard database with TLS handshakes.',
            telemetry: { latencyMs: 4800, errorRate: '22.4%', rps: '3.6k' },
            severity: 'P1',
          },
          {
            step: 3,
            timeOffset: '+29s [12:00:29 UTC]',
            title: 'API Gateway Timeout Breach (504 Storm)',
            description: 'Hard 29s limit terminates connections; 100% of customer requests drop.',
            telemetry: { latencyMs: 29000, errorRate: '100%', rps: '210' },
            severity: 'P0',
          },
        ],
        fiveWhys: [
          'Clients experience 504 Gateway Timeout errors after exactly 29 seconds of waiting.',
          'A marketing traffic surge triggered 120 concurrent cold starts across serverless micro-containers.',
          'Each cold start initiated a heavy TLS handshake and dedicated SQL connection inside the function handler.',
          'Lack of execution context reuse outside the handler and absence of a connection proxy (RDS Proxy).',
          'Lack of Provisioned Concurrency for critical revenue paths and absence of serverless database standards.',
        ],
        blastRadius: {
          nodes: [
            { id: 'n1', name: 'API Gateway Ingress', role: '29s Ingress Limit', status: 'epicenter', statusCode: '504' },
            { id: 'n2', name: 'Serverless Worker Fleet', role: 'Lambda Compute', status: 'degraded', statusCode: 'TIMEOUT' },
            { id: 'n3', name: 'Inventory DB Instance', role: 'PostgreSQL RDS', status: 'degraded', statusCode: 'SATURATED' },
            { id: 'n4', name: 'Checkout SPA Client', role: 'User Web Frontend', status: 'degraded', statusCode: 'ERROR' },
          ],
          summary: { epicenterCount: 1, degradedCount: 3, healthyCount: 0 },
        },
        chaosMetrics: [
          { id: 'm1', name: 'Serverless Cold Start P99', severity: 'P0', description: 'Average cold start latency escalated to 29,000ms due to database connection queues', status: 'injecting' },
          { id: 'm2', name: 'API Gateway 504 Timeout Rate', severity: 'P0', description: '100% of customer requests terminated by API Gateway 29-second ceiling', status: 'injecting' },
        ],
        postMortem: {
          summary: 'In-handler database connection instantiation prompted an acute cold-start cascade and gateway socket termination.',
          impact: 'Customers unable to check product inventory or complete purchases during the first 14 minutes of the sale.',
          actionItems: [
            'Extract database client connection pooling outside the Lambda handler to preserve warm container sockets.',
            'Deploy Amazon RDS Proxy to consolidate and multiplex serverless database connections.',
            'Configure Provisioned Concurrency (minimum 20 pre-warmed instances) during scheduled flash sales.',
          ],
        },
      },
    },
  },
  codeSection: {
    cursedTitle: 'CODE FORENSICS: CURSED VS RESURRECTED CODE',
    resurrectedTitle: 'RESURRECTED SRE CODE (RESILIENCE PATTERN)',
    cursedBadge: 'CRITICAL FAILURE',
    resurrectedBadge: 'PATTERN: SRE RESILIENCE',
    copyCta: 'Copy Resurrected Code',
    copied: 'Copied to clipboard!',
  },
  stackTrace: {
    title: '>_ RAW STACK TRACE FORENSICS',
  },
  timeline: {
    title: '⏱ CHRONOLOGICAL INCIDENT TIMELINE',
  },
  replayer: {
    title: 'TIME-TO-DEATH INCIDENT REPLAYER',
    subtitle: 'Simulate the failure sequence step-by-step and watch telemetry degrade in real time',
    play: 'Play Autopsy',
    pause: 'Pause',
    reset: 'Reset',
    speed: 'Speed',
    stepOf: 'Step',
    telemetryLatency: 'Latency P99',
    telemetryErrors: 'Error Rate',
    telemetryRps: 'Throughput RPS',
  },
  fiveWhys: {
    sectionTitle: 'BLAMELESS 5-WHYS ROOT-CAUSE TREE',
    sectionSubtitle: 'Systemic engineering investigation from surface symptom down to architectural flaw.',
    levels: [
      '1. Surface Symptom',
      '2. Immediate Trigger',
      '3. Failure Mechanism',
      '4. Architectural Flaw',
      '5. Systemic Root Cause',
    ],
    blamelessBadge: 'BLAMELESS SRE CULTURE',
    rootCauseBadge: 'SYSTEMIC ROOT CAUSE',
    copyChain: 'Copy Investigation Chain',
    copied: 'Investigation Copied!',
  },
  blastRadius: {
    title: 'ARCHITECTURE BLAST RADIUS TOPOLOGY',
    subtitle: 'Cascading failure vectors across microservice boundaries and Patient Zero isolation.',
    legendEpicenter: 'Patient Zero (Epicenter P0)',
    legendDegraded: 'Cascading Blast (P1)',
    legendHealthy: 'Healthy Node (200 OK)',
    badgeEpicenter: 'EPICENTER P0',
    badgeDegraded: 'DEGRADED P1',
    badgeHealthy: 'HEALTHY NODES',
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
    activeStatus: 'CHAOS INJECTION ACTIVE',
    metricThroughput: 'THROUGHPUT',
    metricP99: 'LATENCY P99',
    metricErrorRate: 'ERROR RATE',
    injectCta: 'Inject failure',
    recoveringCta: 'Self-healing...',
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
  },
  dispatcher: {
    openBtn: 'Escalate On-Call',
  },
  dispatcherModal: {
    title: 'ON-CALL INCIDENT ESCALATION DISPATCHER',
    subtitle: 'Immediate responder paging and incident war room provisioning',
    severityLabel: 'INCIDENT PRIORITY',
    serviceLabel: 'AFFECTED SERVICE',
    commanderLabel: 'INCIDENT COMMANDER',
    channelLabel: 'SLACK INCIDENT CHANNEL',
    zoomLinkLabel: 'INCIDENT WAR ROOM',
    jiraTicketLabel: 'JIRA SRE TICKET',
    statusPageLabel: 'STATUSPAGE MESSAGE',
    copySummaryCta: 'Copy Escalation Brief',
    copiedNotice: 'Copied to clipboard!',
    dispatchPagingCta: 'Send PagerDuty Page (P0)',
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
    termsLiabilityHeader: '4. Availability & SLA',
    termsLiabilityText: 'The application is statically deployed on Vercel Edge. While reasonable efforts are made to ensure uninterrupted availability, no uptime SLA is provided.',
    licenseHeader: '5. Open-Source License & Attribution',
    licenseText: 'The BugMortem codebase is distributed under the permissive MIT License.',
    licenseBullets: [
      'You may freely inspect, fork, and adapt SRE resilience patterns found in the repository.',
      'All intellectual property rights remain with Adam Gierczak (@AdamBabinicz).',
    ],
    cookiesUsageHeader: '1. Zero Tracking Cookies',
    cookiesUsageText: 'BugMortem stores zero third-party tracking, advertising, or marketing cookies. All state persistence relies exclusively on browser localStorage, which is strictly sandboxed and never transmitted over the network.',
  },
  footer: {
    disclaimer: '© 2026 BugMortem. All rights reserved. Created by Adam Gierczak (@AdamBabinicz) for Kiroween 2026 (AWS & Devpost).',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    cookieSettings: 'Cookie Settings',
  },
};