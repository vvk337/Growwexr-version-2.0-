import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { AnimateIn } from '../ui/AnimateIn';
import styles from './AboutIntro.module.css';

// Card 3 image: Replace null with actual Growwezy expo photo (e.g. '/assets/about-growwezy-expo.jpg') once supplied
const EXPO_IMAGE_SRC: string | null = null;

interface AboutCardItem {
  id: string;
  title: string;
  body: string;
  image: string | null;
  imagePosition: string;
}

const aboutCards: AboutCardItem[] = [
  {
    id: 'objectives-first',
    title: 'Your Objectives First',
    body: 'We take the time to understand your trading experience, financial objectives, and preferred level of involvement, shaping our guidance around what matters to you.',
    image: '/assets/about-consultation-advisory.webp',
    imagePosition: 'center 20%',
  },
  {
    id: 'specialist-expertise',
    title: 'Specialist Expertise',
    body: 'Our team brings together experience in forex markets and portfolio management, combining market research with practical trading knowledge.',
    image: '/assets/about-specialist-research.webp',
    imagePosition: 'center 30%',
  },
  {
    id: 'global-presence',
    title: 'Our Global Presence',
    body: 'Through our participation in financial expos around the world, we connect with traders, industry professionals, and partners beyond the screen.',
    image: EXPO_IMAGE_SRC,
    imagePosition: 'center center',
  },
];

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
    const isMobile = window.innerWidth < 768;
    if (prefersReducedMotion || isMobile) {
      cards.forEach((card) => {
        card.style.transform = 'none';
        card.style.opacity = '1';
      });
      if (isMobile) return;
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
              <div className={`${styles.usHeading} brand-gradient-text`}>US</div>
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

        {/* Three Card Row: Unified Image-Backed Cards linking to /about */}
        <div className={styles.cardsGrid} ref={gridRef}>
          {aboutCards.map((card, idx) => (
            <div
              key={card.id}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              className={styles.scrollCardWrapper}
            >
              <Link
                to="/about"
                className={styles.aboutCard}
                aria-label={`${card.title} - Learn more about our advisory philosophy`}
              >
                {card.image ? (
                  <img
                    src={card.image}
                    alt=""
                    className={styles.cardImg}
                    style={{ objectPosition: card.imagePosition }}
                    width="700"
                    height="450"
                    loading="lazy"
                    decoding="async"
                    aria-hidden="true"
                  />
                ) : (
                  <div className={styles.navyFallback} aria-hidden="true" />
                )}
                <div className={styles.cardOverlay}>
                  <h3 className={styles.cardTitle}>{card.title}</h3>
                  <p className={styles.cardText}>{card.body}</p>
                </div>
              </Link>
            </div>
          ))}
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
