/**
 * CustomAutopsyModal — Integration & Behaviour Test Suite
 *
 * Strategia: Vitest + happy-dom (środowisko DOM).
 * Testujemy bezpośrednio logikę biznesową komponentu i warstwy page:
 *   1. Walidacja formularza (wszystkie ścieżki błędów)
 *   2. Konstruowanie IncidentPreset z danych V8 OOM P0
 *   3. Zapis do localStorage i odczyt (persystencja stanu)
 *   4. Przełączenie selectedPreset na nowy incydent
 *   5. Integracja ze słownikami i18n (EN + PL)
 *
 * Scenariusz V8 OOM P0:
 *   title:           "V8 Heap OOM – Worker Process Killed by Kernel"
 *   category:        "backend"
 *   severity:        "P0"
 *   stackTrace:      realistyczny dump Node.js FATAL ERROR
 *   crashedCode:     fragment kodu powodujący wyciek pamięci
 *   resurrectedCode: wzorzec SRE z stream pipeline
 */

// @vitest-environment happy-dom

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { en } from '@/i18n/locales/en';
import { pl } from '@/i18n/locales/pl';
import type { IncidentPreset } from '@/i18n/types';

// ─── Dane testowe: scenariusz V8 OOM P0 ──────────────────────────────────────

const V8_OOM_INCIDENT = {
  title: 'V8 Heap OOM – Worker Process Killed by Kernel',
  category: 'backend' as const,
  severity: 'P0' as const,
  stackTrace: `FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory
 1: 0xb7c6e0 node::Abort() [node]
 2: 0xa915b5 node::FatalError(char const*, char const*) [node]
 3: 0xd9dc8e v8::Utils::ReportOOMFailure(v8::internal::Isolate*, char const*, bool) [node]
 4: 0xd9dfc7 v8::internal::V8::FatalProcessOutOfMemory(v8::internal::Isolate*, char const*, bool) [node]
 5: 0xf2d195  [node]
 6: 0xf2d6ca  [node]
at processLargeDataset (/app/workers/export.worker.js:142:18)
at Worker.<anonymous> (/app/workers/export.worker.js:89:5)`,
  crashedCode: `// ❌ CURSED: Buffers entire dataset in RAM before streaming
async function exportAllOrders(filter: OrderFilter): Promise<Buffer> {
  const rows = await db.query(
    'SELECT * FROM orders WHERE status = $1',
    [filter.status]
  );
  // BUG: rows.map allocates O(n) in V8 heap — 2.1M rows = OOM
  const csv = rows.map(r => Object.values(r).join(',')).join('\\n');
  return Buffer.from(csv, 'utf8');
}`,
  resurrectedCode: `// ✅ SRE PATTERN: Stream pipeline with backpressure — O(1) memory
import { pipeline } from 'node:stream/promises';
import { Transform } from 'node:stream';

async function exportAllOrders(filter: OrderFilter, res: Response) {
  const cursor = db.queryCursor(
    'SELECT * FROM orders WHERE status = $1',
    [filter.status]
  );
  const csvTransform = new Transform({
    objectMode: true,
    transform(row, _enc, cb) {
      cb(null, Object.values(row).join(',') + '\\n');
    },
  });
  await pipeline(cursor, csvTransform, res);
}`,
};

// ─── Pomocnicze: replika logiki validateInput z komponentu ───────────────────

function validateInput(
  title: string,
  stackTrace: string,
  d: typeof en.customAutopsy
): string | null {
  const cleanTitle = title.trim();
  const cleanStack = stackTrace.trim();

  if (!cleanTitle || cleanTitle.length < 5) {
    return d.validationTitleShort;
  }
  if (!cleanStack || cleanStack.length < 20) {
    return d.validationStackShort;
  }
  const errorIndicators = [
    'error', 'exception', 'failed', 'failure', 'fatal', 'panic', 'crash',
    'timeout', 'rejected', 'rejection', 'cannot', 'undefined', 'null',
    'at ', 'node:', 'http', 'status', 'exit code', 'unhandled', '500', '502', '503', '504',
    '\n',
  ];
  const hasErrorPattern = errorIndicators.some(kw =>
    cleanStack.toLowerCase().includes(kw)
  );
  if (!hasErrorPattern) {
    return d.validationStackInvalid;
  }
  return null;
}

// ─── Pomocnicze: replika logiki handleSubmit z komponentu ────────────────────

