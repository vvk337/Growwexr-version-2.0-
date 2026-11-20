import React from 'react';
import { Button } from '../ui/Button';
import { FlowButton } from '../ui/flow-button';
import { MarketTicker } from '../ui/MarketTicker';
import { HeroCarousel } from './HeroCarousel';
import styles from './AtmosphericHero.module.css';

export const AtmosphericHero: React.FC = () => {
  return (
    <section className={styles.hero} aria-label="Hero Overview">
      {/* Signature Moving Atmosphere Canvas / Mesh */}
      <div className={styles.atmosphereWrapper} aria-hidden="true">
        <div className={styles.luminousRibbon1} />
        <div className={styles.luminousRibbon2} />
        <div className={styles.luminousRibbon3} />
        <div className={styles.luminousRibbon4} />
        <div className={styles.luminousRibbon5} />
        <div className={styles.centerDarkPocket} />
        <div className={styles.noiseFilter} />
        <div className={styles.bottomVignette} />
      </div>

      <div className={`container ${styles.heroContainer}`}>
        <div className={styles.heroLayout}>
          {/* Left Column: Headline + Description + CTAs */}
          <div className={styles.primaryColumn}>
            <div className={styles.headlineBlock}>
              <h1 className={styles.mainTitle}>
                <span className={styles.titleLine}>A <span className={styles.gradientText}>Guided</span> Approach</span>
                <span className={styles.titleLine}><span className={styles.nowrap}>to Your</span></span>
                <span className={styles.titleLine}><span className={styles.nowrap}><span className={styles.gradientText}>Financial Future</span>.</span></span>
              </h1>
            </div>

            <p className={styles.subheadline}>
              Growwezy provides financial consultancy to clients across the UAE and the wider Middle East, offering personalised guidance, trading advisory, and account management to help you navigate global forex markets.
            </p>

            <div className={styles.ctaGroup}>
              <FlowButton to="/contact" text="Book Consultation" variant="primary" size="lg" />
              <Button to="/services" variant="outline" size="lg" className={styles.exploreButton}>
                Explore Services
              </Button>
            </div>
          </div>

          {/* Right Column: Infinite Looping Hero Carousel */}
          <div className={styles.desktopMediaTile}>
            <HeroCarousel />
          </div>
        </div>
      </div>

      {/* Native Financial Market Ticker */}
      <MarketTicker />
    </section>
  );
};
