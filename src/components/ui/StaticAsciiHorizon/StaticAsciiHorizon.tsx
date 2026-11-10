import React, { useEffect, useRef } from 'react';
import styles from './StaticAsciiHorizon.module.css';

export interface StaticAsciiHorizonProps {
  className?: string;
  cellSize?: number;
  density?: number;
  currencies?: string[];
}

// Pseudo-random 2D hash to create deterministic organic variation (identical to shader noise)
function hash2D(x: number, y: number): number {
  const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453123;
  return n - Math.floor(n);
}

// Global world currencies mapping across luminance tiers
const DEFAULT_DENSE = ['$', '€', '£', '₹', '¥', '₩', '₿'];
const DEFAULT_MID = ['$', '€', '£', '¥', '₹', '₩'];
const DEFAULT_LIGHT = ['¥', '£', '¢', '₣', '$', '€'];
const DEFAULT_SPARSE = ['¢', '·', '¤', '¥'];

export const StaticAsciiHorizon: React.FC<StaticAsciiHorizonProps> = ({
  className = '',
  cellSize = 18,
  density = 0.8,
  currencies
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let resizeTimer: number;

    const render = () => {
      const rect = container.getBoundingClientRect();
      const width = Math.max(1, rect.width);
      const height = Math.max(1, rect.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const cellW = cellSize;
      const cellH = cellSize;
      const cols = Math.ceil(width / cellW);
      const rows = Math.ceil(height / cellH);

      const densePool = currencies && currencies.length ? currencies : DEFAULT_DENSE;
      const midPool = currencies && currencies.length ? currencies : DEFAULT_MID;
      const lightPool = currencies && currencies.length ? currencies : DEFAULT_LIGHT;
      const sparsePool = currencies && currencies.length ? currencies : DEFAULT_SPARSE;

      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const aspect = width / height;
      const span = 0.5 * Math.max(aspect, 1.0);

      // Render deterministic ASCII grid (Inverted Horizon: sun and glow meeting at bottom seam)
      for (let r = 0; r < rows; r++) {
        const y = (r + 0.5) * cellH;
        // Inverted coordinate: 0 at top, 1 at bottom
        const ny = y / height;
        // Normalized p: x from -span to span, y from -0.5 to 0.5 (flipped so +0.5 is bottom)
        const py = (ny - 0.5);

        for (let c = 0; c < cols; c++) {
          const x = (c + 0.5) * cellW;
          const nx = ((c + 0.5) / cols - 0.5) * 2;
          const px = nx * span;

          // Inverted horizon curve: arch arcs gently from the upper-middle,
          // glowing downwards towards the bottom border
          const xNorm = px / span;
          // Arch in inverted space
          const arch = -0.15 + 0.22 * xNorm * xNorm;
          const edge = py - arch;

          // Sun center positioned near bottom center (x = 0, y = 0.52 in inverted space)
          const dx = px;
          const dy = (py - 0.52);
          const sunDist = Math.sqrt((dx * dx) / (0.95 * span * 0.95 * span) + (dy * dy) / (0.75 * 0.75));

          const sunIntensity = Math.max(0, 1.0 - sunDist * 1.15);
          const edgeIntensity = Math.min(Math.max((edge + 0.15) / 0.55, 0), 1);

          // Combined luminance
          let lum = edgeIntensity * 0.55 + sunIntensity * 0.65;
          lum = Math.min(Math.max(lum, 0), 1);

          // Hash jitter for procedural texture variation
          const noiseVal = hash2D(c, r);
          const presence = noiseVal < density * (0.35 + lum * 0.95);
          if (!presence || lum < 0.05) continue;

          // Select currency symbol based on tone & deterministic hash
          const wobble = (hash2D(c * 2.31, r * 1.73) - 0.5) * 0.15;
          const tone = Math.min(Math.max(Math.pow(lum, 0.8) + wobble, 0), 1);

          const symbolPick = hash2D(c * 5.17 + 13.7, r * 7.43 + 29.1);
          let char: string;

          if (tone > 0.65) {
            // Peak horizon glow: dense world currencies (replaces #, @, 8)
            char = densePool[Math.floor(symbolPick * densePool.length)];
          } else if (tone > 0.38) {
            // Mid-high glow: core currencies (replaces X, 0, S)
            char = midPool[Math.floor(symbolPick * midPool.length)];
          } else if (tone > 0.18) {
            // Low-mid field: light currency glyphs (replaces x, +)
            char = lightPool[Math.floor(symbolPick * lightPool.length)];
          } else {
            // Dissolves & upper periphery (replaces =, .)
            char = sparsePool[Math.floor(symbolPick * sparsePool.length)];
          }

          // Dynamic font sizing & weight matching the original ASCII density
          const fontSize = Math.round(cellSize * (tone > 0.65 ? 0.88 : 0.80));
          const fontWeight = tone > 0.65 ? '700' : '600';
          ctx.font = `${fontWeight} ${fontSize}px "Geist Mono", SFMono-Regular, Menlo, Monaco, Consolas, "Segoe UI Symbol", monospace`;

          // Color palette based on intensity
          // High intensity (near bottom seam): white/ice
          // Medium-high: bright cyan / sky blue
          // Medium: rich royal blue
          // Low: subtle deep navy blue
          let fill: string;
          let alpha: number;

          if (tone > 0.82) {
            fill = '#f6f8ff';
            alpha = 0.92;
          } else if (tone > 0.62) {
            fill = '#a5d8ff';
            alpha = 0.85;
          } else if (tone > 0.40) {
            fill = '#38bdf8';
            alpha = 0.78;
          } else if (tone > 0.22) {
            fill = '#1e3fd8';
            alpha = 0.65;
          } else {
            fill = '#1c3b7a';
            alpha = 0.45;
          }

          ctx.fillStyle = fill;
          ctx.globalAlpha = alpha;
          ctx.fillText(char, x, y);
        }
      }

      ctx.restore();
    };

    // Initial render
    render();

    // Debounced resize handler - only redraws on actual window resize
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(render, 120);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, [cellSize, density, currencies]);

  return (
    <div ref={containerRef} className={`${styles.staticAsciiContainer} ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} className={styles.staticCanvas} />
      <div className={styles.ambientGlow} />
    </div>
  );
};

export default StaticAsciiHorizon;

