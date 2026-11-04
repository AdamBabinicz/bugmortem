'use client';

import { useRef, useEffect, useCallback, useState } from 'react';
import { SoundEngine } from '@/utils/soundEngine';

export type SeverityMode = 'P0' | 'P1' | 'P2' | string;

interface UseAudioEngineResult {
  /** Whether audio output is currently unmuted */
  audioEnabled: boolean;
  /** Toggle mute/unmute — also resumes the AudioContext on first user gesture */
  toggleAudio: () => void;
  /** Fire the resurrection chime AND transition audio from flatline → heartbeat */
  playResurrectionChime: () => void;
}

/**
 * Manages a single AudioContext + SoundEngine instance for the lifetime of
 * the component. Switching severity changes the active sound program.
 * Audio starts muted to comply with browser autoplay policies.
 */
export function useAudioEngine(severity: SeverityMode): UseAudioEngineResult {
  const [audioEnabled, setAudioEnabled] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const engineRef = useRef<SoundEngine | null>(null);

  // Lazily create (or reuse) the AudioContext — must happen after a user gesture.
  const getContext = useCallback((): AudioContext => {
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
    }
    return ctxRef.current;
  }, []);

  const getEngine = useCallback((): SoundEngine => {
    if (!engineRef.current) {
      engineRef.current = new SoundEngine(getContext());
    }
    return engineRef.current;
  }, [getContext]);

  // ── Start the appropriate sound program ──────────────────────────────────

  const startSound = useCallback((sev: SeverityMode): void => {
    const engine = getEngine();
    engine.stopHeartbeat();
    engine.stopFlatline();

    if (sev === 'P0') {
      engine.startFlatline();
    } else {
      // P1: 90 bpm (elevated tension), P2 / other: 70 bpm (stable monitor)
      const bpm = sev === 'P1' ? 90 : 70;
      engine.startHeartbeat(bpm);
    }
  }, [getEngine]);

  const stopSound = useCallback((): void => {
    if (!engineRef.current) return;
    engineRef.current.stopHeartbeat();
    engineRef.current.stopFlatline();
  }, []);

  // ── Toggle mute / unmute ─────────────────────────────────────────────────

  const toggleAudio = useCallback((): void => {
    const ctx = getContext();

    if (!audioEnabled) {
      if (ctx.state === 'suspended') {
        ctx.resume().then(() => startSound(severity));
      } else {
        startSound(severity);
      }
      setAudioEnabled(true);
    } else {
      stopSound();
      if (ctx.state === 'running') ctx.suspend();
      setAudioEnabled(false);
    }
  }, [audioEnabled, severity, getContext, startSound, stopSound]);

  // ── React to severity changes while audio is live ────────────────────────

  useEffect(() => {
    if (!audioEnabled) return;
    const ctx = ctxRef.current;
    if (!ctx || ctx.state === 'suspended') return;
    startSound(severity);
  }, [severity, audioEnabled, startSound]);

  // ── Resurrection chime: play chime then cross-fade to heartbeat ──────────

  const playResurrectionChime = useCallback((): void => {
    if (!audioEnabled) return;
    const ctx = getContext();
    if (ctx.state === 'suspended') return;

    const engine = getEngine();
    // Stop the flatline immediately, play the chime, then start the heartbeat
    engine.stopFlatline();
    engine.playResurrectionChime();

    // Start the healthy heartbeat after the chime's longest note ends (~800 ms)
    setTimeout(() => {
      if (!engineRef.current) return;
      engineRef.current.startHeartbeat(70);
    }, 800);
  }, [audioEnabled, getContext, getEngine]);

  // ── Cleanup on unmount ───────────────────────────────────────────────────

  useEffect(() => {
    return () => {
      engineRef.current?.dispose();
      engineRef.current = null;
      ctxRef.current?.close();
      ctxRef.current = null;
    };
  }, []);

  return { audioEnabled, toggleAudio, playResurrectionChime };
}
