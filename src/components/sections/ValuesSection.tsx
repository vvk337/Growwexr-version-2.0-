import React, { useEffect, useRef, lazy, Suspense } from 'react';
import { valuesData, valuesCenterImage } from '../../content/values';
import { AnimateIn } from '../ui/AnimateIn';
import styles from './ValuesSection.module.css';

// Code-split heavy WebGL shader background so it loads asynchronously
const GradientASCII = lazy(() => import('../ui/GradientASCII').then(m => ({ default: m.GradientASCII })));

export const ValuesSection: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Left column: Step 01 (top) and Step 03 (bottom)
  // Right column: Step 02 (top) and Step 04 (bottom)
  // Matches top-row reveal (01, 02 at progress 0.20) and bottom-row reveal (03, 04 at progress 0.32)
  const leftValues = [valuesData[0], valuesData[2]];
  const rightValues = [valuesData[1], valuesData[3]];

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      grid.style.setProperty('--p-center', '1');
      grid.style.setProperty('--p-center-opacity', '1');
      grid.style.setProperty('--p-left-1', '1');
      grid.style.setProperty('--p-left-2', '1');
      grid.style.setProperty('--p-right-1', '1');
      grid.style.setProperty('--p-right-2', '1');
      cardRefs.current.forEach((card) => {
        if (card) {
          card.style.setProperty('--mobile-card-p', '1');
        }
      });
      return;
    }

    let rafId: number | null = null;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max);

    const updateScrollProgress = () => {
      if (!grid) return;
      const rect = grid.getBoundingClientRect();
      const vh = window.innerHeight;

      // Always update center card
      const startY = vh * 0.90;
      const endY = vh * 0.25;
      const rawProgress = clamp((startY - rect.top) / (startY - endY), 0, 1);

      // Center card pops up with slight offset delay (progress 0.06 to 0.75)
      const centerT = clamp((rawProgress - 0.06) / (0.75 - 0.06), 0, 1);
      const centerEase = easeOutCubic(centerT);
      const centerOpacity = clamp(centerT * 1.6, 0, 1);

      grid.style.setProperty('--p-center', centerEase.toFixed(4));
      grid.style.setProperty('--p-center-opacity', centerOpacity.toFixed(4));

      if (window.innerWidth >= 1024) {
        // Desktop: Side text boxes originate from behind center card in tandem
        // Top cards (Left 1, Right 1) start emerging at 0.20, finish at 0.85
        const topT = clamp((rawProgress - 0.20) / (0.85 - 0.20), 0, 1);
        const topEase = easeOutCubic(topT);

        // Bottom cards (Left 2, Right 2) start emerging at 0.32, finish at 1.00
        const bottomT = clamp((rawProgress - 0.32) / (1.00 - 0.32), 0, 1);
        const bottomEase = easeOutCubic(bottomT);

        grid.style.setProperty('--p-left-1', topEase.toFixed(4));
        grid.style.setProperty('--p-left-2', bottomEase.toFixed(4));
        grid.style.setProperty('--p-right-1', topEase.toFixed(4));
        grid.style.setProperty('--p-right-2', bottomEase.toFixed(4));
      } else {
        // Mobile: Each of the 4 cards has its own scroll-linked animation as it enters viewport
        // Starts 24px lower and at 96% scale, smoothly easing up to normal position and full scale
        cardRefs.current.forEach((card) => {
          if (!card) return;
          const cardRect = card.getBoundingClientRect();
          const cardStartY = vh * 0.96;
          const cardEndY = vh * 0.68;
          const cardRaw = clamp((cardStartY - cardRect.top) / (cardStartY - cardEndY), 0, 1);
          const cardEase = easeOutCubic(cardRaw);
          card.style.setProperty('--mobile-card-p', cardEase.toFixed(4));
        });
      }
    };

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        updateScrollProgress();
        rafId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    // Initial check on mount
    updateScrollProgress();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <section className={`section section-navy ${styles.valuesSection}`} aria-labelledby="getting-started-heading">
      {/* Dynamic Gradient ASCII Background Canvas */}
      <div className={styles.asciiBackground} aria-hidden="true">
        <Suspense fallback={null}>
          <GradientASCII
            colors={['#1e3fd8', '#f6f8ff', '#a5d8ff', '#38bdf8']}
            shape="horizon"
            characters=" =+xX0S8#@"
            cellSize={18}
            density={0.8}
          />
        </Suspense>
      </div>

      <div className={`container ${styles.contentContainer}`}>
        {/* Section Heading Group */}
        <AnimateIn animation="default">
          <div className={styles.sectionHeader}>
            <div className={styles.headerGroup}>
              <div className={styles.leftCol}>
                <span className={styles.getLabel}>GET</span>
                <span className={styles.startedWord}>STARTED</span>
              </div>

              <div className={styles.headerDivider} aria-hidden="true" />

              <div className={styles.rightCol}>
                <h2 id="getting-started-heading" className={styles.headline}>
                  Four Simple Steps.
                </h2>
                <p className={styles.subtitle}>
                  New to trading or new to Growwezy? We’ll guide you through the process, one step at a time.
                </p>
              </div>
            </div>
          </div>
        </AnimateIn>

        {/* 5-Part Layout: Left 2 panels, Center Image, Right 2 panels */}
        <div ref={gridRef} className={styles.fivePartGrid}>
          {/* Left Column */}
          <div className={`${styles.sideColumn} ${styles.sideColumnLeft}`}>
            {leftValues.map((val, idx) => {
              const pVar = idx === 0 ? 'var(--p-left-1)' : 'var(--p-left-2)';
              return (
                <div
                  key={val.id}
                  ref={(el) => {
                    const cardIndex = idx === 0 ? 0 : 2;
                    cardRefs.current[cardIndex] = el;
                  }}
                  className={`${styles.panelWrapper} ${styles.panelWrapperLeft}`}
                  style={{ '--card-p': pVar, order: val.order } as React.CSSProperties}
                >
                  <div className={styles.valuePanel}>
                    <div className={styles.cardColLeft}>
                      <span className={styles.cardNumber}>{val.stepNumber}</span>
                    </div>
                    <div className={styles.cardDivider} aria-hidden="true" />
                    <div className={styles.cardColRight}>
                      <h3 className={styles.panelTitle}>{val.title}</h3>
                      <p className={styles.panelDesc}>{val.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Center Editorial Portrait Image */}
          <div className={styles.centerMediaWrapper}>
            <div className={styles.portraitCard}>
              <img
                src={valuesCenterImage}
                alt="Illustration of a thoughtful figure with a question mark above an open head."
                className={styles.portraitImage}
                width="420"
                height="560"
                loading="lazy"
                decoding="async"
              />
              <div className={styles.portraitOverlay}>
                <span className={styles.portraitTag}>HERE TO GUIDE YOU</span>
                <span className={styles.portraitCaption}>A conversation is all it takes to get started.</span>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className={`${styles.sideColumn} ${styles.sideColumnRight}`}>
            {rightValues.map((val, idx) => {
              const pVar = idx === 0 ? 'var(--p-right-1)' : 'var(--p-right-2)';
              return (
                <div
                  key={val.id}
                  ref={(el) => {
                    const cardIndex = idx === 0 ? 1 : 3;
                    cardRefs.current[cardIndex] = el;
                  }}
                  className={`${styles.panelWrapper} ${styles.panelWrapperRight}`}
                  style={{ '--card-p': pVar, order: val.order } as React.CSSProperties}
                >
                  <div className={styles.valuePanel}>
                    <div className={styles.cardColLeft}>
                      <span className={styles.cardNumber}>{val.stepNumber}</span>
                    </div>
                    <div className={styles.cardDivider} aria-hidden="true" />
                    <div className={styles.cardColRight}>
                      <h3 className={styles.panelTitle}>{val.title}</h3>
                      <p className={styles.panelDesc}>{val.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

