import { Dictionary } from '../types';

export const en: Dictionary = {
  appName: 'BugMortem',
  appTagline: 'Digital Incident Morgue & Automated Post-Mortem Report Generator',
  hackathonBadge: 'Kiroween 2026 Hackathon Project',
  themeToggle: 'Toggle Theme',
  languageToggle: 'Language',
  incidentsListTitle: 'Incident Autopsy Archive',
  customAutopsyBtn: '+ Ingest Custom Incident',
  
  presetTitles: {
    'incident-1': 'The Connection Pool Death Spiral',
    'incident-2': 'The OOM Reaper Awakening',
    'incident-3': 'The DNS TTL Ghost Protocol',
    'incident-4': 'The Cascading Retry Storm',
  },

  autopsyModalTitle: 'Ingest Custom Incident Autopsy',
  autopsyTitleLabel: 'Incident Title / Summary',
  autopsyTitlePlaceholder: 'e.g. Distributed Lock Starvation in Payment Gateway',
  autopsyDescLabel: 'Outage Symptom & Stack Trace Snippet',
  autopsyDescPlaceholder: 'Describe the failure symptoms, error codes, connection timeouts, and what collapsed in production...',
  autopsyCategoryLabel: 'Architecture Domain',
  autopsySeverityLabel: 'Severity Level',
  autopsySubmitBtn: 'Generate Post-Mortem Autopsy',
  autopsyCancelBtn: 'Cancel',

  reportTitle: 'Post-Mortem Autopsy Report',
  reportBadge: 'Official Post-Mortem Record',
  severityLabel: 'Incident Severity',
  categoryLabel: 'Failure Domain',
  impactLabel: 'Observed Blast Radius & Business Impact',
  rootCauseLabel: 'Verified Root Cause (The Trigger)',
  timelineTitle: 'Chronological Incident Timeline',
  safePatternTitle: 'Automated SRE Safe Pattern & Circuit Breaker',
  actionItemsTitle: 'Preventative Action Items',
  exportMarkdownBtn: 'Export Markdown Report',
  copiedNotification: 'Report markdown copied to clipboard!',
  taskHeader: 'Corrective Action',
  ownerHeader: 'DRI / Owner',
  priorityHeader: 'Priority',
  deadlineHeader: 'Target SLA',

  footerCopyright: 'BugMortem. Built for the Kiroween 2026 Hackathon by AWS & Devpost.',
  footerDisclaimer: 'Zero telemetry. All incident autopsies and post-mortems run locally in your browser storage.',

  categories: {
    database: 'Database & Storage',
    memory: 'Memory & CPU Exhaustion',
    network: 'Networking & DNS',
    concurrency: 'Concurrency & Deadlocks',
    security: 'Security & Access Control',
    custom: 'Custom Incident Analysis',
  },

  severities: {
    'SEV-1': 'SEV-1 (Critical Outage)',
    'SEV-2': 'SEV-2 (Major Degradation)',
    'SEV-3': 'SEV-3 (Moderate Impact)',
    'SEV-4': 'SEV-4 (Minor Glitch)',
  },

  common: {
    close: 'Close',
    cancel: 'Cancel',
    save: 'Save',
    back: 'Back',
    loading: 'Loading...',
    status: 'Status',
    filter: 'Filter',
    search: 'Search incidents...',
  },

  cookieConsent: {
    bannerTitle: 'Cookie & Storage Transparency',
    bannerText: 'BugMortem uses localStorage strictly to persist your post-mortem incident autopsies and theme preferences locally. We do not track or sell your telemetry.',
    acceptAll: 'Accept & Acknowledge',
    customize: 'Preferences',
    decline: 'Decline Non-Essential',
    savePreferences: 'Save Preferences',
    necessaryOnly: 'Strictly Essential Only',
  },

  legal: {
    modalTitle: 'Legal, Compliance & Privacy Center',
    title: 'Legal & Compliance',
    terms: 'Terms of Service',
    termsTitle: 'Terms of Service & Usage',
    termsContent: 'BugMortem is an open-source incident autopsy simulator and post-mortem automation suite engineered for the Kiroween 2026 Hackathon. Provided as-is for educational and incident mitigation purposes under the MIT license.',
    privacy: 'Privacy Policy',
    privacyTitle: 'Data Privacy & Local Storage Sovereignty',
    privacyContent: 'All incident logs, custom autopsies, and post-mortems are processed locally in your browser storage. No proprietary outage data, logs, or stack traces are uploaded to external tracking servers or third-party telemetry aggregators.',
    cookies: 'Cookie Policy',
    cookiesTitle: 'Cookie & Local Storage Policy',
    cookiesContent: 'We use browser localStorage solely to persist your theme preference (dark/light), custom incident drafts, and autopsy reports across sessions. No advertising cookies or fingerprinting scripts are loaded.',
    disclaimer: 'SRE Disclaimer',
    disclaimerTitle: 'SRE & Reliability Engineering Disclaimer',
    disclaimerContent: 'Generated root causes, blast radius estimations, and safe patterns are assistive recommendations. Always verify mitigation scripts and architectural changes in a staging sandbox before applying to production clusters.',
    gdpr: 'Data Protection & GDPR',
    gdprTitle: 'Data Protection & GDPR Compliance',
    gdprContent: 'BugMortem complies with European GDPR standards. You maintain 100% control over your data. Deleting your browser cache or clearing local data completely removes all stored post-mortem artifacts.',
  },

  presets: [
    {
      id: 'incident-1',
      title: 'The Connection Pool Death Spiral',
      category: 'database',
      severity: 'SEV-1',
      summary: 'A sudden burst of unindexed analytical queries exhausted all 200 pool connections in RDS Aurora PostgreSQL, causing cascaded thread locking across 12 microservices.',
      impact: '100% checkout failure rate for 42 minutes. 14,200 transactions aborted. $320,000 estimated revenue disruption across EU & US East gateways.',
      rootCause: 'A rogue background reporting cron bypassed the read-replica pool and executed a sequential scan with a 60s timeout against the primary transactional database, locking transaction slots.',
      timeline: [
        { time: '14:02 UTC', event: 'Automated BI cron job triggers unindexed join query on orders table.', status: 'nominal' },
        { time: '14:05 UTC', event: 'Primary RDS CPU reaches 98%. Active connection pool maxes out at 200/200.', status: 'degraded' },
        { time: '14:08 UTC', event: 'Checkout service threads block waiting for available connections; health checks fail.', status: 'critical' },
        { time: '14:22 UTC', event: 'Incident Commander page triggered. Traffic diverted to static maintenance fallback.', status: 'critical' },
        { time: '14:38 UTC', event: 'Long-running query terminated via pg_terminate_backend(); connection pool resets.', status: 'nominal' },
        { time: '14:44 UTC', event: 'Egress traffic normalized. Zero 503 errors reported across edge gateway.', status: 'resolved' },
      ],
      safePattern: {
        name: 'Connection Pool Partitioning & Circuit Breaker',
        pattern: 'Isolate transactional endpoints from analytical batch workloads with strict per-route concurrency limits and exponential backoff shedding.',
        codeSnippet: `// SRE Safe Pattern: Resilient Connection Leasing with Timeout
import { Pool } from 'pg';

const primaryPool = new Pool({
  max: 50,
  connectionTimeoutMillis: 2000,
  idleTimeoutMillis: 10000,
  statement_timeout: 5000, // Hard fail long-running queries
});

export async function executeCriticalQuery<T>(sql: string, params: unknown[]): Promise<T> {
  const client = await primaryPool.connect();
  try {
    return await client.query(sql, params) as T;
  } finally {
    client.release(); // Always return connection to pool
  }
}`,
      },
      actionItems: [
        { task: 'Implement read-replica routing for all non-mutating analytical queries', owner: 'DBA Team', priority: 'high', deadline: '24 Hours' },
        { task: 'Enforce statement_timeout = 3000ms at the role level for app_user', owner: 'Infra SRE', priority: 'high', deadline: '48 Hours' },
        { task: 'Add synthetic connection pool saturation alert at 75% threshold', owner: 'Observability', priority: 'medium', deadline: '7 Days' },
      ],
    },
    {
      id: 'incident-2',
      title: 'The OOM Reaper Awakening',
      category: 'memory',
      severity: 'SEV-1',
      summary: 'A bulk CSV export of 2.5 million order records loaded entire data payloads into a Node.js Buffer, triggering the Linux kernel Out-Of-Memory (OOM) killer on Kubernetes nodes.',
      impact: 'Core billing API pods crash-looped for 65 minutes. 8 Kubernetes worker nodes evicted pods simultaneously, inducing cluster scheduling instability.',
      rootCause: 'Missing streaming ingestion: the API endpoint used res.json(await db.query()) instead of piped pipeline streams, allocating 4.2GB memory against a 2GB container limit.',
      timeline: [
        { time: '09:15 UTC', event: 'Enterprise customer requests all-time ledger CSV export via dashboard.', status: 'nominal' },
        { time: '09:18 UTC', event: 'Pod billing-api-6f78 memory spikes from 420MB to 1.95GB in 180 seconds.', status: 'degraded' },
        { time: '09:20 UTC', event: 'Kernel invokes oom-killer: "Killed process 1 (node)". Pod enters CrashLoopBackOff.', status: 'critical' },
        { time: '09:35 UTC', event: 'Node evictions cascade across cluster as Kubelet experiences memory pressure.', status: 'critical' },
        { time: '10:05 UTC', event: 'Export route temporarily disabled at Cloudflare edge worker level.', status: 'nominal' },
        { time: '10:20 UTC', event: 'Pods restabilized with strict memory limits and chunked streaming enabled.', status: 'resolved' },
      ],
      safePattern: {
        name: 'Backpressure-Aware Streaming Pipeline',
        pattern: 'Never load bulk datasets into memory buffers. Use cursor-based database streaming with Node.js Transform streams and client backpressure.',
        codeSnippet: `// SRE Safe Pattern: Chunked Stream Pipeline
import { pipeline } from 'stream/promises';
import { stringify } from 'csv-stringify';
import QueryStream from 'pg-query-stream';

export async function streamOrdersToClient(client: any, res: any) {
  const query = new QueryStream('SELECT id, amount, created_at FROM orders');
  const stream = client.query(query);
  const csvTransformer = stringify({ header: true });

  res.setHeader('Content-Type', 'text/csv');
  // Backpressure prevents OOM by pausing query stream when client socket is full
  await pipeline(stream, csvTransformer, res);
}`,
      },
      actionItems: [
        { task: 'Refactor all export endpoints to cursor-based streams with backpressure', owner: 'Backend Eng', priority: 'high', deadline: '3 Days' },
        { task: 'Set container memory limit equal to request and enable cgroup v2 metrics', owner: 'DevOps Lead', priority: 'high', deadline: '5 Days' },
        { task: 'Move bulk report generation to async background workers (AWS SQS + S3 pre-signed URLs)', owner: 'Architect', priority: 'medium', deadline: '14 Days' },
      ],
    },
    {
      id: 'incident-3',
      title: 'The DNS TTL Ghost Protocol',
      category: 'network',
      severity: 'SEV-2',
      summary: 'Legacy external payment processor endpoint IP address rotated without propagating through an internal Alpine Linux container environment due to a hardcoded 86400s DNS TTL.',
      impact: 'Intermittent 20% credit card transaction rejection rate for 3.5 hours. Customers reported sporadic network connection timeouts.',
      rootCause: 'Alpine Linux musl libc resolver cached getaddrinfo DNS responses indefinitely within Node.js process without honoring updated authoritative NS records.',
      timeline: [
        { time: '03:00 UTC', event: 'Payment gateway provider migrates upstream IP address to new subnet.', status: 'nominal' },
        { time: '03:15 UTC', event: 'Outbound HTTPS requests to api.paygate.com fail with ETIMEDOUT 198.51.100.24:443.', status: 'degraded' },
        { time: '04:45 UTC', event: 'Payment success metrics drop below 80% SLA threshold; PagerDuty alert fires.', status: 'critical' },
        { time: '06:10 UTC', event: 'SRE diagnoses stale IP resolution in musl libc resolver.', status: 'degraded' },
        { time: '06:30 UTC', event: 'CoreDNS caching configuration overridden with 60-second max TTL.', status: 'nominal' },
        { time: '06:45 UTC', event: 'Rolling restart of payment pods forced; all transactions succeed.', status: 'resolved' },
      ],
      safePattern: {
        name: 'Agent Keep-Alive & DNS Cache Eviction',
        pattern: 'Configure HTTP clients with custom DNS lookup agents that enforce maximum TTL expiration and graceful connection draining.',
        codeSnippet: `// SRE Safe Pattern: DNS Cache Eviction Agent
import https from 'https';
import dns from 'dns';

// Force short DNS resolution TTL for critical 3rd-party egress
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
        { task: 'Enforce max-cache TTL of 60s in CoreDNS for all external FQDN resolutions', owner: 'Network Eng', priority: 'high', deadline: '2 Days' },
        { task: 'Implement synthetic health check hitting payment processor canary endpoint', owner: 'QA Lead', priority: 'medium', deadline: '7 Days' },
        { task: 'Standardize HTTP client agents across all backend microservices', owner: 'Core Platform', priority: 'medium', deadline: '10 Days' },
      ],
    },
    {
      id: 'incident-4',
      title: 'The Cascading Retry Storm',
      category: 'concurrency',
      severity: 'SEV-1',
      summary: 'A momentary 500ms latency spike in the user profile microservice triggered aggressive immediate retries (5x) across 80 upstream web workers, amplifying incoming traffic by 500%.',
      impact: 'Total collapse of the downstream authentication and user profile databases. Ingress API gateway queue overflowed with 45,000 throttled requests.',
      rootCause: 'Linear retry loops without jitter or exponential backoff turned a minor transient blip into a self-inflicted distributed denial of service (DoS) storm.',
      timeline: [
        { time: '18:30 UTC', event: 'Minor GC pause on user-db causes 450ms query delay.', status: 'nominal' },
        { time: '18:31 UTC', event: 'Client services immediately fire 5 synchronized retries within 50ms window.', status: 'degraded' },
        { time: '18:32 UTC', event: 'Inbound requests jump from 2,000 req/sec to 12,500 req/sec.', status: 'critical' },
        { time: '18:35 UTC', event: 'Profile service ingress queues exhaust memory; 504 Gateway Timeouts issued.', status: 'critical' },
        { time: '18:55 UTC', event: 'Global rate-limiter engaged at Envoy proxy; traffic dropped to 10% baseline.', status: 'nominal' },
        { time: '19:15 UTC', event: 'Full exponential backoff with full jitter deployed to upstream services.', status: 'resolved' },
      ],
      safePattern: {
        name: 'Exponential Backoff with Full Decorrelated Jitter',
        pattern: 'Prevent thundering herds by spacing retries with exponential growth and random uniform jitter.',
        codeSnippet: `// SRE Safe Pattern: Exponential Backoff with Full Jitter
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
      // Full Jitter formula: sleep = rand(0, min(maxDelay, base * 2^attempt))
      const calculatedMax = Math.min(maxDelayMs, baseDelayMs * Math.pow(2, attempt));
      const jitteredSleep = Math.floor(Math.random() * calculatedMax);
      await new Promise((resolve) => setTimeout(resolve, jitteredSleep));
    }
  }
}`,
      },
      actionItems: [
        { task: 'Audit all HTTP client libraries to ban zero-delay immediate retries', owner: 'App Sec / SRE', priority: 'high', deadline: '24 Hours' },
        { task: 'Deploy circuit breaker middleware (e.g. cockatiel / opossum) to all critical RPC calls', owner: 'Backend Team', priority: 'high', deadline: '3 Days' },
        { task: 'Configure Envoy edge adaptive concurrency limits to shed load before database collapse', owner: 'Infra SRE', priority: 'medium', deadline: '7 Days' },
      ],
    },
  ],
};

export default en;