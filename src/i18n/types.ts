export interface Dictionary {
  brand: {
    name: string;
    badge: string;
    tagline: string;
  };
  dashboard: {
    title: string;
    subtitle: string;
    ecgStatus: string;
    heartbeat: string;
    selectPreset: string;
    autopsyDiff: string;
    copyCode: string;
    copied: string;
    crashedCodeTitle: string;
    resurrectedCodeTitle: string;
    stackTraceTitle: string;
    timelineTitle: string;
    postMortemTitle: string;
    summaryLabel: string;
    impactLabel: string;
    preventativeLabel: string;
  };
  presets: Record<string, {
    name: string;
    category: string;
    severity: string;
    rootCause: string;
  }>;
  cookies: {
    title: string;
    description: string;
    acceptAll: string;
    rejectAll: string;
    customize: string;
    hideDetails: string;
    savePreferences: string;
    essential: string;
    essentialDesc: string;
    alwaysActive: string;
    analytics: string;
    analyticsDesc: string;
    marketing: string;
    marketingDesc: string;
  };
  footer: {
    copyright: string;
    privacyPolicy: string;
    termsOfService: string;
    cookieSettings: string;
  };
  legal: {
    privacyTitle: string;
    privacyContent: string;
    termsTitle: string;
    termsContent: string;
    cookiesTitle: string;
    cookiesContent: string;
    lastUpdated: string;
    close: string;
  };
}
