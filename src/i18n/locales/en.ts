import type { TranslationDictionary } from '../types';

export const en: TranslationDictionary = {
 "common": {
  "loading": "Loading diagnostic telemetry...",
  "error": "Fatal forensic error encountered",
  "close": "Close"
 },
 "hero": {
  "badge": "KIROWEEN 2026 HACKATHON EDITION",
  "title": "BugMortem",
  "subtitle": "Production Incident Forensic Studio & Digital Morgue",
  "tagline": "When production flatlines at 3 AM, we perform the autopsy.",
  "ctaAutopsy": "Begin Forensic Autopsy",
  "ctaReplay": "Replay Incident Chronology",
  "inputCta": "+ REPORT YOUR OWN INCIDENT",
  "statusActive": "Active Incident (P0 Critical)",
  "statusStable": "System Nominal (200 OK)"
 },
 "navigation": {
  "brand": "BugMortem",
  "morgue": "Digital Morgue",
  "sandbox": "Chaos Sandbox",
  "docs": "Forensic Protocol",
  "langPl": "Polski (PL)",
  "langEn": "English (EN)",
  "toggleTheme": "Toggle Theme"
 },
 "presets": {
  "title": "CANONICAL PRODUCTION AUTOPSY ARCHIVES",
  "subtitle": "7 real-world architectural failures cataloged for forensic investigation",
  "badge": "SPECIMEN",
  "items": {
   "react-hydration": {
    "id": "react-hydration",
    "name": "React 19 SSR Hydration Mismatch",
    "category": "Frontend & SSR Architecture",
    "severity": "P0",
    "badge": "REACT 19 / SSR",
    "service": "storefront-edge-ssr",
    "domain": "frontend",
    "status": "ASPHYXIATED",
    "timestamp": "03:14:22 UTC",
    "summary": "Non-deterministic server/client HTML divergence caused immediate client-side DOM root collapse, blinding 100% of e-commerce checkout traffic during peak load.",
    "fatalEvent": "Fatal Event: Asystole flatline detected across telemetry monitors.",
    "pathology": "Unsynchronized temporal state rendering in root SSR tree",
    "codeSnippet": "// Server: renderToString with timestamp\nconst html = renderToString(\n  <Clock now={new Date()} />\n);\n\n// Client: hydrateRoot executes 120ms later\nhydrateRoot(\n  document.getElementById('root'),\n  <Clock now={new Date()} /> // MISMATCH!\n);",
    "stackTrace": "Error: Hydration failed because the initial UI does not match what was rendered on the server.\n    at throwOnHydrationMismatch (react-dom-client.development.js:12480:11)\n    at tryToClaimNextHydratableInstance (react-dom-client.development.js:12602:9)\n    at updateHostComponent$1 (react-dom-client.development.js:14562:17)\n    at beginWork (react-dom-client.development.js:18942:14)",
    "coronerVerdict": "The client-side DOM violently disintegrated during hydration due to non-deterministic temporal rendering. Server and client drifted by 124 milliseconds, causing React 19 to discard the root hierarchy and trigger unrecoverable blank-screen death.",
    "postMortem": {
     "summary": "High-severity client-side hydration collapse triggered by un-synchronized Date objects rendered during SSR, completely blinding 100% of incoming checkout traffic.",
     "impact": "100% bounce rate on storefront checkout route for 18 minutes; estimated revenue disruption of $142,000.",
     "rootCause": "Direct invocation of new Date() inside the SSR component tree without a two-pass hydration boundary or client-only mounting guard.",
     "actionItems": [
      "Introduce SafeClientOnly mounting boundary for temporal components",
      "Enforce ESLint AST rule banning window/localStorage/Date directly in SSR render tree",
      "Add automated Playwright visual regression assertions against hydration console warnings"
     ]
    },
    "timeline": [
     {
      "time": "T-00:00:00",
      "desc": "Canary rollout of SSR Storefront v3.12.0 reaches 10% traffic.",
      "isFatal": false,
      "label": "HTML generated on the server"
     },
     {
      "time": "T-00:01:15",
      "desc": "Initial client telemetry records benign 12ms DOM variance warnings.",
      "isFatal": false,
      "label": "Bundle hydration in the browser"
     },
     {
      "time": "T-00:02:40",
      "desc": "Traffic shifted to 100%. Client hydration mismatch errors spike to 45,000/min.",
      "isFatal": false,
      "label": "DOM tree unmount"
     },
     {
      "time": "T-00:04:12",
      "desc": "React 19 root container unmounts upon layout divergence; white-screen asystole.",
      "isFatal": true
     }
    ],
    "fiveWhys": [
     "Why did the storefront render a blank white screen? React 19 discarded the entire DOM tree and crashed client-side execution.",
     "Why did React discard the DOM hierarchy? A fatal hydration mismatch error was thrown during root node reconciliation.",
     "Why was there a mismatch between server and client? The server rendered a timestamp using UTC while the client hydrated in local browser timezone.",
     "Why was time rendered directly in the shared SSR tree? The developer assumed renderToString and hydrateRoot execute simultaneously.",
     "Why was this not detected in CI/CD pipeline? End-to-end synthetic tests executed with JavaScript disabled, masking client-side hydration crashes."
    ],
    "title": "React 19 SSR Hydration Mismatch",
    "description": "Non-deterministic server/client HTML divergence caused immediate client-side DOM root collapse, blinding 100% of e-commerce checkout traffic during peak load.",
    "revivedCode": "// ✅ RESURRECTED SRE CODE: Two-phase hydration with a mounted flag\n'use client';\nimport { useState, useEffect } from 'react';\n\nexport default function ClockBanner() {\n  const [mounted, setMounted] = useState(false);\n  const [time, setTime] = useState<string>('');\n\n  useEffect(() => {\n    setMounted(true);\n    setTime(new Date().toLocaleTimeString());\n    const interval = setInterval(() => {\n      setTime(new Date().toLocaleTimeString());\n    }, 1000);\n    return () => clearInterval(interval);\n  }, []);\n\n  if (!mounted) {\n    return <div className=\"banner skeleton\">Syncing...</div>;\n  }\n\n  return <div className=\"banner\">Last sync: {time}</div>;\n}",
    "replayerSteps": [
     {
      "step": 1,
      "timeOffset": "+0.0s",
      "title": "SSR document generated at the edge",
      "description": "The edge server evaluates new Date() and streams HTML stamped 14:02:11.",
      "telemetry": {
       "latencyMs": 42,
       "errorRate": "0.00%",
       "rps": "14.2k"
      },
      "severity": "P1"
     },
     {
      "step": 2,
      "timeOffset": "+0.8s",
      "title": "Client hydration bind attempt",
      "description": "The browser bundle executes at 14:02:12. Its checksum differs from the server's.",
      "telemetry": {
       "latencyMs": 380,
       "errorRate": "8.4%",
       "rps": "11.8k"
      },
      "severity": "P1"
     },
     {
      "step": 3,
      "timeOffset": "+1.2s",
      "title": "DOM desynchronization and UI crash",
      "description": "React error #418 unmounts the interactive tree. Cart buttons stop responding.",
      "telemetry": {
       "latencyMs": 1420,
       "errorRate": "84.6%",
       "rps": "2.1k"
      },
      "severity": "P0"
     }
    ],
    "blastRadius": {
     "nodes": [
      {
       "id": "client-spa",
       "name": "client-spa",
       "role": "Next.js Frontend",
       "status": "epicenter",
       "statusCode": "FAIL"
      },
      {
       "id": "edge-gateway",
       "name": "edge-gateway",
       "role": "Vercel Edge Network",
       "status": "degraded",
       "statusCode": "WARN"
      },
      {
       "id": "auth-service",
       "name": "auth-service",
       "role": "JWT / Auth Sessions",
       "status": "healthy",
       "statusCode": "200 OK"
      },
      {
       "id": "database",
       "name": "database",
       "role": "Neon Postgres",
       "status": "healthy",
       "statusCode": "200 OK"
      },
      {
       "id": "worker-pool",
       "name": "worker-pool",
       "role": "Background Queue",
       "status": "healthy",
       "statusCode": "200 OK"
      }
     ],
     "summary": {
      "epicenterCount": 1,
      "degradedCount": 1,
      "healthyCount": 3
     }
    },
    "chaosMetrics": [
     {
      "id": "cm-1",
      "name": "DOM Tree Integrity",
      "severity": "P0",
      "description": "Mismatch detected between SSR and CSR nodes",
      "status": "injecting"
     },
     {
      "id": "cm-2",
      "name": "Time to Interactivity (TTI)",
      "severity": "P1",
      "description": "Event listeners suspended after the error",
      "status": "injecting"
     },
     {
      "id": "cm-3",
      "name": "Checkout Conversion",
      "severity": "P0",
      "description": "Order button frozen for 12% of users",
      "status": "injecting"
     }
    ]
   },
   "connection-pool": {
    "id": "connection-pool",
    "name": "PostgreSQL Connection Starvation & Pool Exhaustion",
    "category": "Database & Infrastructure",
    "severity": "P0",
    "badge": "POSTGRES / INFRA",
    "service": "auth-billing-cluster",
    "domain": "database",
    "status": "CARDIAC ARREST",
    "timestamp": "19:42:01 UTC",
    "summary": "Unhandled payment gateway timeouts leaked database connection handles during error rollback, saturating max_connections and deadlocking all transactional services globally.",
    "fatalEvent": "Fatal Event: Pool exhaustion caused cascading connection refusal (503 Service Unavailable).",
    "pathology": "Missing client.release() invocation inside catch block exception branches",
    "codeSnippet": "// Missing client.release() in error catch block\nasync function checkout(order) {\n  const client = await pool.connect();\n  try {\n    await client.query('BEGIN');\n    await processOrder(client, order);\n    await client.query('COMMIT');\n  } catch (err) {\n    // BUG: Connection never released back to pool on failure!\n    throw err;\n  }\n}",
    "stackTrace": "error: remaining connection slots are reserved for non-replication superuser connections\n    at Parser.parseErrorMessage (pg-protocol/dist/parser.js:287:98)\n    at Connection.handlePacket (pg/lib/connection.js:128:19)\n    at Socket.emit (node:events:517:28)",
    "coronerVerdict": "PostgreSQL max_connections ceiling of 500 was breached after an unhandled payment gateway error leaked connection handles. Starved workers deadlocked in connection-acquisition queues, terminating all database transactions globally.",
    "postMortem": {
     "summary": "Global database asystole caused by unreleased pooled connections during upstream payment failure cascades, freezing billing and authentication clusters.",
     "impact": "24 minutes of complete inability to authenticate users or record transactions; 4,200 requests aborted with HTTP 503.",
     "rootCause": "Failure to employ try-finally blocks or automatic resource disposers around pool.connect() handles.",
     "actionItems": [
      "Deploy PgBouncer in transaction-pooling mode to multiplex 5,000 clients over 100 backend slots",
      "Refactor all database access code to use withTransaction() disposable wrappers",
      "Configure Prometheus alert for PgPool saturation exceeding 85% for > 60 seconds"
     ]
    },
    "timeline": [
     {
      "time": "T-00:00:00",
      "desc": "Upstream payment processor experiences 3-second transient network degradation.",
      "isFatal": false,
      "label": "Heavy query flood"
     },
     {
      "time": "T-00:00:45",
      "desc": "Unhandled exceptions leak 40 database clients per second during rollback failures.",
      "isFatal": false,
      "label": "Database pool saturation"
     },
     {
      "time": "T-00:01:50",
      "desc": "PostgreSQL connection pool utilization hits 495/500 allocated slots.",
      "isFatal": false,
      "label": "Cart error cascade"
     },
     {
      "time": "T-00:03:00",
      "desc": "Pool exhausted: FATAL: remaining connection slots are reserved for superusers.",
      "isFatal": true
     }
    ],
    "fiveWhys": [
     "Why did the API return HTTP 503 across all routes? Microservices could not establish database connections to verify user sessions.",
     "Why were no database connections available? The PostgreSQL server rejected new connections with max_connections ceiling breach.",
     "Why were 500 connections open with zero CPU utilization? Leaked client sockets remained in idle-in-transaction state indefinitely.",
     "Why were sockets not closed upon transaction errors? The catch block threw an exception before calling client.release().",
     "Why was connection pooling left unmanaged at the application layer? Architectural debt: the service connected directly to raw RDS instead of PgBouncer proxy."
    ],
    "title": "PostgreSQL Connection Starvation & Pool Exhaustion",
    "description": "Unhandled payment gateway timeouts leaked database connection handles during error rollback, saturating max_connections and deadlocking all transactional services globally.",
    "revivedCode": "// ✅ RESURRECTED SRE CODE: Connection with context manager and hard timeout\nexport async function getAnalyticsReport(userId: string) {\n  const client = await pool.connect();\n  try {\n    // Setting a strict query execution time limit\n    await client.query('SET statement_timeout = 2000');\n    const query = 'SELECT id, total, status FROM orders WHERE user_id = $1 ORDER BY timestamp DESC LIMIT 50';\n    const result = await client.query(query, [userId]);\n    return result.rows;\n  } finally {\n    // Guaranteed connection return to the pool in the finally block\n    client.release();\n  }\n}",
    "replayerSteps": [
     {
      "step": 1,
      "timeOffset": "+0.0s",
      "title": "Batch report kicked off",
      "description": "A nightly analytics job fires 80 parallel full-table-scan queries.",
      "telemetry": {
       "latencyMs": 84,
       "errorRate": "0.00%",
       "rps": "16.5k"
      },
      "severity": "P1"
     },
     {
      "step": 2,
      "timeOffset": "+12.0s",
      "title": "Connection limit reached",
      "description": "max_connections (200/200) exhausted. Health-check probes hang.",
      "telemetry": {
       "latencyMs": 2450,
       "errorRate": "34.2%",
       "rps": "7.1k"
      },
      "severity": "P1"
     },
     {
      "step": 3,
      "timeOffset": "+29.0s",
      "title": "Database cascade collapse",
      "description": "Automatic failover to the replica fails. Microservices throw FATAL connection slot errors.",
      "telemetry": {
       "latencyMs": 12800,
       "errorRate": "98.4%",
       "rps": "820"
      },
      "severity": "P0"
     }
    ],
    "blastRadius": {
     "nodes": [
      {
       "id": "client-spa",
       "name": "client-spa",
       "role": "Web Client",
       "status": "degraded",
       "statusCode": "WARN"
      },
      {
       "id": "edge-gateway",
       "name": "edge-gateway",
       "role": "Kong Gateway",
       "status": "degraded",
       "statusCode": "503"
      },
      {
       "id": "auth-service",
       "name": "auth-service",
       "role": "Login Cluster",
       "status": "degraded",
       "statusCode": "FAIL"
      },
      {
       "id": "database",
       "name": "database",
       "role": "Aurora Postgres Primary",
       "status": "epicenter",
       "statusCode": "FATAL"
      },
      {
       "id": "worker-pool",
       "name": "worker-pool",
       "role": "Celery Queue",
       "status": "degraded",
       "statusCode": "FAIL"
      }
     ],
     "summary": {
      "epicenterCount": 1,
      "degradedCount": 4,
      "healthyCount": 0
     }
    },
    "chaosMetrics": [
     {
      "id": "cm-db-1",
      "name": "Aurora Active Connections",
      "severity": "P0",
      "description": "Pool utilization reached 100% capacity",
      "status": "injecting"
     },
     {
      "id": "cm-db-2",
      "name": "Aborted Transaction Rate",
      "severity": "P0",
      "description": "Over 85% of orders cancelled due to the database error",
      "status": "injecting"
     }
    ]
   },
   "oom-reaper": {
    "id": "oom-reaper",
    "name": "Memory Leak & Linux Kernel OOM Killer Flatline",
    "category": "Kubernetes & Runtime Memory",
    "severity": "P0",
    "badge": "NODE.JS / K8S",
    "service": "export-report-worker",
    "domain": "compute",
    "status": "TERMINATED (SIGKILL)",
    "timestamp": "14:02:19 UTC",
    "summary": "Synchronous in-memory buffering of 1.4 million audit rows bloated heap allocations past container cgroup memory constraints, triggering instant Linux kernel termination with exit code 137.",
    "fatalEvent": "Fatal Event: Kernel OOM reaper dispatched SIGKILL to process 41829.",
    "pathology": "Unbounded heap allocation accumulating large dataset in single JavaScript array",
    "codeSnippet": "// Unbounded in-memory accumulation of 1.4M rows\nconst exportData = [];\ndbStream.on('data', (chunk) => {\n  exportData.push(chunk); // Heap allocation explodes to 4.2GB\n});",
    "stackTrace": "[14029.182049] Out of memory: Killed process 41829 (node) total-vm:4829104kB, anon-rss:2084920kB, file-rss:0kB\n[14029.182100] oom_reaper: reaped process 41829 (node), now anon-rss:0kB\nKilled (SIGKILL, exit code 137)",
    "coronerVerdict": "Linux kernel OOM Reaper executed process 41829 via SIGKILL after heap allocations violently breached container cgroup hard limit of 2048MB during full-table CSV exports.",
    "postMortem": {
     "summary": "Sudden termination of report generation workers due to unbuffered batch loading into memory stateroom, triggering SIGKILL 137.",
     "impact": "Corrupted financial exports for enterprise tier customers; continuous Pod crash-loop backoff for 42 minutes.",
     "rootCause": "Buffering millions of historical ledger records in RAM arrays instead of streaming directly to S3 with backpressure.",
     "actionItems": [
      "Enforce Node.js Streams with stream.pipeline and CSV transform streams",
      "Set NODE_OPTIONS=\"--max-old-space-size=1536\" inside 2GiB Kubernetes cgroup limits",
      "Implement max row query limits on synchronous report generation endpoints"
     ]
    },
    "timeline": [
     {
      "time": "T-00:00:00",
      "desc": "Enterprise client requests 5-year full ledger audit CSV export.",
      "isFatal": false,
      "label": "Export job submitted"
     },
     {
      "time": "T-00:01:20",
      "desc": "Heap memory usage climbs steadily from 320MB to 1.8GB.",
      "isFatal": false,
      "label": "Heap memory exhaustion"
     },
     {
      "time": "T-00:02:45",
      "desc": "V8 garbage collector locks event loop for 1,400ms in desperate scavenge cycle.",
      "isFatal": false,
      "label": "SIGKILL from the kernel"
     },
     {
      "time": "T-00:03:10",
      "desc": "Container cgroup hard limit (2048MB) breached; kernel sends SIGKILL 137.",
      "isFatal": true
     }
    ],
    "fiveWhys": [
     "Why did the background worker Pod restart continuously? Kubernetes detected exit code 137 and put the container in CrashLoopBackOff.",
     "Why did the container exit with code 137? The Linux kernel sent SIGKILL because the container exceeded its cgroup memory limit.",
     "Why did the Node.js process consume over 2GB of RAM? It loaded 1.4 million database records into a single in-memory JavaScript array.",
     "Why was data accumulated in memory instead of streamed? The export endpoint was implemented using Array.map() rather than Node.js stream.pipeline.",
     "Why were memory limits configured without a swap/headroom buffer? The V8 heap size limit (--max-old-space-size) was set higher than the Kubernetes pod limit."
    ],
    "title": "Memory Leak & Linux Kernel OOM Killer Flatline",
    "description": "Synchronous in-memory buffering of 1.4 million audit rows bloated heap allocations past container cgroup memory constraints, triggering instant Linux kernel termination with exit code 137.",
    "revivedCode": "// ✅ RESURRECTED SRE CODE: Streaming pipeline with backpressure\nimport { pipeline } from 'stream/promises';\nimport { Transform } from 'stream';\n\nexport async function exportAllOrders(writeStream: NodeJS.WritableStream) {\n  const dbCursor = db.orders.findManyCursor();\n  \n  const toCsvRow = new Transform({\n    objectMode: true,\n    transform(order, _, callback) {\n      callback(null, `${order.id},${order.total},${order.createdAt}\\n`);\n    }\n  });\n\n  await pipeline(dbCursor, toCsvRow, writeStream);\n}",
    "replayerSteps": [
     {
      "step": 1,
      "timeOffset": "+0.0s",
      "title": "Ledger download requested",
      "description": "An administrator requests the full CSV file of transactions.",
      "telemetry": {
       "latencyMs": 65,
       "errorRate": "0.00%",
       "rps": "15.1k"
      },
      "severity": "P1"
     },
     {
      "step": 2,
      "timeOffset": "+8.4s",
      "title": "Approaching the RAM ceiling",
      "description": "The V8 heap exceeds 1.8 GB. The process stalls due to garbage collection pauses.",
      "telemetry": {
       "latencyMs": 1820,
       "errorRate": "18.9%",
       "rps": "8.4k"
      },
      "severity": "P1"
     },
     {
      "step": 3,
      "timeOffset": "+16.2s",
      "title": "SIGKILL 137 process kill",
      "description": "The Linux OOM killer terminates the container. The pod enters a CrashLoopBackOff loop.",
      "telemetry": {
       "latencyMs": 6400,
       "errorRate": "62.1%",
       "rps": "2.4k"
      },
      "severity": "P0"
     }
    ],
    "blastRadius": {
     "nodes": [
      {
       "id": "client-spa",
       "name": "client-spa",
       "role": "Admin Panel",
       "status": "degraded",
       "statusCode": "WARN"
      },
      {
       "id": "edge-gateway",
       "name": "edge-gateway",
       "role": "API Gateway",
       "status": "healthy",
       "statusCode": "200 OK"
      },
      {
       "id": "auth-service",
       "name": "auth-service",
       "role": "Login Service",
       "status": "healthy",
       "statusCode": "200 OK"
      },
      {
       "id": "database",
       "name": "database",
       "role": "Database",
       "status": "healthy",
       "statusCode": "200 OK"
      },
      {
       "id": "worker-pool",
       "name": "worker-pool",
       "role": "Async Job Node",
       "status": "epicenter",
       "statusCode": "CRASH"
      }
     ],
     "summary": {
      "epicenterCount": 1,
      "degradedCount": 1,
      "healthyCount": 3
     }
    },
    "chaosMetrics": [
     {
      "id": "cm-oom-1",
      "name": "Node Heap Usage (MB)",
      "severity": "P0",
      "description": "2048 / 2048 MB used",
      "status": "injecting"
     },
     {
      "id": "cm-oom-2",
      "name": "Garbage Collector Paralysis",
      "severity": "P0",
      "description": "98% of CPU time spent attempting to free memory",
      "status": "injecting"
     }
    ]
   },
   "retry-storm": {
    "id": "retry-storm",
    "name": "Exponential Retry Storm & Thundering Herd DDOS",
    "category": "Networking & Service Mesh",
    "severity": "P0",
    "badge": "DISTRIBUTED / NET",
    "service": "payment-gateway-mesh",
    "domain": "networking",
    "status": "CRUSHED",
    "timestamp": "11:15:08 UTC",
    "summary": "A 200ms network blip provoked 10,000 clients into firing aggressive 10x synchronous retries without jitter, generating a 140,000 RPS tidal wave that flattened edge reverse proxies.",
    "fatalEvent": "Fatal Event: Edge ingress saturation provoked SYN flood protection, dropping all gateway pods.",
    "pathology": "Static loop retry without exponential backoff or decorrelated randomization",
    "codeSnippet": "// Flawed immediate retry without jitter\nfor (let i = 0; i < 10; i++) {\n  try {\n    return await http.post('/charge', payload);\n  } catch (e) {\n    await sleep(100); // Resonant synchronized thundering herd!\n  }\n}",
    "stackTrace": "FetchError: request to https://payments.internal/charge failed, reason: connect ETIMEDOUT 10.0.4.18:443\n    at ClientRequest.<anonymous> (node_modules/node-fetch/lib/index.js:1491:11)\n    at Socket.emit (node:events:517:28)\n    at TCP.onStreamRead (node:net:592:20)",
    "coronerVerdict": "10,000 edge clients experienced a 200ms network hiccup and simultaneously fired aggressive 10x retries with static 100ms backoff, multiplying ingress traffic by 1000% and completely crushing the payment gateway.",
    "postMortem": {
     "summary": "Self-inflicted distributed denial-of-service attack provoked by un-jittered tight retry loops across all frontend clients during upstream payment micro-blip.",
     "impact": "Payment processing gateway knocked offline for 31 minutes; 18,400 shopping carts abandoned.",
     "rootCause": "Total absence of randomized exponential backoff (Full Jitter) and missing edge circuit breakers.",
     "actionItems": [
      "Implement full decorrelated jitter backoff algorithm across client SDKs",
      "Deploy Envoy circuit breakers to instantly trip and shed load when error rates cross 20%",
      "Enforce rate limiting on internal service mesh ingress proxies"
     ]
    },
    "timeline": [
     {
      "time": "T-00:00:00",
      "desc": "Core switch re-converges BGP routes, dropping packets for 250 milliseconds.",
      "isFatal": false,
      "label": "500ms latency spike"
     },
     {
      "time": "T-00:00:10",
      "desc": "12,000 concurrent client requests fail simultaneously.",
      "isFatal": false,
      "label": "10x traffic wave"
     },
     {
      "time": "T-00:00:20",
      "desc": "Synchronized retries hit internal ingress with 140,000 RPS burst (12x normal peak).",
      "isFatal": false,
      "label": "Global gateway lockout"
     },
     {
      "time": "T-00:01:05",
      "desc": "Connection queues overflow; SYN flood protection drops gateway pods into asystole.",
      "isFatal": true
     }
    ],
    "fiveWhys": [
     "Why did the payment service stop responding? Ingress proxies dropped all connections due to CPU saturation and connection backlog overflow.",
     "Why did traffic spike to 140,000 requests per second? Thousands of web and mobile clients fired retries simultaneously.",
     "Why were the retries synchronized in a resonant wave? The retry logic used a static 100ms delay with zero random jitter.",
     "Why did clients retry 10 times consecutively? The SDK retry count was configured to 10 to mask intermittent network jitter.",
     "Why was there no circuit breaker to protect the upstream service? Circuit breaking was disabled during a recent service mesh migration and never re-enabled."
    ],
    "title": "Exponential Retry Storm & Thundering Herd DDOS",
    "description": "A 200ms network blip provoked 10,000 clients into firing aggressive 10x synchronous retries without jitter, generating a 140,000 RPS tidal wave that flattened edge reverse proxies.",
    "revivedCode": "// ✅ RESURRECTED SRE CODE: Exponential backoff with full jitter\nasync function fetchWithFullJitter(url: string, maxAttempts = 3, baseDelay = 100) {\n  for (let attempt = 0; attempt < maxAttempts; attempt++) {\n    try {\n      const res = await fetch(url);\n      if (res.ok) return res;\n      if (res.status < 500) throw new Error(`Client error: ${res.status}`);\n    } catch (err) {\n      if (attempt === maxAttempts - 1) throw err;\n      // Full-jitter exponential backoff formula\n      const maxBackoff = baseDelay * (2 ** attempt);\n      const sleep = Math.random() * maxBackoff;\n      await new Promise(r => setTimeout(r, sleep));\n    }\n  }\n}",
    "replayerSteps": [
     {
      "step": 1,
      "timeOffset": "+0.0s",
      "title": "Transient server latency",
      "description": "Network route switching generates 400ms of latency at the edge gateway.",
      "telemetry": {
       "latencyMs": 410,
       "errorRate": "1.2%",
       "rps": "14.0k"
      },
      "severity": "P1"
     },
     {
      "step": 2,
      "timeOffset": "+0.5s",
      "title": "Wave of synchronized retries",
      "description": "Clients without random jitter fire 5 simultaneous attempts, multiplying traffic 5x.",
      "telemetry": {
       "latencyMs": 2540,
       "errorRate": "14.8%",
       "rps": "8.1k"
      },
      "severity": "P1"
     },
     {
      "step": 3,
      "timeOffset": "+2.1s",
      "title": "Edge gateway throttling",
      "description": "Queues overflow. Rate limiters cut 90% of requests with HTTP 429.",
      "telemetry": {
       "latencyMs": 4800,
       "errorRate": "48.9%",
       "rps": "3.2k"
      },
      "severity": "P1"
     }
    ],
    "blastRadius": {
     "nodes": [
      {
       "id": "client-spa",
       "name": "client-spa",
       "role": "Client Applications",
       "status": "degraded",
       "statusCode": "429"
      },
      {
       "id": "edge-gateway",
       "name": "edge-gateway",
       "role": "Cloudflare Edge",
       "status": "epicenter",
       "statusCode": "THROTTLE"
      },
      {
       "id": "auth-service",
       "name": "auth-service",
       "role": "Authorization Service",
       "status": "degraded",
       "statusCode": "WARN"
      },
      {
       "id": "database",
       "name": "database",
       "role": "RDS Database",
       "status": "degraded",
       "statusCode": "WARN"
      },
      {
       "id": "worker-pool",
       "name": "worker-pool",
       "role": "Job Queue",
       "status": "healthy",
       "statusCode": "200 OK"
      }
     ],
     "summary": {
      "epicenterCount": 1,
      "degradedCount": 3,
      "healthyCount": 1
     }
    },
    "chaosMetrics": [
     {
      "id": "cm-rs-1",
      "name": "Inbound Traffic Multiplier",
      "severity": "P1",
      "description": "5.2x above average",
      "status": "injecting"
     },
     {
      "id": "cm-rs-2",
      "name": "Packet Rejection Rate",
      "severity": "P1",
      "description": "89.4% of requests blocked at the edge",
      "status": "injecting"
     }
    ]
   },
   "cors-nightmare": {
    "id": "cors-nightmare",
    "name": "Strict Origin CORS Rejection on Production Preflight",
    "category": "Browser Security & Edge CDN",
    "severity": "P1",
    "badge": "SECURITY / BROWSER",
    "service": "public-api-gateway",
    "domain": "security",
    "status": "STRANGULATED",
    "timestamp": "08:22:45 UTC",
    "summary": "CDN edge caches served stale OPTIONS preflight responses containing staging domains, triggering browser CORS blocks that completely paralyzed customer logins.",
    "fatalEvent": "Fatal Event: Browser security sandbox rejected 100% of API preflight handshakes.",
    "pathology": "Missing Vary: Origin header on CDN-cached preflight responses",
    "codeSnippet": "// Preflight OPTIONS handler missing Vary: Origin\napp.use((req, res, next) => {\n  if (req.method === 'OPTIONS') {\n    // Missing Allow-Credentials and dynamic origin reflection\n    res.header('Access-Control-Allow-Origin', 'https://staging.app');\n    return res.sendStatus(200);\n  }\n  next();\n});",
    "stackTrace": "Access to fetch at 'https://api.bugmortem.io/v1/auth' from origin 'https://bugmortem.vercel.app' \nhas been blocked by CORS policy: Response to preflight request doesn't pass access control check: \nThe 'Access-Control-Allow-Origin' header has a value 'https://staging.app' that is not equal to the supplied origin.",
    "coronerVerdict": "Production frontend build was rejected at the edge by the browser security sandbox because an environment variable misconfiguration locked CORS preflight reflection to the staging environment URL.",
    "postMortem": {
     "summary": "Complete lockout of production browser clients due to hardcoded staging origin reflection in CORS preflight responses.",
     "impact": "Zero user logins possible from production domain for 55 minutes.",
     "rootCause": "Static staging domain compiled into edge CDN cache rules without dynamic origin validation against trusted production patterns.",
     "actionItems": [
      "Replace hardcoded origin strings with dynamic domain regex validation against allowed list",
      "Add Vary: Origin header to prevent Cloudflare/CloudFront caching wrong preflight responses",
      "Automate cross-origin preflight smoke tests in pre-deployment validation scripts"
     ]
    },
    "timeline": [
     {
      "time": "T-00:00:00",
      "desc": "CDN cache warming script executes against staging endpoint prior to release.",
      "isFatal": false,
      "label": "Gateway config deployment"
     },
     {
      "time": "T-00:02:10",
      "desc": "Edge CDN caches OPTIONS response with Access-Control-Allow-Origin: staging.",
      "isFatal": false,
      "label": "Preflight request failure"
     },
     {
      "time": "T-00:05:00",
      "desc": "Production release goes live on bugmortem.vercel.app.",
      "isFatal": false,
      "label": "Total UI paralysis"
     },
     {
      "time": "T-00:05:30",
      "desc": "100% of browser OPTIONS preflight requests fail; client authentication asystole.",
      "isFatal": true
     }
    ],
    "fiveWhys": [
     "Why could users not log in to the production app? The browser blocked all fetch requests with a CORS policy violation error.",
     "Why did the browser reject the preflight request? The Access-Control-Allow-Origin header returned https://staging.app instead of production.",
     "Why did production return staging CORS headers? The edge CDN served a cached OPTIONS response that had been primed by staging verification tests.",
     "Why did the CDN cache the OPTIONS response across origins? The API server was missing the Vary: Origin response header.",
     "Why was the origin hardcoded in configuration? A developer used a static string instead of an environment variable lookup."
    ],
    "title": "Strict Origin CORS Rejection on Production Preflight",
    "description": "CDN edge caches served stale OPTIONS preflight responses containing staging domains, triggering browser CORS blocks that completely paralyzed customer logins.",
    "revivedCode": "// ✅ RESURRECTED SRE CODE: Safe origin allowlist and preflight response caching\nconst ALLOWED_ORIGINS = new Set([\n  'https://bugmortem.vercel.app',\n  'https://app.bugmortem.dev'\n]);\n\napp.use((req, res, next) => {\n  const origin = req.headers.origin;\n  if (origin && ALLOWED_ORIGINS.has(origin)) {\n    res.header('Access-Control-Allow-Origin', origin);\n    res.header('Access-Control-Allow-Credentials', 'true');\n    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');\n    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');\n    res.header('Access-Control-Max-Age', '86400'); // Preflight caching for 24h\n  }\n  if (req.method === 'OPTIONS') return res.sendStatus(204);\n  next();\n});",
    "replayerSteps": [
     {
      "step": 1,
      "timeOffset": "+0.0s",
      "title": "Gateway rules update",
      "description": "A Terraform deployment modifies CORS headers on the API gateway.",
      "telemetry": {
       "latencyMs": 38,
       "errorRate": "0.00%",
       "rps": "15.4k"
      },
      "severity": "P1"
     },
     {
      "step": 2,
      "timeOffset": "+1.5s",
      "title": "OPTIONS preflight rejections",
      "description": "Browsers send mandatory OPTIONS preflights and receive 403 Forbidden.",
      "telemetry": {
       "latencyMs": 120,
       "errorRate": "45.0%",
       "rps": "9.2k"
      },
      "severity": "P1"
     },
     {
      "step": 3,
      "timeOffset": "+4.0s",
      "title": "Total SPA interface lockout",
      "description": "No authenticated request passes CORS verification. 100% of clients cut off.",
      "telemetry": {
       "latencyMs": 210,
       "errorRate": "99.8%",
       "rps": "1.2k"
      },
      "severity": "P1"
     }
    ],
    "blastRadius": {
     "nodes": [
      {
       "id": "client-spa",
       "name": "client-spa",
       "role": "SPA Application",
       "status": "epicenter",
       "statusCode": "CORS_FAIL"
      },
      {
       "id": "edge-gateway",
       "name": "edge-gateway",
       "role": "AWS API Gateway",
       "status": "degraded",
       "statusCode": "403"
      },
      {
       "id": "auth-service",
       "name": "auth-service",
       "role": "Login API",
       "status": "healthy",
       "statusCode": "200 OK"
      },
      {
       "id": "database",
       "name": "database",
       "role": "Database",
       "status": "healthy",
       "statusCode": "200 OK"
      },
      {
       "id": "worker-pool",
       "name": "worker-pool",
       "role": "Job Queue",
       "status": "healthy",
       "statusCode": "200 OK"
      }
     ],
     "summary": {
      "epicenterCount": 1,
      "degradedCount": 1,
      "healthyCount": 3
     }
    },
    "chaosMetrics": [
     {
      "id": "cm-cors-1",
      "name": "Preflight Request Errors",
      "severity": "P1",
      "description": "99.8% of OPTIONS requests rejected",
      "status": "injecting"
     },
     {
      "id": "cm-cors-2",
      "name": "Client Network Errors",
      "severity": "P1",
      "description": "Zero authenticated traffic passing the gateway",
      "status": "injecting"
     }
    ]
   },
   "s3-lambda-loop": {
    "id": "s3-lambda-loop",
    "name": "Recursive S3 Event Trigger Loop & Lambda Explosion",
    "category": "AWS & Serverless Architecture",
    "severity": "P0",
    "badge": "AWS / SERVERLESS",
    "service": "media-thumbnail-pipeline",
    "domain": "cloud",
    "status": "INCINERATED",
    "timestamp": "02:04:51 UTC",
    "summary": "A media worker written to process images saved output thumbnails directly into the monitored source bucket, initiating a runaway recursive cycle that triggered 4.8 million Lambdas and a $48,000 billing spike.",
    "fatalEvent": "Fatal Event: AWS Account concurrency ceiling (10,000) reached; Lambda invocation throttling engaged globally.",
    "pathology": "Destination bucket and source event trigger configured to identical S3 namespace",
    "codeSnippet": "// Infinite self-invocation loop\nexport const handler = async (event) => {\n  for (const record of event.Records) {\n    const thumb = await resize(record.s3.object.key);\n    // BUG: Writing thumbnail back into SAME bucket fires this Lambda again!\n    await s3.putObject({ Bucket: record.s3.bucket.name, Key: 'thumb_' + record.s3.object.key, Body: thumb });\n  }\n};",
    "stackTrace": "Rate Exceeded: Rate of invocation of function arn:aws:lambda:us-east-1:123456789:function:thumbnail-gen \nexceeded account concurrency quota (10,000/10,000 concurrent executions).\nCloudWatch Billing Alarm: Estimated monthly charge: $48,219.42 USD.",
    "coronerVerdict": "A recursive serverless doom-loop was initiated when a thumbnail generator outputted its artifact back into the same S3 bucket configured as its ObjectCreated event source, spawning 4.8 million runaway Lambdas.",
    "postMortem": {
     "summary": "Catastrophic recursive serverless invocation loop triggering account-wide concurrency exhaustion and a $48,000 billing spike within 38 minutes.",
     "impact": "AWS account concurrency throttled for all production serverless functions; massive financial hemorrhage.",
     "rootCause": "Writing output objects directly back into the input S3 bucket without prefix filtering or target separation.",
     "actionItems": [
      "Strictly isolate input and output buckets into distinct physical S3 resources",
      "Enforce S3 Event Notification prefix filters (uploads/ vs thumbnails/)",
      "Configure AWS Lambda maximum concurrency limits and instantaneous billing kill-switches"
     ]
    },
    "timeline": [
     {
      "time": "T-00:00:00",
      "desc": "User uploads profile photo avatar_72.png to media-storage bucket.",
      "isFatal": false,
      "label": "Single file upload"
     },
     {
      "time": "T-00:00:03",
      "desc": "Lambda resizes photo and writes thumb_avatar_72.png to same bucket.",
      "isFatal": false,
      "label": "Cycle 1: self-invocation"
     },
     {
      "time": "T-00:00:08",
      "desc": "thumb_avatar_72.png creation triggers new Lambda execution (loop iteration 2).",
      "isFatal": false,
      "label": "Exponential invocation avalanche"
     },
     {
      "time": "T-00:04:12",
      "desc": "10,000 concurrent Lambdas saturate account quota; all cloud operations flatline.",
      "isFatal": true,
      "label": "Concurrency exhaustion"
     },
     {
      "time": "14:03:42 UTC",
      "label": "Global AWS account blackout",
      "desc": "The 1000/1000 concurrency limit was reached (142,000 invocations in total); authorization, orders and payments completely blocked with HTTP 429",
      "isFatal": true
     }
    ],
    "fiveWhys": [
     "Why did all serverless APIs stop responding globally? The AWS account hit its hard concurrency limit of 10,000 simultaneous Lambda executions.",
     "Why were 10,000 Lambdas executing simultaneously? A single image upload spawned an exponential recursive loop of executions.",
     "Why did the Lambda function trigger itself recursively? It saved its output thumbnail into the exact same S3 bucket that listened for new uploads.",
     "Why did the S3 event trigger not filter out thumbnail files? The S3 notification rule lacked a prefix filter (e.g., uploads/) and listened to all ObjectCreated events.",
     "Why were there no safety guardrails or circuit breakers? The Lambda function had no reserved concurrency limit or execution budget ceiling configured."
    ],
    "title": "Recursive S3 Event Trigger Loop & Lambda Explosion",
    "description": "A media worker written to process images saved output thumbnails directly into the monitored source bucket, initiating a runaway recursive cycle that triggered 4.8 million Lambdas and a $48,000 billing spike.",
    "revivedCode": "// ✅ RESURRECTED SRE CODE: Separate output bucket + prefix filter + loop guard\nimport { S3Event } from 'aws-lambda';\nimport { S3 } from 'aws-sdk';\n\nconst s3 = new S3();\nconst INPUT_PREFIX = 'uploads/';    // process originals only\nconst OUTPUT_BUCKET = process.env.THUMBNAIL_BUCKET!; // isolated output bucket\n\nexport const handler = async (event: S3Event): Promise<void> => {\n  // Recursion guard: reject events triggered by our own output bucket\n  if (process.env.AWS_LAMBDA_FUNCTION_NAME &&\n      event.Records[0]?.s3.bucket.name === OUTPUT_BUCKET) {\n    console.warn('[SRE GUARD: rejected recursive invocation from the output bucket]');\n    return;\n  }\n\n  for (const record of event.Records) {\n    const srcKey = record.s3.object.key;\n    const srcBucket = record.s3.bucket.name;\n\n    // Guard: process objects under the uploads/ prefix only\n    if (!srcKey.startsWith(INPUT_PREFIX)) {\n      console.info('[SRE GUARD: skipping \\${srcKey} — outside uploads/ prefix]');\n      continue;\n    }\n\n    const thumbnail = await resizeImage(srcKey, srcBucket);\n\n    // Write to the ISOLATED output bucket — cannot re-trigger this Lambda\n    await s3.putObject({\n      Bucket: OUTPUT_BUCKET,\n      Key: `thumbs/\\${srcKey.replace(INPUT_PREFIX, '')}`,\n      Body: thumbnail,\n      ContentType: 'image/webp',\n    }).promise();\n  }\n};",
    "replayerSteps": [
     {
      "step": 1,
      "timeOffset": "+0.0s",
      "title": "First recursion step after upload",
      "description": "A user uploads header.jpg to the media-assets bucket. The Lambda shrinks it and writes thumb_header.jpg back to the same bucket — no prefix filter.",
      "telemetry": {
       "latencyMs": 312,
       "errorRate": "0.00%",
       "rps": "1.2k"
      },
      "severity": "P1"
     },
     {
      "step": 2,
      "timeOffset": "+15.0s",
      "title": "Avalanche growth of parallel invocations",
      "description": "Every new thumbnail triggers another Lambda run. Container count grows exponentially: 1 → 2 → 4 → 16 → 256 concurrent instances.",
      "telemetry": {
       "latencyMs": 1840,
       "errorRate": "12.4%",
       "rps": "14.2k"
      },
      "severity": "P1"
     },
     {
      "step": 3,
      "timeOffset": "+231.0s",
      "title": "AWS account limit exhausted — total outage",
      "description": "142,000 invocations exhaust the account's entire 1,000-slot concurrency limit. Login, orders and payment services are blocked with HTTP 429.",
      "telemetry": {
       "latencyMs": 8400,
       "errorRate": "98.9%",
       "rps": "142.0k"
      },
      "severity": "P0"
     }
    ],
    "blastRadius": {
     "nodes": [
      {
       "id": "worker-pool",
       "name": "worker-pool",
       "role": "AWS Lambda Fleet (image-processor)",
       "status": "epicenter",
       "statusCode": "FAIL"
      },
      {
       "id": "edge-gateway",
       "name": "edge-gateway",
       "role": "AWS API Gateway",
       "status": "degraded",
       "statusCode": "WARN"
      },
      {
       "id": "auth-service",
       "name": "auth-service",
       "role": "Login Lambda (throttled)",
       "status": "degraded",
       "statusCode": "WARN"
      },
      {
       "id": "database",
       "name": "database",
       "role": "Payments & Orders Lambdas (throttled)",
       "status": "degraded",
       "statusCode": "WARN"
      },
      {
       "id": "client-spa",
       "name": "client-spa",
       "role": "S3 Ingestion Bucket (media-assets)",
       "status": "healthy",
       "statusCode": "200 OK"
      }
     ],
     "summary": {
      "epicenterCount": 1,
      "degradedCount": 3,
      "healthyCount": 1
     }
    },
    "chaosMetrics": [
     {
      "id": "cm-s3-1",
      "name": "Concurrent Lambda Invocations",
      "severity": "P0",
      "description": "1000 / 1000 (100% of the AWS account limit exhausted)",
      "status": "injecting"
     },
     {
      "id": "cm-s3-2",
      "name": "Loop Invocations (4 min)",
      "severity": "P0",
      "description": "142,380 uncontrolled executions",
      "status": "injecting"
     },
     {
      "id": "cm-s3-3",
      "name": "Throttled Account Requests",
      "severity": "P0",
      "description": "38,410 requests rejected with HTTP 429",
      "status": "injecting"
     }
    ]
   },
   "serverless-timeout": {
    "id": "serverless-timeout",
    "name": "Downstream Cold Start Cascading Serverless Timeout",
    "category": "Serverless Edge & Relational DB",
    "severity": "P1",
    "badge": "EDGE / COLD START",
    "service": "realtime-notification-edge",
    "domain": "serverless",
    "status": "TIME EXPIRED",
    "timestamp": "09:01:14 UTC",
    "summary": "Synchronous edge routes waiting on cold-started relational database connection pools exceeded the 30-second API Gateway ceiling, terminating user analytics queries with 504 Gateway Timeout.",
    "fatalEvent": "Fatal Event: API Gateway hard timeout (30,000 ms) breached during DB connection handshake.",
    "pathology": "Heavy synchronous analytics execution coupled with cold container startup",
    "codeSnippet": "// 30s gateway timeout exceeded by cold relational query\nexport const handler = async (event) => {\n  // Cold start initializes heavy ORM + establish SSL to remote DB: 14s\n  const db = await initDatabaseConnection();\n  // Complex analytics aggregation query: 18s\n  const data = await db.query('SELECT * FROM complex_analytics_view');\n  // Total execution: 32s -> Exceeds API Gateway 30s limit!\n  return { statusCode: 200, body: JSON.stringify(data) };\n};",
    "stackTrace": "504 Gateway Time-out\nThe server, while acting as a gateway or proxy, did not receive a timely response from the upstream server.\nX-Amzn-Trace-Id: Root=1-654a9b2c-84f923e10293847291038472\nExecution time: 30,002 ms exceeding function timeout of 30,000 ms.",
    "coronerVerdict": "Synchronous API Gateway terminated connections with HTTP 504 after a cold-started Lambda worker took 14 seconds to establish database SSL handshakes and 18 seconds to execute heavy aggregations, breaching the 30s hard limit.",
    "postMortem": {
     "summary": "Cascading HTTP 504 gateway timeouts caused by monolithic analytics queries executed synchronously inside cold-started serverless functions.",
     "impact": "Analytics dashboard unavailable for 35% of peak business users; upstream connection pool starvation.",
     "rootCause": "Coupling heavy, long-running analytical queries with synchronous request-response edge gateway routes.",
     "actionItems": [
      "Convert heavy report generation to asynchronous architecture using SQS and WebSocket/polling push",
      "Enable Provisioned Concurrency on critical serverless endpoints to eliminate cold starts",
      "Deploy read-replicas with pre-aggregated materialised views for reporting queries"
     ]
    },
    "timeline": [
     {
      "time": "T-00:00:00",
      "desc": "Batch of 50 enterprise users open morning executive metrics dashboard.",
      "isFatal": false,
      "label": "Campaign traffic spike"
     },
     {
      "time": "T-00:00:05",
      "desc": "Traffic spike forces AWS to spin up 25 new cold Lambda container instances.",
      "isFatal": false,
      "label": "Cold start and database lockout"
     },
     {
      "time": "T-00:00:20",
      "desc": "Cold DB connection handshakes take 14.2s per container, saturating DB CPU.",
      "isFatal": false,
      "label": "API Gateway limit ceiling"
     },
     {
      "time": "T-00:00:31",
      "desc": "API Gateway 30s hard limit reached; 504 Gateway Timeout flatline triggered.",
      "isFatal": true
     }
    ],
    "fiveWhys": [
     "Why did users see 504 Gateway Timeout errors? The API Gateway closed the connection after waiting 30 seconds for the backend.",
     "Why did the backend take longer than 30 seconds to reply? The Lambda function cold start combined with the database query took 32 seconds.",
     "Why did the cold start take 14 seconds? The function loaded a monolithic ORM and opened a new SSL connection to a distant RDS instance.",
     "Why was a heavy analytical query executed synchronously in a web request? The endpoint was designed for MVP without an asynchronous job queue architecture.",
     "Why was there no caching or read-replica for this analytics query? The dashboard feature was shipped directly to production without load testing or database optimization."
    ],
    "title": "Downstream Cold Start Cascading Serverless Timeout",
    "description": "Synchronous edge routes waiting on cold-started relational database connection pools exceeded the 30-second API Gateway ceiling, terminating user analytics queries with 504 Gateway Timeout.",
    "revivedCode": "// ✅ RESURRECTED SRE CODE: Connection reuse and RDS Proxy pooling\nimport { Pool } from 'pg';\n\n// The global execution context keeps the connection alive between invocations\nconst pool = new Pool({\n  host: process.env.RDS_PROXY_HOST, // Connection routed through AWS RDS Proxy\n  max: 1, // A single connection per container prevents pool exhaustion\n  connectionTimeoutMillis: 2000,\n});\n\nexport const handler = async (event: any) => {\n  const client = await pool.connect();\n  try {\n    const res = await client.query('SELECT * FROM checkout_cart WHERE cart_id = $1', [event.cartId]);\n    return { statusCode: 200, body: JSON.stringify(res.rows) };\n  } finally {\n    client.release();\n  }\n};",
    "replayerSteps": [
     {
      "step": 1,
      "timeOffset": "+0.0s",
      "title": "Invocation spike",
      "description": "A sudden traffic surge forces AWS Lambda to spin up 1,200 new execution environments.",
      "telemetry": {
       "latencyMs": 450,
       "errorRate": "0.00%",
       "rps": "18.4k"
      },
      "severity": "P1"
     },
     {
      "step": 2,
      "timeOffset": "+12.5s",
      "title": "TLS and connection negotiation storm",
      "description": "1,200 containers connect to the database in parallel. The connection queue deadlocks.",
      "telemetry": {
       "latencyMs": 14200,
       "errorRate": "42.8%",
       "rps": "6.1k"
      },
      "severity": "P1"
     },
     {
      "step": 3,
      "timeOffset": "+29.0s",
      "title": "Hard 504 cutoff at the API gateway",
      "description": "API Gateway drops all pending connections once the hard 29-second limit is hit.",
      "telemetry": {
       "latencyMs": 29000,
       "errorRate": "99.4%",
       "rps": "410"
      },
      "severity": "P0"
     }
    ],
    "blastRadius": {
     "nodes": [
      {
       "id": "client-spa",
       "name": "client-spa",
       "role": "SPA Cart",
       "status": "degraded",
       "statusCode": "504"
      },
      {
       "id": "edge-gateway",
       "name": "edge-gateway",
       "role": "AWS API Gateway",
       "status": "epicenter",
       "statusCode": "TIMEOUT"
      },
      {
       "id": "auth-service",
       "name": "auth-service",
       "role": "Cognito / JWT",
       "status": "healthy",
       "statusCode": "200 OK"
      },
      {
       "id": "database",
       "name": "database",
       "role": "Aurora Serverless",
       "status": "degraded",
       "statusCode": "STALL"
      },
      {
       "id": "worker-pool",
       "name": "worker-pool",
       "role": "Lambda Fleet",
       "status": "degraded",
       "statusCode": "COLD_START"
      }
     ],
     "summary": {
      "epicenterCount": 1,
      "degradedCount": 3,
      "healthyCount": 1
     }
    },
    "chaosMetrics": [
     {
      "id": "cm-srv-1",
      "name": "Container Cold Start Time",
      "severity": "P0",
      "description": "Average 28,400ms per new container",
      "status": "injecting"
     },
     {
      "id": "cm-srv-2",
      "name": "504 Timeout Rate",
      "severity": "P0",
      "description": "99.4% of invocations timed out",
      "status": "injecting"
     }
    ]
   }
  },
  "sectionTitle": "CANONICAL PRODUCTION AUTOPSY ARCHIVES"
 },
 "codeSection": {
  "title": "AUTOPSY SPECIMEN // LETHAL CODE DIFF",
  "subtitle": "Side-by-side comparative inspection of pathological code and SRE curative patch",
  "fatalLabel": "PATHOLOGICAL DEFECT (CRITICAL)",
  "curativeLabel": "SRE REMEDIAL SPECIFICATION (CURED)",
  "copyLabel": "Copy Diff Payload",
  "copiedLabel": "Diff Copied to Clipboard",
  "cursedTitle": "CODE AUTOPSY SECTION: CURSED VS RESURRECTED CODE",
  "resurrectedTitle": "RESURRECTED SRE CODE (RESILIENCE PATTERN)",
  "cursedBadge": "CRITICAL FAILURE",
  "resurrectedBadge": "PATTERN: SRE RESILIENCE",
  "copyCta": "Copy Resurrected Code",
  "copied": "Code Copied!"
 },
 "stackTrace": {
  "title": "KERNEL & RUNTIME TERMINATION TELEMETRY"
 },
 "timeline": {
  "title": "MORTEM CHRONOLOGY (STEP-BY-STEP REPLAY)"
 },
 "replayer": {
  "title": "INCIDENT TIME-TRAVEL REPLAYER",
  "subtitle": "Interactive microsecond scrubber and forensic playback engine.",
  "liveBadge": "PLAYING",
  "speedLabel": "Playback Velocity",
  "btnReset": "Rewind to Epoch",
  "btnPlay": "Play Incident Playback",
  "btnPause": "Pause Stream",
  "statusInitial": "Normal Traffic (T-0)",
  "statusDegrading": "Cascading Saturation",
  "statusTerminus": "System Flatline (Terminus)",
  "stepPrefix": "Sequence Frame",
  "play": "Start Simulation",
  "pause": "Pause Simulation",
  "reset": "Reset Timeline",
  "speed": "Speed",
  "stepOf": "Step",
  "telemetryLatency": "P99 Latency",
  "telemetryErrors": "Error Rate",
  "telemetryRps": "Throughput"
 },
 "fiveWhys": {
  "title": "5-WHYS ROOT CAUSE FORENSIC TREE",
  "subtitle": "Iterative causal interrogation drilling down to architectural root failure.",
  "badgeLabel": "SYSTEMIC CAUSAL GRAPH",
  "cardWhyPrefix": "WHY #",
  "symptomLabel": "SURFACE SYMPTOM",
  "triggerLabel": "PROXIMATE TRIGGER",
  "mechanismLabel": "INTERMEDIATE DEFECT",
  "flawLabel": "ARCHITECTURAL VULNERABILITY",
  "rootCauseLabel": "ROOT CAUSAL FLAW",
  "interactiveHint": "Click nodes to inspect blast radius, impacted subsystems, and remediation prescriptions.",
  "mitigationTitle": "Architectural Remediation Prescription",
  "impactedSubsystems": "Impacted Micro-Components",
  "diagnosticConfidence": "Forensic Confidence Index",
  "sectionTitle": "BLAMELESS 5-WHYS ROOT CAUSE TREE",
  "sectionSubtitle": "Systematic engineering investigation from surface symptom to architectural flaw.",
  "levels": [
   "1. SURFACE SYMPTOM",
   "2. DIRECT TRIGGER",
   "3. DAMAGE MECHANISM",
   "4. ARCHITECTURAL FLAW",
   "5. SYSTEMIC CAUSE"
  ],
  "blamelessBadge": "BLAMELESS SRE CULTURE",
  "rootCauseBadge": "ROOT CAUSE",
  "copyChain": "Copy Causal Chain",
  "copied": "Chain Copied!"
 },
 "blastRadius": {
  "title": "SYSTEM BLAST RADIUS & TOPOLOGY IMPACT",
  "subtitle": "Visual interactive dependency graph tracking cascading failures across distributed microservices",
  "severityLabel": "Incident Blast Radius Tier",
  "nodeHealth": "Subsystem Health Status",
  "upstreamImpact": "Upstream Reverse-Dependency Cascades",
  "downstreamImpact": "Downstream Partition Failures",
  "activeConnections": "Degraded Sockets / Mesh Links",
  "resilienceRating": "Current Mesh Resilience Index",
  "legendEpicenter": "Patient Zero",
  "legendDegraded": "Cascade Damage",
  "legendHealthy": "Healthy Node (200 OK)",
  "badgeEpicenter": "Critical",
  "badgeDegraded": "Degraded",
  "badgeHealthy": "Healthy"
 },
 "chaos": {
  "title": "CHAOS ENGINEERING LAB & BLAST RADIUS SANDBOX",
  "subtitle": "Inject fault scenarios in an isolated sandbox to observe telemetry and trigger self-healing.",
  "controlPanelTitle": "FAULT INJECTION CONSOLE",
  "scenarioLabel": "Select Outage Simulation",
  "scenarioHydration": "React SSR Hydration Mismatch & DOM Explosion",
  "scenarioPool": "PostgreSQL Connection Starvation & Pool Exhaustion",
  "scenarioOom": "Memory Leak & Kernel OOM Reaper (137 Exit Code)",
  "scenarioStorm": "Exponential Retry Storm & Thundering Herd DDOS",
  "scenarioCors": "Strict Origin CORS Rejection on Production Preflight",
  "scenarioS3Loop": "Recursive S3 Event Trigger Loop & Lambda Explosion",
  "scenarioServerless": "Downstream Cold Start Cascading Serverless Timeout",
  "btnInject": "Inject Failure (Simulate Outage)",
  "btnSelfHeal": "Trigger Self-Healing & Circuit Breaker",
  "healingActive": "Applying Self-Healing Mitigation...",
  "metricsTitle": "LIVE SANDBOX TELEMETRY METRICS",
  "metricLatency": "P99 Latency",
  "metricErrorRate": "HTTP 5xx Error Rate",
  "metricPoolSaturation": "Pool / Thread Saturation",
  "metricMemoryUsage": "Heap Memory Allocation",
  "statusNominal": "Sandbox Health: Nominal",
  "statusDegraded": "Sandbox Health: Cascading Failures Active",
  "sectionTitle": "CHAOS ENGINEERING SANDBOX (LIVE TELEMETRY)",
  "sectionSubtitle": "Inject active failure vectors and watch telemetry degrade in real time",
  "btnMitigate": "Trigger Self-Healing",
  "metricRps": "THROUGHPUT",
  "scenarioLatencyTitle": "Edge latency spike (+2500ms)",
  "scenarioLatencyDesc": "Artificial latency at the Edge Gateway causing UI timeouts",
  "scenarioDbPoolTitle": "Database connection pool saturation",
  "scenarioDbPoolDesc": "100% PostgreSQL connection utilization leading to a 503 error cascade",
  "scenarioMemoryTitle": "Worker heap memory leak (OOM)",
  "scenarioMemoryDesc": "Exponential RAM growth in the worker pool triggering the OOM Killer",
  "scenarioAuthStormTitle": "Session revocation storm (Auth Storm)",
  "scenarioAuthStormDesc": "Mass JWT rejections and a flood of re-login requests"
 },
 "chaosSandbox": {
  "title": "CHAOS ENGINEERING BLAST RADIUS SANDBOX",
  "subtitle": "Simulate architectural fault injection and observe self-healing recovery",
  "controlPanel": "FAULT INJECTION CONTROL",
  "injectBtn": "Inject Failure",
  "healBtn": "Trigger Self-Healing",
  "healingState": "Applying Self-Healing Mitigations...",
  "metricsTitle": "SANDBOX TELEMETRY METRICS",
  "p99Latency": "P99 Latency",
  "errorRate": "5xx Error Rate",
  "poolSaturation": "Pool Saturation",
  "memoryUsage": "Heap Memory",
  "nominalStatus": "SYSTEM NOMINAL",
  "activeStatus": "ACTIVE CRITICAL INCIDENT",
  "metricThroughput": "THROUGHPUT",
  "metricP99": "P99 LATENCY",
  "metricErrorRate": "ERROR RATE",
  "injectCta": "Inject Failure",
  "recoveringCta": "Trigger Self-Healing"
 },
 "prescription": {
  "badge": "SRE PRESCRIPTION (RX)",
  "title": "Apteczka SRE & Recepta IaC",
  "diagnosisLabel": "Diagnostic Pathology",
  "readyToApply": "Production-ready IaC & code patches",
  "fileListTitle": "Prescription Files",
  "noFilesAvailable": "No prescription manifests available for this incident.",
  "selectFile": "Select a file from the left sidebar to inspect the prescription.",
  "copyCode": "Copy Code",
  "copied": "Copied!",
  "downloadAll": "Download All Manifests",
  "copyAll": "Copy All to Clipboard",
  "allCopied": "All Files Copied!",
  "close": "Close Prescription Modal",
  "testedWithEngines": "Tested with Kubernetes 1.30, Terraform 1.9, Node 20 LTS, and Postgres 16",
  "items": {
   "react-hydration": {
    "title": "Prescription for React Hydration Mismatch & DOM Tree Collapse",
    "diagnosis": "Server/Client HTML mismatch causing catastrophic layout de-synchronization and white-screen flatline.",
    "files": [
     {
      "filename": "SafeClientOnly.tsx",
      "language": "typescript",
      "description": "Two-pass hydration boundary with fallback skeleton to completely eradicate client/server DOM divergence.",
      "content": "import React, { useState, useEffect, ReactNode } from 'react';\n\ninterface SafeClientOnlyProps {\n  children: ReactNode;\n  fallback?: ReactNode;\n}\n\n/**\n * SRE Prescription: SafeClientOnly Boundary\n * Guarantees that time-, locale-, or browser-dependent components\n * only render after client-side hydration has completed cleanly.\n */\nexport const SafeClientOnly: React.FC<SafeClientOnlyProps> = ({\n  children,\n  fallback = null\n}) => {\n  const [hasMounted, setHasMounted] = useState<boolean>(false);\n\n  useEffect(() => {\n    setHasMounted(true);\n  }, []);\n\n  if (!hasMounted) {\n    return <>{fallback}</>;\n  }\n\n  return <>{children}</>;\n};"
     },
     {
      "filename": "eslint.config.mjs",
      "language": "javascript",
      "description": "ESLint AST rule preventing non-deterministic variables (window, localStorage, Date.now()) during SSR rendering.",
      "content": "// SRE Lint Rule: Ban Direct Global Browser Object Access during SSR Render\nexport default [\n  {\n    rules: {\n      'no-restricted-globals': [\n        'error',\n        {\n          name: 'window',\n          message: 'Direct window access during render causes hydration collapse. Wrap in useEffect or SafeClientOnly boundary.'\n        },\n        {\n          name: 'localStorage',\n          message: 'localStorage is unavailable during server-side pre-rendering.'\n        }\n      ]\n    }\n  }\n];"
     }
    ],
    "doctorOrder": "Immediate rollout of two-phase hydration with a mounted flag and quarantine of dynamic timestamps in SSR components.",
    "dosage": "Enforce 100% Playwright E2E test coverage in the CI/CD pipeline before every production deployment.",
    "preventionRule": "ESLint rule: no new Date() or Math.random() in the render body of Server Components."
   },
   "connection-pool": {
    "title": "Prescription for PostgreSQL Connection Starvation & Pool Exhaustion",
    "diagnosis": "Leaked or unreleased database clients saturated max_connections, resulting in immediate 503 cascades.",
    "files": [
     {
      "filename": "pgbouncer.ini",
      "language": "ini",
      "description": "Transaction-level pooling configuration with strict connection queuing and aggressive client timeouts.",
      "content": ";; SRE Prescription: High-Density PgBouncer Configuration\n[databases]\nproduction_db = host=127.0.0.1 port=5432 dbname=prod_db auth_user=postgres\n\n[pgbouncer]\nlisten_addr = 0.0.0.0\nlisten_port = 6432\nauth_type = scram-sha-256\nauth_file = /etc/pgbouncer/userlist.txt\n\n;; Transaction pooling: server connection released immediately after query transaction finishes\npool_mode = transaction\n\nmax_client_conn = 5000\ndefault_pool_size = 50\nmin_pool_size = 10\nreserve_pool_size = 5\nreserve_pool_timeout = 3\n\n;; SRE Circuit Breaker Timeouts\nquery_timeout = 15\nclient_idle_timeout = 60\nidle_transaction_timeout = 10"
     },
     {
      "filename": "db-resilient-client.ts",
      "language": "typescript",
      "description": "Automatic client release pattern using TypeScript Disposable pattern to prevent connection leakage.",
      "content": "import { Pool, PoolClient } from 'pg';\n\nconst pool = new Pool({\n  connectionString: process.env.DATABASE_URL,\n  max: 20,\n  idleTimeoutMillis: 10000,\n  connectionTimeoutMillis: 2000,\n});\n\n/**\n * Execute query with guaranteed automatic client release\n */\nexport async function withTransaction<T>(\n  callback: (client: PoolClient) => Promise<T>\n): Promise<T> {\n  const client = await pool.connect();\n  try {\n    await client.query('BEGIN');\n    const result = await callback(client);\n    await client.query('COMMIT');\n    return result;\n  } catch (error) {\n    await client.query('ROLLBACK');\n    throw error;\n  } finally {\n    // SRE Guard: Connection is ALWAYS released back to pool\n    client.release();\n  }\n}"
     }
    ],
    "doctorOrder": "Immediate deployment of the PgBouncer transaction-mode pooling proxy and a strict statement_timeout.",
    "dosage": "Configure max_client_conn = 5000, default_pool_size = 50, statement_timeout = 2000ms.",
    "preventionRule": "Absolutely no unbounded analytical queries on the production database Primary node."
   },
   "oom-reaper": {
    "title": "Prescription for Memory Leak & Linux Kernel OOM Killer Flatline",
    "diagnosis": "Unbounded heap allocation during large payload processing provoked Linux SIGKILL (Exit code 137).",
    "files": [
     {
      "filename": "k8s-pod-cgroup-limits.yaml",
      "language": "yaml",
      "description": "Kubernetes Pod resource constraints with Node.js V8 heap ceiling aligned to container cgroups.",
      "content": "apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: billing-export-service\n  namespace: production\nspec:\n  replicas: 3\n  template:\n    spec:\n      containers:\n      - name: worker\n        image: billing-worker:v2.4.1\n        env:\n        - name: NODE_OPTIONS\n          # Max old space set to 75% of container RAM to leave buffer for V8 native bindings & OS\n          value: \"--max-old-space-size=1536\"\n        resources:\n          requests:\n            memory: \"1Gi\"\n            cpu: \"500m\"\n          limits:\n            memory: \"2Gi\"\n            cpu: \"2000m\""
     },
     {
      "filename": "stream-export-processor.ts",
      "language": "typescript",
      "description": "Refactoring from array in-memory accumulation to backpressure-aware Node.js Streams pipeline.",
      "content": "import { createReadStream, createWriteStream } from 'fs';\nimport { Transform, pipeline } from 'stream';\nimport { promisify } from 'util';\n\nconst streamPipeline = promisify(pipeline);\n\n/**\n * SRE Memory Guard: Stream-based chunk processing with constant O(1) memory footprint.\n */\nexport async function processExportSafely(sourcePath: string, destPath: string) {\n  const csvTransformer = new Transform({\n    objectMode: true,\n    transform(chunk, encoding, callback) {\n      const transformed = chunk.toString().toUpperCase();\n      callback(null, transformed);\n    }\n  });\n\n  await streamPipeline(\n    createReadStream(sourcePath),\n    csvTransformer,\n    createWriteStream(destPath)\n  );\n}"
     }
    ],
    "doctorOrder": "Rebuild the export pipeline from in-RAM buffering to asynchronous streaming (Stream Pipeline with backpressure).",
    "dosage": "Apply a hard memory limit in Kubernetes: resources.limits.memory = 2Gi, alert at the 80% threshold.",
    "preventionRule": "Never load entire data collections into single array variables in Node.js processes."
   },
   "retry-storm": {
    "title": "Prescription for Exponential Retry Storm & Thundering Herd DDOS",
    "diagnosis": "Linear un-jittered retries during micro-downtime amplified incoming request volume by 1800%, collapsing edge gateways.",
    "files": [
     {
      "filename": "resilient-fetch.ts",
      "language": "typescript",
      "description": "Full decorrelated jitter backoff algorithm with circuit breaker integration.",
      "content": "interface RetryConfig {\n  retries: number;\n  baseDelayMs: number;\n  maxDelayMs: number;\n}\n\n/**\n * Decorrelated Jitter Algorithm (Full Jitter SRE Standard)\n * Prevents synchronous resonant retry waves against upstream dependencies.\n */\nexport async function fetchWithFullJitter(\n  url: string,\n  config: RetryConfig = { retries: 3, baseDelayMs: 200, maxDelayMs: 5000 }\n): Promise<Response> {\n  let attempt = 0;\n\n  while (attempt <= config.retries) {\n    try {\n      const res = await fetch(url);\n      if (res.ok) return res;\n      if (res.status < 500 && res.status !== 429) {\n        return res; // Client errors are not retried\n      }\n    } catch (err) {\n      if (attempt === config.retries) throw err;\n    }\n\n    attempt++;\n    // Full Jitter Formula: sleep = min(maxDelay, random_between(0, baseDelay * 2^attempt))\n    const calculatedBackoff = Math.min(\n      config.maxDelayMs,\n      config.baseDelayMs * Math.pow(2, attempt)\n    );\n    const jitteredSleep = Math.random() * calculatedBackoff;\n\n    await new Promise((r) => setTimeout(r, jitteredSleep));\n  }\n\n  throw new Error(`Failed to fetch from ${url} after ${config.retries} attempts.`);\n}"
     },
     {
      "filename": "envoy-circuit-breaker.yaml",
      "language": "yaml",
      "description": "Envoy / Istio circuit breaker configuration cutting off cascading retries when upstream degrades.",
      "content": "apiVersion: networking.istio.io/v1alpha3\nkind: DestinationRule\nmetadata:\n  name: upstream-gateway-circuit-breaker\nspec:\n  host: payment-gateway.prod.svc.cluster.local\n  trafficPolicy:\n    connectionPool:\n      tcp:\n        maxConnections: 100\n      http:\n        http1MaxPendingRequests: 10\n        maxRequestsPerConnection: 10\n    outlierDetection:\n      consecutive5xxErrors: 3\n      interval: 10s\n      baseEjectionTime: 30s\n      maxEjectionPercent: 50"
     }
    ],
    "doctorOrder": "Deploy the Exponential Backoff algorithm with Full Jitter plus a Circuit Breaker.",
    "dosage": "Base Delay = 100ms, Max Delay = 2000ms, Jitter = 1.0, Max Retries = 3.",
    "preventionRule": "No automatic, synchronous retries (Zero-Jitter Retries) on 5xx error codes."
   },
   "cors-nightmare": {
    "title": "Prescription for Strict Origin CORS Preflight & Cache Rejection",
    "diagnosis": "Edge CDN dropped Access-Control headers on cached preflight OPTIONS, severing browser SPA requests.",
    "files": [
     {
      "filename": "cors-middleware.ts",
      "language": "typescript",
      "description": "Explicit origin whitelist verification with proper OPTIONS caching headers.",
      "content": "import { Request, Response, NextFunction } from 'express';\n\nconst ALLOWED_ORIGINS = new Set([\n  'https://bugmortem.vercel.app',\n  'https://app.bugmortem.io',\n  'http://localhost:3000'\n]);\n\nexport function strictCorsSecurity(req: Request, res: Response, next: NextFunction) {\n  const origin = req.headers.origin;\n\n  if (origin && ALLOWED_ORIGINS.has(origin)) {\n    res.setHeader('Access-Control-Allow-Origin', origin);\n    res.setHeader('Access-Control-Allow-Credentials', 'true');\n    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');\n    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization,X-Incident-Ref');\n    res.setHeader('Access-Control-Max-Age', '86400'); // Cache preflight for 24 hours\n    res.setHeader('Vary', 'Origin');\n  }\n\n  if (req.method === 'OPTIONS') {\n    return res.status(204).end();\n  }\n\n  next();\n}"
     },
     {
      "filename": "cloudflare-worker-cors.js",
      "language": "javascript",
      "description": "Edge Worker ensuring preflight responses never get clobbered by downstream caching rules.",
      "content": "export default {\n  async fetch(request) {\n    if (request.method === \"OPTIONS\") {\n      return new Response(null, {\n        status: 204,\n        headers: {\n          \"Access-Control-Allow-Origin\": request.headers.get(\"Origin\") || \"*\",\n          \"Access-Control-Allow-Methods\": \"GET, POST, PUT, DELETE, OPTIONS\",\n          \"Access-Control-Allow-Headers\": \"Content-Type, Authorization\",\n          \"Access-Control-Max-Age\": \"86400\",\n          \"Vary\": \"Origin\"\n        }\n      });\n    }\n    return fetch(request);\n  }\n};"
     }
    ],
    "doctorOrder": "Deploy OPTIONS preflight caching (Access-Control-Max-Age) at the API gateway and remove wildcard (*).",
    "dosage": "Set Access-Control-Max-Age = 86400 (24h) for all preflight OPTIONS responses.",
    "preventionRule": "Never dynamically reflect the Origin header as allowed for requests with credentials: true."
   },
   "s3-lambda-loop": {
    "title": "Prescription for Recursive S3 Lambda Self-Triggering Storm",
    "diagnosis": "Lambda function saved output artifacts into the same bucket/prefix configured as its input trigger.",
    "files": [
     {
      "filename": "lambda-isolated-handler.ts",
      "language": "typescript",
      "description": "Architectural separation: writes to dedicated secondary output bucket with guard prefix validation.",
      "content": "import { S3Event } from 'aws-lambda';\nimport { S3 } from '@aws-sdk/client-s3';\n\nconst s3 = new S3({});\nconst OUTPUT_BUCKET = process.env.OUTPUT_BUCKET_NAME!;\nconst INPUT_PREFIX = 'uploads/';\n\nexport const handler = async (event: S3Event): Promise<void> => {\n  for (const record of event.Records) {\n    const srcKey = record.s3.object.key;\n    const srcBucket = record.s3.bucket.name;\n\n    // Guard: only process objects under the uploads/ prefix\n    if (!srcKey.startsWith(INPUT_PREFIX)) {\n      console.info('[SRE GUARD: skipping ${srcKey} — outside uploads/ prefix]');\n      continue;\n    }\n\n    const thumbnail = await resizeImage(srcKey, srcBucket);\n\n    // Write to ISOLATED output bucket — cannot trigger this Lambda again\n    await s3.putObject({\n      Bucket: OUTPUT_BUCKET,\n      Key: `thumbs/${srcKey.replace(INPUT_PREFIX, '')}`,\n      Body: thumbnail,\n      ContentType: 'image/webp'\n    });\n  }\n};\n\nasync function resizeImage(k: string, b: string): Promise<Buffer> {\n  return Buffer.from('mock');\n}"
     },
     {
      "filename": "cloudformation-isolated-buckets.yaml",
      "language": "yaml",
      "description": "CloudFormation stack enforcing strict dual-bucket topology at the IaC permission layer.",
      "content": "AWSTemplateFormatVersion: '2010-09-09'\nDescription: SRE Prescribed Isolated Storage Architecture\n\nResources:\n  InputUploadBucket:\n    Type: AWS::S3::Bucket\n    Properties:\n      BucketName: !Sub '${AWS::AccountId}-media-uploads-input'\n\n  OutputThumbnailsBucket:\n    Type: AWS::S3::Bucket\n    Properties:\n      BucketName: !Sub '${AWS::AccountId}-media-thumbnails-output'\n\n  MediaResizeFunction:\n    Type: AWS::Serverless::Function\n    Properties:\n      Handler: index.handler\n      Runtime: nodejs20.x\n      Environment:\n        Variables:\n          OUTPUT_BUCKET_NAME: !Ref OutputThumbnailsBucket\n      Events:\n        UploadEvent:\n          Type: S3\n          Properties:\n            Bucket: !Ref InputUploadBucket\n            Events: s3:ObjectCreated:*\n            Filter:\n              S3Key:\n                Rules:\n                  - Name: prefix\n                    Value: uploads/"
     }
    ],
    "doctorOrder": "Immediately isolate the S3 input and output buckets of the Lambda, add a key prefix filter and a reserved concurrency cap to break the recursive loop.",
    "dosage": "Reserved concurrency for image-processor: max 50 instances. S3 prefix filter: uploads/*. Separate output bucket: media-thumbnails.",
    "preventionRule": "Never configure S3 triggers without a prefix filter or write Lambda output back to the event source bucket. Enable AWS Recursive Loop Detection."
   },
   "serverless-timeout": {
    "title": "Prescription for Downstream Cold Start & Cascading Serverless Timeout",
    "diagnosis": "Synchronous API gateway waited on cold-started relational database, exhausting 30-second execution limits.",
    "files": [
     {
      "filename": "async-task-sqs-pattern.ts",
      "language": "typescript",
      "description": "Asynchronous decoupling: HTTP 202 Accepted with polling job status via SQS queue.",
      "content": "import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';\nimport { Request, Response } from 'express';\n\nconst sqs = new SQSClient({});\nconst QUEUE_URL = process.env.BACKGROUND_JOBS_QUEUE_URL!;\n\n/**\n * SRE Non-Blocking Ingestion Endpoint:\n * Responds in < 40ms with 202 Accepted and offloads work to asynchronous workers.\n */\nexport async function submitHeavyAnalysisJob(req: Request, res: Response) {\n  const jobId = crypto.randomUUID();\n  const payload = req.body;\n\n  await sqs.send(new SendMessageCommand({\n    QueueUrl: QUEUE_URL,\n    MessageBody: JSON.stringify({ jobId, payload }),\n    MessageDeduplicationId: jobId,\n    MessageGroupId: 'heavy-analysis'\n  }));\n\n  return res.status(202).json({\n    status: 'QUEUED',\n    jobId,\n    pollUrl: `/api/jobs/${jobId}/status`,\n    message: 'Work item queued safely. Upstream gateway timeout completely bypassed.'\n  });\n}"
     },
     {
      "filename": "lambda-provisioned-concurrency.tf",
      "language": "hcl",
      "description": "Terraform configuration keeping warm pool instances alive to eliminate cold starts.",
      "content": "# SRE Terraform: Eliminate Cold Starts with Provisioned Concurrency\nresource \"aws_lambda_provisioned_concurrency_config\" \"billing_hot_standby\" {\n  function_name                     = aws_lambda_function.billing_report_generator.function_name\n  provisioned_concurrent_executions = 5\n  qualifier                         = aws_lambda_alias.live.name\n}\n\nresource \"aws_lambda_alias\" \"live\" {\n  name             = \"live\"\n  description      = \"Active production alias\"\n  function_name    = aws_lambda_function.billing_report_generator.function_name\n  function_version = aws_lambda_function.billing_report_generator.version\n}"
     }
    ],
    "doctorOrder": "Move database client initialization outside the Lambda handler and adopt AWS RDS Proxy.",
    "dosage": "Configure RDS Proxy with idle_client_timeout = 1800s and max_connections_percent = 90.",
    "preventionRule": "Never create new database connection instances inside the executing function body."
   }
  },
  "modalTitle": "Official SRE Prescription & IaC Generator",
  "resilienceBadge": "ANTI-FAILURE THERAPY",
  "doctorOrdersTitle": "SRE DOCTOR'S ORDERS",
  "rxNumberPrefix": "Rx #",
  "dosageLabel": "DOSAGE / SLA",
  "preventionRuleLabel": "PREVENTIVE RULE",
  "copyFileCta": "Copy File",
  "copiedNotice": "Copied!",
  "downloadCta": "Download File",
  "verifiedFooter": "Files verified by the BugMortem SRE engine",
  "closeCta": "Close Medicine Cabinet"
 },
 "postMortem": {
  "title": "OFFICIAL INCIDENT AUTOPSY REPORT",
  "executiveSummary": "EXECUTIVE SUMMARY",
  "blastRadiusImpact": "BLAST RADIUS & BUSINESS IMPACT",
  "actionItems": "PREVENTATIVE & REMEDIAL ACTIONS",
  "escalateOnCall": "Escalate On-Call",
  "listenCoroner": "Play Coroner Verdict",
  "exportMarkdown": "Export Report to Markdown",
  "downloadCertificate": "Download Death Certificate (PDF)",
  "broadcastSlack": "Broadcast to Slack",
  "slackCopiedNotice": "Copied Slack Incident Broadcast to Clipboard!"
 },
 "dispatcher": {
  "openBtn": "Escalate On-Call",
  "modalTitle": "INCIDENT DISPATCHER & ESCALATION",
  "modalSubtitle": "Direct bridge to War Room and SRE on-call rotations",
  "channelLabel": "Target Notification Channel",
  "severityLabel": "Incident Severity",
  "summaryLabel": "Automated Diagnostic Summary",
  "copyBtn": "Copy Payload",
  "copiedBtn": "Copied to Clipboard!",
  "sendSlackBtn": "Dispatch to Slack Webhook",
  "dispatchSuccess": "Incident successfully dispatched to channel",
  "slackHeader": "PRODUCTION INCIDENT ESCALATION",
  "fieldIncidentId": "Incident Ref",
  "fieldService": "Impacted Service",
  "fieldStatus": "Status",
  "fieldSeverity": "Severity",
  "fieldWarRoom": "War Room Bridge",
  "slackJoinWarRoom": "Join War Room Live",
  "slackActionRequired": "Immediate SRE triage required",
  "fieldChecklist": "Remedial Checklist",
  "githubLabels": "Labels: incident, bugmortem, p0-outage",
  "closeBtn": "Close Dispatcher",
  "tabSlack": "Slack / Discord",
  "tabPagerDuty": "PagerDuty (Events API)",
  "tabGithub": "GitHub Issue",
  "pdRoutingKeyNotice": "Replace SERVICE_INTEGRATION_KEY with your real PagerDuty service key.",
  "openGithubBtn": "Open GitHub Issue"
 },
 "dispatcherModal": {
  "title": "INCIDENT DISPATCHER & ESCALATION",
  "subtitle": "Direct bridge to War Room, PagerDuty, and GitHub Issue triage.",
  "severityLabel": "Incident Severity",
  "serviceLabel": "Impacted Service",
  "commanderLabel": "Incident Commander",
  "channelLabel": "War Room Slack / Discord Bridge",
  "zoomLinkLabel": "War Room Video Bridge (Zoom)",
  "jiraTicketLabel": "Jira / Incident Key",
  "statusPageLabel": "Public Status Page URL",
  "copySummaryCta": "Copy Incident Summary (Markdown)",
  "copiedNotice": "Incident Summary Copied to Clipboard!",
  "dispatchPagingCta": "Dispatch Siren to On-Call (PagerDuty)",
  "pagingTriggered": "PagerDuty siren dispatched!",
  "closeCta": "Close Console"
 },
 "legal": {
  "privacyTitle": "Privacy Policy & Data Sovereignty",
  "termsTitle": "Terms of Incident Simulation & Disclaimer",
  "badge": "LEGAL & SRE COMPLIANCE",
  "lastUpdated": "Last Updated: November 2026",
  "closeBtn": "Close Legal Console",
  "tabPrivacy": "Privacy & Telemetry",
  "tabTerms": "Terms of Use & Disclaimer",
  "privacySection1Title": "Client-Side Telemetry & Data Sovereignty",
  "privacySection1Text": "BugMortem operates exclusively on client-side state. We do not store, ingest, or transmit proprietary production source code, stack traces, or internal database schemas to third-party tracking servers. Synthesized audio frequencies and PDF document generation take place entirely inside your browser memory context.",
  "privacySection2Title": "Third-Party Dispatchers (Slack / PagerDuty / GitHub)",
  "privacySection2Text": "Outbound dispatch templates generated via the Incident Dispatcher create formatted client payloads intended for manual execution or user-initiated browser popups. No automated API credentials are saved in persistent remote databases without explicit operator authorization.",
  "termsSection1Title": "Simulation Disclaimer & Production Safety",
  "termsSection1Text": "BugMortem provides simulated incident diagnostics, chaos engineering sandbox telemetry, and SRE architectural remediation templates. While prescriptions are developed based on battle-tested SRE industry standards, operators must validate all IaC manifests and Kubernetes configs in staging environments prior to production rollout.",
  "termsSection2Title": "Hackathon Submission Licensing",
  "termsSection2Text": "Built for the Devpost KIROWEEN 2026 Hackathon under the Spooky & Distinctive Developer Tools category. Distributed under the permissive open-source Apache 2.0 license.",
  "cookiesTitle": "Cookie Policy & Local Storage",
  "privacyArchHeader": "1. Zero Data Leak Architecture (Local Execution)",
  "privacyArchText": "BugMortem was designed with absolute confidentiality of telemetry and source code in mind. All incident analyses, stack trace parsing, post-mortem report generation and acoustic telemetry synthesis run 100% locally in the client browser environment.",
  "privacyArchBullets": [
   "No sensitive incident logs, passwords or code snippets ever leave your device.",
   "The application has no remote database for storing submitted logs.",
   "PDF Death Certificate generation and Markdown export compile exclusively in the browser engine."
  ],
  "privacyAdminHeader": "2. Data Administrator & Copyright",
  "privacyAdminText": "BugMortem is an independent developer tool created by Adam Gierczak (@AdamBabinicz) for the Kiroween 2026 hackathon (organized by AWS and Devpost).",
  "privacyScopeHeader": "3. Scope of Processed Information",
  "privacyScopeText": "BugMortem does not collect personal data, e-mail addresses or IP addresses. The only state stored by the application is environment preferences saved locally in the localStorage of your browser.",
  "privacyLocalStorageHeader": "4. Use of Browser Local Storage (localStorage)",
  "privacyLocalStorageIntro": "The table below lists all keys used by the application:",
  "privacyLocalStorageKeys": [
   {
    "key": "bugmortem_custom_incidents",
    "desc": "User-saved autopsies of custom incidents."
   },
   {
    "key": "bugmortem_theme",
    "desc": "Selected visual theme (Dracula Morgue vs. Clinical Daylight)."
   },
   {
    "key": "bugmortem_locale",
    "desc": "Active interface language (Polish / English)."
   },
   {
    "key": "bugmortem_audio_muted",
    "desc": "Mute state of the procedural EKG audio synthesizer."
   }
  ],
  "noTrackingHeader": "5. No Tracking Cookies & Zero Telemetry",
  "noTrackingText": "The application uses no third-party tracking scripts (no Google Analytics 4, Hotjar or advertising pixels).",
  "noTrackingBullets": [
   "Zero browser fingerprinting.",
   "Zero behavioral profiling.",
   "Full compliance with Google Consent Mode v2 (all tags blocked by default)."
  ],
  "userRightsHeader": "6. User Data Rights",
  "userRightsText": "You retain complete control over your data. You can delete individual saved incidents at any time using the trash icon in the archive, or wipe the storage completely.",
  "userRightsBullets": [
   "The right to immediately delete submitted incidents via a UI button.",
   "The right to export all generated reports in the open Markdown format."
  ],
  "purgeHeader": "7. Permanent Data Purge",
  "purgeText": "Clearing the browser cache or clicking the delete button permanently and irreversibly removes all saved data from your device.",
  "termsScopeHeader": "1. Scope & Educational Purpose",
  "termsScopeText": "BugMortem is an interactive forensic analysis and SRE simulation tool designed to demonstrate distributed system resilience patterns, 5-Whys root cause analysis and incident documentation automation.",
  "termsGeneralHeader": "2. Permitted Use",
  "termsGeneralText": "Use of the application is free of charge. Users may submit incident logs, simulate chaos scenarios and download Infrastructure-as-Code (IaC) templates for hardening their own systems.",
  "termsDisclaimerHeader": "3. SRE Patterns Disclaimer",
  "termsDisclaimerIntro": "While the SRE prescriptions and IaC templates (Terraform, Kubernetes, AWS SAM, PgBouncer, ESLint) reflect proven engineering practices:",
  "termsDisclaimerPoints": [
   "All generated files must be tested in a staging environment before production deployment.",
   "The project author is not liable for operational disruptions resulting from direct use of the templates.",
   "The tool is simulatory, educational and forensic in nature."
  ],
  "liabilityHeader": "4. Availability & Warranties (SLA)",
  "liabilityText": "The application is deployed statically on the Vercel Edge platform. All reasonable efforts are made to ensure continuity of service, but no SLA warranty is provided.",
  "licenseHeader": "5. Open-Source License & Copyright",
  "licenseText": "The BugMortem source code is made available under the permissive MIT license.",
  "licenseBullets": [
   "You may freely browse, fork and adapt the resilience patterns contained in the repository.",
   "All copyrights to the project are retained by Adam Gierczak (@AdamBabinicz)."
  ],
  "cookiesUsageHeader": "1. No Tracking Cookies",
  "cookiesUsageText": "BugMortem stores no tracking or advertising cookies. All state relies exclusively on the localStorage mechanism, which runs strictly inside the browser sandbox."
 },
 "cookies": {
  "bannerTitle": "SRE TELEMETRY & PRIVACY PREFERENCES",
  "bannerText": "BugMortem uses localized client cookies and session storage strictly for maintaining incident forensics state, user locale, and audio synthesizer preferences. Zero third-party ad tracking scripts.",
  "acceptAll": "Acknowledge & Accept Telemetry",
  "essentialOnly": "Essential Forensics Only",
  "customize": "Configure Preferences",
  "title": "Privacy & Cookie Settings",
  "description": "We use local storage and optional telemetry to verify system resilience.",
  "essential": "Essential",
  "essentialDesc": "Required for the application to function and maintain session state",
  "alwaysActive": "Always active",
  "analytics": "Analytics",
  "analyticsDesc": "Google Analytics 4 & GTM (Consent Mode v2)",
  "marketing": "Marketing",
  "marketingDesc": "Personalization and advertising campaigns",
  "rejectNonEssential": "Reject Optional",
  "savePreferences": "Save Preferences",
  "details": "Customize",
  "settings": "Cookie Settings",
  "closeAndReject": "Close and reject optional"
 },
 "footer": {
  "copyright": "© 2026 BugMortem. Developed by Adam Gierczak (@AdamBabinicz) for KIROWEEN 2026.",
  "disclaimer": "All production crashes depicted are based on actual canonical distributed system post-mortems.",
  "statusAllOperational": "All Diagnostic Systems Operational",
  "privacy": "Privacy Policy",
  "terms": "Terms of Service",
  "cookieSettings": "Cookie Settings"
 }
};
