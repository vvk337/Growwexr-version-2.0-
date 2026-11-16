import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

/**
 * 1. Spot Gold (XAU/USD) - Refined 3D Gold Bullion Ingot
 * Spot gold has no official corporate logo; this refined vector bullion ingot
 * features metallic gold gradients, polished specular highlights, and 999.9 fineness hallmark.
 */
export const GoldBarIcon: React.FC<IconProps> = ({ className, size = 30 }) => (
  <svg
    viewBox="0 0 32 32"
    width={size}
    height={size}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="goldTopGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FFFBEB" />
        <stop offset="25%" stopColor="#FDE047" />
        <stop offset="65%" stopColor="#EAB308" />
        <stop offset="100%" stopColor="#CA8A04" />
      </linearGradient>
      <linearGradient id="goldFrontGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#EAB308" />
        <stop offset="40%" stopColor="#CA8A04" />
        <stop offset="100%" stopColor="#92400E" />
      </linearGradient>
      <linearGradient id="goldLeftGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#854D0E" />
        <stop offset="100%" stopColor="#CA8A04" />
      </linearGradient>
      <linearGradient id="goldRightGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#EAB308" />
        <stop offset="100%" stopColor="#854D0E" />
      </linearGradient>
      <linearGradient id="goldGleamGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
        <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0.1" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
      </linearGradient>
    </defs>

    {/* Ambient Floor Shadow */}
    <ellipse cx="16" cy="24.5" rx="13.5" ry="3.5" fill="#000000" fillOpacity="0.45" />

    {/* Front Sloped Face */}
    <polygon points="3.5,23.5 28.5,23.5 25.5,17.5 6.5,17.5" fill="url(#goldFrontGrad)" />

    {/* Left Sloped Bevel */}
    <polygon points="3.5,23.5 6.5,17.5 9,10 5,14" fill="url(#goldLeftGrad)" />

    {/* Right Sloped Bevel */}
    <polygon points="28.5,23.5 25.5,17.5 23,10 27,14" fill="url(#goldRightGrad)" />

    {/* Top Surface */}
    <polygon points="9,10 23,10 25.5,17.5 6.5,17.5" fill="url(#goldTopGrad)" />

    {/* Mint Fineness Stamped Frame */}
    <polygon
      points="10,11.2 22,11.2 24,16.4 8,16.4"
      fill="none"
      stroke="#CA8A04"
      strokeWidth="0.6"
      strokeOpacity="0.6"
    />

    {/* Micro Ingot Hallmarks */}
    <text
      x="16"
      y="14"
      fontSize="2.6"
      fontWeight="800"
      fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
      fill="#78350F"
      textAnchor="middle"
      letterSpacing="0.4"
    >
      999.9
    </text>
    <text
      x="16"
      y="16"
      fontSize="1.9"
      fontWeight="700"
      fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
      fill="#854D0E"
      textAnchor="middle"
      letterSpacing="0.3"
    >
      FINE GOLD
    </text>

    {/* Specular Reflection Gleam */}
    <polygon points="9,10 14,10 11,17.5 6.5,17.5" fill="url(#goldGleamGrad)" />

    {/* Top Ridge Specular Line */}
    <line x1="9" y1="10" x2="23" y2="10" stroke="#FFFBEB" strokeWidth="0.75" strokeLinecap="round" />
  </svg>
);

/**
 * 2. EUR/USD - Overlapping European Union & United States Flag Icons
 * Features the official 12-star European circle on blue field and the authentic Stars & Stripes
 * in standard overlapping currency pair arrangement.
 */
