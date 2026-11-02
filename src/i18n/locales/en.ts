import { Dictionary } from '../types';

export const en: Dictionary = {
  badgeHackathon: 'KIROWEEN 2026 HACKATHON ENTRY',
  title: 'Digital Post-Mortem Incident Morgue',
  subtitle: 'Automated catastrophe reconstruction, root cause autopsy (RCA), and code resurrection.',
  statusLabel: 'SERVICE VITALS',
  statusValue: '0 BPM (FLATLINE / CRASH)',
  presetsSectionTitle: 'LEGENDARY PRODUCTION NIGHTMARES (SELECT CRASH FOR AUTOPSY):',
  crashedBadge: 'FATAL / P0',
  resurrectedBadge: 'VERIFIED / SRE READY',
  autopsyTitle: 'CODE AUTOPSY (CURSED BEFORE VS RESURRECTED AFTER)',
  crashedCodeTitle: 'CODE CONDEMNED TO DEATH (CRASH STATE)',
  resurrectedCodeTitle: 'RESURRECTED CODE (EXORCISM & SRE FIX)',
  copyCodeBtn: 'Copy code',
  copiedCodeBtn: 'Copied!',
  stackTraceTitle: 'CRASH DUMP / STACK TRACE',
  timelineTitle: 'TIMELINE OF DOOM (RECONSTRUCTION)',
  postMortemTitle: 'OFFICIAL INCIDENT PROTOCOL (SRE POST-MORTEM)',
  postMortemSummaryHeading: 'INCIDENT SUMMARY',
  postMortemImpactHeading: 'BUSINESS & USER IMPACT',
  postMortemActionsHeading: 'PREVENTATIVE DIRECTIVES & ACTION ITEMS',
  exportReportBtn: 'Export Protocol (.md)',
  downloadSuccess: 'Protocol downloaded successfully!',

  // Custom Autopsy Form & Modal
  customAutopsyBtn: '+ Conduct Custom Autopsy',
  customModalTitle: 'Conduct Custom Incident Autopsy',
  customModalSubtitle: 'Ingest your own production crash, stack trace, and generate an official SRE post-mortem protocol.',
  fieldIncidentTitle: 'Incident Title',
  fieldIncidentTitlePlaceholder: 'e.g. Unhandled Promise Rejection in Payment Gateway',
  fieldCategory: 'Subsystem Category',
  fieldSeverity: 'Severity Level',
  fieldCrashedCode: 'Cursed Code (Faulty Implementation)',
  fieldCrashedCodePlaceholder: '// Paste the code snippet that caused the catastrophe...',
  fieldStackTrace: 'Stack Trace / Error Dump',
  fieldStackTracePlaceholder: 'Error: Cannot read properties of undefined (reading \'id\')\n    at ProcessPayment (checkout.ts:42)...',
  fieldResurrectedCode: 'Resurrected Code (Fix / Exorcism)',
  fieldResurrectedCodePlaceholder: '// Paste or leave empty to auto-generate SRE safe fallback pattern...',
  btnAnalyzeAndGenerate: 'Execute Autopsy & Generate Protocol',
  btnCancel: 'Cancel',
  validationErrorRequired: 'Please provide at least Incident Title and Stack Trace.',

  // Categories & Severities
  categoryFrontend: 'Frontend / SSR',
  categoryBackend: 'Backend / Runtime',
  categoryDatabase: 'Database / Storage',
  categoryInfra: 'Infra / Network',
  severityP0: 'Fatal (P0)',
  severityP1: 'Critical (P1)',
  severityP2: 'Major (P2)',

  presets: {
    'react-hydration': {
      id: 'react-hydration',
      badge: 'REACT SSR',
      severity: 'Fatal (P0)',
      title: 'Next.js Hydration Nightmare',
      desc: 'DOM tree mismatch between SSR and browser client caused by reading localStorage directly during initial render.',
      crashedCode: `// ❌ CODE CONDEMNED TO DEATH (SSR mismatch)
export default function UserCart() {
  const theme = localStorage.getItem('theme') || 'light';
  const timestamp = new Date().toLocaleTimeString();

  return (
    <div className={theme}>
      <h1>Customer Cart</h1>
      <span>Rendered: {timestamp}</span>
    </div>
  );
}`,
      resurrectedCode: `// ✅ RESURRECTED CODE (Identical server & client render)
'use client';
import { useState, useEffect } from 'react';

export default function UserCart() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    setMounted(true);
    setTheme(localStorage.getItem('theme') || 'light');
  }, []);

  if (!mounted) {
    return <div className="skeleton-placeholder" aria-hidden="true" />;
  }

  return (
    <div className={theme}>
      <h1>Customer Cart</h1>
      <span>Safe state after hydration</span>
    </div>
  );
}`,
      stackTrace: `Error: Hydration failed because the initial UI does not match what was rendered on the server.
Warning: Expected server HTML to contain a matching <div> in <body>.
    at UserCart (src/components/UserCart.tsx:4:17)
FATAL: React Client DOM Mutation Aborted [Status: RIP]`,
      timeline: [
        { time: '14:23:01', desc: 'Server rendered SSR HTML with default dark theme' },
        { time: '14:23:02', desc: 'Browser received HTML and triggered client hydration' },
        { time: '14:23:02.120', desc: 'Detected DOM mismatch: localStorage returned light mode on client', isFatal: true },
        { time: '14:23:02.340', desc: 'React aborted tree reconciliation and threw Fatal Hydration Error P0', isFatal: true }
      ],
      postMortemReport: {
        summary: 'Critical React hydration failure triggered by direct access to browser globals (localStorage) during SSR.',
        impact: '100% of returning users with custom theme preferences faced a white screen of death on initial checkout page render.',
        actionItems: [
          'Enforce ESLint rule no-restricted-globals for localStorage and window.',
          'Introduce two-pass rendering skeleton pattern for client-only state hydration.'
        ]
      }
    },
    'node-heap-oom': {
      id: 'node-heap-oom',
      badge: 'NODE.JS HEAP',
      severity: 'Fatal (P0)',
      title: 'Silent Memory Leak (OOM Killer)',
      desc: 'Uncleaned EventEmitter listener causing cumulative memory accumulation until execution terminated by Linux OOM Killer.',
      crashedCode: `// ❌ CODE CONDEMNED TO DEATH (Uncleaned Listener)
import { EventEmitter } from 'events';
const eventHub = new EventEmitter();

export async function handleUserSession(req, res) {
  const sessionData = new Array(100_000).fill('leak_payload_data');
  eventHub.on('audit_event', () => {
    console.log('Session audited:', sessionData.length);
  });
  res.end('Session processed');
}`,
      resurrectedCode: `// ✅ RESURRECTED CODE (Cleaned Listener & WeakRef)
import { EventEmitter } from 'events';
const eventHub = new EventEmitter();

export async function handleUserSession(req, res) {
  const sessionData = new Array(100_000).fill('leak_payload_data');
  const onAudit = () => {
    console.log('Session audited:', sessionData.length);
  };

  eventHub.once('audit_event', onAudit);
  res.on('finish', () => {
    eventHub.removeListener('audit_event', onAudit);
  });

  res.end('Session processed');
}`,
      stackTrace: `<--- Last few GCs --->
[34:0x55bc148] 42100 ms: Mark-sweep (reduce) 4091.2 (4140.5) -> 4088.1 (4140.5) MB
<--- JS stacktrace --->
FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory
Killed (SIGKILL 137 by Linux OOM)`,
      timeline: [
        { time: '02:00:00', desc: 'Microservice started under nominal load (Heap: 85MB)' },
        { time: '02:45:00', desc: 'Audit listener count exceeded warning threshold (> 10,000 listeners)' },
        { time: '03:12:15', desc: 'V8 garbage collector entered thrashing cycle (99% CPU spend in GC)', isFatal: true },
        { time: '03:12:44', desc: 'Host kernel dispatched SIGKILL 137 to Node process due to OOM limit breach', isFatal: true }
      ],
      postMortemReport: {
        summary: 'Catastrophic memory leak caused by dangling EventEmitter closures retaining 4GB of heap allocations.',
        impact: 'Core authentication service dropped 100% of user requests during peak traffic, requiring automated container reboot.',
        actionItems: [
          'Activate automated leak canary tests in CI pipeline using heapdump snapshot comparisons.',
          'Cap defaultMaxListeners on all production event buses and trigger alerts on listener growth.'
        ]
      }
    },
    'cors-auth-abyss': {
      id: 'cors-auth-abyss',
      badge: 'HTTP HANDSHAKE',
      severity: 'Critical (P1)',
      title: 'CORS & Auth Headers Massacre',
      desc: 'Missing preflight OPTIONS handling and Access-Control headers causing cross-origin requests with Bearer tokens to be aborted.',
      crashedCode: `// ❌ CODE CONDEMNED TO DEATH (Missing CORS headers)
export default function handler(req, res) {
  if (req.method === 'POST') {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ error: 'No token' });
    return res.status(200).json({ status: 'ok' });
  }
  return res.status(405).end();
}`,
      resurrectedCode: `// ✅ RESURRECTED CODE (Full Preflight & Auth Handling)
export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://bugmortem.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method === 'POST') {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ error: 'No token' });
    return res.status(200).json({ status: 'ok' });
  }
  return res.status(405).end();
}`,
      stackTrace: `Access to fetch at 'https://api.bugmortem.internal/v1/auth' from origin 'https://app.bugmortem.com'
has been blocked by CORS policy: Response to preflight request doesn't pass access control check:
No 'Access-Control-Allow-Origin' header is present on the requested resource.
Status: 405 Method Not Allowed`,
      timeline: [
        { time: '09:00:10', desc: 'Frontend client dispatched cross-origin POST with Authorization bearer' },
        { time: '09:00:10.050', desc: 'Browser issued automated preflight OPTIONS request' },
        { time: '09:00:10.120', desc: 'Backend rejected OPTIONS request with 405 Method Not Allowed', isFatal: true },
        { time: '09:00:10.125', desc: 'Browser blocked main request and raised silent client network failure', isFatal: true }
      ],
      postMortemReport: {
        summary: 'Cross-origin preflight requests rejected by backend endpoint due to unhandled HTTP OPTIONS method.',
        impact: 'All web dashboard sessions unable to refresh authentication tokens, causing mass logout across all active tenants.',
        actionItems: [
          'Implement global CORS middleware handling preflight across all edge gateways.',
          'Add end-to-end integration tests verifying preflight headers for all protected API routes.'
        ]
      }
    },
    'postgres-pool-exhaustion': {
      id: 'postgres-pool-exhaustion',
      badge: 'POSTGRESQL / PRISMA',
      severity: 'Major (P1)',
      title: 'Database Connection Pool Starvation',
      desc: 'Failure to release connection back to pool inside catch/finally blocks, causing pool depletion and query timeout cascades.',
      crashedCode: `// ❌ CODE CONDEMNED TO DEATH (Unreleased Connection)
export async function transferFunds(req, res) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await client.query('UPDATE accounts SET bal = bal - 100');
    if (result.rowCount === 0) throw new Error('Account missing');
    await client.query('COMMIT');
    client.release();
  } catch (err) {
    // BUG: client.release() is skipped on throw!
    res.status(500).json({ error: err.message });
  }
}`,
      resurrectedCode: `// ✅ RESURRECTED CODE (Guaranteed Release in Finally)
export async function transferFunds(req, res) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await client.query('UPDATE accounts SET bal = bal - 100');
    if (result.rowCount === 0) throw new Error('Account missing');
    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    return res.status(500).json({ error: err.message });
  } finally {
    client.release(); // Always executed
  }
  return res.status(200).json({ status: 'transferred' });
}`,
      stackTrace: `error: timeout exceeded when trying to connect
    at Pool.connect (/node_modules/pg-pool/index.js:210:19)
    at transferFunds (src/services/billing.ts:3:28)
FATAL: remaining connection slots are reserved for non-replication superuser connections`,
      timeline: [
        { time: '11:15:00', desc: 'Transient payment gateway error triggered 100 exceptions' },
        { time: '11:16:30', desc: 'Pool connection limit reached (20/20 active connections leaked)' },
        { time: '11:17:00', desc: 'Incoming queries queued until client connection timeout (30,000ms)', isFatal: true },
        { time: '11:18:00', desc: 'PostgreSQL rejected all healthcheck pings with connection starvation', isFatal: true }
      ],
      postMortemReport: {
        summary: 'Database connection pool starvation triggered by exception pathways bypassing client release handles.',
        impact: 'Payment processing system hung for 14 minutes, resulting in cascading 504 Gateway Timeouts across checkout services.',
        actionItems: [
          'Enforce try/finally discipline across all direct pool connection usages via linter checks.',
          'Migrate critical endpoints to managed connection-pooling proxies (PgBouncer) with aggressive idle disconnects.'
        ]
      }
    }
  },

  cookieTitle: 'Privacy Policy & Cookies',
  cookieDesc: 'We use cookies and analytical tools (GTM/GA4) to ensure proper site operation and anonymous traffic analysis.',
  cookieAcceptAll: 'Accept all',
  cookieEssentialOnly: 'Essential only',
  cookieCustomize: 'Adjust preferences',
  cookieDrawerTitle: 'Cookie Consent Preferences',
  cookieAnalytics: 'Analytics cookies (GA4/GTM)',
  cookieAnalyticsDesc: 'Used to measure site usage and interaction metrics anonymously.',
  cookieMarketing: 'Marketing cookies',
  cookieMarketingDesc: 'Used for conversion tracking and campaigns.',
  cookieSavePreferences: 'Save preferences',
  footerRights: 'All rights reserved.',
  footerPrivacy: 'Privacy Policy',
  footerTerms: 'Terms of Service',
  footerCookieSettings: 'Cookie Settings'
};