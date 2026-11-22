import {Locale} from '../config/site';

export type ProductCategoryId =
  | 'excel-templates'
  | 'dashboards-analytics'
  | 'business-management'
  | 'software-apps'
  | 'guides-learning';

export interface ProductCategory {
  id: ProductCategoryId;
  label: Record<Locale, string>;
}

export interface ProductFaq {
  question: string;
  answer: string;
}

export interface LocalizedProduct {
  name: string;
  shortDescription: string;
  description: string;
  imageAlt: string;
  priceDisplay: string;
  features: string[];
  intendedUsers: string[];
  compatibility: string;
  requirements: string;
  licenseInfo: string;
  faqs: ProductFaq[];
  whatsappInquiryMessage: string;
}

export interface ProductItem {
  slug: string;
  category: ProductCategoryId;
  image: string;
  indicativePriceUsd?: number;
  featured: boolean;
  readyForSale: boolean;
  content: Record<Locale, LocalizedProduct>;
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: 'excel-templates',
    label: {
      en: 'Excel Templates & Tools',
      ar: 'قوالب وأدوات إكسل',
    },
  },
  {
    id: 'dashboards-analytics',
    label: {
      en: 'Dashboards & Analytics',
      ar: 'لوحات المعلومات والتحليلات',
    },
  },
  {
    id: 'business-management',
    label: {
      en: 'Business Management Tools',
      ar: 'أدوات إدارة الأعمال',
    },
  },
  {
    id: 'software-apps',
    label: {
      en: 'Software & Digital Applications',
      ar: 'البرمجيات والتطبيقات الرقمية',
    },
  },
  {
    id: 'guides-learning',
    label: {
      en: 'Guides, E-books & Learning Resources',
      ar: 'الأدلة والكتب والموارد التعليمية',
    },
  },
];

