export type Locale = 'en' | 'pl';

export type IncidentSeverity = 'SEV-1' | 'SEV-2' | 'SEV-3' | 'SEV-4';

export type IncidentCategory =
  | 'database'
  | 'memory'
  | 'network'
  | 'concurrency'
  | 'security'
  | 'custom';

export interface TimelineEvent {
  time: string;
  event: string;
  status: 'nominal' | 'degraded' | 'critical' | 'resolved';
}

export interface SafePattern {
  name: string;
  pattern: string;
  codeSnippet: string;
}

export interface ActionItem {
  task: string;
  owner: string;
  priority: 'high' | 'medium' | 'low';
  deadline: string;
}

export interface Incident {
  id: string;
  title: string;
  category: IncidentCategory;
  severity: IncidentSeverity;
  summary: string;
  rootCause: string;
  impact: string;
  timeline: TimelineEvent[];
  safePattern: SafePattern;
  actionItems: ActionItem[];
}

export interface LegalDictionary {
  modalTitle?: string;
  title?: string;
  terms?: string;
  termsTitle?: string;
  termsContent?: string;
  privacy?: string;
  privacyTitle?: string;
  privacyContent?: string;
  cookies?: string;
  cookiesTitle?: string;
  cookiesContent?: string;
  disclaimer?: string;
  disclaimerTitle?: string;
  disclaimerContent?: string;
  gdpr?: string;
  gdprTitle?: string;
  gdprContent?: string;
  [key: string]: any;
}

export interface CommonDictionary {
  close?: string;
  cancel?: string;
  save?: string;
  back?: string;
  loading?: string;
  [key: string]: any;
}

export interface Dictionary {
  appName: string;
  appTagline: string;
  hackathonBadge: string;
  themeToggle: string;
  languageToggle: string;
  incidentsListTitle: string;
  customAutopsyBtn: string;
  presetTitles: Record<string, string>;
  autopsyModalTitle: string;
  autopsyTitleLabel: string;
  autopsyTitlePlaceholder: string;
  autopsyDescLabel: string;
  autopsyDescPlaceholder: string;
  autopsyCategoryLabel: string;
  autopsySeverityLabel: string;
  autopsySubmitBtn: string;
  autopsyCancelBtn: string;
  reportTitle: string;
  reportBadge: string;
  severityLabel: string;
  categoryLabel: string;
  impactLabel: string;
  rootCauseLabel: string;
  timelineTitle: string;
  safePatternTitle: string;
  actionItemsTitle: string;
  exportMarkdownBtn: string;
  copiedNotification: string;
  taskHeader: string;
  ownerHeader: string;
  priorityHeader: string;
  deadlineHeader: string;
  footerCopyright: string;
  footerDisclaimer: string;
  categories: Record<IncidentCategory, string>;
  severities: Record<IncidentSeverity, string>;
  legal: LegalDictionary;
  common: CommonDictionary;
  [key: string]: any;
}