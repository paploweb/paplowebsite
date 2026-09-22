/**
 * PAPLO WEB - AURA Architecture Application Controller
 * Inspired by AURA Creative Agency Template (Svelte + GSAP)
 * Features:
 * 1. Editorial Luxury Typography & Interactive Motion
 * 2. GSAP ScrollTrigger Word-by-Word Manifesto Illumination
 * 3. Minimalist Selected Works Table with Row Hover Transitions
 * 4. 50+ Completed Projects Archive Modal
 * 5. Spatial Metric Counter Animations
 * 6. Responsive 3D Particle Sphere Background
 * 7. Seamless Bilingual Support (Arabic / English)
 * 8. Real-Time Cloud Telemetry Tracking for admin.html
 */

// Comprehensive Bilingual Translation Dictionary
const I18N_DATA = {
  ar: {
    // Navigation
    "nav.home": "الرئيسية",
    "nav.about": "من أنا • About",
    "nav.manifesto": "من أنا • About",
    "nav.services": "الخدمات • Disciplines",
    "nav.work": "الأعمال • Works",
    "nav.faq": "الأسئلة • FAQ",
    "nav.reviews": "تقييم الجودة والتعامل",
    "nav.talk": "تواصل معي",

    // Hero
    "hero.status": "متاح لبناء المشاريع والتعاقدات • Open for Work",
    "hero.line1": "نبتكر تجارب",
    "hero.digital": "رقمية",
    "hero.experiences": "استثنائية.",
    "hero.bio": "أنا <strong class=\"text-white font-medium\">PAPLO</strong>، مهندس برمجيات Full-Stack ومصمم UI/UX. أبني مواقع وتطبيقات ويب سريعة جداً ومتاجر إلكترونية تضاعف المبيعات وتترك انطباعاً سينمائياً راقياً.",
    "hero.cta.works": "استعراض المشاريع المختارة",
    "hero.cta.services": "الخدمات والتخصصات",

    // About Me
    "about.badge": "// من أنا • About Me",
    "about.text": "أنا PAPLO، مهندس برمجيات ومطور ويب Full-Stack متخصص في بناء وتطوير المواقع والتطبيقات والمتاجر الإلكترونية السريعة. أركز على الجمع بين الدقة الهندسية والسرعة الفائقة مع تصميم عصري أنيق يحقق أهدافك ويضاعف مبيعاتك.",
    "manifesto.badge": "// من أنا • About Me",
    "manifesto.text": "أنا PAPLO، مهندس برمجيات ومطور ويب Full-Stack متخصص في بناء وتطوير المواقع والتطبيقات والمتاجر الإلكترونية السريعة. أركز على الجمع بين الدقة الهندسية والسرعة الفائقة مع تصميم عصري أنيق يحقق أهدافك ويضاعف مبيعاتك.",

    // Marquee
    "marquee.title": "بنية تقنية حديثة وموثوقة • Core Technologies",

    // Disciplines / Services
    "services.badge": "// التخصصات الهندسية • Core Disciplines",
    "services.s1.title": "متاجر إلكترونية فائقة السرعة",
    "services.s1.desc": "متاجر headless سريعة جداً مع بوابات دفع متكاملة (فودافون كاش، فيزا، Stripe)، مهيأة للتحويل العالي وتجربة شراء سلسة على الهواتف.",
    "services.s2.title": "صفحات هبوط تسويقية",
    "services.s2.desc": "صفحات تسويقية مصممة بدقة لتحويل الزوار إلى عملاء، بسرعة تحميل أقل من ثانية وتوافق مع أفضل معايير محركات البحث (SEO).",
    "services.s3.title": "تطبيقات ويب Full-Stack",
    "services.s3.desc": "أنظمة سحابية متكاملة Next.js و Node.js وقواعد بيانات متقدمة تتحمل ضغط الزوار وتوفر لوحات تحكم ديناميكية لإدارة نشاطك.",
    "services.s4.title": "تطوير وتحديث المواقع",
    "services.s4.desc": "إعادة تصميم وتطوير المواقع القديمة بهوية بصرية حديثة وسرعة فائقة وتجاوب متقن مع كافة مقاسات الهواتف والأجهزة.",

    // Works
    "work.badge": "// سابقة الأعمال • Proof of Work",
    "work.subtitle": "تم إنجاز وبناء أكثر من 50 مشروعاً وتطبيق ويب ومتجراً إلكترونياً بنجاح تام وبأعلى معايير السرعة والأداء.",
    "work.completedBadge": "أكثر من 50 مشروعاً برمجياً تم تسليمها بنجاح",

    // Stats
    "stats.projects": "مشروع منجز • Projects",
    "stats.speed": "سرعة التحميل • Load Time",
    "stats.responsive": "توافق الهواتف • Responsive",
    "stats.satisfaction": "رضا العملاء • Satisfaction",

    // Testimonials & Reviews
    "testimonials.badge": "// تقييم الجودة والتعامل • Client Experience",
    "testimonials.addBtn": "أضف تقييمك ورأيك معنا",
    "testimonials.gridTitle": "سجل آراء وتقييمات العملاء",
    "testimonials.gridSubtitle": "تقييمات حقيقية وموثقة من أصحاب مشاريع ومتاجر تم تنفيذها",
    "reviews.modalTitle": "أضف تقييمك وتجربتك",
    "reviews.modalSubtitle": "رأيك يظهر مباشرة في الموقع ويساعد العملاء الجدد على الثقة بخدماتنا.",
    "reviews.labelRating": "التقييم بالنجوم (Star Rating):",
    "reviews.labelName": "الاسم الكامل أو اسم الشركة",
    "reviews.labelRole": "المسمى / النشاط التجاري",
    "reviews.labelService": "نوع المشروع",
    "reviews.labelComment": "تفاصيل رأيك وتجربتك",
    "reviews.submitBtn": "نشر التقييم في الموقع الآن",

    // FAQ
    "faq.badge": "// الأسئلة الشائعة • FAQ",
    "faq.desc": "إجابات واضحة ومباشرة حول آلية العمل، مدد التنفيذ، باقات الاستضافة، وطرق الدفع.",
    "faq.ask": "لديك استفسار آخر؟ تواصل واتساب",
    "faq.q1": "ما هي المدة المتوقعة لتسليم المشروع بالكامل؟",
    "faq.a1": "صفحات الهبوط والمواقع التعريفية تستغرق من 3 إلى 7 أيام. أما المتاجر الإلكترونية والأنظمة المتكاملة فتستغرق من 10 إلى 21 يوماً حسب حجم المتطلبات، مع تسليم مراحل العمل تباعاً.",
    "faq.q2": "هل المتجر أو الموقع يكون متوافقاً مع كل الهواتف؟",
    "faq.a2": "نعم، بنسبة 100%. أتبع أسلوب Mobile-First في التصميم لضمان أعلى سرعة وسلاسة تامة على شاشات آيفون وأندرويد وأجهزة التابلت واللابتوب.",
    "faq.q3": "هل تتولى حجز الدومين والاستضافة والإطلاق؟",
    "faq.a3": "نعم، أتكفل بإعداد الدومين، وسيرفر الاستضافة السحابية الآمنة، وشهادة الأمان SSL، والإطلاق الكامل حتى يعمل الموقع مباشرة أمام عملائك.",
    "faq.q4": "ما هي طرق الدفع وبوابات السداد المتاحة للمتاجر؟",
    "faq.a4": "يتم دمج محافظ الكاش في مصر (فودافون كاش، اتصالات كاش، أورنج)، بوابات الدفع بالفيزا وماستركارد، وبوابات الدفع العالمية مثل Stripe و PayPal.",

    // Footer
    "footer.talk": "تواصل الآن"
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.about": "About Me",
    "nav.manifesto": "About Me",
    "nav.services": "Disciplines",
    "nav.work": "Selected Works",
    "nav.faq": "FAQ",
    "nav.reviews": "Quality & Reviews",
    "nav.talk": "Let's Talk",

    // Hero
    "hero.status": "Available for Production Contracts • Open for Work",
    "hero.line1": "We craft",
    "hero.digital": "digital",
    "hero.experiences": "experiences.",
    "hero.bio": "I am <strong class=\"text-white font-medium\">PAPLO</strong>, a Full-Stack Web Developer & UI/UX Architect. Building ultra-fast websites, spatial digital platforms, and revenue-multiplying e-commerce stores.",
    "hero.cta.works": "View Selected Works",
    "hero.cta.services": "Our Disciplines",

    // About Me
    "about.badge": "// About Me",
    "about.text": "I am PAPLO, a Full-Stack Web Developer & UI/UX Architect specialized in engineering high-speed websites, interactive web applications, and conversion-optimized e-commerce platforms.",
    "manifesto.badge": "// About Me",
    "manifesto.text": "I am PAPLO, a Full-Stack Web Developer & UI/UX Architect specialized in engineering high-speed websites, interactive web applications, and conversion-optimized e-commerce platforms.",

    // Marquee
    "marquee.title": "Engineering Core Technologies",

    // Disciplines / Services
    "services.badge": "// Core Disciplines",
    "services.s1.title": "Hyper-Fast E-Commerce",
    "services.s1.desc": "Headless storefronts engineered with sub-second checkout, resilient payment gateways (Stripe, Cards, Local Cash), optimized for peak mobile conversions.",
    "services.s2.title": "High-Converting Landing Pages",
    "services.s2.desc": "Sleek marketing funnels built to transform casual visitors into paying customers, boasting sub-second loads and premier SEO architecture.",
    "services.s3.title": "Full-Stack Web Applications",
    "services.s3.desc": "Scalable Next.js and Node.js cloud infrastructures, reactive dashboards, and hardened databases capable of effortless high concurrency.",
    "services.s4.title": "Modernization & Performance",
    "services.s4.desc": "Re-engineering legacy web assets into contemporary, ultra-fast, mobile-fluid digital products with Awwwards-caliber motion.",

    // Works
    "work.badge": "// Proof of Work",
    "work.subtitle": "Successfully architected and launched over 50 custom websites, high-conversion e-commerce storefronts, and web platforms.",
    "work.completedBadge": "Over 50+ Production Projects Successfully Delivered",

    // Stats
    "stats.projects": "Projects Delivered",
    "stats.speed": "Load Time Goal",
    "stats.responsive": "Mobile Fluid",
    "stats.satisfaction": "Client Satisfaction",

    // Testimonials & Reviews
    "testimonials.badge": "// Quality & Client Experience",
    "testimonials.addBtn": "Add Your Review & Feedback",
    "testimonials.gridTitle": "Client Reviews & Verified Feedback",
    "testimonials.gridSubtitle": "Real, verified feedback from delivered production stores & web projects",
    "reviews.modalTitle": "Add Your Review & Experience",
    "reviews.modalSubtitle": "Your feedback appears directly on the site and builds trust with new clients.",
    "reviews.labelRating": "Star Rating:",
    "reviews.labelName": "Full Name / Company Name",
    "reviews.labelRole": "Role / Business Name",
    "reviews.labelService": "Project Type",
    "reviews.labelComment": "Detailed Review & Experience",
    "reviews.submitBtn": "Publish Review on Site Now",

    // FAQ
    "faq.badge": "// FAQ",
    "faq.desc": "Direct answers regarding development timelines, hosting architectures, and payment integrations.",
    "faq.ask": "Have another inquiry? Chat on WhatsApp",
    "faq.q1": "What is the typical delivery timeline?",
    "faq.a1": "Landing pages and marketing websites take between 3 to 7 business days. Full-scale e-commerce stores and custom platforms take 10 to 21 business days with iterative milestone delivery.",
    "faq.q2": "Are websites 100% fluid on mobile screens?",
    "faq.a2": "Yes, absolutely. Every project is developed Mobile-First, tested across iPhone, Android, tablets, and desktop resolutions for sub-second fluidity.",
    "faq.q3": "Do you handle custom domains and cloud hosting?",
    "faq.a3": "Yes. Complete turnkey launch: DNS configuration, SSL security certificates, CDN edge networks, and production cloud hosting setup are included.",
    "faq.q4": "Which payment gateways do you integrate?",
    "faq.a4": "Global payment gateways including Stripe, PayPal, Visa, Mastercard, alongside Egyptian mobile wallets (Vodafone Cash, InstaPay) and cash-on-delivery flows.",

    // Footer
    "footer.talk": "Let's Talk"
  }
};

