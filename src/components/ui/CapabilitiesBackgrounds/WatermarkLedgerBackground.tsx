import React from 'react';
import styles from './CapabilitiesBackgrounds.module.css';

export const WatermarkLedgerBackground: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`${styles.bgContainer} ${className}`} aria-hidden="true">
      <svg
        className={styles.bgSvg}
        viewBox="0 0 1600 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="ledgerBgGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f0f7fc" />
            <stop offset="16%" stopColor="#dce8f5" />
            <stop offset="38%" stopColor="#8baecf" />
            <stop offset="68%" stopColor="#486e97" />
            <stop offset="88%" stopColor="#1e3b68" />
            <stop offset="100%" stopColor="#132856" />
          </linearGradient>

          <radialGradient id="ledgerAmbientLight" cx="18%" cy="26%" r="65%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="35%" stopColor="#e4effa" stopOpacity="0.5" />
            <stop offset="70%" stopColor="#8baecf" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#1e3b68" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="ledgerVerticalMask" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#000000" />
            <stop offset="12%" stopColor="#ffffff" />
            <stop offset="86%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#000000" />
          </linearGradient>
          <mask id="ledgerMask">
            <rect width="100%" height="100%" fill="url(#ledgerVerticalMask)" />
          </mask>
        </defs>

        {/* 1. Base Gradient */}
        <rect width="100%" height="100%" fill="url(#ledgerBgGrad)" />

        {/* 2. Soft Ambient Diffuse Light */}
        <rect width="100%" height="100%" fill="url(#ledgerAmbientLight)" />

        {/* 3. Hairline Horizontal Ledger Rules & Institutional Watermarks */}
        <g mask="url(#ledgerMask)">
          {/* Ledger Horizontal Rules */}
          <line x1="0" y1="200" x2="1600" y2="200" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1" />
          <line x1="0" y1="380" x2="1600" y2="380" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" strokeDasharray="6 6" />
          <line x1="0" y1="560" x2="1600" y2="560" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" strokeDasharray="6 6" />
          <line x1="0" y1="740" x2="1600" y2="740" stroke="rgba(25, 203, 208, 0.22)" strokeWidth="1" />

          {/* Institutional Telemetry Labels */}
          <text x="64" y="190" className={styles.watermarkLabel}>FX·BOOK // MANDATE LEDGER</text>
          <text x="1536" y="190" className={styles.watermarkLabel} textAnchor="end">CAPITAL ARCHITECTURE</text>

          {/* Oversized Faint Typographic Watermarks Anchored Behind the Cards */}
          <text x="120" y="340" fontSize="110" className={styles.watermarkSymbol}>EUR·USD</text>
          <text x="540" y="520" fontSize="120" className={styles.watermarkSymbol}>GBP·AED</text>
          <text x="960" y="340" fontSize="140" className={styles.watermarkSymbol}>Σ (MACRO)</text>
          <text x="1240" y="520" fontSize="110" className={styles.watermarkSymbol}>Δ 0.42%</text>

          {/* Micro Tick Marks Along Bottom Ledger */}
          <g stroke="rgba(25, 203, 208, 0.35)" strokeWidth="1">
            <line x1="160" y1="735" x2="160" y2="745" />
            <line x1="480" y1="735" x2="480" y2="745" />
            <line x1="800" y1="735" x2="800" y2="745" />
            <line x1="1120" y1="735" x2="1120" y2="745" />
            <line x1="1440" y1="735" x2="1440" y2="745" />
          </g>
        </g>
      </svg>
    </div>
  );
};

export default WatermarkLedgerBackground;
