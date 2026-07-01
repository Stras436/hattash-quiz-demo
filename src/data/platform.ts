export interface Lesson { id: string; title: string; description: string; duration: string; }
export interface Course { id: string; title: string; description: string; lessons: Lesson[]; accent: string; enrolled: boolean; }

export const preFoundationLessons: Lesson[] = [
  { id: 'signs-rule', title: 'قاعدة الإشارات', description: 'فهم إشارات الجمع والطرح والضرب والقسمة بخطوات بسيطة.', duration: '18 دقيقة' },
  { id: 'operations-order', title: 'ترتيب العمليات', description: 'تطبيق الأولويات داخل المسائل المركبة بثقة.', duration: '22 دقيقة' },
  { id: 'large-numbers', title: 'جمع وطرح الأعداد الكبيرة', description: 'طرق منظمة للحساب اليدوي وتقليل الأخطاء.', duration: '20 دقيقة' },
  { id: 'multiplication-division', title: 'الضرب والقسمة', description: 'مراجعة مهارات الضرب والقسمة الأساسية.', duration: '24 دقيقة' },
  { id: 'conversions', title: 'التحويلات', description: 'التحويل بين الوحدات والأشكال العددية الشائعة.', duration: '19 دقيقة' },
  { id: 'equations-identities', title: 'المعادلات والمتطابقات', description: 'تمييز المعادلة من المتطابقة وحل خطوات التبسيط.', duration: '26 دقيقة' },
  { id: 'lcm-gcd', title: 'المضاعف والقاسم المشترك', description: 'إيجاد م.م.أ وق.م.أ بطريقة عملية.', duration: '23 دقيقة' },
  { id: 'prime-factors', title: 'الأعداد والعوامل الأولية', description: 'تحليل الأعداد إلى عواملها الأولية واستخدامها.', duration: '21 دقيقة' },
];

export const courses: Course[] = [
  { id: 'pre-foundation', title: 'ما قبل التأسيس', description: 'مسار تمهيدي يبني أساسيات الحساب والمنطق الرياضي قبل الانطلاق في القدرات.', lessons: preFoundationLessons, accent: 'تمهيدي', enrolled: true },
  { id: 'quant-foundation', title: 'تأسيس القدرات الكمي', description: 'خطة منظمة لمهارات الكمي: النسب، المعادلات، الهندسة، والتحليل.', lessons: preFoundationLessons.slice(0, 6), accent: 'كمي', enrolled: true },
  { id: 'final-night', title: 'مراجعة الليلة النهائية', description: 'ملخصات مركزة وتدريبات سريعة قبل الاختبار لرفع الجاهزية.', lessons: preFoundationLessons.slice(0, 4), accent: 'مراجعة', enrolled: false },
];

export const testimonials = [
  { name: 'نورة', text: 'أخيرًا فهمت الأساسيات بدل حفظ الطرق فقط.' },
  { name: 'عبدالله', text: 'ترتيب الدروس والاختبارات ساعدني أعرف مستواي بسرعة.' },
  { name: 'سارة', text: 'واجهة عربية واضحة ومناسبة للمذاكرة من الجوال.' },
];
