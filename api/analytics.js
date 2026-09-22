// Vercel Serverless Function: /api/analytics
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const ADMIN_SECRET = process.env.ADMIN_SECRET || 'paplo2026';
  const authHeader = req.headers['authorization'];
  const token = (authHeader && authHeader.startsWith('Bearer ')) 
    ? authHeader.substring(7).trim() 
    : req.query?.token;

  if (token !== ADMIN_SECRET) {
    return res.status(401).json({ success: false, error: 'Unauthorized. Admin token required.' });
  }

  return res.status(200).json({
    success: true,
    message: 'Analytics authorized for PAPLO admin.',
    timestamp: new Date().toISOString()
  });
}
