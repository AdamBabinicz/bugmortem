export type Locale = 'en' | 'pl';

export interface TimelineEvent {
  time: string;
  desc: string;
  isFatal?: boolean;
  status?: string;
  [key: string]: any;
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
  [key: string]: any;
}

export interface CookiesDictionary {
  title: string;
  description: string;
  essential: string;
  essentialDesc: string;
  alwaysActive: string;
  analytics: string;
  analyticsDesc: string;
  marketing: string;
  marketingDesc: string;
  savePreferences: string;
  acceptAll: string;
  rejectAll: string;
  hideDetails: string;
  customize: string;
  [key: string]: any;
}

export interface LegalDictionary {
  modalTitle?: string;
  title?: string;
  terms?: string;
  termsTitle?: string;
  termsContent?: string;
  termsGeneralHeader?: string;
  termsGeneralText?: string;
  termsLiabilityHeader?: string;
  termsLiabilityText?: string;
  privacy?: string;
  privacyTitle?: string;
  privacyContent?: string;
  privacyAdminHeader?: string;
  privacyAdminText?: string;
  privacyScopeHeader?: string;
  privacyScopeText?: string;
  cookies?: string;
  cookiesTitle?: string;
  cookiesContent?: string;
  cookiesUsageHeader?: string;
  cookiesUsageText?: string;
  disclaimer?: string;
  disclaimerTitle?: string;
  disclaimerContent?: string;
  gdpr?: string;
  gdprTitle?: string;
  gdprContent?: string;
  lastUpdated?: string;
  [key: string]: any;
}

export interface CommonDictionary {
  close?: string;
  cancel?: string;
  save?: string;
  back?: string;
  loading?: string;
  status?: string;
  filter?: string;
  search?: string;
  [key: string]: any;
}

export interface Dictionary {
  title: string;
  subtitle: string;
  badgeHackathon: string;
  statusLabel: string;
  statusValue: string;
  customAutopsyBtn: string;
  presetsSectionTitle: string;
  autopsyTitle: string;
  copyCodeBtn: string;
  copiedCodeBtn: string;
  crashedCodeTitle: string;
  crashedBadge: string;
  resurrectedCodeTitle: string;
  resurrectedBadge: string;
  stackTraceTitle: string;
  timelineTitle: string;
  postMortemTitle: string;
  exportReportBtn: string;
  downloadSuccess: string;
  postMortemSummaryHeading: string;
  postMortemImpactHeading: string;
  postMortemActionsHeading: string;
  customModalTitle: string;
  customModalSubtitle: string;
  fieldIncidentTitle: string;
  fieldIncidentTitlePlaceholder: string;
  fieldCategory: string;
  categoryFrontend: string;
  categoryBackend: string;
  categoryDatabase: string;
  categoryInfra: string;
  fieldSeverity: string;
  severityP0: string;
  severityP1: string;
  severityP2: string;
  fieldStackTrace: string;
  fieldStackTracePlaceholder: string;
  fieldCrashedCode: string;
  fieldCrashedCodePlaceholder: string;
  fieldResurrectedCode: string;
  fieldResurrectedCodePlaceholder: string;
  btnCancel: string;
  btnAnalyzeAndGenerate: string;
  validationErrorRequired: string;
  footerRights: string;
  footerPrivacy: string;
  footerTerms: string;
  footerCookieSettings: string;
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
  cookies: CookiesDictionary;
  presets: Record<string, IncidentPreset>;
  legal: LegalDictionary;
  common: CommonDictionary;
  [key: string]: any;
}