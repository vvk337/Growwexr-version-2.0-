import { MarketInstrument, MarketSnapshotPayload, InstrumentCategory, ChangeBasis, MovementDirection, MarketStatus } from '../types/market';

declare const process: any;

let cache: {
  payload: MarketSnapshotPayload;
  cachedAt: number;
} | null = null;

const CACHE_TTL_MS = 60 * 1000; // 60-second minimum server cache TTL
let rateLimitCooldownUntil = 0; // Cooldown timestamp for 429/503 handling

interface TargetConfig {
  ticker: string;
  id: string;
  name: string;
  symbol: string;
  category: InstrumentCategory;
  changeBasis: ChangeBasis;
}

const TARGET_INSTRUMENTS: TargetConfig[] = [
  {
    ticker: 'XAUUSD',
    id: 'gold',
    name: 'Gold',
    symbol: 'XAU/USD',
    category: 'metal',
    changeBasis: 'session',
  },
  {
    ticker: 'EURUSD',
    id: 'eurusd',
    name: 'EUR/USD',
    symbol: 'EUR/USD',
    category: 'forex',
    changeBasis: 'session',
  },
  {
    ticker: 'GBPUSD',
    id: 'gbpusd',
    name: 'GBP/USD',
    symbol: 'GBP/USD',
    category: 'forex',
    changeBasis: 'session',
  },
  {
    ticker: 'US500',
    id: 'us500',
    name: 'US 500 CFD',
    symbol: 'US 500 CFD',
    category: 'index',
    changeBasis: 'session',
  },
  {
    ticker: 'US100',
    id: 'us100',
    name: 'US 100 CFD',
    symbol: 'US 100 CFD',
    category: 'index',
    changeBasis: 'session',
  },
  {
    ticker: 'BTCUSD',
    id: 'btcusd',
    name: 'Bitcoin',
    symbol: 'BTC/USD',
    category: 'crypto',
    changeBasis: '24h',
  },
];

/**
 * Formats indicative bid price using the provider-specified decimal digits.
 */
function formatIndicativePrice(bid: number, digits: number, category: InstrumentCategory): string {
  const safeDigits = typeof digits === 'number' && digits >= 0 && digits <= 10 ? digits : 2;
  const formattedNumber = bid.toLocaleString('en-US', {
    minimumFractionDigits: safeDigits,
    maximumFractionDigits: safeDigits,
  });

  if (category === 'metal' || category === 'crypto') {
    return `$${formattedNumber}`;
  }
  return formattedNumber;
}

const DEFAULT_MARKET_FEED_ENDPOINT =
  'https://crystalballmarkets.com/markets/api/v1/quotes.json?site=https://growwezy.com';

function getMarketFeedEndpoint(): string {
  return (typeof process !== 'undefined' && process.env?.MARKET_FEED_ENDPOINT) || DEFAULT_MARKET_FEED_ENDPOINT;
}

function getMarketSiteKey(): string {
  return (
    (typeof process !== 'undefined' && (process.env?.MARKET_SITE_KEY || process.env?.MARKET_DATA_API_KEY)) ||
    'growwezy_live_rates_token_verified'
  );
}

/**
 * Fetches quotes directly from the upstream market feed provider.
 */
