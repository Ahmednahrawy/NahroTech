import {Locale} from '../config/site';

export type IndustryId = 'retail' | 'wholesale' | 'manufacturing' | 'services';
export type FunctionId = 'sales' | 'inventory' | 'finance' | 'operations' | 'reporting' | 'crm';
export type BusinessSizeId = 'individual' | 'startup' | 'sme' | 'enterprise';

export interface SolutionEntry {
  id: string;
  industries: IndustryId[];
  functions: FunctionId[];
  sizes: BusinessSizeId[];
  relatedServiceSlugs: string[];
  image: string;
  content: Record<
    Locale,
    {
      title: string;
      imageAlt: string;
      challenge: string;
      solution: string;
      outcomes: string[];
    }
  >;
}

export const INDUSTRY_OPTIONS: Array<{
  id: IndustryId;
  content: Record<Locale, {name: string; summary: string}>;
}> = [
  {
    id: 'retail',
    content: {
      en: {
        name: 'Retail & E-commerce',
        summary: 'Storefront sales, SKU profitability, stock alerts, and multi-channel order visibility.',
      },
      ar: {
        name: 'التجزئة والتجارة الإلكترونية',
        summary: 'مبيعات المتاجر، وربحية الأصناف، وتنبيهات المخزون، ومتابعة الطلبات عبر القنوات.',
      },
    },
  },
  {
    id: 'wholesale',
    content: {
      en: {
        name: 'Wholesale & Distribution',
        summary: 'Batch tracking, receivables control, credit aging, and distributor order workflows.',
      },
      ar: {
        name: 'الجملة والتوزيع',
        summary: 'تتبع الدفعات، ومراقبة الذمم المدينة، وأعمار الديون، وسير عمل طلبات الموزعين.',
      },
    },
  },
  {
    id: 'manufacturing',
    content: {
      en: {
        name: 'Manufacturing & Production',
        summary: 'Raw material planning, production cost variance, output tracking, and quality logs.',
      },
      ar: {
        name: 'التصنيع والإنتاج',
        summary: 'تخطيط المواد الخام، وفروقات تكلفة الإنتاج، وتتبع المخرجات وسجلات الجودة.',
      },
    },
  },
  {
    id: 'services',
    content: {
      en: {
        name: 'Professional & Service Businesses',
        summary: 'Client pipelines, project utilization, retainer billing, and automated status reporting.',
      },
      ar: {
        name: 'الشركات المهنية والخدمية',
        summary: 'مسار العملاء، وكفاءة استخدام الموارد، والفوترة الدورية، والتقارير التلقائية.',
      },
    },
  },
];

export const FUNCTION_OPTIONS: Array<{id: FunctionId; label: Record<Locale, string>}> = [
  {id: 'sales', label: {en: 'Sales', ar: 'المبيعات'}},
  {id: 'inventory', label: {en: 'Inventory', ar: 'المخزون'}},
  {id: 'finance', label: {en: 'Finance', ar: 'المالية'}},
  {id: 'operations', label: {en: 'Operations', ar: 'العمليات'}},
  {id: 'reporting', label: {en: 'Reporting', ar: 'التقارير'}},
  {id: 'crm', label: {en: 'Customer Management', ar: 'إدارة العملاء'}},
];

export const SIZE_OPTIONS: Array<{id: BusinessSizeId; label: Record<Locale, string>}> = [
  {id: 'individual', label: {en: 'Individuals', ar: 'الأفراد'}},
  {id: 'startup', label: {en: 'Entrepreneurs & Startups', ar: 'رواد الأعمال والشركات الناشئة'}},
  {id: 'sme', label: {en: 'Small & Medium Businesses', ar: 'الشركات الصغيرة والمتوسطة'}},
  {id: 'enterprise', label: {en: 'Large Organizations', ar: 'المؤسسات الكبرى'}},
];

