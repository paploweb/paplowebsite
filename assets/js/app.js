/**
 * PAPLO WEB - Clean, Modular Application Controller
 * Features:
 * 1. Dark & Light Theme Management (Persistent)
 * 2. Arabic & English Internationalization (Bilingual RTL/LTR)
 * 3. Featured Projects Showcase & Real-Time Filter
 * 4. Interactive Bilingual Developer Terminal & Typewriter
 * 5. Web Audio API Micro-Interactions
 * 6. Responsive Navigation & Accessible Modals
 */

// Comprehensive Bilingual Translation Dictionary
const I18N_DATA = {
  ar: {
    // Navigation
    "nav.home": "الرئيسية",
    "nav.services": "الخدمات",
    "nav.about": "نبذة عني",
    "nav.skills": "المهارات",
    "nav.projects": "المشاريع",
    "nav.plans": "باقات الاستضافة",
    "nav.contact": "تواصل معنا",
    "nav.resume": "السيرة الذاتية",

    // Hero
    "hero.status": "متاح للتعاقدات وبناء المشاريع الإنتاجية",
    "hero.title": "تطوير مواقع وتطبيقات ويب سريعة بتصميم احترافي",
    "hero.bio": "أنا <strong class=\"text-black dark:text-white font-bold\">PAPLO</strong>، أساعد أصحاب المشاريع والشركات في بناء متاجر إلكترونية ومواقع سريعة تضاعف المبيعات وتترك انطباعاً استثنائياً.",
    "hero.cta.primary": "تواصل عبر واتساب | Start a Project",
    "hero.cta.secondary": "باقات الاستضافة والأسعار 📦",
    "hero.metric.projects": "مشروع منجز",
    "hero.metric.responsive": "متوافق 100% مع الهواتف",
    "hero.metric.speed": "هدف سرعة التحميل",
    "hero.stack.title": "// التقنيات الأساسية:",
    "hero.stack.subtitle": "حديثة، فائقة السرعة، ومجهزة للإنتاج",

    // Services
    "services.badge": "02 // الخدمات المتخصصة",
    "services.title": "حلول برمجية متكاملة",
    "services.subtitle": "خدمات برمجية مصممة بأعلى معايير الجودة لزيادة المبيعات وتحقيق أهداف مشروعك.",
    "services.s1.title": "متاجر إلكترونية",
    "services.s1.desc": "متاجر إلكترونية سريعة وآمنة مع بوابات دفع متكاملة (فودافون كاش، فيزا، PayPal)، متوافقة 100% مع الهواتف ومصممة لرفع المبيعات.",
    "services.s2.title": "صفحات هبوط تسويقية",
    "services.s2.desc": "صفحات هبوط تسويقية مصممة بدقة لتحويل الزوار إلى عملاء فعليين، مع سرعة تحميل فورية وأفضل معايير SEO لمحركات البحث.",
    "services.s3.title": "تطبيقات ويب Full-Stack",
    "services.s3.desc": "تطبيقات ومنصات ويب متكاملة بواجهات عصرية وبنية خلفية قوية وقواعد بيانات آمنة تتحمل آلاف الزوار بكفاءة واستقرار تام.",
    "services.s4.title": "تحديث المواقع وتسريعها",
    "services.s4.desc": "تحديث المواقع القديمة بتصميم عصري راقٍ، وتسريع زمن التحميل إلى أقل من ثانية وتوافق مثالي مع كل مقاسات الشاشات.",

    // About
    "about.badge": "03 // نبذة عني",
    "about.title": "بناء منتجات رقمية بأعلى معايير الأداء",
    "about.subtitle": "التركيز على الكود النظيف، التصميم العصري، والنتائج القابلة للقياس لنمو مشروعك.",
    "about.profile.title": "هندسة برمجية بسرعة ودقة",
    "about.profile.p1": "أنا <strong class=\"text-black dark:text-white font-bold\">PAPLO</strong>، مهندس برمجيات Full-Stack ومصمم UI/UX. أقوم بإنشاء مواقع ومتاجر عصرية فائقة السرعة تساعد الشركات على بناء حضور رقمي قوي ومضاعفة مبيعاتها.",
    "about.profile.p2": "سواء كنت بحاجة لمتجر من الصفر، أو صفحة هبوط مبتكرة، أو نظام ويب متكامل مع الدومين والاستضافة، أتولى المشروع بالكامل حتى الإطلاق.",
    "about.card1.title": "واجهات مستخدم حديثة",
    "about.card1.desc": "React و Next.js و Tailwind CSS. واجهات مرنة وسلسة تظهر بأعلى أناقة على الهواتف والأجهزة اللوحية وأجهزة الكمبيوتر.",
    "about.card2.title": "بنية خلفية قوية",
    "about.card2.desc": "سيرفرات Node.js سريعة، قواعد بيانات منظمة، وأمان متكامل للتعامل مع حركة الزوار بدون أي توقف.",
    "about.card3.title": "تسليم متكامل من الألف للياء",
    "about.card3.desc": "من التصميم إلى حجز الدومين، شهادات SSL، وإعداد الاستضافة السحابية السريعة — موقعك جاهز للإطلاق خلال أيام.",

    // Skills
    "skills.badge": "04 // القدرات والمهارات",
    "skills.title": "الترسانة التقنية",
    "skills.subtitle": "خبرة عملية مثبتة من خلال تنفيذ وتسليم أكثر من 50 مشروع ويب للعملاء بمختلف المجالات.",

    // Projects
    "projects.badge": "05 // سابقة الأعمال: 50+ مشروعاً",
    "projects.title": "معرض المشاريع المنفذة",
    "projects.subtitle": "كود نظيف، سرعة استجابة فورية، وتوافق تام مع كافة المقاسات. كل مشروع يحل مشكلة حقيقية.",
    "projects.search": "ابحث باسم التقنية أو المشروع...",

    // Plans
    "plans.badge": "06 // حلول الاستضافة والنطاقات",
    "plans.title": "حلول الاستضافة وحجز النطاقات",
    "plans.subtitle": "باقتان مخصصتان لتشغيل وإطلاق مشروعك أونلاين بأعلى سرعة وأمان وبدون أي تعقيدات تقنية.",
    "plans.p1.badge": "★ الحل المتكامل • Domain & Host",
    "plans.p1.title": "Domain For U & Host",
    "plans.p1.sub": "حجز الدومين باسمك + استضافة سحابية فائقة السرعة",
    "plans.p1.desc": "نوفر لك كل ما يحتاجه مشروعك للظهور أونلاين فوراً؛ نقوم بحجز النطاق الرسمي باسم نشاطك المخصص (.com / .net)، مع إعداد وربط استضافة سحابية عالية الأداء بدون أي صداع تقني.",
    "plans.p2.badge": "⚡ استضافة فقط • Host Only",
    "plans.p2.title": "Host Only",
    "plans.p2.sub": "استضافة سريعة لموقعك مع ربط دومينك الحالي أو نطاق فرعي",
    "plans.p2.desc": "الخيار الأنسب إذا كنت تمتلك دومينك بالفعل وتريد نقله أو تشغيله على استضافة سريعة ومستقرة، أو ترغب في إطلاق مشروعك على نطاق فرعي مخصص (Subdomain) بكل مرونة.",
    "plans.cta": "للتفاصيل كلمنا علي الواتس",
    "plans.help.title": "مش متأكد أي باقة تختار لمشروعك؟",
    "plans.help.desc": "تواصل معنا وسنرشح لك الخيار الأنسب لحجم زوارك وطبيعة موقعك فوراً وبدون تردد.",
    "plans.help.btn": "استشارة سريعة عبر واتساب ↗",

    // Contact
    "contact.badge": "07 // تواصل مباشر",
    "contact.title": "لنبدأ العمل معاً",
    "contact.subtitle": "لديك فكرة مشروع؟ دعنا نحولها إلى واقع رقمي سريع وعصري وناجح.",
    "contact.direct.title": "التواصل المباشر",
    "contact.direct.desc": "سواء كنت بحاجة لمتجر جديد، صفحة هبوط، أو تطبيق ويب، أنا جاهز لتحويل متطلباتك إلى كود حقيقي يعمل بكفاءة.",
    "contact.speed.title": "سرعة الاستجابة",
    "contact.speed.val": "خلال 15 دقيقة",
    "contact.speed.desc": "جاهز للرد الفوري ومناقشة متطلبات مشروعك مباشرة عبر واتساب",
    "contact.hub.title": "تواصل مباشر وسريع عبر واتساب",
    "contact.hub.desc": "لا داعي لانتظار الرد على الإيميل أو تعبئة النماذج. تواصل مع PAPLO مباشرة على واتساب لبدء مناقشة مشروعك والحصول على استشارة فنية فورية وعرض سعر دقيق:",
    "contact.tile1.title": "متجر إلكتروني متكامل",
    "contact.tile1.desc": "منصة بيع سريعة مع بوابات دفع ولوحة تحكم",
    "contact.tile2.title": "صفحة هبوط تسويقية",
    "contact.tile2.desc": "Landing Page فائقة السرعة لزيادة المبيعات",
    "contact.tile3.title": "تطبيق ويب Full-Stack",
    "contact.tile3.desc": "نظام سحابي مخصص مع قواعد بيانات حديثة",
    "contact.tile4.title": "تجديد موقع وتسريعه",
    "contact.tile4.desc": "تحسين واجهة المستخدم ورفع تقييم Lighthouse",
    "contact.cta.main": "محادثة واتساب فورية | Chat on WhatsApp",
    "contact.direct.phone": "الرقم المباشر:"
  },

  en: {
    // Navigation
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.about": "About",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.plans": "Plans & Hosting",
    "nav.contact": "Contact",
    "nav.resume": "Resume",

    // Hero
    "hero.status": "AVAILABLE FOR NEW CONTRACTS & PRODUCTION BUILDS",
    "hero.title": "Engineering High-Performance Web Applications",
    "hero.bio": "I'm <strong class=\"text-black dark:text-white font-bold\">PAPLO</strong>, helping businesses and startups build fast e-commerce engines and modern web platforms that drive growth and conversions.",
    "hero.cta.primary": "Chat on WhatsApp | Start a Project",
    "hero.cta.secondary": "Hosting Plans & Pricing 📦",
    "hero.metric.projects": "Projects Delivered",
    "hero.metric.responsive": "Fluid Responsive",
    "hero.metric.speed": "Load Target",
    "hero.stack.title": "// CORE STACK:",
    "hero.stack.subtitle": "Modern, performant, enterprise-ready",

    // Services
    "services.badge": "02 // SPECIALIZED SERVICES",
    "services.title": "Engineered Web Solutions",
    "services.subtitle": "High-ROI digital products built with modern engineering standards, clean architecture, and blazing performance.",
    "services.s1.title": "E-Commerce Websites",
    "services.s1.desc": "Fast, secure online stores with automated payment gateways (Vodafone Cash, Visa, PayPal), 100% mobile-fluid checkout, and inventory sync.",
    "services.s2.title": "High-Converting Landing Pages",
    "services.s2.desc": "Precision-engineered landing pages built to maximize conversions, with sub-second paint times and 99+ Lighthouse SEO scores.",
    "services.s3.title": "Full-Stack Web Applications",
    "services.s3.desc": "Custom cloud platforms with robust Node.js backend APIs, relational databases, and secure authentication built to scale.",
    "services.s4.title": "Responsive Redesign & Speed",
    "services.s4.desc": "Upgrading legacy codebases into sleek, modern, sub-second interfaces that look stunning on phones, tablets, and desktops.",

    // About
    "about.badge": "03 // ABOUT ME",
    "about.title": "Crafting High-Performance Web Products",
    "about.subtitle": "Focused on clean architecture, modern design, and measurable business growth.",
    "about.profile.title": "Engineering with Speed & Precision",
    "about.profile.p1": "I'm <strong class=\"text-black dark:text-white font-bold\">PAPLO</strong>, a full-stack engineer and UI/UX designer. I create modern, fast websites and e-commerce stores that help businesses establish strong digital presence and turn visitors into paying customers.",
    "about.profile.p2": "Whether you need a custom store from scratch, a sleek marketing landing page, or a full-stack web application with hosting and domain setup, I handle the entire process from concept to production.",
    "about.card1.title": "Modern Frontend",
    "about.card1.desc": "React, Next.js, and Tailwind CSS. Responsive, fluid interfaces that look stunning on phones, tablets, and desktops.",
    "about.card2.title": "Robust Backend",
    "about.card2.desc": "Scalable Node.js APIs, clean database modeling, and fast server performance built to handle real traffic without downtime.",
    "about.card3.title": "End-to-End Delivery",
    "about.card3.desc": "From design to domain registration, secure SSL, and high-speed hosting deployment — ready to launch within days.",

    // Skills
    "skills.badge": "04 // CORE CAPABILITIES",
    "skills.title": "Technical Arsenal",
    "skills.subtitle": "Engineered through 50+ completed client implementations. Specialized in fast, accessible, and scalable systems.",

    // Projects
    "projects.badge": "05 // PROOF OF WORK: 50+ PROJECTS",
    "projects.title": "Featured Project Portfolio",
    "projects.subtitle": "Engineered with clean code, sub-second latency, and fluid responsiveness. Each build solves genuine business bottlenecks.",
    "projects.search": "Search by tech or title...",

    // Plans
    "plans.badge": "06 // HOSTING & DOMAIN SOLUTIONS",
    "plans.title": "Hosting & Domain Solutions",
    "plans.subtitle": "Two tailored packages to get your website online with maximum speed, security, and zero technical hassle.",
    "plans.p1.badge": "★ Full Solution • Domain & Host",
    "plans.p1.title": "Domain For U & Host",
    "plans.p1.sub": "Custom domain registration in your name + Ultra-fast Cloud Hosting",
    "plans.p1.desc": "Everything you need to launch online immediately: official domain registration (.com / .net) plus pre-configured high-performance cloud hosting with zero technical headache.",
    "plans.p2.badge": "⚡ Cloud Host Only",
    "plans.p2.title": "Host Only",
    "plans.p2.sub": "Fast hosting for your website with custom domain connection or subdomain",
    "plans.p2.desc": "The ideal choice if you already own your domain and want ultra-stable hosting, or want to launch on a dedicated fast subdomain.",
    "plans.cta": "Inquire on WhatsApp",
    "plans.help.title": "Not sure which plan suits your project?",
    "plans.help.desc": "Reach out directly and we will recommend the best plan for your traffic and website type right away.",
    "plans.help.btn": "Quick Consultation via WhatsApp ↗",

    // Contact
    "contact.badge": "07 // START A CONVERSATION",
    "contact.title": "Let’s Work Together",
    "contact.subtitle": "Have a project in mind? Let’s engineer something fast, modern, and scalable.",
    "contact.direct.title": "Direct Contacts",
    "contact.direct.desc": "Whether you need a brand-new e-commerce platform, an ultra-fast landing page, or a full-stack system rewrite, I'm ready to turn requirements into production code.",
    "contact.speed.title": "Response Speed",
    "contact.speed.val": "Under 15 Minutes",
    "contact.speed.desc": "Ready for instant replies and direct project discussions via WhatsApp",
    "contact.hub.title": "Direct & Instant WhatsApp Terminal",
    "contact.hub.desc": "No waiting for email replies or filling out long forms. Reach out directly to PAPLO on WhatsApp for an immediate technical consultation and precise quote:",
    "contact.tile1.title": "E-Commerce Storefront",
    "contact.tile1.desc": "Fast online store with payment gateways & dashboard",
    "contact.tile2.title": "High-Converting Landing Page",
    "contact.tile2.desc": "Ultra-fast landing page optimized for lead generation",
    "contact.tile3.title": "Full-Stack Web App",
    "contact.tile3.desc": "Custom cloud architecture with modern database systems",
    "contact.tile4.title": "Redesign & Performance",
    "contact.tile4.desc": "Modern UI overhaul and 99+ Lighthouse optimization",
    "contact.cta.main": "Chat on WhatsApp | Start a Project",
    "contact.direct.phone": "Direct Line:"
  }
};

