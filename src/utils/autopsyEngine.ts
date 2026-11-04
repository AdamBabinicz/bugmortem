/**
 * BugMortem Autopsy Engine
 * ─────────────────────────────────────────────────────────────────────────────
 * Pure, deterministic functions that power the Digital Autopsy workflow.
 * No React, no DOM, no browser APIs — fully unit/property-testable.
 *
 * Exported surface:
 *   classifySeverity()       — map raw severity strings → canonical 'P0' | 'P1'
 *   parseStackTrace()        — extract structured frames from a raw stack string
 *   buildTimeline()          — construct a non-decreasing forensic timeline
 *   buildPostMortem()        — assemble a PostMortemReport from incident fields
 *   generateMarkdownReport() — render the full SRE post-mortem markdown document
 *   createAutopsyIncident()  — compose a complete IncidentPreset from form inputs
 *   fixOrphans()             — typographic utility (Polish hanging conjunction fix)
 */

import type { IncidentPreset, PostMortemReport, TimelineEvent } from '../i18n/types';

// ── Types ─────────────────────────────────────────────────────────────────────

export type CanonicalSeverity = 'P0' | 'P1';

export interface StackFrame {
  raw: string;
  file?: string;
  line?: number;
  col?: number;
}

export interface AutopsyInput {
  title: string;
  stackTrace: string;
  category: 'frontend' | 'backend' | 'database' | 'infra';
  severity: 'P0' | 'P1' | 'P2';
  crashedCode?: string;
  resurrectedCode?: string;
  /** Wall-clock time string used as the timeline anchor, e.g. "14:05:32" */
  timeAnchor?: string;
}

export interface ReportLabels {
  postMortemTitle?: string;
  fieldIncidentTitle?: string;
  fieldCategory?: string;
  fieldSeverity?: string;
  postMortemSummaryHeading?: string;
  postMortemImpactHeading?: string;
  postMortemActionsHeading?: string;
  timelineTitle?: string;
  stackTraceTitle?: string;
  crashedCodeTitle?: string;
  resurrectedCodeTitle?: string;
}

// ── 1. Severity classifier ────────────────────────────────────────────────────

/**
 * Classifies any raw severity string into the canonical two-value enum.
 *
 * Rules (applied in order, case-insensitive):
 *   • Contains 'p0' or 'fatal' or 'critical' → 'P0'
 *   • Anything else (P1, P2, unknown, empty, garbage) → 'P1'
 *
 * This intentional two-bucket model means the engine never silently ignores
 * an unknown severity — it always produces a valid, actionable classification.
 */
export function classifySeverity(raw: string | null | undefined): CanonicalSeverity {
  if (!raw || typeof raw !== 'string') return 'P1';
  const norm = raw.toLowerCase().trim();
  if (norm.includes('p0') || norm.includes('fatal') || norm.includes('critical')) {
    return 'P0';
  }
  return 'P1';
}

// ── 2. Stack trace parser ─────────────────────────────────────────────────────

/**
 * Parses a raw stack trace string into structured frames.
 *
 * Handles:
 *   • V8 / Node.js  "  at Foo.bar (file.js:10:5)"
 *   • Firefox       "bar@file.js:10:5"
 *   • Bare lines    "Error: something went wrong"
 *   • Empty / null  → returns []
 *
 * Never throws; malformed input yields zero or partial frames.
 */
export function parseStackTrace(raw: string | null | undefined): StackFrame[] {
  if (!raw || typeof raw !== 'string') return [];

  const lines = raw.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  const frames: StackFrame[] = [];

  for (const line of lines) {
    // V8 "at" format
    const v8 = line.match(/^\s*at\s+(?:.+?)\s+\((.+):(\d+):(\d+)\)$/) ||
               line.match(/^\s*at\s+(.+):(\d+):(\d+)$/);
    if (v8) {
      frames.push({ raw: line, file: v8[1], line: parseInt(v8[2], 10), col: parseInt(v8[3], 10) });
      continue;
    }
    // Firefox "@" format
    const ff = line.match(/^.+@(.+):(\d+):(\d+)$/);
    if (ff) {
      frames.push({ raw: line, file: ff[1], line: parseInt(ff[2], 10), col: parseInt(ff[3], 10) });
      continue;
    }
    // Unknown / header line — store raw only
    frames.push({ raw: line });
  }

  return frames;
}

