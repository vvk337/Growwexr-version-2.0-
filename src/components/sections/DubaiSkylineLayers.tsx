import React, { useEffect, useRef, useState, useCallback } from 'react';
import styles from './DubaiSkylineLayers.module.css';

interface DubaiSkylineLayersProps {
  imageLabel: string;
  caption: string;
  isActive?: boolean;
  tabSwitchCount?: number;
}

const DESKTOP_BASE_HEIGHT = 480;

// Base offsets at desktop height (480px)
const OFFSET_BURJ_KHALIFA = 160; // 160px start rise on desktop
const OFFSET_BURJ_AL_ARAB = 7;
const OFFSET_DUBAI_FRAME = 7;
const OFFSET_MUSEUM = 3;

// Global preload cache tracker so tab switches render from cache without 1-frame flash
let globalAssetsLoaded = false;

const DUBAI_LAYER_ASSETS = [
  '/assets/dubai-layers/background.webp',
  '/assets/dubai-layers/burj-khalifa.webp',
  '/assets/dubai-layers/burj-al-arab.webp',
  '/assets/dubai-layers/dubai-frame.webp',
  '/assets/dubai-layers/museum-of-the-future.webp',
  '/assets/dubai-layers/final.webp'
];

export const DubaiSkylineLayers: React.FC<DubaiSkylineLayersProps> = ({
  imageLabel,
  caption,
  isActive = true,
  tabSwitchCount = 0
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Defer image preloading until component actually mounts on the page
  useEffect(() => {
    if (!globalAssetsLoaded && typeof window !== 'undefined') {
      DUBAI_LAYER_ASSETS.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    }
  }, []);

  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [cardHeight, setCardHeight] = useState<number>(DESKTOP_BASE_HEIGHT);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [loadedCount, setLoadedCount] = useState<number>(() => (globalAssetsLoaded ? 5 : 0));
  const [hasError, setHasError] = useState<boolean>(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  // Tab-switch / entrance animation state: plays smoothly from 0 to target progress on mount
  const [introFactor, setIntroFactor] = useState<number>(0);
  const [isIntroActive, setIsIntroActive] = useState<boolean>(true);

  const handleLayerLoad = useCallback(() => {
    setLoadedCount((prev) => {
      const next = prev + 1;
      if (next >= 5) {
        globalAssetsLoaded = true;
      }
      return next;
    });
  }, []);

  const handleLayerError = useCallback(() => {
    setHasError(true);
  }, []);

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const onChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', onChange);
      return () => mediaQuery.removeEventListener('change', onChange);
    } else {
      mediaQuery.addListener(onChange);
      return () => mediaQuery.removeListener(onChange);
    }
  }, []);

  // Measure card height and responsive breakpoint dynamically
  useEffect(() => {
    if (!containerRef.current || typeof window === 'undefined') return;

    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        if (rect.height > 0) {
          setCardHeight(rect.height);
        }
      }
      setIsMobile(window.innerWidth < 768);
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.height > 0) {
          setCardHeight(entry.contentRect.height);
        }
      }
      setIsMobile(window.innerWidth < 768);
    });

    resizeObserver.observe(containerRef.current);
    window.addEventListener('resize', updateDimensions, { passive: true });

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  // Scroll listener for progress calculation:
  // - Hold the tower at lowered position until ~20% of the panel is visible.
  // - Map its rise to scroll progress so it settles when ~85% of the panel is visible.
  // - Reverses smoothly when scrolling back up.
  // - Stops updates when tab is inactive.
  useEffect(() => {
    if (!isActive || typeof window === 'undefined') return;

    let rafId: number | null = null;

    const calculateProgress = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const panelHeight = rect.height || DESKTOP_BASE_HEIGHT;

      // Fraction of panel scrolled into the viewport from the bottom
      const visibleRatio = (windowHeight - rect.top) / panelHeight;

      if (visibleRatio <= 0.20) {
        // Held at lowered position until ~20% visible
        setScrollProgress(0);
      } else if (visibleRatio >= 0.85) {
        // Settled when ~85% visible (remains settled when further in view or scrolled past)
        setScrollProgress(1);
      } else {
        // Linear scroll progress between 20% and 85% visible
        const raw = (visibleRatio - 0.20) / (0.85 - 0.20);
        setScrollProgress(Math.max(0, Math.min(1, raw)));
      }
    };

    const onScrollOrResize = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        calculateProgress();
        rafId = null;
      });
    };

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });

    // Initial calculation
    calculateProgress();

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, [isActive]);

  // Play animation from start on mount / tab switch:
  // Smoothly drives introFactor from 0 to 1 over ~1050ms
  useEffect(() => {
    if (!isActive) {
      setIsIntroActive(false);
      return;
    }

    if (prefersReducedMotion) {
      setIntroFactor(1);
      setIsIntroActive(false);
      return;
    }

    setIntroFactor(0);
    setIsIntroActive(true);

    let startTimestamp: number | null = null;
    const duration = 1050; // 1050ms noticeable, luxurious rise
    let animId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const t = Math.min(1, elapsed / duration);

      // Smooth ease-out power curve
      const eased = 1 - Math.pow(1 - t, 2.2);
      setIntroFactor(eased);

      if (t < 1) {
        animId = requestAnimationFrame(step);
      } else {
        setIsIntroActive(false);
      }
    };

    animId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isActive, tabSwitchCount, prefersReducedMotion]);

  // Scroll-driven progress easing (smoothstep)
  const scrollEased = prefersReducedMotion
    ? 1
    : scrollProgress * scrollProgress * (3 - 2 * scrollProgress);

  // When intro animation is active on tab switch, scale with introFactor
  const effectiveEased = isIntroActive
    ? introFactor * scrollEased
    : scrollEased;

  const remaining = 1 - effectiveEased;

  // Scale offsets proportionally with panel height
  const scale = cardHeight / DESKTOP_BASE_HEIGHT;
  // On mobile, use about 75% of the proportional desktop movement
  const mobileMultiplier = isMobile ? 0.75 : 1.0;

  const maxKhalifaOffset = OFFSET_BURJ_KHALIFA * scale * mobileMultiplier;
  const khalifaOffset = prefersReducedMotion ? 0 : maxKhalifaOffset * remaining;

  const alArabOffset = prefersReducedMotion
    ? 0
    : OFFSET_BURJ_AL_ARAB * scale * remaining;
  const frameOffset = prefersReducedMotion
    ? 0
    : OFFSET_DUBAI_FRAME * scale * remaining;
  const museumOffset = prefersReducedMotion
    ? 0
    : OFFSET_MUSEUM * scale * remaining;

  // Resting frame crossfade:
  // - While assets are loading, on error, or under reduced motion: show final.webp (opacity = 1)
  // - Once assets are loaded: static fallback is fully transparent (opacity = 0) during the visible rise.
  // - Begin the final.webp crossfade ONLY once the tower is within 5px of its resting position (khalifaOffset <= 5).
  const isAllLoaded = loadedCount >= 5;
  let finalOpacity = 0;
  if (!isAllLoaded || hasError || prefersReducedMotion) {
    finalOpacity = 1;
  } else if (khalifaOffset <= 5) {
    finalOpacity = Math.max(0, Math.min(1, (5 - khalifaOffset) / 5));
  } else {
    finalOpacity = 0;
  }

  return (
    <div
      ref={containerRef}
      className={styles.layersContainer}
      data-testid="dubai-skyline-panel"
      data-scroll-progress={scrollProgress.toFixed(4)}
      data-khalifa-offset={khalifaOffset.toFixed(2)}
      data-final-opacity={finalOpacity.toFixed(4)}
      data-intro-active={isIntroActive ? 'true' : 'false'}
    >
      <div className={styles.canvasStage} aria-hidden="true">
        {/* Layer 1: Background (sky, distant skyline, trees, water) - fixed */}
        <img
          src="/assets/dubai-layers/background.webp"
          alt=""
          className={`${styles.layerImage} ${styles.backgroundLayer}`}
          onLoad={handleLayerLoad}
          onError={handleLayerError}
          loading="eager"
        />

        {/* Layer 2: Burj Khalifa with ground clipping */}
        <div className={`${styles.clipWrapper} ${styles.khalifaWrapper}`}>
          <img
            src="/assets/dubai-layers/burj-khalifa.webp"
            alt=""
            data-testid="burj-khalifa-layer"
            className={`${styles.layerImage} ${styles.movingBuilding}`}
            style={{
              transform: `translate3d(0, ${khalifaOffset.toFixed(2)}px, 0)`
            }}
            onLoad={handleLayerLoad}
            onError={handleLayerError}
            loading="eager"
          />
        </div>

        {/* Layer 3A: Burj Al Arab with ground clipping */}
        <div className={`${styles.clipWrapper} ${styles.alArabWrapper}`}>
          <img
            src="/assets/dubai-layers/burj-al-arab.webp"
            alt=""
            className={`${styles.layerImage} ${styles.movingBuilding}`}
            style={{
              transform: `translate3d(0, ${alArabOffset.toFixed(2)}px, 0)`
            }}
            onLoad={handleLayerLoad}
            onError={handleLayerError}
            loading="eager"
          />
        </div>

        {/* Layer 3B: Dubai Frame with ground clipping */}
        <div className={`${styles.clipWrapper} ${styles.frameWrapper}`}>
          <img
            src="/assets/dubai-layers/dubai-frame.webp"
            alt=""
            className={`${styles.layerImage} ${styles.movingBuilding}`}
            style={{
              transform: `translate3d(0, ${frameOffset.toFixed(2)}px, 0)`
            }}
            onLoad={handleLayerLoad}
            onError={handleLayerError}
            loading="eager"
          />
        </div>

        {/* Layer 4: Museum of the Future (in front of the tower) with ground clipping */}
        <div className={`${styles.clipWrapper} ${styles.museumWrapper}`}>
          <img
            src="/assets/dubai-layers/museum-of-the-future.webp"
            alt=""
            className={`${styles.layerImage} ${styles.movingBuilding}`}
            style={{
              transform: `translate3d(0, ${museumOffset.toFixed(2)}px, 0)`
            }}
            onLoad={handleLayerLoad}
            onError={handleLayerError}
            loading="eager"
          />
        </div>

        {/* Resting / Fallback Layer: final.webp */}
        <img
          src="/assets/dubai-layers/final.webp"
          alt=""
          data-testid="final-composite"
          className={`${styles.layerImage} ${styles.finalLayer}`}
          style={{ opacity: finalOpacity }}
          loading="eager"
        />
      </div>

      {/* Existing Caption Overlay - Fixed & Accessible */}
      <div className={styles.imageOverlay}>
        <span className={styles.imageTag}>{imageLabel}</span>
        <h3 className={styles.imageHeadline}>{caption}</h3>
      </div>
    </div>
  );
};
