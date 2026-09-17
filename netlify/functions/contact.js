// Netlify Serverless Function: /.netlify/functions/contact or /api/contact
exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ success: false, error: 'Method Not Allowed' })
    };
  }

  try {
    const data = JSON.parse(event.body || '{}');
    const { name, email, phone, projectType, message } = data;

    if (!name || (!email && !phone)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Please provide at least a name and contact info.'
        })
      };
    }

    const inquiry = {
      id: 'inq_netlify_' + Date.now(),
      name: String(name).trim(),
      email: email ? String(email).trim() : null,
      phone: phone ? String(phone).trim() : null,
      projectType: projectType || 'General Inquiry',
      message: message ? String(message).trim() : '',
      receivedAt: new Date().toISOString()
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Inquiry received successfully by PAPLO WEB.',
        inquiry
      })
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ success: false, error: 'Internal Server Error' })
    };
  }
};