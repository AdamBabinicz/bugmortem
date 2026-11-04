/**
 * BugMortem Sound Engine
 * Pure Web Audio API procedural synthesizer — zero external files, 0 KB footprint.
 *
 * Three sound programs:
 *   playHeartbeat()       — P1 clinical monitor blip (rhythmic sine, 880 Hz)
 *   startFlatline()       — P0 fatal flatline drone (continuous 750 Hz + low-pass)
 *   stopFlatline()        — fade-out and tear down flatline nodes
 *   playResurrectionChime() — "service restored" 2-tone harmonic sweep
 */

export class SoundEngine {
  private ctx: AudioContext;

  // Flatline nodes kept alive between start/stop
  private flatlineOsc: OscillatorNode | null = null;
  private flatlineFilter: BiquadFilterNode | null = null;
  private flatlineGain: GainNode | null = null;

  // Heartbeat interval timer
  private heartbeatTimer: ReturnType<typeof setInterval> | null = null;

  constructor(ctx: AudioContext) {
    this.ctx = ctx;
  }

  // ── helpers ──────────────────────────────────────────────────────────────

  /** Master output with a limiter to protect ears. */
  private masterGain(): GainNode {
    const g = this.ctx.createGain();
    g.gain.value = 0.18; // -15 dB headroom
    g.connect(this.ctx.destination);
    return g;
  }

  private now(): number {
    return this.ctx.currentTime;
  }

  // ── P1 Heartbeat pulse ────────────────────────────────────────────────────

  /**
   * One clinical monitor blip: short 880 Hz sine with a fast ASR envelope.
   * Call this once per beat; the hook schedules it on an interval.
   */
  playHeartbeat(): void {
    const t = this.now();
    const master = this.masterGain();

    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = 880;

    const env = this.ctx.createGain();
    env.gain.setValueAtTime(0, t);
    env.gain.linearRampToValueAtTime(1, t + 0.008);   // 8 ms attack
    env.gain.exponentialRampToValueAtTime(0.001, t + 0.12); // 120 ms decay

    osc.connect(env);
    env.connect(master);

    osc.start(t);
    osc.stop(t + 0.15); // auto-GC after decay
  }

  startHeartbeat(bpm = 72): void {
    this.stopHeartbeat();
    const intervalMs = (60 / bpm) * 1000;
    this.playHeartbeat(); // immediate first beat
    this.heartbeatTimer = setInterval(() => this.playHeartbeat(), intervalMs);
  }

  stopHeartbeat(): void {
    if (this.heartbeatTimer !== null) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
  }

  // ── P0 Flatline drone ─────────────────────────────────────────────────────

  /**
   * Continuous 750 Hz tone routed through a low-pass filter for an
   * atmospheric, haunting quality — not a raw, ear-piercing sine.
   */
  startFlatline(): void {
    this.stopFlatline();

    const t = this.now();

    const osc = this.ctx.createOscillator();
    osc.type = 'sawtooth'; // richer harmonics for the filter to sculpt
    osc.frequency.value = 750;

    // Low-pass filter: cuts above ~900 Hz, rounded and eerie
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 900;
    filter.Q.value = 4.5; // resonant peak for that haunting quality

    // Slow tremolo via an LFO on the gain
    const lfoOsc = this.ctx.createOscillator();
    lfoOsc.type = 'sine';
    lfoOsc.frequency.value = 0.6; // 0.6 Hz = one breath-like pulse per 1.7 s

    const lfoGain = this.ctx.createGain();
    lfoGain.gain.value = 0.06; // ±6% amplitude modulation

    const mainGain = this.ctx.createGain();
    mainGain.gain.setValueAtTime(0, t);
    mainGain.gain.linearRampToValueAtTime(0.55, t + 1.2); // 1.2 s fade-in

    const master = this.masterGain();

    lfoOsc.connect(lfoGain);
    lfoGain.connect(mainGain.gain);
    osc.connect(filter);
    filter.connect(mainGain);
    mainGain.connect(master);

    osc.start(t);
    lfoOsc.start(t);

    this.flatlineOsc = osc;
    this.flatlineFilter = filter;
    this.flatlineGain = mainGain;

    // Store LFO so we can stop it — attach to osc as a custom property
    (osc as any)._lfoOsc = lfoOsc;
  }

  stopFlatline(): void {
    if (!this.flatlineGain) return;

    const t = this.now();
    this.flatlineGain.gain.cancelScheduledValues(t);
    this.flatlineGain.gain.setValueAtTime(this.flatlineGain.gain.value, t);
    this.flatlineGain.gain.linearRampToValueAtTime(0, t + 0.6); // 600 ms fade-out

    const osc = this.flatlineOsc;
    const lfoOsc: OscillatorNode | undefined = osc ? (osc as any)._lfoOsc : undefined;

    // Schedule stop after fade
    const stopAt = t + 0.65;
    osc?.stop(stopAt);
    lfoOsc?.stop(stopAt);

    this.flatlineOsc = null;
    this.flatlineFilter = null;
    this.flatlineGain = null;
  }

  // ── Resurrection chime ────────────────────────────────────────────────────

  /**
   * Uplifting 2-tone harmonic sweep: C5 (523 Hz) → G5 (784 Hz).
   * Short, clean, signifies the dead service has come back to life.
   */
  playResurrectionChime(): void {
    const t = this.now();
    const master = this.masterGain();

    const freqs: [number, number, number][] = [
      // [frequency Hz, startOffset s, duration s]
      [523.25, 0,    0.35],  // C5
      [659.25, 0.08, 0.35],  // E5 (slightly layered for richness)
      [783.99, 0.22, 0.55],  // G5 — the triumphant top note
    ];

    freqs.forEach(([freq, startOff, dur]) => {
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = freq;

      // Gentle vibrato via detune LFO
      const lfo = this.ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.value = 5;
      const lfoDetune = this.ctx.createGain();
      lfoDetune.gain.value = 8; // ±8 cents vibrato

      const env = this.ctx.createGain();
      const start = t + startOff;
      const end = start + dur;
      env.gain.setValueAtTime(0, start);
      env.gain.linearRampToValueAtTime(0.8, start + 0.04);  // 40 ms attack
      env.gain.setValueAtTime(0.8, end - 0.08);
      env.gain.linearRampToValueAtTime(0, end);             // smooth release

      lfo.connect(lfoDetune);
      lfoDetune.connect(osc.detune);
      osc.connect(env);
      env.connect(master);

      lfo.start(start);
      osc.start(start);
      lfo.stop(end + 0.02);
      osc.stop(end + 0.02);
    });
  }

  // ── Teardown ──────────────────────────────────────────────────────────────

  dispose(): void {
    this.stopHeartbeat();
    this.stopFlatline();
  }
}