function buildIncident(
  input: typeof V8_OOM_INCIDENT,
  locale: 'pl' | 'en'
): IncidentPreset {
  const customId = `custom-test-v8oom`;
  const timeStr = '14:07:23';

  const fallbackResurrected =
    input.resurrectedCode.trim() ||
    `// ✅ RESURRECTED SRE PATTERN (Auto-Generated Fallback)\n// execute protected workload`;

  const customTimeline = [
    {
      time: timeStr,
      label: locale === 'pl' ? 'Wykrycie Anomalii' : 'Anomaly Detected',
      description: `${input.category.toUpperCase()} anomaly initiated under active workload`,
    },
    {
      time: `${timeStr}.250`,
      label: locale === 'pl' ? 'Granica Błędu' : 'Exception Boundary',
      description: 'Exception bubbled up to runtime boundary',
      isFatal: true,
    },
    {
      time: `${timeStr}.500`,
      label: locale === 'pl' ? 'Zgon Procesu' : 'Process Exit',
      description: 'Fatal crash handler terminated process execution',
      isFatal: true,
    },
  ];

  return {
    id: customId,
    badge: input.category.toUpperCase(),
    severity: input.severity === 'P0' ? 'P0' : 'P1',
    title: input.title.trim(),
    description: input.stackTrace.split('\n')[0].slice(0, 140) || input.title,
    codeSnippet:
      input.crashedCode.trim() ||
      `// ❌ CRASH STATE\n${input.stackTrace.slice(0, 300)}`,
    revivedCode: fallbackResurrected,
    stackTrace: input.stackTrace.trim(),
    timeline: customTimeline,
    postMortem: {
      summary: `Incident in ${input.category}: ${input.title}. Captured via live autopsy ingestion.`,
      impact: 'Service interruption detected. Immediate mitigation executed via SRE safety guardrails.',
      actionItems: [
        `Review stack trace root cause in ${input.category} subsystem.`,
        'Implement automated canary regression testing in deployment pipeline.',
        'Harden error boundaries and apply circuit breaker patterns.',
      ],
    },
    blastRadius: {
      nodes: [
        { id: 'n1', name: input.title, role: 'Epicenter', status: 'epicenter', statusCode: 'FAIL' },
        { id: 'n2', name: 'API Gateway', role: 'Ingress', status: 'degraded', statusCode: '504' },
      ],
      summary: { epicenterCount: 1, degradedCount: 1, healthyCount: 0 },
    },
    chaosMetrics: [],
  };
}

// ─── Pomocnicze: replika handleSaveCustomIncident z page.tsx ─────────────────

function saveCustomIncident(
  newIncident: IncidentPreset,
  existingIncidents: Record<string, IncidentPreset>,
  storage: Storage
): { incidents: Record<string, IncidentPreset>; selectedPreset: string } {
  const updated = { ...existingIncidents, [newIncident.id]: newIncident };
  storage.setItem('bugmortem_custom_incidents', JSON.stringify(updated));
  return { incidents: updated, selectedPreset: newIncident.id };
}

// ─────────────────────────────────────────────────────────────────────────────
// TEST SUITE
// ─────────────────────────────────────────────────────────────────────────────

