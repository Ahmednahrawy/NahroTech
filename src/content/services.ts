import {Locale} from '../config/site';

export type ServiceTier = 'primary' | 'additional';

export interface LocalizedService {
  title: string;
  shortTitle: string;
  summary: string;
  imageAlt: string;
  workExampleCaption: string;
  problemSolved: string;
  approach: string;
  capabilities: string[];
  deliverables: string[];
  idealFor: string[];
  whatsappMessage: string;
}

export interface ServiceItem {
  slug: string;
  order: string;
  tier: ServiceTier;
  iconName: 'bar-chart' | 'table' | 'workflow' | 'globe' | 'smartphone' | 'cpu';
  image: string;
  connectedSlugs: string[];
  content: Record<Locale, LocalizedService>;
}

export const SERVICES: ServiceItem[] = [
  {
    slug: 'data-business-intelligence',
    order: '01',
    tier: 'primary',
    iconName: 'bar-chart',
    image: 'src/assets/images/bi_analytics_workspace_1795357660215.jpg',
    connectedSlugs: ['excel-solutions-automation', 'business-management-solutions', 'ai-digital-automation'],
    content: {
      en: {
        title: 'Data & Business Intelligence',
        shortTitle: 'Data & BI',
        summary:
          'Turn fragmented spreadsheets and operational logs into clear Power BI dashboards, KPI monitors, and executive reports.',
        imageAlt:
          'Executive workstation showing structured Power BI sales margin and operational KPI charts',
        workExampleCaption: 'Concept Example · Power BI Margin & Multi-Branch KPI Dashboard',
        problemSolved:
          'Teams spend hours reconciling conflicting numbers every week and still lack real-time visibility into margins, stock turnover, and performance trends.',
        approach:
          'We model your core business metrics first, clean and unify data sources, and build structured dashboards designed for fast decision-making.',
        capabilities: [
          'Power BI dashboards',
          'Excel dashboards',
          'KPI monitoring',
          'Business data analysis',
          'Reporting and visualization',
          'Operational performance reporting',
        ],
        deliverables: [
          'Defined KPI framework aligned with management goals',
          'Interactive Power BI or Excel reporting workbooks',
          'Cleaned data model with documented metric formulas',
          'Team walkthrough and handover documentation',
        ],
        idealFor: [
          'Retail & distribution managers tracking daily margins and stock',
          'Founders needing unified weekly financial and sales visibility',
          'Operations teams replacing manual end-of-month reporting packs',
        ],
        whatsappMessage: 'Hello NahroTech, I am interested in Data & Business Intelligence services.',
      },
      ar: {
        title: 'البيانات وذكاء الأعمال',
        shortTitle: 'البيانات وذكاء الأعمال',
        summary:
          'تحويل الجداول المتفرقة وسجلات التشغيل إلى لوحات Power BI واضحة، ومؤشرات أداء، وتقارير تنفيذية موثوقة.',
        imageAlt:
          'محطة عمل تعرض لوحة Power BI منظمة لهوامش المبيعات ومؤشرات الأداء التشغيلية',
        workExampleCaption: 'نموذج تطبيقي · لوحة Power BI للهوامش ومؤشرات الفروع',
        problemSolved:
          'تقضي الفرق ساعات أسبوعياً في مطابقة أرقام متعارضة دون رؤية واضحة لهوامش الربح أو دوران المخزون أو اتجاهات الأداء.',
        approach:
          'نبدأ بتحديد مؤشرات العمل الأساسية، ثم توحيد وتنظيف مصادر البيانات، وبناء لوحات تفاعلية تساعد على اتخاذ القرار بسرعة.',
        capabilities: [
          'لوحات معلومات Power BI',
          'لوحات تقارير إكسل التفاعلية',
          'مراقبة مؤشرات الأداء (KPIs)',
          'تحليل بيانات الأعمال',
          'إعداد التقارير والتمثيل البصري',
          'تقارير الأداء التشغيلي',
        ],
        deliverables: [
          'إطار مؤشرات أداء مرتبط بأهداف الإدارة',
          'لوحات Power BI أو إكسل تفاعلية جاهزة للتشغيل',
          'نموذج بيانات موحّد مع توثيق المعادلات والمقاييس',
          'جلسة شرح وتسليم عملي للفريق',
        ],
        idealFor: [
          'مديرو التجزئة والتوزيع لمتابعة المبيعات والهوامش والمخزون',
          'المؤسسون الباحثون عن رؤية أسبوعية واضحة للأداء المالي والتشغيلي',
          'فرق التشغيل التي ترغب باستبدال تقارير نهاية الشهر اليدوية',
        ],
        whatsappMessage: 'مرحباً نحروتك، أود الاستفسار عن خدمات البيانات وذكاء الأعمال.',
      },
    },
  },
  {
    slug: 'excel-solutions-automation',
    order: '02',
    tier: 'primary',
    iconName: 'table',
    image: 'src/assets/images/excel_financial_model_1795357660368.jpg',
    connectedSlugs: ['data-business-intelligence', 'business-management-solutions'],
    content: {
      en: {
        title: 'Excel Solutions & Automation',
        shortTitle: 'Excel & Automation',
        summary:
          'Structured Excel systems, automated reporting templates, inventory trackers, and financial models built for accuracy and speed.',
        imageAlt:
          'Financial spreadsheet architecture displayed on a studio laptop with structured cash-flow forecasting tables',
        workExampleCaption: 'Concept Example · Automated Cash-Flow & Credit Aging Workbook',
        problemSolved:
          'Fragile, manually edited spreadsheets lead to formula errors, broken links, and hours of repetitive copy-pasting.',
        approach:
          'We engineer clean, locked-formula Excel architectures using Power Query, structured tables, and automated reporting layouts that stay reliable as data grows.',
        capabilities: [
          'Advanced Excel solutions',
          'Automated reports',
          'Inventory management spreadsheets',
          'Accounting and financial tools',
          'Business templates',
          'Financial models',
        ],
        deliverables: [
          'Structured workbook architecture with separated input and report sheets',
          'Automated Power Query data refresh pipelines where applicable',
          'Protected formulas and input validation rules',
          'Clear usage guide for daily operators',
        ],
        idealFor: [
          'SMEs running finance, inventory, or payroll in Excel',
          'Startups preparing financial models and cash-flow forecasts',
          'Teams wanting reliable templates before moving to full software',
        ],
        whatsappMessage: 'Hello NahroTech, I am interested in Excel Solutions & Automation.',
      },
      ar: {
        title: 'حلول إكسل والأتمتة',
        shortTitle: 'حلول إكسل',
        summary:
          'بناء أنظمة إكسل احترافية، وتقارير مؤتمتة، وجداول إدارة مخزون، وأدوات مالية دقيقة وسهلة الاستخدام.',
        imageAlt:
          'بنية مصنف إكسل مالي منظم معروض على حاسوب محمول لمتابعة التدفقات النقدية',
        workExampleCaption: 'نموذج تطبيقي · مصنف التدفقات النقدية وأعمار الذمم المؤتمت',
        problemSolved:
          'تؤدي الجداول اليدوية غير المنظمة إلى أخطاء في المعادلات وتكرار النسخ واللصق وهدر ساعات العمل الأسبوعية.',
        approach:
          'نصمم ملفات إكسل مهيكلة تفصل بين الإدخال والمعالجة والتقارير، مع Power Query والتحقق من المدخلات وحماية المعادلات.',
        capabilities: [
          'حلول إكسل متقدمة',
          'تقارير مؤتمتة',
          'جداول إدارة المخزون',
          'أدوات المحاسبة والإدارة المالية',
          'قوالب أعمال جاهزة ومخصصة',
          'النماذج المالية والتوقعات',
        ],
        deliverables: [
          'ملف إكسل مهيكل يفصل الإدخال عن التقارير والتحليل',
          'أتمتة تحديث البيانات عبر Power Query عند الحاجة',
          'قواعد تحقق من صحة الإدخال وحماية المعادلات الحساسة',
          'دليل استخدام مبسط للموظفين',
        ],
        idealFor: [
          'الشركات الصغيرة والمتوسطة المعتمدة على إكسل في المالية أو المخزون',
          'الشركات الناشئة التي تبني نماذج مالية وتدفقات نقدية',
          'الفرق التي تحتاج حلولاً سريعة وموثوقة دون تعقيد برمجي',
        ],
        whatsappMessage: 'مرحباً نحروتك، أود الاستفسار عن خدمات حلول إكسل والأتمتة.',
      },
    },
  },
  {
    slug: 'business-management-solutions',
    order: '03',
    tier: 'primary',
    iconName: 'workflow',
    image: 'src/assets/images/crm_management_work_example_1795525932669.jpg',
    connectedSlugs: ['data-business-intelligence', 'web-design-development', 'ai-digital-automation'],
    content: {
      en: {
        title: 'Business Management Solutions',
        shortTitle: 'Business Systems',
        summary:
          'Practical sales, inventory, CRM, and operational workflow systems tailored to how your business actually operates.',
        imageAlt:
          'Dual-screen operations desk showing client pipeline stages, contract milestones, and invoice schedule tracking',
        workExampleCaption: 'Concept Example · Client Pipeline, Contract & Billing Tracker',
        problemSolved:
          'Growing businesses outgrow scattered chats and paper logs, causing missed customer follow-ups, stock discrepancies, and unclear accountability.',
        approach:
          'We map your operational workflow end-to-end, eliminate unnecessary steps, and configure or build focused management tools around your team.',
        capabilities: [
          'Inventory and sales management',
          'Business management systems',
          'CRM and customer management',
          'Workflow optimization',
          'Process improvement',
          'Digital transformation',
        ],
        deliverables: [
          'Operational workflow audit and system blueprint',
          'Tailored inventory, sales, or CRM tracking solution',
          'Role-clear processes for team adoption',
          'Training and phased rollout support',
        ],
        idealFor: [
          'Wholesale and retail businesses coordinating sales and inventory',
          'Service companies managing client pipelines and projects',
          'Organizations standardizing core internal operations',
        ],
        whatsappMessage: 'Hello NahroTech, I am interested in Business Management Solutions.',
      },
      ar: {
        title: 'حلول إدارة الأعمال',
        shortTitle: 'إدارة الأعمال',
        summary:
          'أنظمة عملية لإدارة المبيعات والمخزون وعلاقات العملاء وتحسين تدفق العمليات اليومية وفق طبيعة عملك.',
        imageAlt:
          'شاشات مكتب تنفيذي تعرض مراحل متابعة العملاء وجدولة العقود والفواتير',
        workExampleCaption: 'نموذج تطبيقي · نظام متابعة العملاء ومراحل العقود والفوترة',
        problemSolved:
          'مع نمو الشركة تصبح المتابعة عبر المحادثات والملفات المبعثرة سبباً لفقدان العملاء وأخطاء المخزون وضعف وضوح المسؤوليات.',
        approach:
          'نحلل سير العمل الفعلي من البداية للنهاية، ونبسط الخطوات، ثم نعدّ أو نطور نظام إدارة مركزياً يناسب فريقك.',
        capabilities: [
          'إدارة المخزون والمبيعات',
          'أنظمة إدارة الأعمال المتكاملة',
          'إدارة علاقات العملاء (CRM)',
          'تحسين تدفق العمل',
          'تطوير وتحسين العمليات',
          'التحول الرقمي التدريجي',
        ],
        deliverables: [
          'تحليل سير العمل ومخطط النظام المقترح',
          'حل مخصص لمتابعة المبيعات أو المخزون أو العملاء',
          'تنظيم الأدوار ومسارات العمل داخل الفريق',
          'تدريب الفريق ودعم الإطلاق المرحلي',
        ],
        idealFor: [
          'شركات الجملة والتجزئة التي تربط المبيعات بالمخزون',
          'الشركات الخدمية التي تتابع طلبات وعقود العملاء',
          'المؤسسات الساعية لتوحيد عملياتها التشغيلية',
        ],
        whatsappMessage: 'مرحباً نحروتك، أود الاستفسار عن حلول إدارة الأعمال.',
      },
    },
  },
  {
    slug: 'web-design-development',
    order: '04',
    tier: 'additional',
    iconName: 'globe',
    image: 'src/assets/images/web_portal_work_example_1795525930779.jpg',
    connectedSlugs: ['business-management-solutions', 'mobile-app-development', 'ai-digital-automation'],
    content: {
      en: {
        title: 'Web Design & Development',
        shortTitle: 'Web Development',
        summary:
          'Fast, responsive, SEO-ready corporate websites, landing pages, e-commerce storefronts, and custom web applications.',
        imageAlt:
          'Desktop display and tablet running a responsive corporate catalog and client inquiry web portal',
        workExampleCaption: 'Concept Example · B2B Product Catalog & Client Request Web Portal',
        problemSolved:
          'Slow, outdated, or poorly structured websites lose visitor trust and fail to convert search traffic into real business inquiries.',
        approach:
          'We build clean, accessible, bilingual-capable web interfaces engineered for speed, clear messaging, and reliable long-term maintenance.',
        capabilities: [
          'Corporate websites',
          'E-commerce websites',
          'Landing pages',
          'Web applications',
          'Website maintenance',
        ],
        deliverables: [
          'Responsive UI designed for desktop, tablet, and mobile',
          'Clean semantic codebase with technical SEO fundamentals',
          'Contact, inquiry, and analytics integration',
          'Deployment setup and ongoing maintenance options',
        ],
        idealFor: [
          'Startups and companies establishing a credible digital presence',
          'Businesses launching product catalogs or lead-generation portals',
          'Teams needing custom browser-based internal tools',
        ],
        whatsappMessage: 'Hello NahroTech, I am interested in Web Design & Development services.',
      },
      ar: {
        title: 'تصميم وتطوير المواقع',
        shortTitle: 'تطوير الويب',
        summary:
          'مواقع شركات، وصفحات هبوط، ومتاجر إلكترونية، وتطبيقات ويب سريعة ومتجاوبة ومهيأة لمحركات البحث.',
        imageAlt:
          'شاشة مكتبية وجهاز لوحي يعرضان بوابة ويب متجاوبة لكتالوج الأعمال وطلبات العملاء',
        workExampleCaption: 'نموذج تطبيقي · بوابة ويب لكتالوج المنتجات وطلبات العملاء',
        problemSolved:
          'المواقع البطيئة أو غير المنظمة تضعف ثقة العملاء وتفشل في تحويل الزوار إلى طلبات واستفسارات حقيقية.',
        approach:
          'نصمم ونطور واجهات ويب حديثة تدعم العربية والإنجليزية، مع تركيز على السرعة وسهولة الاستخدام وقابلية الصيانة.',
        capabilities: [
          'مواقع الشركات والمؤسسات',
          'مواقع التجارة الإلكترونية',
          'صفحات الهبوط التسويقية',
          'تطبيقات الويب المخصصة',
          'صيانة وتحديث المواقع',
        ],
        deliverables: [
          'تصميم متجاوب يعمل بكفاءة على الجوال والأجهزة اللوحية وسطح المكتب',
          'كود منظم ومعايير SEO تقنية أساسية',
          'ربط نماذج التواصل والتحليلات وأدوات الاستفسار',
          'تجهيز النشر وخيارات الصيانة المستمرة',
        ],
        idealFor: [
          'الشركات الناشئة والقائمة لبناء حضور رقمي احترافي',
          'الأعمال التي تطلق كتالوجات منتجات أو بوابات استقطاب عملاء',
          'الفرق التي تحتاج تطبيقات داخلية تعمل عبر المتصفح',
        ],
        whatsappMessage: 'مرحباً نحروتك، أود الاستفسار عن خدمات تصميم وتطوير المواقع.',
      },
    },
  },
  {
    slug: 'mobile-app-development',
    order: '05',
    tier: 'additional',
    iconName: 'smartphone',
    image: 'src/assets/images/mobile_field_app_example_1795525932539.jpg',
    connectedSlugs: ['web-design-development', 'business-management-solutions'],
    content: {
      en: {
        title: 'Mobile App Development',
        shortTitle: 'Mobile Apps',
        summary:
          'Android, iOS, and cross-platform mobile applications tailored for customer engagement and field or business operations.',
        imageAlt:
          'Warehouse operator holding a smartphone running a field dispatch and stock barcode verification mobile app',
        workExampleCaption: 'Concept Example · Field Dispatch & Stock Verification Mobile App',
        problemSolved:
          'Field teams, delivery workflows, and mobile-first customers struggle when critical tasks are locked inside desktop-only tools.',
        approach:
          'We design focused mobile experiences connected cleanly to your core backend and business data, avoiding bloated features that slow adoption.',
        capabilities: [
          'Android applications',
          'iOS applications',
          'Cross-platform applications',
          'Business applications',
          'Application maintenance',
        ],
        deliverables: [
          'Product scope and mobile UX architecture',
          'Clean cross-platform or native mobile build',
          'API synchronization with web or management systems',
          'Release preparation and maintenance plan',
        ],
        idealFor: [
          'Companies equipping field sales, inspection, or warehouse staff',
          'Startups launching focused MVP mobile products',
          'Businesses extending existing web services to iOS and Android',
        ],
        whatsappMessage: 'Hello NahroTech, I am interested in Mobile App Development services.',
      },
      ar: {
        title: 'تطوير تطبيقات الجوال',
        shortTitle: 'تطبيقات الجوال',
        summary:
          'تطبيقات أندرويد وiOS ومتعددة المنصات مصممة لخدمة العملاء أو دعم فرق العمل الميدانية والتشغيلية.',
        imageAlt:
          'مشرف تشغيل يحمل هاتفاً ذكياً يشغّل تطبيقاً ميدانياً للتحقق من المخزون وجدولة التسليم',
        workExampleCaption: 'نموذج تطبيقي · تطبيق جوال للتحقق من المخزون وإدارة التوصيل',
        problemSolved:
          'تواجه الفرق الميدانية والعملاء صعوبة عندما تبقى المهام اليومية محصورة في أنظمة سطح المكتب فقط.',
        approach:
          'نبني تطبيقات جوال مركزة وسهلة الاستخدام تتكامل بسلاسة مع أنظمتك وبياناتك الأساسية دون تعقيد غير ضروري.',
        capabilities: [
          'تطبيقات أندرويد',
          'تطبيقات iOS',
          'تطبيقات متعددة المنصات',
          'تطبيقات الأعمال والتشغيل',
          'صيانة وتحديث التطبيقات',
        ],
        deliverables: [
          'تحديد النطاق وهيكلة تجربة المستخدم للجوال',
          'بناء تطبيق متجاوب وموثوق',
          'تكامل عبر API مع أنظمة الويب أو إدارة الأعمال',
          'تجهيز الإطلاق وخطة الصيانة والتحديث',
        ],
        idealFor: [
          'الشركات التي تزوّد فرق المبيعات أو المستودعات بأدوات ميدانية',
          'الشركات الناشئة التي تطلق نسخة أولية (MVP) لتطبيق جوال',
          'الأعمال التي توسّع خدمات الويب الحالية إلى الهواتف الذكية',
        ],
        whatsappMessage: 'مرحباً نحروتك، أود الاستفسار عن خدمات تطوير تطبيقات الجوال.',
      },
    },
  },
  {
    slug: 'ai-digital-automation',
    order: '06',
    tier: 'additional',
    iconName: 'cpu',
    image: 'src/assets/images/ai_automation_workflow_example_1795525934849.jpg',
    connectedSlugs: ['data-business-intelligence', 'business-management-solutions', 'web-design-development'],
    content: {
      en: {
        title: 'AI & Digital Automation',
        shortTitle: 'AI & Automation',
        summary:
          'Practical workflow automation, API integrations, intelligent reporting, and AI-assisted business tools that reduce manual work.',
        imageAlt:
          'Widescreen display presenting an automated document routing diagram and real-time API webhook log',
        workExampleCaption: 'Concept Example · Automated Document Routing & API Webhook Flow',
        problemSolved:
          'Teams waste valuable time manually transferring data between disconnected apps, summarizing repetitive records, and triaging routine requests.',
        approach:
          'We identify high-friction repetitive tasks, connect your existing tools via reliable APIs, and introduce AI capabilities only where they deliver measurable utility and control.',
        capabilities: [
          'AI-powered business tools',
          'Workflow automation',
          'API integrations',
          'Intelligent reporting',
          'Process automation',
        ],
        deliverables: [
          'Automation opportunity assessment and integration map',
          'Reliable API connectors and automated triggers',
          'Human-in-the-loop AI reporting or classification tools',
          'Error handling, monitoring guidance, and documentation',
        ],
        idealFor: [
          'Operations teams syncing forms, CRM, spreadsheets, and reporting',
          'Companies looking for practical AI workflows without hype',
          'Growing businesses scaling output without linear headcount growth',
        ],
        whatsappMessage: 'Hello NahroTech, I am interested in AI & Digital Automation services.',
      },
      ar: {
        title: 'الذكاء الاصطناعي والأتمتة الرقمية',
        shortTitle: 'الذكاء والأتمتة',
        summary:
          'أتمتة سير العمل، وربط الأنظمة عبر API، والتقارير الذكية، وأدوات الأعمال المدعومة بالذكاء الاصطناعي لتقليل العمل اليدوي.',
        imageAlt:
          'شاشة عرض عريضة تعرض مخطط أتمتة توجيه المستندات وسجل أحداث API',
        workExampleCaption: 'نموذج تطبيقي · مخطط أتمتة توجيه المستندات وتكامل API',
        problemSolved:
          'تهدر الفرق وقتاً كبيراً في نقل البيانات يدوياً بين أدوات منفصلة وتلخيص السجلات المتكررة ومعالجة الطلبات الروتينية.',
        approach:
          'نحدد المهام المتكررة ذات الأثر الأعلى، ونربط أدواتك عبر واجهات برمجية موثوقة، ونوظف الذكاء الاصطناعي حيث يضيف قيمة عملية حقيقية.',
        capabilities: [
          'أدوات أعمال مدعومة بالذكاء الاصطناعي',
          'أتمتة سير العمل',
          'تكاملات واجهات البرمجة (API)',
          'التقارير الذكية',
          'أتمتة العمليات التشغيلية',
        ],
        deliverables: [
          'تقييم فرص الأتمتة وخريطة الربط بين الأنظمة',
          'موصلات API موثوقة وتدفقات عمل آلية',
          'أدوات تلخيص وتقارير ذكية بإشراف بشري',
          'معالجة الأخطاء وتوثيق التشغيل',
        ],
        idealFor: [
          'فرق التشغيل التي تربط النماذج والعملاء والجداول والتقارير',
          'الشركات الباحثة عن تطبيقات عملية للذكاء الاصطناعي بعيداً عن الضجيج',
          'الأعمال النامية التي تريد رفع الإنتاجية دون تضخم التكاليف',
        ],
        whatsappMessage: 'مرحباً نحروتك، أود الاستفسار عن خدمات الذكاء الاصطناعي والأتمتة الرقمية.',
      },
    },
  },
];

export function getServiceBySlug(slug?: string): ServiceItem | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
