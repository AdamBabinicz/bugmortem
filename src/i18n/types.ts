export type Severity = 'P0' | 'P1';
export type Locale = 'pl' | 'en';

export interface TimelineEvent {
  time: string;
  label?: string;
  description?: string;
  desc?: string;
  isFatal?: boolean;
}

export interface BlastRadiusNode {
  id: string;
  name: string;
  role: string;
  status: 'epicenter' | 'degraded' | 'healthy';
  statusCode: string;
}

export interface BlastRadiusSummary {
  epicenterCount: number;
  degradedCount: number;
  healthyCount: number;
}

export interface BlastRadiusData {
  nodes: BlastRadiusNode[];
  summary: BlastRadiusSummary;
}

export interface ChaosMetric {
  id: string;
  name: string;
  severity: Severity;
  description: string;
  status: 'nominal' | 'injecting' | 'recovered';
}

export interface PostMortemData {
  summary: string;
  impact: string;
  actionItems: string[];
}

export type PostMortemReport = PostMortemData;

export interface ReplayerStep {
  step: number;
  timeOffset: string;
  title: string;
  description: string;
  telemetry: {
    latencyMs: number;
    errorRate: string;
    rps: string;
  };
  severity: Severity;
}

export interface IncidentPreset {
  id: string;
  title: string;
  badge: string;
  severity: Severity | string;
  description?: string;
  desc?: string;
  codeSnippet?: string;
  crashedCode?: string;
  revivedCode?: string;
  resurrectedCode?: string;
  stackTrace: string;
  timeline: TimelineEvent[];
  blastRadius?: BlastRadiusData;
  chaosMetrics?: ChaosMetric[];
  postMortem?: PostMortemData;
  postMortemReport?: PostMortemData;
  replayerSteps?: ReplayerStep[];
  fiveWhys?: string[];
}

export interface FiveWhysDictionary {
  sectionTitle?: string;
  sectionSubtitle?: string;
  levels?: [string, string, string, string, string];
  blamelessBadge?: string;
  rootCauseBadge?: string;
  copyChain?: string;
  copied?: string;
  [key: string]: any;
}

export interface ReplayerDictionary {
  title?: string;
  subtitle?: string;
  play?: string;
  pause?: string;
  reset?: string;
  speed?: string;
  stepOf?: string;
  telemetryLatency?: string;
  telemetryErrors?: string;
  telemetryRps?: string;
  [key: string]: any;
}

export interface ChaosDictionary {
  sectionTitle?: string;
  sectionSubtitle?: string;
  btnMitigate?: string;
  btnInject?: string;
  statusNominal?: string;
  metricRps?: string;
  metricLatency?: string;
  metricErrorRate?: string;
  scenarioLatencyTitle?: string;
  scenarioLatencyDesc?: string;
  scenarioDbPoolTitle?: string;
  scenarioDbPoolDesc?: string;
  scenarioMemoryTitle?: string;
  scenarioMemoryDesc?: string;
  scenarioAuthStormTitle?: string;
  scenarioAuthStormDesc?: string;
  [key: string]: any;
}

export interface SreConfigFile {
  filename: string;
  language: string;
  description: string;
  content: string;
}

export interface PrescriptionItem {
  doctorOrder: string;
  dosage: string;
  preventionRule: string;
  files: SreConfigFile[];
}

export interface SrePrescriptionDictionary {
  modalTitle: string;
  resilienceBadge: string;
  doctorOrdersTitle: string;
  rxNumberPrefix: string;
  dosageLabel: string;
  preventionRuleLabel: string;
  copyFileCta: string;
  copiedNotice: string;
  downloadCta: string;
  verifiedFooter: string;
  closeCta: string;
  items: Record<string, PrescriptionItem>;
  [key: string]: any;
}

export interface LegalDictionary {
  privacyTitle?: string;
  termsTitle?: string;
  cookiesTitle?: string;
  lastUpdated?: string;

  // Privacy Policy
  privacyArchHeader?: string;
  privacyArchText?: string;
  privacyArchBullets?: string[];
  privacyAdminHeader?: string;
  privacyAdminText?: string;
  privacyScopeHeader?: string;
  privacyScopeText?: string;
  privacyLocalStorageHeader?: string;
  privacyLocalStorageIntro?: string;
  privacyLocalStorageKeys?: Array<{ key: string; desc: string }>;
  privacyNoTrackingHeader?: string;
  noTrackingHeader?: string;
  privacyNoTrackingText?: string;
  noTrackingText?: string;
  privacyNoTrackingBullets?: string[];
  noTrackingBullets?: string[];
  privacyUserRightsHeader?: string;
  privacyUserRightsText?: string;
  privacyUserRightsBullets?: string[];
  privacyPurgeHeader?: string;
  privacyPurgeText?: string;

