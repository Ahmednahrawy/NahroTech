export interface TranslationDictionary {
  meta: {
    siteName: string;
    slogan: string;
    defaultTitle: string;
    defaultDescription: string;
  };
  a11y: {
    skipToContent: string;
    mainNavigation: string;
    mobileNavigation: string;
    openMenu: string;
    closeMenu: string;
    switchToArabic: string;
    switchToEnglish: string;
    switchThemeLight: string;
    switchThemeDark: string;
    openSearch: string;
    closeSearch: string;
    breadcrumbs: string;
  };
  nav: {
    home: string;
    services: string;
    solutions: string;
    portfolio: string;
    store: string;
    insights: string;
    about: string;
    contact: string;
    startProject: string;
  };
  actions: {
    startProject: string;
    exploreProducts: string;
    bookConsultation: string;
    viewServices: string;
    contactUs: string;
    searchPlaceholder: string;
    searchLabel: string;
    searchEmpty: string;
    searchHint: string;
    goHome: string;
  };
  theme: {
    light: string;
    dark: string;
  };
  language: {
    label: string;
    en: string;
    ar: string;
  };
  pages: {
    home: {
      title: string;
      description: string;
      eyebrow: string;
      headline: string;
      subheadline: string;
      positioningTitle: string;
      positioningBody: string;
      pillars: Array<{
        index: string;
        title: string;
        description: string;
      }>;
      foundationNoticeTitle: string;
      foundationNoticeBody: string;
      quickLinksTitle: string;
    };
    services: {
      title: string;
      description: string;
      heading: string;
      subheading: string;
    };
    solutions: {
      title: string;
      description: string;
      heading: string;
      subheading: string;
    };
    portfolio: {
      title: string;
      description: string;
      heading: string;
      subheading: string;
    };
    store: {
      title: string;
      description: string;
      heading: string;
      subheading: string;
    };
    insights: {
      title: string;
      description: string;
      heading: string;
      subheading: string;
    };
    about: {
      title: string;
      description: string;
      heading: string;
      subheading: string;
    };
    contact: {
      title: string;
      description: string;
      heading: string;
      subheading: string;
    };
    notFound: {
      title: string;
      description: string;
      heading: string;
      body: string;
    };
  };
  legal: {
    sectionTitle: string;
    reviewBanner: string;
    items: Record<
      | 'privacy-policy'
      | 'terms-of-use'
      | 'cookie-policy'
      | 'digital-product-terms'
      | 'refund-policy'
      | 'disclaimer',
      {
        title: string;
        summary: string;
      }
    >;
  };
  footer: {
    positioning: string;
    navigationTitle: string;
    legalTitle: string;
    connectTitle: string;
    emailNotConfigured: string;
    whatsappNotConfigured: string;
    whatsappLabel: string;
    emailLabel: string;
    whatsappDefaultMessage: string;
    copyright: string;
  };
}
