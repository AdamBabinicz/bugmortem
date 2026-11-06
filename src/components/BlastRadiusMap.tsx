'use client';

import React from 'react';
import { useI18n } from '@/i18n/context';
import {
  Globe,
  Network,
  ShieldCheck,
  Database,
  Cpu,
  Flame,
  AlertTriangle,
  CheckCircle2,
  Activity,
} from 'lucide-react';

export type NodeHealthStatus = 'patient-zero' | 'degraded' | 'healthy' | 'resurrected';

interface BlastRadiusMapProps {
  incidentId: string;
  category?: string;
  isResurrected: boolean;
}

interface ServiceNode {
  id: string;
  nameKey: 'nodeClientSpa' | 'nodeEdgeGateway' | 'nodeAuthService' | 'nodeDatabase' | 'nodeWorkerPool';
  descKey: 'nodeClientSpaDesc' | 'nodeEdgeGatewayDesc' | 'nodeAuthServiceDesc' | 'nodeDatabaseDesc' | 'nodeWorkerPoolDesc';
  icon: React.ElementType;
}

const SERVICE_NODES: ServiceNode[] = [
  {
    id: 'client-spa',
    nameKey: 'nodeClientSpa',
    descKey: 'nodeClientSpaDesc',
    icon: Globe,
  },
  {
    id: 'edge-gateway',
    nameKey: 'nodeEdgeGateway',
    descKey: 'nodeEdgeGatewayDesc',
    icon: Network,
  },
  {
    id: 'auth-service',
    nameKey: 'nodeAuthService',
    descKey: 'nodeAuthServiceDesc',
    icon: ShieldCheck,
  },
  {
    id: 'database',
    nameKey: 'nodeDatabase',
    descKey: 'nodeDatabaseDesc',
    icon: Database,
  },
  {
    id: 'worker-pool',
    nameKey: 'nodeWorkerPool',
    descKey: 'nodeWorkerPoolDesc',
    icon: Cpu,
  },
];