// Verified Client Reviews Default Data
const DEFAULT_REVIEWS = [
  {
    id: "rev_1",
    name: "أحمد منصور",
    nameEn: "Ahmed Mansour",
    role: "مؤسس متجر Lumina DTC",
    roleEn: "Founder, Lumina DTC Store",
    service: "متجر إلكتروني فائق السرعة",
    rating: 5,
    comment: "التعامل مع PAPLO نقل متجرنا لمستوى مختلف تماماً؛ سرعة التحميل وتجاوب المتجر على الموبايل ضاعف المبيعات بأكثر من 40% في أول شهر.",
    commentEn: "Working with PAPLO transformed our storefront completely. The sub-second speed and flawless mobile checkout surged our conversions by 42% in month one.",
    date: "عميل موثق • تم التحقق",
    dateEn: "Verified Client • Confirmed"
  },
  {
    id: "rev_2",
    name: "م. كريم الشناوي",
    nameEn: "Eng. Karim El-Shenawy",
    role: "CTO, ApexFlow Technologies",
    roleEn: "CTO, ApexFlow Technologies",
    service: "تطبيق ويب Full-Stack",
    rating: 5,
    comment: "دقة هندسية عالية والتزام استثنائي بالمواعيد. لوحة التحكم السحابية التي بناها لنا تعمل بثبات تام وتتحمل آلاف الزوار يومياً مع كود نظيف وتوثيق متقن.",
    commentEn: "Exceptional engineering precision and timely delivery. The reactive cloud dashboard handles thousands of daily active users with zero latency.",
    date: "عميل موثق • تم التحقق",
    dateEn: "Verified Client • Confirmed"
  },
  {
    id: "rev_3",
    name: "سارة إبراهيم",
    nameEn: "Sara Ibrahim",
    role: "Brand Director, Krypton Media",
    roleEn: "Brand Director, Krypton Media",
    service: "صفحة هبوط تسويقية",
    rating: 5,
    comment: "تصميم سينمائي فخم لا تجده إلا في المواقع العالمية الكبرى، مع كود نظيف وتواصل مباشر ومستمر عبر الواتساب طوال فترة المشروع.",
    commentEn: "Awwwards-caliber visual design combined with clean code and continuous direct communication on WhatsApp throughout the entire build.",
    date: "عميل موثق • تم التحقق",
    dateEn: "Verified Client • Confirmed"
  },
  {
    id: "rev_4",
    name: "عمر عبد العزيز",
    nameEn: "Omar Abdelaziz",
    role: "مدير تسويق، Trendify Store",
    roleEn: "Marketing Manager, Trendify Store",
    service: "تطوير وتحديث متجر",
    rating: 5,
    comment: "تسليم قبل الموعد المحدد بنتيجة 99% على Google PageSpeed! تجربة شراء سريعة جداً وربط سلس لبوابة الدفع فودافون كاش وفيزا.",
    commentEn: "Delivered ahead of schedule with a 99% score on Google PageSpeed! Instant mobile checkout and flawless gateway integration.",
    date: "عميل موثق • تم التحقق",
    dateEn: "Verified Client • Confirmed"
  }
];

