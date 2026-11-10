import React from 'react';
import styles from './CapabilitiesBackgrounds.module.css';

export const BlueprintBackground: React.FC<{ className?: string }> = ({ className = '' }) => {
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
          {/* Main Background Gradient */}
          <linearGradient id="blueprintBgGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f0f7fc" />
            <stop offset="15%" stopColor="#dce8f5" />
            <stop offset="38%" stopColor="#8baecf" />
            <stop offset="68%" stopColor="#486e97" />
            <stop offset="88%" stopColor="#1e3b68" />
            <stop offset="100%" stopColor="#132856" />
          </linearGradient>

          {/* Diffuse Luminous Ambient Light on Left */}
          <radialGradient id="blueprintAmbientLight" cx="18%" cy="26%" r="65%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="35%" stopColor="#e4effa" stopOpacity="0.5" />
            <stop offset="70%" stopColor="#8baecf" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#1e3b68" stopOpacity="0" />
          </radialGradient>

          {/* 64px Precision Grid Pattern */}
          <pattern id="blueprintGridPattern" width="64" height="64" patternUnits="userSpaceOnUse">
            <path d="M 64 0 L 0 0 0 64" fill="none" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1" />
            {/* Precision Crosshair at Intersection */}
            <path d="M 30 32 L 34 32 M 32 30 L 32 34" stroke="rgba(25, 203, 208, 0.45)" strokeWidth="1" />
          </pattern>

          {/* Vertical Feather Mask: Blends into surrounding sections */}
          <linearGradient id="blueprintVerticalMask" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#000000" />
            <stop offset="12%" stopColor="#ffffff" />
            <stop offset="85%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#000000" />
          </linearGradient>
          <mask id="blueprintMask">
            <rect width="100%" height="100%" fill="url(#blueprintVerticalMask)" />
          </mask>
        </defs>

        {/* 1. Base Gradient */}
        <rect width="100%" height="100%" fill="url(#blueprintBgGrad)" />

        {/* 2. Soft Ambient Diffuse Light Glow */}
        <rect width="100%" height="100%" fill="url(#blueprintAmbientLight)" />

        {/* 3. Blueprint Precision Grid with Mask */}
        <rect width="100%" height="100%" fill="url(#blueprintGridPattern)" mask="url(#blueprintMask)" />

        {/* 4. Telemetry Margin Coordinates & Institutional Stamp */}
        <g mask="url(#blueprintMask)">
          <text x="64" y="120" className={styles.telemetryText}>SYS·REF // ARCHITECTURE</text>
          <text x="64" y="140" className={styles.telemetryValue}>LAT 25.2048° N · LON 55.2708° E</text>

          <text x="1360" y="120" className={styles.telemetryText} textAnchor="end">TERMINAL // FX·SURFACE</text>
          <text x="1360" y="140" className={styles.telemetryValue} textAnchor="end">QUANT·ALLOC // ACTIVE</text>

          {/* Subtle Hairline Dividers */}
          <line x1="64" y1="160" x2="320" y2="160" stroke="rgba(25, 203, 208, 0.3)" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="1280" y1="160" x2="1536" y2="160" stroke="rgba(25, 203, 208, 0.3)" strokeWidth="1" strokeDasharray="4 4" />
        </g>
      </svg>
    </div>
  );
};

export default BlueprintBackground;
