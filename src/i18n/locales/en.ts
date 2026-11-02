import { Dictionary } from '../types';

export const en: Dictionary = {
  title: 'BugMortem – AI Incident Autopsy & Post-Mortem Studio',
  subtitle: 'Forensic post-mortem investigation and automated SRE safe patterns for production outages.',
  badgeHackathon: 'Kiroween 2026 Hackathon Entry',
  statusLabel: 'Morgue Status',
  statusValue: 'Incident Active (P0)',
  customAutopsyBtn: '+ Ingest Custom Incident',
  presetsSectionTitle: 'Incident Autopsy Archive',
  autopsyTitle: 'Side-by-Side Code Autopsy',
  copyCodeBtn: 'Copy Resurrected Code',
  copiedCodeBtn: 'Copied to Clipboard!',
  crashedCodeTitle: 'Cursed Code (Production Crash)',
  crashedBadge: 'Fatal Error',
  resurrectedCodeTitle: 'Resurrected SRE Code (Safe Pattern)',
  resurrectedBadge: 'Circuit Breaker',
  stackTraceTitle: 'Raw Stack Trace',
  timelineTitle: 'Chronological Incident Timeline',
  postMortemTitle: 'Official Post-Mortem Report Protocol',
  exportReportBtn: 'Export Markdown Report',
  downloadSuccess: 'Markdown report downloaded successfully!',
  postMortemSummaryHeading: 'Executive Summary',
  postMortemImpactHeading: 'Blast Radius & Impact',
  postMortemActionsHeading: 'Preventative Action Items',
  customModalTitle: 'Ingest Custom Incident Autopsy',
  customModalSubtitle: 'Paste your production error logs and stack traces to run an automated post-mortem autopsy.',
  fieldIncidentTitle: 'Incident Title',
  fieldIncidentTitlePlaceholder: 'e.g. Distributed Lock Starvation in Payment Gateway',
  fieldCategory: 'Architecture Domain',
  categoryFrontend: 'Frontend',
  categoryBackend: 'Backend',
  categoryDatabase: 'Database',
  categoryInfra: 'Infrastructure',
  fieldSeverity: 'Incident Severity',
  severityP0: 'Fatal Outage (P0)',
  severityP1: 'Critical Degradation (P1)',
  severityP2: 'Major Glitch (P2)',
  fieldStackTrace: 'Raw Stack Trace / Error Snippet',
  fieldStackTracePlaceholder: 'Paste production stack trace or error log here...',
  fieldCrashedCode: 'Cursed Code (Optional)',
  fieldCrashedCodePlaceholder: 'Paste the snippet that triggered the crash...',
  fieldResurrectedCode: 'Resurrected SRE Code (Optional)',
  fieldResurrectedCodePlaceholder: 'Leave blank to auto-generate circuit breaker fallback...',
  btnCancel: 'Cancel',
  btnAnalyzeAndGenerate: 'Run Forensic Autopsy',
  validationErrorRequired: 'Please provide an incident title and stack trace.',
  footerRights: 'All rights reserved. Built for Kiroween 2026 by AWS & Devpost.',
  footerPrivacy: 'Privacy Policy',
  footerTerms: 'Terms of Service',
  footerCookieSettings: 'Cookie Preferences',
  cookieTitle: 'Cookie & Storage Transparency',
  cookieDesc: 'BugMortem uses localStorage strictly to persist your post-mortem incident autopsies and theme preferences locally. We do not track or sell your telemetry.',
  cookieAcceptAll: 'Accept All',
  cookieEssentialOnly: 'Essential Only',
  cookieCustomize: 'Customize Preferences',
  cookieDrawerTitle: 'Cookie & Privacy Preferences',
  cookieAnalytics: 'Analytics Storage',
  cookieAnalyticsDesc: 'Allows saving analytical metrics of simulated outage mitigations locally.',
  cookieMarketing: 'Marketing Storage',
  cookieMarketingDesc: 'BugMortem does not serve ads or third-party tracking scripts.',
  cookieSavePreferences: 'Save Preferences',

  common: {
    close: 'Close',
    cancel: 'Cancel',
    save: 'Save',
    back: 'Back',
    loading: 'Loading...',
  },

  legal: {
    modalTitle: 'Legal & Compliance',
    title: 'Legal & Compliance',
    terms: 'Terms of Service',
    termsTitle: 'Terms of Service',
    termsContent: 'BugMortem is an incident post-mortem analysis and autopsy tool developed for the Kiroween 2026 hackathon. Provided as-is for educational and incident mitigation purposes.',
    privacy: 'Privacy Policy',
    privacyTitle: 'Privacy Policy',
    privacyContent: 'All incident logs, custom autopsies, and post-mortems are processed locally in your browser storage. No proprietary outage data is uploaded to third-party tracking services.',
    cookies: 'Cookie Policy',
    cookiesTitle: 'Cookie & Local Storage Policy',
    cookiesContent: 'We use browser localStorage solely to persist your theme preference, incident drafts, and custom autopsy analyses across sessions.',
    disclaimer: 'SRE Disclaimer',
    disclaimerTitle: 'SRE & Reliability Disclaimer',
    disclaimerContent: 'Generated root causes and safe patterns are assistive recommendations. Always verify mitigation scripts in a staging sandbox before applying to production clusters.',
    gdpr: 'Data Protection & GDPR',
    gdprTitle: 'Data Protection & Sovereignty',
    gdprContent: 'BugMortem fully respects data privacy regulations under GDPR. You maintain 100% control over exported markdown autopsy reports and local history.',
  },

  presets: {
    'react-hydration': {
      id: 'react-hydration',
      badge: 'Frontend / SSR',
      severity: 'P0',
      title: 'React Hydration Mismatch & DOM Tree Collapse',
      desc: 'Unstable new Date() or window access during SSR triggers React Error #418, ripping out interactive client state.',
      crashedCode: `// ❌ CURSED CODE: Server/Client HTML divergence
export default function Header() {
  // Rendering dynamic date directly causes hydration crash
  return (
    <div>Current time: {new Date().toLocaleTimeString()}</div>
  );
}`,
      resurrectedCode: `// ✅ RESURRECTED SRE PATTERN: Hydration-Safe State Mount
import { useState, useEffect } from 'react';

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState('');

  useEffect(() => {
    setMounted(true);
    setTime(new Date().toLocaleTimeString());
  }, []);

  if (!mounted) return <div className="animate-pulse">Loading clock...</div>;
  return <div>Current time: {time}</div>;
}`,
      stackTrace: `Error: Hydration failed because the initial UI does not match what was rendered on the server.
    at throwOnHydrationMismatch (react-dom-client.development.js:12508)
    at tryToClaimNextHydratableInstance (react-dom-client.development.js:12534)
    at completeWork (react-dom-client.development.js:22170)`,
      timeline: [
        { time: '12:00:01 UTC', desc: 'Edge server renders pre-baked SSR HTML payload', isFatal: false },
        { time: '12:00:02 UTC', desc: 'Client browser executes hydration bundle at local millisecond mismatch', isFatal: false },
        { time: '12:00:03 UTC', desc: 'React throws Error #418; tearing unmounts interactive component tree', isFatal: true }
      ],
      postMortemReport: {
        summary: 'Fatal React hydration mismatch caused by non-deterministic SSR execution.',
        impact: 'Users experienced momentary flash of unstyled content and disabled form buttons across marketing landing pages.',
        actionItems: [
          'Enforce useEffect guards for all browser-only dynamic attributes.',
          'Add automated ESLint rule to flag new Date() inside server component JSX.',
          'Deploy synthetic visual regression testing across top 50 landing pages.'
        ]
      }
    },
    'connection-pool': {
      id: 'connection-pool',
      badge: 'Database / Aurora',
      severity: 'P0',
      title: 'The Connection Pool Death Spiral',
      desc: 'Unindexed analytical queries exhausted all 200 RDS Aurora connection slots, locking transactional checkout threads.',
      crashedCode: `// ❌ CURSED CODE: Leaking connection pool leases
export async function getOrderReport() {
  const client = await pool.connect();
  // Missing try/finally causes permanent lease leak on error
  const res = await client.query('SELECT * FROM orders WHERE heavy_calc = true');
  return res.rows;
}`,
      resurrectedCode: `// ✅ RESURRECTED SRE PATTERN: Resilient Scoped Leasing
export async function getOrderReport() {
  const client = await pool.connect();
  try {
    const res = await client.query('SELECT * FROM orders WHERE heavy_calc = true');
    return res.rows;
  } finally {
    client.release(); // Always release connection back to pool
  }
}`,
      stackTrace: `error: remaining connection slots are reserved for non-replication superuser connections
    at Parser.parseErrorMessage (pg-protocol/dist/parser.js:287:98)
    at Connection.handlePacket (pg/lib/connection.js:114:12)`,
      timeline: [
        { time: '14:02 UTC', desc: 'Heavy reporting cron begins unindexed sequential scan on orders table', isFatal: false },
        { time: '14:05 UTC', desc: 'Active database connection pool maxes out at 200/200 slots', isFatal: false },
        { time: '14:08 UTC', desc: 'Checkout service threads block; health checks fail with 503 Service Unavailable', isFatal: true }
      ],
      postMortemReport: {
        summary: 'Database connection starvation paralyzed transactional ingress during peak checkout window.',
        impact: '14,200 transactions aborted. $320,000 estimated revenue disruption across EU & US East gateways.',
        actionItems: [
          'Route all analytical batch queries to read-replica pools.',
          'Set statement_timeout = 3000ms at the application user role level.',
          'Add synthetic alert trigger when pool saturation exceeds 75% for 60 seconds.'
        ]
      }
    },
    'oom-reaper': {
      id: 'oom-reaper',
      badge: 'Runtime / Memory',
      severity: 'P0',
      title: 'The OOM Reaper Awakening',
      desc: 'Bulk CSV export loaded 2.5M order rows directly into a Node.js memory buffer, triggering Linux kernel OOM killer.',
      crashedCode: `// ❌ CURSED CODE: Loading unbounded datasets into RAM
app.get('/export-orders', async (req, res) => {
  const allOrders = await db.query('SELECT * FROM orders');
  const csvBuffer = Buffer.from(generateCsv(allOrders));
  res.send(csvBuffer);
});`,
      resurrectedCode: `// ✅ RESURRECTED SRE PATTERN: Backpressure Stream Pipeline
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
        { time: '09:15 UTC', desc: 'Bulk ledger CSV export initiated by enterprise tenant', isFatal: false },
        { time: '09:18 UTC', desc: 'Container memory spikes from 420MB to 1.95GB in 180 seconds', isFatal: false },
        { time: '09:20 UTC', desc: 'Kernel invokes oom-killer: "Killed process 1 (node)". Pod enters CrashLoopBackOff', isFatal: true }
      ],
      postMortemReport: {
        summary: 'Unbuffered memory allocation triggered recursive Kubernetes pod evictions.',
        impact: 'Core billing API pods crash-looped for 65 minutes across 8 worker nodes.',
        actionItems: [
          'Refactor all export endpoints to cursor-based streams with backpressure.',
          'Set container memory limit equal to request and enable cgroup v2 metrics.',
          'Offload bulk export generation to asynchronous AWS SQS workers.'
        ]
      }
    },
    'retry-storm': {
      id: 'retry-storm',
      badge: 'Concurrency / Network',
      severity: 'P1',
      title: 'The Cascading Retry Storm',
      desc: 'Immediate retries without jitter on a 500ms latency spike multiplied incoming requests by 500%, toppling upstream services.',
      crashedCode: `// ❌ CURSED CODE: Zero-delay synchronous retry storm
async function fetchWithRetry(url, retries = 5) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fetch(url);
    } catch (e) {
      // Immediate retry without delay or jitter amplifies stampede
    }
  }
}`,
      resurrectedCode: `// ✅ RESURRECTED SRE PATTERN: Exponential Backoff with Full Jitter
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
        { time: '18:30 UTC', desc: 'Transient GC pause causes 450ms query delay on profile database', isFatal: false },
        { time: '18:31 UTC', desc: 'Client pods trigger 5 immediate retries simultaneously within 50ms', isFatal: false },
        { time: '18:35 UTC', desc: 'Ingress gateway queue exhausts memory; 504 Gateway Timeouts issued', isFatal: true }
      ],
      postMortemReport: {
        summary: 'Linear retry amplification created a self-inflicted distributed denial of service attack.',
        impact: 'Authentication and profile services dropped 45,000 inbound requests during an 18-minute window.',
        actionItems: [
          'Mandate exponential backoff with full jitter across all internal RPC clients.',
          'Deploy circuit breakers to shed traffic before downstream pool saturation.',
          'Configure Envoy adaptive concurrency limits on edge gateways.'
        ]
      }
    }
  }
};

export default en;