export function BlastRadiusMap({
  incidentId,
  category = 'frontend',
  isResurrected,
}: BlastRadiusMapProps) {
  const { t } = useI18n();
  const b = t?.blastRadius;

  // Obliczenie stanu zdrowia każdego węzła na podstawie incydentu
  const getNodeStatus = (nodeId: string): NodeHealthStatus => {
    if (isResurrected) return 'resurrected';

    switch (incidentId) {
      case 'react-hydration':
        if (nodeId === 'client-spa') return 'patient-zero';
        if (nodeId === 'edge-gateway') return 'degraded';
        return 'healthy';

      case 'connection-pool':
        if (nodeId === 'database') return 'patient-zero';
        if (nodeId === 'auth-service' || nodeId === 'edge-gateway' || nodeId === 'client-spa') {
          return 'degraded';
        }
        return 'healthy';

      case 'oom-reaper':
        if (nodeId === 'worker-pool') return 'patient-zero';
        if (nodeId === 'edge-gateway') return 'degraded';
        return 'healthy';

      case 'retry-storm':
        if (nodeId === 'edge-gateway') return 'patient-zero';
        if (nodeId === 'auth-service' || nodeId === 'database') return 'degraded';
        return 'healthy';

      case 'cors-nightmare':
        if (nodeId === 'edge-gateway') return 'patient-zero';
        if (nodeId === 'client-spa') return 'degraded';
        return 'healthy';

      case 's3-lambda-loop':
        if (nodeId === 'worker-pool') return 'patient-zero';
        if (nodeId === 'edge-gateway' || nodeId === 'database' || nodeId === 'auth-service') return 'degraded';
        return 'healthy';

      default:
        // Własne incydenty dopasowane do kategorii
        if (category === 'frontend') {
          if (nodeId === 'client-spa') return 'patient-zero';
          if (nodeId === 'edge-gateway') return 'degraded';
        } else if (category === 'database') {
          if (nodeId === 'database') return 'patient-zero';
          if (nodeId === 'auth-service') return 'degraded';
        } else if (category === 'infra') {
          if (nodeId === 'edge-gateway') return 'patient-zero';
          if (nodeId === 'client-spa') return 'degraded';
        } else {
          if (nodeId === 'worker-pool') return 'patient-zero';
          if (nodeId === 'database') return 'degraded';
        }
        return 'healthy';
    }
  };

  const getStatusBadge = (status: NodeHealthStatus) => {
    switch (status) {
      case 'patient-zero':
        return {
          label: b?.statusPatientZero || 'PATIENT ZERO',
          badgeClass: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800/60 animate-pulse',
          cardClass: 'border-rose-500 shadow-md shadow-rose-500/20 bg-rose-50/80 dark:bg-rose-950/30 ring-1 ring-rose-500/50',
          iconColor: 'text-rose-600 dark:text-rose-400',
          StatusIcon: Flame,
        };
      case 'degraded':
        return {
          label: b?.statusDegraded || 'DEGRADED',
          badgeClass: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800/60',
          cardClass: 'border-amber-400 bg-amber-50/50 dark:border-amber-800/70 dark:bg-amber-950/20 shadow-sm',
          iconColor: 'text-amber-600 dark:text-amber-400',
          StatusIcon: AlertTriangle,
        };
      case 'resurrected':
        return {
          label: b?.statusResurrected || 'RESURRECTED',
          badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800/60',
          cardClass: 'border-emerald-400 bg-emerald-50/40 dark:border-emerald-800/70 dark:bg-emerald-950/20 shadow-sm',
          iconColor: 'text-emerald-600 dark:text-emerald-400',
          StatusIcon: CheckCircle2,
        };
      case 'healthy':
      default:
        return {
          label: b?.statusHealthy || 'HEALTHY',
          badgeClass: 'bg-stone-100 text-stone-700 border-stone-300 dark:bg-stone-800 dark:text-stone-300 dark:border-stone-700',
          cardClass: 'border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900/60 shadow-sm',
          iconColor: 'text-stone-600 dark:text-stone-400',
          StatusIcon: CheckCircle2,
        };
    }
  };

  // Metryki podsumowania skażenia
  const statuses = SERVICE_NODES.map((n) => getNodeStatus(n.id));
  const criticalCount = statuses.filter((s) => s === 'patient-zero').length;
  const degradedCount = statuses.filter((s) => s === 'degraded').length;
  const healthyCount = statuses.filter((s) => s === 'healthy' || s === 'resurrected').length;

  return (
    <section className="rounded-2xl border border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900/50 p-5 sm:p-7 space-y-5 shadow-xl dark:shadow-2xl">
      {/* Nagłówek i Metryki */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-4">
        <div>
          <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200 flex items-center gap-2">
            <Activity className="w-4 h-4 text-rose-600 dark:text-rose-500" />
            {b?.title || 'Architecture Blast Radius'}
          </h2>
          <p className="text-xs text-stone-600 dark:text-stone-300 mt-1 leading-relaxed">
            {b?.subtitle || ''}
          </p>
        </div>

        {/* Pigułki metryk na żywo */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg border bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-900/50">
            {criticalCount} {b?.metricCritical || 'Critical'}
          </span>
          <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg border bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900/50">
            {degradedCount} {b?.metricDegraded || 'Degraded'}
          </span>
          <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg border bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900/50">
            {healthyCount} {b?.metricHealthy || 'Healthy'}
          </span>
        </div>
      </div>

      {/* Siatka Mikroserwisów (Topologia) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        {SERVICE_NODES.map((node) => {
          const status = getNodeStatus(node.id);
          const { label, badgeClass, cardClass, iconColor, StatusIcon } = getStatusBadge(status);
          const NodeIcon = node.icon;

          return (
            <div
              key={`node-${node.id}`}
              className={`rounded-xl border p-4 flex flex-col justify-between transition-all ${cardClass}`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <NodeIcon className={`w-4 h-4 ${iconColor} shrink-0`} />
                  <span className={`text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border whitespace-nowrap ${badgeClass}`}>
                    {label}
                  </span>
                </div>
                <h3 className="font-bold text-xs text-stone-900 dark:text-stone-100 line-clamp-1 mb-1">
                  {b?.[node.nameKey] || node.id}
                </h3>
                <p className="text-[10px] text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
                  {b?.[node.descKey] || ''}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-stone-200/60 dark:border-stone-800/80 flex items-center justify-between text-[9px] font-mono text-stone-500 dark:text-stone-400">
                <span>STATUS</span>
                <span className="flex items-center gap-1 font-bold">
                  <StatusIcon className={`w-3 h-3 ${iconColor}`} />
                  {status === 'patient-zero' ? 'FAIL' : status === 'degraded' ? 'WARN' : '200 OK'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legenda na dole */}
      <div className="flex flex-wrap items-center justify-end gap-3 sm:gap-6 pt-2 text-[10px] font-mono text-stone-600 dark:text-stone-400">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_6px_#f43f5e]" />
          {b?.legendPatientZero || 'Patient Zero'}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          {b?.legendCascading || 'Cascading Blast'}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          {b?.legendHealthy || 'Healthy'}
        </span>
      </div>
    </section>
  );
}