export const EurUsdIcon: React.FC<IconProps> = ({ className, size = 30 }) => (
  <svg
    viewBox="0 0 32 30"
    width={size}
    height={size}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <clipPath id="euClipPath">
        <circle cx="10.5" cy="11.5" r="9.5" />
      </clipPath>
      <clipPath id="usClipEurPath">
        <circle cx="21.5" cy="18.5" r="9.5" />
      </clipPath>
    </defs>

    {/* European Union Flag Disc */}
    <g clipPath="url(#euClipPath)">
      <rect x="1" y="2" width="19" height="19" fill="#003399" />
      <g fill="#FFCC00">
        <circle cx="10.5" cy="5.5" r="0.8" />
        <circle cx="13.5" cy="6.3" r="0.8" />
        <circle cx="15.7" cy="8.5" r="0.8" />
        <circle cx="16.5" cy="11.5" r="0.8" />
        <circle cx="15.7" cy="14.5" r="0.8" />
        <circle cx="13.5" cy="16.7" r="0.8" />
        <circle cx="10.5" cy="17.5" r="0.8" />
        <circle cx="7.5" cy="16.7" r="0.8" />
        <circle cx="5.3" cy="14.5" r="0.8" />
        <circle cx="4.5" cy="11.5" r="0.8" />
        <circle cx="5.3" cy="8.5" r="0.8" />
        <circle cx="7.5" cy="6.3" r="0.8" />
      </g>
    </g>
    <circle cx="10.5" cy="11.5" r="9.5" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="0.8" />

    {/* United States Flag Disc (Overlapping with Navy Halo) */}
    <circle cx="21.5" cy="18.5" r="10.5" fill="#070C16" />
    <g clipPath="url(#usClipEurPath)">
      <rect x="12" y="9" width="19" height="19" fill="#FFFFFF" />
      {/* 7 Red Stripes */}
      <rect x="12" y="9" width="19" height="1.46" fill="#B22234" />
      <rect x="12" y="11.92" width="19" height="1.46" fill="#B22234" />
      <rect x="12" y="14.84" width="19" height="1.46" fill="#B22234" />
      <rect x="12" y="17.76" width="19" height="1.46" fill="#B22234" />
      <rect x="12" y="20.68" width="19" height="1.46" fill="#B22234" />
      <rect x="12" y="23.6" width="19" height="1.46" fill="#B22234" />
      <rect x="12" y="26.52" width="19" height="1.46" fill="#B22234" />
      {/* Blue Canton */}
      <rect x="12" y="9" width="8.5" height="10.2" fill="#3C3B6E" />
      {/* Canton Stars Grid */}
      <g fill="#FFFFFF">
        <circle cx="13.8" cy="11" r="0.55" />
        <circle cx="15.8" cy="11" r="0.55" />
        <circle cx="17.8" cy="11" r="0.55" />
        <circle cx="19.5" cy="11" r="0.55" />
        <circle cx="14.8" cy="12.7" r="0.55" />
        <circle cx="16.8" cy="12.7" r="0.55" />
        <circle cx="18.8" cy="12.7" r="0.55" />
        <circle cx="13.8" cy="14.4" r="0.55" />
        <circle cx="15.8" cy="14.4" r="0.55" />
        <circle cx="17.8" cy="14.4" r="0.55" />
        <circle cx="19.5" cy="14.4" r="0.55" />
        <circle cx="14.8" cy="16.1" r="0.55" />
        <circle cx="16.8" cy="16.1" r="0.55" />
        <circle cx="18.8" cy="16.1" r="0.55" />
        <circle cx="13.8" cy="17.8" r="0.55" />
        <circle cx="15.8" cy="17.8" r="0.55" />
        <circle cx="17.8" cy="17.8" r="0.55" />
        <circle cx="19.5" cy="17.8" r="0.55" />
      </g>
    </g>
    <circle cx="21.5" cy="18.5" r="9.5" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="0.8" />
  </svg>
);

/**
 * 3. GBP/USD - Overlapping United Kingdom & United States Flag Icons
 * Features the authentic UK Union Jack flag disc and United States flag disc
 * in standard overlapping currency pair arrangement.
 */