// ── 3. Timeline builder ───────────────────────────────────────────────────────

/**
 * Builds a forensic timeline from a stack of parsed frames + incident metadata.
 *
 * Invariant guaranteed by this function:
 *   The returned array is in non-decreasing time order (timestamps are
 *   appended monotonically — no event can precede the previous one).
 *
 * Timeline anchor is a wall-clock string like "14:05:32". Subsequent events
 * are spaced 250 ms apart via suffixing ".250", ".500", etc.
 */
export function buildTimeline(
  frames: StackFrame[],
  category: string,
  timeAnchor: string = '00:00:00',
): TimelineEvent[] {
  const events: TimelineEvent[] = [];

  // Event 0 — anomaly detected
  events.push({
    time: timeAnchor,
    desc: `${category} anomaly detected under active workload`,
    isFatal: false,
  });

  // Event 1 — first meaningful frame (if any)
  const firstMeaningful = frames.find(f => f.file);
  if (firstMeaningful) {
    events.push({
      time: `${timeAnchor}.250`,
      desc: `Exception originated in ${firstMeaningful.file ?? 'unknown'}${firstMeaningful.line ? `:${firstMeaningful.line}` : ''}`,
      isFatal: false,
    });
  } else {
    events.push({
      time: `${timeAnchor}.250`,
      desc: 'Exception propagated through untracked runtime boundary',
      isFatal: false,
    });
  }

  // Event 2 — fatal crash
  events.push({
    time: `${timeAnchor}.500`,
    desc: 'Fatal crash handler terminated process execution',
    isFatal: true,
  });

  return events;
}

// ── 4. Post-mortem report builder ─────────────────────────────────────────────

/**
 * Assembles a PostMortemReport from incident fields.
 * Always produces all three required fields (summary, impact, actionItems).
 * actionItems is always a non-empty array.
 */
export function buildPostMortem(
  title: string,
  categoryBadge: string,
  severityLabel: string,
): PostMortemReport {
  const safeTitle   = title?.trim()         || 'Unknown Incident';
  const safeBadge   = categoryBadge?.trim() || 'Unknown';
  const safeSev     = severityLabel?.trim() || 'P1';

  return {
    summary: `${safeSev} incident in ${safeBadge}: ${safeTitle}. Captured via live autopsy ingestion.`,
    impact:  `Service interruption detected. Immediate mitigation executed via SRE safety guardrails.`,
    actionItems: [
      `Review stack trace root cause in ${safeBadge} subsystem.`,
      `Implement automated canary regression testing in deployment pipeline.`,
      `Harden error boundaries and apply circuit breaker patterns.`,
    ],
  };
}

// ── 5. Markdown report generator ─────────────────────────────────────────────

/**
 * Generates the full SRE post-mortem Markdown document from an incident.
 *
 * Required SRE headers that MUST always be present:
 *   § Executive Summary
 *   § Blast Radius & Impact
 *   § Preventative Action Items  (Prevention)
 *
 * These three headers are structurally guaranteed regardless of input content.
 */
export function generateMarkdownReport(
  incident: IncidentPreset,
  labels: ReportLabels = {},
): string {
  const timeline: TimelineEvent[] = Array.isArray(incident.timeline)
    ? (incident.timeline as TimelineEvent[])
    : [];
  const actions: string[] = Array.isArray(incident.postMortemReport?.actionItems)
    ? incident.postMortemReport.actionItems
    : [];

  const title           = labels.postMortemTitle        || 'Incident Protocol';
  const summaryHeading  = labels.postMortemSummaryHeading  || 'Executive Summary';
  const impactHeading   = labels.postMortemImpactHeading   || 'Blast Radius & Impact';
  const actionsHeading  = labels.postMortemActionsHeading  || 'Preventative Action Items';
  const timelineLabel   = labels.timelineTitle           || 'Timeline';
  const traceLabel      = labels.stackTraceTitle         || 'Stack Trace';
  const crashedLabel    = labels.crashedCodeTitle        || 'Cursed Code';
  const resurrectedLabel = labels.resurrectedCodeTitle   || 'Resurrected Code';

  return [
    `# 💀 BugMortem - ${title}`,
    `**Incident:** ${incident.title || 'Untitled Incident'}`,
    `**Category:** ${incident.badge || 'N/A'} | **Severity:** ${incident.severity || 'P0'}`,
    `**Timestamp:** ${new Date().toUTCString()}`,
    '',
    '---',
    '',
    `## 1. ${summaryHeading}`,
    incident.postMortemReport?.summary || '',
    '',
    `## 2. ${impactHeading}`,
    incident.postMortemReport?.impact || '',
    '',
    `## 3. ${actionsHeading}`,
    actions.map(a => `- ${a}`).join('\n'),
    '',
    '---',
    '',
    `## 4. ${timelineLabel}`,
    timeline.map(e => `- [${e.time}] ${e.desc}${e.isFatal ? ' ⚠️ (FATAL CRASH)' : ''}`).join('\n'),
    '',
    '---',
    '',
    `## 5. ${traceLabel}`,
    '```',
    incident.stackTrace || '',
    '```',
    '',
    '---',
    '',
    `## 6. ${crashedLabel}`,
    '```javascript',
    incident.crashedCode || '',
    '```',
    '',
    '---',
    '',
    `## 7. ${resurrectedLabel}`,
    '```javascript',
    incident.resurrectedCode || '',
    '```',
    '',
    '*Report generated by BugMortem (Kiroween 2026 Hackathon Entry).*',
  ].join('\n');
}

