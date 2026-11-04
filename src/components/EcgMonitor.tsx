'use client';

/**
 * EcgMonitor — Cyber-Gothic ECG waveform display.
 *
 * WaveformState:
 *   'flatline'     → crimson horizontal line with micro-jitter (P0 dead service)
 *   'p1-heartbeat' → crimson animated QRS peaks (P1/P2 active incident, warning)
 *   'resurrected'  → toxic-emerald animated QRS peaks (service restored, 200 OK)
 *
 * All animation is pure CSS keyframes injected via a <style> tag — zero deps.
 */

export type WaveformState = 'flatline' | 'p1-heartbeat' | 'resurrected';

interface EcgMonitorProps {
  state: WaveformState;
}

// ── QRS complex path ─────────────────────────────────────────────────────────
// Three identical complexes across the 120×32 px viewport (midline y=16).
// Each: flat → P-wave bump → Q dip → tall R spike → S dip → T-wave dome → flat.
// Rough path length ≈ 310 px → used as stroke-dasharray for the scroll animation.

const QRS_PATH =
  'M0,16 ' +
  // ─ Complex 1 (x 0–40) ─
  'L8,16 L10,14 L12,16 ' +                           // P-wave
  'L14,16 L16,18 L18,2 L20,30 L22,12 L24,16 ' +      // Q-R-S spike
  'L26,16 L29,13 L32,16 ' +                           // T-wave dome
  'L40,16 ' +
  // ─ Complex 2 (x 40–80) ─
  'L48,16 L50,14 L52,16 ' +
  'L54,16 L56,18 L58,2 L60,30 L62,12 L64,16 ' +
  'L66,16 L69,13 L72,16 ' +
  'L80,16 ' +
  // ─ Complex 3 (x 80–120) ─
  'L88,16 L90,14 L92,16 ' +
  'L94,16 L96,18 L98,2 L100,30 L102,12 L104,16 ' +
  'L106,16 L109,13 L112,16 ' +
  'L120,16';

// ── BPM → animation duration ─────────────────────────────────────────────────
// The path holds 3 complexes, so one full scroll = 3 beats.
function bpmToDuration(bpm: number): string {
  return `${((3 * 60) / bpm).toFixed(2)}s`;
}

export function EcgMonitor({ state }: EcgMonitorProps) {
  const isFlatline    = state === 'flatline';
  const isP1          = state === 'p1-heartbeat';
  const isResurrected = state === 'resurrected';
  const isBeating     = isP1 || isResurrected;

  // P1 warning = 90 BPM crimson, resurrected = 70 BPM emerald
  const beatDuration = isP1 ? bpmToDuration(90) : bpmToDuration(70);
  const strokeColor  = isResurrected ? '#10b981' : '#ef4444';
  const glowId       = isResurrected ? 'ecg-glow-emerald' : 'ecg-glow-crimson';

  return (
    <svg
      viewBox="0 0 120 32"
      className="w-full h-8"
      aria-label={
        isFlatline    ? 'ECG: flatline — service down' :
        isP1          ? 'ECG: active incident warning' :
                        'ECG: service resurrected'
      }
      aria-hidden="true"
      style={{ overflow: 'visible' }}
    >
      <style>{`
        /* ── Heartbeat scroll (duration set inline via style) ── */
        @keyframes ecg-beat {
          0%   { stroke-dashoffset: 310; opacity: 0.2; }
          4%   { opacity: 1; }
          100% { stroke-dashoffset: 0;   opacity: 1; }
        }
        .ecg-beat-line {
          stroke-dasharray: 310;
          stroke-dashoffset: 310;
          animation-name: ecg-beat;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .ecg-beat-glow {
          animation-name: ecg-beat;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          stroke-dasharray: 310;
          stroke-dashoffset: 310;
          opacity: 0;
        }

        /* ── Flatline micro-jitter (morphing path) ── */
        @keyframes ecg-flatline-jitter {
          0%,100% { d: path('M0,16 L120,16'); }
          18%     { d: path('M0,16 L14,16.5 L28,15.6 L50,16.3 L72,15.7 L92,16.4 L120,16'); }
          36%     { d: path('M0,16 L20,15.5 L42,16.5 L60,15.8 L80,16.3 L102,15.6 L120,16'); }
          54%     { d: path('M0,16 L10,16.4 L34,15.7 L56,16.2 L76,15.9 L96,16.5 L120,16'); }
          72%     { d: path('M0,16 L24,15.6 L46,16.4 L66,16.2 L86,15.7 L108,16.3 L120,16'); }
        }
        .ecg-flatline-jitter {
          animation: ecg-flatline-jitter 3.4s ease-in-out infinite;
        }

        /* ── Flatline haunting glow pulse ── */
        @keyframes ecg-flatline-pulse {
          0%,100% { opacity: 0.2; }
          50%     { opacity: 0.5; }
        }
        .ecg-flatline-pulse {
          animation: ecg-flatline-pulse 2.1s ease-in-out infinite;
        }
      `}</style>

      {/* ── Dim grid baseline ── */}
      <line
        x1="0" y1="16" x2="120" y2="16"
        stroke={strokeColor}
        strokeWidth="0.3"
        strokeOpacity="0.15"
      />

      {/* ── SVG filter defs (one per render, keyed by glow id) ── */}
      <defs>
        <filter id={glowId} x="-20%" y="-100%" width="140%" height="300%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {isBeating && (
        <>
          {/* Glow layer (blurred, behind) */}
          <path
            className="ecg-beat-glow"
            d={QRS_PATH}
            fill="none"
            stroke={strokeColor}
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter={`url(#${glowId})`}
            style={{ animationDuration: beatDuration }}
          />
          {/* Crisp line (front) */}
          <path
            className="ecg-beat-line"
            d={QRS_PATH}
            fill="none"
            stroke={strokeColor}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ animationDuration: beatDuration }}
          />
        </>
      )}

      {isFlatline && (
        <>
          {/* Haunting crimson glow behind the jitter line */}
          <line
            className="ecg-flatline-jitter ecg-flatline-pulse"
            x1="0" y1="16" x2="120" y2="16"
            stroke="#ef4444"
            strokeWidth="5"
            strokeLinecap="round"
            filter="url(#ecg-glow-crimson)"
          />
          {/* Crisp jitter line */}
          <line
            className="ecg-flatline-jitter"
            x1="0" y1="16" x2="120" y2="16"
            stroke="#ef4444"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </>
      )}
    </svg>
  );
}
