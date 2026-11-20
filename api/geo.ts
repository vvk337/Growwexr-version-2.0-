/**
 * Vercel Serverless Function: Resolve visitor geolocation from Edge HTTP headers
 */
export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400'); // Cache for 24h

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Vercel / Cloudflare geolocation headers
  const countryCode =
    req.headers['x-vercel-ip-country'] ||
    req.headers['cf-ipcountry'] ||
    req.headers['x-country-code'] ||
    null;

  const city =
    req.headers['x-vercel-ip-city'] ||
    null;

  return res.status(200).json({
    status: 'ok',
    countryCode: countryCode ? String(countryCode).toUpperCase() : null,
    city: city ? decodeURIComponent(String(city)) : null,
  });
}
