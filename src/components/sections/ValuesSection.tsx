import React, { useEffect, useRef } from 'react';
import { Compass, Eye, Shield, BookOpen } from 'lucide-react';
import { valuesData, valuesCenterImage } from '../../content/values';
import { AnimateIn } from '../ui/AnimateIn';
import { GradientASCII } from '../ui/GradientASCII';
import styles from './ValuesSection.module.css';

const iconMap = {
  Compass,
  Eye,
  Shield,
  BookOpen
};

export const ValuesSection: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  // Left 2 values, Right 2 values
  const leftValues = valuesData.slice(0, 2);
  const rightValues = valuesData.slice(2, 4);

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
      return;
    }

    let rafId: number | null = null;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max);

    const updateScrollProgress = () => {
      if (!grid) return;
      const rect = grid.getBoundingClientRect();
      const vh = window.innerHeight;

      // Start choreography when top of grid reaches 90% of viewport
      // Complete choreography when top of grid reaches 25% of viewport
      const startY = vh * 0.90;
      const endY = vh * 0.25;
      const rawProgress = clamp((startY - rect.top) / (startY - endY), 0, 1);

      // 1. Center card pops up with slight offset delay (progress 0.06 to 0.75)
      const centerT = clamp((rawProgress - 0.06) / (0.75 - 0.06), 0, 1);
      const centerEase = easeOutCubic(centerT);
      const centerOpacity = clamp(centerT * 1.6, 0, 1);

      // 2. Side text boxes originate from behind center card in tandem
      // Top cards (Left 1, Right 1) start emerging at 0.20, finish at 0.85
      const topT = clamp((rawProgress - 0.20) / (0.85 - 0.20), 0, 1);
      const topEase = easeOutCubic(topT);

      // Bottom cards (Left 2, Right 2) start emerging at 0.32, finish at 1.00
      const bottomT = clamp((rawProgress - 0.32) / (1.00 - 0.32), 0, 1);
      const bottomEase = easeOutCubic(bottomT);

      grid.style.setProperty('--p-center', centerEase.toFixed(4));
      grid.style.setProperty('--p-center-opacity', centerOpacity.toFixed(4));
      grid.style.setProperty('--p-left-1', topEase.toFixed(4));
      grid.style.setProperty('--p-left-2', bottomEase.toFixed(4));
      grid.style.setProperty('--p-right-1', topEase.toFixed(4));
      grid.style.setProperty('--p-right-2', bottomEase.toFixed(4));
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
    <section className={`section section-navy ${styles.valuesSection}`} aria-labelledby="values-heading">
      {/* Dynamic Gradient ASCII Background Canvas */}
      <div className={styles.asciiBackground} aria-hidden="true">
        <GradientASCII
          colors={['#1e3fd8', '#f6f8ff', '#a5d8ff', '#38bdf8']}
          shape="horizon"
          characters=" =+xX0S8#@"
          cellSize={18}
          density={0.8}
        />
      </div>

      <div className={`container ${styles.contentContainer}`}>
        {/* Section Heading */}
        <AnimateIn animation="default">
          <div className={styles.sectionHeader}>
            <span className="section-overline">Guiding Principles</span>
            <h2 id="values-heading" className="section-title">
              Our Advisory Standards
            </h2>
            <p className={styles.subtitle}>
              Disciplined execution anchored in transparent dialogue, institutional rigor, and objective capital allocation.
            </p>
          </div>
        </AnimateIn>

        {/* 5-Part Layout: Left 2 panels, Center Image, Right 2 panels */}
        <div ref={gridRef} className={styles.fivePartGrid}>
          {/* Left Column */}
          <div className={`${styles.sideColumn} ${styles.sideColumnLeft}`}>
            {leftValues.map((val, idx) => {
              const IconComponent = iconMap[val.iconName];
              const pVar = idx === 0 ? 'var(--p-left-1)' : 'var(--p-left-2)';
              return (
                <div
                  key={val.id}
                  className={`${styles.panelWrapper} ${styles.panelWrapperLeft}`}
                  style={{ '--card-p': pVar } as React.CSSProperties}
                >
                  <div className={styles.valuePanel}>
                    <div className={styles.iconBox}>
                      <IconComponent size={20} />
                    </div>
                    <h3 className={styles.panelTitle}>{val.title}</h3>
                    <p className={styles.panelDesc}>{val.description}</p>
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
                alt="Institutional Financial Research & Strategy"
                className={styles.portraitImage}
                width="420"
                height="560"
                loading="lazy"
                decoding="async"
              />
              <div className={styles.portraitOverlay}>
                <span className={styles.portraitTag}>Discipline & Insight</span>
                <span className={styles.portraitCaption}>Independent Forex Advisory</span>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className={`${styles.sideColumn} ${styles.sideColumnRight}`}>
            {rightValues.map((val, idx) => {
              const IconComponent = iconMap[val.iconName];
              const pVar = idx === 0 ? 'var(--p-right-1)' : 'var(--p-right-2)';
              return (
                <div
                  key={val.id}
                  className={`${styles.panelWrapper} ${styles.panelWrapperRight}`}
                  style={{ '--card-p': pVar } as React.CSSProperties}
                >
                  <div className={styles.valuePanel}>
                    <div className={styles.iconBox}>
                      <IconComponent size={20} />
                    </div>
                    <h3 className={styles.panelTitle}>{val.title}</h3>
                    <p className={styles.panelDesc}>{val.description}</p>
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

