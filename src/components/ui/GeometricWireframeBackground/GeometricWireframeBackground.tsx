import React from 'react';
import styles from './GeometricWireframeBackground.module.css';

interface GeometricWireframeBackgroundProps {
  className?: string;
}

export const GeometricWireframeBackground: React.FC<GeometricWireframeBackgroundProps> = ({ className = '' }) => {
  // Generate concentric paths for group 1 (18 parallel lanes)
  const group1Lanes = Array.from({ length: 18 }, (_, i) => ({
    w: 320 + i * 16,
    h: 560 + i * 16,
    r: 64 + i * 6,
    opacity: Math.max(0.12, 0.65 - i * 0.028)
  }));

  // Generate concentric paths for group 2 (22 parallel lanes crossing over group 1)
  const group2Lanes = Array.from({ length: 22 }, (_, i) => ({
    w: 350 + i * 17,
    h: 590 + i * 17,
    r: 72 + i * 6.5,
    opacity: Math.max(0.15, 0.72 - i * 0.025)
  }));

  // Generate concentric paths for group 3 (16 parallel lanes on right flank)
  const group3Lanes = Array.from({ length: 16 }, (_, i) => ({
    w: 300 + i * 18,
    h: 520 + i * 18,
    r: 60 + i * 6,
    opacity: Math.max(0.1, 0.5 - i * 0.024)
  }));

  // Generate concentric paths for group 4 (12 faint parallel lanes on left)
  const group4Lanes = Array.from({ length: 12 }, (_, i) => ({
    w: 260 + i * 18,
    h: 460 + i * 18,
    r: 52 + i * 5,
    opacity: Math.max(0.08, 0.35 - i * 0.022)
  }));

  return (
    <div className={`${styles.wireframeContainer} ${className}`} aria-hidden="true">
      <svg
        className={styles.wireframeSvg}
        viewBox="0 0 1600 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Main Background Gradient: Seamless from #f0f7fc (AboutIntro) to #132856 (ValuesSection) */}
          <linearGradient id="servicesBgGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f0f7fc" />
            <stop offset="12%" stopColor="#e3ebf4" />
            <stop offset="32%" stopColor="#bfd5e6" />
            <stop offset="58%" stopColor="#87a7c4" />
            <stop offset="82%" stopColor="#416388" />
            <stop offset="100%" stopColor="#132856" />
          </linearGradient>

          {/* Diffuse Luminous Ambient Light on Left */}
          <radialGradient id="leftAmbientGlow" cx="22%" cy="28%" r="62%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="38%" stopColor="#eaf3fb" stopOpacity="0.55" />
            <stop offset="70%" stopColor="#bfd5e6" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#87a7c4" stopOpacity="0" />
          </radialGradient>

          {/* Stroke Gradient for Crisp Luminous Highlights */}
          <linearGradient id="strokeGlow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#d8e8f8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#a3c4e2" stopOpacity="0.6" />
          </linearGradient>

          {/* Vertical Feather Mask: Blends lines softly into the above and below sections */}
          <linearGradient id="verticalMaskGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#000000" />
            <stop offset="10%" stopColor="#ffffff" />
            <stop offset="86%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#000000" />
          </linearGradient>
          <mask id="wireframeMask">
            <rect width="100%" height="100%" fill="url(#verticalMaskGrad)" />
          </mask>
        </defs>

        {/* 1. Base Slate-to-Navy Atmospheric Gradient */}
        <rect width="100%" height="100%" fill="url(#servicesBgGradient)" />

        {/* 2. Soft Ambient Diffuse Light Glow */}
        <rect width="100%" height="100%" fill="url(#leftAmbientGlow)" />

        {/* 3. Layered Wireframe Ribbon Groups with Feathering Mask */}
        <g mask="url(#wireframeMask)">
          {/* Subtle Left Echo Ribbon */}
          <g transform="translate(520, 500) rotate(14) skewY(10)" className={styles.driftSlow}>
            {group4Lanes.map((lane, i) => (
              <rect
                key={`g4-${i}`}
                x={-lane.w / 2}
                y={-lane.h / 2}
                width={lane.w}
                height={lane.h}
                rx={lane.r}
                ry={lane.r}
                stroke="url(#strokeGlow)"
                strokeWidth="1.1"
                strokeOpacity={lane.opacity}
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </g>

          {/* Primary Group 1: Center-Left Stadium Ribbons */}
          <g transform="translate(860, 430) rotate(16) skewY(12)" className={styles.driftPrimary}>
            {group1Lanes.map((lane, i) => (
              <rect
                key={`g1-${i}`}
                x={-lane.w / 2}
                y={-lane.h / 2}
                width={lane.w}
                height={lane.h}
                rx={lane.r}
                ry={lane.r}
                stroke="url(#strokeGlow)"
                strokeWidth="1.2"
                strokeOpacity={lane.opacity}
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </g>

          {/* Primary Group 2: Center-Right Crossing Ribbons (Creates the Diamond Moiré) */}
          <g transform="translate(1090, 400) rotate(-32) skewX(-14)" className={styles.driftSecondary}>
            {group2Lanes.map((lane, i) => (
              <rect
                key={`g2-${i}`}
                x={-lane.w / 2}
                y={-lane.h / 2}
                width={lane.w}
                height={lane.h}
                rx={lane.r}
                ry={lane.r}
                stroke="url(#strokeGlow)"
                strokeWidth="1.2"
                strokeOpacity={lane.opacity}
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </g>

          {/* Primary Group 3: Right Flank Concentric Receding Ribbons */}
          <g transform="translate(1390, 270) rotate(-36) skewX(-10)" className={styles.driftTertiary}>
            {group3Lanes.map((lane, i) => (
              <rect
                key={`g3-${i}`}
                x={-lane.w / 2}
                y={-lane.h / 2}
                width={lane.w}
                height={lane.h}
                rx={lane.r}
                ry={lane.r}
                stroke="url(#strokeGlow)"
                strokeWidth="1.15"
                strokeOpacity={lane.opacity}
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </g>
        </g>
      </svg>
    </div>
  );
};

export default GeometricWireframeBackground;