export const PRODUCTS: ProductItem[] = [
  {
    slug: 'sme-cashflow-inventory-excel-kit',
    category: 'excel-templates',
    image: 'src/assets/images/excel_financial_model_1795357660368.jpg',
    indicativePriceUsd: 39,
    featured: true,
    readyForSale: true,
    content: {
      en: {
        name: 'SME Inventory & Cash-Flow Control Workbook',
        shortDescription:
          'Ready-to-use structured Excel workbook for tracking SKU stock movements, reorder points, monthly expenses, and 12-month cash flow.',
        description:
          'Built for retail, wholesale, and product-based SMEs that need reliable inventory visibility and monthly cash planning without complex ERP software. Clean input tables feed locked summary dashboards automatically.',
        imageAlt: 'Structured Excel financial and inventory control model on a laptop',
        priceDisplay: '$39 USD (Indicative — single business license)',
        features: [
          'SKU master list with cost, retail price, margin %, and reorder threshold',
          'Stock-in, stock-out, and adjustment transaction ledger',
          'Automated low-stock alert flags and stock valuation summary',
          '12-month cash inflow/outflow planner linked to operating expenses',
          'Includes sample populated copy and clean blank production copy',
        ],
        intendedUsers: [
          'Small and medium retail or wholesale business owners',
          'Operations and inventory coordinators',
          'Startups managing initial product stock and working capital',
        ],
        compatibility: 'Microsoft Excel 2019, Excel 2021, and Microsoft 365 (Windows & macOS)',
        requirements: 'Desktop Microsoft Excel installation (no external macros or third-party add-ins required).',
        licenseInfo: 'Single-organization internal business use license. Redistribution or resale is not permitted.',
        faqs: [
          {
            question: 'Does this template require VBA macros?',
            answer: 'No. All calculations use standard structured Excel tables and formulas for maximum compatibility and security.',
          },
          {
            question: 'How is the file delivered after ordering?',
            answer: 'During our MVP launch, orders are confirmed directly via WhatsApp or the contact form, and the workbook package is delivered digitally upon confirmation.',
          },
        ],
        whatsappInquiryMessage:
          'Hello NahroTech, I would like to request purchasing the SME Inventory & Cash-Flow Control Workbook.',
      },
      ar: {
        name: 'منظومة إكسل لإدارة المخزون والتدفق النقدي للشركات',
        shortDescription:
          'ملف إكسل احترافي جاهز لتتبع حركة الأصناف وحدود إعادة الطلب والمصروفات الشهرية والتدفق النقدي لـ 12 شهراً.',
        description:
          'مصمم لشركات التجزئة والجملة والأعمال التجارية التي تحتاج وضوحاً موثوقاً في المخزون والسيولة دون تكاليف أنظمة ERP المعقدة. الجداول المنظمة تغذي لوحة الملخص المحمية تلقائياً.',
        imageAlt: 'نموذج إكسل مهيكل لإدارة المالية والمخزون على حاسوب محمول',
        priceDisplay: '39 دولار أمريكي (سعر استرشادي — ترخيص منشأة واحدة)',
        features: [
          'سجل رئيسي للأصناف مع التكلفة وسعر البيع وهامش الربح وحد إعادة الطلب',
          'دفتر حركات الوارد والمنصرف والتسويات المخزنية',
          'تنبيهات تلقائية لانخفاض المخزون وتقييم إجمالي قيمة المخزون',
          'مخطط تدفق نقدي لـ 12 شهراً مرتبط بالمصروفات التشغيلية',
          'يتضمن نسخة بأمثلة توضيحية ونسخة فارغة جاهزة للعمل الفوري',
        ],
        intendedUsers: [
          'أصحاب المتاجر وشركات الجملة الصغيرة والمتوسطة',
          'منسقو العمليات والمستودعات',
          'الشركات الناشئة التي تدير مخزونها ورأس المال العامل',
        ],
        compatibility: 'Microsoft Excel 2019 و2021 وMicrosoft 365 (ويندوز وماك)',
        requirements: 'برنامج Microsoft Excel المكتبي (لا يتطلب وحدات ماكرو VBA أو إضافات خارجية).',
        licenseInfo: 'ترخيص استخدام داخلي لمنشأة واحدة أو فرد واحد. لا يُسمح بإعادة البيع أو التوزيع.',
        faqs: [
          {
            question: 'هل يعتمد القالب على أكواد ماكرو VBA؟',
            answer: 'لا، جميع الحسابات مبنية بصيغ وجداول إكسل قياسية لضمان الأمان والتوافق التام.',
          },
          {
            question: 'كيف يتم التسليم بعد الطلب؟',
            answer: 'في مرحلة الإطلاق الأولية يتم تأكيد الطلب عبر واتساب أو نموذج التواصل، ثم إرسال حزمة الملفات رقمياً مباشرة.',
          },
        ],
        whatsappInquiryMessage:
          'مرحباً نحروتك، أرغب في طلب شراء منظومة إكسل لإدارة المخزون والتدفق النقدي.',
      },
    },
  },
  {
    slug: 'executive-kpi-powerbi-starter-pack',
    category: 'dashboards-analytics',
    image: 'src/assets/images/bi_analytics_workspace_1795357660215.jpg',
    indicativePriceUsd: 79,
    featured: true,
    readyForSale: true,
    content: {
      en: {
        name: 'Executive Sales & Margin Power BI Starter Pack',
        shortDescription:
          'Clean 3-page Power BI (.pbix) template with Excel data connector for revenue trends, margin analysis, and product ranking.',
        description:
          'Accelerate your business reporting with a pre-modeled Power BI template paired with a clean Excel input schema. Swap in your own sales and cost tables, refresh Power Query, and gain instant management dashboards.',
        imageAlt: 'Laptop displaying executive Power BI sales and margin analytics dashboard',
        priceDisplay: '$79 USD (Indicative — includes setup guide)',
        features: [
          'Three structured report pages: Executive Summary, Product Margin, and Period Comparison',
          'Pre-configured Excel input template with Power Query mapping',
          'Documented DAX measures for Revenue, COGS, Gross Margin %, and MoM Growth',
          'Light-slate executive visual layout ready for management reviews',
        ],
        intendedUsers: [
          'Business owners and finance managers adopting Power BI',
          'Data analysts seeking a clean starting architecture',
          'Retail and distribution teams upgrading from static PDF charts',
        ],
        compatibility: 'Power BI Desktop (free Windows download) + Microsoft Excel 2016+',
        requirements: 'Windows PC with Power BI Desktop installed for editing and refreshing local data.',
        licenseInfo: 'Single-company internal reporting license.',
        faqs: [
          {
            question: 'Can NahroTech customize this dashboard for our specific ERP export?',
            answer: 'Yes. You can purchase the starter pack as-is or request custom data-connector adaptation via our Contact page.',
          },
        ],
        whatsappInquiryMessage:
          'Hello NahroTech, I would like to inquire about the Executive Sales & Margin Power BI Starter Pack.',
      },
      ar: {
        name: 'حزمة Power BI التنفيذية لتحليل المبيعات والهوامش',
        shortDescription:
          'قالب Power BI (.pbix) احترافي من 3 صفحات مرتبط بملف إدخال إكسل لمتابعة الإيرادات والهوامش وترتيب المنتجات.',
        description:
          'اختصر وقت بناء التقارير عبر نموذج بيانات Power BI جاهز ومرتبط بهيكل إكسل منظم. استبدل بياناتك وحدّث Power Query لتحصل فوراً على لوحة قيادة واضحة للإدارة.',
        imageAlt: 'حاسوب محمول يعرض لوحة تحليلات Power BI للمبيعات والهوامش',
        priceDisplay: '79 دولار أمريكي (سعر استرشادي — يشمل دليل الإعداد)',
        features: [
          'ثلاث صفحات تقارير منظمة: الملخص التنفيذي، هوامش المنتجات، والمقارنة الزمنية',
          'ملف إكسل إدخال مهيأ مسبقاً مع ربط Power Query',
          'مقاييس DAX موثقة للإيرادات والتكلفة ونسبة الهامش ومعدل النمو الشهري',
          'تصميم بصري واضح ومناسب لعروض الإدارة واجتماعات الأداء',
        ],
        intendedUsers: [
          'أصحاب الأعمال ومديرو المالية الراغبون في اعتماد Power BI',
          'محللو البيانات الباحثون عن نقطة بداية احترافية ومنظمة',
          'فرق التجزئة والتوزيع المنتقلة من التقارير الثابتة إلى التحليل التفاعلي',
        ],
        compatibility: 'Power BI Desktop (نسخة ويندوز المجانية) + Microsoft Excel 2016 أو أحدث',
        requirements: 'جهاز يعمل بنظام ويندوز مع تثبيت Power BI Desktop لتحديث البيانات وتخصيصها.',
        licenseInfo: 'ترخيص استخدام داخلي لمنشأة واحدة.',
        faqs: [
          {
            question: 'هل يمكن لنحروتك تخصيص الحزمة لترتبط بملفات نظامنا الحالي؟',
            answer: 'نعم، يمكنك طلب الحزمة كما هي أو طلب خدمة تخصيص وربط البيانات عبر صفحة تواصل معنا.',
          },
        ],
        whatsappInquiryMessage:
          'مرحباً نحروتك، أود الاستفسار عن حزمة Power BI التنفيذية لتحليل المبيعات والهوامش.',
      },
    },
  },
  {
    slug: 'operations-crm-pipeline-tracker',
    category: 'business-management',
    image: 'src/assets/images/retail_inventory_ops_1795357660077.jpg',
    indicativePriceUsd: 45,
    featured: true,
    readyForSale: true,
    content: {
      en: {
        name: 'Client Pipeline & Operations Delivery Tracker',
        shortDescription:
          'Practical customer relationship, quotation follow-up, and active project milestone tracker designed for service teams.',
        description:
          'Keep every client inquiry, proposal, follow-up date, and active project milestone organized in one unified workspace without paying monthly per-seat SaaS fees.',
        imageAlt: 'Operational workspace illustrating organized pipeline and inventory management',
        priceDisplay: '$45 USD (Indicative — one-time purchase)',
        features: [
          'Lead-to-proposal-to-delivery status pipeline with priority follow-up flags',
          'Client directory, deal value tracking, and conversion overview',
          'Project milestone and deliverable checklist view',
          'Ready-to-use status filters and overdue follow-up highlights',
        ],
        intendedUsers: [
          'Agencies, consultancies, and independent professionals',
          'B2B service sales coordinators',
          'Small teams replacing scattered chat notes with structured tracking',
        ],
        compatibility: 'Microsoft Excel 2019+ / Microsoft 365',
        requirements: 'Microsoft Excel desktop or compatible Microsoft 365 web environment.',
        licenseInfo: 'Single-team internal business license.',
        faqs: [
          {
            question: 'Is there any recurring subscription fee?',
            answer: 'No. This is a one-time digital tool purchase with no recurring SaaS seat fees.',
          },
        ],
        whatsappInquiryMessage:
          'Hello NahroTech, I would like to request the Client Pipeline & Operations Delivery Tracker.',
      },
      ar: {
        name: 'أداة متابعة العملاء ومسار تسليم المشاريع',
        shortDescription:
          'نظام عملي لمتابعة الفرص البيعية وعروض الأسعار ومراحل تنفيذ المشاريع دون اشتراكات شهرية متكررة.',
        description:
          'نظّم كل استفسار عميل وعرض سعر وموعد متابعة ومرحلة تسليم في مساحة عمل واحدة واضحة تغني الفرق الصغيرة والمتوسطة عن الأنظمة المكلفة.',
        imageAlt: 'بيئة عمل تشغيلية توضح تنظيم المتابعة والعمليات',
        priceDisplay: '45 دولار أمريكي (سعر استرشادي — دفعة واحدة)',
        features: [
          'مسار متكامل من الاستفسار إلى العرض حتى التسليم مع تنبيهات المتابعة',
          'سجل عملاء مركزي وتتبع قيم الصفقات ونسب التحويل',
          'متابعة مراحل المشروع وقوائم المخرجات',
          'تصفية سريعة وإبراز المهام المتأخرة تلقائياً',
        ],
        intendedUsers: [
          'الوكالات والمكاتب الاستشارية والمستقلون',
          'منسقو المبيعات في الشركات الخدمية',
          'الفرق الصغيرة التي تريد استبدال الملاحظات المبعثرة بمتابعة منظمة',
        ],
        compatibility: 'Microsoft Excel 2019 فأحدث / Microsoft 365',
        requirements: 'برنامج Microsoft Excel على سطح المكتب أو بيئة Microsoft 365.',
        licenseInfo: 'ترخيص استخدام داخلي لفريق واحد.',
        faqs: [
          {
            question: 'هل يتطلب استخدام الأداة اشتراكاً شهرياً؟',
            answer: 'لا، الشراء يتم لمرة واحدة دون أي رسوم اشتراك دورية.',
          },
        ],
        whatsappInquiryMessage:
          'مرحباً نحروتك، أود الاستفسار عن أداة متابعة العملاء ومسار تسليم المشاريع.',
      },
    },
  },
  {
    slug: 'bilingual-business-portal-starter-kit',
    category: 'software-apps',
    image: 'src/assets/images/bi_analytics_workspace_1795357660215.jpg',
    featured: false,
    readyForSale: true,
    content: {
      en: {
        name: 'Bilingual Business Intake & Catalog Web Kit',
        shortDescription:
          'Static-first bilingual (EN/AR) React + TypeScript web starter kit for service companies launching fast inquiry and catalog portals.',
        description:
          'Designed for technical founders and studios who want a clean bilingual web foundation with RTL/LTR support, static route prerendering, SEO metadata, and inquiry form wiring.',
        imageAlt: 'Modern laptop displaying clean web portal architecture',
        priceDisplay: 'Custom licensing / Direct inquiry',
        features: [
          'English (LTR) and Arabic (RTL) routing and typography foundation',
          'Light and dark theme tokens with accessible focus controls',
          'Static HTML prerendering and sitemap generation setup',
          'Provider-independent lead form and WhatsApp integration helpers',
        ],
        intendedUsers: [
          'Developers and technical founders launching regional businesses',
          'Digital studios building bilingual client showcases',
        ],
        compatibility: 'Node.js 20+, React 19, TypeScript, Vite, Tailwind CSS v4',
        requirements: 'Basic familiarity with Git, Node.js, and static web hosting.',
        licenseInfo: 'Project-based commercial license agreed upon order confirmation.',
        faqs: [
          {
            question: 'Can NahroTech deploy and customize this kit for our brand?',
            answer: 'Yes. Request customization through our Contact page or WhatsApp and we will scope the setup for your domain and brand.',
          },
        ],
        whatsappInquiryMessage:
          'Hello NahroTech, I would like to inquire about the Bilingual Business Intake & Catalog Web Kit.',
      },
      ar: {
        name: 'حزمة الويب الثنائية اللغة لعرض الخدمات واستقبال الطلبات',
        shortDescription:
          'بنية ويب حديثة بـ React وTypeScript تدعم العربية (RTL) والإنجليزية (LTR) وتوليد الصفحات الثابتة السريعة.',
        description:
          'موجهة لرواد الأعمال التقنيين والاستوديوهات التي تبحث عن نقطة انطلاق نظيفة لبناء بوابة أعمال ثنائية اللغة مهيأة لمحركات البحث ونماذج التواصل.',
        imageAlt: 'حاسوب محمول يعرض بنية بوابة ويب حديثة',
        priceDisplay: 'سعر حسب الترخيص والتخصيص — طلب مباشر',
        features: [
          'مسارات منفصلة للغة العربية (RTL) والإنجليزية (LTR) مع خطوط متوافقة',
          'دعم المظهر الفاتح والداكن ومعايير الوصول الأساسية',
          'إعداد التوليد المسبق لملفات HTML وخريطة الموقع sitemap.xml',
          'تكامل مرن لنماذج الاستفسار وروابط واتساب السياقية',
        ],
        intendedUsers: [
          'المطورون ورواد الأعمال التقنيون في الأسواق ثنائية اللغة',
          'الاستوديوهات الرقمية التي تبني مواقع شركات احترافية',
        ],
        compatibility: 'Node.js 20+، React 19، TypeScript، Vite، Tailwind CSS v4',
        requirements: 'إلمام أساسي ببيئة Node.js وGit والاستضافة الساكنة.',
        licenseInfo: 'ترخيص تجاري يحدد نطاقه عند تأكيد الطلب.',
        faqs: [
          {
            question: 'هل تقدمون خدمة التخصيص والنشر الكامل لهذه الحزمة؟',
            answer: 'نعم، يمكنكم طلب التخصيص والنشر وفق هويتكم التجارية عبر نموذج التواصل أو واتساب.',
          },
        ],
        whatsappInquiryMessage:
          'مرحباً نحروتك، أود الاستفسار عن حزمة الويب الثنائية اللغة لعرض الخدمات.',
      },
    },
  },
  {
    slug: 'practical-bi-spreadsheet-architecture-guide',
    category: 'guides-learning',
    image: 'src/assets/images/digital_guide_studio_1795357660137.jpg',
    indicativePriceUsd: 19,
    featured: true,
    readyForSale: true,
    content: {
      en: {
        name: 'Practical Business Intelligence & Clean Spreadsheet Architecture (Digital Guide)',
        shortDescription:
          'A concise operational playbook covering KPI design, clean data modeling, Power Query habits, and avoiding fragile spreadsheets.',
        description:
          'Written for founders, analysts, and operations managers who want to stop fighting broken spreadsheets and build reporting habits that scale cleanly into Power BI or custom software.',
        imageAlt: 'Studio flat-lay of a navy technical guide book beside a tablet on cool travertine',
        priceDisplay: '$19 USD (Indicative — PDF digital edition)',
        features: [
          'Step-by-step framework for separating raw data, logic, and presentation sheets',
          'Checklist of 15 practical KPIs across Sales, Inventory, and Cash Flow',
          'Power Query naming conventions and error-proofing patterns',
          'Decision guide: when to stay in Excel vs. move to Power BI or custom software',
        ],
        intendedUsers: [
          'Entrepreneurs and SME managers building internal reporting discipline',
          'Junior and mid-level business analysts',
          'Operations leads standardizing team spreadsheets',
        ],
        compatibility: 'Standard PDF format readable on desktop, tablet, and e-readers',
        requirements: 'Any standard PDF viewer.',
        licenseInfo: 'Personal or single-team internal learning resource license.',
        faqs: [
          {
            question: 'Is this a theoretical textbook or a practical checklist?',
            answer: 'It is a concise, hands-on playbook focused on real operational patterns you can apply immediately.',
          },
        ],
        whatsappInquiryMessage:
          'Hello NahroTech, I would like to request the Practical Business Intelligence Digital Guide.',
      },
      ar: {
        name: 'الدليل العملي لهيكلة الجداول وبناء ذكاء الأعمال (كتاب رقمي)',
        shortDescription:
          'دليل تطبيقي مركز يشرح تصميم مؤشرات الأداء، وهيكلة البيانات النظيفة، وعادات Power Query لتفادي أخطاء الجداول التقليدية.',
        description:
          'مكتوب لرواد الأعمال ومديري التشغيل والمحللين الراغبين في الانتقال من الجداول الفوضوية إلى بنية تقارير منضبطة قابلة للتطور نحو Power BI أو البرمجيات المخصصة.',
        imageAlt: 'صورة استوديو لدليل تقني كحلي اللون بجانب جهاز لوحي على سطح حجري فاتح',
        priceDisplay: '19 دولار أمريكي (سعر استرشادي — نسخة PDF رقمية)',
        features: [
          'منهجية عملية لفصل جداول الإدخال الخام عن المعالجة ولوحات العرض',
          'قائمة 15 مؤشر أداء أساسي عبر المبيعات والمخزون والتدفق النقدي',
          'قواعد تسمية وتنظيم استعلامات Power Query وتقليل الأخطاء',
          'إطار قرار واضح: متى يكفي إكسل ومتى ننتقل إلى Power BI أو نظام مخصص',
        ],
        intendedUsers: [
          'رواد الأعمال ومديرو الشركات الصغيرة والمتوسطة',
          'محللو البيانات والأعمال',
          'قادة التشغيل الساعون لتوحيد ملفات العمل داخل الفريق',
        ],
        compatibility: 'ملف PDF قياسي يعمل على الحواسيب والأجهزة اللوحية والهواتف',
        requirements: 'أي قارئ ملفات PDF قياسي.',
        licenseInfo: 'ترخيص استخدام شخصي أو تعليمي داخل فريق واحد.',
        faqs: [
          {
            question: 'هل الدليل نظري أم تطبيقي؟',
            answer: 'هو دليل تطبيقي مختصر يركز على أنماط العمل اليومية التي يمكن تطبيقها مباشرة.',
          },
        ],
        whatsappInquiryMessage:
          'مرحباً نحروتك، أود طلب الدليل العملي لهيكلة الجداول وبناء ذكاء الأعمال.',
      },
    },
  },
];

export function getProductBySlug(slug?: string): ProductItem | undefined {
  return PRODUCTS.find((p) => p.slug === slug && p.readyForSale);
}
