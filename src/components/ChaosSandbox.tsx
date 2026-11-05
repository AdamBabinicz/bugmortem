"use client";

import React from "react";
import { Zap, Activity, Flame, ShieldCheck, Cpu, Database, Timer, RefreshCw } from "lucide-react";
import type { Dictionary } from "@/i18n/types";

export interface ChaosScenario {
  id: string;
  title: string;
  desc: string;
  severity: "P0" | "P1";
  icon: React.ReactNode;
  affectedNode: string;
  nominalMetrics: { rps: string; latency: string; errorRate: string };
  chaosMetrics: { rps: string; latency: string; errorRate: string };
}

interface ChaosSandboxProps {
  t: Dictionary;
  activeChaos: string | null;
  onTriggerChaos: (scenarioId: string, severity: "P0" | "P1") => void;
  onMitigate: () => void;
  isResurrected: boolean;
}

export const ChaosSandbox: React.FC<ChaosSandboxProps> = ({
  t,
  activeChaos,
  onTriggerChaos,
  onMitigate,
  isResurrected,
}) => {
  const scenarios: ChaosScenario[] = [
    {
      id: "latency-spike",
      title: t.chaos.scenarioLatencyTitle,
      desc: t.chaos.scenarioLatencyDesc,
      severity: "P1",
      icon: <Timer className="w-4 h-4 text-amber-500" />,
      affectedNode: "edge-gateway",
      nominalMetrics: { rps: "14.2k", latency: "42ms", errorRate: "0.01%" },
      chaosMetrics: { rps: "8.1k", latency: "2,540ms", errorRate: "14.8%" },
    },
    {
      id: "db-pool-exhaustion",
      title: t.chaos.scenarioDbPoolTitle,
      desc: t.chaos.scenarioDbPoolDesc,
      severity: "P0",
      icon: <Database className="w-4 h-4 text-rose-500" />,
      affectedNode: "database",
      nominalMetrics: { rps: "14.2k", latency: "42ms", errorRate: "0.01%" },
      chaosMetrics: { rps: "820", latency: "12,800ms", errorRate: "98.4%" },
    },
    {
      id: "memory-leak",
      title: t.chaos.scenarioMemoryTitle,
      desc: t.chaos.scenarioMemoryDesc,
      severity: "P0",
      icon: <Cpu className="w-4 h-4 text-rose-500" />,
      affectedNode: "worker-pool",
      nominalMetrics: { rps: "14.2k", latency: "42ms", errorRate: "0.01%" },
      chaosMetrics: { rps: "2.4k", latency: "6,400ms", errorRate: "62.1%" },
    },
    {
      id: "auth-storm",
      title: t.chaos.scenarioAuthStormTitle,
      desc: t.chaos.scenarioAuthStormDesc,
      severity: "P1",
      icon: <Flame className="w-4 h-4 text-amber-500" />,
      affectedNode: "auth-service",
      nominalMetrics: { rps: "14.2k", latency: "42ms", errorRate: "0.01%" },
      chaosMetrics: { rps: "11.0k", latency: "1,120ms", errorRate: "28.5%" },
    },
  ];

  const currentScenario = scenarios.find((s) => s.id === activeChaos);

  const displayedMetrics = currentScenario && !isResurrected
    ? currentScenario.chaosMetrics
    : { rps: "14.2k", latency: "42ms", errorRate: "0.01%" };

  return (
    <section className="rounded-2xl border border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900/50 p-5 sm:p-6 space-y-5 shadow-xl dark:shadow-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 dark:border-stone-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500" />
            <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100">
              {t.chaos.sectionTitle}
            </h2>
          </div>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
            {t.chaos.sectionSubtitle}
          </p>
        </div>

        {/* Global Status / Mitigation Button */}
        <div className="flex items-center gap-2">
          {activeChaos && !isResurrected ? (
            <button
              onClick={onMitigate}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              {t.chaos.btnMitigate}
            </button>
          ) : (
            <div className="flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-semibold rounded-md bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_#10b981]" />
              {t.chaos.statusNominal}
            </div>
          )}
        </div>
      </div>

      {/* Live Telemetry Bar */}
      <div className="grid grid-cols-3 gap-3 p-3.5 rounded-xl bg-stone-50 dark:bg-stone-950/60 border border-stone-200 dark:border-stone-800/80">
        <div>
          <span className="block text-[10px] font-mono uppercase text-stone-500 dark:text-stone-400 font-semibold">
            {t.chaos.metricRps}
          </span>
          <span className="text-sm sm:text-base font-mono font-bold text-stone-900 dark:text-stone-100">
            {displayedMetrics.rps}
          </span>
        </div>
        <div>
          <span className="block text-[10px] font-mono uppercase text-stone-500 dark:text-stone-400 font-semibold">
            {t.chaos.metricLatency}
          </span>
          <span
            className={`text-sm sm:text-base font-mono font-bold ${
              activeChaos && !isResurrected
                ? "text-rose-600 dark:text-rose-400"
                : "text-emerald-600 dark:text-emerald-400"
            }`}
          >
            {displayedMetrics.latency}
          </span>
        </div>
        <div>
          <span className="block text-[10px] font-mono uppercase text-stone-500 dark:text-stone-400 font-semibold">
            {t.chaos.metricErrorRate}
          </span>
          <span
            className={`text-sm sm:text-base font-mono font-bold ${
              activeChaos && !isResurrected
                ? "text-rose-600 dark:text-rose-400"
                : "text-emerald-600 dark:text-emerald-400"
            }`}
          >
            {displayedMetrics.errorRate}
          </span>
        </div>
      </div>

      {/* Scenario Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {scenarios.map((scenario) => {
          const isActive = activeChaos === scenario.id && !isResurrected;
          return (
            <div
              key={scenario.id}
              className={`p-3.5 rounded-xl border transition-all flex flex-col justify-between ${
                isActive
                  ? "bg-rose-50/90 border-rose-500 ring-1 ring-rose-500 shadow-md dark:bg-rose-950/20 dark:border-rose-700"
                  : "bg-white border-stone-200 hover:border-stone-300 dark:bg-stone-900/40 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800/50"
              }`}
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    {scenario.icon}
                    <span className="text-[10px] font-mono uppercase font-bold text-stone-600 dark:text-stone-400">
                      {scenario.severity}
                    </span>
                  </div>
                  {isActive && (
                    <span className="flex h-2 w-2 rounded-full bg-rose-500 animate-ping" />
                  )}
                </div>

                <h3 className="text-xs font-bold text-stone-900 dark:text-stone-100 line-clamp-1">
                  {scenario.title}
                </h3>
                <p className="text-[11px] text-stone-500 dark:text-stone-400 line-clamp-2 leading-relaxed">
                  {scenario.desc}
                </p>
              </div>

              <div className="pt-3 mt-2 border-t border-stone-100 dark:border-stone-800/60">
                <button
                  type="button"
                  onClick={() =>
                    isActive ? onMitigate() : onTriggerChaos(scenario.id, scenario.severity)
                  }
                  className={`w-full py-1.5 px-2.5 text-xs font-mono font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                    isActive
                      ? "bg-rose-600 hover:bg-rose-700 text-white"
                      : "bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200"
                  }`}
                >
                  {isActive ? (
                    <>
                      <RefreshCw className="w-3 h-3 animate-spin" />
                      {t.chaos.btnMitigate}
                    </>
                  ) : (
                    <>
                      <Zap className="w-3 h-3 text-amber-500" />
                      {t.chaos.btnInject}
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
