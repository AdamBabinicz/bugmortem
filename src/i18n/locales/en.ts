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
  exportPdfBtn: 'Death Certificate (PDF)',
  downloadSuccess: 'Markdown report downloaded successfully!',
  downloadPdfSuccess: 'Death Certificate (PDF) generated successfully!',
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
  statusP0: 'Active Incident (P0 Critical)',
  statusP1: 'Telemetry Warning (P1 Major)',
  statusResurrected: 'Service Resurrected (Healthy · 200 OK)',
  footerRights: 'All rights reserved. Built for Kiroween 2026 by AWS & Devpost.',
  footerPrivacy: 'Privacy Policy',
  footerTerms: 'Terms of Service',
  footerCookieSettings: 'Cookie Preferences',
  cookieTitle: 'Cookie & Storage Transparency',
  cookieDesc: 'BugMortem processes incident analyses strictly in-browser. Google Analytics 4 telemetry is blocked by default and only activates upon your explicit consent (Google Consent Mode v2).',
  cookieAcceptAll: 'Accept All',
  cookieEssentialOnly: 'Essential Only',
  cookieCustomize: 'Customize Preferences',
  cookieDrawerTitle: 'Cookie & Privacy Preferences',
  cookieAnalytics: 'Analytics Telemetry (GA4 / GTM)',
  cookieAnalyticsDesc: 'Anonymous pageview and interaction telemetry governed by Google Consent Mode v2.',
  cookieMarketing: 'Marketing Storage',
  cookieMarketingDesc: 'BugMortem does not serve ads, profile users, or utilize marketing pixels.',
  cookieSavePreferences: 'Save Preferences',

  cookies: {
    title: 'Cookie & Privacy Transparency',
    description: 'BugMortem processes your incident data and reports locally in your browser. Visitor analytics (GA4) are subject to explicit user consent.',
    essential: 'Essential Storage',
    essentialDesc: 'Required for core session state: dark/light theme persistence, language settings, and local incident autopsy caching.',
    alwaysActive: 'Always Active',
    analytics: 'Analytics Telemetry (Google Analytics 4)',
    analyticsDesc: 'Anonymous traffic metrics (GA4 / GTM) protected by Google Consent Mode v2 (disabled by default; activated strictly upon explicit consent).',
    marketing: 'Marketing Storage',
    marketingDesc: 'Zero advertising scripts, tracking pixels, or third-party behavioral profiling.',
    savePreferences: 'Save Preferences',
    acceptAll: 'Accept All',
    rejectAll: 'Essential Only',
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
    lastUpdated: 'Last updated: November 5, 2026',

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

    privacyArchHeader: 'Zero Incident Data Leakage — Local-First Architecture',
    privacyArchText:
      'BugMortem is architected on a strict local-first data model for all sensitive incident data. All autopsy processing — stack trace parsing, code comparison, post-mortem generation, and PDF death certificate rendering — takes place entirely within your browser\'s memory. Your production code and error logs never leave your device.',
    privacyArchBullets: [
      'Raw incident logs, code snippets, and stack traces exist solely in browser JavaScript heap memory and are never transmitted to remote servers or third-party AI endpoints.',
      'Custom incident autopsies you save are written exclusively to your browser\'s localStorage.',
      'Markdown exports and PDF death certificates are rendered 100% client-side using browser-native engines.',
      'No incident data or stack traces are ever forwarded to analytics or error-logging beacons.',
    ],

    privacyAdminHeader: 'Data Controller',
    privacyAdminText:
      'Because BugMortem processes incident data exclusively in your local browser environment, you are the sole controller and processor of that information. The BugMortem project team does not receive, store, or have access to any logs or code entered into the application.',

    privacyScopeHeader: 'Scope of Data Processing',
    privacyScopeText:
      'The application only touches data you explicitly provide (incident titles, error logs, code snippets) solely to generate the interactive autopsy and downloadable files. It is never synced to external databases or sold.',

    privacyLocalStorageHeader: 'Local Storage (localStorage) and Cookies',
    privacyLocalStorageIntro:
      'BugMortem stores session preferences locally and — strictly upon voluntary consent — sets analytics cookies:',
    privacyLocalStorageKeys: [
      { key: 'bm_cookie_consent',           desc: 'Stores your telemetry and cookie consent choice (Google Consent Mode v2).' },
      { key: 'bugmortem_custom_incidents',   desc: 'Local JSON storage of custom incident autopsies created by the user.' },
      { key: 'bugmortem_locale',             desc: 'Selected user interface language ("en" or "pl").' },
      { key: 'bm_theme',                     desc: 'Selected color theme preference ("dark" or "light").' },
      { key: '_ga / _ga_* (optional)',       desc: 'Google Analytics 4 session cookies stored ONLY after clicking "Accept All" in the cookie banner.' },
    ],

    privacyNoTrackingHeader: 'Telemetry Transparency & Privacy Protection',
    privacyNoTrackingText:
      'The application utilizes Google Tag Manager (GTM-K77D4NHB) and Google Analytics 4 (G-KVMM511ZWD) strictly for anonymous visitor analytics, under the rigid enforcement of Google Consent Mode v2. The following principles guarantee your privacy:',
    privacyNoTrackingBullets: [
      'Default Zero Tracking (Consent Mode v2): Prior to explicit consent in the cookie banner, all analytics and advertising storage parameters are set to "denied".',
      'Zero Code Profiling: Incident logs, stack traces, and code snippets are strictly excluded from telemetry events.',
      'No Advertising Networks: No Meta (Facebook) Pixel, LinkedIn Insight Tag, TikTok Pixel, or DSP/SSP advertising trackers.',
      'No Invasive Session Replay: No Hotjar, FullStory, Smartlook, or Microsoft Clarity screen recording.',
      'No External Error Beacons: No Sentry or Datadog RUM beacons transmitting stack traces externally.',
      'No CDN Fonts: All typefaces and icons are self-hosted or system-native.',
    ],

    privacyUserRightsHeader: 'Your Rights — GDPR & CCPA',
    privacyUserRightsText:
      'You maintain full control over all data stored in your browser and your telemetry consent status:',
    privacyUserRightsBullets: [
      'Right of Access — Open DevTools → Application → Local Storage / Cookies to view all stored values at any time.',
      'Right to Erasure — Clear all stored data instantly via the purge instructions below or your browser\'s site data settings.',
      'Right to Withdraw Consent — Update or revoke your analytics consent at any time via "Cookie Preferences" in the footer.',
      'Data Sovereignty — No personal data or production error logs are ever sold to third parties.',
    ],

    privacyPurgeHeader: 'One-Click Local Data Purge',
    privacyPurgeText:
      'To permanently erase all BugMortem data and analytics cookies from your browser, open browser DevTools (F12) → Application → Clear site data, or delete all keys prefixed with "bm_" and "bugmortem_".',

    // ── Cookie Policy ───────────────────────────────────────────────────────
    cookies: 'Cookie Policy',
    cookiesTitle: 'Cookie & Local Storage Policy',
    cookiesUsageHeader: 'Cookie & Local Storage Usage',
    cookiesUsageText:
      'BugMortem relies primarily on browser localStorage. HTTP cookies (Google Analytics 4: _ga, _ga_*) are set only when the user grants voluntary consent via the cookie banner. Without consent or under "Essential Only", Google Consent Mode v2 prevents analytics cookies from being written, preserving full sovereign operation.',
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