# BugMortem: Implementation Tasks & Execution Checklist

## Phase 1: Core Forensic Engine & Cyber-Gothic HUD
- [x] 1. Setup Next.js App Router, TypeScript strict mode, Tailwind CSS v4, and Lucide icons.
- [x] 2. Cyber-Gothic HUD with interactive visual Flatline ECG monitor and theme switching.
- [x] 3. Digital Autopsy Engine parsing raw stack traces, error dumps, and runtime exceptions.
- [x] 4. Forensic Timeline Reconstruction (step-by-step collapse event sequencing).
- [x] 5. Side-by-side Resurrection Code Diff view with syntax highlighting and 1-click copy.
- [x] 6. SRE Incident Post-Mortem Markdown Report Exporter.
- [x] 7. Interactive Horror Presets (Hydration Mismatch, DB Pool Starvation, Node OOM 137).

## Phase 2: Auditory Realism, Resilience & Data Sovereignty
- [x] 8. Zero-asset procedural Web Audio API synthesizer (P0 Flatline, P1 Heartbeat pulse, Resurrection Chord, mute toggle).
- [x] 9. Rigorous Property-Based Testing (PBT) suite via Vitest & fast-check (33/33 invariant assertions passing).
- [x] 10. Horror Preset Library expansion (Cascading Retry Storm, CORS Preflight Nightmare).
- [x] 11. Local-First Privacy architecture (client-side processing, zero data telemetry, Google Consent Mode v2).
- [x] 12. Full dual-locale dictionary coverage (English & Polish i18n with automated orphan suppression).

## Phase 3: Kiro Automation & Forensic Artifact Export
- [x] 13. Automated Kiro agent test runner hook in `.kiro/hooks/` triggered on file modification.
- [x] 14. Dedicated SRE Autopsy Agent specification in `.kiro/agents/` for incident analysis.
- [x] 15. Cyber-Gothic "Death Certificate" PDF generator with hospital seal, vital stats, and code diff.

## Phase 4: Enterprise SRE Architecture & Resilience Extensions
- [x] 16. Architecture Blast Radius Heatmap visualizing 5-tier microservice topology and Patient Zero isolation.
- [x] 17. Live Chaos Engineering Sandbox with real-time telemetry gauges (Throughput, p99 Latency, Error Rate) and SRE mitigation rollback.
- [x] 18. Multi-Platform On-Call Incident Dispatcher generating structured payloads for Slack War Rooms, PagerDuty CEF v2, and GitHub Issues.
- [x] 19. SRE Forensic Coroner Voice Verdict using browser-native speech synthesis (localized in EN and PL).
- [x] 20. Expansion to 6 Canonical SRE Nightmares: Serverless Cold Start Cascade & Gateway 504 Timeout.

## Phase 5: AWS SRE & Morgue Polish
- [x] 21. Procedural defibrillator audio sequence in `playDefibrillatorShock()`: two-stage Web Audio API synthesis (800 ms capacitor charge sweep 280→1400 Hz sawtooth through BPF Q=12 + 250 ms discharge thump 120→35 Hz sub-bass + low-pass filtered white noise contact burst + 200 ms silence gap) prepended to the resurrection C-major chord; `useAudioEngine` heartbeat delay extended to 2100 ms.
- [x] 22. 1-Click Slack Incident Broadcast button (📢) in the Post-Mortem report toolbar: `handleCopySlackBroadcast()` builds a fully formatted Slack Markdown message (🚨 header, severity emoji P0→🔴/P1→🟡, Executive Summary, Blast Radius & Impact, numbered Action Items, UTC timestamp) and writes it to the system clipboard via `navigator.clipboard.writeText` with `execCommand` fallback; violet confirmation banner; 100% i18n dictionary coverage (EN: `broadcastSlack` / `slackCopiedNotice`, PL: `Nadaj na Slack` / `Broadcast Slack skopiowany do schowka`).
- [x] 23. 7th canonical SRE preset `s3-lambda-loop` (AWS S3 ⇄ Lambda Recursive Loop Death Spiral, P0, AWS / Serverless): full EN & PL incident definition (cursed code without prefix filter, resurrected code with `uploads/` prefix guard + isolated `THUMBNAIL_BUCKET` + `AWS_LAMBDA_FUNCTION_NAME` recursion guard), authentic CloudWatch `TooManyRequestsException 429` stack trace, 3-event timeline, 3-step replayer (1.2k→14.2k→142k RPS), 5-whys, blast radius, chaos metrics, post-mortem; `BlastRadiusMap` case (`worker-pool` → patient-zero, `edge-gateway|database|auth-service` → degraded); `SrePrescriptionModal` case with `s3-lambda-circuit-breaker.tf` (Terraform: separate S3 buckets, prefix filter, `reserved_concurrent_executions: 50`, SQS DLQ) and `aws-lambda-resilience.yaml` (AWS SAM: `RecursiveLoop: Terminate`, CloudWatch throttle alarm, SNS on-call alert).