export const GbpUsdIcon: React.FC<IconProps> = ({ className, size = 30 }) => (
  <svg
    viewBox="0 0 32 30"
    width={size}
    height={size}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <clipPath id="ukClipPath">
        <circle cx="10.5" cy="11.5" r="9.5" />
      </clipPath>
      <clipPath id="usClipGbpPath">
        <circle cx="21.5" cy="18.5" r="9.5" />
      </clipPath>
    </defs>

    {/* United Kingdom Flag Disc */}
    <g clipPath="url(#ukClipPath)">
      <rect x="1" y="2" width="19" height="19" fill="#012169" />
      {/* White Saltire (St Andrew) */}
      <path d="M1 2L20 21M20 2L1 21" stroke="#FFFFFF" strokeWidth="3.8" />
      {/* Red Saltire (St Patrick) */}
      <path d="M1 2L20 21M20 2L1 21" stroke="#C8102E" strokeWidth="1.8" />
      {/* White St George Border */}
      <path d="M10.5 2V21M1 11.5H20" stroke="#FFFFFF" strokeWidth="5.4" />
      {/* Red St George Cross */}
      <path d="M10.5 2V21M1 11.5H20" stroke="#C8102E" strokeWidth="3.2" />
    </g>
    <circle cx="10.5" cy="11.5" r="9.5" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="0.8" />

    {/* United States Flag Disc (Overlapping with Navy Halo) */}
    <circle cx="21.5" cy="18.5" r="10.5" fill="#070C16" />
    <g clipPath="url(#usClipGbpPath)">
      <rect x="12" y="9" width="19" height="19" fill="#FFFFFF" />
      {/* 7 Red Stripes */}
      <rect x="12" y="9" width="19" height="1.46" fill="#B22234" />
      <rect x="12" y="11.92" width="19" height="1.46" fill="#B22234" />
      <rect x="12" y="14.84" width="19" height="1.46" fill="#B22234" />
      <rect x="12" y="17.76" width="19" height="1.46" fill="#B22234" />
      <rect x="12" y="20.68" width="19" height="1.46" fill="#B22234" />
      <rect x="12" y="23.6" width="19" height="1.46" fill="#B22234" />
      <rect x="12" y="26.52" width="19" height="1.46" fill="#B22234" />
      {/* Blue Canton */}
      <rect x="12" y="9" width="8.5" height="10.2" fill="#3C3B6E" />
      {/* Canton Stars Grid */}
      <g fill="#FFFFFF">
        <circle cx="13.8" cy="11" r="0.55" />
        <circle cx="15.8" cy="11" r="0.55" />
        <circle cx="17.8" cy="11" r="0.55" />
        <circle cx="19.5" cy="11" r="0.55" />
        <circle cx="14.8" cy="12.7" r="0.55" />
        <circle cx="16.8" cy="12.7" r="0.55" />
        <circle cx="18.8" cy="12.7" r="0.55" />
        <circle cx="13.8" cy="14.4" r="0.55" />
        <circle cx="15.8" cy="14.4" r="0.55" />
        <circle cx="17.8" cy="14.4" r="0.55" />
        <circle cx="19.5" cy="14.4" r="0.55" />
        <circle cx="14.8" cy="16.1" r="0.55" />
        <circle cx="16.8" cy="16.1" r="0.55" />
        <circle cx="18.8" cy="16.1" r="0.55" />
        <circle cx="13.8" cy="17.8" r="0.55" />
        <circle cx="15.8" cy="17.8" r="0.55" />
        <circle cx="17.8" cy="17.8" r="0.55" />
        <circle cx="19.5" cy="17.8" r="0.55" />
      </g>
    </g>
    <circle cx="21.5" cy="18.5" r="9.5" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="0.8" />
  </svg>
);

/**
 * 4. US 500 CFD - Neutral Representative Benchmark Icon
 * In accordance with regulatory & IP compliance, broker CFDs are strictly not branded
 * with registered exchange index trademarks (e.g. S&P 500).
 * Features a neutral composite equity benchmark curve and 500 indicator.
 */
export const Us500CfdIcon: React.FC<IconProps> = ({ className, size = 30 }) => (
  <svg
    viewBox="0 0 32 32"
    width={size}
    height={size}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="us500AreaGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.0" />
      </linearGradient>
    </defs>

    {/* Neutral Index Disc Backdrop */}
    <circle cx="16" cy="16" r="14.5" fill="#0B1322" stroke="rgba(255, 255, 255, 0.16)" strokeWidth="1" />

    {/* Benchmark Reference Grid Line */}
    <line x1="7" y1="16" x2="25" y2="16" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="0.8" strokeDasharray="1.5 1.5" />

    {/* Benchmark Area Fill */}
    <path d="M7 20.5L12 17.5L16 19L20.5 13.5L25 10.5V22H7Z" fill="url(#us500AreaGrad)" />

    {/* Ascending Composite Benchmark Trendline */}
    <path
      d="M7 20.5L12 17.5L16 19L20.5 13.5L25 10.5"
      stroke="#38BDF8"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Terminal Anchor Dot */}
    <circle cx="25" cy="10.5" r="1.8" fill="#FFFFFF" />

    {/* Neutral CFD Index Identifier */}
    <text
      x="16"
      y="27"
      fontSize="4.8"
      fontWeight="700"
      fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
      fill="#94A3B8"
      textAnchor="middle"
      letterSpacing="0.5"
    >
      500
    </text>
  </svg>
);

