export type Locale = 'pl' | 'en';

export type IncidentSeverity = 'P0' | 'P1' | 'P2';

export interface TimelineEvent {
  time: string;
  desc: string;
  isFatal?: boolean;
}

export interface PostMortemReport {
  summary: string;
  impact: string;
  actionItems: string[];
}

export interface IncidentPreset {
  id: string;
  badge: string;
  severity: string;
  title: string;
  desc: string;
  crashedCode: string;
  resurrectedCode: string;
  stackTrace: string;
  timeline: TimelineEvent[];
  postMortemReport: PostMortemReport;
}

export interface Dictionary {
  badgeHackathon: string;
  title: string;
  subtitle: string;
  statusLabel: string;
  statusValue: string;
  presetsSectionTitle: string;
  crashedBadge: string;
  resurrectedBadge: string;
  autopsyTitle: string;
  crashedCodeTitle: string;
  resurrectedCodeTitle: string;
  copyCodeBtn: string;
  copiedCodeBtn: string;
  stackTraceTitle: string;
  timelineTitle: string;
  postMortemTitle: string;
  postMortemSummaryHeading: string;
  postMortemImpactHeading: string;
  postMortemActionsHeading: string;
  exportReportBtn: string;
  downloadSuccess: string;
  // Custom Autopsy Form & Modal
  customAutopsyBtn: string;
  customModalTitle: string;
  customModalSubtitle: string;
  fieldIncidentTitle: string;
  fieldIncidentTitlePlaceholder: string;
  fieldCategory: string;
  fieldSeverity: string;
  fieldCrashedCode: string;
  fieldCrashedCodePlaceholder: string;
  fieldStackTrace: string;
  fieldStackTracePlaceholder: string;
  fieldResurrectedCode: string;
  fieldResurrectedCodePlaceholder: string;
  btnAnalyzeAndGenerate: string;
  btnCancel: string;
  validationErrorRequired: string;
  // Categories & Severities
  categoryFrontend: string;
  categoryBackend: string;
  categoryDatabase: string;
  categoryInfra: string;
  severityP0: string;
  severityP1: string;
  severityP2: string;
  // Presets
  presets: Record<string, IncidentPreset>;
  // Footer & Cookie Banner
  cookieTitle: string;
  cookieDesc: string;
  cookieAcceptAll: string;
  cookieEssentialOnly: string;
  cookieCustomize: string;
  cookieDrawerTitle: string;
  cookieAnalytics: string;
  cookieAnalyticsDesc: string;
  cookieMarketing: string;
  cookieMarketingDesc: string;
  cookieSavePreferences: string;
  footerRights: string;
  footerPrivacy: string;
  footerTerms: string;
  footerCookieSettings: string;
}