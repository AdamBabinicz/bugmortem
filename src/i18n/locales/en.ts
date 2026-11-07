import type { TranslationDictionary } from '../types';

export const en: TranslationDictionary = {
  common: {
    loading: 'Loading diagnostic telemetry...',
    error: 'Fatal forensic error encountered',
  },
  hero: {
    badge: 'KIROWEEN 2026 HACKATHON EDITION',
    title: 'BugMortem',
    subtitle: 'Production Incident Forensic Studio & Digital Morgue',
    tagline: 'When production flatlines at 3 AM, we perform the autopsy.',
    ctaAutopsy: 'Begin Forensic Autopsy',
    ctaReplay: 'Replay Incident Chronology',
  },
  navigation: {
    brand: 'BugMortem',
    morgue: 'Digital Morgue',
    sandbox: 'Chaos Sandbox',
    docs: 'Forensic Protocol',
  },
  presets: {
    title: 'CANONICAL PRODUCTION AUTOPSY ARCHIVES',
    subtitle: '7 real-world architectural failures cataloged for forensic investigation',
    badge: 'SPECIMEN',
    items: {
      'react-hydration': {
        id: 'react-hydration',
        name: 'React 19 SSR Hydration Mismatch',
        category: 'Frontend & SSR Architecture',
        severity: 'P0',
        badge: 'REACT 19 / SSR',
        service: 'storefront-edge-ssr',
        domain: 'frontend',
        status: 'ASPHYXIATED',
        timestamp: '03:14:22 UTC',
        summary: 'Non-deterministic server/client HTML divergence caused immediate client-side DOM root collapse, blinding 100% of e-commerce checkout traffic during peak load.',
        fatalEvent: 'Fatal Event: Asystole flatline detected across telemetry monitors.',
        pathology: 'Unsynchronized temporal state rendering in root SSR tree',
        codeSnippet: `// Server: renderToString with timestamp
const html = renderToString(
  <Clock now={new Date()} />
);

// Client: hydrateRoot executes 120ms later
hydrateRoot(
  document.getElementById('root'),
  <Clock now={new Date()} /> // MISMATCH!
);`,
        stackTrace: `Error: Hydration failed because the initial UI does not match what was rendered on the server.
    at throwOnHydrationMismatch (react-dom-client.development.js:12480:11)
    at tryToClaimNextHydratableInstance (react-dom-client.development.js:12602:9)
    at updateHostComponent$1 (react-dom-client.development.js:14562:17)
    at beginWork (react-dom-client.development.js:18942:14)`,
        coronerVerdict: 'The client-side DOM violently disintegrated during hydration due to non-deterministic temporal rendering. Server and client drifted by 124 milliseconds, causing React 19 to discard the root hierarchy and trigger unrecoverable blank-screen death.',
        postMortem: {
          summary: 'High-severity client-side hydration collapse triggered by un-synchronized Date objects rendered during SSR, completely blinding 100% of incoming checkout traffic.',
          impact: '100% bounce rate on storefront checkout route for 18 minutes; estimated revenue disruption of $142,000.',
          rootCause: 'Direct invocation of new Date() inside the SSR component tree without a two-pass hydration boundary or client-only mounting guard.',
          actionItems: [
            'Introduce SafeClientOnly mounting boundary for temporal components',
            'Enforce ESLint AST rule banning window/localStorage/Date directly in SSR render tree',
            'Add automated Playwright visual regression assertions against hydration console warnings'
          ]
        },
        timeline: [
          { time: 'T-00:00:00', desc: 'Canary rollout of SSR Storefront v3.12.0 reaches 10% traffic.', isFatal: false },
          { time: 'T-00:01:15', desc: 'Initial client telemetry records benign 12ms DOM variance warnings.', isFatal: false },
          { time: 'T-00:02:40', desc: 'Traffic shifted to 100%. Client hydration mismatch errors spike to 45,000/min.', isFatal: false },
          { time: 'T-00:04:12', desc: 'React 19 root container unmounts upon layout divergence; white-screen asystole.', isFatal: true }
        ],
        fiveWhys: [
          { whyNumber: 1, question: 'Why did the storefront render a blank white screen?', answer: 'React 19 discarded the entire DOM tree and crashed client-side execution.' },
          { whyNumber: 2, question: 'Why did React discard the DOM hierarchy?', answer: 'A fatal hydration mismatch error was thrown during root node reconciliation.' },
          { whyNumber: 3, question: 'Why was there a mismatch between server and client?', answer: 'The server rendered a timestamp using UTC while the client hydrated in local browser timezone.' },
          { whyNumber: 4, question: 'Why was time rendered directly in the shared SSR tree?', answer: 'The developer assumed renderToString and hydrateRoot execute simultaneously.' },
          { whyNumber: 5, question: 'Why was this not detected in CI/CD pipeline?', answer: 'End-to-end synthetic tests executed with JavaScript disabled, masking client-side hydration crashes.' }
        ]
      },
      'connection-pool': {
        id: 'connection-pool',
        name: 'PostgreSQL Connection Starvation & Pool Exhaustion',
        category: 'Database & Infrastructure',
        severity: 'P0',
        badge: 'POSTGRES / INFRA',
        service: 'auth-billing-cluster',
        domain: 'database',
        status: 'CARDIAC ARREST',
        timestamp: '19:42:01 UTC',
        summary: 'Unhandled payment gateway timeouts leaked database connection handles during error rollback, saturating max_connections and deadlocking all transactional services globally.',
        fatalEvent: 'Fatal Event: Pool exhaustion caused cascading connection refusal (503 Service Unavailable).',
        pathology: 'Missing client.release() invocation inside catch block exception branches',
        codeSnippet: `// Missing client.release() in error catch block
async function checkout(order) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await processOrder(client, order);
    await client.query('COMMIT');
  } catch (err) {
    // BUG: Connection never released back to pool on failure!
    throw err;
  }
}`,
        stackTrace: `error: remaining connection slots are reserved for non-replication superuser connections
    at Parser.parseErrorMessage (pg-protocol/dist/parser.js:287:98)
    at Connection.handlePacket (pg/lib/connection.js:128:19)
    at Socket.emit (node:events:517:28)`,
        coronerVerdict: 'PostgreSQL max_connections ceiling of 500 was breached after an unhandled payment gateway error leaked connection handles. Starved workers deadlocked in connection-acquisition queues, terminating all database transactions globally.',
        postMortem: {
          summary: 'Global database asystole caused by unreleased pooled connections during upstream payment failure cascades, freezing billing and authentication clusters.',
          impact: '24 minutes of complete inability to authenticate users or record transactions; 4,200 requests aborted with HTTP 503.',
          rootCause: 'Failure to employ try-finally blocks or automatic resource disposers around pool.connect() handles.',
          actionItems: [
            'Deploy PgBouncer in transaction-pooling mode to multiplex 5,000 clients over 100 backend slots',
            'Refactor all database access code to use withTransaction() disposable wrappers',
            'Configure Prometheus alert for PgPool saturation exceeding 85% for > 60 seconds'
          ]
        },
        timeline: [
          { time: 'T-00:00:00', desc: 'Upstream payment processor experiences 3-second transient network degradation.', isFatal: false },
          { time: 'T-00:00:45', desc: 'Unhandled exceptions leak 40 database clients per second during rollback failures.', isFatal: false },
          { time: 'T-00:01:50', desc: 'PostgreSQL connection pool utilization hits 495/500 allocated slots.', isFatal: false },
          { time: 'T-00:03:00', desc: 'Pool exhausted: FATAL: remaining connection slots are reserved for superusers.', isFatal: true }
        ],
        fiveWhys: [
          { whyNumber: 1, question: 'Why did the API return HTTP 503 across all routes?', answer: 'Microservices could not establish database connections to verify user sessions.' },
          { whyNumber: 2, question: 'Why were no database connections available?', answer: 'The PostgreSQL server rejected new connections with max_connections ceiling breach.' },
          { whyNumber: 3, question: 'Why were 500 connections open with zero CPU utilization?', answer: 'Leaked client sockets remained in idle-in-transaction state indefinitely.' },
          { whyNumber: 4, question: 'Why were sockets not closed upon transaction errors?', answer: 'The catch block threw an exception before calling client.release().' },
          { whyNumber: 5, question: 'Why was connection pooling left unmanaged at the application layer?', answer: 'Architectural debt: the service connected directly to raw RDS instead of PgBouncer proxy.' }
        ]
      },
      'oom-reaper': {
        id: 'oom-reaper',
        name: 'Memory Leak & Linux Kernel OOM Killer Flatline',
        category: 'Kubernetes & Runtime Memory',
        severity: 'P0',
        badge: 'NODE.JS / K8S',
        service: 'export-report-worker',
        domain: 'compute',
        status: 'TERMINATED (SIGKILL)',
        timestamp: '14:02:19 UTC',
        summary: 'Synchronous in-memory buffering of 1.4 million audit rows bloated heap allocations past container cgroup memory constraints, triggering instant Linux kernel termination with exit code 137.',
        fatalEvent: 'Fatal Event: Kernel OOM reaper dispatched SIGKILL to process 41829.',
        pathology: 'Unbounded heap allocation accumulating large dataset in single JavaScript array',
        codeSnippet: `// Unbounded in-memory accumulation of 1.4M rows
const exportData = [];
dbStream.on('data', (chunk) => {
  exportData.push(chunk); // Heap allocation explodes to 4.2GB
});`,
        stackTrace: `[14029.182049] Out of memory: Killed process 41829 (node) total-vm:4829104kB, anon-rss:2084920kB, file-rss:0kB
[14029.182100] oom_reaper: reaped process 41829 (node), now anon-rss:0kB
Killed (SIGKILL, exit code 137)`,
        coronerVerdict: 'Linux kernel OOM Reaper executed process 41829 via SIGKILL after heap allocations violently breached container cgroup hard limit of 2048MB during full-table CSV exports.',
        postMortem: {
          summary: 'Sudden termination of report generation workers due to unbuffered batch loading into memory stateroom, triggering SIGKILL 137.',
          impact: 'Corrupted financial exports for enterprise tier customers; continuous Pod crash-loop backoff for 42 minutes.',
          rootCause: 'Buffering millions of historical ledger records in RAM arrays instead of streaming directly to S3 with backpressure.',
          actionItems: [
            'Enforce Node.js Streams with stream.pipeline and CSV transform streams',
            'Set NODE_OPTIONS="--max-old-space-size=1536" inside 2GiB Kubernetes cgroup limits',
            'Implement max row query limits on synchronous report generation endpoints'
          ]
        },
        timeline: [
          { time: 'T-00:00:00', desc: 'Enterprise client requests 5-year full ledger audit CSV export.', isFatal: false },
          { time: 'T-00:01:20', desc: 'Heap memory usage climbs steadily from 320MB to 1.8GB.', isFatal: false },
          { time: 'T-00:02:45', desc: 'V8 garbage collector locks event loop for 1,400ms in desperate scavenge cycle.', isFatal: false },
          { time: 'T-00:03:10', desc: 'Container cgroup hard limit (2048MB) breached; kernel sends SIGKILL 137.', isFatal: true }
        ],
        fiveWhys: [
          { whyNumber: 1, question: 'Why did the background worker Pod restart continuously?', answer: 'Kubernetes detected exit code 137 and put the container in CrashLoopBackOff.' },
          { whyNumber: 2, question: 'Why did the container exit with code 137?', answer: 'The Linux kernel sent SIGKILL because the container exceeded its cgroup memory limit.' },
          { whyNumber: 3, question: 'Why did the Node.js process consume over 2GB of RAM?', answer: 'It loaded 1.4 million database records into a single in-memory JavaScript array.' },
          { whyNumber: 4, question: 'Why was data accumulated in memory instead of streamed?', answer: 'The export endpoint was implemented using Array.map() rather than Node.js stream.pipeline.' },
          { whyNumber: 5, question: 'Why were memory limits configured without a swap/headroom buffer?', answer: 'The V8 heap size limit (--max-old-space-size) was set higher than the Kubernetes pod limit.' }
        ]
      },
      'retry-storm': {
        id: 'retry-storm',
        name: 'Exponential Retry Storm & Thundering Herd DDOS',
        category: 'Networking & Service Mesh',
        severity: 'P0',
        badge: 'DISTRIBUTED / NET',
        service: 'payment-gateway-mesh',
        domain: 'networking',
        status: 'CRUSHED',
        timestamp: '11:15:08 UTC',
        summary: 'A 200ms network blip provoked 10,000 clients into firing aggressive 10x synchronous retries without jitter, generating a 140,000 RPS tidal wave that flattened edge reverse proxies.',
        fatalEvent: 'Fatal Event: Edge ingress saturation provoked SYN flood protection, dropping all gateway pods.',
        pathology: 'Static loop retry without exponential backoff or decorrelated randomization',
        codeSnippet: `// Flawed immediate retry without jitter
for (let i = 0; i < 10; i++) {
  try {
    return await http.post('/charge', payload);
  } catch (e) {
    await sleep(100); // Resonant synchronized thundering herd!
  }
}`,
        stackTrace: `FetchError: request to https://payments.internal/charge failed, reason: connect ETIMEDOUT 10.0.4.18:443
    at ClientRequest.<anonymous> (node_modules/node-fetch/lib/index.js:1491:11)
    at Socket.emit (node:events:517:28)
    at TCP.onStreamRead (node:net:592:20)`,
        coronerVerdict: '10,000 edge clients experienced a 200ms network hiccup and simultaneously fired aggressive 10x retries with static 100ms backoff, multiplying ingress traffic by 1000% and completely crushing the payment gateway.',
        postMortem: {
          summary: 'Self-inflicted distributed denial-of-service attack provoked by un-jittered tight retry loops across all frontend clients during upstream payment micro-blip.',
          impact: 'Payment processing gateway knocked offline for 31 minutes; 18,400 shopping carts abandoned.',
          rootCause: 'Total absence of randomized exponential backoff (Full Jitter) and missing edge circuit breakers.',
          actionItems: [
            'Implement full decorrelated jitter backoff algorithm across client SDKs',
            'Deploy Envoy circuit breakers to instantly trip and shed load when error rates cross 20%',
            'Enforce rate limiting on internal service mesh ingress proxies'
          ]
        },
        timeline: [
          { time: 'T-00:00:00', desc: 'Core switch re-converges BGP routes, dropping packets for 250 milliseconds.', isFatal: false },
          { time: 'T-00:00:10', desc: '12,000 concurrent client requests fail simultaneously.', isFatal: false },
          { time: 'T-00:00:20', desc: 'Synchronized retries hit internal ingress with 140,000 RPS burst (12x normal peak).', isFatal: false },
          { time: 'T-00:01:05', desc: 'Connection queues overflow; SYN flood protection drops gateway pods into asystole.', isFatal: true }
        ],
        fiveWhys: [
          { whyNumber: 1, question: 'Why did the payment service stop responding?', answer: 'Ingress proxies dropped all connections due to CPU saturation and connection backlog overflow.' },
          { whyNumber: 2, question: 'Why did traffic spike to 140,000 requests per second?', answer: 'Thousands of web and mobile clients fired retries simultaneously.' },
          { whyNumber: 3, question: 'Why were the retries synchronized in a resonant wave?', answer: 'The retry logic used a static 100ms delay with zero random jitter.' },
          { whyNumber: 4, question: 'Why did clients retry 10 times consecutively?', answer: 'The SDK retry count was configured to 10 to mask intermittent network jitter.' },
          { whyNumber: 5, question: 'Why was there no circuit breaker to protect the upstream service?', answer: 'Circuit breaking was disabled during a recent service mesh migration and never re-enabled.' }
        ]
      },
      'cors-nightmare': {
        id: 'cors-nightmare',
        name: 'Strict Origin CORS Rejection on Production Preflight',
        category: 'Browser Security & Edge CDN',
        severity: 'P1',
        badge: 'SECURITY / BROWSER',
        service: 'public-api-gateway',
        domain: 'security',
        status: 'STRANGULATED',
        timestamp: '08:22:45 UTC',
        summary: 'CDN edge caches served stale OPTIONS preflight responses containing staging domains, triggering browser CORS blocks that completely paralyzed customer logins.',
        fatalEvent: 'Fatal Event: Browser security sandbox rejected 100% of API preflight handshakes.',
        pathology: 'Missing Vary: Origin header on CDN-cached preflight responses',
        codeSnippet: `// Preflight OPTIONS handler missing Vary: Origin
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    // Missing Allow-Credentials and dynamic origin reflection
    res.header('Access-Control-Allow-Origin', 'https://staging.app');
    return res.sendStatus(200);
  }
  next();
});`,
        stackTrace: `Access to fetch at 'https://api.bugmortem.io/v1/auth' from origin 'https://bugmortem.vercel.app' 
has been blocked by CORS policy: Response to preflight request doesn't pass access control check: 
The 'Access-Control-Allow-Origin' header has a value 'https://staging.app' that is not equal to the supplied origin.`,
        coronerVerdict: 'Production frontend build was rejected at the edge by the browser security sandbox because an environment variable misconfiguration locked CORS preflight reflection to the staging environment URL.',
        postMortem: {
          summary: 'Complete lockout of production browser clients due to hardcoded staging origin reflection in CORS preflight responses.',
          impact: 'Zero user logins possible from production domain for 55 minutes.',
          rootCause: 'Static staging domain compiled into edge CDN cache rules without dynamic origin validation against trusted production patterns.',
          actionItems: [
            'Replace hardcoded origin strings with dynamic domain regex validation against allowed list',
            'Add Vary: Origin header to prevent Cloudflare/CloudFront caching wrong preflight responses',
            'Automate cross-origin preflight smoke tests in pre-deployment validation scripts'
          ]
        },
        timeline: [
          { time: 'T-00:00:00', desc: 'CDN cache warming script executes against staging endpoint prior to release.', isFatal: false },
          { time: 'T-00:02:10', desc: 'Edge CDN caches OPTIONS response with Access-Control-Allow-Origin: staging.', isFatal: false },
          { time: 'T-00:05:00', desc: 'Production release goes live on bugmortem.vercel.app.', isFatal: false },
          { time: 'T-00:05:30', desc: '100% of browser OPTIONS preflight requests fail; client authentication asystole.', isFatal: true }
        ],
        fiveWhys: [
          { whyNumber: 1, question: 'Why could users not log in to the production app?', answer: 'The browser blocked all fetch requests with a CORS policy violation error.' },
          { whyNumber: 2, question: 'Why did the browser reject the preflight request?', answer: 'The Access-Control-Allow-Origin header returned https://staging.app instead of production.' },
          { whyNumber: 3, question: 'Why did production return staging CORS headers?', answer: 'The edge CDN served a cached OPTIONS response that had been primed by staging verification tests.' },
          { whyNumber: 4, question: 'Why did the CDN cache the OPTIONS response across origins?', answer: 'The API server was missing the Vary: Origin response header.' },
          { whyNumber: 5, question: 'Why was the origin hardcoded in configuration?', answer: 'A developer used a static string instead of an environment variable lookup.' }
        ]
      },
      's3-lambda-loop': {
        id: 's3-lambda-loop',
        name: 'Recursive S3 Event Trigger Loop & Lambda Explosion',
        category: 'AWS & Serverless Architecture',
        severity: 'P0',
        badge: 'AWS / SERVERLESS',
        service: 'media-thumbnail-pipeline',
        domain: 'cloud',
        status: 'INCINERATED',
        timestamp: '02:04:51 UTC',
        summary: 'A media worker written to process images saved output thumbnails directly into the monitored source bucket, initiating a runaway recursive cycle that triggered 4.8 million Lambdas and a $48,000 billing spike.',
        fatalEvent: 'Fatal Event: AWS Account concurrency ceiling (10,000) reached; Lambda invocation throttling engaged globally.',
        pathology: 'Destination bucket and source event trigger configured to identical S3 namespace',
        codeSnippet: `// Infinite self-invocation loop
export const handler = async (event) => {
  for (const record of event.Records) {
    const thumb = await resize(record.s3.object.key);
    // BUG: Writing thumbnail back into SAME bucket fires this Lambda again!
    await s3.putObject({ Bucket: record.s3.bucket.name, Key: 'thumb_' + record.s3.object.key, Body: thumb });
  }
};`,
        stackTrace: `Rate Exceeded: Rate of invocation of function arn:aws:lambda:us-east-1:123456789:function:thumbnail-gen 
exceeded account concurrency quota (10,000/10,000 concurrent executions).
CloudWatch Billing Alarm: Estimated monthly charge: $48,219.42 USD.`,
        coronerVerdict: 'A recursive serverless doom-loop was initiated when a thumbnail generator outputted its artifact back into the same S3 bucket configured as its ObjectCreated event source, spawning 4.8 million runaway Lambdas.',
        postMortem: {
          summary: 'Catastrophic recursive serverless invocation loop triggering account-wide concurrency exhaustion and a $48,000 billing spike within 38 minutes.',
          impact: 'AWS account concurrency throttled for all production serverless functions; massive financial hemorrhage.',
          rootCause: 'Writing output objects directly back into the input S3 bucket without prefix filtering or target separation.',
          actionItems: [
            'Strictly isolate input and output buckets into distinct physical S3 resources',
            'Enforce S3 Event Notification prefix filters (uploads/ vs thumbnails/)',
            'Configure AWS Lambda maximum concurrency limits and instantaneous billing kill-switches'
          ]
        },
        timeline: [
          { time: 'T-00:00:00', desc: 'User uploads profile photo avatar_72.png to media-storage bucket.', isFatal: false },
          { time: 'T-00:00:03', desc: 'Lambda resizes photo and writes thumb_avatar_72.png to same bucket.', isFatal: false },
          { time: 'T-00:00:08', desc: 'thumb_avatar_72.png creation triggers new Lambda execution (loop iteration 2).', isFatal: false },
          { time: 'T-00:04:12', desc: '10,000 concurrent Lambdas saturate account quota; all cloud operations flatline.', isFatal: true }
        ],
        fiveWhys: [
          { whyNumber: 1, question: 'Why did all serverless APIs stop responding globally?', answer: 'The AWS account hit its hard concurrency limit of 10,000 simultaneous Lambda executions.' },
          { whyNumber: 2, question: 'Why were 10,000 Lambdas executing simultaneously?', answer: 'A single image upload spawned an exponential recursive loop of executions.' },
          { whyNumber: 3, question: 'Why did the Lambda function trigger itself recursively?', answer: 'It saved its output thumbnail into the exact same S3 bucket that listened for new uploads.' },
          { whyNumber: 4, question: 'Why did the S3 event trigger not filter out thumbnail files?', answer: 'The S3 notification rule lacked a prefix filter (e.g., uploads/) and listened to all ObjectCreated events.' },
          { whyNumber: 5, question: 'Why were there no safety guardrails or circuit breakers?', answer: 'The Lambda function had no reserved concurrency limit or execution budget ceiling configured.' }
        ]
      },
      'serverless-timeout': {
        id: 'serverless-timeout',
        name: 'Downstream Cold Start Cascading Serverless Timeout',
        category: 'Serverless Edge & Relational DB',
        severity: 'P1',
        badge: 'EDGE / COLD START',
        service: 'realtime-notification-edge',
        domain: 'serverless',
        status: 'TIME EXPIRED',
        timestamp: '09:01:14 UTC',
        summary: 'Synchronous edge routes waiting on cold-started relational database connection pools exceeded the 30-second API Gateway ceiling, terminating user analytics queries with 504 Gateway Timeout.',
        fatalEvent: 'Fatal Event: API Gateway hard timeout (30,000 ms) breached during DB connection handshake.',
        pathology: 'Heavy synchronous analytics execution coupled with cold container startup',
        codeSnippet: `// 30s gateway timeout exceeded by cold relational query
export const handler = async (event) => {
  // Cold start initializes heavy ORM + establish SSL to remote DB: 14s
  const db = await initDatabaseConnection();
  // Complex analytics aggregation query: 18s
  const data = await db.query('SELECT * FROM complex_analytics_view');
  // Total execution: 32s -> Exceeds API Gateway 30s limit!
  return { statusCode: 200, body: JSON.stringify(data) };
};`,
        stackTrace: `504 Gateway Time-out
The server, while acting as a gateway or proxy, did not receive a timely response from the upstream server.
X-Amzn-Trace-Id: Root=1-654a9b2c-84f923e10293847291038472
Execution time: 30,002 ms exceeding function timeout of 30,000 ms.`,
        coronerVerdict: 'Synchronous API Gateway terminated connections with HTTP 504 after a cold-started Lambda worker took 14 seconds to establish database SSL handshakes and 18 seconds to execute heavy aggregations, breaching the 30s hard limit.',
        postMortem: {
          summary: 'Cascading HTTP 504 gateway timeouts caused by monolithic analytics queries executed synchronously inside cold-started serverless functions.',
          impact: 'Analytics dashboard unavailable for 35% of peak business users; upstream connection pool starvation.',
          rootCause: 'Coupling heavy, long-running analytical queries with synchronous request-response edge gateway routes.',
          actionItems: [
            'Convert heavy report generation to asynchronous architecture using SQS and WebSocket/polling push',
            'Enable Provisioned Concurrency on critical serverless endpoints to eliminate cold starts',
            'Deploy read-replicas with pre-aggregated materialised views for reporting queries'
          ]
        },
        timeline: [
          { time: 'T-00:00:00', desc: 'Batch of 50 enterprise users open morning executive metrics dashboard.', isFatal: false },
          { time: 'T-00:00:05', desc: 'Traffic spike forces AWS to spin up 25 new cold Lambda container instances.', isFatal: false },
          { time: 'T-00:00:20', desc: 'Cold DB connection handshakes take 14.2s per container, saturating DB CPU.', isFatal: false },
          { time: 'T-00:00:31', desc: 'API Gateway 30s hard limit reached; 504 Gateway Timeout flatline triggered.', isFatal: true }
        ],
        fiveWhys: [
          { whyNumber: 1, question: 'Why did users see 504 Gateway Timeout errors?', answer: 'The API Gateway closed the connection after waiting 30 seconds for the backend.' },
          { whyNumber: 2, question: 'Why did the backend take longer than 30 seconds to reply?', answer: 'The Lambda function cold start combined with the database query took 32 seconds.' },
          { whyNumber: 3, question: 'Why did the cold start take 14 seconds?', answer: 'The function loaded a monolithic ORM and opened a new SSL connection to a distant RDS instance.' },
          { whyNumber: 4, question: 'Why was a heavy analytical query executed synchronously in a web request?', answer: 'The endpoint was designed for MVP without an asynchronous job queue architecture.' },
          { whyNumber: 5, question: 'Why was there no caching or read-replica for this analytics query?', answer: 'The dashboard feature was shipped directly to production without load testing or database optimization.' }
        ]
      }
    }
  },
  codeSection: {
    title: 'AUTOPSY SPECIMEN // LETHAL CODE DIFF',
    subtitle: 'Side-by-side comparative inspection of pathological code and SRE curative patch',
    fatalLabel: 'PATHOLOGICAL DEFECT (CRITICAL)',
    curativeLabel: 'SRE REMEDIAL SPECIFICATION (CURED)',
    copyLabel: 'Copy Diff Payload',
    copiedLabel: 'Diff Copied to Clipboard',
  },
  stackTrace: {
    title: 'KERNEL & RUNTIME TERMINATION TELEMETRY',
  },
  timeline: {
    title: 'MORTEM CHRONOLOGY (STEP-BY-STEP REPLAY)',
  },
  replayer: {
    title: 'INCIDENT TIME-TRAVEL REPLAYER',
    subtitle: 'Interactive microsecond scrubber and forensic playback engine.',
    liveBadge: 'PLAYING',
    speedLabel: 'Playback Velocity',
    btnReset: 'Rewind to Epoch',
    btnPlay: 'Play Incident Playback',
    btnPause: 'Pause Stream',
    statusInitial: 'Normal Traffic (T-0)',
    statusDegrading: 'Cascading Saturation',
    statusTerminus: 'System Flatline (Terminus)',
    stepPrefix: 'Sequence Frame',
  },
  fiveWhys: {
    title: '5-WHYS ROOT CAUSE FORENSIC TREE',
    subtitle: 'Iterative causal interrogation drilling down to architectural root failure.',
    badgeLabel: 'SYSTEMIC CAUSAL GRAPH',
    cardWhyPrefix: 'WHY #',
    symptomLabel: 'SURFACE SYMPTOM',
    triggerLabel: 'PROXIMATE TRIGGER',
    mechanismLabel: 'INTERMEDIATE DEFECT',
    flawLabel: 'ARCHITECTURAL VULNERABILITY',
    rootCauseLabel: 'ROOT CAUSAL FLAW',
    interactiveHint: 'Click nodes to inspect blast radius, impacted subsystems, and remediation prescriptions.',
    mitigationTitle: 'Architectural Remediation Prescription',
    impactedSubsystems: 'Impacted Micro-Components',
    diagnosticConfidence: 'Forensic Confidence Index',
  },
  blastRadius: {
    title: 'SYSTEM BLAST RADIUS & TOPOLOGY IMPACT',
    subtitle: 'Visual interactive dependency graph tracking cascading failures across distributed microservices',
    severityLabel: 'Incident Blast Radius Tier',
    nodeHealth: 'Subsystem Health Status',
    upstreamImpact: 'Upstream Reverse-Dependency Cascades',
    downstreamImpact: 'Downstream Partition Failures',
    activeConnections: 'Degraded Sockets / Mesh Links',
    resilienceRating: 'Current Mesh Resilience Index',
  },
  chaos: {
    title: 'CHAOS ENGINEERING LAB & BLAST RADIUS SANDBOX',
    subtitle: 'Inject fault scenarios in an isolated sandbox to observe telemetry and trigger self-healing.',
    controlPanelTitle: 'FAULT INJECTION CONSOLE',
    scenarioLabel: 'Select Outage Simulation',
    scenarioHydration: 'React SSR Hydration Mismatch & DOM Explosion',
    scenarioPool: 'PostgreSQL Connection Starvation & Pool Exhaustion',
    scenarioOom: 'Memory Leak & Kernel OOM Reaper (137 Exit Code)',
    scenarioStorm: 'Exponential Retry Storm & Thundering Herd DDOS',
    scenarioCors: 'Strict Origin CORS Rejection on Production Preflight',
    scenarioS3Loop: 'Recursive S3 Event Trigger Loop & Lambda Explosion',
    scenarioServerless: 'Downstream Cold Start Cascading Serverless Timeout',
    btnInject: 'Inject Failure (Simulate Outage)',
    btnSelfHeal: 'Trigger Self-Healing & Circuit Breaker',
    healingActive: 'Applying Self-Healing Mitigation...',
    metricsTitle: 'LIVE SANDBOX TELEMETRY METRICS',
    metricLatency: 'P99 Latency',
    metricErrorRate: 'HTTP 5xx Error Rate',
    metricPoolSaturation: 'Pool / Thread Saturation',
    metricMemoryUsage: 'Heap Memory Allocation',
    statusNominal: 'Sandbox Health: Nominal',
    statusDegraded: 'Sandbox Health: Cascading Failures Active',
  },
  chaosSandbox: {
    title: 'CHAOS ENGINEERING BLAST RADIUS SANDBOX',
    subtitle: 'Simulate architectural fault injection and observe self-healing recovery',
    controlPanel: 'FAULT INJECTION CONTROL',
    injectBtn: 'Inject Failure',
    healBtn: 'Trigger Self-Healing',
    healingState: 'Applying Self-Healing Mitigations...',
    metricsTitle: 'SANDBOX TELEMETRY METRICS',
    p99Latency: 'P99 Latency',
    errorRate: '5xx Error Rate',
    poolSaturation: 'Pool Saturation',
    memoryUsage: 'Heap Memory',
  },
  prescription: {
    badge: 'SRE PRESCRIPTION (RX)',
    title: 'Apteczka SRE & Recepta IaC',
    diagnosisLabel: 'Diagnostic Pathology',
    readyToApply: 'Production-ready IaC & code patches',
    fileListTitle: 'Prescription Files',
    noFilesAvailable: 'No prescription manifests available for this incident.',
    selectFile: 'Select a file from the left sidebar to inspect the prescription.',
    copyCode: 'Copy Code',
    copied: 'Copied!',
    downloadAll: 'Download All Manifests',
    copyAll: 'Copy All to Clipboard',
    allCopied: 'All Files Copied!',
    close: 'Close Prescription Modal',
    testedWithEngines: 'Tested with Kubernetes 1.30, Terraform 1.9, Node 20 LTS, and Postgres 16',
    items: {
      'react-hydration': {
        title: 'Prescription for React Hydration Mismatch & DOM Tree Collapse',
        diagnosis: 'Server/Client HTML mismatch causing catastrophic layout de-synchronization and white-screen flatline.',
        files: [
          {
            filename: 'SafeClientOnly.tsx',
            language: 'typescript',
            description: 'Two-pass hydration boundary with fallback skeleton to completely eradicate client/server DOM divergence.',
            content: `import React, { useState, useEffect, ReactNode } from 'react';

interface SafeClientOnlyProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * SRE Prescription: SafeClientOnly Boundary
 * Guarantees that time-, locale-, or browser-dependent components
 * only render after client-side hydration has completed cleanly.
 */
export const SafeClientOnly: React.FC<SafeClientOnlyProps> = ({
  children,
  fallback = null
}) => {
  const [hasMounted, setHasMounted] = useState<boolean>(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};`
          },
          {
            filename: 'eslint.config.mjs',
            language: 'javascript',
            description: 'ESLint AST rule preventing non-deterministic variables (window, localStorage, Date.now()) during SSR rendering.',
            content: `// SRE Lint Rule: Ban Direct Global Browser Object Access during SSR Render
export default [
  {
    rules: {
      'no-restricted-globals': [
        'error',
        {
          name: 'window',
          message: 'Direct window access during render causes hydration collapse. Wrap in useEffect or SafeClientOnly boundary.'
        },
        {
          name: 'localStorage',
          message: 'localStorage is unavailable during server-side pre-rendering.'
        }
      ]
    }
  }
];`
          }
        ]
      },
      'connection-pool': {
        title: 'Prescription for PostgreSQL Connection Starvation & Pool Exhaustion',
        diagnosis: 'Leaked or unreleased database clients saturated max_connections, resulting in immediate 503 cascades.',
        files: [
          {
            filename: 'pgbouncer.ini',
            language: 'ini',
            description: 'Transaction-level pooling configuration with strict connection queuing and aggressive client timeouts.',
            content: `;; SRE Prescription: High-Density PgBouncer Configuration
[databases]
production_db = host=127.0.0.1 port=5432 dbname=prod_db auth_user=postgres

[pgbouncer]
listen_addr = 0.0.0.0
listen_port = 6432
auth_type = scram-sha-256
auth_file = /etc/pgbouncer/userlist.txt

;; Transaction pooling: server connection released immediately after query transaction finishes
pool_mode = transaction

max_client_conn = 5000
default_pool_size = 50
min_pool_size = 10
reserve_pool_size = 5
reserve_pool_timeout = 3

;; SRE Circuit Breaker Timeouts
query_timeout = 15
client_idle_timeout = 60
idle_transaction_timeout = 10`
          },
          {
            filename: 'db-resilient-client.ts',
            language: 'typescript',
            description: 'Automatic client release pattern using TypeScript Disposable pattern to prevent connection leakage.',
            content: `import { Pool, PoolClient } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 2000,
});

/**
 * Execute query with guaranteed automatic client release
 */
export async function withTransaction<T>(
  callback: (client: PoolClient) => Promise<T>
): Promise<T> {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    // SRE Guard: Connection is ALWAYS released back to pool
    client.release();
  }
}`
          }
        ]
      },
      'oom-reaper': {
        title: 'Prescription for Memory Leak & Linux Kernel OOM Killer Flatline',
        diagnosis: 'Unbounded heap allocation during large payload processing provoked Linux SIGKILL (Exit code 137).',
        files: [
          {
            filename: 'k8s-pod-cgroup-limits.yaml',
            language: 'yaml',
            description: 'Kubernetes Pod resource constraints with Node.js V8 heap ceiling aligned to container cgroups.',
            content: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: billing-export-service
  namespace: production
spec:
  replicas: 3
  template:
    spec:
      containers:
      - name: worker
        image: billing-worker:v2.4.1
        env:
        - name: NODE_OPTIONS
          # Max old space set to 75% of container RAM to leave buffer for V8 native bindings & OS
          value: "--max-old-space-size=1536"
        resources:
          requests:
            memory: "1Gi"
            cpu: "500m"
          limits:
            memory: "2Gi"
            cpu: "2000m"`
          },
          {
            filename: 'stream-export-processor.ts',
            language: 'typescript',
            description: 'Refactoring from array in-memory accumulation to backpressure-aware Node.js Streams pipeline.',
            content: `import { createReadStream, createWriteStream } from 'fs';
import { Transform, pipeline } from 'stream';
import { promisify } from 'util';

const streamPipeline = promisify(pipeline);

/**
 * SRE Memory Guard: Stream-based chunk processing with constant O(1) memory footprint.
 */
export async function processExportSafely(sourcePath: string, destPath: string) {
  const csvTransformer = new Transform({
    objectMode: true,
    transform(chunk, encoding, callback) {
      const transformed = chunk.toString().toUpperCase();
      callback(null, transformed);
    }
  });

  await streamPipeline(
    createReadStream(sourcePath),
    csvTransformer,
    createWriteStream(destPath)
  );
}`
          }
        ]
      },
      'retry-storm': {
        title: 'Prescription for Exponential Retry Storm & Thundering Herd DDOS',
        diagnosis: 'Linear un-jittered retries during micro-downtime amplified incoming request volume by 1800%, collapsing edge gateways.',
        files: [
          {
            filename: 'resilient-fetch.ts',
            language: 'typescript',
            description: 'Full decorrelated jitter backoff algorithm with circuit breaker integration.',
            content: `interface RetryConfig {
  retries: number;
  baseDelayMs: number;
  maxDelayMs: number;
}

/**
 * Decorrelated Jitter Algorithm (Full Jitter SRE Standard)
 * Prevents synchronous resonant retry waves against upstream dependencies.
 */
export async function fetchWithFullJitter(
  url: string,
  config: RetryConfig = { retries: 3, baseDelayMs: 200, maxDelayMs: 5000 }
): Promise<Response> {
  let attempt = 0;

  while (attempt <= config.retries) {
    try {
      const res = await fetch(url);
      if (res.ok) return res;
      if (res.status < 500 && res.status !== 429) {
        return res; // Client errors are not retried
      }
    } catch (err) {
      if (attempt === config.retries) throw err;
    }

    attempt++;
    // Full Jitter Formula: sleep = min(maxDelay, random_between(0, baseDelay * 2^attempt))
    const calculatedBackoff = Math.min(
      config.maxDelayMs,
      config.baseDelayMs * Math.pow(2, attempt)
    );
    const jitteredSleep = Math.random() * calculatedBackoff;

    await new Promise((r) => setTimeout(r, jitteredSleep));
  }

  throw new Error(\`Failed to fetch from \${url} after \${config.retries} attempts.\`);
}`
          },
          {
            filename: 'envoy-circuit-breaker.yaml',
            language: 'yaml',
            description: 'Envoy / Istio circuit breaker configuration cutting off cascading retries when upstream degrades.',
            content: `apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
  name: upstream-gateway-circuit-breaker
spec:
  host: payment-gateway.prod.svc.cluster.local
  trafficPolicy:
    connectionPool:
      tcp:
        maxConnections: 100
      http:
        http1MaxPendingRequests: 10
        maxRequestsPerConnection: 10
    outlierDetection:
      consecutive5xxErrors: 3
      interval: 10s
      baseEjectionTime: 30s
      maxEjectionPercent: 50`
          }
        ]
      },
      'cors-nightmare': {
        title: 'Prescription for Strict Origin CORS Preflight & Cache Rejection',
        diagnosis: 'Edge CDN dropped Access-Control headers on cached preflight OPTIONS, severing browser SPA requests.',
        files: [
          {
            filename: 'cors-middleware.ts',
            language: 'typescript',
            description: 'Explicit origin whitelist verification with proper OPTIONS caching headers.',
            content: `import { Request, Response, NextFunction } from 'express';

const ALLOWED_ORIGINS = new Set([
  'https://bugmortem.vercel.app',
  'https://app.bugmortem.io',
  'http://localhost:3000'
]);

export function strictCorsSecurity(req: Request, res: Response, next: NextFunction) {
  const origin = req.headers.origin;

  if (origin && ALLOWED_ORIGINS.has(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization,X-Incident-Ref');
    res.setHeader('Access-Control-Max-Age', '86400'); // Cache preflight for 24 hours
    res.setHeader('Vary', 'Origin');
  }

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  next();
}`
          },
          {
            filename: 'cloudflare-worker-cors.js',
            language: 'javascript',
            description: 'Edge Worker ensuring preflight responses never get clobbered by downstream caching rules.',
            content: `export default {
  async fetch(request) {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": request.headers.get("Origin") || "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          "Access-Control-Max-Age": "86400",
          "Vary": "Origin"
        }
      });
    }
    return fetch(request);
  }
};`
          }
        ]
      },
      's3-lambda-loop': {
        title: 'Prescription for Recursive S3 Lambda Self-Triggering Storm',
        diagnosis: 'Lambda function saved output artifacts into the same bucket/prefix configured as its input trigger.',
        files: [
          {
            filename: 'lambda-isolated-handler.ts',
            language: 'typescript',
            description: 'Architectural separation: writes to dedicated secondary output bucket with guard prefix validation.',
            content: `import { S3Event } from 'aws-lambda';
import { S3 } from '@aws-sdk/client-s3';

const s3 = new S3({});
const OUTPUT_BUCKET = process.env.OUTPUT_BUCKET_NAME!;
const INPUT_PREFIX = 'uploads/';

export const handler = async (event: S3Event): Promise<void> => {
  for (const record of event.Records) {
    const srcKey = record.s3.object.key;
    const srcBucket = record.s3.bucket.name;

    // Guard: only process objects under the uploads/ prefix
    if (!srcKey.startsWith(INPUT_PREFIX)) {
      console.info('[SRE GUARD: skipping \${srcKey} — outside uploads/ prefix]');
      continue;
    }

    const thumbnail = await resizeImage(srcKey, srcBucket);

    // Write to ISOLATED output bucket — cannot trigger this Lambda again
    await s3.putObject({
      Bucket: OUTPUT_BUCKET,
      Key: \`thumbs/\${srcKey.replace(INPUT_PREFIX, '')}\`,
      Body: thumbnail,
      ContentType: 'image/webp'
    });
  }
};

async function resizeImage(k: string, b: string): Promise<Buffer> {
  return Buffer.from('mock');
}`
          },
          {
            filename: 'cloudformation-isolated-buckets.yaml',
            language: 'yaml',
            description: 'CloudFormation stack enforcing strict dual-bucket topology at the IaC permission layer.',
            content: `AWSTemplateFormatVersion: '2010-09-09'
Description: SRE Prescribed Isolated Storage Architecture

Resources:
  InputUploadBucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: !Sub '\${AWS::AccountId}-media-uploads-input'

  OutputThumbnailsBucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: !Sub '\${AWS::AccountId}-media-thumbnails-output'

  MediaResizeFunction:
    Type: AWS::Serverless::Function
    Properties:
      Handler: index.handler
      Runtime: nodejs20.x
      Environment:
        Variables:
          OUTPUT_BUCKET_NAME: !Ref OutputThumbnailsBucket
      Events:
        UploadEvent:
          Type: S3
          Properties:
            Bucket: !Ref InputUploadBucket
            Events: s3:ObjectCreated:*
            Filter:
              S3Key:
                Rules:
                  - Name: prefix
                    Value: uploads/`
          }
        ]
      },
      'serverless-timeout': {
        title: 'Prescription for Downstream Cold Start & Cascading Serverless Timeout',
        diagnosis: 'Synchronous API gateway waited on cold-started relational database, exhausting 30-second execution limits.',
        files: [
          {
            filename: 'async-task-sqs-pattern.ts',
            language: 'typescript',
            description: 'Asynchronous decoupling: HTTP 202 Accepted with polling job status via SQS queue.',
            content: `import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';
import { Request, Response } from 'express';

const sqs = new SQSClient({});
const QUEUE_URL = process.env.BACKGROUND_JOBS_QUEUE_URL!;

/**
 * SRE Non-Blocking Ingestion Endpoint:
 * Responds in < 40ms with 202 Accepted and offloads work to asynchronous workers.
 */
export async function submitHeavyAnalysisJob(req: Request, res: Response) {
  const jobId = crypto.randomUUID();
  const payload = req.body;

  await sqs.send(new SendMessageCommand({
    QueueUrl: QUEUE_URL,
    MessageBody: JSON.stringify({ jobId, payload }),
    MessageDeduplicationId: jobId,
    MessageGroupId: 'heavy-analysis'
  }));

  return res.status(202).json({
    status: 'QUEUED',
    jobId,
    pollUrl: \`/api/jobs/\${jobId}/status\`,
    message: 'Work item queued safely. Upstream gateway timeout completely bypassed.'
  });
}`
          },
          {
            filename: 'lambda-provisioned-concurrency.tf',
            language: 'hcl',
            description: 'Terraform configuration keeping warm pool instances alive to eliminate cold starts.',
            content: `# SRE Terraform: Eliminate Cold Starts with Provisioned Concurrency
resource "aws_lambda_provisioned_concurrency_config" "billing_hot_standby" {
  function_name                     = aws_lambda_function.billing_report_generator.function_name
  provisioned_concurrent_executions = 5
  qualifier                         = aws_lambda_alias.live.name
}

resource "aws_lambda_alias" "live" {
  name             = "live"
  description      = "Active production alias"
  function_name    = aws_lambda_function.billing_report_generator.function_name
  function_version = aws_lambda_function.billing_report_generator.version
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
    copyBtn: 'Copy Payload',
    copiedBtn: 'Copied to Clipboard!',
    sendSlackBtn: 'Dispatch to Slack Webhook',
    dispatchSuccess: 'Incident successfully dispatched to channel',
    slackHeader: 'PRODUCTION INCIDENT ESCALATION',
    fieldIncidentId: 'Incident Ref',
    fieldService: 'Impacted Service',
    fieldStatus: 'Status',
    fieldSeverity: 'Severity',
    fieldWarRoom: 'War Room Bridge',
    slackJoinWarRoom: 'Join War Room Live',
    slackActionRequired: 'Immediate SRE triage required',
    fieldChecklist: 'Remedial Checklist',
    githubLabels: 'Labels: incident, bugmortem, p0-outage',
    closeBtn: 'Close Dispatcher',
    tabSlack: 'Slack / Discord',
    tabPagerDuty: 'PagerDuty (Events API)',
    tabGithub: 'GitHub Issue',
    pdRoutingKeyNotice: 'Replace SERVICE_INTEGRATION_KEY with your real PagerDuty service key.',
    openGithubBtn: 'Open GitHub Issue',
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
    termsTitle: 'Terms of Incident Simulation & Disclaimer',
    badge: 'LEGAL & SRE COMPLIANCE',
    lastUpdated: 'Last Updated: November 2026',
    closeBtn: 'Close Legal Console',
    tabPrivacy: 'Privacy & Telemetry',
    tabTerms: 'Terms of Use & Disclaimer',
    privacySection1Title: 'Client-Side Telemetry & Data Sovereignty',
    privacySection1Text: 'BugMortem operates exclusively on client-side state. We do not store, ingest, or transmit proprietary production source code, stack traces, or internal database schemas to third-party tracking servers. Synthesized audio frequencies and PDF document generation take place entirely inside your browser memory context.',
    privacySection2Title: 'Third-Party Dispatchers (Slack / PagerDuty / GitHub)',
    privacySection2Text: 'Outbound dispatch templates generated via the Incident Dispatcher create formatted client payloads intended for manual execution or user-initiated browser popups. No automated API credentials are saved in persistent remote databases without explicit operator authorization.',
    termsSection1Title: 'Simulation Disclaimer & Production Safety',
    termsSection1Text: 'BugMortem provides simulated incident diagnostics, chaos engineering sandbox telemetry, and SRE architectural remediation templates. While prescriptions are developed based on battle-tested SRE industry standards, operators must validate all IaC manifests and Kubernetes configs in staging environments prior to production rollout.',
    termsSection2Title: 'Hackathon Submission Licensing',
    termsSection2Text: 'Built for the Devpost KIROWEEN 2026 Hackathon under the Spooky & Distinctive Developer Tools category. Distributed under the permissive open-source Apache 2.0 license.',
  },
  cookies: {
    bannerTitle: 'SRE TELEMETRY & PRIVACY PREFERENCES',
    bannerText: 'BugMortem uses localized client cookies and session storage strictly for maintaining incident forensics state, user locale, and audio synthesizer preferences. Zero third-party ad tracking scripts.',
    acceptAll: 'Acknowledge & Accept Telemetry',
    essentialOnly: 'Essential Forensics Only',
    customize: 'Configure Preferences',
  },
  footer: {
    copyright: '© 2026 BugMortem. Developed by Adam Gierczak (@AdamBabinicz) for KIROWEEN 2026.',
    disclaimer: 'All production crashes depicted are based on actual canonical distributed system post-mortems.',
    statusAllOperational: 'All Diagnostic Systems Operational',
  },
};
