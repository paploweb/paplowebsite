/**
 * PAPLO WEB - Production REST API & Backend Server
 * Zero-dependency standalone Node.js server (Runs with pure Node.js)
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'data');
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');

// Ensure data storage directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(INQUIRIES_FILE)) {
  fs.writeFileSync(INQUIRIES_FILE, JSON.stringify([], null, 2));
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

  // GET /api/inquiries - List inquiries (Protected / Admin)
  if (pathname === '/api/inquiries' && req.method === 'GET') {
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
  console.log(`🚀 PAPLO WEB Backend Server is running!`);
  console.log(`🌐 Local URL:  http://localhost:${PORT}`);
  console.log(`📡 API Health: http://localhost:${PORT}/api/health`);
  console.log(`📨 API Contact: POST http://localhost:${PORT}/api/contact`);
  console.log(`📋 Inquiries:  http://localhost:${PORT}/api/inquiries`);
  console.log(`=========================================`);
});