export const SOLUTIONS: SolutionEntry[] = [
  {
    id: 'retail-omni-inventory-bi',
    industries: ['retail'],
    functions: ['sales', 'inventory', 'reporting'],
    sizes: ['startup', 'sme', 'enterprise'],
    relatedServiceSlugs: ['data-business-intelligence', 'excel-solutions-automation', 'web-design-development'],
    image: 'src/assets/images/bi_analytics_workspace_1795357660215.jpg',
    content: {
      en: {
        title: 'Multi-Channel Sales & Stock Visibility',
        imageAlt: 'Laptop displaying retail margin and multi-branch inventory analytics charts',
        challenge:
          'Online stores and physical branches often report stock separately, causing overselling on fast-moving SKUs and capital locked in slow inventory.',
        solution:
          'Unify sales exports and stock movements into automated Power BI or structured Excel dashboards with reorder thresholds and margin-by-SKU reporting.',
        outcomes: [
          'Single view of daily revenue, returns, and net product margin',
          'Early low-stock and slow-moving inventory flags',
          'Clean product catalog web storefronts synced with inquiry or order flows',
        ],
      },
      ar: {
        title: 'توحيد رؤية المبيعات والمخزون عبر القنوات',
        imageAlt: 'حاسوب يعرض لوحة تحليلات هوامش التجزئة وحركة مخزون الفروع',
        challenge:
          'تعمل المتاجر الإلكترونية والفروع أحياناً بسجلات منفصلة، مما يسبب نفاد الأصناف سريعة الدوران أو تجميد السيولة في مخزون راكد.',
        solution:
          'توحيد بيانات المبيعات وحركة المخزون في لوحات Power BI أو إكسل مؤتمتة مع حدود إعادة الطلب وتحليل الهامش لكل صنف.',
        outcomes: [
          'رؤية موحدة للإيرادات اليومية والمرتجعات وصافي هامش الربح',
          'تنبيهات مبكرة لانخفاض المخزون والأصناف بطيئة الحركة',
          'متاجر ويب سريعة ومتكاملة مع مسارات الطلب والاستفسار',
        ],
      },
    },
  },
  {
    id: 'wholesale-credit-receivables',
    industries: ['wholesale'],
    functions: ['sales', 'finance', 'inventory', 'crm'],
    sizes: ['sme', 'enterprise'],
    relatedServiceSlugs: ['business-management-solutions', 'excel-solutions-automation', 'data-business-intelligence'],
    image: 'src/assets/images/retail_inventory_ops_1795357660077.jpg',
    content: {
      en: {
        title: 'Wholesale Order, Credit & Receivables Control',
        imageAlt: 'Operations staff reviewing wholesale order dispatch and stock records on a tablet',
        challenge:
          'Distributors managing B2B credit terms across dozens of accounts struggle with overdue invoice blind spots and warehouse dispatch delays.',
        solution:
          'Deploy structured B2B customer trackers, aging receivables dashboards, and streamlined order-to-dispatch workflows.',
        outcomes: [
          'Customer aging buckets (30/60/90+ days) updated from accounting exports',
          'Clear credit-limit visibility before approving new shipments',
          'Faster coordination between sales reps and warehouse teams',
        ],
      },
      ar: {
        title: 'ضبط طلبات الجملة والائتمان والتحصيل',
        imageAlt: 'فريق عمليات يراجع طلبات الجملة وسجلات المخزون عبر جهاز لوحي',
        challenge:
          'تواجه شركات التوزيع صعوبة في متابعة حدود ائتمان العملاء وتأخر الفواتير المستحقة وتنسيق تجهيز المستودعات.',
        solution:
          'تطبيق أنظمة متابعة عملاء الجملة ولوحات أعمار الذمم وتدفقات عمل واضحة من الطلب حتى التسليم.',
        outcomes: [
          'تقارير أعمار الديون (30/60/90+ يوماً) محدثة من صادرات المحاسبة',
          'وضوح الحد الائتماني للعميل قبل اعتماد الشحنات الجديدة',
          'تنسيق أسرع بين مندوبي المبيعات وفريق المستودع',
        ],
      },
    },
  },
  {
    id: 'manufacturing-cost-output',
    industries: ['manufacturing'],
    functions: ['operations', 'inventory', 'finance', 'reporting'],
    sizes: ['sme', 'enterprise'],
    relatedServiceSlugs: ['excel-solutions-automation', 'data-business-intelligence', 'business-management-solutions'],
    image: 'src/assets/images/manufacturing_bi_work_example_1795525934989.jpg',
    content: {
      en: {
        title: 'Production Costing & Material Variance Tracking',
        imageAlt: 'Tablet showing manufacturing BOM cost variance and production yield metrics beside technical drawings',
        challenge:
          'Manufacturing units often calculate batch costs manually after production finishes, hiding material waste and unit-cost drift.',
        solution:
          'Implement structured Bill-of-Materials (BOM) Excel models paired with operational Power BI reporting comparing planned vs. actual material and labor costs.',
        outcomes: [
          'Batch-level visibility into raw material consumption and waste',
          'Accurate unit cost tracking across shifts and production lines',
          'Standardized daily floor reporting templates',
        ],
      },
      ar: {
        title: 'تتبع تكاليف الإنتاج وفروقات المواد الخام',
        imageAlt: 'جهاز لوحي يعرض لوحة تحليل فروقات تكلفة التصنيع وكفاءة الإنتاج بجانب رسومات هندسية',
        challenge:
          'غالباً ما تحسب المصانع تكلفة التشغيلات يدوياً بعد الانتهاء، مما يخفي نسب الهدر وتغير تكلفة الوحدة.',
        solution:
          'بناء نماذج قوائم مواد (BOM) مهيكلة في إكسل مع تقارير Power BI تقارن التكلفة المخططة بالفعلية للمواد والعمل.',
        outcomes: [
          'متابعة استهلاك المواد الخام والهدر على مستوى كل دفعة إنتاج',
          'رصد دقيق لتكلفة الوحدة عبر الورديات وخطوط الإنتاج',
          'توحيد نماذج التقارير اليومية لخطوط الإنتاج',
        ],
      },
    },
  },
  {
    id: 'services-crm-delivery',
    industries: ['services'],
    functions: ['sales', 'crm', 'operations', 'reporting'],
    sizes: ['individual', 'startup', 'sme'],
    relatedServiceSlugs: ['business-management-solutions', 'web-design-development', 'ai-digital-automation'],
    image: 'src/assets/images/crm_management_work_example_1795525932669.jpg',
    content: {
      en: {
        title: 'Client Pipeline, Delivery & Automated Follow-Ups',
        imageAlt: 'Executive dual-screen workstation displaying client pipeline board and contract milestone tracker',
        challenge:
          'Consultancies, agencies, and service providers lose leads between inquiry forms, email threads, and manual project status updates.',
        solution:
          'Connect high-converting web inquiry forms directly to a structured CRM tracker with automated notifications and clear project milestone reporting.',
        outcomes: [
          'Zero lost inquiries from web or WhatsApp lead channels',
          'Structured visibility from proposal stage to active delivery',
          'Automated weekly status summaries and client reminders',
        ],
      },
      ar: {
        title: 'إدارة مسار العملاء وتنفيذ المشاريع والمتابعة الآلية',
        imageAlt: 'محطة عمل تعرض لوحة متابعة العملاء وجدول مراحل العقود والفواتير',
        challenge:
          'تفقد الشركات الخدمية والمكاتب الاستشارية فرصاً بيعية بين نماذج الموقع ورسائل البريد ومتابعة حالة التنفيذ اليدوية.',
        solution:
          'ربط صفحات ونماذج استقطاب العملاء مباشرة بنظام CRM منظم مع إشعارات آلية وتقارير واضحة لمراحل التسليم.',
        outcomes: [
          'ضمان عدم ضياع أي استفسار قادم من الموقع أو واتساب',
          'وضوح كامل من مرحلة العرض حتى التسليم النهائي',
          'ملخصات حالة أسبوعية وتنبيهات متابعة مؤتمتة',
        ],
      },
    },
  },
  {
    id: 'founder-financial-control',
    industries: ['retail', 'wholesale', 'services'],
    functions: ['finance', 'reporting'],
    sizes: ['individual', 'startup', 'sme'],
    relatedServiceSlugs: ['excel-solutions-automation', 'data-business-intelligence'],
    image: 'src/assets/images/excel_financial_model_1795357660368.jpg',
    content: {
      en: {
        title: 'Cash-Flow Modeling & Executive Financial Clarity',
        imageAlt: 'Studio view of an automated Excel cash-flow model and forecasting ledger',
        challenge:
          'Entrepreneurs and growing teams frequently confuse revenue growth with healthy cash flow until unexpected shortfalls occur.',
        solution:
          'Build practical financial models, monthly budget vs. actual trackers, and visual cash-runway dashboards tailored to non-accountant founders.',
        outcomes: [
          'Clear 12-month cash-flow visibility and break-even scenarios',
          'Automated monthly P&L summaries from bank/accounting exports',
          'Decision-ready financial templates for internal planning',
        ],
      },
      ar: {
        title: 'نمذجة التدفقات النقدية ووضوح الأداء المالي',
        imageAlt: 'عرض لنموذج إكسل مهيكل للتدفقات النقدية والتوقعات المالية الشهرية',
        challenge:
          'يخلط كثير من رواد الأعمال بين نمو المبيعات وصحة التدفق النقدي، مما يؤدي لمفاجآت سيولة غير متوقعة.',
        solution:
          'تصميم نماذج مالية عملية، وجداول مقارنة الميزانية بالفعلي، ولوحات تدفق نقدي مفهومة لغير المحاسبين.',
        outcomes: [
          'رؤية واضحة للتدفق النقدي لـ 12 شهراً وسيناريوهات نقطة التعادل',
          'ملخصات شهرية مؤتمتة للأرباح والخسائر من صادرات الحسابات',
          'قوالب مالية جاهزة للتخطيط واتخاذ القرار',
        ],
      },
    },
  },
  {
    id: 'field-mobile-workflow-automation',
    industries: ['wholesale', 'manufacturing', 'services'],
    functions: ['operations', 'sales', 'crm'],
    sizes: ['sme', 'enterprise'],
    relatedServiceSlugs: ['mobile-app-development', 'ai-digital-automation', 'web-design-development'],
    image: 'src/assets/images/mobile_field_app_example_1795525932539.jpg',
    content: {
      en: {
        title: 'Connected Field Operations & API Workflow Sync',
        imageAlt: 'Field operator using a mobile dispatch and stock verification application inside a warehouse',
        challenge:
          'Teams on the move rely on paper forms or chat messages that must later be re-typed manually into office systems.',
        solution:
          'Pair lightweight mobile or web capture tools with automated API integrations that route structured entries directly into management dashboards.',
        outcomes: [
          'Eliminate double data entry between field staff and back office',
          'Real-time operational logs with AI-assisted summary digests',
          'Consistent mobile experience across Android and iOS devices',
        ],
      },
      ar: {
        title: 'ربط العمليات الميدانية وأتمتة تدفق البيانات',
        imageAlt: 'موظف ميداني يستخدم تطبيق جوال للتحقق من المخزون وجدولة التسليم داخل المستودع',
        challenge:
          'تعتمد الفرق الميدانية غالباً على أوراق أو رسائل دردشة يعاد إدخالها يدوياً لاحقاً في أنظمة المكتب.',
        solution:
          'توفير تطبيقات جوال أو ويب خفيفة مرتبطة بتكاملات API مؤتمتة تنقل البيانات المهيكلة مباشرة إلى لوحات الإدارة.',
        outcomes: [
          'إلغاء الإدخال المزدوج للبيانات بين الميدان والمكتب',
          'سجلات تشغيلية فورية مع ملخصات ذكية مدعومة بالذكاء الاصطناعي',
          'تجربة متسقة على أجهزة أندرويد وiOS',
        ],
      },
    },
  },
];