class PortfolioApp {
  constructor() {
    this.currentTheme = localStorage.getItem('paplo-theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    this.currentLang = localStorage.getItem('paplo-lang') || 'ar';
    this.soundEnabled = localStorage.getItem('paplo-sound') === 'true';
    this.searchQuery = '';
    this.audioCtx = null;
    this.typewriterTimeout = null;

    this.init();
  }

  init() {
    this.initTheme();
    this.initI18n();
    this.initSoundEngine();
    this.initTypewriter();
    this.initProjects();
    this.initModals();
    this.initMobileMenu();
    this.initScrollReveal();
  }

  // 1. Dark & Light Theme Management
  initTheme() {
    this.applyTheme(this.currentTheme);

    const themeButtons = [
      document.getElementById('theme-toggle-btn'),
      document.getElementById('mobile-theme-toggle-btn')
    ];

    themeButtons.forEach(btn => {
      if (btn) {
        btn.addEventListener('click', () => {
          this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
          localStorage.setItem('paplo-theme', this.currentTheme);
          this.applyTheme(this.currentTheme);
          this.playSound('click');
        });
      }
    });
  }

  applyTheme(theme) {
    const isDark = theme === 'dark';
    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.setAttribute('data-theme', theme);

    // Update icons
    const icons = [
      document.getElementById('theme-toggle-icon'),
      document.getElementById('mobile-theme-toggle-icon')
    ];

    icons.forEach(icon => {
      if (!icon) return;
      if (isDark) {
        icon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />`;
      } else {
        icon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />`;
      }
    });
  }

  // 2. Arabic & English Internationalization
  initI18n() {
    this.applyLanguage(this.currentLang);

    const langButtons = [
      document.getElementById('lang-toggle-btn'),
      document.getElementById('mobile-lang-toggle-btn')
    ];

    langButtons.forEach(btn => {
      if (btn) {
        btn.addEventListener('click', () => {
          this.currentLang = this.currentLang === 'ar' ? 'en' : 'ar';
          localStorage.setItem('paplo-lang', this.currentLang);
          this.applyLanguage(this.currentLang);
          this.initTypewriter();
          this.initProjects();
          this.playSound('chirp');
        });
      }
    });
  }

  applyLanguage(lang) {
    const isAr = lang === 'ar';
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', isAr ? 'rtl' : 'ltr');

    const labels = [
      document.getElementById('lang-current-label'),
      document.getElementById('mobile-lang-current-label')
    ];

    labels.forEach(lbl => {
      if (lbl) lbl.textContent = isAr ? 'English' : 'عربي';
    });

    const dict = I18N_DATA[lang] || I18N_DATA.ar;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.innerHTML = dict[key];
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key]) {
        el.setAttribute('placeholder', dict[key]);
      }
    });
  }

  // 3. Web Audio Feedback
  initSoundEngine() {
    const soundToggle = document.getElementById('sound-toggle-btn');
    const soundIcon = document.getElementById('sound-icon');
    const soundLabel = document.getElementById('sound-label');

    const updateUI = () => {
      if (soundIcon && soundLabel) {
        if (this.soundEnabled) {
          soundIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />`;
          soundLabel.textContent = "Audio ON";
        } else {
          soundIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />`;
          soundLabel.textContent = "Audio Muted";
        }
      }
    };

    updateUI();

    if (soundToggle) {
      soundToggle.addEventListener('click', () => {
        this.soundEnabled = !this.soundEnabled;
        localStorage.setItem('paplo-sound', this.soundEnabled);
        updateUI();
        if (this.soundEnabled) this.playSound('chirp');
      });
    }
  }

  playSound(type = 'click') {
    if (!this.soundEnabled) return;
    try {
      if (!this.audioCtx) {
        const AudioClass = window.AudioContext || window.webkitAudioContext;
        if (AudioClass) this.audioCtx = new AudioClass();
      }
      if (this.audioCtx && this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
      if (!this.audioCtx) return;

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      const now = this.audioCtx.currentTime;

      if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.05);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'run') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === 'chirp') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(1200, now + 0.08);
        gain.gain.setValueAtTime(0.07, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      }
    } catch (e) {}
  }

  // 4. Bilingual Typewriter Station
  initTypewriter() {
    if (this.typewriterTimeout) clearTimeout(this.typewriterTimeout);

    const el = document.getElementById('hero-typewriter');
    const terminalEl = document.getElementById('terminal-typewriter-text');
    const replayBtn = document.getElementById('replay-typewriter-btn');

    if (!el && !terminalEl) return;

    const phrases = this.currentLang === 'ar' ? [
      "حيث تلتقي الهندسة البرمجية النظيفة بالسرعة الفائقة.",
      "أكثر من 50 مشروع ويب تم تنفيذه بدون أي تهاون في الجودة.",
      "تحويل الأفكار المعقدة إلى واقع رقمي سريع وقابل للتوسع.",
      "متاجر إلكترونية وصفحات هبوط تسويقية تضاعف المبيعات."
    ] : [
      "Where clean engineering meets sub-second performance.",
      "50+ Web Development Projects Delivered with Zero Compromise.",
      "Transforming Complex Ideas into Scalable Digital Realities.",
      "Modern Full-Stack Architecture & High-Converting Web Platforms."
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const pauseTime = 2200;

    const type = () => {
      const currentPhrase = phrases[phraseIndex];
      if (isDeleting) charIndex--;
      else charIndex++;

      const partial = currentPhrase.substring(0, charIndex);
      if (el) el.textContent = partial;
      if (terminalEl) terminalEl.textContent = partial;

      let speed = isDeleting ? 20 : 45;

      if (!isDeleting && charIndex === currentPhrase.length) {
        speed = pauseTime;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        speed = 350;
      }

      this.typewriterTimeout = setTimeout(type, speed);
    };

    type();

    if (replayBtn) {
      replayBtn.onclick = () => {
        if (this.typewriterTimeout) clearTimeout(this.typewriterTimeout);
        charIndex = 0;
        isDeleting = false;
        if (el) el.textContent = "";
        if (terminalEl) terminalEl.textContent = "";
        this.playSound('run');
        type();
      };
    }
  }

  // 5. Featured Projects Showcase
  initProjects() {
    const gridEl = document.getElementById('projects-grid');
    const searchInput = document.getElementById('project-search-input');
    const countBadge = document.getElementById('project-count-badge');

    if (!gridEl) return;

    const render = () => {
      const q = this.searchQuery.toLowerCase();
      const filtered = (typeof PROJECTS_DATA !== 'undefined' ? PROJECTS_DATA : []).filter(proj => {
        return !q ||
          proj.title.toLowerCase().includes(q) ||
          proj.tagline.toLowerCase().includes(q) ||
          proj.tags.some(t => t.toLowerCase().includes(q));
      });

      if (countBadge) {
        countBadge.textContent = this.currentLang === 'ar' ? `${filtered.length} مشاريع معروضة` : `${filtered.length} Projects Shown`;
      }

      gridEl.innerHTML = filtered.map(p => this.createProjectCard(p)).join('');

      document.querySelectorAll('.open-case-study-btn').forEach(btn => {
        btn.onclick = () => {
          this.openProjectModal(btn.getAttribute('data-id'));
          this.playSound('click');
        };
      });
    };

    if (searchInput) {
      searchInput.oninput = (e) => {
        this.searchQuery = e.target.value.trim();
        render();
      };
    }

    render();
  }

  createProjectCard(p) {
    const isAr = this.currentLang === 'ar';
    return `
      <div class="bg-white dark:bg-[#121215] rounded-2xl overflow-hidden flex flex-col group border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-xl hover:border-black dark:hover:border-neutral-400 transition-all duration-300">
        <!-- Showcase Image -->
        <div class="relative h-56 bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
          <img src="${p.image}" alt="${p.title}" class="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-500">
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent"></div>

          <!-- Top Status Bar -->
          <div class="absolute top-3 left-3 right-3 z-10 flex justify-between items-center text-white text-xs font-mono">
            <div class="flex items-center gap-1.5 bg-black/75 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span class="text-[11px] font-semibold">${isAr ? 'مباشر بالإنتاج' : 'Production Live'}</span>
            </div>
            <span class="bg-white text-black dark:bg-neutral-200 text-[10px] font-mono px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">${p.categoryLabel}</span>
          </div>

          <!-- Bottom Metric Bar -->
          <div class="absolute bottom-2.5 left-3 right-3 z-10 flex items-center justify-between text-[11px] text-white font-mono bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/15">
            <span class="truncate max-w-[170px] font-medium">${p.metrics[0] || '⚡ Sub-second Latency'}</span>
            <span class="text-emerald-300 font-semibold flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> 100% Fluid
            </span>
          </div>
        </div>

        <!-- Card Body -->
        <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
          <div>
            <h3 class="text-lg font-bold text-neutral-900 dark:text-white group-hover:text-black dark:group-hover:text-neutral-200 transition-colors line-clamp-1">${p.title}</h3>
            <p class="text-sm text-neutral-600 dark:text-neutral-400 mt-2 line-clamp-2 leading-relaxed">${p.tagline}</p>

            <div class="grid grid-cols-2 gap-2 mt-4">
              ${p.metrics.slice(0, 2).map(m => `
                <div class="text-[11px] font-mono bg-neutral-50 dark:bg-[#18181B] border border-neutral-200 dark:border-neutral-800 px-2.5 py-1.5 rounded-lg text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
                  <span>${m}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Tags & Action -->
          <div class="pt-2 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between">
            <div class="flex flex-wrap gap-1.5">
              ${p.tags.slice(0, 3).map(t => `
                <span class="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700">${t}</span>
              `).join('')}
            </div>
            <button data-id="${p.id}" class="open-case-study-btn text-xs font-mono font-bold text-black dark:text-white hover:underline">
              ${isAr ? 'تفاصيل ↗' : 'Details ↗'}
            </button>
          </div>
        </div>
      </div>
    `;
  }

  openProjectModal(id) {
    const proj = (typeof PROJECTS_DATA !== 'undefined' ? PROJECTS_DATA : []).find(p => p.id === id);
    if (!proj) return;

    const modal = document.getElementById('project-detail-modal');
    const content = document.getElementById('project-modal-content');
    if (!modal || !content) return;

    const isAr = this.currentLang === 'ar';

    content.innerHTML = `
      <div class="space-y-6">
        <div class="w-full h-56 sm:h-64 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800">
          <img src="${proj.image}" alt="${proj.title}" class="w-full h-full object-cover object-top">
        </div>

        <div class="flex items-start justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4">
          <div>
            <div class="flex items-center gap-2 mb-1.5">
              <span class="text-xs font-mono uppercase px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white border border-neutral-300 dark:border-neutral-700 font-bold">${proj.categoryLabel}</span>
              <span class="text-xs font-mono text-emerald-700 dark:text-emerald-400 font-semibold">✓ Production Verified</span>
            </div>
            <h2 class="text-2xl font-bold text-neutral-900 dark:text-white">${proj.title}</h2>
            <p class="text-sm text-neutral-600 dark:text-neutral-400 mt-1">${proj.tagline}</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-4 rounded-xl bg-neutral-50 dark:bg-[#18181B] border border-neutral-200 dark:border-neutral-800">
            <h4 class="text-sm font-bold text-neutral-900 dark:text-white mb-1">
              ${isAr ? 'المشكلة والتحدي' : 'The Challenge'}
            </h4>
            <p class="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">${proj.problem}</p>
          </div>

          <div class="p-4 rounded-xl bg-neutral-50 dark:bg-[#18181B] border border-neutral-200 dark:border-neutral-800">
            <h4 class="text-sm font-bold text-neutral-900 dark:text-white mb-1">
              ${isAr ? 'الحل البرمجي المنفذ' : 'Engineering Solution'}
            </h4>
            <p class="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">${proj.solution}</p>
          </div>
        </div>

        <div>
          <h4 class="text-xs font-mono uppercase tracking-wider text-neutral-500 mb-2.5">${isAr ? 'أهم مؤشرات الأداء' : 'Key Performance Metrics'}</h4>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            ${proj.metrics.map(m => `
              <div class="p-3 rounded-xl bg-neutral-50 dark:bg-[#18181B] border border-neutral-200 dark:border-neutral-800 text-center">
                <div class="text-xs font-mono font-bold text-neutral-900 dark:text-white">${m}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-3">
          <div class="text-xs font-mono text-neutral-600 dark:text-neutral-400">
            &lt;/&gt; PAPLO WEB
          </div>
          <a href="${proj.liveUrl}" target="_blank" rel="noopener noreferrer" class="px-6 py-2.5 rounded-full bg-black hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-black text-xs font-bold transition shadow-sm flex items-center gap-1.5">
            <span>${isAr ? 'فتح المشروع المباشر' : 'Open Live Project'}</span>
            <span>↗</span>
          </a>
        </div>
      </div>
    `;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }

  // 6. Modal System & Printable CV
  initModals() {
    const projectModal = document.getElementById('project-detail-modal');
    const resumeModal = document.getElementById('resume-modal');
    const closeButtons = document.querySelectorAll('.close-modal-btn');
    const resumeTriggers = document.querySelectorAll('.open-resume-btn');
    const printResumeBtn = document.getElementById('print-resume-btn');

    const closeModal = () => {
      if (projectModal) {
        projectModal.classList.add('hidden');
        projectModal.classList.remove('flex');
      }
      if (resumeModal) {
        resumeModal.classList.add('hidden');
        resumeModal.classList.remove('flex');
      }
      document.body.style.overflow = '';
      this.playSound('click');
    };

    closeButtons.forEach(btn => btn.onclick = closeModal);

    [projectModal, resumeModal].forEach(m => {
      if (m) {
        m.onclick = (e) => {
          if (e.target === m) closeModal();
        };
      }
    });

    resumeTriggers.forEach(btn => {
      btn.onclick = () => {
        if (resumeModal) {
          resumeModal.classList.remove('hidden');
          resumeModal.classList.add('flex');
          document.body.style.overflow = 'hidden';
          this.playSound('click');
        }
      };
    });

    if (printResumeBtn) {
      printResumeBtn.onclick = () => window.print();
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
  }

  // 7. Responsive Navigation & Mobile Menu Drawer
  initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const menuDrawer = document.getElementById('mobile-menu-drawer');
    const closeBtn = document.getElementById('mobile-menu-close');
    const links = document.querySelectorAll('.mobile-nav-link');

    if (!menuBtn || !menuDrawer) return;

    const openMenu = () => {
      menuDrawer.classList.remove('translate-x-full');
      document.body.style.overflow = 'hidden';
      this.playSound('click');
    };

    const closeMenu = () => {
      menuDrawer.classList.add('translate-x-full');
      document.body.style.overflow = '';
      this.playSound('click');
    };

    menuBtn.onclick = openMenu;
    if (closeBtn) closeBtn.onclick = closeMenu;
    links.forEach(l => l.onclick = closeMenu);
  }

  // 8. Viewport Scroll Spy
  initScrollReveal() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.desktop-nav-link');

    window.addEventListener('scroll', () => {
      const scrollY = window.pageYOffset;
      sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 120;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('text-black', 'dark:text-white', 'font-bold');
              link.classList.remove('text-neutral-600', 'dark:text-neutral-400');
            } else {
              link.classList.remove('text-black', 'dark:text-white', 'font-bold');
              link.classList.add('text-neutral-600', 'dark:text-neutral-400');
            }
          });
        }
      });
    });
  }
}

// Instantiate on DOM Load
document.addEventListener('DOMContentLoaded', () => {
  window.paploApp = new PortfolioApp();
});
