import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Eye, MessageSquare, ArrowRight } from 'lucide-react';
import { AnimateIn } from '../ui/AnimateIn';
import styles from './AboutIntro.module.css';

export const AboutIntro: React.FC = () => {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const maxProgressRef = useRef<number>(0);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = cardRefs.current.filter((el): el is HTMLDivElement => el !== null);
    if (cards.length === 0) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      cards.forEach((card) => {
        card.style.transform = 'none';
        card.style.opacity = '1';
      });
      return;
    }

    let rafId: number | null = null;
    let isLocked = false;

    const smoothstep = (t: number) => t * t * (3 - 2 * t);

    const updateScrollProgress = () => {
      if (isLocked) return;

      const vh = window.innerHeight;
      const gridRect = grid.getBoundingClientRect();

      // Start rising when top of cards grid enters viewport (95% vh)
      // Fully complete rising when top reaches 40% vh
      const startY = vh * 0.95;
      const endY = vh * 0.40;

      const currentProgress = Math.min(Math.max((startY - gridRect.top) / (startY - endY), 0), 1);

      // Only advance forward on first scroll down — never go back on reverse scroll
      if (currentProgress > maxProgressRef.current) {
        maxProgressRef.current = currentProgress;
      }

      const progress = maxProgressRef.current;
      const eased = smoothstep(progress);

      // All 3 cards share the EXACT same translateY and opacity — zero step effect, 100% aligned
      const baseOffset = 70;
      const translateY = (1 - eased) * baseOffset;
      const opacity = 0.2 + 0.8 * eased;

      cards.forEach((card) => {
        card.style.transform = `translate3d(0, ${translateY.toFixed(2)}px, 0)`;
        card.style.opacity = opacity.toFixed(3);
      });

      // Once fully risen, lock into place permanently and remove listeners
      if (progress >= 1) {
        isLocked = true;
        cards.forEach((card) => {
          card.style.transform = 'none';
          card.style.opacity = '1';
        });
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleScroll);
      }
    };

    const handleScroll = () => {
      if (isLocked) return;
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        updateScrollProgress();
        rafId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    // Initial positioning
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
    <section className={`section ${styles.aboutSection}`} aria-labelledby="about-intro-title">
      <div className="container">
        {/* Asymmetrical Top Layout */}
        <AnimateIn animation="default">
          <div className={styles.introHeader}>
            <div className={styles.badgeCol}>
              <div className={styles.aboutRow}>
                <span className={styles.aboutLabel}>ABOUT</span>
                <span className={styles.aboutDash} aria-hidden="true" />
              </div>
              <div className={styles.usHeading}>US</div>
            </div>

            <div className={styles.headerDivider} aria-hidden="true" />

            <div className={styles.statementCol}>
              <h2 id="about-intro-title" className={styles.statementHeading}>
                <span className={styles.headingLine}>A considered approach to global markets,</span>{' '}
                <span className={styles.headingLine}>built around your&nbsp;objectives.</span>
              </h2>
              <div className={styles.aboutLinkWrap}>
                <Link to="/about" className={`${styles.aboutLink} arrow-link`}>
                  <span>Learn more about our advisory philosophy</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </AnimateIn>

        {/* Three Card Row: 2 text cards + 1 image card with scroll-tied upward motion */}
        <div className={styles.cardsGrid} ref={gridRef}>
          {/* Card 1: Clear Perspective */}
          <div
            ref={(el) => {
              cardRefs.current[0] = el;
            }}
            className={styles.scrollCardWrapper}
          >
            <div className={styles.textCard}>
              <div className={styles.cardIconBox}>
                <Compass size={22} className={styles.cardIcon} />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>Clear Perspective</h3>
                <p className={styles.cardText}>
                  Cutting through market noise with objective macroeconomic fundamentals and quantitative currency correlation models.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Research-Led Thinking */}
          <div
            ref={(el) => {
              cardRefs.current[1] = el;
            }}
            className={styles.scrollCardWrapper}
          >
            <div className={styles.textCard}>
              <div className={styles.cardIconBox}>
                <Eye size={22} className={styles.cardIcon} />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>Research-Led Thinking</h3>
                <p className={styles.cardText}>
                  Every strategy is rooted in sovereign debt yields, trade flows, and central bank monetary paths, eliminating speculative bias.
                </p>
              </div>
            </div>
          </div>

          {/* Card 3: Editorial Image Card */}
          <div
            ref={(el) => {
              cardRefs.current[2] = el;
            }}
            className={styles.scrollCardWrapper}
          >
            <div className={styles.imageCard}>
              <img
                src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=700&q=75"
                alt="Ongoing Dialogue and Collaboration"
                className={styles.imageCardImg}
                width="700"
                height="450"
                loading="lazy"
                decoding="async"
              />
              <div className={styles.imageCardOverlay}>
                <div className={styles.imageCardIconBox}>
                  <MessageSquare size={20} />
                </div>
                <h3 className={styles.imageCardTitle}>Ongoing Dialogue</h3>
                <p className={styles.imageCardText}>
                  Direct, transparent consultation keeping your portfolio aligned with evolving global conditions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Large Low-Contrast Word Marquee */}
      <div className={styles.wordMarquee} aria-hidden="true">
        <div className={styles.marqueeTrack}>
          <span>Research</span>
          <span className={styles.marqueeSlash}>/</span>
          <span>Perspective</span>
          <span className={styles.marqueeSlash}>/</span>
          <span>Discipline</span>
          <span className={styles.marqueeSlash}>/</span>
          <span>Dialogue</span>
          <span className={styles.marqueeSlash}>/</span>
          <span>Research</span>
          <span className={styles.marqueeSlash}>/</span>
          <span>Perspective</span>
          <span className={styles.marqueeSlash}>/</span>
          <span>Discipline</span>
          <span className={styles.marqueeSlash}>/</span>
          <span>Dialogue</span>
          <span className={styles.marqueeSlash}>/</span>
        </div>
      </div>
    </section>
  );
};
