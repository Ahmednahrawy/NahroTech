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
    viewAllSolutions: string;
    viewServiceDetails: string;
    contactUs: string;
    searchPlaceholder: string;
    searchLabel: string;
    searchEmpty: string;
    searchHint: string;
    goHome: string;
    clearFilters: string;
    chatWhatsApp: string;
    sendEmail: string;
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
      servicesTitle: string;
      servicesSubtitle: string;
      solutionsTitle: string;
      solutionsSubtitle: string;
      revenueTitle: string;
      revenueSubtitle: string;
      whyTitle: string;
      whySubtitle: string;
      whyPoints: Array<{
        title: string;
        description: string;
      }>;
      showcaseTitle: string;
      showcaseSubtitle: string;
      showcaseItems: Array<{
        label: string;
        title: string;
        description: string;
        cta: string;
        route: 'portfolio' | 'store' | 'insights';
      }>;
      finalCtaTitle: string;
      finalCtaBody: string;
    };
    services: {
      title: string;
      description: string;
      heading: string;
      subheading: string;
      primaryHeading: string;
      primarySubheading: string;
      additionalHeading: string;
      additionalSubheading: string;
      connectedHeading: string;
      connectedBody: string;
      detail: {
        problemLabel: string;
        approachLabel: string;
        capabilitiesLabel: string;
        deliverablesLabel: string;
        idealForLabel: string;
        connectedServicesLabel: string;
        requestServiceCta: string;
        consultationCta: string;
      };
    };
    solutions: {
      title: string;
      description: string;
      heading: string;
      subheading: string;
      filterIndustry: string;
      filterFunction: string;
      filterSize: string;
      allIndustries: string;
      allFunctions: string;
      allSizes: string;
      challengeLabel: string;
      solutionLabel: string;
      outcomesLabel: string;
      relatedServicesLabel: string;
      noMatches: string;
      requestSolutionCta: string;
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
    };
    contact: {
      title: string;
      description: string;
      heading: string;
      subheading: string;
      intentLabels: {
        project: string;
        consultation: string;
        product: string;
      };
      form: {
        title: string;
        nameLabel: string;
        namePlaceholder: string;
        emailLabel: string;
        emailPlaceholder: string;
        companyLabel: string;
        companyPlaceholder: string;
        serviceLabel: string;
        servicePlaceholder: string;
        budgetLabel: string;
        budgetOptions: string[];
        descriptionLabel: string;
        descriptionPlaceholder: string;
        optionalTag: string;
        submitLabel: string;
        submittingLabel: string;
        successTitle: string;
        successBody: string;
        submitAnother: string;
        notConfiguredTitle: string;
        notConfiguredBody: string;
        errorTitle: string;
        errorNetwork: string;
        errorRejected: string;
        validation: {
          nameRequired: string;
          emailInvalid: string;
          serviceRequired: string;
          descriptionMin: string;
        };
      };
      directChannelsTitle: string;
      directChannelsBody: string;
      whatsappTitle: string;
      whatsappAvailableBody: string;
      whatsappUnavailableBody: string;
      emailTitle: string;
      emailUnavailableBody: string;
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
    allPoliciesLabel: string;
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
