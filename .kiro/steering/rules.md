# BugMortem: Steering Guidelines & Architectural Directives

## 1. Core Framework & Engine
- Framework: Next.js (App Router, static export optimized), React 19, TypeScript 5.x in strict mode.
- Package Manager: pnpm.
- Styling: Tailwind CSS v4 (`@import "tailwindcss";`, `@variant dark` in global styles).
- Icons: `lucide-react`.
- Testing: Vitest with `fast-check` for Property-Based Testing (PBT).

## 2. Aesthetics & Visual Discipline
- Theme: Cyber-Gothic / Digital Incident Morgue.
- Color Palette:
  - Deep Background: Obsidian `#0c0a09` (`stone-950`).
  - Alert / Flatline Accent: Crimson `#ef4444` / Rose `#f43f5e`.
  - Vital / Resurrection Accent: Toxic Emerald `#10b981` / `#059669`.
  - Foreground / Monospace: `#fafaf9` / `#a8a29e`.
- Zero-Inline-Styles Rule: Use pure Tailwind CSS utility classes. Never introduce arbitrary inline `style={{ ... }}` unless strictly required for Web Vitals CSS containment (`content-visibility: auto`).

## 3. Performance & Web Vitals (Target: 100/100)
- Maintain 100/100 on Google PageSpeed Insights (Performance, Accessibility, Best Practices, SEO).
- Keep Core Web Vitals strictly under budget: FCP < 1.0s, LCP < 1.0s, CLS = 0, TBT < 100ms.
- Render stabilization: Avoid continuous CSS layout-thrashing animations; use GPU-friendly hardware-accelerated transforms and steady glow shadows (`shadow-[0_0_8px_#f43f5e]`).

## 4. Internationalization & Ergonomics (i18n)
- 100% dictionary coverage: All user-facing strings must pass through `useTranslation()` / locale dictionaries in `src/i18n/locales/{en,pl}.ts`.
- No hardcoded strings in UI components, modals, buttons, or toasts.
- Typography: Apply automated orphan removal (`fixOrphans`) to maintain clean Polish and English typography.
- Mobile First: Zero horizontal overflow (`overflow-x: hidden`), full touch target compliance (WCAG AAA min 48x48px clickable areas), and global `cursor: pointer` on interactive elements.

## 5. Audio Synthesizer & Web Audio API
- Zero audio asset payload (0 KB external MP3/WAV files).
- Audio must be procedurally generated via the native browser Web Audio API.
- Support audio lifecycle:
  - P0 Critical: Continuous flatline emergency tone.
  - P1 Warning: Rhythmic simulated heartbeat pulses (~70 BPM).
  - Resurrection: Harmonic major revival chord upon code patch copy.
- Browser policy compliance: strictly respect user mute toggle and browser autoplay interaction restrictions.

## 6. Privacy & Security (Local-First Architecture)
- Zero Data Leakage: All stack traces, log dumps, and code diffs must be processed entirely client-side in the browser.
- No telemetry or unauthorized external API transmission of incident data.
- Google Consent Mode v2: Respect user cookie consent preferences with granular analytics/marketing toggling.