import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AlertCircle } from 'lucide-react';
import { MarketSnapshotPayload, MarketInstrument } from '../../../types/market';
import {
  GoldBarIcon,
  EurUsdIcon,
  GbpUsdIcon,
  Us500CfdIcon,
  Us100CfdIcon,
  BitcoinIcon,
} from './InstrumentIcons';
import styles from './MarketTicker.module.css';

interface MarketTickerProps {
  className?: string;
}

/**
 * Returns the authentic 28–32px instrument vector asset.
 * If the feed uses broker CFDs (US 500 CFD / US 100 CFD), neutral representative
 * benchmark icons are used to strictly avoid presenting broker CFDs as official exchange indices.
 */
function renderInstrumentIcon(item: MarketInstrument) {
  switch (item.id) {
    case 'gold':
    case 'XAUUSD':
      return <GoldBarIcon className={styles.instrumentIcon} size={30} />;
    case 'eurusd':
    case 'EURUSD':
      return <EurUsdIcon className={styles.instrumentIcon} size={30} />;
    case 'gbpusd':
    case 'GBPUSD':
      return <GbpUsdIcon className={styles.instrumentIcon} size={30} />;
    case 'us500':
    case 'US500':
    case 'spx':
      return <Us500CfdIcon className={styles.instrumentIcon} size={30} />;
    case 'us100':
    case 'US100':
    case 'ndx':
      return <Us100CfdIcon className={styles.instrumentIcon} size={30} />;
    case 'btcusd':
    case 'BTCUSD':
      return <BitcoinIcon className={styles.instrumentIcon} size={30} />;
    default:
      return (
        <span className={styles.badgeFallback}>
          {item.symbol.slice(0, 3)}
        </span>
      );
  }
}

