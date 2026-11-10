import React from 'react';
import styles from './GeometricWireframeBackground.module.css';

interface GeometricWireframeBackgroundProps {
  className?: string;
}

export const GeometricWireframeBackground: React.FC<GeometricWireframeBackgroundProps> = ({ className = '' }) => {
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
          {/* Main Background Gradient: Seamless blend from #f0f7fc (AboutIntro) to #132856 (ValuesSection) */}
          <linearGradient id="servicesBgGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f0f7fc" />
            <stop offset="14%" stopColor="#e2ecf5" />
            <stop offset="35%" stopColor="#bfd6e8" />
            <stop offset="60%" stopColor="#85a7c4" />
            <stop offset="84%" stopColor="#3f6287" />
            <stop offset="100%" stopColor="#132856" />
          </linearGradient>

          {/* Luminous Ambient Light Wash on Left */}
          <radialGradient id="leftAmbientGlow" cx="20%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="38%" stopColor="#eaf3fb" stopOpacity="0.5" />
            <stop offset="72%" stopColor="#bfd5e6" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#85a7c4" stopOpacity="0" />
          </radialGradient>

          {/* Subtle Secondary Sheen on Right */}
          <radialGradient id="rightAmbientGlow" cx="82%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#dce8f5" stopOpacity="0.4" />
            <stop offset="55%" stopColor="#85a7c4" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#132856" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 1. Base Slate-to-Navy Atmospheric Gradient */}
        <rect width="100%" height="100%" fill="url(#servicesBgGradient)" />

        {/* 2. Soft Ambient Diffuse Light Glow on Left */}
        <rect width="100%" height="100%" fill="url(#leftAmbientGlow)" />

        {/* 3. Subtle Atmospheric Sheen on Right */}
        <rect width="100%" height="100%" fill="url(#rightAmbientGlow)" />
      </svg>
    </div>
  );
};

export default GeometricWireframeBackground;
