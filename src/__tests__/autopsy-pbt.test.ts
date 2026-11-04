/**
 * BugMortem — Property-Based Test Suite
 * ─────────────────────────────────────────────────────────────────────────────
 * Kiroween 2026 Hackathon PBT Criteria
 *
 * Uses fast-check for property-based fuzzing across 4 invariants:
 *
 *   Invariant 1 (Resilience)       — engine never throws on any input
 *   Invariant 2 (Severity Validity) — severity always resolves to 'P0' | 'P1'
 *   Invariant 3 (Timeline Integrity) — timeline events are non-decreasing
 *   Invariant 4 (Export Fidelity)  — markdown always contains required SRE headers
 *
 * Each property runs 150 random examples (well above the 100-run minimum).
 */

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import {
  classifySeverity,
  parseStackTrace,
  buildTimeline,
  buildPostMortem,
  generateMarkdownReport,
  createAutopsyIncident,
  fixOrphans,
  type AutopsyInput,
  type CanonicalSeverity,
} from '../utils/autopsyEngine';
import type { IncidentPreset } from '../i18n/types';

// ── Shared arbitraries ────────────────────────────────────────────────────────

/** Any string including empty, unicode, control chars, deeply nested payloads */
const anyString = fc.oneof(
  fc.string(),
  fc.unicodeString(),
  fc.hexaString(),
  fc.base64String(),
  fc.constant(''),
  fc.constant(null as unknown as string),
  fc.constant(undefined as unknown as string),
);

/** Strings that look like stack traces but are entirely random */
const fuzzStackTrace = fc.oneof(
  fc.string(),
  fc.unicodeString(),
  // V8-ish lines
  fc.array(
    fc.tuple(fc.string(), fc.integer({ min: 1, max: 999 }), fc.integer({ min: 0, max: 99 }))
      .map(([s, line, col]) => `    at ${s} (${s}.js:${line}:${col})`),
    { minLength: 0, maxLength: 30 },
  ).map(lines => lines.join('\n')),
  // Deeply nested / very long
  fc.string({ minLength: 0, maxLength: 8000 }),
  fc.constant(''),
  fc.constant('\n\n\n'),
  fc.constant('\x00\x01\x02'),
  fc.constant('null'),
  fc.constant('undefined'),
);

const anySeverity = fc.oneof(
  fc.constantFrom('P0', 'P1', 'P2'),
  fc.string(),                              // garbage strings
  fc.constant(''),
  fc.constant(null as unknown as string),
  fc.constant(undefined as unknown as string),
  fc.constantFrom('fatal', 'FATAL', 'p0', 'critical', 'CRITICAL'),
  fc.constantFrom('p1', 'P1 warning', 'Major (P2)', 'unknown'),
);

const anyCategory = fc.constantFrom(
  'frontend', 'backend', 'database', 'infra',
) as fc.Arbitrary<AutopsyInput['category']>;

const anyFormSeverity = fc.constantFrom('P0', 'P1', 'P2') as fc.Arbitrary<'P0' | 'P1' | 'P2'>;

