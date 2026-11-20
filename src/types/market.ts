export type InstrumentCategory = 'metal' | 'forex' | 'index' | 'crypto';
export type MovementDirection = 'up' | 'down' | 'unchanged';
export type ChangeBasis = 'session' | '24h';
export type MarketStatus = 'open' | 'closed';

export interface MarketInstrument {
  id: string;
  name: string;             // e.g. "Gold", "US 500 CFD", "EUR/USD"
  symbol: string;           // e.g. "XAU/USD", "US 500 CFD", "EUR/USD"
  category: InstrumentCategory;
  price: number;
  formattedPrice: string;   // e.g. "2,684.20", "1.0542", "5,983.99"
  digits?: number;          // Provider precision
  change?: number;          // Absolute numeric change (omitted if not provided by feed)
  changePercent: number;    // Percent change (e.g. 0.54 for +0.54%)
  formattedChange?: string; // e.g. "+14.50" (omitted if not provided by feed)
  formattedPercent: string; // e.g. "+0.54%", "-0.29%"
  direction: MovementDirection;
  changeBasis: ChangeBasis;
  changeBasisLabel: string; // e.g. "vs Prev Close" or "24h rolling"
  marketStatus: MarketStatus;
  marketStatusLabel: string; // e.g. "Market Open" or "Market Closed"
  sourceQuoteTime: string;  // ISO timestamp from provider
  isStale?: boolean;        // Detected stale quote timestamp
  quoteAgeSeconds?: number; // Age of quote relative to server fetch
}

export interface MarketSnapshotPayload {
  status: 'ok' | 'stale' | 'unconfigured' | 'error';
  mode: 'live' | 'development_preview' | 'unconfigured';
  serverFetchedAt: string;  // ISO timestamp of server fetch
  cacheAgeSeconds: number;
  delayNotice: string;      // e.g. "Indicative • 15-min delay / Market Close"
  attribution: string;      // e.g. "Rates by Crystal Ball Markets" or "Indicative Market Benchmarks"
  instruments: MarketInstrument[];
  message?: string;
}

