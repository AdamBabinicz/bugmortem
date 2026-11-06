# 💀 BugMortem

### *Digital Incident Morgue & Automated Post-Mortem Report Generator*

**Official Submission — Devpost Hackathon: KIROWEEN 2026**  
*Track: Costume Contest · Spooky & Distinctive Developer Tools*

[![Live Demo](https://img.shields.io/badge/Demo-bugmortem.vercel.app-10b981?style=flat-square&logo=vercel)](https://bugmortem.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16.4-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-2.1-6e9f18?style=flat-square&logo=vitest)](https://vitest.dev/)
[![pnpm](https://img.shields.io/badge/pnpm-12-orange?style=flat-square&logo=pnpm)](https://pnpm.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](https://opensource.org/licenses/MIT)

---

## 🎃 What Is BugMortem?

Every SRE engineer knows the nightmare: production is dead, the monitor is **flatlined at 0 BPM**, and the terminal is screaming an incomprehensible stack trace at 3 AM.

**BugMortem** is an interactive, cyber-gothic digital morgue and automated post-mortem studio for software incidents. Instead of panic in the console, it conducts a forensic autopsy of catastrophic production bugs — complete with a reactive ECG heart monitor, procedural audio telemetry, architectural blast radius heatmap, live chaos engineering sandbox, SRE forensic voice verdict, on-call dispatcher, and one-click post-mortem exports (Markdown & printable PDF Death Certificate).

> *"Where dead services come for their autopsy."*

---

## ✨ Core Features

### 🔬 Digital Autopsy Engine
- **Side-by-Side Code Autopsy** — Cursed code (crash state) vs. Resurrected SRE code (safe pattern), with one-click clipboard copy.
- **Chronological Incident Timeline** — Forensic reconstruction of the fatal seconds preceding each catastrophe.
- **Raw Stack Trace Viewer** — Monospace crash log display with adaptive light/dark theme contrast.
- **Custom Incident Ingestion** — Live autopsy form: paste any real-world stack trace, choose severity & category, and instantly generate a full post-mortem case study persisted in `localStorage`.

### 🗺️ Architecture Blast Radius Heatmap
- **Interactive Microservice Topology** — Real-time visualization of 5 critical architectural tiers: `Client SPA`, `Edge Gateway`, `Auth Service`, `Database`, and `Worker Pool`.
- **Cascading Contamination** — Identifies "Patient Zero" and traces cascading dependency degradation across network boundaries.
- **Visual Recovery Transition** — Watches services transition dynamically from critical red alarm to emerald `200 OK` upon applying the resurrected SRE code pattern.

### ⚡ Live Chaos Engineering Sandbox
- **In-Browser Outage Injection** — Trigger 4 real-world failure modes:
  1. *Edge Latency Spike* (+2540ms on Edge Gateway, cascading UI timeouts)
  2. *DB Connection Pool Exhaustion* (100% PostgreSQL connection exhaustion, 503 cascades)
  3. *Worker Memory Leak (OOM)* (RAM saturation in background async worker queue)
  4. *Auth Token Storm* (Massive JWT rejection wave triggering auth storm)
- **Real-Time Telemetry Bar** — Live indicators for Throughput (RPS), p99 Latency, and Error Rate (%) responding instantly to injected chaos.
- **1-Click SRE Mitigation Rollback** — Instantly execute automated circuit breakers and restore nominal telemetry.

### 📢 On-Call Incident Dispatcher & Exporter
- **Multi-Platform Escalation Modal** — 1-click generator for standardized incident alerts:
  - **Slack / Discord** — War Room notification with `@channel`, severity, blast radius, and direct bridge links.
  - **PagerDuty / Opsgenie** — Standard Common Event Format (CEF v2 JSON) payload with routing keys and dedup tags.
  - **GitHub Issues** — Formatted post-mortem issue template with triage checklist, severity tags, and a direct link to open the prefilled ticket.
- **1-Click Clipboard Copy** with animated confirmation state.

### 🎙️ SRE Forensic Coroner Voice Verdict
- Procedural, browser-native speech synthesis (`window.speechSynthesis`) delivering spoken incident findings.
- Customized voice profile: lowered rate (0.9) and deep pitch (0.82) for an authoritative forensic coroner tone.
- Fully localized in Polish (`pl-PL`) and English (`en-US`).
- Zero external audio files or dependencies (0 KB runtime overhead).

### 📜 Cyber-Gothic Incident Death Certificate (PDF)
- Browser-native vector print engine (`@page { size: A4 portrait }`) creating an authentic official Certificate of Outage Death.
- Complete with gothic hospital seal, biometrics, stack trace biopsy, and SRE coroner signature.
- 100% client-side rendering with zero heavy PDF runtime bloat.

### 📄 SRE Post-Mortem Protocol & Markdown Export
- One-click export to formatted `.md` Markdown — ready to paste into Jira, Confluence, GitHub Issues, or Notion.
- Structured report with all required SRE sections: Executive Summary, Blast Radius & Impact, Preventative Action Items, Timeline, Stack Trace, Code Autopsy.

### 🫀 Reactive ECG Heart Monitor
The Hero HUD contains a live ECG waveform that reacts to the active incident state:

| State | Waveform | Color |
|---|---|---|
| **P0 — Fatal / Flatline** | Flat horizontal line with micro-jitter | Crimson `#ef4444` |
| **P1 — Active Warning** | Animated QRS peaks at 90 BPM | Amber `#f59e0b` |
| **Resurrected — Healthy** | Animated QRS peaks at 70 BPM | Toxic Emerald `#10b981` |

The HUD status label also transitions: *"Active Incident (P0 Critical)"* → *"Telemetry Warning (P1 Major)"* → *"Service Resurrected (Healthy · 200 OK)"*.

### 🔊 Procedural Web Audio API Synthesizer
Zero external files. Zero dependencies. 100% browser-native Web Audio API:

| Event | Sound |
|---|---|
| **P0 Fatal Incident** | Continuous 750 Hz sawtooth routed through resonant low-pass filter + 0.6 Hz LFO tremolo — eerie, atmospheric flatline alarm |
| **P1 Warning Incident** | Rhythmic 880 Hz sine blips at 90 BPM — clinical ECG monitor pulse synchronized with the waveform animation |
| **Copy Resurrected Code** | Uplifting C5 → E5 → G5 harmonic sweep with vibrato — the resurrection chime, followed by a calm 70 BPM heartbeat |

- Muted by default to comply with browser autoplay policies.
- One-click `Volume2 / VolumeX` toggle inside the HUD.
- Full `AudioContext` suspend/resume lifecycle with zero memory leaks on unmount.
- Fully localized `aria-label` in EN and PL.

### 🌍 Full Bilingual i18n (EN / PL)
- Complete EN and PL translations for every UI string, status label, legal document, dispatcher template, and chaos scenario.
- Zero hardcoded strings across all components.
- Language switcher in the top navigation bar.
- Locale preference persisted in `localStorage`.

### 🔒 Legal & Privacy Documents
- **Privacy Policy** — Full data sovereignty statement, exact `localStorage` keys documented, GDPR/CCPA user rights, one-click purge guide.
- **Terms of Service** — Scope disclaimer, AS-IS engineering disclaimer for Resurrection Code Patches, MIT license reference.
- **Cookie Policy** — Transparent disclosure of zero HTTP tracking cookies, with Google Consent Mode v2 support for optional analytics.
- Localized LegalModal with scrollable sections, structured headers, and bullet lists.

### 🍪 Cookie & Privacy Consent
- GDPR-compliant banner on first visit with granular analytics/marketing preference drawer.
- Consent state persisted in `localStorage` under `bm_cookie_consent`.

---

## ⚰️ The 6 Canonical Nightmare Presets

BugMortem ships with six production-authentic, hand-crafted autopsy presets covering the most feared categories of production disasters:

| # | Preset | Severity | Domain |
|---|---|---|---|
| 1 | **React Hydration Mismatch & DOM Tree Collapse** | P0 | Frontend / SSR |
| 2 | **The Connection Pool Death Spiral** | P0 | Database / Aurora |
| 3 | **The OOM Reaper Awakening** | P0 | Runtime / Memory |
| 4 | **The Cascading Retry Storm** | P1 | Concurrency / Network |
| 5 | **The CORS Preflight Nightmare** | P1 | Network / Security |
| 6 | **Serverless Cold Start Cascade & Gateway 504 Timeout** | P0 | Cloud / Serverless |

Each preset includes: incident description, cursed crash code, resurrected SRE safe pattern, raw stack trace, chronological timeline with fatal event markers, and a full post-mortem report with Executive Summary, Blast Radius, and Preventative Action Items.

---

## 🧪 Property-Based Testing Suite (PBT)

BugMortem includes a rigorous property-based testing suite built with **[fast-check](https://github.com/dubzzz/fast-check)** and **[Vitest](https://vitest.dev/)**, fulfilling the Kiroween 2026 hackathon PBT judging criteria.

### Run the tests

```bash
pnpm test          # run once (CI mode)
pnpm test:pbt      # identical alias
pnpm test:pbt:watch # watch mode for development
```

### Results

```
 Test Files  1 passed (1)
      Tests  33 passed (33)
   Duration  ~900ms
```

### The 4 Invariants (150 random runs each)

| Invariant | Property | Runs |
|---|---|---|
| **1 — Resilience** | The autopsy engine never throws on any input — fuzz strings, null, unicode, control chars, 50KB payloads, `<script>` injection | 150 × 9 props |
| **2 — Severity Validity** | `classifySeverity()` always resolves to `'P0' | 'P1'`; the function is idempotent | 150 × 6 props |
| **3 — Timeline Integrity** | `buildTimeline()` always produces exactly 3 events in strict non-decreasing chronological order; first event non-fatal, last event fatal | 150 × 5 props |
| **4 — Export Fidelity** | `generateMarkdownReport()` always contains all 3 required SRE headers: *Executive Summary*, *Blast Radius*, *Preventative Action Items* | 150 × 8 props |

Plus a **Regression suite** (5 tests) covering 14 known edge-case inputs including empty incidents, null bytes, and very long strings.

### Tested modules

The pure autopsy engine (`src/utils/autopsyEngine.ts`) exports all testable functions:

- `classifySeverity(raw)` — severity string → `'P0' | 'P1'`
- `parseStackTrace(raw)` — raw string → `StackFrame[]` (V8 + Firefox formats)
- `buildTimeline(frames, category, anchor)` — structured `TimelineEvent[]`
- `buildPostMortem(title, badge, sev)` → `PostMortemReport`
- `generateMarkdownReport(incident, labels)` → full SRE markdown string
- `createAutopsyIncident(input)` → complete `IncidentPreset`
- `fixOrphans(text)` → typographic utility

---

## 🔒 Privacy & Data Sovereignty

BugMortem is architected on a **zero-data-leakage, local-first model**:

- All incident logs, stack traces, and post-mortem reports are processed exclusively inside your browser's JavaScript runtime.
- **No data ever leaves your device without user initiation.** Zero telemetry or logging endpoints receiving incident data.
- Google Consent Mode v2 default `denied` state protects privacy for any optional tag managers.
- No HTTP cookies are set by BugMortem core features.

### Exact `localStorage` keys written by BugMortem

| Key | Purpose |
|---|---|
| `bm_cookie_consent` | Your cookie/storage preference (set on first visit) |
| `bugmortem_custom_incidents` | JSON of your saved custom incident autopsies |
| `bugmortem_locale` | Your selected UI language (`"en"` or `"pl"`) |
| `bm_theme` | Your selected color theme (`"dark"` or `"light"`) |

To purge all data: DevTools → Application → Local Storage → delete all keys prefixed `bm_` or `bugmortem_`.

---

## 🏗️ Repository Structure

```text
bugmortem/
├── .kiro/
│   ├── specs/bugmortem/         # Kiro Agent specs (requirements & tasks)
│   └── steering/rules.md        # Architectural rules & code hygiene directives
├── public/                      # Static assets, favicon, OG image, robots.txt
├── src/
│   ├── __tests__/
│   │   └── autopsy-pbt.test.ts  # 33-test PBT suite (fast-check + vitest)
│   ├── app/
│   │   ├── globals.css          # Tailwind CSS v4 + typography utilities
│   │   ├── layout.tsx           # Metadata, font setup, provider wiring
│   │   └── page.tsx             # Main morgue dashboard — state, handlers, JSX
│   ├── components/
│   │   ├── BlastRadiusMap.tsx   # Interactive microservice blast radius heatmap
│   │   ├── ChaosSandbox.tsx     # Live chaos engineering sandbox & telemetry
│   │   ├── CookieBanner.tsx     # GDPR cookie consent banner (Consent Mode v2)
│   │   ├── EcgMonitor.tsx       # Reactive SVG ECG waveform (3 states)
│   │   ├── IncidentDispatcherModal.tsx # Slack / PagerDuty / GitHub dispatcher
│   │   ├── Providers.tsx        # App-level context providers
│   │   ├── ScrollToTop.tsx      # Scroll restoration utility
│   │   └── legal/
│   │       ├── CookieSettingsModal.tsx  # Granular cookie preferences drawer
│   │       └── LegalModal.tsx   # Privacy Policy / ToS / Cookie Policy modal
│   ├── context/
│   │   └── ThemeContext.tsx     # Dark / light theme context + persistence
│   ├── hooks/
│   │   └── useAudioEngine.ts   # React hook — AudioContext lifecycle & program switching
│   ├── i18n/
│   │   ├── config.ts            # Default locale configuration
│   │   ├── context.tsx          # i18n provider, hook, locale persistence
│   │   ├── types.ts             # Dictionary, IncidentPreset & LegalDictionary types
│   │   └── locales/
│   │       ├── en.ts            # Complete English dictionary (all keys)
│   │       └── pl.ts            # Complete Polish dictionary (all keys)
│   └── utils/
│       ├── autopsyEngine.ts     # Pure autopsy engine — all PBT-tested functions
│       └── soundEngine.ts       # Web Audio API synthesizer class (SoundEngine)
├── vitest.config.ts             # Vitest configuration with @/* path alias
├── package.json                 # Scripts: dev, build, test, test:pbt
├── pnpm-workspace.yaml          # pnpm workspace + approved build scripts
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- pnpm 12+

### Install & Run

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Run production build
pnpm build

# Run property-based test suite
pnpm test
```

---

## 🎨 Design System

- **Theme:** Cyber-Gothic — obsidian backgrounds, toxic emerald (`#10b981`), crimson (`#ef4444`)
- **Framework:** Next.js 16 App Router + React 19 + TypeScript strict mode
- **Styling:** Tailwind CSS v4 — zero inline styles, full dark/light adaptive theming
- **Icons:** lucide-react
- **Typography:** Polish orphan elimination (`fixOrphans`) + CSS `text-wrap: pretty`

---

## 📜 License

MIT © 2026 Adam Gierczak (@AdamBabinicz).  
Built for the **Kiroween 2026 Hackathon** organized by AWS & Devpost.

> *"The service is dead. Long live the service."*