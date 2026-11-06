export type Severity = 'P0' | 'P1';

export interface TimelineEvent {
  time: string;
  label: string;
  description: string;
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
  severity: Severity;
  description: string;
  codeSnippet: string;
  revivedCode: string;
  stackTrace: string;
  timeline: TimelineEvent[];
  blastRadius: BlastRadiusData;
  chaosMetrics: ChaosMetric[];
  postMortem: PostMortemData;
  replayerSteps?: ReplayerStep[];
  fiveWhys?: string[];
}

export interface FiveWhysDictionary {
  sectionTitle: string;
  sectionSubtitle: string;
  levels: [string, string, string, string, string];
  blamelessBadge: string;
  rootCauseBadge: string;
  copyChain: string;
  copied: string;
}

export interface ReplayerDictionary {
  title: string;
  subtitle: string;
  play: string;
  pause: string;
  reset: string;
  speed: string;
  stepOf: string;
  telemetryLatency: string;
  telemetryErrors: string;
  telemetryRps: string;
}

export interface ChaosDictionary {
  sectionTitle: string;
  sectionSubtitle: string;
  btnMitigate: string;
  btnInject: string;
  statusNominal: string;
  metricRps: string;
  metricLatency: string;
  metricErrorRate: string;
  scenarioLatencyTitle: string;
  scenarioLatencyDesc: string;
  scenarioDbPoolTitle: string;
  scenarioDbPoolDesc: string;
  scenarioMemoryTitle: string;
  scenarioMemoryDesc: string;
  scenarioAuthStormTitle: string;
  scenarioAuthStormDesc: string;
}

export interface TranslationDictionary {
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    inputCta: string;
    statusActive: string;
    statusStable: string;
  };
  navigation: {
    langPl: string;
    langEn: string;
    toggleTheme: string;
  };
  presets: {
    sectionTitle: string;
    items: Record<string, IncidentPreset>;
  };
  codeSection: {
    cursedTitle: string;
    resurrectedTitle: string;
    cursedBadge: string;
    resurrectedBadge: string;
    copyCta: string;
    copied: string;
  };
  stackTrace: {
    title: string;
  };
  timeline: {
    title: string;
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
  };
  postMortem: {
    title: string;
    executiveSummary: string;
    blastRadiusImpact: string;
    actionItems: string;
    escalateOnCall: string;
    listenCoroner: string;
    exportMarkdown: string;
    downloadCertificate: string;
  };
  dispatcher?: {
    openBtn: string;
  };
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
  };
  footer: {
    disclaimer: string;
    privacy: string;
    terms: string;
    cookieSettings: string;
  };
}

// Alias dla zgodności wstecznej z komponentami importującymi Dictionary
export type Dictionary = TranslationDictionary;