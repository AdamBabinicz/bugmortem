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
  audioToggleEnable: 'Audio Telemetry: Muted — click to enable',
  audioToggleDisable: 'Audio Telemetry: Enabled — click to mute',
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

  cookies: {
    title: 'Cookie & Privacy Transparency',
    description: 'BugMortem uses local browser storage strictly to persist incident reports, autopsy notes, and your interface preferences. No personal telemetry is sold.',
    essential: 'Essential Storage',
    essentialDesc: 'Required for core session state, dark/light theme persistence, and local incident autopsy caching.',
    alwaysActive: 'Always Active',
    analytics: 'Analytics Storage',
    analyticsDesc: 'Allows anonymous client-side performance timing for simulated SRE incident mitigations.',
    marketing: 'Marketing Storage',
    marketingDesc: 'Zero advertising scripts, tracking pixels, or third-party behavioral profiling.',
    savePreferences: 'Save Preferences',
    acceptAll: 'Accept All',
    rejectAll: 'Reject Non-Essential',
    hideDetails: 'Hide Details',
    customize: 'Preferences',
  },

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
    lastUpdated: 'Last updated: November 4, 2026',

    // ── Terms of Service ────────────────────────────────────────────────────
    terms: 'Terms of Service',
    termsTitle: 'Terms of Service',

    termsScopeHeader: 'Scope of Tool',
    termsScopeText:
      'BugMortem is a forensic educational and SRE diagnostic studio submitted to the Kiroween 2026 Hackathon, organized by AWS & Devpost. It provides side-by-side incident autopsy, automated post-mortem report generation, and curated "Resurrection Code Patches" — algorithmic recovery patterns derived from real-world SRE runbooks.',

    termsGeneralHeader: 'General Terms',
    termsGeneralText:
      'BugMortem is provided "as-is" and "as-available" for educational and incident-mitigation purposes only. No express or implied warranties — including merchantability, fitness for a particular purpose, or non-infringement — are granted. Use of this tool in any production decision-making context is entirely at the user\'s own risk.',

    termsDisclaimerHeader: '⚠ Engineering Disclaimer — Resurrection Code Patches',
    termsDisclaimerIntro:
      'All "Resurrection Code Patches" generated by BugMortem are algorithmic recovery recommendations produced by a language-model-assisted engine. They are NOT certified production fixes. Before deploying any suggested pattern to a live environment:',
    termsDisclaimerPoints: [
      'Validate all generated patches in an isolated staging or canary environment.',
      'Have the patch reviewed by a qualified senior engineer or SRE before merging.',
      'Run your full integration and regression test suite against the patched service.',
      'Treat AI-generated code the same as untrusted external code — audit it before execution.',
      'Never bypass CI/CD gates, deployment gates, or approval workflows based solely on a BugMortem recommendation.',
    ],

    termsLiabilityHeader: 'Limitation of Liability',
    termsLiabilityText:
      'To the fullest extent permitted by applicable law, the authors, contributors, and sponsors of BugMortem shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from reliance on generated post-mortem reports, stack-trace analyses, or SRE safe patterns — including damages resulting from data loss, revenue disruption, or production incidents.',

    termsLicenseHeader: 'Open Source License & Intellectual Property',
    termsLicenseText:
      'BugMortem is released under the MIT License. You are free to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the software under the following conditions:',
    termsLicenseBullets: [
      'The MIT License notice and copyright notice must be included in all copies or substantial portions of the software.',
      'All incident preset data, SRE pattern descriptions, and post-mortem templates included in this project are original works by the BugMortem contributors.',
      '"Kiroween" and "AWS" are trademarks of their respective owners. BugMortem is an independent entry and is not endorsed by or affiliated with Amazon Web Services, Inc.',
    ],

    // ── Privacy Policy ──────────────────────────────────────────────────────
    privacy: 'Privacy Policy',
    privacyTitle: 'Privacy Policy & Data Sovereignty',

    privacyArchHeader: 'Zero Data Leakage — Local-First Architecture',
    privacyArchText:
      'BugMortem is architected on a strict local-first, zero-egress data model. All processing — stack trace parsing, autopsy generation, post-mortem rendering — occurs exclusively inside your browser\'s JavaScript runtime. No data ever leaves your device.',
    privacyArchBullets: [
      'Raw incident logs and stack traces exist only in JavaScript heap memory during your session and are never serialized to a remote endpoint.',
      'Custom incident autopsies you save are written exclusively to your own browser\'s localStorage — not to any server, database, or cloud storage.',
      'Post-mortem Markdown exports are generated client-side and downloaded directly to your filesystem.',
      'No WebSocket, XHR, or fetch call is made to any analytics, telemetry, or logging endpoint.',
      'No service worker intercepts or caches your incident data.',
    ],

    privacyAdminHeader: 'Data Controller',
    privacyAdminText:
      'Because BugMortem processes all data exclusively in your local browser environment, you are the sole controller and processor of your own incident data. The BugMortem project team does not receive, store, or have access to any data you enter into the application.',

    privacyScopeHeader: 'Scope of Data Processing',
    privacyScopeText:
      'The application only touches data you explicitly provide: incident titles, stack trace snippets, code fragments, and autopsy notes. This data is used solely to render the in-browser UI and generate downloadable Markdown reports. It is never transmitted, shared, or sold.',

    privacyLocalStorageHeader: 'Exact localStorage Keys Used',
    privacyLocalStorageIntro:
      'BugMortem writes to the following localStorage keys in your browser. You can inspect and delete these at any time via your browser\'s DevTools → Application → Local Storage:',
    privacyLocalStorageKeys: [
      { key: 'bm_cookie_consent',           desc: 'Stores your cookie/storage preference (accepted, essential, or custom JSON object). Set on first visit.' },
      { key: 'bugmortem_custom_incidents',   desc: 'JSON array of custom incident autopsies you have created and saved. Never synced externally.' },
      { key: 'bugmortem_locale',             desc: 'Your selected UI language ("en" or "pl"). Defaults to "en" if not set.' },
      { key: 'bm_theme',                     desc: 'Your selected color theme ("dark" or "light"). Persists across sessions.' },
    ],

    privacyNoTrackingHeader: 'No Third-Party Telemetry, Ads, or Trackers',
    privacyNoTrackingText:
      'BugMortem contains zero third-party tracking, advertising, or analytics scripts. The following are explicitly absent from this application:',
    privacyNoTrackingBullets: [
      'No Google Analytics, Google Tag Manager, or Firebase Analytics.',
      'No Meta Pixel, LinkedIn Insight Tag, or any social media tracker.',
      'No Hotjar, FullStory, Heap, Mixpanel, Segment, or behavioral analytics SDK.',
      'No Sentry, Datadog RUM, or any error-monitoring beacon that transmits stack traces externally.',
      'No advertising networks, demand-side platforms, or retargeting pixels.',
      'No CDN-hosted fonts or assets that create third-party requests (all assets are self-hosted or inlined).',
    ],

    privacyUserRightsHeader: 'Your Rights — GDPR & CCPA',
    privacyUserRightsText:
      'Because BugMortem is a fully local-first application with no server-side data storage, there is no personal data held by the BugMortem project team to access, correct, or delete on your behalf. Nevertheless, you hold the following rights over data stored in your own browser:',
    privacyUserRightsBullets: [
      'Right of Access — Open DevTools → Application → Local Storage to view all stored keys and values at any time.',
      'Right to Erasure — Clear all BugMortem data instantly via the one-click purge function below, or via DevTools.',
      'Right to Portability — Export any incident as a Markdown file using the "Export Markdown Report" button.',
      'Right to Withdraw Consent — Update or revoke your storage consent preferences via the "Cookie Preferences" button in the footer at any time.',
      'CCPA — BugMortem does not "sell" personal information because it does not collect or store personal information on any server.',
    ],

    privacyPurgeHeader: 'One-Click Local Data Purge',
    privacyPurgeText:
      'To permanently erase all BugMortem data from your browser, open your browser DevTools (F12), navigate to Application → Local Storage → your domain, and delete all keys prefixed with "bm_" or "bugmortem_". Alternatively, clearing your browser\'s site data for this domain removes all stored data instantly.',

    // ── Cookie Policy ───────────────────────────────────────────────────────
    cookies: 'Cookie Policy',
    cookiesTitle: 'Cookie & Local Storage Policy',
    cookiesUsageHeader: 'Local Storage Usage',
    cookiesUsageText:
      'BugMortem does not set HTTP cookies. It uses browser localStorage exclusively. The four keys documented in the Privacy Policy above are the complete and exhaustive list of all browser storage written by this application.',
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
    },
    'cors-nightmare': {
      id: 'cors-nightmare',
      badge: 'Network / Security',
      severity: 'P1',
      title: 'The CORS Preflight Nightmare',
      desc: 'Missing CORS headers on API gateway caused all cross-origin preflight OPTIONS requests to fail with 403, blocking the entire frontend SPA.',
      crashedCode: `// ❌ CURSED CODE: Missing CORS headers on Express API
const express = require('express');
const app = express();

// No CORS middleware — browser preflight OPTIONS blocked with 403
app.get('/api/data', (req, res) => {
  res.json({ data: 'sensitive payload' });
});`,
      resurrectedCode: `// ✅ RESURRECTED SRE PATTERN: Explicit CORS Hardening
const express = require('express');
const cors = require('cors');
const app = express();

const ALLOWED_ORIGINS = [
  'https://app.example.com',
  'https://staging.example.com',
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(\`CORS: Origin \${origin} not allowed\`));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-ID'],
  credentials: true,
  maxAge: 86400, // Cache preflight for 24h
}));

app.options('*', cors()); // Explicit OPTIONS preflight handler`,
      stackTrace: `Access to fetch at 'https://api.example.com/data' from origin 'https://app.example.com'
has been blocked by CORS policy: Response to preflight request doesn't pass access control check:
No 'Access-Control-Allow-Origin' header is present on the requested resource.
    at fetch (<anonymous>)
    at loadUserData (app.bundle.js:1:4821)`,
      timeline: [
        { time: '10:00 UTC', desc: 'Frontend SPA deployed to new subdomain app.example.com', isFatal: false },
        { time: '10:01 UTC', desc: 'All API calls fail — browser preflight OPTIONS returns 403 Forbidden', isFatal: false },
        { time: '10:02 UTC', desc: 'Entire frontend app non-functional; CORS policy blocks every cross-origin fetch', isFatal: true }
      ],
      postMortemReport: {
        summary: 'Missing CORS middleware on Express API gateway caused 100% of cross-origin preflight requests to fail with 403.',
        impact: 'Frontend SPA completely non-functional for all users after subdomain migration. Full service outage for 22 minutes.',
        actionItems: [
          'Deploy explicit CORS allowlist middleware before any route handler.',
          'Add automated preflight OPTIONS smoke test to CI/CD deployment pipeline.',
          'Audit all API gateway configs for missing CORS headers before subdomain changes.'
        ]
      }
    }
  }
};

export default en;