/** Builds a complete (potentially fuzz-filled) AutopsyInput */
const autopsyInput: fc.Arbitrary<AutopsyInput> = fc.record({
  title:           fc.oneof(fc.string(), fc.unicodeString(), fc.constant('')),
  stackTrace:      fuzzStackTrace,
  category:        anyCategory,
  severity:        anyFormSeverity,
  crashedCode:     fc.option(fc.string(), { nil: undefined }),
  resurrectedCode: fc.option(fc.string(), { nil: undefined }),
  timeAnchor:      fc.option(
    fc.tuple(
      fc.integer({ min: 0, max: 23 }),
      fc.integer({ min: 0, max: 59 }),
      fc.integer({ min: 0, max: 59 }),
    ).map(([h, m, s]) =>
      `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
    ),
    { nil: undefined },
  ),
});

/** Builds a fuzz IncidentPreset with potentially garbage values */
const fuzzIncident: fc.Arbitrary<IncidentPreset> = fc.record({
  id:              fc.string(),
  badge:           fc.string(),
  severity:        anySeverity,
  title:           fc.oneof(fc.string(), fc.unicodeString(), fc.constant('')),
  desc:            fc.oneof(fc.string(), fc.unicodeString(), fc.constant('')),
  crashedCode:     fc.oneof(fc.string(), fc.unicodeString(), fc.constant('')),
  resurrectedCode: fc.oneof(fc.string(), fc.unicodeString(), fc.constant('')),
  stackTrace:      fuzzStackTrace,
  timeline:        fc.oneof(
    fc.constant([]),
    fc.array(
      fc.record({
        time: fc.string(),
        desc: fc.string(),
        isFatal: fc.boolean(),
      }),
      { minLength: 0, maxLength: 20 },
    ),
  ),
  postMortemReport: fc.record({
    summary:     fc.oneof(fc.string(), fc.constant('')),
    impact:      fc.oneof(fc.string(), fc.constant('')),
    actionItems: fc.oneof(
      fc.constant([]),
      fc.array(fc.string(), { minLength: 1, maxLength: 10 }),
    ),
  }),
});

// ── PBT config: 150 runs each (≥ 100-run minimum) ────────────────────────────
const PBT_RUNS = 150;
const pbtConfig: fc.Parameters<unknown> = { numRuns: PBT_RUNS, verbose: false };

// ═══════════════════════════════════════════════════════════════════════════════
// INVARIANT 1 — Resilience: engine never throws on any input
// ═══════════════════════════════════════════════════════════════════════════════

describe('Invariant 1 — Resilience: engine never throws', () => {

  it('classifySeverity never throws on any string input', () => {
    fc.assert(
      fc.property(anySeverity, (sev) => {
        expect(() => classifySeverity(sev)).not.toThrow();
      }),
      pbtConfig,
    );
  });

  it('parseStackTrace never throws on any string input', () => {
    fc.assert(
      fc.property(fuzzStackTrace, (trace) => {
        expect(() => parseStackTrace(trace)).not.toThrow();
      }),
      pbtConfig,
    );
  });

  it('parseStackTrace returns an array for every input', () => {
    fc.assert(
      fc.property(fuzzStackTrace, (trace) => {
        const result = parseStackTrace(trace);
        expect(Array.isArray(result)).toBe(true);
      }),
      pbtConfig,
    );
  });

  it('buildTimeline never throws on fuzz frames + category + anchor', () => {
    fc.assert(
      fc.property(fuzzStackTrace, anyCategory, anyString, (trace, cat, anchor) => {
        const frames = parseStackTrace(trace);
        expect(() => buildTimeline(frames, cat, anchor ?? '')).not.toThrow();
      }),
      pbtConfig,
    );
  });

  it('buildPostMortem never throws on any title / badge / severity', () => {
    fc.assert(
      fc.property(anyString, anyString, anyString, (title, badge, sev) => {
        expect(() => buildPostMortem(title ?? '', badge ?? '', sev ?? '')).not.toThrow();
      }),
      pbtConfig,
    );
  });

  it('generateMarkdownReport never throws on a fuzz IncidentPreset', () => {
    fc.assert(
      fc.property(fuzzIncident, (incident) => {
        expect(() => generateMarkdownReport(incident)).not.toThrow();
      }),
      pbtConfig,
    );
  });

  it('createAutopsyIncident never throws on any AutopsyInput', () => {
    fc.assert(
      fc.property(autopsyInput, (input) => {
        expect(() => createAutopsyIncident(input)).not.toThrow();
      }),
      pbtConfig,
    );
  });

  it('fixOrphans never throws on any string', () => {
    fc.assert(
      fc.property(anyString, (text) => {
        expect(() => fixOrphans(text ?? '')).not.toThrow();
      }),
      pbtConfig,
    );
  });

  it('full pipeline (parse → timeline → postmortem → markdown) never throws on fuzz', () => {
    fc.assert(
      fc.property(autopsyInput, (input) => {
        const incident = createAutopsyIncident(input);
        const frames   = parseStackTrace(input.stackTrace);
        const timeline = buildTimeline(frames, input.category);
        const pm       = buildPostMortem(input.title, input.category, input.severity);
        const md       = generateMarkdownReport({ ...incident, timeline, postMortemReport: pm });
        expect(typeof md).toBe('string');
      }),
      pbtConfig,
    );
  });

});

// ═══════════════════════════════════════════════════════════════════════════════
// INVARIANT 2 — Severity Validity: always resolves to 'P0' | 'P1'
// ═══════════════════════════════════════════════════════════════════════════════

describe('Invariant 2 — Severity Validity: always resolves to P0 | P1', () => {

  const VALID_SEVERITIES: Set<CanonicalSeverity> = new Set(['P0', 'P1']);

  it('classifySeverity always returns P0 or P1 for any raw input', () => {
    fc.assert(
      fc.property(anySeverity, (sev) => {
        const result = classifySeverity(sev);
        expect(VALID_SEVERITIES.has(result)).toBe(true);
      }),
      pbtConfig,
    );
  });

  it('createAutopsyIncident always sets incident.severity to P0 or P1', () => {
    fc.assert(
      fc.property(autopsyInput, (input) => {
        const incident = createAutopsyIncident(input);
        expect(VALID_SEVERITIES.has(incident.severity as CanonicalSeverity)).toBe(true);
      }),
      pbtConfig,
    );
  });

  it('classifySeverity is idempotent: classifying twice gives the same result', () => {
    fc.assert(
      fc.property(anySeverity, (sev) => {
        const first  = classifySeverity(sev);
        const second = classifySeverity(first);
        expect(second).toBe(first);
      }),
      pbtConfig,
    );
  });

  it('known P0 triggers always map to P0', () => {
    const p0Inputs = ['P0', 'p0', 'fatal', 'FATAL', 'critical', 'CRITICAL', 'P0 CRITICAL'];
    for (const raw of p0Inputs) {
      expect(classifySeverity(raw)).toBe('P0');
    }
  });

  it('non-P0 values (P1, P2, empty, garbage) always map to P1', () => {
    const p1Inputs = ['P1', 'P2', '', 'unknown', 'warning', 'minor', 'P3', '???'];
    for (const raw of p1Inputs) {
      expect(classifySeverity(raw)).toBe('P1');
    }
  });

  it('null and undefined always map to P1', () => {
    expect(classifySeverity(null)).toBe('P1');
    expect(classifySeverity(undefined)).toBe('P1');
  });

});

// ═══════════════════════════════════════════════════════════════════════════════
// INVARIANT 3 — Timeline Integrity: non-decreasing chronological order
// ═══════════════════════════════════════════════════════════════════════════────

describe('Invariant 3 — Timeline Integrity: non-decreasing order', () => {

  /**
   * BugMortem timelines use wall-clock strings like "14:05:32" and ".250" suffixes.
   * The invariant is structural: each event[i].time must sort ≤ event[i+1].time
   * when compared lexicographically (since ".NNN" suffixes preserve order within
   * the same second, and hh:mm:ss strings are zero-padded ISO-sortable).
   */
  it('buildTimeline always produces events in non-decreasing time order', () => {
    fc.assert(
      fc.property(fuzzStackTrace, anyCategory, (trace, category) => {
        const frames   = parseStackTrace(trace);
        const timeline = buildTimeline(frames, category ?? 'Frontend', '10:00:00');

        for (let i = 0; i < timeline.length - 1; i++) {
          const a = timeline[i].time;
          const b = timeline[i + 1].time;
          expect(a <= b).toBe(true);
        }
      }),
      pbtConfig,
    );
  });

  it('buildTimeline always produces exactly 3 events for any stack trace', () => {
    fc.assert(
      fc.property(fuzzStackTrace, anyCategory, (trace, category) => {
        const frames   = parseStackTrace(trace);
        const timeline = buildTimeline(frames, category ?? 'Frontend', '00:00:00');
        expect(timeline).toHaveLength(3);
      }),
      pbtConfig,
    );
  });

  it('the last timeline event is always fatal (crash terminus)', () => {
    fc.assert(
      fc.property(fuzzStackTrace, anyCategory, (trace, category) => {
        const frames   = parseStackTrace(trace);
        const timeline = buildTimeline(frames, category ?? 'Frontend', '00:00:00');
        const last     = timeline[timeline.length - 1];
        expect(last.isFatal).toBe(true);
      }),
      pbtConfig,
    );
  });

  it('the first timeline event is never fatal (anomaly detection precedes crash)', () => {
    fc.assert(
      fc.property(fuzzStackTrace, anyCategory, (trace, category) => {
        const frames   = parseStackTrace(trace);
        const timeline = buildTimeline(frames, category ?? 'Frontend', '00:00:00');
        expect(timeline[0].isFatal).toBeFalsy();
      }),
      pbtConfig,
    );
  });

  it('createAutopsyIncident timeline events are always in non-decreasing order', () => {
    fc.assert(
      fc.property(autopsyInput, (input) => {
        const incident = createAutopsyIncident(input);
        const tl = incident.timeline;
        for (let i = 0; i < tl.length - 1; i++) {
          expect(tl[i].time <= tl[i + 1].time).toBe(true);
        }
      }),
      pbtConfig,
    );
  });

});

// ═══════════════════════════════════════════════════════════════════════════════
// INVARIANT 4 — Export Fidelity: markdown always contains required SRE headers
// ═══════════════════════════════════════════════════════════════════════════════

describe('Invariant 4 — Export Fidelity: required SRE headers always present', () => {

  /**
   * The three structurally required sections are:
   *   • Executive Summary (§1)
   *   • Blast Radius & Impact (§2)
   *   • Preventative Action Items / Prevention (§3)
   *
   * These must appear in every generated markdown regardless of incident content.
   */

  it('markdown always contains "Executive Summary" header', () => {
    fc.assert(
      fc.property(fuzzIncident, (incident) => {
        const md = generateMarkdownReport(incident);
        expect(md).toContain('Executive Summary');
      }),
      pbtConfig,
    );
  });

  it('markdown always contains "Blast Radius" header', () => {
    fc.assert(
      fc.property(fuzzIncident, (incident) => {
        const md = generateMarkdownReport(incident);
        expect(md).toContain('Blast Radius');
      }),
      pbtConfig,
    );
  });

  it('markdown always contains "Preventative Action Items" header', () => {
    fc.assert(
      fc.property(fuzzIncident, (incident) => {
        const md = generateMarkdownReport(incident);
        expect(md).toContain('Preventative Action Items');
      }),
      pbtConfig,
    );
  });

  it('markdown always starts with the BugMortem title line', () => {
    fc.assert(
      fc.property(fuzzIncident, (incident) => {
        const md = generateMarkdownReport(incident);
        expect(md.startsWith('# 💀 BugMortem')).toBe(true);
      }),
      pbtConfig,
    );
  });

  it('markdown always contains all 7 numbered sections', () => {
    fc.assert(
      fc.property(fuzzIncident, (incident) => {
        const md = generateMarkdownReport(incident);
        for (let n = 1; n <= 7; n++) {
          expect(md).toContain(`## ${n}.`);
        }
      }),
      pbtConfig,
    );
  });

  it('markdown always has non-zero length (never empty)', () => {
    fc.assert(
      fc.property(fuzzIncident, (incident) => {
        const md = generateMarkdownReport(incident);
        expect(md.length).toBeGreaterThan(0);
      }),
      pbtConfig,
    );
  });

  it('custom labels override defaults in generated headers', () => {
    fc.assert(
      fc.property(
        fuzzIncident,
        fc.record({
          postMortemSummaryHeading:  fc.string({ minLength: 1 }),
          postMortemImpactHeading:   fc.string({ minLength: 1 }),
          postMortemActionsHeading:  fc.string({ minLength: 1 }),
        }),
        (incident, labels) => {
          const md = generateMarkdownReport(incident, labels);
          expect(md).toContain(labels.postMortemSummaryHeading);
          expect(md).toContain(labels.postMortemImpactHeading);
          expect(md).toContain(labels.postMortemActionsHeading);
        },
      ),
      pbtConfig,
    );
  });

  it('buildPostMortem always returns non-empty summary, impact, and actionItems', () => {
    fc.assert(
      fc.property(anyString, anyString, anyString, (title, badge, sev) => {
        const pm = buildPostMortem(title ?? '', badge ?? '', sev ?? '');
        expect(pm.summary.length).toBeGreaterThan(0);
        expect(pm.impact.length).toBeGreaterThan(0);
        expect(pm.actionItems.length).toBeGreaterThan(0);
      }),
      pbtConfig,
    );
  });

});

