/**
 * PAPLO WEB - Production REST API & Backend Server
 * Zero-dependency standalone Node.js server (Runs with pure Node.js)
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

// Load .env file if present (Zero external dependencies)
const envFile = path.join(__dirname, '.env');
if (fs.existsSync(envFile)) {
  const envContent = fs.readFileSync(envFile, 'utf8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[1];
      let value = match[2] || '';
      value = value.trim().replace(/^['"](.*)['"]$/, '$1');
      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  });
}

const PORT = process.env.PORT || 3000;
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'paplo2026';
const DATA_DIR = path.join(__dirname, 'data');
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');
const ANALYTICS_FILE = path.join(DATA_DIR, 'analytics.json');
const REVIEWS_FILE = path.join(DATA_DIR, 'reviews.json');

// Ensure data storage directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(INQUIRIES_FILE)) {
  fs.writeFileSync(INQUIRIES_FILE, JSON.stringify([], null, 2));
}
if (!fs.existsSync(ANALYTICS_FILE)) {
  fs.writeFileSync(ANALYTICS_FILE, JSON.stringify({
    totalViews: 0,
    uniqueVisitors: 0,
    visitors: {},
    history: [],
    daily: {}
  }, null, 2));
}
if (!fs.existsSync(REVIEWS_FILE)) {
  const initialReviews = [
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
  fs.writeFileSync(REVIEWS_FILE, JSON.stringify(initialReviews, null, 2));
}

// User-Agent analyzer (Zero dependency)
function parseUserAgent(ua) {
  ua = ua || '';
  let device = 'Desktop';
  if (/mobile/i.test(ua)) device = 'Mobile';
  else if (/tablet|ipad/i.test(ua)) device = 'Tablet';

  let os = 'Unknown OS';
  if (/windows/i.test(ua)) os = 'Windows';
  else if (/macintosh|mac os/i.test(ua)) os = 'macOS';
  else if (/android/i.test(ua)) os = 'Android';
  else if (/iphone|ipad|ipod/i.test(ua)) os = 'iOS';
  else if (/linux/i.test(ua)) os = 'Linux';

  let browser = 'Unknown';
  if (/edg\//i.test(ua)) browser = 'Edge';
  else if (/chrome|crios/i.test(ua)) browser = 'Chrome';
  else if (/firefox|fxios/i.test(ua)) browser = 'Firefox';
  else if (/safari/i.test(ua) && !/chrome/i.test(ua)) browser = 'Safari';
  else if (/opera|opr/i.test(ua)) browser = 'Opera';

  return { device, os, browser };
}

// Admin Authentication Verifier
function checkAdminAuth(req, url) {
  const authHeader = req.headers['authorization'];
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7).trim();
    if (token === ADMIN_SECRET) return true;
  }
  const queryToken = url.searchParams.get('token');
  if (queryToken && queryToken.trim() === ADMIN_SECRET) {
    return true;
  }
  return false;
}

// Safe Analytics File Reader & Writer
function readAnalytics() {
  try {
    const raw = fs.readFileSync(ANALYTICS_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    return { totalViews: 0, uniqueVisitors: 0, visitors: {}, history: [], daily: {} };
  }
}

function saveAnalytics(data) {
  try {
    fs.writeFileSync(ANALYTICS_FILE, JSON.stringify(data, null, 2));
  } catch (e) {
    console.error('[Analytics] Error writing to file:', e);
  }
}

// MIME types dictionary for static file serving
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8'
};

// Helper: Read request body as JSON
function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
      if (body.length > 1e6) {
        req.connection.destroy();
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

// Helper: Send JSON response
function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'X-Powered-By': 'PAPLO-WEB-BACKEND'
  });
  res.end(JSON.stringify(data, null, 2));
}

// Helper: Serve Static File
function serveStaticFile(req, res, filePath) {
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Fallback to index.html for Single Page Applications (SPA)
      const indexPath = path.join(__dirname, 'index.html');
      fs.readFile(indexPath, (indexErr, content) => {
        if (indexErr) {
          sendJson(res, 404, { error: 'File Not Found' });
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(content);
        }
      });
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=86400',
      'X-Content-Type-Options': 'nosniff'
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
}

// Create HTTP Server
const server = http.createServer(async (req, res) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = url.pathname;

  // ---------------------------------------------------------------------------
  // REST API ROUTES
  // ---------------------------------------------------------------------------

  // GET /api/health - Server health check
  if (pathname === '/api/health' && req.method === 'GET') {
    return sendJson(res, 200, {
      status: 'healthy',
      service: 'PAPLO WEB API',
      version: '1.0.0',
      uptimeSeconds: Math.floor(process.uptime()),
      timestamp: new Date().toISOString()
    });
  }

  // GET /api/reviews - Retrieve client reviews
  if (pathname === '/api/reviews' && req.method === 'GET') {
    try {
      let reviews = [];
      if (fs.existsSync(REVIEWS_FILE)) {
        reviews = JSON.parse(fs.readFileSync(REVIEWS_FILE, 'utf8'));
      }
      return sendJson(res, 200, { success: true, count: reviews.length, reviews });
    } catch (err) {
      return sendJson(res, 500, { success: false, error: 'Failed to read reviews' });
    }
  }

  // POST /api/reviews - Submit client review
  if (pathname === '/api/reviews' && req.method === 'POST') {
    try {
      const data = await parseJsonBody(req);
      const { name, role, service, rating, comment } = data;

      if (!name || !role || !comment) {
        return sendJson(res, 400, {
          success: false,
          error: 'Please provide name, role/business, and review comment.'
        });
      }

      // Basic sanitization
      const cleanName = String(name).trim().slice(0, 100);
      const cleanRole = String(role).trim().slice(0, 100);
      const cleanService = String(service || 'مشروع ويب').trim().slice(0, 80);
      const cleanComment = String(comment).trim().slice(0, 1000);
      const parsedRating = Math.max(1, Math.min(5, parseInt(rating, 10) || 5));

      const review = {
        id: 'rev_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
        name: cleanName,
        role: cleanRole,
        service: cleanService,
        rating: parsedRating,
        comment: cleanComment,
        date: new Date().toISOString(),
        verified: true
      };

      let reviews = [];
      if (fs.existsSync(REVIEWS_FILE)) {
        try {
          reviews = JSON.parse(fs.readFileSync(REVIEWS_FILE, 'utf8'));
        } catch (e) {
          reviews = [];
        }
      }

      reviews.unshift(review);
      fs.writeFileSync(REVIEWS_FILE, JSON.stringify(reviews, null, 2));

      return sendJson(res, 201, {
        success: true,
        message: 'Review published successfully!',
        review
      });
    } catch (err) {
      return sendJson(res, 500, { success: false, error: 'Failed to submit review' });
    }
  }

  // POST /api/contact - Submit client inquiry
  if (pathname === '/api/contact' && req.method === 'POST') {
    try {
      const data = await parseJsonBody(req);
      const { name, email, phone, projectType, message } = data;

      if (!name || (!email && !phone)) {
        return sendJson(res, 400, {
          success: false,
          error: 'Please provide at least a name and contact info (email or phone).'
        });
      }

      const inquiry = {
        id: 'inq_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
        name: String(name).trim(),
        email: email ? String(email).trim() : null,
        phone: phone ? String(phone).trim() : null,
        projectType: projectType || 'General Inquiry',
        message: message ? String(message).trim() : '',
        createdAt: new Date().toISOString(),
        status: 'new'
      };

      // Read current inquiries
      let inquiries = [];
      try {
        const fileData = fs.readFileSync(INQUIRIES_FILE, 'utf8');
        inquiries = JSON.parse(fileData);
      } catch (e) {
        inquiries = [];
      }

      inquiries.unshift(inquiry);
      fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2));

      console.log(`[API] New Inquiry received from ${inquiry.name} (${inquiry.email || inquiry.phone})`);

      return sendJson(res, 201, {
        success: true,
        message: 'Your inquiry has been successfully received by PAPLO WEB.',
        inquiryId: inquiry.id,
        whatsappDirectUrl: `https://wa.me/201278111833?text=${encodeURIComponent(`Hi PAPLO, my name is ${inquiry.name}. I sent an inquiry regarding ${inquiry.projectType}.`)}`
      });
    } catch (err) {
      console.error('[API] Error handling contact form:', err);
      return sendJson(res, 500, {
        success: false,
        error: 'Server internal error while processing inquiry.'
      });
    }
  }

  // POST /api/track - Lightweight visitor tracking (Runs silently in background)
  if (pathname === '/api/track' && req.method === 'POST') {
    try {
      const data = await parseJsonBody(req);
      const { visitorId, path: pagePath, referrer, screen, language } = data;

      if (!visitorId) {
        return sendJson(res, 400, { success: false, error: 'visitorId is required' });
      }

      const clientIp = (req.headers['x-forwarded-for']
        ? req.headers['x-forwarded-for'].split(',')[0].trim()
        : (req.socket.remoteAddress || '127.0.0.1')).replace(/^::ffff:/, '');

      const userAgent = req.headers['user-agent'] || '';
      const { device, os, browser } = parseUserAgent(userAgent);

      const analytics = readAnalytics();
      const now = new Date();
      const today = now.toISOString().split('T')[0];

      analytics.totalViews = (analytics.totalViews || 0) + 1;

      if (!analytics.visitors) analytics.visitors = {};
      const isNewVisitor = !analytics.visitors[visitorId];

      if (isNewVisitor) {
        analytics.uniqueVisitors = (analytics.uniqueVisitors || 0) + 1;
        analytics.visitors[visitorId] = {
          firstVisit: now.toISOString(),
          lastVisit: now.toISOString(),
          visitsCount: 1,
          ip: clientIp,
          device,
          os,
          browser,
          screen: screen || 'Unknown'
        };
      } else {
        analytics.visitors[visitorId].lastVisit = now.toISOString();
        analytics.visitors[visitorId].visitsCount = (analytics.visitors[visitorId].visitsCount || 1) + 1;
      }

      // Daily analytics aggregation
      if (!analytics.daily) analytics.daily = {};
      if (!analytics.daily[today]) {
        analytics.daily[today] = { views: 0, uniques: 0 };
      }
      analytics.daily[today].views += 1;
      if (isNewVisitor) {
        analytics.daily[today].uniques += 1;
      }

      // Keep recent 300 entries in memory / file log
      if (!analytics.history) analytics.history = [];
      analytics.history.unshift({
        id: 'v_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
        visitorId,
        timestamp: now.toISOString(),
        path: pagePath || '/',
        referrer: referrer || 'Direct',
        ip: clientIp,
        device,
        os,
        browser,
        screen: screen || 'Unknown',
        language: language || 'en',
        isNew: isNewVisitor
      });

      if (analytics.history.length > 300) {
        analytics.history = analytics.history.slice(0, 300);
      }

      saveAnalytics(analytics);

      console.log(`[Analytics] 👁️ Visit from ${clientIp} (${device} / ${browser} on ${os}) | Total: ${analytics.totalViews} | Unique: ${analytics.uniqueVisitors}`);

      return sendJson(res, 200, { success: true });
    } catch (err) {
      console.error('[Analytics] Error tracking visit:', err);
      return sendJson(res, 500, { success: false, error: 'Tracking error' });
    }
  }

  // GET /api/analytics - Private analytics summary (Strictly Protected for PAPLO)
  if (pathname === '/api/analytics' && req.method === 'GET') {
    if (!checkAdminAuth(req, url)) {
      return sendJson(res, 401, {
        success: false,
        error: 'Unauthorized: Access restricted to PAPLO admin only. Provide valid admin token.'
      });
    }

    try {
      const analytics = readAnalytics();
      const today = new Date().toISOString().split('T')[0];
      const todayStats = (analytics.daily && analytics.daily[today]) || { views: 0, uniques: 0 };

      // Inquiries count
      let inquiriesCount = 0;
      let recentInquiries = [];
      try {
        const inqData = JSON.parse(fs.readFileSync(INQUIRIES_FILE, 'utf8'));
        inquiriesCount = inqData.length;
        recentInquiries = inqData.slice(0, 20);
      } catch (e) {}

      // Calculate device & browser breakdown
      const devices = {};
      const browsers = {};
      const oses = {};

      (analytics.history || []).forEach(h => {
        devices[h.device] = (devices[h.device] || 0) + 1;
        browsers[h.browser] = (browsers[h.browser] || 0) + 1;
        oses[h.os] = (oses[h.os] || 0) + 1;
      });

      return sendJson(res, 200, {
        success: true,
        summary: {
          totalViews: analytics.totalViews || 0,
          uniqueVisitors: analytics.uniqueVisitors || 0,
          todayViews: todayStats.views,
          todayUniques: todayStats.uniques,
          inquiriesCount
        },
        devices,
        browsers,
        oses,
        daily: analytics.daily || {},
        recentVisits: (analytics.history || []).slice(0, 50),
        inquiries: recentInquiries
      });
    } catch (err) {
      return sendJson(res, 500, { success: false, error: 'Error reading analytics.' });
    }
  }

  // POST /api/admin/reset - Reset analytics data (Strictly Protected)
  if (pathname === '/api/admin/reset' && req.method === 'POST') {
    if (!checkAdminAuth(req, url)) {
      return sendJson(res, 401, { success: false, error: 'Unauthorized.' });
    }

    const fresh = { totalViews: 0, uniqueVisitors: 0, visitors: {}, history: [], daily: {} };
    saveAnalytics(fresh);
    return sendJson(res, 200, { success: true, message: 'Analytics reset successfully.' });
  }

  // GET /api/inquiries - List inquiries (Strictly Protected for PAPLO)
  if (pathname === '/api/inquiries' && req.method === 'GET') {
    if (!checkAdminAuth(req, url)) {
      return sendJson(res, 401, {
        success: false,
        error: 'Unauthorized: Access restricted to PAPLO admin only. Provide valid admin token.'
      });
    }

    try {
      const fileData = fs.readFileSync(INQUIRIES_FILE, 'utf8');
      const inquiries = JSON.parse(fileData);
      return sendJson(res, 200, {
        success: true,
        count: inquiries.length,
        inquiries
      });
    } catch (err) {
      return sendJson(res, 500, { success: false, error: 'Could not read inquiries.' });
    }
  }

  // ---------------------------------------------------------------------------
  // STATIC FILE SERVING
  // ---------------------------------------------------------------------------
  let safePath = path.normalize(decodeURIComponent(pathname)).replace(/^(\.\.[\/\\])+/, '');
  if (safePath === '/' || safePath === '\\') {
    safePath = '/index.html';
  }

  const filePath = path.join(__dirname, safePath);
  serveStaticFile(req, res, filePath);
});

server.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(`🚀 PAPLO WEB Production Server is running!`);
  console.log(`🌐 Local Website: http://localhost:${PORT}`);
  console.log(`📡 API Health:    http://localhost:${PORT}/api/health`);
  console.log(`💬 API Reviews:   GET/POST http://localhost:${PORT}/api/reviews`);
  console.log(`📨 API Contact:   POST http://localhost:${PORT}/api/contact`);
  console.log(`=========================================`);
});