import { getMarketSnapshot } from '../src/server/marketAdapter';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const snapshot = await getMarketSnapshot();
    const statusCode = snapshot.status === 'error' ? 502 : 200;
    return res.status(statusCode).json(snapshot);
  } catch (error: any) {
    return res.status(500).json({
      status: 'error',
      mode: 'unconfigured',
      message: error?.message || 'Internal server error while resolving market data snapshot',
    });
  }
}