async function fetchCrystalBallMarketsFeed(): Promise<MarketSnapshotPayload> {
  const endpoint = getMarketFeedEndpoint();
  const siteKey = getMarketSiteKey();

  const headers: Record<string, string> = {
    Accept: 'application/json',
    'User-Agent': 'GrowwezyMarketTicker/1.0',
  };

  if (siteKey) {
    headers['X-Site-Key'] = siteKey;
  }

  const response = await fetch(endpoint, {
    method: 'GET',
    headers,
  });

  // Handle rate limiting (429) or temporary server unavailability (503)
  if (response.status === 429 || response.status === 503) {
    const retryHeader = response.headers.get('retry-after');
    let cooldownMs = 60 * 1000; // default 60s cooldown

    if (retryHeader) {
      const parsedSeconds = parseInt(retryHeader, 10);
      if (!isNaN(parsedSeconds) && parsedSeconds > 0) {
        cooldownMs = parsedSeconds * 1000;
      } else {
        const parsedDate = new Date(retryHeader).getTime();
        if (!isNaN(parsedDate) && parsedDate > Date.now()) {
          cooldownMs = parsedDate - Date.now();
        }
      }
    }

    rateLimitCooldownUntil = Date.now() + cooldownMs;
    throw new Error(`Provider returned HTTP ${response.status}. Cooldown enforced for ${Math.round(cooldownMs / 1000)}s.`);
  }

  if (!response.ok) {
    throw new Error(`Crystal Ball Markets feed returned HTTP ${response.status}`);
  }

  const rawJson = await response.json();

  // Reject responses marked sample: true
  if (rawJson?.sample === true) {
    throw new Error('Provider returned sample data flag (sample: true). Live quotes rejected.');
  }

  if (!rawJson || !Array.isArray(rawJson.data)) {
    throw new Error('Invalid quote payload received: data array missing.');
  }

  const quotesMap = new Map<string, any>();
  for (const item of rawJson.data) {
    if (item && typeof item.ticker === 'string') {
      quotesMap.set(item.ticker.toUpperCase(), item);
    }
  }

  const now = new Date();
  const feedUpdatedTime = rawJson.updated || now.toISOString();

  const instruments: MarketInstrument[] = TARGET_INSTRUMENTS.map((target) => {
    const raw = quotesMap.get(target.ticker);
    if (!raw) {
      throw new Error(`Required instrument ${target.ticker} not found in provider response.`);
    }

    const bid = typeof raw.bid === 'number' ? raw.bid : parseFloat(String(raw.bid ?? ''));
    if (!Number.isFinite(bid) || bid <= 0) {
      throw new Error(`Invalid price value received for instrument ${target.ticker}: "${raw.bid}".`);
    }

    const digits = typeof raw.digits === 'number' && Number.isFinite(raw.digits) ? raw.digits : 2;
    const changePct = typeof raw.changePct === 'number' ? raw.changePct : parseFloat(String(raw.changePct ?? ''));
    if (!Number.isFinite(changePct)) {
      throw new Error(`Invalid changePct value received for instrument ${target.ticker}: "${raw.changePct}".`);
    }

    let direction: MovementDirection = 'unchanged';
    let sign = '';
    if (changePct > 0) {
      direction = 'up';
      sign = '+';
    } else if (changePct < 0) {
      direction = 'down';
      sign = '-';
    }

    const formattedPercent = `${sign}${Math.abs(changePct).toFixed(2)}%`;
    const formattedPrice = formatIndicativePrice(bid, digits, target.category);
    const sourceQuoteTime = raw.time || feedUpdatedTime;

    // Validate timestamp: never treat unparseable or absent timestamps as age 0
    const quoteTimestampMs = sourceQuoteTime ? new Date(sourceQuoteTime).getTime() : NaN;
    const isTimestampValid = Number.isFinite(quoteTimestampMs) && quoteTimestampMs > 0;
    const ageSeconds = isTimestampValid
      ? Math.max(0, Math.round((now.getTime() - quoteTimestampMs) / 1000))
      : 86400; // treat missing or corrupted timestamp as stale (24h old)
    const ageMinutes = ageSeconds / 60;

    // Crypto trades 24/7; if quote timestamp is older than 10 minutes, flag as stale
    const isCryptoStale = target.category === 'crypto' && (!isTimestampValid || ageMinutes > 10);
    // Session markets (FX, Metals, Indices) outside active trading hours (e.g. weekends)
    const isSessionClosed = target.category !== 'crypto' && (!isTimestampValid || ageMinutes > 45);

    const isStale = !isTimestampValid || isCryptoStale;
    const marketStatus: MarketStatus = isSessionClosed ? 'closed' : 'open';
    const marketStatusLabel = !isTimestampValid
      ? 'Feed Stale'
      : isCryptoStale
      ? 'Feed Stale'
      : isSessionClosed
      ? 'Market Closed'
      : 'Indicative Quote';

    return {
      id: target.id,
      name: target.name,
      symbol: target.symbol,
      category: target.category,
      price: bid,
      formattedPrice,
      digits,
      // Absolute change is not supplied by the provider: omit without inventing
      change: undefined,
      changePercent: changePct,
      formattedChange: undefined,
      formattedPercent,
      direction,
      changeBasis: target.changeBasis,
      changeBasisLabel: target.changeBasis === '24h' ? '24h rolling' : 'vs Prev Close',
      marketStatus,
      marketStatusLabel,
      sourceQuoteTime,
      isStale,
      quoteAgeSeconds: ageSeconds,
    };
  });

  // If any 24/7 instrument timestamp is stale, set overall snapshot status to stale
  const hasStale24hQuote = instruments.some((i) => i.category === 'crypto' && i.isStale);
  const status = hasStale24hQuote ? 'stale' : 'ok';

  return {
    status,
    mode: 'live',
    serverFetchedAt: now.toISOString(),
    cacheAgeSeconds: 0,
    delayNotice: hasStale24hQuote
      ? 'Indicative broker quotes • Feed delayed'
      : 'Indicative broker quotes',
    attribution: 'Rates by Crystal Ball Markets',
    instruments,
    message: hasStale24hQuote
      ? 'Provider quote timestamp is stale (>10m old) despite HTTP 200.'
      : undefined,
  };
}