// ═══════════════════════════════════════════════════════════════════════════════
// BONUS — Regression tests for known edge-cases caught by the fuzzer
// ═══════════════════════════════════════════════════════════════════════════════

describe('Regression — known edge-case inputs', () => {

  const EDGE_CASES = [
    '',
    '   ',
    '\n\n\n',
    '\x00\x01\x02\x03',
    'null',
    'undefined',
    'NaN',
    '<script>alert(1)</script>',
    '💀'.repeat(1000),
    'a'.repeat(50_000),          // very long string
    JSON.stringify({ nested: { deeply: { stack: 'Error at x.js:1:1' } } }),
    'Error\n  at foo (foo.js:1:1)\n  at bar (bar.js:2:2)',
    'FATAL ERROR: Ineffective mark-compacts near heap limit',
    '--- E2E CRASH ---\nuncaught TypeError: Cannot read properties of undefined',
  ];

  it('parseStackTrace handles all known edge-case inputs without throwing', () => {
    for (const input of EDGE_CASES) {
      expect(() => parseStackTrace(input)).not.toThrow();
      expect(Array.isArray(parseStackTrace(input))).toBe(true);
    }
  });

  it('classifySeverity handles all known edge-case inputs', () => {
    for (const input of EDGE_CASES) {
      expect(() => classifySeverity(input)).not.toThrow();
      expect(['P0', 'P1']).toContain(classifySeverity(input));
    }
  });

  it('generateMarkdownReport handles a completely empty incident', () => {
    const emptyIncident: IncidentPreset = {
      id: '',
      badge: '',
      severity: '',
      title: '',
      desc: '',
      crashedCode: '',
      resurrectedCode: '',
      stackTrace: '',
      timeline: [],
      postMortemReport: { summary: '', impact: '', actionItems: [] },
    };
    const md = generateMarkdownReport(emptyIncident);
    expect(md).toContain('Executive Summary');
    expect(md).toContain('Blast Radius');
    expect(md).toContain('Preventative Action Items');
  });

  it('fixOrphans is safe on empty and null-like inputs', () => {
    expect(fixOrphans('')).toBe('');
    expect(fixOrphans(null as unknown as string)).toBeNull();
    expect(fixOrphans(undefined as unknown as string)).toBeUndefined();
  });

  it('fixOrphans does not corrupt non-Polish ASCII text', () => {
    const ascii = 'The quick brown fox jumps over the lazy dog';
    // only short 1-2 char conjunctions in the word list match; none in this sentence
    const result = fixOrphans(ascii);
    expect(result.replace(/\u00A0/g, ' ')).toBe(ascii);
  });

});