/**
 * 5. US 100 CFD - Neutral Representative Benchmark Icon
 * In accordance with regulatory & IP compliance, broker CFDs are strictly not branded
 * with registered exchange index trademarks (e.g. Nasdaq-100).
 * Features neutral tech composite momentum columns, trajectory line, and 100 indicator.
 */
export const Us100CfdIcon: React.FC<IconProps> = ({ className, size = 30 }) => (
  <svg
    viewBox="0 0 32 32"
    width={size}
    height={size}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="us100BarGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#818CF8" />
        <stop offset="100%" stopColor="#4F46E5" />
      </linearGradient>
    </defs>

    {/* Neutral Index Disc Backdrop */}
    <circle cx="16" cy="16" r="14.5" fill="#081426" stroke="rgba(129, 140, 248, 0.25)" strokeWidth="1" />

    {/* Tech Momentum Columns */}
    <rect x="8.5" y="16.5" width="2.2" height="5" rx="0.8" fill="url(#us100BarGrad)" fillOpacity="0.6" />
    <rect x="12.5" y="13.5" width="2.2" height="8" rx="0.8" fill="url(#us100BarGrad)" fillOpacity="0.8" />
    <rect x="16.5" y="10.5" width="2.2" height="11" rx="0.8" fill="#A5B4FC" />

    {/* Ascending Tech Trajectory Line */}
    <path d="M8 18L13 14L17.5 11L23.5 7.5" stroke="#C7D2FE" strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="23.5" cy="7.5" r="1.6" fill="#FFFFFF" />

    {/* Neutral CFD Index Identifier */}
    <text
      x="16"
      y="27"
      fontSize="4.8"
      fontWeight="700"
      fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
      fill="#A5B4FC"
      textAnchor="middle"
      letterSpacing="0.5"
    >
      100
    </text>
  </svg>
);

/**
 * 6. Bitcoin (BTC/USD) - Official Recognised Bitcoin ₿ Logo
 * Authentic Satoshi Nakamoto / Bitboy public domain Bitcoin coin mark in brand #F7931A orange
 * with tilted white ₿ glyph.
 */
export const BitcoinIcon: React.FC<IconProps> = ({ className, size = 30 }) => (
  <svg
    viewBox="0 0 32 32"
    width={size}
    height={size}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <circle cx="16" cy="16" r="15" fill="#F7931A" />
    <path
      fill="#FFFFFF"
      d="M22.5 13.7c.3-2-1.2-3.1-3.3-3.8l.7-2.7-1.7-.4-.7 2.6c-.4-.1-.9-.2-1.4-.3l.7-2.6-1.7-.4-.7 2.7c-.4-.1-.7-.2-1.1-.3l-2.3-.6-.5 1.8s1.2.3 1.2.3c.7.2.8.7.8 1.1l-.8 3.2c.1 0 .1 0 .2.1l-.2-.1-1.1 4.5c-.1.2-.3.6-.8.4 0 0-1.2-.3-1.2-.3l-.8 2 2.2.5c.4.1.8.2 1.2.3l-.7 2.8 1.7.4.7-2.7c.5.1.9.2 1.4.3l-.7 2.7 1.7.4.7-2.8c2.9.5 5.1.3 6-2.3.7-2.1-.1-3.3-1.5-4.1 1.1-.3 1.9-1 2.1-2.5zm-3.7 5.4c-.5 2.1-4 1-5.1.7l.9-3.7c1.1.3 4.8.8 4.2 3zm.5-5.5c-.5 1.9-3.4.9-4.3.7l.8-3.3c.9.2 4 .7 3.5 2.6z"
    />
  </svg>
);