const FALLBACK_INSTRUMENTS: MarketInstrument[] = [
  {
    id: 'gold',
    name: 'Gold',
    symbol: 'XAU/USD',
    category: 'metal',
    price: 2684.50,
    formattedPrice: '$2,684.50',
    digits: 2,
    changePercent: 0.42,
    formattedPercent: '+0.42%',
    direction: 'up',
    changeBasis: 'session',
    changeBasisLabel: 'vs Prev Close',
    marketStatus: 'open',
    marketStatusLabel: 'Benchmark Estimate',
    sourceQuoteTime: new Date().toISOString(),
    isStale: true,
    quoteAgeSeconds: 0,
  },
  {
    id: 'eurusd',
    name: 'EUR/USD',
    symbol: 'EUR/USD',
    category: 'forex',
    price: 1.0542,
    formattedPrice: '1.0542',
    digits: 4,
    changePercent: -0.18,
    formattedPercent: '-0.18%',
    direction: 'down',
    changeBasis: 'session',
    changeBasisLabel: 'vs Prev Close',
    marketStatus: 'open',
    marketStatusLabel: 'Benchmark Estimate',
    sourceQuoteTime: new Date().toISOString(),
    isStale: true,
    quoteAgeSeconds: 0,
  },
  {
    id: 'gbpusd',
    name: 'GBP/USD',
    symbol: 'GBP/USD',
    category: 'forex',
    price: 1.2618,
    formattedPrice: '1.2618',
    digits: 4,
    changePercent: 0.12,
    formattedPercent: '+0.12%',
    direction: 'up',
    changeBasis: 'session',
    changeBasisLabel: 'vs Prev Close',
    marketStatus: 'open',
    marketStatusLabel: 'Benchmark Estimate',
    sourceQuoteTime: new Date().toISOString(),
    isStale: true,
    quoteAgeSeconds: 0,
  },
  {
    id: 'us500',
    name: 'US 500 CFD',
    symbol: 'US 500 CFD',
    category: 'index',
    price: 5982.40,
    formattedPrice: '5,982.40',
    digits: 2,
    changePercent: 0.35,
    formattedPercent: '+0.35%',
    direction: 'up',
    changeBasis: 'session',
    changeBasisLabel: 'vs Prev Close',
    marketStatus: 'open',
    marketStatusLabel: 'Benchmark Estimate',
    sourceQuoteTime: new Date().toISOString(),
    isStale: true,
    quoteAgeSeconds: 0,
  },
  {
    id: 'us100',
    name: 'US 100 CFD',
    symbol: 'US 100 CFD',
    category: 'index',
    price: 20890.10,
    formattedPrice: '20,890.10',
    digits: 2,
    changePercent: 0.58,
    formattedPercent: '+0.58%',
    direction: 'up',
    changeBasis: 'session',
    changeBasisLabel: 'vs Prev Close',
    marketStatus: 'open',
    marketStatusLabel: 'Benchmark Estimate',
    sourceQuoteTime: new Date().toISOString(),
    isStale: true,
    quoteAgeSeconds: 0,
  },
  {
    id: 'btcusd',
    name: 'Bitcoin',
    symbol: 'BTC/USD',
    category: 'crypto',
    price: 91420.00,
    formattedPrice: '$91,420.00',
    digits: 2,
    changePercent: 2.15,
    formattedPercent: '+2.15%',
    direction: 'up',
    changeBasis: '24h',
    changeBasisLabel: '24h rolling',
    marketStatus: 'open',
    marketStatusLabel: 'Benchmark Estimate',
    sourceQuoteTime: new Date().toISOString(),
    isStale: true,
    quoteAgeSeconds: 0,
  },
];

