"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, FastForward, Activity, AlertOctagon } from "lucide-react";
import type { TimelineEvent, Dictionary } from "@/i18n/types";

interface IncidentReplayerProps {
  timeline: TimelineEvent[];
  activeSeverity: string;
  t: Dictionary;
  onStepChange: (stepIndex: number, isFatal: boolean) => void;
  onReset: () => void;
}

export const IncidentReplayer: React.FC<IncidentReplayerProps> = ({
  timeline,
  activeSeverity,
  t,
  onStepChange,
  onReset,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(1);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const totalSteps = timeline.length;
  const activeEvent = timeline[currentStep] || timeline[0];
  const isTerminus = Boolean(activeEvent?.isFatal || currentStep === totalSteps - 1);

  // Zatrzymanie i reset przy zmianie incydentu
  useEffect(() => {
    setIsPlaying(false);
    setCurrentStep(0);
    if (timerRef.current) clearInterval(timerRef.current);
  }, [timeline]);

  // Pętla odtwarzania krok po kroku
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    const intervalTime = 2400 / speed;

    timerRef.current = setInterval(() => {
      setCurrentStep((prev) => {
        const next = prev + 1;
        if (next >= totalSteps) {
          setIsPlaying(false);
          if (timerRef.current) clearInterval(timerRef.current);
          return prev;
        }
        const event = timeline[next];
        onStepChange(next, Boolean(event?.isFatal));
        return next;
      });
    }, intervalTime);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, speed, totalSteps, timeline, onStepChange]);

  const handleTogglePlay = () => {
    if (currentStep >= totalSteps - 1) {
      // Jeśli doszliśmy do końca, restartujemy od zera
      setCurrentStep(0);
      onStepChange(0, Boolean(timeline[0]?.isFatal));
      setIsPlaying(true);
      return;
    }
    setIsPlaying(!isPlaying);
  };

  const handleSelectStep = (idx: number) => {
    setIsPlaying(false);
    setCurrentStep(idx);
    const event = timeline[idx];
    onStepChange(idx, Boolean(event?.isFatal));
  };

  const handleResetReplay = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    if (timerRef.current) clearInterval(timerRef.current);
    onReset();
  };

  const handleToggleSpeed = () => {
    setSpeed((prev) => (prev === 1 ? 2 : 1));
  };

  return (
    <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/60 p-4 space-y-4 shadow-sm">
      {/* Nagłówek Replayera */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 dark:border-stone-800 pb-3">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
            <Activity className="w-4 h-4" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100">
                {t.replayer.title}
              </h3>
              {isPlaying && (
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-700 text-white animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" aria-hidden="true" />
                  {t.replayer.liveBadge || 'LIVE'}
                </span>
              )}
            </div>
            <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
              {t.replayer.subtitle}
            </p>
          </div>
        </div>

        {/* Przyciski sterowania */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={handleToggleSpeed}
            className="px-2 py-1 rounded text-[11px] font-mono font-semibold bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 transition-colors cursor-pointer"
            aria-label={`${t.replayer.ariaSpeed || 'Toggle playback speed'} (${speed}x)`}
            title={`${t.replayer.speedLabel || 'Playback speed'}: ${speed}x`}
          >
            <span className="flex items-center gap-1" aria-hidden="true">
              <FastForward className="w-3 h-3" />
              {speed}x
            </span>
          </button>

          <button
            type="button"
            onClick={handleResetReplay}
            className="p-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-700 transition-colors cursor-pointer"
            aria-label={t.replayer.ariaReset || t.replayer.btnReset || 'Reset Timeline'}
            title={t.replayer.btnReset || 'Reset'}
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={handleTogglePlay}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer shadow-sm ${
              isPlaying
                ? "bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/30"
                : "bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/30"
            }`}
            aria-label={isPlaying
              ? (t.replayer.ariaPause || t.replayer.btnPause || 'Pause')
              : (t.replayer.ariaPlay || t.replayer.btnPlay || 'Play')
            }
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
                <span>{t.replayer.btnPause || t.replayer.pause || 'Pause'}</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
                <span>{t.replayer.btnPlay || t.replayer.play || 'Play'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Pasek postępu i interaktywne kroki (Scrubber) */}
      <div className="space-y-2">
        <div className="relative flex items-center justify-between">
          {/* Szary pasek tła */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-stone-200 dark:bg-stone-800 rounded-full -z-0" />

          {/* Kolorowy pasek postępu */}
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-amber-500 to-rose-600 rounded-full transition-all duration-300 -z-0"
            style={{ width: `${(currentStep / (totalSteps - 1 || 1)) * 100}%` }}
          />

          {/* Punkty kroków */}
          {timeline.map((evt, idx) => {
            const isPassed = idx <= currentStep;
            const isCurrent = idx === currentStep;
            const isStepFatal = Boolean(evt.isFatal);

            return (
              <button
                key={`replay-step-${idx}`}
                type="button"
                onClick={() => handleSelectStep(idx)}
                className={`relative z-10 w-7 h-7 rounded-full flex items-center justify-center font-mono text-[10px] font-bold border-2 transition-all cursor-pointer ${
                  isCurrent
                    ? isStepFatal
                      ? "bg-rose-600 border-white dark:border-stone-900 text-white ring-4 ring-rose-500/30 scale-110"
                      : "bg-amber-500 border-white dark:border-stone-900 text-white ring-4 ring-amber-500/30 scale-110"
                    : isPassed
                    ? "bg-stone-700 dark:bg-stone-800 border-stone-500 dark:border-stone-600 text-white dark:text-stone-200"
                    : "bg-stone-200 dark:bg-stone-800 border-stone-300 dark:border-stone-700 text-stone-500"
                }`}
                aria-label={`${t.replayer.stepPrefix || 'Step'} ${idx + 1}: [${evt.time}] ${evt.desc}`}
                aria-current={isCurrent ? 'step' : undefined}
                title={`[${evt.time}] ${evt.desc}`}
              >
                <span aria-hidden="true">{idx + 1}</span>
              </button>
            );
          })}
        </div>

        {/* Etykiety pod osią */}
        <div className="flex justify-between text-[10px] font-mono text-stone-500 dark:text-stone-400 px-1">
          <span>{t.replayer.statusInitial}</span>
          {totalSteps > 2 && <span>{t.replayer.statusDegrading}</span>}
          <span className="text-rose-600 dark:text-rose-400 font-bold">{t.replayer.statusTerminus}</span>
        </div>
      </div>

      {/* Aktywna klatka zdarzenia w czasie */}
      <div
        className={`p-3 rounded-lg border text-xs font-mono transition-all ${
          isTerminus
            ? "bg-rose-50/70 dark:bg-rose-950/30 border-rose-300 dark:border-rose-900/50 text-rose-900 dark:text-rose-200"
            : "bg-stone-50 dark:bg-stone-950/60 border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200"
        }`}
      >
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="font-bold flex items-center gap-1.5 text-[11px]">
            {isTerminus ? (
              <AlertOctagon className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
            ) : (
              <Activity className="w-3.5 h-3.5 text-amber-500" />
            )}
            <span>
              {t.replayer.stepPrefix} {currentStep + 1}/{totalSteps} • [{activeEvent?.time}]
            </span>
          </span>
          <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${
            isTerminus
              ? "bg-rose-200 dark:bg-rose-900/50 text-rose-800 dark:text-rose-300"
              : "bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300"
          }`}>
            {isTerminus ? activeSeverity : "P1 ANOMALY"}
          </span>
        </div>
        <p className="text-xs leading-relaxed">
          {activeEvent?.desc}
        </p>
      </div>
    </div>
  );
};