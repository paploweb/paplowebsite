// Vercel Serverless Function: /api/track
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  try {
    const { visitorId, path, referrer, screen, language } = req.body || {};
    const clientIp = (req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '127.0.0.1').split(',')[0].trim();
    const userAgent = req.headers['user-agent'] || '';

    // Log the visit in Vercel function telemetry
    console.log([Vercel Analytics] Visit from  | Visitor:  | Path:  | Screen: );

    return res.status(200).json({ success: true, timestamp: new Date().toISOString() });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Tracking error' });
  }
}
