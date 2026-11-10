import React from 'react';
import styles from './CapabilitiesBackgrounds.module.css';

export const TopoContourBackground: React.FC<{ className?: string }> = ({ className = '' }) => {
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
          <linearGradient id="topoBgGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f0f7fc" />
            <stop offset="16%" stopColor="#dce8f5" />
            <stop offset="38%" stopColor="#8baecf" />
            <stop offset="68%" stopColor="#486e97" />
            <stop offset="88%" stopColor="#1e3b68" />
            <stop offset="100%" stopColor="#132856" />
          </linearGradient>

          <radialGradient id="topoAmbientLight" cx="20%" cy="28%" r="65%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="35%" stopColor="#e4effa" stopOpacity="0.5" />
            <stop offset="70%" stopColor="#8baecf" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#1e3b68" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="topoStrokeGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.08" />
            <stop offset="40%" stopColor="#ffffff" stopOpacity="0.32" />
            <stop offset="75%" stopColor="#19cbd0" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
          </linearGradient>

          <linearGradient id="topoVerticalMask" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#000000" />
            <stop offset="10%" stopColor="#ffffff" />
            <stop offset="88%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#000000" />
          </linearGradient>
          <mask id="topoMask">
            <rect width="100%" height="100%" fill="url(#topoVerticalMask)" />
          </mask>
        </defs>

        {/* 1. Base Gradient */}
        <rect width="100%" height="100%" fill="url(#topoBgGrad)" />

        {/* 2. Soft Ambient Diffuse Light */}
        <rect width="100%" height="100%" fill="url(#topoAmbientLight)" />

        {/* 3. Topographic Volatility Contour Surfaces */}
        <g mask="url(#topoMask)">
          {/* Contour Line 1 */}
          <path
            d="M -100 240 Q 350 180 800 280 T 1700 220"
            stroke="url(#topoStrokeGrad)"
            strokeWidth="1.2"
            fill="none"
          />
          {/* Contour Line 2 */}
          <path
            d="M -100 320 Q 400 240 850 360 T 1700 300"
            stroke="url(#topoStrokeGrad)"
            strokeWidth="1.2"
            fill="none"
          />
          {/* Contour Line 3 */}
          <path
            d="M -100 400 Q 450 300 900 440 T 1700 380"
            stroke="url(#topoStrokeGrad)"
            strokeWidth="1.3"
            fill="none"
          />
          {/* Contour Line 4 */}
          <path
            d="M -100 480 Q 500 360 950 520 T 1700 460"
            stroke="url(#topoStrokeGrad)"
            strokeWidth="1.3"
            fill="none"
          />
          {/* Contour Line 5 */}
          <path
            d="M -100 560 Q 550 420 1000 600 T 1700 540"
            stroke="url(#topoStrokeGrad)"
            strokeWidth="1.4"
            fill="none"
          />
          {/* Contour Line 6 */}
          <path
            d="M -100 640 Q 600 480 1050 680 T 1700 620"
            stroke="url(#topoStrokeGrad)"
            strokeWidth="1.4"
            fill="none"
          />
          {/* Contour Line 7: Pre-empts the exact Horizon Arc of the ASCII canvas below */}
          <path
            d="M -100 740 Q 800 580 1700 730"
            stroke="rgba(25, 203, 208, 0.45)"
            strokeWidth="1.8"
            fill="none"
          />
          {/* Contour Line 8: Deep Horizon Crest */}
          <path
            d="M -100 810 Q 800 660 1700 800"
            stroke="rgba(7, 90, 247, 0.35)"
            strokeWidth="1.5"
            fill="none"
          />
        </g>
      </svg>
    </div>
  );
};

export default TopoContourBackground;