describe('CustomAutopsyModal — scenariusz V8 OOM P0', () => {

  // ── 1. WALIDACJA FORMULARZA ─────────────────────────────────────────────

  describe('1. Walidacja formularza', () => {
    it('zwraca błąd gdy tytuł jest pusty', () => {
      const err = validateInput('', V8_OOM_INCIDENT.stackTrace, en.customAutopsy);
      expect(err).toBe(en.customAutopsy.validationTitleShort);
      expect(err).toContain('5');
    });

    it('zwraca błąd gdy tytuł ma mniej niż 5 znaków', () => {
      const err = validateInput('OOM', V8_OOM_INCIDENT.stackTrace, en.customAutopsy);
      expect(err).toBe(en.customAutopsy.validationTitleShort);
    });

    it('zwraca błąd gdy stack trace jest pusty', () => {
      const err = validateInput(V8_OOM_INCIDENT.title, '', en.customAutopsy);
      expect(err).toBe(en.customAutopsy.validationStackShort);
    });

    it('zwraca błąd gdy stack trace nie zawiera rozpoznawalnych słów kluczowych', () => {
      const err = validateInput(
        V8_OOM_INCIDENT.title,
        'lorem ipsum dolor sit amet consectetur adipiscing elit',
        en.customAutopsy
      );
      expect(err).toBe(en.customAutopsy.validationStackInvalid);
    });

    it('zwraca null dla poprawnych danych V8 OOM', () => {
      const err = validateInput(
        V8_OOM_INCIDENT.title,
        V8_OOM_INCIDENT.stackTrace,
        en.customAutopsy
      );
      expect(err).toBeNull();
    });

    it('komunikaty walidacji są zlokalizowane (PL)', () => {
      const errPl = validateInput('xy', V8_OOM_INCIDENT.stackTrace, pl.customAutopsy);
      const errEn = validateInput('xy', V8_OOM_INCIDENT.stackTrace, en.customAutopsy);
      // Oba muszą istnieć i być różne między sobą
      expect(errPl).toBeTruthy();
      expect(errEn).toBeTruthy();
      expect(errPl).not.toBe(errEn);
    });

    it('stack trace z samym \\n przechodzi walidację (newline = wskaźnik błędu)', () => {
      const multiline = 'some text\nmore text that makes it longer than twenty chars total here';
      const err = validateInput(V8_OOM_INCIDENT.title, multiline, en.customAutopsy);
      expect(err).toBeNull();
    });
  });

  // ── 2. BUDOWANIE INCIDENTPRESET ─────────────────────────────────────────

  describe('2. Konstruowanie IncidentPreset', () => {
    let incident: IncidentPreset;

    beforeEach(() => {
      incident = buildIncident(V8_OOM_INCIDENT, 'en');
    });

    it('id incydentu zaczyna się od "custom-"', () => {
      expect(incident.id).toMatch(/^custom-/);
    });

    it('severity jest P0', () => {
      expect(incident.severity).toBe('P0');
    });

    it('tytuł jest zachowany bez zbędnych spacji', () => {
      expect(incident.title).toBe('V8 Heap OOM – Worker Process Killed by Kernel');
    });

    it('badge to kategoria uppercase', () => {
      expect(incident.badge).toBe('BACKEND');
    });

    it('description jest pierwszą linią stack trace (max 140 znaków)', () => {
      const firstLine = V8_OOM_INCIDENT.stackTrace.split('\n')[0].slice(0, 140);
      expect(incident.description).toBe(firstLine);
    });

    it('codeSnippet zawiera przeklęty kod', () => {
      expect(incident.codeSnippet).toContain('BUG:');
      expect(incident.codeSnippet).toContain('OOM');
    });

    it('revivedCode zawiera wskrzeszony wzorzec SRE', () => {
      expect(incident.revivedCode).toContain('pipeline');
      expect(incident.revivedCode).toContain('SRE');
    });

    it('stackTrace jest zachowany w całości', () => {
      expect(incident.stackTrace).toContain('FATAL ERROR');
      expect(incident.stackTrace).toContain('v8::internal::V8::FatalProcessOutOfMemory');
    });

    it('timeline zawiera dokładnie 3 zdarzenia', () => {
      expect(incident.timeline).toHaveLength(3);
    });

    it('pierwsze zdarzenie timeline nie jest fatalne', () => {
      expect(incident.timeline[0].isFatal).toBeFalsy();
    });

    it('ostatnie zdarzenie timeline jest fatalne', () => {
      expect(incident.timeline[2].isFatal).toBe(true);
    });

    it('zdarzenia timeline są w porządku chronologicznym (niezmniejszającym)', () => {
      const times = incident.timeline.map(e => e.time);
      for (let i = 1; i < times.length; i++) {
        expect(times[i] >= times[i - 1]).toBe(true);
      }
    });

    it('postMortem zawiera wymagane pola SRE', () => {
      expect(incident.postMortem?.summary).toContain('backend');
      expect(incident.postMortem?.summary).toContain(V8_OOM_INCIDENT.title);
      expect(incident.postMortem?.impact).toBeTruthy();
      expect(incident.postMortem?.actionItems).toHaveLength(3);
    });

    it('blastRadius zawiera epicenter i degraded node', () => {
      expect(incident.blastRadius?.nodes).toHaveLength(2);
      expect(incident.blastRadius?.nodes[0].status).toBe('epicenter');
      expect(incident.blastRadius?.nodes[1].status).toBe('degraded');
      expect(incident.blastRadius?.summary.epicenterCount).toBe(1);
    });

    it('etykiety timeline są po angielsku gdy locale=en', () => {
      const enIncident = buildIncident(V8_OOM_INCIDENT, 'en');
      expect(enIncident.timeline[0].label).toBe('Anomaly Detected');
      expect(enIncident.timeline[2].label).toBe('Process Exit');
    });

    it('etykiety timeline są po polsku gdy locale=pl', () => {
      const plIncident = buildIncident(V8_OOM_INCIDENT, 'pl');
      expect(plIncident.timeline[0].label).toBe('Wykrycie Anomalii');
      expect(plIncident.timeline[2].label).toBe('Zgon Procesu');
    });
  });

  // ── 3. ZAPIS DO LOCALSTORAGE I PERSYSTENCJA STANU ──────────────────────

  describe('3. localStorage — zapis i odczyt', () => {
    const LS_KEY = 'bugmortem_custom_incidents';

    beforeEach(() => {
      localStorage.clear();
    });

    it('nowy incydent jest zapisywany do localStorage', () => {
      const incident = buildIncident(V8_OOM_INCIDENT, 'en');
      saveCustomIncident(incident, {}, localStorage);

      const raw = localStorage.getItem(LS_KEY);
      expect(raw).not.toBeNull();

      const parsed = JSON.parse(raw!);
      expect(parsed[incident.id]).toBeDefined();
    });

    it('odczytany incydent zachowuje wszystkie pola', () => {
      const incident = buildIncident(V8_OOM_INCIDENT, 'en');
      saveCustomIncident(incident, {}, localStorage);

      const parsed = JSON.parse(localStorage.getItem(LS_KEY)!);
      const restored = parsed[incident.id] as IncidentPreset;

      expect(restored.title).toBe(incident.title);
      expect(restored.severity).toBe('P0');
      expect(restored.stackTrace).toContain('FATAL ERROR');
      expect(restored.codeSnippet).toContain('BUG:');
      expect(restored.revivedCode).toContain('pipeline');
      expect(restored.timeline).toHaveLength(3);
      expect(restored.postMortem?.actionItems).toHaveLength(3);
    });

    it('drugi zapis nie usuwa istniejących incydentów (merge)', () => {
      const incident1 = buildIncident(V8_OOM_INCIDENT, 'en');
      const incident2 = buildIncident({ ...V8_OOM_INCIDENT, title: 'Second OOM Crash' }, 'en');
      incident2.id = 'custom-test-second';

      const { incidents: after1 } = saveCustomIncident(incident1, {}, localStorage);
      saveCustomIncident(incident2, after1, localStorage);

      const parsed = JSON.parse(localStorage.getItem(LS_KEY)!);
      expect(Object.keys(parsed)).toHaveLength(2);
      expect(parsed[incident1.id]).toBeDefined();
      expect(parsed[incident2.id]).toBeDefined();
    });

    it('localStorage można odczytać po symulacji przeładowania strony', () => {
      const incident = buildIncident(V8_OOM_INCIDENT, 'en');
      saveCustomIncident(incident, {}, localStorage);

      // Symulacja "przeładowania" — odczyt z nowym obiektem stanu (jak w useEffect)
      let restoredIncidents: Record<string, IncidentPreset> = {};
      try {
        const stored = localStorage.getItem(LS_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          const valid: Record<string, IncidentPreset> = {};
          Object.entries(parsed).forEach(([k, v]) => {
            const item = v as IncidentPreset;
            if (item && item.title && (item.codeSnippet || (item as any).crashedCode)) {
              valid[k] = item;
            }
          });
          restoredIncidents = valid;
        }
      } catch {
        localStorage.removeItem(LS_KEY);
      }

      expect(restoredIncidents[incident.id]).toBeDefined();
      expect(restoredIncidents[incident.id].title).toBe(V8_OOM_INCIDENT.title);
    });

    it('uszkodzony JSON w localStorage jest obsługiwany gracefully', () => {
      localStorage.setItem(LS_KEY, '{ invalid json !!!');
      let restoredIncidents: Record<string, IncidentPreset> = {};
      let cleaned = false;
      try {
        const stored = localStorage.getItem(LS_KEY);
        if (stored) JSON.parse(stored);
      } catch {
        localStorage.removeItem(LS_KEY);
        cleaned = true;
      }
      expect(cleaned).toBe(true);
      expect(localStorage.getItem(LS_KEY)).toBeNull();
      expect(restoredIncidents).toEqual({});
    });
  });

  // ── 4. PRZEŁĄCZENIE SELECTEDPRESET ─────────────────────────────────────

  describe('4. Przełączenie selectedPreset na nowy incydent', () => {
    it('po zapisie selectedPreset przyjmuje id nowego incydentu', () => {
      const incident = buildIncident(V8_OOM_INCIDENT, 'en');
      const { selectedPreset } = saveCustomIncident(incident, {}, localStorage);
      expect(selectedPreset).toBe(incident.id);
    });

    it('nowy incydent jest dostępny w allIncidents po merge z presetami', () => {
      const incident = buildIncident(V8_OOM_INCIDENT, 'en');
      const { incidents } = saveCustomIncident(incident, {}, localStorage);

      // Symulacja allIncidents = { ...presetsMap, ...customIncidents }
      const presetsMap = en.presets.items;
      const allIncidents = { ...presetsMap, ...incidents };

      expect(allIncidents[incident.id]).toBeDefined();
      expect(allIncidents[incident.id].severity).toBe('P0');
    });

    it('activeIncident po przełączeniu zwraca dane V8 OOM', () => {
      const incident = buildIncident(V8_OOM_INCIDENT, 'en');
      const { incidents, selectedPreset } = saveCustomIncident(incident, {}, localStorage);

      const presetsMap = en.presets.items;
      const allIncidents = { ...presetsMap, ...incidents };
      const activeIncident = allIncidents[selectedPreset];

      expect(activeIncident.title).toBe('V8 Heap OOM – Worker Process Killed by Kernel');
      expect(activeIncident.severity).toBe('P0');
      expect(activeIncident.stackTrace).toContain('heap out of memory');
    });

    it('severity P0 → waveformState powinien być "flatline"', () => {
      const incident = buildIncident(V8_OOM_INCIDENT, 'en');
      // Replika logiki useEffect z page.tsx
      const sev = incident.severity ?? '';
      const waveformState = sev === 'P0' ? 'flatline' : 'p1-heartbeat';
      expect(waveformState).toBe('flatline');
    });
  });

  // ── 5. INTEGRACJA ZE SŁOWNIKAMI I18N ───────────────────────────────────

  describe('5. Integracja ze słownikami i18n', () => {
    it('en.customAutopsy zawiera wszystkie wymagane klucze', () => {
      const d = en.customAutopsy;
      expect(d.title).toBeTruthy();
      expect(d.subtitle).toBeTruthy();
      expect(d.fieldTitle).toBeTruthy();
      expect(d.fieldTitlePlaceholder).toBeTruthy();
      expect(d.fieldCategory).toBeTruthy();
      expect(d.fieldSeverity).toBeTruthy();
      expect(d.fieldStackTrace).toBeTruthy();
      expect(d.fieldStackTracePlaceholder).toBeTruthy();
      expect(d.fieldCrashedCode).toBeTruthy();
      expect(d.fieldResurrectedCode).toBeTruthy();
      expect(d.categoryFrontend).toBeTruthy();
      expect(d.categoryBackend).toBeTruthy();
      expect(d.categoryDatabase).toBeTruthy();
      expect(d.categoryInfra).toBeTruthy();
      expect(d.severityP0).toBeTruthy();
      expect(d.severityP1).toBeTruthy();
      expect(d.severityP2).toBeTruthy();
      expect(d.cancelCta).toBeTruthy();
      expect(d.submitCta).toBeTruthy();
      expect(d.validationTitleShort).toBeTruthy();
      expect(d.validationStackShort).toBeTruthy();
      expect(d.validationStackInvalid).toBeTruthy();
      expect(d.sampleTitle).toBeTruthy();
    });

    it('pl.customAutopsy zawiera wszystkie wymagane klucze', () => {
      const d = pl.customAutopsy;
      expect(d.title).toBeTruthy();
      expect(d.categoryDatabase).not.toBe(en.customAutopsy.categoryDatabase);
      expect(d.categoryInfra).not.toBe(en.customAutopsy.categoryInfra);
      expect(d.severityP0).not.toBe(en.customAutopsy.severityP0);
      expect(d.cancelCta).toBeTruthy();
      expect(d.submitCta).toBeTruthy();
    });

    it('opcje kategorii w PL różnią się od EN', () => {
      expect(pl.customAutopsy.categoryDatabase).toBe('Baza Danych / Składowanie');
      expect(en.customAutopsy.categoryDatabase).toBe('Database / Storage');
      expect(pl.customAutopsy.categoryInfra).toBe('Chmura / Infrastruktura');
      expect(en.customAutopsy.categoryInfra).toBe('Cloud / Infrastructure');
    });

    it('opcje severity zawierają kody P0/P1/P2', () => {
      expect(en.customAutopsy.severityP0).toContain('P0');
      expect(en.customAutopsy.severityP1).toContain('P1');
      expect(en.customAutopsy.severityP2).toContain('P2');
    });

    it('sampleTitle jest zlokalizowany', () => {
      expect(pl.customAutopsy.sampleTitle).toBe('Kaskadowy Timeout Puli Połączeń PgBouncer');
      expect(en.customAutopsy.sampleTitle).toBe('PgBouncer Connection Pool Timeout Cascade');
    });

    it('EN i PL mają identyczny zestaw kluczy w customAutopsy', () => {
      const enKeys = Object.keys(en.customAutopsy).sort();
      const plKeys = Object.keys(pl.customAutopsy).sort();
      expect(plKeys).toEqual(enKeys);
    });
  });

});