export const MarketTicker: React.FC<MarketTickerProps> = ({ className }) => {
  const [snapshot, setSnapshot] = useState<MarketSnapshotPayload | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const lastFetchTimeRef = useRef<number>(0);
  const intervalIdRef = useRef<number | null>(null);

  const fetchQuotes = useCallback(async () => {
    try {
      const response = await fetch(`/api/market-data?_t=${Date.now()}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const data: MarketSnapshotPayload = await response.json();
      setSnapshot(data);
      lastFetchTimeRef.current = Date.now();
      setIsLoading(false);
    } catch {
      // On temporary failure, preserve existing snapshot and mark stale
      setSnapshot((prev) => (prev ? { ...prev, status: 'stale' } : prev));
      setIsLoading(false);
    }
  }, []);

  // Initial fetch and 60-second visibility-aware polling
  useEffect(() => {
    fetchQuotes();

    const startPolling = () => {
      if (intervalIdRef.current) clearInterval(intervalIdRef.current);
      intervalIdRef.current = window.setInterval(() => {
        if (document.visibilityState === 'visible') {
          fetchQuotes();
        }
      }, 60000);
    };

    const stopPolling = () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        const elapsed = Date.now() - lastFetchTimeRef.current;
        if (elapsed > 60000) {
          fetchQuotes();
        }
        startPolling();
      } else {
        stopPolling();
      }
    };

    startPolling();
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      stopPolling();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [fetchQuotes]);

  const renderInstrument = (item: MarketInstrument, isDuplicate: boolean = false) => {
    const isUp = item.direction === 'up';
    const isDown = item.direction === 'down';

    const movementClass = isUp
      ? styles.movementUp
      : isDown
      ? styles.movementDown
      : styles.movementUnchanged;

    const directionSymbol = isUp ? '▲' : isDown ? '▼' : '■';

    return (
      <li
        key={`${item.id}-${isDuplicate ? 'dup' : 'orig'}`}
        className={styles.instrumentItem}
        role={isDuplicate ? 'presentation' : 'listitem'}
        aria-hidden={isDuplicate ? 'true' : undefined}
        tabIndex={isDuplicate ? -1 : 0}
      >
        {/* 28–32px Authentic Asset Container */}
        <div className={styles.iconContainer} aria-hidden="true">
          {renderInstrumentIcon(item)}
        </div>

        {/* Three-Line Layout Beside Badge */}
        <div className={styles.itemContent}>
          {/* 1. Small muted uppercase instrument name */}
          <span className={styles.itemName}>{item.name}</span>

          {/* 2. White semibold price */}
          <span className={styles.itemPrice}>{item.formattedPrice}</span>

          {/* 3. Smaller green/red change figure */}
          <span className={`${styles.itemChange} ${movementClass}`}>
            <span className={styles.changeIcon} aria-hidden="true">
              {directionSymbol}
            </span>
            <span>
              {item.formattedChange
                ? `${item.formattedChange} (${item.formattedPercent})`
                : item.formattedPercent}
            </span>
          </span>
        </div>
      </li>
    );
  };

  const instruments = snapshot?.instruments || [];
  const isUnconfigured = snapshot?.status === 'unconfigured';
  const isDevelopmentPreview = snapshot?.mode === 'development_preview';

  // Detect stale data from status OR directly from instrument-level timestamps
  const isStale =
    snapshot?.status === 'stale' ||
    instruments.some((inst) => {
      if (inst.isStale) return true;
      const quoteMs = new Date(inst.sourceQuoteTime).getTime();
      if (isNaN(quoteMs)) return false;
      const ageMinutes = (Date.now() - quoteMs) / (60 * 1000);
      return inst.category === 'crypto' && ageMinutes > 10;
    });

  return (
    <section
      className={`${styles.tickerWrapper} ${className || ''}`}
      aria-label="Financial Market Overview Ticker"
    >
      {/* Marquee Viewport with Edge Fade Masks */}
      <div className={styles.tickerViewport} tabIndex={0} aria-label="Live scrolling market ticker">
        {isLoading && instruments.length === 0 ? (
          <div className={styles.unconfiguredBanner}>
            <span className={styles.unconfiguredSub}>Loading market snapshot...</span>
          </div>
        ) : isUnconfigured && instruments.length === 0 ? (
          <div className={styles.unconfiguredBanner}>
            <AlertCircle size={14} color="#94a3b8" aria-hidden="true" />
            <div>
              <span className={styles.unconfiguredTitle}>Market Data Feed Inactive</span>
              <span className={styles.unconfiguredSub}> — Awaiting provider configuration</span>
            </div>
          </div>
        ) : (
          <div className={styles.tickerTrack}>
            {/* Primary Track (Accessible to Screen Readers) */}
            <ul className={styles.tickerGroup} role="list" aria-label="Financial market quotes">
              {instruments.map((item) => renderInstrument(item, false))}
            </ul>

            {/* Duplicate Track (Hidden from Screen Readers to Avoid Redundancy) */}
            <ul className={styles.tickerGroup} role="presentation" aria-hidden="true">
              {instruments.map((item) => renderInstrument(item, true))}
            </ul>
          </div>
        )}
      </div>

      {/* Discreet Attribution / Delay Disclosure Outside the Scrolling Row */}
      <div className={styles.disclosureRow}>
        <span className={styles.indicativeLabel}>
          {isDevelopmentPreview ? 'Indicative benchmark rates' : 'Indicative broker quotes'}
        </span>
        <span className={styles.separatorDot} aria-hidden="true">•</span>
        {isDevelopmentPreview ? (
          <span className={styles.indicativeLabel}>
            {snapshot?.attribution || 'Indicative Market Benchmarks'}
          </span>
        ) : (
          <a
            href="https://crystalballmarkets.com/markets"
            className={styles.attributionLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {snapshot?.attribution || 'Rates by Crystal Ball Markets'}
          </a>
        )}
        {isDevelopmentPreview ? (
          <>
            <span className={styles.separatorDot} aria-hidden="true">•</span>
            <span className={styles.staleNotice}>Offline Preview Benchmarks</span>
          </>
        ) : isStale ? (
          <>
            <span className={styles.separatorDot} aria-hidden="true">•</span>
            <span className={styles.staleNotice}>Data Stale</span>
          </>
        ) : null}
      </div>
    </section>
  );
};

export default MarketTicker;
