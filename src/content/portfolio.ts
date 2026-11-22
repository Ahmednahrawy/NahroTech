import {Locale} from '../config/site';
import {IndustryId} from './solutions';

export interface PortfolioCaseStudyContent {
  title: string;
  category: string;
  statusLabel: string;
  shortDescription: string;
  imageAlt: string;
  businessProblem: string;
  requirements: string[];
  proposedSolution: string;
  implementation: string[];
  outcome: string;
  outcomeCaveat: string;
}

export interface PortfolioItem {
  slug: string;
  industry: IndustryId;
  serviceSlug: string;
  technologies: string[];
  image: string;
  isConceptDemo: boolean;
  featured: boolean;
  content: Record<Locale, PortfolioCaseStudyContent>;
}

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    slug: 'retail-margin-stock-bi-architecture',
    industry: 'retail',
    serviceSlug: 'data-business-intelligence',
    technologies: ['Power BI', 'Power Query', 'Excel Data Model'],
    image: 'src/assets/images/bi_analytics_workspace_1795357660215.jpg',
    isConceptDemo: true,
    featured: true,
    content: {
      en: {
        title: 'Retail Margin & Multi-Branch Stock BI Architecture',
        category: 'Data & Business Intelligence',
        statusLabel: 'Concept Demonstration',
        shortDescription:
          'A unified Power BI and Power Query reporting blueprint connecting POS sales exports, landed product costs, and branch stock levels.',
        imageAlt: 'Executive laptop showing structured dark navy and electric blue business analytics charts',
        businessProblem:
          'Multi-branch retailers often track sales in POS exports while maintaining purchase costs and branch transfers in separate spreadsheets, making SKU-level profitability and dead-stock detection slow and error-prone.',
        requirements: [
          'Combine daily sales exports and supplier cost sheets without manual copy-paste.',
          'Track gross margin by category, branch, and individual SKU.',
          'Surface low-stock and slow-moving inventory flags before stockouts occur.',
          'Support fast refresh using standard desktop spreadsheets or cloud BI.',
        ],
        proposedSolution:
          'Designed a star-schema Power Query pipeline feeding a multi-page Power BI executive dashboard: Sales & Margin Overview, Branch Stock Health, and Reorder Action List.',
        implementation: [
          'Standardized product SKU codes and supplier cost history tables in structured Excel input sheets.',
          'Built Power Query transformation steps to clean, merge, and validate daily POS CSV exports.',
          'Authored DAX measures for gross margin %, inventory days-on-hand, and branch variance.',
          'Configured clean executive views with drill-through filtering by date, branch, and supplier.',
        ],
        outcome:
          'Demonstrates how a mid-sized retailer can replace multi-hour weekly spreadsheet reconciliation with a repeatable one-click refresh reporting pack.',
        outcomeCaveat:
          'Concept Demonstration: Architecture and sample data model built by NahroTech to illustrate capability; not tied to a named external client.',
      },
      ar: {
        title: 'معمارية ذكاء الأعمال لهوامش التجزئة ومخزون الفروع',
        category: 'البيانات وذكاء الأعمال',
        statusLabel: 'نموذج تطبيقي تجريبي',
        shortDescription:
          'مخطط تقارير متكامل عبر Power BI وPower Query يربط مبيعات نقاط البيع بتكاليف الشراء وحركة المخزون بين الفروع.',
        imageAlt: 'حاسوب محمول يعرض لوحة تحليلات أعمال منظمة باللون الكحلي والأزرق',
        businessProblem:
          'تحتفظ متاجر التجزئة متعددة الفروع بسجلات المبيعات في نظام نقاط البيع بينما تدار تكاليف الشراء والتحويلات في ملفات منفصلة، مما يؤخر معرفة الربحية الحقيقية لكل صنف واكتشاف المخزون الراكد.',
        requirements: [
          'دمج ملفات المبيعات اليومية مع جداول تكلفة الموردين دون نسخ ولصق يدوي.',
          'قياس هامش الربح الإجمالي حسب الفئة والفرع والصنف.',
          'إظهار تنبيهات مبكرة لانخفاض المخزون والأصناف بطيئة الدوران.',
          'تسهيل التحديث الدوري باستخدام ملفات إكسل القياسية أو Power BI.',
        ],
        proposedSolution:
          'تصميم مسار معالجة بيانات عبر Power Query يغذي لوحة Power BI من ثلاث شاشات رئيسية: ملخص المبيعات والهوامش، صحة مخزون الفروع، وقائمة أولويات إعادة الطلب.',
        implementation: [
          'توحيد رموز الأصناف (SKU) وسجل تكاليف الموردين في جداول إدخال منظمة.',
          'بناء خطوات Power Query لتنظيف ودمج صادرات CSV اليومية من نقاط البيع.',
          'كتابة مقاييس DAX لحساب نسبة الهامش، وأيام تغطية المخزون، وفروقات الفروع.',
          'تصميم واجهات تنفيذية واضحة تدعم التصفية حسب التاريخ والفرع والمورد.',
        ],
        outcome:
          'يوضح النموذج كيف يمكن لشركة تجزئة استبدال ساعات المطابقة الأسبوعية بتحديث تقارير منظّم بضغطة زر.',
        outcomeCaveat:
          'نموذج تطبيقي تجريبي: بنية تقنية ونموذج بيانات تجريبي من تطوير نحروتك لتوضيح القدرة التنفيذية ولا يمثل عميلاً خارجياً مسمى.',
      },
    },
  },
  {
    slug: 'wholesale-financial-cashflow-workbook',
    industry: 'wholesale',
    serviceSlug: 'excel-solutions-automation',
    technologies: ['Excel / Power Query', 'Financial Modeling'],
    image: 'src/assets/images/excel_financial_model_1795357660368.jpg',
    isConceptDemo: true,
    featured: true,
    content: {
      en: {
        title: 'Wholesale Receivables, Credit Aging & Cash-Flow Workbook',
        category: 'Excel Solutions & Automation',
        statusLabel: 'Concept Demonstration',
        shortDescription:
          'A structured Excel financial control system tracking B2B customer credit limits, invoice aging buckets, and 12-month rolling cash flow.',
        imageAlt: 'Overhead studio view of a financial spreadsheet model on a laptop beside a planning notebook',
        businessProblem:
          'Wholesale distributors extending 30–90 day credit terms frequently track customer balances in ad-hoc sheets, leading to overdue invoices going unnoticed and unpredictable monthly cash shortfalls.',
        requirements: [
          'Separate clean transaction logs from locked summary calculations.',
          'Automatically classify unpaid invoices into 0–30, 31–60, 61–90, and 90+ day aging buckets.',
          'Flag accounts approaching or exceeding assigned credit limits.',
          'Project expected monthly cash inflows alongside fixed and supplier commitments.',
        ],
        proposedSolution:
          'Engineered a modular Excel workbook combining structured Excel Tables, dynamic array formulas, data-validation rules, and an executive cash-flow overview.',
        implementation: [
          'Created structured Customer Master, Invoice Ledger, and Payment Receipt tables.',
          'Implemented locked aging formulas with conditional credit-limit warning flags.',
          'Built a 12-month rolling cash-flow statement comparing projected vs. actual collections.',
          'Added an operator guide sheet explaining daily entry and monthly reconciliation steps.',
        ],
        outcome:
          'Shows how small and mid-sized distributors can enforce credit discipline and cash visibility directly in Microsoft Excel without expensive ERP overhead.',
        outcomeCaveat:
          'Concept Demonstration: Reference workbook architecture created by NahroTech for demonstration and digital template adaptation.',
      },
      ar: {
        title: 'نظام إكسل لمتابعة الذمم والائتمان والتدفق النقدي لتجارة الجملة',
        category: 'حلول إكسل والأتمتة',
        statusLabel: 'نموذج تطبيقي تجريبي',
        shortDescription:
          'منظومة مالية متكاملة في إكسل لمتابعة حدود ائتمان العملاء، وأعمار الفواتير المستحقة، والتدفق النقدي المتوقع لـ 12 شهراً.',
        imageAlt: 'لقطة علوية لحاسوب يعرض نموذجاً مالياً في إكسل بجانب دفتر تخطيط',
        businessProblem:
          'تمنح شركات الجملة فترات سداد تمتد من 30 إلى 90 يوماً، وغالباً ما تُتابع الأرصدة في جداول عشوائية مما يؤدي لتأخر التحصيل وضعف وضوح السيولة الشهرية.',
        requirements: [
          'فصل سجل الحركات اليومية عن صفحات الحسابات والملخصات المحمية.',
          'تصنيف الفواتير غير المسددة تلقائياً ضمن فئات (0-30، 31-60، 61-90، +90 يوماً).',
          'تنبيه الإدارة عند اقتراب العميل من حده الائتماني أو تجاوزه.',
          'توقع التدفقات النقدية الداخلة مقابل التزامات الموردين والمصروفات الثابتة.',
        ],
        proposedSolution:
          'تصميم مصنف إكسل مهيكل يجمع بين الجداول المنظمة، والصيغ الديناميكية، وقواعد التحقق من الإدخال، ولوحة متابعة تنفيذية للتدفق النقدي.',
        implementation: [
          'بناء جداول منظمة لبيانات العملاء وسجل الفواتير وسندات التحصيل.',
          'تطوير معادلات محمية لحساب أعمار الديون مع تنبيهات تجاوز الحد الائتماني.',
          'إعداد جدول تدفق نقدي متجدد لـ 12 شهراً يقارن التحصيل المتوقع بالفعلي.',
          'إضافة صفحة إرشادية واضحة توضح خطوات الإدخال اليومي والمطابقة الشهرية.',
        ],
        outcome:
          'يوضح النموذج قدرة شركات التوزيع الصغيرة والمتوسطة على ضبط التحصيل والسيولة داخل إكسل قبل الاستثمار في أنظمة ERP معقدة.',
        outcomeCaveat:
          'نموذج تطبيقي تجريبي: بنية عمل مرجعية من تصميم نحروتك لأغراض العرض والتطوير.',
      },
    },
  },
  {
    slug: 'service-crm-intake-automation-blueprint',
    industry: 'services',
    serviceSlug: 'ai-digital-automation',
    technologies: ['React / TypeScript', 'API Automation', 'Business Systems'],
    image: 'src/assets/images/retail_inventory_ops_1795357660077.jpg',
    isConceptDemo: true,
    featured: true,
    content: {
      en: {
        title: 'Connected Lead Intake, CRM Routing & Operational Tracking',
        category: 'Business Systems & Automation',
        statusLabel: 'Concept Demonstration',
        shortDescription:
          'An end-to-end web intake and API automation workflow that routes service inquiries directly into structured CRM stages and operational alerts.',
        imageAlt: 'Organized operational workspace with staff checking structured inventory and workflow records on a tablet',
        businessProblem:
          'Service firms receive inquiries across web forms, email, and messaging apps, causing fragmented follow-ups, duplicate manual data entry, and slow response times.',
        requirements: [
          'Capture structured inquiry metadata (service type, scope summary, preferred contact channel).',
          'Validate input and filter spam before routing records into internal trackers.',
          'Generate standardized bilingual inquiry summaries for rapid team triage.',
          'Keep architecture lightweight and compatible with static web frontends.',
        ],
        proposedSolution:
          'Combined a fast TypeScript web inquiry interface with webhook/API routing and standardized CRM record formatting.',
        implementation: [
          'Built validated bilingual form interfaces with structured service and intent tagging.',
          'Integrated provider-independent submission adapters with spam honeypot filtering.',
          'Mapped structured webhook payloads to clean operational status stages.',
          'Added contextual WhatsApp handoff templates preserving the visitor’s selected service.',
        ],
        outcome:
          'Demonstrates a practical, zero-bloat lead capture pipeline suitable for consultancies and growing service organizations.',
        outcomeCaveat:
          'Concept Demonstration: Workflow architecture built by NahroTech to demonstrate integrated web and automation capabilities.',
      },
      ar: {
        title: 'منظومة ربط استقطاب العملاء وتوجيه الطلبات وتتبع التشغيل',
        category: 'أنظمة الأعمال والأتمتة',
        statusLabel: 'نموذج تطبيقي تجريبي',
        shortDescription:
          'مسار عمل متكامل يربط نماذج الويب بأتمتة API لتوجيه طلبات العملاء مباشرة إلى مراحل متابعة منظمة وتنبيهات تشغيلية.',
        imageAlt: 'مساحة عمل تشغيلية منظمة مع متابعة السجلات عبر جهاز لوحي',
        businessProblem:
          'تتلقى الشركات الخدمية الطلبات عبر نماذج الموقع والبريد والمحادثات، مما يؤدي إلى تشتت المتابعة وتكرار الإدخال اليدوي وبطء الاستجابة.',
        requirements: [
          'جمع بيانات الاستفسار بشكل مهيكل (نوع الخدمة، ملخص النطاق، قناة التواصل المفضلة).',
          'التحقق من المدخلات وتصفية الرسائل المزعجة قبل تحويل الطلب لسجلات المتابعة.',
          'توحيد ملخص الطلب باللغتين لتسريع الفرز داخل الفريق.',
          'الحفاظ على خفة البنية وتوافقها مع الواجهات الثابتة السريعة.',
        ],
        proposedSolution:
          'الجمع بين واجهة ويب سريعة مكتوبة بـ TypeScript ومحوّل طلبات عبر API لتنظيم السجلات ضمن مراحل متابعة واضحة.',
        implementation: [
          'بناء نماذج استفسار ثنائية اللغة مع التحقق من الحقول وتصنيف نية الطلب.',
          'تطبيق طبقة إرسال مستقلة عن المزود مع حماية ضد الرسائل الآلية المزعجة.',
          'هيكلة البيانات المرسلة لتطابق مراحل خط العمل الداخلي.',
          'إضافة روابط واتساب سياقية تنقل الخدمة المختارة تلقائياً في نص الرسالة.',
        ],
        outcome:
          'يوضح النموذج كيف يمكن للشركات الخدمية بناء مسار استقطاب عملاء منظم وسريع دون تعقيد أنظمة CRM ضخمة.',
        outcomeCaveat:
          'نموذج تطبيقي تجريبي: مخطط عمل تقني من تطوير نحروتك لتوضيح تكامل الويب مع الأتمتة.',
      },
    },
  },
];

export function getPortfolioBySlug(slug?: string): PortfolioItem | undefined {
  return PORTFOLIO_ITEMS.find((item) => item.slug === slug);
}
