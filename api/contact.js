// Vercel Serverless Function: /api/contact
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  try {
    const { name, email, phone, projectType, message } = req.body || {};

    if (!name || (!email && !phone)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide at least a name and contact info (email or phone).'
      });
    }

    const inquiry = {
      id: 'inq_' + Date.now(),
      name: String(name).trim(),
      email: email ? String(email).trim() : null,
      phone: phone ? String(phone).trim() : null,
      projectType: projectType || 'General Inquiry',
      message: message ? String(message).trim() : '',
      receivedAt: new Date().toISOString()
    };

    console.log('[Vercel Function] New Inquiry:', inquiry);

    return res.status(200).json({
      success: true,
      message: 'Inquiry received successfully by PAPLO WEB.',
      inquiry,
      whatsappDirectUrl: `https://wa.me/201278111833?text=${encodeURIComponent(`Hi PAPLO, my name is ${inquiry.name}. I submitted an inquiry about ${inquiry.projectType}.`)}`
    });
  } catch (error) {
    console.error('[Vercel Function Error]:', error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
}