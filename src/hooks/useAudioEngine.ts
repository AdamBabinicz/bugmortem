'use client';

import { useRef, useEffect, useCallback, useState } from 'react';
import { SoundEngine } from '@/utils/soundEngine';

export type SeverityMode = 'P0' | 'P1' | 'P2' | string;

interface UseAudioEngineResult {
  /** Whether audio output is currently unmuted */
  audioEnabled: boolean;
  /** Toggle mute/unmute — also resumes the AudioContext on first user gesture */
  toggleAudio: () => void;
  /** Fire the resurrection chime (called after copying resurrected code) */
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

  // Lazily create (or reuse) the AudioContext — must happen in response to
  // a user gesture to satisfy browser autoplay policies.
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
    // Stop whatever was running first
    engine.stopHeartbeat();
    engine.stopFlatline();

    if (sev === 'P0') {
      engine.startFlatline();
    } else {
      // P1, P2, custom incidents — rhythmic heartbeat
      // P1: 90 bpm (elevated tension), P2: 72 bpm (stable warning)
      const bpm = sev === 'P1' ? 90 : 72;
      engine.startHeartbeat(bpm);
    }
  }, [getEngine]);

  const stopSound = useCallback((): void => {
    if (!engineRef.current) return;
    engineRef.current.stopHeartbeat();
    engineRef.current.stopFlatline();
  }, []);

  // ── Toggle ───────────────────────────────────────────────────────────────

  const toggleAudio = useCallback((): void => {
    const ctx = getContext();

    if (!audioEnabled) {
      // Unmuting: resume context (required after autoplay suspension)
      if (ctx.state === 'suspended') {
        ctx.resume().then(() => startSound(severity));
      } else {
        startSound(severity);
      }
      setAudioEnabled(true);
    } else {
      // Muting
      stopSound();
      // Suspend context to free OS audio resources
      if (ctx.state === 'running') {
        ctx.suspend();
      }
      setAudioEnabled(false);
    }
  }, [audioEnabled, severity, getContext, startSound, stopSound]);

  // ── React to severity changes while audio is playing ────────────────────

  useEffect(() => {
    if (!audioEnabled) return;
    const ctx = ctxRef.current;
    if (!ctx || ctx.state === 'suspended') return;
    startSound(severity);
  }, [severity, audioEnabled, startSound]);

  // ── Resurrection chime ───────────────────────────────────────────────────

  const playResurrectionChime = useCallback((): void => {
    if (!audioEnabled) return;
    const ctx = getContext();
    if (ctx.state === 'suspended') return;
    getEngine().playResurrectionChime();
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
