import {Locale} from '../config/site';
import {LegalSlug} from '../utils/routes';

export interface LegalSection {
  heading: string;
  body: string[];
}

export interface LegalDocument {
  title: string;
  summary: string;
  effectiveNote: string;
  sections: LegalSection[];
}

export const LEGAL_DOCUMENTS: Record<LegalSlug, Record<Locale, LegalDocument>> = {
  'privacy-policy': {
    en: {
      title: 'Privacy Policy',
      summary: 'How NahroTech collects, uses, and protects inquiry and website analytics data.',
      effectiveNote: 'MVP Draft — Subject to jurisdiction-specific legal review prior to final publication.',
      sections: [
        {
          heading: '1. Information You Provide',
          body: [
            'When you submit a project inquiry, consultation request, or product purchase inquiry on the NahroTech website, we collect the contact and project details you voluntarily enter (such as your name, email address, optional company name, requested service, and project description).',
            'Form submissions are transmitted using our configured form processing provider (Web3Forms) solely to receive and respond to your inquiry.',
          ],
        },
        {
          heading: '2. Automatically Collected Preferences & Analytics',
          body: [
            'Essential browser storage is used locally to remember your selected language (English or Arabic) and visual theme (Light or Dark).',
            'Where Google Analytics 4 (GA4) is configured and consent is granted, aggregated usage events (such as page views and navigation clicks) are recorded without transmitting personal form fields or private credentials.',
          ],
        },
        {
          heading: '3. Data Use & Sharing',
          body: [
            'We use inquiry information strictly to evaluate project scope, provide requested product details, and communicate with you.',
            'NahroTech does not sell personal data to third parties. Data is shared only with essential service providers required to operate form delivery or analytics as configured.',
          ],
        },
        {
          heading: '4. Your Rights & Requests',
          body: [
            'You may request access to, correction of, or deletion of inquiry details you previously submitted by contacting NahroTech through the configured contact channels on our Contact page.',
          ],
        },
      ],
    },
    ar: {
      title: 'سياسة الخصوصية',
      summary: 'كيفية جمع واستخدام وحماية بيانات الاستفسارات والتحليلات في موقع نحروتك.',
      effectiveNote: 'مسودة النسخة الأولية — تخضع لمراجعة مستشار قانوني مختص وفق الاختصاص القضائي المعتمد قبل النشر النهائي.',
      sections: [
        {
          heading: '1. المعلومات التي تقدمها طوعاً',
          body: [
            'عند إرسال طلب مشروع أو استشارة أو استفسار عن منتج رقمي عبر موقع نحروتك، نقوم بجمع البيانات التي تدخلها طوعاً (مثل الاسم، البريد الإلكتروني، اسم الشركة الاختياري، الخدمة المطلوبة، ووصف المشروع).',
            'تُرسل بيانات النموذج عبر مزود معالجة النماذج المعتمد (Web3Forms) لغرض استلام طلبك والرد عليه فقط.',
          ],
        },
        {
          heading: '2. التفضيلات المحلية والتحليلات',
          body: [
            'يستخدم الموقع التخزين المحلي للمتصفح لحفظ تفضيلات اللغة (العربية أو الإنجليزية) والمظهر (الفاتح أو الداكن).',
            'في حال تفعيل تحليلات جوجل (GA4) ومنح الموافقة، يتم قياس أحداث التصفح العامة دون إرسال أي بيانات شخصية أو محتوى خاص من النماذج.',
          ],
        },
        {
          heading: '3. استخدام البيانات ومشاركتها',
          body: [
            'نستخدم بيانات الاستفسار حصراً لتقييم نطاق المشروع أو توفير معلومات المنتج المطلوب والتواصل معك.',
            'لا تقوم نحروتك ببيع البيانات الشخصية لأي طرف ثالث، وتقتصر المشاركة على مزودي الخدمة الأساسيين لتسليم النماذج أو التحليلات عند تفعيلها.',
          ],
        },
        {
          heading: '4. حقوقك وطلبات الحذف أو التعديل',
          body: [
            'يمكنك طلب الاطلاع على بيانات استفساراتك السابقة أو تعديلها أو حذفها عبر التواصل معنا من خلال قنوات التواصل الموضحة في صفحة تواصل معنا.',
          ],
        },
      ],
    },
  },
  'terms-of-use': {
    en: {
      title: 'Terms of Use',
      summary: 'Rules and conditions governing access to and use of the NahroTech website.',
      effectiveNote: 'MVP Draft — Jurisdiction-specific governing law clauses require legal review.',
      sections: [
        {
          heading: '1. Acceptance of Terms',
          body: [
            'By accessing or browsing the NahroTech website, you agree to comply with these Terms of Use and all applicable laws.',
          ],
        },
        {
          heading: '2. Informational Scope',
          body: [
            'Content on this website describes NahroTech services, capabilities, concept demonstrations, and digital products. Submitting an inquiry does not establish a binding service contract until a written agreement or scope document is executed.',
          ],
        },
        {
          heading: '3. Intellectual Property',
          body: [
            'The NahroTech name, typography wordmark, site design, original copy, and structured showcase materials remain the intellectual property of NahroTech unless explicitly stated otherwise.',
          ],
        },
        {
          heading: '4. Acceptable Use',
          body: [
            'Visitors must not attempt automated scraping that degrades availability, submit spam or abusive payloads through inquiry forms, or misrepresent affiliation with NahroTech.',
          ],
        },
      ],
    },
    ar: {
      title: 'شروط الاستخدام',
      summary: 'الضوابط والأحكام المنظمة للوصول إلى موقع نحروتك واستخدام محتواه.',
      effectiveNote: 'مسودة النسخة الأولية — تتطلب بنود القانون الواجب التطبيق مراجعة قانونية مختصة.',
      sections: [
        {
          heading: '1. الموافقة على الشروط',
          body: [
            'بدخولك إلى موقع نحروتك أو تصفحه، فإنك توافق على الالتزام بشروط الاستخدام هذه وبالأنظمة المعمول بها.',
          ],
        },
        {
          heading: '2. النطاق التعريفي للموقع',
          body: [
            'يعرض الموقع خدمات نحروتك وقدراتها ونماذجها التطبيقية ومنتجاتها الرقمية لأغراض التعريف وطلب التواصل. ولا يُنشئ إرسال أي استفسار التزاماً تعاقدياً ملزماً إلا بعد توقيع اتفاقية مكتوبة أو اعتماد نطاق عمل رسمي.',
          ],
        },
        {
          heading: '3. الملكية الفكرية',
          body: [
            'تبقى العلامة التجارية نحروتك والشعار النصي وتصميم الموقع والمحتوى الأصلي ملكية فكرية محفوظة لنحروتك ما لم يُنص على خلاف ذلك.',
          ],
        },
        {
          heading: '4. الاستخدام المقبول',
          body: [
            'يُحظر إرسال رسائل مزعجة عبر النماذج أو إساءة استخدام قنوات التواصل أو محاولة الإضرار بتوافر الموقع أو انتحال صفة نحروتك.',
          ],
        },
      ],
    },
  },
  'cookie-policy': {
    en: {
      title: 'Cookie Policy',
      summary: 'Explanation of browser storage, essential preferences, and optional analytics consent.',
      effectiveNote: 'MVP Draft — Subject to regional privacy compliance review (e.g., GDPR/ePrivacy where applicable).',
      sections: [
        {
          heading: '1. Essential Local Preferences',
          body: [
            'NahroTech stores minimal preference entries in browser localStorage (language selection and light/dark theme mode) so your chosen viewing experience persists across page reloads. These do not track you across external websites.',
          ],
        },
        {
          heading: '2. Optional Analytics Cookies',
          body: [
            'If Google Analytics 4 is enabled and you accept analytics measurement, GA4 may set first-party cookies to distinguish aggregated sessions and measure page performance.',
            'You can decline optional analytics or update your preference without affecting core browsing, forms, or product inquiries.',
          ],
        },
        {
          heading: '3. Managing Browser Cookies',
          body: [
            'You can clear or block cookies and local storage at any time via your browser privacy settings.',
          ],
        },
      ],
    },
    ar: {
      title: 'سياسة ملفات الارتباط',
      summary: 'توضيح آلية التخزين المحلي لتفضيلات الموقع وموافقة التحليلات الاختيارية.',
      effectiveNote: 'مسودة النسخة الأولية — تخضع لمراجعة متطلبات الخصوصية الإقليمية المطبقة.',
      sections: [
        {
          heading: '1. التفضيلات الأساسية',
          body: [
            'يستخدم موقع نحروتك التخزين المحلي للمتصفح لحفظ اللغة المختارة ومظهر العرض (فاتح/داكن) لضمان استمرارية تجربتك دون تتبعك عبر مواقع خارجية.',
          ],
        },
        {
          heading: '2. ملفات تحليلات الاستخدام الاختيارية',
          body: [
            'في حال تفعيل تحليلات جوجل (GA4) وموافقتك عليها، قد تُستخدم ملفات ارتباط إحصائية لقياس الزيارات وأداء الصفحات بشكل إجمالي.',
            'يمكنك رفض التحليلات الاختيارية دون أن يؤثر ذلك على تصفح الموقع أو إرسال النماذج.',
          ],
        },
        {
          heading: '3. إدارة الإعدادات من المتصفح',
          body: [
            'يمكنك مسح أو تعطيل ملفات الارتباط والتخزين المحلي في أي وقت عبر إعدادات الخصوصية في متصفحك.',
          ],
        },
      ],
    },
  },
  'digital-product-terms': {
    en: {
      title: 'Digital Product Terms',
      summary: 'Licensing scope, permitted usage, compatibility responsibilities, and manual order handling for MVP products.',
      effectiveNote: 'MVP Draft — Review commercial licensing clauses with legal counsel.',
      sections: [
        {
          heading: '1. MVP Manual Purchase & Delivery Process',
          body: [
            'During the NahroTech MVP phase, digital products listed in the Digital Store are requested through direct inquiry (WhatsApp or contact form). Availability, final pricing, payment method, and file delivery are confirmed directly before purchase completion.',
          ],
        },
        {
          heading: '2. Standard License Scope',
          body: [
            'Unless a broader multi-seat or commercial redistribution agreement is agreed in writing, each ready-made digital product is licensed for internal use by the purchasing individual or single organization.',
            'Reselling, redistributing, publishing, or sharing raw templates, dashboards, or guides as standalone products is prohibited.',
          ],
        },
        {
          heading: '3. Compatibility & Requirements',
          body: [
            'Each product listing states its software requirements (such as Microsoft Excel version or Power BI Desktop). Buyers should verify software compatibility prior to completing an order.',
          ],
        },
      ],
    },
    ar: {
      title: 'شروط المنتجات الرقمية',
      summary: 'نطاق الترخيص، والاستخدام المسموح، والتوافق التقني، وآلية الطلب اليدوية في النسخة الأولية.',
      effectiveNote: 'مسودة النسخة الأولية — يُنصح بمراجعة بنود التراخيص التجارية مع مستشار قانوني.',
      sections: [
        {
          heading: '1. آلية الطلب والتسليم في النسخة الأولية',
          body: [
            'تُطلب المنتجات الرقمية المعروضة في المتجر الرقمي عبر التواصل المباشر (واتساب أو نموذج التواصل)، حيث يتم تأكيد التفاصيل والسعر النهائي وطريقة السداد والتسليم قبل إتمام الشراء.',
          ],
        },
        {
          heading: '2. نطاق الترخيص القياسي',
          body: [
            'ما لم يُتفق كتابياً على ترخيص متعدد المقاعد أو توزيع موسع، يُمنح المشتري ترخيصاً للاستخدام الداخلي الفردي أو لمنشأة واحدة فقط.',
            'يُمنع إعادة بيع أو نشر أو توزيع القوالب أو لوحات البيانات أو الأدلة الرقمية كمنتجات مستقلة.',
          ],
        },
        {
          heading: '3. التوافق والمتطلبات',
          body: [
            'توضح كل بطاقة منتج متطلبات التشغيل اللازمة (مثل إصدار Microsoft Excel أو Power BI Desktop)، ويتحمل المشتري التحقق من توافق بيئته قبل إتمام الطلب.',
          ],
        },
      ],
    },
  },
  'refund-policy': {
    en: {
      title: 'Refund Policy',
      summary: 'Transparent eligibility rules and request steps for digital products and custom consulting or development services.',
      effectiveNote: 'MVP Draft — Subject to local consumer protection law review.',
      sections: [
        {
          heading: '1. Digital Products',
          body: [
            'Because digital files cannot be returned once delivered, completed digital product purchases are generally non-refundable after file delivery, except where a file is demonstrably defective, corrupted, or materially inconsistent with its listed description and cannot be resolved by support.',
          ],
        },
        {
          heading: '2. Custom Development & Consulting Services',
          body: [
            'Custom projects and consulting engagements are governed by the milestone and cancellation terms stated in the individual written proposal or service agreement.',
          ],
        },
        {
          heading: '3. How to Request a Review',
          body: [
            'If you experience an issue with a delivered product or service, contact NahroTech via our Contact page or business email with your order reference and description of the issue so we can inspect and resolve it fairly.',
          ],
        },
      ],
    },
    ar: {
      title: 'سياسة الاسترجاع',
      summary: 'ضوابط الأهلية وآلية طلب الاسترداد للمنتجات الرقمية ومشاريع التطوير والاستشارات.',
      effectiveNote: 'مسودة النسخة الأولية — تخضع لمراجعة أنظمة حماية المستهلك المحلية المعتمدة.',
      sections: [
        {
          heading: '1. المنتجات الرقمية',
          body: [
            'نظراً لطبيعة الملفات الرقمية القابلة للتنزيل، لا تُسترد قيمة المنتجات الرقمية بعد تسليم الملفات، باستثناء الحالات التي يثبت فيها وجود عطل تقني جوهري في الملف أو عدم تطابقه مع الوصف المعلن وتعذر معالجته عبر الدعم.',
          ],
        },
        {
          heading: '2. المشاريع المخصصة والاستشارات',
          body: [
            'تخضع مشاريع التطوير المخصصة وجلسات الاستشارة لبنود الدفعات والمراحل والإلغاء المحددة في عرض السعر أو اتفاقية العمل المعتمدة لكل عميل.',
          ],
        },
        {
          heading: '3. آلية رفع طلب مراجعة',
          body: [
            'في حال واجهت مشكلة في منتج أو خدمة، يمكنك مراسلتنا عبر صفحة التواصل أو البريد الإلكتروني المعتمد مع ذكر تفاصيل الطلب ليتم فحص الحالة ومعالجتها.',
          ],
        },
      ],
    },
  },
  disclaimer: {
    en: {
      title: 'Disclaimer',
      summary: 'Informational boundaries, concept demonstration labels, and external link notices.',
      effectiveNote: 'MVP Draft — Review limitation-of-liability clauses with legal counsel.',
      sections: [
        {
          heading: '1. General Information Only',
          body: [
            'Articles, guides, financial templates, and operational models published by NahroTech are provided for practical business productivity and educational guidance. They do not constitute formal legal, tax, audit, or regulated financial advice.',
          ],
        },
        {
          heading: '2. Concept Demonstrations & Showcase Materials',
          body: [
            'Where portfolio items or product previews represent internal concepts or architectural demonstrations, they are explicitly labeled as Concept Demonstrations and do not imply past client endorsements.',
          ],
        },
        {
          heading: '3. External Services',
          body: [
            'Links to third-party platforms (such as WhatsApp or external documentation) are provided for convenience. NahroTech is not responsible for the availability or privacy practices of external third-party platforms.',
          ],
        },
      ],
    },
    ar: {
      title: 'إخلاء المسؤولية',
      summary: 'حدود المحتوى التوعوي، وتوضيح النماذج التجريبية، والروابط الخارجية.',
      effectiveNote: 'مسودة النسخة الأولية — يُنصح بمراجعة بنود حدود المسؤولية مع مستشار قانوني.',
      sections: [
        {
          heading: '1. أغراض إرشادية وعملية',
          body: [
            'تُقدَّم المقالات والأدلة والقوالب المالية والنماذج التشغيلية لأغراض رفع الكفاءة العملية والتثقيف الإداري، ولا تُعد استشارة قانونية أو ضريبية أو تدقيقية أو مالية مرخصة.',
          ],
        },
        {
          heading: '2. النماذج والمشاريع التجريبية',
          body: [
            'أي نماذج أو عروض توضيحية في معرض الأعمال تُصنَّف بوضوح كنماذج ومفاهيم تطبيقية ولا تعني الادعاء بوجود عملاء أو شهادات غير حقيقية.',
          ],
        },
        {
          heading: '3. المنصات والروابط الخارجية',
          body: [
            'تُوفَّر الروابط نحو خدمات خارجية (مثل واتساب) لتسهيل التواصل، ولا تتحمل نحروتك مسؤولية سياسات الخصوصية أو توافر تلك المنصات الخارجية.',
          ],
        },
      ],
    },
  },
};