// ── 6. Full incident factory ──────────────────────────────────────────────────

/**
 * Composes a complete IncidentPreset from AutopsyInput.
 * This is the top-level "autopsy engine" function — the integration point
 * for all sub-functions above.
 */
export function createAutopsyIncident(input: AutopsyInput): IncidentPreset {
  const {
    title,
    stackTrace,
    category,
    severity,
    crashedCode = '',
    resurrectedCode = '',
    timeAnchor = new Date().toTimeString().split(' ')[0],
  } = input;

  const canonicalSev  = classifySeverity(severity);
  const categoryBadge = categoryToBadge(category);
  const severityLabel = severityToLabel(severity);
  const frames        = parseStackTrace(stackTrace);
  const timeline      = buildTimeline(frames, categoryBadge, timeAnchor);
  const postMortem    = buildPostMortem(title, categoryBadge, severityLabel);
  const customId      = `custom-${Date.now()}`;

  const fallbackResurrected = resurrectedCode.trim() ||
    `// ✅ RESURRECTED SRE PATTERN (Auto-Generated Fallback)
try {
  await executeWithCircuitBreaker(async () => {
    // Execute protected workload
  });
} catch (error) {
  logger.error('Graceful degradation triggered', { error, incidentId: '${customId}' });
  return fallbackResponse();
}`;

  return {
    id:               customId,
    badge:            categoryBadge,
    severity:         canonicalSev,   // always 'P0' | 'P1'
    title:            title.trim() || 'Untitled Incident',
    desc:             stackTrace.split('\n')[0]?.slice(0, 140) || title.trim(),
    crashedCode:      crashedCode.trim() || `// ❌ CRASH STATE\n${stackTrace.slice(0, 300)}`,
    resurrectedCode:  fallbackResurrected,
    stackTrace:       stackTrace.trim(),
    timeline,
    postMortemReport: postMortem,
  };
}

// ── 7. fixOrphans ─────────────────────────────────────────────────────────────

/**
 * Replaces spaces after short Polish conjunctions with non-breaking spaces
 * to prevent typographic orphans at line endings.
 *
 * Safe on any string including empty strings and non-Polish text.
 */
export function fixOrphans(text: string): string {
  if (!text || typeof text !== 'string') return text;
  return text.replace(
    /(^|\s)([aiouwz]|do|na|od|po|ze|we|za|co|że|to)(\s+)/gi,
    '$1$2\u00A0',
  );
}

// ── Internal helpers ──────────────────────────────────────────────────────────

function categoryToBadge(category: AutopsyInput['category']): string {
  const map: Record<AutopsyInput['category'], string> = {
    frontend: 'Frontend',
    backend:  'Backend',
    database: 'Database',
    infra:    'Infrastructure',
  };
  return map[category] ?? 'Frontend';
}

function severityToLabel(severity: 'P0' | 'P1' | 'P2'): string {
  const map: Record<string, string> = {
    P0: 'Fatal Outage (P0)',
    P1: 'Critical Degradation (P1)',
    P2: 'Major Glitch (P2)',
  };
  return map[severity] ?? 'Unknown';
}
