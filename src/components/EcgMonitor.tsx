'use client';

/**
 * EcgMonitor — Cyber-Gothic ECG waveform display.
 *
 * waveformState:
 *   'flatline'  → crimson straight line with micro-jitter noise (P0 / dead service)
 *   'heartbeat' → animated toxic-emerald QRS peaks (resurrected / healthy service)
 *
 * All animation is pure CSS keyframes injected via a <style> tag — no dependencies.
 */

export type WaveformState = 'flatline' | 'heartbeat';

interface EcgMonitorProps {
  state: WaveformState;
}

// ── QRS path (three identical complexes across 120 px viewport width) ────────
//
// Each complex: flat run → P-wave bump → tall QRS spike (Q dip, R peak, S dip)
// → T-wave dome → flat run to next complex.
// Viewport: 120 × 32 px, midline at y=16.
//
// Complex 1: x 0–40, Complex 2: x 40–80, Complex 3: x 80–120
// strokeDasharray = total path length ≈ 310 → drives the scroll animation.

const QRS_PATH =
  'M0,16 ' +
  // Complex 1
  'L8,16 L10,14 L12,16 ' +       // P-wave
  'L14,16 L16,18 L18,2 L20,30 L22,12 L24,16 ' + // Q-R-S spike
  'L26,16 L29,13 L32,16 ' +       // T-wave dome
  'L40,16 ' +
  // Complex 2
  'L48,16 L50,14 L52,16 ' +
  'L54,16 L56,18 L58,2 L60,30 L62,12 L64,16 ' +
  'L66,16 L69,13 L72,16 ' +
  'L80,16 ' +
  // Complex 3
  'L88,16 L90,14 L92,16 ' +
  'L94,16 L96,18 L98,2 L100,30 L102,12 L104,16 ' +
  'L106,16 L109,13 L112,16 ' +
  'L120,16';

export function EcgMonitor({ state }: EcgMonitorProps) {
  const isHeartbeat = state === 'heartbeat';

  return (
    <svg
      viewBox="0 0 120 32"
      className="w-full h-8"
      aria-label={isHeartbeat ? 'ECG: service online' : 'ECG: flatline'}
      aria-hidden="true"
      style={{ overflow: 'visible' }}
    >
      <style>{`
        /* ── Heartbeat scroll ── */
        @keyframes ecg-heartbeat {
          0%   { stroke-dashoffset: 310; opacity: 0.3; }
          5%   { opacity: 1; }
          100% { stroke-dashoffset: 0;   opacity: 1; }
        }
        .ecg-heartbeat-line {
          stroke-dasharray: 310;
          stroke-dashoffset: 310;
          animation: ecg-heartbeat 0.86s linear infinite;
        }

        /* ── Flatline jitter ── */
        @keyframes ecg-flatline-jitter {
          0%,100% { d: path('M0,16 L120,16'); opacity: 1; }
          20%     { d: path('M0,16 L15,16.4 L30,15.7 L50,16.2 L70,15.8 L90,16.3 L120,16'); }
          40%     { d: path('M0,16 L20,15.6 L40,16.4 L60,15.9 L80,16.2 L100,15.7 L120,16'); }
          60%     { d: path('M0,16 L10,16.3 L35,15.8 L55,16.1 L75,15.9 L95,16.4 L120,16'); }
          80%     { d: path('M0,16 L25,15.7 L45,16.3 L65,16.1 L85,15.8 L105,16.2 L120,16'); }
        }
        .ecg-flatline-line {
          animation: ecg-flatline-jitter 3.2s ease-in-out infinite;
        }

        /* ── Flatline glow pulse ── */
        @keyframes ecg-flatline-glow {
          0%,100% { opacity: 0.25; }
          50%     { opacity: 0.55; }
        }
        .ecg-flatline-glow {
          animation: ecg-flatline-glow 2s ease-in-out infinite;
        }

        /* ── Heartbeat glow ── */
        @keyframes ecg-heartbeat-glow {
          0%,100% { opacity: 0; }
          40%,60% { opacity: 0.4; }
        }
        .ecg-heartbeat-glow {
          animation: ecg-heartbeat-glow 0.86s ease-in-out infinite;
        }

        /* ── State transition fade ── */
        .ecg-transition {
          transition: opacity 0.6s ease-in-out;
        }
      `}</style>

      {/* ── Grid baseline ── */}
      <line
        x1="0" y1="16" x2="120" y2="16"
        stroke={isHeartbeat ? '#10b981' : '#ef4444'}
        strokeWidth="0.4"
        strokeOpacity="0.2"
      />

      {isHeartbeat ? (
        <>
          {/* Emerald glow blur layer (rendered first, behind) */}
          <path
            className="ecg-heartbeat-line ecg-heartbeat-glow"
            d={QRS_PATH}
            fill="none"
            stroke="#10b981"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#ecg-glow-emerald)"
            style={{ opacity: 0 }}
          />
          {/* Crisp emerald QRS line */}
          <path
            className="ecg-heartbeat-line"
            d={QRS_PATH}
            fill="none"
            stroke="#10b981"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <defs>
            <filter id="ecg-glow-emerald" x="-20%" y="-80%" width="140%" height="260%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
        </>
      ) : (
        <>
          {/* Crimson flatline glow blur layer */}
          <line
            className="ecg-flatline-line ecg-flatline-glow"
            x1="0" y1="16" x2="120" y2="16"
            stroke="#ef4444"
            strokeWidth="5"
            strokeLinecap="round"
            filter="url(#ecg-glow-crimson)"
          />
          {/* Crisp crimson flatline with micro-jitter */}
          <line
            className="ecg-flatline-line"
            x1="0" y1="16" x2="120" y2="16"
            stroke="#ef4444"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <defs>
            <filter id="ecg-glow-crimson" x="-20%" y="-80%" width="140%" height="260%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
        </>
      )}
    </svg>
  );
}
