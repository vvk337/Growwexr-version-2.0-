export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      status: 'error',
      message: 'Method Not Allowed. Please use POST for consultation requests.',
    });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const {
      firstName,
      lastName,
      name, // backwards-compatibility if legacy payload
      email,
      countryCode,
      phone,
      country,
      city,
      serviceInterest,
      message,
      // Honeypot spam field
      companyWebsite,
      website,
    } = body;

    // Honeypot anti-spam protection:
    // If a bot filled out an invisible honeypot field, drop silently with 200
    if (companyWebsite || website) {
      return res.status(200).json({
        status: 'ok',
        inquiryId: `GW-${Date.now().toString(36).toUpperCase()}`,
        message: 'Inquiry received.',
      });
    }

    // Resolve name fields
    const resolvedFirstName = (firstName || name?.split(' ')[0] || '').trim();
    const resolvedLastName = (lastName || name?.split(' ').slice(1).join(' ') || '').trim();
    const resolvedFullName = resolvedLastName
      ? `${resolvedFirstName} ${resolvedLastName}`.trim()
      : resolvedFirstName;

    // Validate required fields
    if (!resolvedFirstName || resolvedFirstName.length < 2) {
      return res.status(400).json({
        status: 'error',
        message: 'A valid first name (minimum 2 characters) is required.',
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      return res.status(400).json({
        status: 'error',
        message: 'A valid email address is required.',
      });
    }

    if (!country || typeof country !== 'string' || country.trim().length === 0) {
      return res.status(400).json({
        status: 'error',
        message: 'Country of residence is required.',
      });
    }

    const inquiryId = `GW-${Date.now().toString(36).toUpperCase()}`;
    const receivedAt = new Date().toISOString();

    const fullPhone = phone?.trim()
      ? `${countryCode ? countryCode + ' ' : ''}${phone.trim()}`
      : 'Not provided';

    const leadPayload = {
      inquiryId,
      timestamp: receivedAt,
      firstName: resolvedFirstName,
      lastName: resolvedLastName,
      fullName: resolvedFullName,
      email: email.trim().toLowerCase(),
      countryCode: countryCode || '',
      phone: phone?.trim() || '',
      fullPhone,
      country: country.trim(),
      city: city?.trim() || 'Not specified',
      serviceInterest: serviceInterest || 'Forex Signals',
      message: message?.trim() || '',
      source: 'Website Contact Page',
    };

    // Forward to Google Sheets Webhook if configured
    const googleSheetsWebhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    let sheetSynced = false;

    if (googleSheetsWebhookUrl && googleSheetsWebhookUrl.startsWith('http')) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000); // 8-second timeout

        const sheetResponse = await fetch(googleSheetsWebhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(leadPayload),
          redirect: 'follow', // Important for Google Apps Script 302 redirects
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (sheetResponse.ok) {
          sheetSynced = true;
        } else {
          console.warn(`[Contact API] Google Sheet webhook returned HTTP ${sheetResponse.status}`);
        }
      } catch (sheetErr: any) {
        console.error('[Contact API] Failed to forward lead to Google Sheets:', sheetErr.message);
      }
    } else {
      console.log('[Contact API] Local dev or GOOGLE_SHEETS_WEBHOOK_URL not configured. Lead recorded:', leadPayload);
    }

    return res.status(200).json({
      status: 'ok',
      message: 'Consultation request received successfully.',
      inquiryId,
      receivedAt,
      sheetSynced,
      details: {
        fullName: resolvedFullName,
        email: email.trim().toLowerCase(),
        fullPhone,
        country: country.trim(),
        city: city?.trim() || 'Not specified',
        serviceInterest: serviceInterest || 'Forex Signals',
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      status: 'error',
      message: error?.message || 'Internal server error processing consultation request.',
    });
  }
}
