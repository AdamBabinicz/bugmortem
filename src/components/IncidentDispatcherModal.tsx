"use client";

import React, { useState, useId } from "react";
import { X, Copy, Check, ExternalLink, MessageSquare, AlertTriangle, GitPullRequest } from "lucide-react";
import type { IncidentPreset, PostMortemReport, Dictionary } from "@/i18n/types";

interface IncidentDispatcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  incident: IncidentPreset;
  postMortem: PostMortemReport | null;
  isResurrected: boolean;
  t: Dictionary | any;
}

type TabType = "slack" | "pagerduty" | "github";

export const IncidentDispatcherModal: React.FC<IncidentDispatcherModalProps> = ({
  isOpen,
  onClose,
  incident,
  postMortem,
  isResurrected,
  t,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>("slack");
  const [copied, setCopied] = useState<boolean>(false);
  const titleId = useId();

  if (!isOpen || !incident) return null;

  const d = t?.dispatcher || {};
  const dm = t?.dispatcherModal || {};
  const pdf = t?.pdf || {};

  const serviceName = (incident as any).service || incident.badge || 'production-core';
  const domainName = (incident as any).domain || incident.badge || 'infra';
  const incidentRef = `INC-${incident.id.toUpperCase()}-${incident.severity}`;
  const statusLabel = isResurrected 
    ? (pdf.statusResurrected || 'RESURRECTED') 
    : incident.badge;
  const summaryText = postMortem?.summary || incident.title;
  const impactText = postMortem?.impact || pdf.fatalEvent || 'Severe service outage';
  const warRoomUrl = "https://bugmortem.vercel.app";

  // Format 1: Slack / Discord War Room Alert
  const generateSlackAlert = (): string => {
    return [
      `🚨 *[${incident.severity}] ${d.slackHeader || 'PRODUCTION INCIDENT ESCALATION'}*`,
      `*${d.fieldIncidentId || 'Incident Ref'}:* \`${incidentRef}\``,
      `*${d.fieldService || dm.serviceLabel || 'Service'}:* \`${serviceName}\` (${domainName})`,
      `*${d.fieldStatus || 'Status'}:* ${statusLabel}`,
      `*${d.fieldSeverity || dm.severityLabel || 'Severity'}:* *${incident.severity}*`,
      "",
      `*${pdf.section1Title || 'Summary'}:*`,
      `> ${summaryText}`,
      "",
      `*${pdf.section2Title || 'Impact'}:*`,
      `> ${impactText}`,
      "",
      `⚡ *${d.fieldWarRoom || dm.channelLabel || 'War Room'}:* <${warRoomUrl}|${d.slackJoinWarRoom || 'Join War Room Live'}>`,
      `cc: @channel • ${d.slackActionRequired || 'Immediate SRE triage required'}`,
    ].join("\n");
  };

  // Format 2: PagerDuty Events API v2 (CEF JSON)
  const generatePagerDutyPayload = (): string => {
    const payload = {
      routing_key: "SERVICE_INTEGRATION_KEY",
      event_action: isResurrected ? "resolve" : "trigger",
      dedup_key: incidentRef,
      payload: {
        summary: `[${incident.severity}] ${serviceName}: ${incident.title}`,
        source: serviceName,
        severity: incident.severity === "P0" ? "critical" : "error",
        timestamp: new Date().toISOString(),
        component: domainName,
        group: "infrastructure-sre",
        class: domainName,
        custom_details: {
          incident_id: incidentRef,
          status: statusLabel,
          blast_radius_summary: summaryText,
          impact: impactText,
          war_room_url: warRoomUrl,
        },
      },
      client: "BugMortem SRE Studio",
      client_url: warRoomUrl,
    };
    return JSON.stringify(payload, null, 2);
  };

  // Format 3: GitHub Issue Markdown Template
  const generateGithubIssue = (): string => {
    return [
      `## [${incident.severity}] Incident Post-Mortem: ${incident.title}`,
      "",
      `| Metadata | Value |`,
      `|---|---|`,
      `| **Incident Ref** | \`${incidentRef}\` |`,
      `| **Service** | \`${serviceName}\` (${domainName}) |`,
      `| **Severity** | **${incident.severity}** |`,
      `| **Status** | ${statusLabel} |`,
      `| **Category** | ${domainName} |`,
      "",
      `### 1. ${pdf.section1Title || 'Executive Summary'}`,
      summaryText,
      "",
      `### 2. ${pdf.section2Title || 'Blast Radius & Impact'}`,
      impactText,
      "",
      `### 3. ${d.fieldChecklist || 'Remedial Checklist'}`,
      `- [ ] Verify edge routing and traffic rerouting`,
      `- [ ] Rollback or hotfix deployed commit`,
      `- [ ] Drain saturated database / queue connection pools`,
      `- [ ] Validate health check probe recovery across all regions`,
      `- [ ] Update status page to operational`,
      "",
      `### 4. Raw Stack Trace`,
      "```text",
      incident.stackTrace || "No trace available.",
      "```",
      "",
      `_${d.githubLabels || 'Labels: incident, bugmortem, p0-outage'}_`,
    ].join("\n");
  };

  const currentContent =
    activeTab === "slack"
      ? generateSlackAlert()
      : activeTab === "pagerduty"
      ? generatePagerDutyPayload()
      : generateGithubIssue();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleOpenGithub = () => {
    const title = encodeURIComponent(`[${incident.severity}] ${serviceName}: ${incident.title}`);
    const body = encodeURIComponent(generateGithubIssue());
    const githubUrl = `https://github.com/AdamBabinicz/bugmortem/issues/new?title=${title}&body=${body}`;
    window.open(githubUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/50">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
              <h2 id={titleId} className="text-base font-bold text-stone-900 dark:text-stone-100">
                {d.modalTitle || dm.title || 'INCIDENT DISPATCHER & ESCALATION'}
              </h2>
            </div>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
              {d.modalSubtitle || dm.subtitle || 'Direct bridge to War Room and SRE on-call rotations'} • <span className="font-mono font-semibold text-rose-600 dark:text-rose-400">{incidentRef}</span>
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={d.closeBtn || dm.closeCta || 'Close'}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Platform Tabs */}
        <div className="flex border-b border-stone-200 dark:border-stone-800 bg-stone-100/50 dark:bg-stone-950/30 px-5 pt-2 gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("slack")}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-t-lg transition-colors border-b-2 cursor-pointer ${
              activeTab === "slack"
                ? "border-emerald-500 text-emerald-700 dark:text-emerald-400 bg-white dark:bg-stone-900"
                : "border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-300"
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            {d.tabSlack || 'Slack / Discord'}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("pagerduty")}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-t-lg transition-colors border-b-2 cursor-pointer ${
              activeTab === "pagerduty"
                ? "border-amber-500 text-amber-700 dark:text-amber-400 bg-white dark:bg-stone-900"
                : "border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-300"
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            {d.tabPagerDuty || 'PagerDuty (Events API)'}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("github")}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-t-lg transition-colors border-b-2 cursor-pointer ${
              activeTab === "github"
                ? "border-sky-500 text-sky-700 dark:text-sky-400 bg-white dark:bg-stone-900"
                : "border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-300"
            }`}
          >
            <GitPullRequest className="w-3.5 h-3.5" />
            {d.tabGithub || 'GitHub Issue'}
          </button>
        </div>

        {/* Payload Preview */}
        <div className="p-5 flex-1 overflow-y-auto">
          {activeTab === "pagerduty" && (
            <p className="text-xs text-amber-600 dark:text-amber-400/90 mb-2 font-mono bg-amber-50 dark:bg-amber-950/30 p-2 rounded border border-amber-200 dark:border-amber-900/50">
              💡 {d.pdRoutingKeyNotice || 'Replace SERVICE_INTEGRATION_KEY with your real PagerDuty service key.'}
            </p>
          )}

          <pre className="p-4 rounded-lg text-xs font-mono bg-stone-900 text-stone-100 overflow-x-auto whitespace-pre-wrap leading-relaxed border border-stone-800 select-all">
            {currentContent}
          </pre>
        </div>

        {/* Modal Footer Actions */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/50">
          <span className="text-xs text-stone-500 font-mono">
            {activeTab.toUpperCase()} • {incident.severity}
          </span>

          <div className="flex items-center gap-2">
            {activeTab === "github" && (
              <button
                type="button"
                onClick={handleOpenGithub}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-stone-200 hover:bg-stone-300 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 transition-colors cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                {d.openGithubBtn || 'Open GitHub Issue'}
              </button>
            )}

            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? (d.copiedBtn || 'Copied!') : (d.copyBtn || 'Copy Payload')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
