"use client";

import React from "react";
import { Zap, ShieldCheck, Cpu, Database, Timer, Flame, RefreshCw } from "lucide-react";
import type { TranslationDictionary } from "@/i18n/types";

// Likwidacja wiszących spójników w opisach kafelków chaosu
function fixOrphans(text?: string | null): string {
  if (!text || typeof text !== "string") return text || "";
  return text.replace(/(^|\s)([aiouwz]|do|na|od|po|ze|we|za|co|że|to)(\s+)/gi, "$1$2\u00A0");
}

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
  t: TranslationDictionary | any;
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
  const c = t?.chaos || t?.chaosSandbox || {};

  const scenarios: ChaosScenario[] = [
    {
      id: "latency-spike",
      title: c?.scenarioLatencyTitle || "Skok opóźnień brzegowych (Latency Spike)",
      desc: c?.scenarioLatencyDesc || "Sztuczne opóźnienie +2500ms na Edge Gateway, powodujące timeouty w UI",
      severity: "P1",
      icon: <Timer className="w-4 h-4 text-amber-500" />,
      affectedNode: "edge-gateway",
      nominalMetrics: { rps: "14.2k", latency: "42ms", errorRate: "0.01%" },
      chaosMetrics: { rps: "8.1k", latency: "2,540ms", errorRate: "14.8%" },
    },
    {
      id: "db-pool-exhaustion",
      title: c?.scenarioDbPoolTitle || "Nasycenie puli bazy danych (DB Pool Saturation)",
      desc: c?.scenarioDbPoolDesc || "100% wykorzystania połączeń PostgreSQL, kaskada błędów 503",
      severity: "P0",
      icon: <Database className="w-4 h-4 text-rose-500" />,
      affectedNode: "database",
      nominalMetrics: { rps: "14.2k", latency: "42ms", errorRate: "0.01%" },
      chaosMetrics: { rps: "820", latency: "12,800ms", errorRate: "98.4%" },
    },
    {
      id: "memory-leak",
      title: c?.scenarioMemoryTitle || "Wyciek pamięci (Heap OOM Leak)",
      desc: c?.scenarioMemoryDesc || "Eksponencjalny wzrost zużycia RAM w puli workerów asynchronicznych",
      severity: "P0",
      icon: <Cpu className="w-4 h-4 text-rose-500" />,
      affectedNode: "worker-pool",
      nominalMetrics: { rps: "14.2k", latency: "42ms", errorRate: "0.01%" },
      chaosMetrics: { rps: "2.4k", latency: "6,400ms", errorRate: "62.1%" },
    },
    {
      id: "auth-storm",
      title: c?.scenarioAuthStormTitle || "Burza unieważnienia sesji (Auth Storm)",
      desc: c?.scenarioAuthStormDesc || "Zmasowane odrzucenia tokenów JWT i lawina żądań ponownego logowania",
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
              {c?.sectionTitle || "PIASKOWNICA INŻYNIERII CHAOSU (LIVE CHAOS SANDBOX)"}
            </h2>
          </div>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
            {fixOrphans(c?.sectionSubtitle || "Wstrzykuj awarie w czasie rzeczywistym i obserwuj kaskadową reakcję telemetrii")}
          </p>
        </div>

        {/* Global Status / Mitigation Button */}
        <div className="flex items-center gap-2">
          {activeChaos && !isResurrected ? (
            <button
              type="button"
              onClick={onMitigate}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              {c?.btnMitigate || "Uruchom Samoleczenie"}
            </button>
          ) : (
            <div className="flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-semibold rounded-md bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_#10b981]" />
              {c?.statusNominal || "SYSTEM NOMINALNY"}
            </div>
          )}
        </div>
      </div>

      {/* Live Telemetry Bar */}
      <div className="grid grid-cols-3 gap-3 p-3.5 rounded-xl bg-stone-50 dark:bg-stone-950/60 border border-stone-200 dark:border-stone-800/80">
        <div>
          <span className="block text-[10px] font-mono uppercase text-stone-600 dark:text-stone-400 font-semibold">
            {c?.metricRps || "PRZEPUSTOWOŚĆ"}
          </span>
          <span className="text-sm sm:text-base font-mono font-bold text-stone-900 dark:text-stone-100">
            {displayedMetrics.rps}
          </span>
        </div>
        <div>
          <span className="block text-[10px] font-mono uppercase text-stone-600 dark:text-stone-400 font-semibold">
            {c?.metricLatency || "OPÓŹNIENIE P99"}
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
          <span className="block text-[10px] font-mono uppercase text-stone-600 dark:text-stone-400 font-semibold">
            {c?.metricErrorRate || "WSKAŹNIK BŁĘDÓW"}
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
                  {fixOrphans(scenario.title)}
                </h3>
                <p className="text-[11px] text-stone-500 dark:text-stone-400 line-clamp-2 leading-relaxed">
                  {fixOrphans(scenario.desc)}
                </p>
              </div>

              <div className="pt-3 mt-2 border-t border-stone-100 dark:border-stone-800/60">
                <button
                  type="button"
                  onClick={() =>
                    isActive ? onMitigate() : onTriggerChaos(scenario.id, scenario.severity)
                  }
                  className={`w-full py-1.5 px-2.5 text-xs font-mono font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                    isActive
                      ? "bg-rose-600 hover:bg-rose-700 text-white"
                      : "bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200"
                  }`}
                >
                  {isActive ? (
                    <>
                      <RefreshCw className="w-3 h-3 animate-spin" />
                      {c?.btnMitigate || "Uruchom Samoleczenie"}
                    </>
                  ) : (
                    <>
                      <Zap className="w-3 h-3 text-amber-500" />
                      {c?.btnInject || "Wstrzyknij awarię"}
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