import React, { useEffect, useRef, useState, useCallback } from 'react';
import styles from './InternationalSkylineLayers.module.css';

interface InternationalSkylineLayersProps {
  imageLabel: string;
  caption: string;
  isActive?: boolean;
  tabSwitchCount?: number;
}

const DESKTOP_BASE_HEIGHT = 480;

// Global preload cache so tab switches render from browser cache without 1-frame blink
let globalAssetsLoaded = false;

const INTERNATIONAL_LAYER_ASSETS = [
  '/assets/international-layers/background.webp',
  '/assets/international-layers/main-towers.webp',
  '/assets/international-layers/right-tower.webp',
  '/assets/international-layers/foreground.webp',
  '/assets/international-layers/final.webp'
];

export const InternationalSkylineLayers: React.FC<InternationalSkylineLayersProps> = ({
  imageLabel,
  caption,
  isActive = true,
  tabSwitchCount = 0
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Defer image preloading until component actually mounts on the page
  useEffect(() => {
    if (!globalAssetsLoaded && typeof window !== 'undefined') {
      INTERNATIONAL_LAYER_ASSETS.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    }
  }, []);

  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [cardHeight, setCardHeight] = useState<number>(DESKTOP_BASE_HEIGHT);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [loadedCount, setLoadedCount] = useState<number>(() => (globalAssetsLoaded ? 4 : 0));
  const [hasError, setHasError] = useState<boolean>(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  // Entrance animation factor: drives smoothly from 0 to 1 over ~650ms on tab switch
  const [introFactor, setIntroFactor] = useState<number>(0);
  const [isIntroActive, setIsIntroActive] = useState<boolean>(true);

  const handleLayerLoad = useCallback(() => {
    setLoadedCount((prev) => {
      const next = prev + 1;
      if (next >= 4) {
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

  // Measure card height dynamically
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
  // - Held lowered until ~20% of panel is visible
  // - Settled when ~85% of panel is visible
  // - Stop updates when tab is inactive
  const calculateProgress = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const panelHeight = rect.height || DESKTOP_BASE_HEIGHT;

    const visibleRatio = (windowHeight - rect.top) / panelHeight;

    if (visibleRatio <= 0.20) {
      setScrollProgress(0);
    } else if (visibleRatio >= 0.85) {
      setScrollProgress(1);
    } else {
      const raw = (visibleRatio - 0.20) / (0.85 - 0.20);
      setScrollProgress(Math.max(0, Math.min(1, raw)));
    }
  }, []);

  useEffect(() => {
    if (!isActive || typeof window === 'undefined') return;

    let rafId: number | null = null;
    const onScrollOrResize = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        calculateProgress();
        rafId = null;
      });
    };

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });

    calculateProgress();

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, [isActive, calculateProgress]);

  // Entrance animation:
  // On every switch to “International Private Clients” (or reselection), replay the rise
  // from lowered position toward the current scroll position over ~650ms.
  // Stop updates when tab is inactive.
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

    calculateProgress();
    setIntroFactor(0);
    setIsIntroActive(true);

    let startTimestamp: number | null = null;
    const duration = 650; // 650ms replay duration as specified
    let animId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const t = Math.min(1, elapsed / duration);

      // Smooth ease-out power curve: 1 - (1 - t)^2.5
      const eased = 1 - Math.pow(1 - t, 2.5);
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
  }, [isActive, tabSwitchCount, prefersReducedMotion, calculateProgress]);

  // Scroll-driven progress easing (smoothstep)
  const scrollEased = prefersReducedMotion
    ? 1
    : scrollProgress * scrollProgress * (3 - 2 * scrollProgress);

  // Unified position calculation for entrance and scroll
  const effectiveProgress = prefersReducedMotion
    ? 1
    : isIntroActive
    ? introFactor * scrollEased
    : scrollEased;

  const remaining = 1 - effectiveProgress;

  // Offsets:
  // - Main tower group: starts ~30% of image height below resting position
  // - Right tower: starts ~21% below resting position
  // - Mobile: 75% of those offsets
  const mobileMultiplier = isMobile ? 0.75 : 1.0;
  const maxMainOffset = cardHeight * 0.30 * mobileMultiplier;
  const maxRightOffset = cardHeight * 0.21 * mobileMultiplier;

  const mainOffset = prefersReducedMotion ? 0 : maxMainOffset * remaining;
  const rightOffset = prefersReducedMotion ? 0 : maxRightOffset * remaining;

  // Resting frame crossfade:
  // - Fallback while layers load, on error, or under reduced motion (opacity = 1)
  // - Transparent during visible rise (opacity = 0)
  // - Crossfade to final.webp once towers are almost settled (mainOffset <= 5px)
  const isAllLoaded = loadedCount >= 4;
  let finalOpacity = 0;
  if (!isAllLoaded || hasError || prefersReducedMotion) {
    finalOpacity = 1;
  } else if (mainOffset <= 5) {
    finalOpacity = Math.max(0, Math.min(1, (5 - mainOffset) / 5));
  } else {
    finalOpacity = 0;
  }

  return (
    <div
      ref={containerRef}
      className={styles.layersContainer}
      data-testid="international-skyline-panel"
      data-scroll-progress={scrollProgress.toFixed(4)}
      data-main-offset={mainOffset.toFixed(2)}
      data-right-offset={rightOffset.toFixed(2)}
      data-final-opacity={finalOpacity.toFixed(4)}
      data-intro-active={isIntroActive ? 'true' : 'false'}
      data-active={isActive ? 'true' : 'false'}
    >
      <div className={styles.canvasStage} aria-hidden="true">
        {/* Layer 1: Background (sky, top corners of side buildings) - fixed */}
        <img
          src="/assets/international-layers/background.webp"
          alt=""
          className={`${styles.layerImage} ${styles.backgroundLayer}`}
          onLoad={handleLayerLoad}
          onError={handleLayerError}
          loading="eager"
        />

        {/* Layer 2: Main Towers (central and left black skyscrapers) */}
        <img
          src="/assets/international-layers/main-towers.webp"
          alt=""
          data-testid="main-towers-layer"
          className={`${styles.layerImage} ${styles.mainTowersLayer}`}
          style={{
            transform: `translate3d(0, ${mainOffset.toFixed(2)}px, 0)`
          }}
          onLoad={handleLayerLoad}
          onError={handleLayerError}
          loading="eager"
        />

        {/* Layer 3: Right Tower (illuminated angled skyscraper on the right) */}
        <img
          src="/assets/international-layers/right-tower.webp"
          alt=""
          data-testid="right-tower-layer"
          className={`${styles.layerImage} ${styles.rightTowerLayer}`}
          style={{
            transform: `translate3d(0, ${rightOffset.toFixed(2)}px, 0)`
          }}
          onLoad={handleLayerLoad}
          onError={handleLayerError}
          loading="eager"
        />

        {/* Layer 4: Foreground (illuminated glass roof pyramid/atrium corner) - fixed */}
        <img
          src="/assets/international-layers/foreground.webp"
          alt=""
          className={`${styles.layerImage} ${styles.foregroundLayer}`}
          onLoad={handleLayerLoad}
          onError={handleLayerError}
          loading="eager"
        />

        {/* Resting / Fallback Layer: final.webp */}
        <img
          src="/assets/international-layers/final.webp"
          alt=""
          data-testid="final-composite"
          className={`${styles.layerImage} ${styles.finalLayer}`}
          style={{ opacity: finalOpacity }}
          loading="eager"
        />
      </div>

      {/* Caption Overlay - Fixed above artwork */}
      <div className={styles.imageOverlay}>
        <span className={styles.imageTag}>{imageLabel}</span>
        <h3 className={styles.imageHeadline}>{caption}</h3>
      </div>
    </div>
  );
};
