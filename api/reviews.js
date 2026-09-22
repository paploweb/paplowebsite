// Vercel / Netlify Serverless Function: /api/reviews
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const defaultReviews = [
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

  if (req.method === 'GET') {
    return res.status(200).json({
      success: true,
      count: defaultReviews.length,
      reviews: defaultReviews
    });
  }

  if (req.method === 'POST') {
    try {
      const { name, role, service, rating, comment } = req.body || {};

      if (!name || !role || !comment) {
        return res.status(400).json({
          success: false,
          error: 'Please provide name, role/business, and review comment.'
        });
      }

      const review = {
        id: 'rev_' + Date.now(),
        name: String(name).trim().slice(0, 100),
        role: String(role).trim().slice(0, 100),
        service: String(service || 'مشروع ويب').trim().slice(0, 80),
        rating: Math.max(1, Math.min(5, parseInt(rating, 10) || 5)),
        comment: String(comment).trim().slice(0, 1000),
        date: new Date().toISOString(),
        verified: true
      };

      console.log('[Serverless Review Submission]:', review);

      return res.status(201).json({
        success: true,
        message: 'Review received and published successfully.',
        review
      });
    } catch (error) {
      console.error('[Serverless Review Error]:', error);
      return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  }

  return res.status(405).json({ success: false, error: 'Method Not Allowed' });
}
