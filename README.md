# 💀 BugMortem

### *Digital Incident Morgue & Automated Post-Mortem Report Generator*

**Official Submission to the Devpost Hackathon: KIROWEEN (2026)**  
*Contest Track: Costume Contest (Spooky & Distinctive Developer Tools)*

[![Next.js](https://img.shields.io/badge/Next.js-16.4-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![pnpm](https://img.shields.io/badge/pnpm-fast-orange?style=flat-square&logo=pnpm)](https://pnpm.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](https://opensource.org/licenses/MIT)

---

## 🎃 About The Project (The Nightmare Incident Morgue)

Every software developer and SRE engineer has lived through this recurring nightmare: production is dead, monitoring is flatlining at **0 BPM**, and terminal logs are screaming an incomprehensible, blood-chilling stack trace.

**BugMortem** is an interactive, cyber-gothic digital morgue and automated post-mortem generator for software incidents. Instead of panic in the console, the application conducts a forensic autopsy of catastrophic bugs:

1. **Root Cause Analysis (RCA)** — Surgical diagnosis of underlying code pathology.
2. **Timeline of Doom** — Chronological reconstruction of the fatal seconds preceding the catastrophe.
3. **Side-by-Side Code Autopsy** — Immediate juxtaposition of the cursed code against its resurrected, safe SRE counterpart with 1-click clipboard copy.
4. **Custom Incident Ingestion (Live Autopsy Form)** — Interactive modal allowing engineers to ingest their own real-world production crashes, custom stack traces, and code snippets, instantly generating a dynamic post-mortem case study.
5. **SRE Post-Mortem Protocol Generator & Export** — Production-ready incident report generator with direct 1-click export to formatted Markdown (`.md`) for Jira, Confluence, and GitHub Issues.

---

## ⚰️ The Canonical Nightmare Presets & Custom Autopsy

BugMortem comes equipped with 4 curated, production-authentic autopsy presets, plus dynamic custom ingestion:

* **React SSR / Next.js:** *Hydration Mismatch Nightmare (P0)* — DOM tree divergence caused by illegal client-only `localStorage` access during initial server render.
* **Node.js Heap:** *Silent Memory Leak & Linux OOM Killer 137 (P0)* — Dangling `EventEmitter` listeners retaining 4GB of heap allocations until host kernel SIGKILL termination.
* **HTTP Handshake:** *CORS & Auth Headers Preflight Massacre (P1)* — Unhandled `OPTIONS` preflight requests causing token refresh failure cascades across cross-origin single-page applications.
* **PostgreSQL / Prisma:** *Connection Pool Starvation (P1)* — Bypassed `finally` blocks leaking connection handles under transient error spikes, locking checkout transactions.
* **⚡ Custom Incident Autopsy Engine:** Ingest any custom application crash, stack trace, and severity level to generate automated timelines, circuit-breaker mitigation patterns, and formal protocols persisted in `localStorage`.

---

## 🤖 Kiro Specs Compliance (`/.kiro`)

BugMortem was architected from the ground up for native integration with the **Kiro Agent**:

* `/.kiro/specs/bugmortem/requirements.md` — Formal specification of functional and non-functional requirements.
* `/.kiro/specs/bugmortem/tasks.md` — Roadmap of deployment, audit, and automated verification tasks for the Kiro agent.
* `/.kiro/steering/rules.md` — Architectural boundaries, code hygiene, and strict clean-code enforcement directives.

---

## 🏗️ Architecture & Ironclad Rules

* **Scalable i18n Architecture (EN / PL):** Complete bilingual support without binary flags; comprehensive dictionary structures located in `src/i18n/locales/` with English as default for international hackathon evaluation.
* **100% UI Key Coverage:** Zero hardcoded strings across UI components; every single label, badge, timestamp description, and post-mortem section resolves dynamically via `t.*`.
* **Zero Inline Styles:** Pure Tailwind CSS v4 design system adhering to strict zero-pill discipline and accessible typographic hierarchy.
* **Dual-Theme Adaptive Engine:** Seamless switching between deep cyber-gothic on-call night mode (`dark:`) and crisp clinical laboratory day mode (`light:`), with user preference persisted in `localStorage`.
* **Advanced Polish & Global Typography:** Integrated non-breaking space enforcement (`fixOrphans`) and modern CSS `text-wrap: pretty;` eliminating orphaned hanging conjunctions (*a, i, o, u, w, z, do, na, ze*).
* **Privacy & GDPR Compliance:** Legally compliant cookie consent banner with granular analytics/marketing preferences drawer and persistent consent state.
* **Mobile-First Ergonomics:** Fully responsive layouts tailored for mobile devices (320px–390px) up to ultra-wide desktop monitors without text clipping.

---

## 📁 Repository Structure

```text
bugmortem/
├── .kiro/                       # Kiro Agent Specs & Steering Directives
│   ├── specs/bugmortem/         # Requirements & Roadmap Tasks
│   └── steering/                # Architectural Rules
├── public/                      # Static Assets & Icons
├── src/
│   ├── app/
│   │   ├── globals.css          # Tailwind CSS v4 & Typography Wraps
│   │   ├── layout.tsx           # Metadata, Font Setup & i18n Skeleton
│   │   └── page.tsx             # Main Morgue Dashboard, Modal & Markdown Exporter
│   └── i18n/
│       ├── config.ts            # Default Locale Configuration (en)
│       ├── context.tsx           # i18n Context Provider & Hooks
│       ├── types.ts             # Dictionary & Incident Preset Interfaces
│       └── locales/
│           ├── en.ts            # Complete English Morgue Dictionary
│           └── pl.ts            # Complete Polish Morgue Dictionary
├── package.json
└── README.md