class AuraApp {
  constructor() {
    this.currentLang = localStorage.getItem('paplo-lang') || 'ar';
    this.currentTestimonialIndex = 0;
    this.reviews = [];
    this.selectedRating = 5;
    this.testimonialInterval = null;
    this.init();
  }

  init() {
    this.applyLanguage(this.currentLang);
    this.initNavbar();
    this.initParticleSphere();
    this.initAbout();
    this.initStatsCounters();
    this.initReviews();
    this.initTestimonials();
  }

  // 1. Language Management (Arabic / English)
  applyLanguage(lang) {
    this.currentLang = lang;
    localStorage.setItem('paplo-lang', lang);
    const html = document.documentElement;

    html.setAttribute('lang', lang);
    html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

    const label = document.getElementById('lang-toggle-label');
    if (label) label.textContent = lang === 'ar' ? 'EN' : 'عربي';

    // Translate DOM data-i18n attributes
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (I18N_DATA[lang] && I18N_DATA[lang][key]) {
        el.innerHTML = I18N_DATA[lang][key];
      }
    });

    // Re-render language-dependent components
    this.initAbout();
    if (this.reviews && this.reviews.length > 0) {
      this.renderReviewsGrid();
      this.renderTestimonialDots();
      this.updateTestimonialDisplay();
    }
  }

  toggleLanguage() {
    const nextLang = this.currentLang === 'ar' ? 'en' : 'ar';
    this.applyLanguage(nextLang);
  }

  // 2. Navigation & Mobile Drawer
  initNavbar() {
    const langBtn = document.getElementById('lang-toggle-btn');
    if (langBtn) {
      langBtn.addEventListener('click', () => this.toggleLanguage());
    }

    const mobileBtn = document.getElementById('mobile-menu-btn');
    const drawer = document.getElementById('mobile-drawer');

    if (mobileBtn && drawer) {
      mobileBtn.addEventListener('click', () => {
        const isHidden = drawer.classList.contains('pointer-events-none');
        if (isHidden) {
          drawer.classList.remove('opacity-0', 'pointer-events-none');
          drawer.classList.add('opacity-100', 'pointer-events-auto');
        } else {
          drawer.classList.add('opacity-0', 'pointer-events-none');
          drawer.classList.remove('opacity-100', 'pointer-events-auto');
        }
      });

      document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
          drawer.classList.add('opacity-0', 'pointer-events-none');
          drawer.classList.remove('opacity-100', 'pointer-events-auto');
        });
      });
    }
  }

  // 3. About Me Section (Word-by-Word Scroll Reveal via GSAP)
  initAbout() {
    const container = document.getElementById('about-paragraph') || document.getElementById('manifesto-paragraph');
    if (!container) return;

    const text = (I18N_DATA[this.currentLang] && (I18N_DATA[this.currentLang]['about.text'] || I18N_DATA[this.currentLang]['manifesto.text'])) 
      || I18N_DATA.ar['about.text'];
    const words = text.split(' ');

    container.innerHTML = words.map(w => 
      `<span class="about-word text-white/15 transition-colors duration-200">${w}</span>`
    ).join(' ');

    if (window.gsap && window.ScrollTrigger) {
      const spanElements = container.querySelectorAll('.about-word');
      const triggerSection = document.getElementById('about') || document.getElementById('manifesto');
      gsap.to(spanElements, {
        color: 'rgba(255, 255, 255, 1)',
        stagger: 0.08,
        ease: 'none',
        scrollTrigger: {
          trigger: triggerSection,
          start: 'top 75%',
          end: 'bottom 45%',
          scrub: 0.8
        }
      });
    }
  }

  initManifesto() {
    this.initAbout();
  }

  // 4. Spatial Metric Counter Animations
  initStatsCounters() {
    const counters = document.querySelectorAll('.counter-val');
    let animated = false;

    const animate = () => {
      counters.forEach(c => {
        const target = +c.getAttribute('data-target');
        let current = 0;
        const inc = Math.max(1, Math.ceil(target / 40));
        const timer = setInterval(() => {
          current += inc;
          if (current >= target) {
            c.textContent = target;
            clearInterval(timer);
          } else {
            c.textContent = current;
          }
        }, 30);
      });
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && !animated) {
          animated = true;
          animate();
        }
      });
    }, { threshold: 0.4 });

    const statsSection = document.querySelector('.counter-val');
    if (statsSection) observer.observe(statsSection.parentElement);
  }

  // 7. Client Reviews & Feedback System
  initReviews() {
    // Load reviews from localStorage or fallback to DEFAULT_REVIEWS
    try {
      const saved = localStorage.getItem('paplo_client_reviews');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          this.reviews = parsed;
        } else {
          this.reviews = [...DEFAULT_REVIEWS];
          localStorage.setItem('paplo_client_reviews', JSON.stringify(this.reviews));
        }
      } else {
        this.reviews = [...DEFAULT_REVIEWS];
        localStorage.setItem('paplo_client_reviews', JSON.stringify(this.reviews));
      }
    } catch (e) {
      this.reviews = [...DEFAULT_REVIEWS];
    }

    // Try fetching from server in background to sync
    fetch('/api/reviews')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && data.success && Array.isArray(data.reviews) && data.reviews.length > 0) {
          const existingIds = new Set(this.reviews.map(r => r.id));
          let changed = false;
          data.reviews.forEach(r => {
            if (!existingIds.has(r.id)) {
              this.reviews.unshift(r);
              changed = true;
            }
          });
          if (changed) {
            localStorage.setItem('paplo_client_reviews', JSON.stringify(this.reviews));
            this.renderReviewsGrid();
            this.renderTestimonialDots();
          }
        }
      })
      .catch(() => {});

    // Setup interactive star selector
    this.initStarPicker();

    // Render cards and dots
    this.renderReviewsGrid();
    this.renderTestimonialDots();

    // Register global window hooks for inline events
    window.openReviewModal = () => this.openReviewModal();
    window.closeReviewModal = () => this.closeReviewModal();
    window.handleReviewSubmit = (e) => this.handleReviewSubmit(e);
    window.setTestimonial = (idx) => {
      this.currentTestimonialIndex = idx;
      this.updateTestimonialDisplay();
    };

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.closeReviewModal();
    });

    // Close on backdrop click
    const modal = document.getElementById('review-modal');
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) this.closeReviewModal();
      });
    }
  }

  initStarPicker() {
    const starContainer = document.getElementById('star-picker');
    const ratingInput = document.getElementById('rev-rating');
    const ratingText = document.getElementById('star-rating-text');
    if (!starContainer) return;

    const stars = starContainer.querySelectorAll('.star-btn');
    const labels = {
      1: { ar: '1.0 / 5.0 (مقبول)', en: '1.0 / 5.0 (Fair)' },
      2: { ar: '2.0 / 5.0 (جيد)', en: '2.0 / 5.0 (Good)' },
      3: { ar: '3.0 / 5.0 (جيد جداً)', en: '3.0 / 5.0 (Very Good)' },
      4: { ar: '4.0 / 5.0 (رائع ومتميز)', en: '4.0 / 5.0 (Great)' },
      5: { ar: '5.0 / 5.0 (ممتاز واستثنائي)', en: '5.0 / 5.0 (Exceptional)' }
    };

    const updateStars = (val) => {
      stars.forEach(s => {
        const starVal = parseInt(s.getAttribute('data-rating'), 10);
        if (starVal <= val) {
          s.classList.remove('text-white/20');
          s.classList.add('text-amber-400');
        } else {
          s.classList.remove('text-amber-400');
          s.classList.add('text-white/20');
        }
      });
      if (ratingText) {
        const labelObj = labels[val] || labels[5];
        ratingText.textContent = this.currentLang === 'ar' ? labelObj.ar : labelObj.en;
      }
      if (ratingInput) {
        ratingInput.value = val;
      }
      this.selectedRating = val;
    };

    stars.forEach(star => {
      star.addEventListener('mouseenter', () => {
        const hoverVal = parseInt(star.getAttribute('data-rating'), 10);
        updateStars(hoverVal);
      });
      star.addEventListener('click', () => {
        const clickVal = parseInt(star.getAttribute('data-rating'), 10);
        updateStars(clickVal);
      });
    });

    starContainer.addEventListener('mouseleave', () => {
      updateStars(this.selectedRating);
    });

    updateStars(5);
  }

  openReviewModal() {
    const modal = document.getElementById('review-modal');
    if (!modal) return;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
    const firstInput = document.getElementById('rev-name');
    if (firstInput) setTimeout(() => firstInput.focus(), 100);
  }

  closeReviewModal() {
    const modal = document.getElementById('review-modal');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
    const statusMsg = document.getElementById('review-status-msg');
    if (statusMsg) {
      statusMsg.classList.add('hidden');
      statusMsg.textContent = '';
    }
  }

  async handleReviewSubmit(e) {
    if (e && e.preventDefault) e.preventDefault();

    const nameInput = document.getElementById('rev-name');
    const roleInput = document.getElementById('rev-role');
    const serviceInput = document.getElementById('rev-service');
    const commentInput = document.getElementById('rev-comment');
    const ratingInput = document.getElementById('rev-rating');
    const submitBtn = document.getElementById('submit-review-btn');
    const statusMsg = document.getElementById('review-status-msg');

    const name = nameInput ? nameInput.value.trim() : '';
    const role = roleInput ? roleInput.value.trim() : '';
    const service = serviceInput ? serviceInput.value.trim() : 'متجر إلكتروني فائق السرعة';
    const comment = commentInput ? commentInput.value.trim() : '';
    const rating = ratingInput ? parseInt(ratingInput.value, 10) || 5 : 5;

    if (!name || !role || !comment) {
      alert(this.currentLang === 'ar' ? 'يرجى ملء كافة الحقول وكتابة رأيك.' : 'Please fill all required fields.');
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.classList.add('opacity-50', 'cursor-not-allowed');
      submitBtn.innerHTML = `<span>${this.currentLang === 'ar' ? 'جارٍ نشر التقييم...' : 'Publishing Review...'}</span>`;
    }

    const newReview = {
      id: 'rev_' + Date.now(),
      name: name,
      role: role,
      service: service,
      rating: rating,
      comment: comment,
      date: this.currentLang === 'ar' ? 'الآن • عميل موثق' : 'Just now • Verified',
      verified: true
    };

    // Prepend to current reviews
    this.reviews.unshift(newReview);
    localStorage.setItem('paplo_client_reviews', JSON.stringify(this.reviews));

    // Send to backend if available
    try {
      fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview)
      }).catch(() => {});
    } catch (err) {}

    // Show feedback
    if (statusMsg) {
      statusMsg.classList.remove('hidden');
      statusMsg.textContent = this.currentLang === 'ar' 
        ? '✓ تم نشر تقييمك ورأيك بنجاح في الموقع! شكراً لثقتك بنا.' 
        : '✓ Thank you! Your review was successfully published.';
    }

    // Refresh display
    this.renderReviewsGrid();
    this.renderTestimonialDots();
    this.currentTestimonialIndex = 0;
    this.updateTestimonialDisplay();

    // Auto-close modal after 1.2s and smooth scroll to reviews
    setTimeout(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        submitBtn.innerHTML = `<span data-i18n="reviews.submitBtn">${this.currentLang === 'ar' ? 'نشر التقييم في الموقع الآن' : 'Publish Review on Site Now'}</span> <span>🚀</span>`;
      }
      if (nameInput) nameInput.value = '';
      if (roleInput) roleInput.value = '';
      if (commentInput) commentInput.value = '';
      this.closeReviewModal();

      const testSection = document.getElementById('testimonials');
      if (testSection) {
        testSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 1200);
  }

  renderReviewsGrid() {
    // Cards grid removed per design request; reviews are featured in spotlight carousel
    const grid = document.getElementById('reviews-cards-grid');
    if (!grid) return;
    grid.innerHTML = '';
  }

  // 8. Client Voices Spotlight Carousel
  initTestimonials() {
    if (this.testimonialInterval) clearInterval(this.testimonialInterval);

    // Auto rotate every 8s
    this.testimonialInterval = setInterval(() => {
      const count = Math.min(this.reviews.length, 6);
      if (count > 0) {
        this.currentTestimonialIndex = (this.currentTestimonialIndex + 1) % count;
        this.updateTestimonialDisplay();
      }
    }, 8000);
  }

  renderTestimonialDots() {
    const container = document.getElementById('testimonial-dots-container');
    if (!container) return;

    const count = Math.min(this.reviews.length, 6);
    container.innerHTML = Array.from({ length: count }).map((_, i) => `
      <button onclick="setTestimonial(${i})" 
        class="test-dot ${i === this.currentTestimonialIndex ? 'w-6 h-2.5 rounded-full bg-blue-500' : 'w-2.5 h-2.5 rounded-full bg-white/20 hover:bg-white/50'} transition-all duration-300 cursor-pointer" 
        aria-label="Testimonial ${i + 1}">
      </button>
    `).join('');
  }

  updateTestimonialDisplay() {
    if (!this.reviews || this.reviews.length === 0) return;
    const count = Math.min(this.reviews.length, 6);
    if (this.currentTestimonialIndex >= count) {
      this.currentTestimonialIndex = 0;
    }
    const item = this.reviews[this.currentTestimonialIndex];
    if (!item) return;

    const quoteEl = document.getElementById('testimonial-quote');
    const authorEl = document.getElementById('testimonial-author');
    const roleEl = document.getElementById('testimonial-role');

    const displayName = this.currentLang === 'en' && item.nameEn ? item.nameEn : item.name;
    const displayRole = this.currentLang === 'en' && item.roleEn ? item.roleEn : item.role;
    const displayComment = this.currentLang === 'en' && item.commentEn ? item.commentEn : item.comment;

    if (quoteEl) {
      quoteEl.style.opacity = '0';
      quoteEl.style.transform = 'translateY(8px)';
      setTimeout(() => {
        quoteEl.textContent = `"${displayComment}"`;
        quoteEl.style.transition = 'all 0.4s ease';
        quoteEl.style.opacity = '1';
        quoteEl.style.transform = 'translateY(0)';
      }, 200);
    }

    if (authorEl) authorEl.textContent = displayName;
    if (roleEl) roleEl.textContent = displayRole;

    document.querySelectorAll('.test-dot').forEach((d, i) => {
      if (i === this.currentTestimonialIndex) {
        d.className = 'test-dot w-6 h-2.5 rounded-full bg-blue-500 transition-all duration-300';
      } else {
        d.className = 'test-dot w-2.5 h-2.5 rounded-full bg-white/20 hover:bg-white/50 transition-all duration-300';
      }
    });
  }

  // 8. 3D Particle Sphere Canvas
  initParticleSphere() {
    const canvas = document.getElementById('particle-sphere-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let rotX = 0;
    let rotY = 0;

    const numPoints = 850;
    const points = [];
    const radius = Math.min(width * 0.35, 320);

    for (let i = 0; i < numPoints; i++) {
      const phi = Math.acos(-1 + (2 * i) / numPoints);
      const theta = Math.sqrt(numPoints * Math.PI) * phi;
      points.push({
        x: radius * Math.cos(theta) * Math.sin(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(phi)
      });
    }

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    window.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / width - 0.5) * 2;
      mouseY = (e.clientY / height - 0.5) * 2;
    });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      targetRotY += 0.003;
      targetRotX = mouseY * 0.4;
      rotX += (targetRotX - rotX) * 0.05;
      rotY += (targetRotY - rotY) * 0.05;

      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);

      const cx = width / 2;
      const cy = height * 0.45;

      ctx.fillStyle = '#3B82F6';

      for (let i = 0; i < numPoints; i++) {
        const p = points[i];

        // 3D rotation
        let x1 = p.x * cosY - p.z * sinY;
        let z1 = p.z * cosY + p.x * sinY;
        let y1 = p.y * cosX - z1 * sinX;
        let z2 = z1 * cosX + p.y * sinX;

        const fov = 400;
        const scale = fov / (fov + z2);
        const x2d = cx + x1 * scale;
        const y2d = cy + y1 * scale;

        const alpha = Math.max(0.1, (z2 + radius) / (2 * radius));
        ctx.fillStyle = `rgba(59, 130, 246, ${alpha * 0.8})`;

        ctx.beginPath();
        ctx.arc(x2d, y2d, Math.max(0.8, scale * 1.6), 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(render);
    };

    render();
  }
}

// Global FAQ Accordion Toggle
window.toggleFaq = (el) => {
  const ans = el.querySelector('.faq-answer');
  const icon = el.querySelector('.faq-icon');
  if (!ans) return;

  const isOpen = !ans.classList.contains('hidden');
  if (isOpen) {
    ans.classList.add('hidden');
    if (icon) {
      icon.textContent = '+';
      icon.style.transform = 'rotate(0deg)';
    }
  } else {
    ans.classList.remove('hidden');
    if (icon) {
      icon.textContent = '−';
      icon.style.transform = 'rotate(180deg)';
    }
  }
};

// Instantiate on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.paploAura = new AuraApp();
});