  // Terms of Service
  termsScopeHeader?: string;
  termsScopeText?: string;
  termsGeneralHeader?: string;
  termsGeneralText?: string;
  termsDisclaimerHeader?: string;
  termsDisclaimerIntro?: string;
  termsDisclaimerPoints?: string[];
  termsLiabilityHeader?: string;
  termsLiabilityText?: string;
  liabilityHeader?: string;
  liabilityText?: string;
  termsLicenseHeader?: string;
  licenseHeader?: string;
  termsLicenseText?: string;
  licenseText?: string;
  termsLicenseBullets?: string[];
  licenseBullets?: string[];

  // Cookie Policy
  cookiesUsageHeader?: string;
  cookiesUsageText?: string;
  [key: string]: any;
}

export interface TranslationDictionary {
  common: {
    close: string;
    save?: string;
    [key: string]: any;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    inputCta: string;
    statusActive: string;
    statusStable: string;
    [key: string]: any;
  };
  navigation: {
    langPl: string;
    langEn: string;
    toggleTheme: string;
    [key: string]: any;
  };
  presets: {
    sectionTitle: string;
    items: Record<string, IncidentPreset>;
    [key: string]: any;
  };
  codeSection: {
    cursedTitle: string;
    resurrectedTitle: string;
    cursedBadge: string;
    resurrectedBadge: string;
    copyCta: string;
    copied: string;
    [key: string]: any;
  };
  stackTrace: {
    title: string;
    [key: string]: any;
  };
  timeline: {
    title: string;
    [key: string]: any;
  };
  replayer: ReplayerDictionary;
  fiveWhys: FiveWhysDictionary;
  blastRadius: {
    title: string;
    subtitle: string;
    legendEpicenter: string;
    legendDegraded: string;
    legendHealthy: string;
    badgeEpicenter: string;
    badgeDegraded: string;
    badgeHealthy: string;
    [key: string]: any;
  };
  chaos: ChaosDictionary;
  chaosSandbox?: {
    title: string;
    subtitle: string;
    nominalStatus: string;
    activeStatus: string;
    metricThroughput: string;
    metricP99: string;
    metricErrorRate: string;
    injectCta: string;
    recoveringCta: string;
    [key: string]: any;
  };
  prescription?: SrePrescriptionDictionary;
  postMortem: {
    title: string;
    executiveSummary: string;
    blastRadiusImpact: string;
    actionItems: string;
    escalateOnCall: string;
    listenCoroner: string;
    exportMarkdown: string;
    downloadCertificate: string;
    broadcastSlack: string;
    slackCopiedNotice: string;
    [key: string]: any;
  };
  dispatcher?: any;
  dispatcherModal: {
    title: string;
    subtitle: string;
    severityLabel: string;
    serviceLabel: string;
    commanderLabel: string;
    channelLabel: string;
    zoomLinkLabel: string;
    jiraTicketLabel: string;
    statusPageLabel: string;
    copySummaryCta: string;
    copiedNotice: string;
    dispatchPagingCta: string;
    pagingTriggered: string;
    closeCta: string;
    [key: string]: any;
  };
  customAutopsy: {
    title: string;
    subtitle: string;
    quickTestPrompt: string;
    loadSampleCta: string;
    fieldTitle: string;
    fieldTitlePlaceholder: string;
    fieldCategory: string;
    fieldSeverity: string;
    fieldStackTrace: string;
    fieldStackTracePlaceholder: string;
    fieldCrashedCode: string;
    fieldCrashedCodePlaceholder: string;
    fieldResurrectedCode: string;
    fieldResurrectedCodePlaceholder: string;
    categoryFrontend: string;
    categoryBackend: string;
    categoryDatabase: string;
    categoryInfra: string;
    severityP0: string;
    severityP1: string;
    severityP2: string;
    cancelCta: string;
    submitCta: string;
    validationTitleShort: string;
    validationStackShort: string;
    validationStackInvalid: string;
    sampleTitle: string;
    [key: string]: any;
  };
  legal: LegalDictionary;
  cookies?: any;
  pdf?: any;
  footer: {
    disclaimer: string;
    privacy: string;
    terms: string;
    cookieSettings: string;
    [key: string]: any;
  };
  [key: string]: any;
}

// Alias dla zgodności wstecznej z komponentami importującymi Dictionary
export type Dictionary = TranslationDictionary;
