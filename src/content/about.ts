import {Locale} from '../config/site';

export interface AboutContent {
  eyebrow: string;
  heading: string;
  lead: string;
  pillarsTitle: string;
  pillars: Array<{
    order: string;
    title: string;
    description: string;
  }>;
  audiencesTitle: string;
  audiencesBody: string;
  audiences: Array<{
    title: string;
    description: string;
  }>;
  workflowTitle: string;
  workflowBody: string;
  workflowSteps: Array<{
    step: string;
    title: string;
    description: string;
  }>;
  engagementTitle: string;
  engagementModels: Array<{
    title: string;
    description: string;
    actionLabel: string;
    actionType: 'project' | 'store' | 'consultation';
  }>;
}

export const ABOUT_CONTENT: Record<Locale, AboutContent> = {
  en: {
    eyebrow: 'About NahroTech',
    heading: 'Practical technology grounded in how real businesses work.',
    lead: 'NahroTech is an international creative technology and business-solutions company. We help individuals, founders, and organizations turn complex operational challenges into clear, dependable digital systems—without unnecessary complexity.',
    pillarsTitle: 'Three qualities that define our studio',
    pillars: [
      {
        order: '01.',
        title: 'Integrated Digital-Solutions Company',
        description:
          'We connect data analytics, spreadsheets, management workflows, web/mobile interfaces, and automation rather than delivering isolated tools that never talk to each other.',
      },
      {
        order: '02.',
        title: 'Business-First Technology Partner',
        description:
          'Before writing code or designing a dashboard, we clarify the business objective, the bottleneck, and the simplest architecture your team can sustain.',
      },
      {
        order: '03.',
        title: 'Creative Technology & Innovation Studio',
        description:
          'We combine clean engineering with sharp visual design so internal tools, reports, and public platforms feel intuitive and trustworthy.',
      },
    ],
    audiencesTitle: 'Who we build for',
    audiencesBody:
      'Our engagement structure adapts cleanly whether you need a focused spreadsheet model or a multi-system digital rollout.',
    audiences: [
      {
        title: 'Individuals',
        description: 'Ready-made digital tools, structured templates, and learning resources for personal productivity or freelance work.',
      },
      {
        title: 'Entrepreneurs & Startups',
        description: 'Lean MVP web/mobile platforms, financial models, and operational setups built to validate ideas quickly.',
      },
      {
        title: 'Small & Medium Businesses',
        description: 'Sales, inventory, CRM, Excel automation, and Power BI reporting systems that bring structure to daily operations.',
      },
      {
        title: 'Large Organizations',
        description: 'Custom dashboards, cross-system API integrations, workflow automation, and specialized consulting support.',
      },
    ],
    workflowTitle: 'How every engagement moves forward',
    workflowBody: 'A straightforward four-step process designed for clarity and steady validation.',
    workflowSteps: [
      {
        step: '01',
        title: 'Business Discovery',
        description: 'Understand the operational bottleneck, existing data/tools, and measurable success criteria.',
      },
      {
        step: '02',
        title: 'Practical Architecture',
        description: 'Select the right-sized solution—whether an automated workbook, dashboard, custom app, or integration.',
      },
      {
        step: '03',
        title: 'Focused Implementation',
        description: 'Build incrementally with clean documentation, structured data, and responsive interfaces.',
      },
      {
        step: '04',
        title: 'Handover & Evolution',
        description: 'Train operators, validate real usage, and expand capabilities progressively based on evidence.',
      },
    ],
    engagementTitle: 'Three clear ways to work with NahroTech',
    engagementModels: [
      {
        title: 'Custom Development Projects',
        description: 'Tailored web apps, mobile apps, BI dashboards, Excel systems, and workflow integrations scoped around your exact requirements.',
        actionLabel: 'Start Your Project',
        actionType: 'project',
      },
      {
        title: 'Ready-Made Digital Products',
        description: 'Pre-built Excel templates, analytics dashboards, business tools, and guides ready for immediate business use.',
        actionLabel: 'Explore Products',
        actionType: 'store',
      },
      {
        title: 'Consulting Services',
        description: 'Advisory sessions covering data strategy, operational workflow optimization, and digital architecture decisions.',
        actionLabel: 'Book a Consultation',
        actionType: 'consultation',
      },
    ],
  },
  ar: {
    eyebrow: 'عن نحروتك',
    heading: 'تقنية عملية تنطلق من فهم حقيقي لطبيعة الأعمال.',
    lead: 'نحروتك شركة دولية للتقنية الإبداعية وحلول الأعمال. نساعد الأفراد والمؤسسين والمؤسسات على تحويل التحديات التشغيلية إلى أنظمة رقمية واضحة وموثوقة بعيداً عن التعقيد غير المبرر.',
    pillarsTitle: 'ثلاث سمات تشكّل هوية عملنا',
    pillars: [
      {
        order: '01.',
        title: 'شركة حلول رقمية متكاملة',
        description:
          'نربط بين تحليل البيانات وجداول إكسل وأنظمة الإدارة وتطبيقات الويب والجوال والأتمتة بدلاً من تسليم أدوات منفصلة لا تتكامل معاً.',
      },
      {
        order: '02.',
        title: 'شريك تقني يبدأ من العمل أولاً',
        description:
          'قبل كتابة أي سطر برمجي أو بناء لوحة بيانات، نوضح هدف العمل ونقطة الاختناق وأبسط بنية تقنية يستطيع فريقك تشغيلها بثبات.',
      },
      {
        order: '03.',
        title: 'استوديو تقنية وابتكار إبداعي',
        description:
          'نجمع بين الهندسة النظيفة والتصميم الواضح لتبدو الأدوات الداخلية والتقارير والواجهات العامة احترافية وسهلة الاستخدام.',
      },
    ],
    audiencesTitle: 'الفئات التي نخدمها',
    audiencesBody:
      'تتكيف منهجية عملنا بسلاسة سواء كنت تحتاج قالباً عملياً سريعاً أو منظومة رقمية متكاملة.',
    audiences: [
      {
        title: 'الأفراد',
        description: 'أدوات رقمية جاهزة وقوالب منظمة وموارد تعليمية لرفع الإنتاجية الفردية أو إدارة العمل الحر.',
      },
      {
        title: 'رواد الأعمال والشركات الناشئة',
        description: 'نسخ أولية رشيقة لتطبيقات الويب والجوال ونماذج مالية وهياكل تشغيل لاختبار الأفكار بسرعة.',
      },
      {
        title: 'الشركات الصغيرة والمتوسطة',
        description: 'أنظمة المبيعات والمخزون والعملاء وأتمتة إكسل ولوحات Power BI لتنظيم التشغيل اليومي.',
      },
      {
        title: 'المؤسسات الكبرى',
        description: 'لوحات تقارير مخصصة، وربط أنظمة عبر API، وأتمتة سير العمل، واستشارات تقنية متخصصة.',
      },
    ],
    workflowTitle: 'كيف يتقدم كل مشروع',
    workflowBody: 'مسار واضح من أربع خطوات يركز على التحقق العملي وجودة التنفيذ.',
    workflowSteps: [
      {
        step: '01',
        title: 'فهم واقع العمل',
        description: 'دراسة التحدي التشغيلي والأدوات الحالية وتحديد معايير النجاح القابلة للقياس.',
      },
      {
        step: '02',
        title: 'تصميم البنية المناسبة',
        description: 'اختيار الحل الأنسب حجماً وتكلفة؛ سواء كان ملف إكسل مؤتمتاً أو لوحة بيانات أو تطبيقاً أو تكاملاً برمجياً.',
      },
      {
        step: '03',
        title: 'تنفيذ مركّز وتدريجي',
        description: 'بناء الحل على مراحل مع توثيق واضح وهيكلة بيانات نظيفة وواجهات متجاوبة.',
      },
      {
        step: '04',
        title: 'التسليم والتطوير المستمر',
        description: 'تدريب الفريق، والتحقق من الاستخدام الفعلي، وتوسيع القدرات تدريجياً استناداً إلى نتائج ملموسة.',
      },
    ],
    engagementTitle: 'ثلاث طرق واضحة للعمل مع نحروتك',
    engagementModels: [
      {
        title: 'مشاريع تطوير مخصصة',
        description: 'مواقع وتطبيقات جوال ولوحات تحليلات وأنظمة إكسل وتكاملات مصممة خصيصاً لمتطلبات مشروعك.',
        actionLabel: 'ابدأ مشروعك',
        actionType: 'project',
      },
      {
        title: 'منتجات رقمية جاهزة',
        description: 'قوالب إكسل احترافية ولوحات تقارير وأدوات أعمال وأدلة رقمية جاهزة للاستخدام الفوري.',
        actionLabel: 'استكشف المنتجات',
        actionType: 'store',
      },
      {
        title: 'الخدمات الاستشارية',
        description: 'جلسات استشارية متخصصة في استراتيجية البيانات وتحسين العمليات وقرارات البنية التقنية.',
        actionLabel: 'احجز استشارة',
        actionType: 'consultation',
      },
    ],
  },
};