/**
 * Main server snapshot resolver with 60-second caching,
 * rate limit handling, and honest stale fallback on temporary error.
 */
export async function getMarketSnapshot(): Promise<MarketSnapshotPayload> {
  const now = Date.now();

  // 1. Return fresh cached snapshot if within 60s TTL
  if (cache && now - cache.cachedAt < CACHE_TTL_MS) {
    const age = Math.round((now - cache.cachedAt) / 1000);
    return {
      ...cache.payload,
      cacheAgeSeconds: age,
    };
  }

  // 2. Check if locked out by a 429/503 cooldown
  if (now < rateLimitCooldownUntil) {
    if (cache) {
      const age = Math.round((now - cache.cachedAt) / 1000);
      return {
        ...cache.payload,
        status: 'stale',
        cacheAgeSeconds: age,
        message: 'Upstream rate limit cooldown active. Serving last valid snapshot.',
      };
    }

    return {
      status: 'stale',
      mode: 'development_preview',
      serverFetchedAt: new Date().toISOString(),
      cacheAgeSeconds: 0,
      delayNotice: 'Indicative benchmark rates (Rate Limit Cooldown)',
      attribution: 'Indicative Market Benchmarks',
      instruments: FALLBACK_INSTRUMENTS,
      message: 'Upstream feed rate limit cooldown active. Displaying indicative benchmark rates.',
    };
  }

  // 3. Fetch from upstream feed provider
  try {
    const freshSnapshot = await fetchCrystalBallMarketsFeed();
    cache = {
      payload: freshSnapshot,
      cachedAt: now,
    };
    return freshSnapshot;
  } catch (err: any) {
    // If a previous valid quote snapshot exists, serve it honestly marked as stale
    if (cache) {
      const age = Math.round((now - cache.cachedAt) / 1000);
      return {
        ...cache.payload,
        status: 'stale',
        cacheAgeSeconds: age,
        message: `Provider fetch failed (${err.message || 'Network error'}). Serving last valid snapshot.`,
      };
    }

    // Serve indicative benchmark rates clearly identified as offline development preview
    return {
      status: 'stale',
      mode: 'development_preview',
      serverFetchedAt: new Date().toISOString(),
      cacheAgeSeconds: 0,
      delayNotice: 'Indicative benchmark rates (Offline fallback)',
      attribution: 'Indicative Market Benchmarks',
      instruments: FALLBACK_INSTRUMENTS,
      message: `Live feed temporarily unavailable (${err.message || 'Connecting'}). Displaying indicative benchmark rates.`,
    };
  }
}
