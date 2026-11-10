import React from 'react';
import styles from './CapabilitiesBackgrounds.module.css';

export const GlassGrainBackground: React.FC<{ className?: string }> = ({ className = '' }) => {
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
          <linearGradient id="glassBgGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f0f7fc" />
            <stop offset="16%" stopColor="#dce8f5" />
            <stop offset="38%" stopColor="#8baecf" />
            <stop offset="68%" stopColor="#486e97" />
            <stop offset="88%" stopColor="#1e3b68" />
            <stop offset="100%" stopColor="#132856" />
          </linearGradient>

          {/* Three Non-Linear Atmospheric Radial Lights */}
          <radialGradient id="glassLightLeft" cx="16%" cy="26%" r="62%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="38%" stopColor="#e4effa" stopOpacity="0.45" />
            <stop offset="75%" stopColor="#8baecf" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#1e3b68" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="glassLightCenter" cx="55%" cy="58%" r="48%">
            <stop offset="0%" stopColor="#19cbd0" stopOpacity="0.16" />
            <stop offset="45%" stopColor="#075af7" stopOpacity="0.12" />
            <stop offset="85%" stopColor="#132856" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="glassLightRight" cx="84%" cy="40%" r="52%">
            <stop offset="0%" stopColor="#dcebf8" stopOpacity="0.3" />
            <stop offset="55%" stopColor="#486e97" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#132856" stopOpacity="0" />
          </radialGradient>

          {/* Vertical Pillar Gradients Behind Each Card */}
          <linearGradient id="pillarGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="25%" stopColor="#ffffff" stopOpacity="0.14" />
            <stop offset="65%" stopColor="#19cbd0" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#132856" stopOpacity="0" />
          </linearGradient>

          {/* Micro-Grain Filter (matching grain: 0.08 of ASCII component) */}
          <filter id="grainFilter" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.045 0" />
          </filter>
        </defs>

        {/* 1. Base Gradient */}
        <rect width="100%" height="100%" fill="url(#glassBgGrad)" />

        {/* 2. Overlapping Non-Linear Radial Light Spots */}
        <rect width="100%" height="100%" fill="url(#glassLightLeft)" />
        <rect width="100%" height="100%" fill="url(#glassLightCenter)" />
        <rect width="100%" height="100%" fill="url(#glassLightRight)" />

        {/* 3. Four Frosted Light Pillars (Anchored behind the 4 Cards) */}
        <rect x="75" y="160" width="310" height="620" rx="24" fill="url(#pillarGrad)" />
        <rect x="445" y="160" width="310" height="620" rx="24" fill="url(#pillarGrad)" />
        <rect x="815" y="160" width="310" height="620" rx="24" fill="url(#pillarGrad)" />
        <rect x="1185" y="160" width="310" height="620" rx="24" fill="url(#pillarGrad)" />

        {/* 4. Film Grain / Dither Texture Overlay */}
        <rect width="100%" height="100%" filter="url(#grainFilter)" />
      </svg>
    </div>
  );
};

export default GlassGrainBackground;
