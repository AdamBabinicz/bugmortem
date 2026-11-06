/**
 * BugMortem Sound Engine
 * Pure Web Audio API procedural synthesizer — zero external files, 0 KB footprint.
 *
 * Four sound programs:
 *   playHeartbeat()          — P1 clinical monitor blip (rhythmic sine, 880 Hz)
 *   startFlatline()          — P0 fatal flatline drone (continuous 750 Hz + low-pass)
 *   stopFlatline()           — fade-out and tear down flatline nodes
 *   playDefibrillatorShock() — capacitor charge sweep (280→1400 Hz) + discharge thump (120→35 Hz)
 *   playResurrectionChime()  — defibrillator shock → "service restored" C-major chord (C5-E5-G5)
 *
 * Resurrection sequence total duration: ~2 050 ms
 *   0 ms    charge sweep   (800 ms)
 *   800 ms  discharge thump (250 ms)
 *   1 050 ms silence gap    (200 ms)
 *   1 250 ms C-major chord  (C5 0 ms, E5 +80 ms, G5 +220 ms, last note ends at ~800 ms)
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

  // ── Defibrillator shock ───────────────────────────────────────────────────

  /**
   * Two-stage defibrillator sequence:
   *
   *  Stage 1 — Capacitor charge (800 ms):
   *    Sawtooth oscillator with an exponential frequency sweep 280 → 1 400 Hz,
   *    routed through a band-pass filter (Q=12) that adds a clinical whine.
   *    Gain ramps up from 0 to 0.7 over the full 800 ms — tension building.
   *
   *  Stage 2 — Discharge thump (250 ms, starts at +800 ms):
   *    Low-frequency sine sweep 120 → 35 Hz (body-impact thump).
   *    Hard transient attack (5 ms) then exponential decay to silence.
   *    A separate noise burst (white noise through low-pass 200 Hz) adds
   *    the physical "thud" texture of chest contact.
   *
   * Total duration: ~1 050 ms. Returns the absolute AudioContext time at
   * which the discharge ends, so callers can schedule follow-on audio.
   */
  playDefibrillatorShock(): number {
    const t = this.now();

    // ── Stage 1: capacitor charge sweep ──────────────────────────────────
    const chargeOsc = this.ctx.createOscillator();
    chargeOsc.type = 'sawtooth';
    chargeOsc.frequency.setValueAtTime(280, t);
    chargeOsc.frequency.exponentialRampToValueAtTime(1400, t + 0.8); // 280→1400 Hz over 800 ms

    const chargeBpf = this.ctx.createBiquadFilter();
    chargeBpf.type = 'bandpass';
    chargeBpf.frequency.setValueAtTime(280, t);
    chargeBpf.frequency.exponentialRampToValueAtTime(1400, t + 0.8);
    chargeBpf.Q.value = 12; // tight clinical whine

    const chargeEnv = this.ctx.createGain();
    chargeEnv.gain.setValueAtTime(0, t);
    chargeEnv.gain.linearRampToValueAtTime(0.7, t + 0.8); // slow build-up

    const chargeMaster = this.masterGain();
    chargeOsc.connect(chargeBpf);
    chargeBpf.connect(chargeEnv);
    chargeEnv.connect(chargeMaster);

    chargeOsc.start(t);
    chargeOsc.stop(t + 0.82); // tiny tail before discharge

    // ── Stage 2: discharge thump ──────────────────────────────────────────
    const dischargeStart = t + 0.8;
    const dischargeEnd   = dischargeStart + 0.25;

    // Sub-bass sine: 120 → 35 Hz body-impact sweep
    const thumpOsc = this.ctx.createOscillator();
    thumpOsc.type = 'sine';
    thumpOsc.frequency.setValueAtTime(120, dischargeStart);
    thumpOsc.frequency.exponentialRampToValueAtTime(35, dischargeEnd);

    const thumpEnv = this.ctx.createGain();
    thumpEnv.gain.setValueAtTime(0, dischargeStart);
    thumpEnv.gain.linearRampToValueAtTime(1.0, dischargeStart + 0.005); // 5 ms hard attack
    thumpEnv.gain.exponentialRampToValueAtTime(0.001, dischargeEnd);    // decay to silence

    const thumpMaster = this.masterGain();
    thumpOsc.connect(thumpEnv);
    thumpEnv.connect(thumpMaster);
    thumpOsc.start(dischargeStart);
    thumpOsc.stop(dischargeEnd + 0.02);

    // Noise burst: white noise through low-pass 200 Hz — chest-contact "thud" texture
    const bufferSize = this.ctx.sampleRate * 0.15; // 150 ms of noise
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1; // white noise
    }

    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;

    const noiseLpf = this.ctx.createBiquadFilter();
    noiseLpf.type = 'lowpass';
    noiseLpf.frequency.value = 200;

    const noiseEnv = this.ctx.createGain();
    noiseEnv.gain.setValueAtTime(0, dischargeStart);
    noiseEnv.gain.linearRampToValueAtTime(0.35, dischargeStart + 0.005);
    noiseEnv.gain.exponentialRampToValueAtTime(0.001, dischargeStart + 0.15);

    const noiseMaster = this.masterGain();
    noiseSource.connect(noiseLpf);
    noiseLpf.connect(noiseEnv);
    noiseEnv.connect(noiseMaster);
    noiseSource.start(dischargeStart);
    noiseSource.stop(dischargeStart + 0.16);

    // Return the timestamp when discharge ends so callers can chain audio
    return dischargeEnd;
  }

  // ── Resurrection chime ────────────────────────────────────────────────────

  /**
   * Full resurrection sequence:
   *   1. playDefibrillatorShock() — 1 050 ms (charge 800 ms + discharge 250 ms)
   *   2. 200 ms silence gap       — dramatic breath before the chord
   *   3. C-major chord            — C5 → E5 → G5 staggered (0 / +80 / +220 ms)
   *
   * Total: ~2 050 ms before the chord's last note decays.
   */
  playResurrectionChime(): void {
    // Fire defibrillator and get absolute time when discharge finishes
    const shockEnd = this.playDefibrillatorShock();

    // Chord starts 200 ms after the shock ends (silence gap for dramatic effect)
    const chordOrigin = shockEnd + 0.2;

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
      const start = chordOrigin + startOff;
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
