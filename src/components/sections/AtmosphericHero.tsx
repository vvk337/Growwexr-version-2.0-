import React from 'react';
import { Button } from '../ui/Button';
import { FlowButton } from '../ui/flow-button';
import { siteConfig } from '../../config/site';
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
        {/* Upper Left: Expressive Two-Line Headline */}
        <div className={styles.headlineBlock}>
          <h1 className={styles.mainTitle}>
            Clear Perspective,<br />
            Informed Forex Decisions.
          </h1>
        </div>

        {/* Lower Composition: Description + CTA on Left; Media Tile on Right */}
        <div className={styles.lowerHeroRow}>
          <div className={styles.actionColumn}>
            <p className={styles.subheadline}>
              {siteConfig.description}
            </p>
            <div className={styles.ctaGroup}>
              <FlowButton to="/contact" text="Book Consultation" variant="primary" size="lg" />
              <Button to="/services" variant="outline" size="lg">
                Explore Services
              </Button>
            </div>
          </div>

          {/* Desktop Rounded Media Tile */}
          <div className={styles.desktopMediaTile}>
            <div className={styles.mediaCard}>
              <img
                src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=560&q=75"
                alt="Growwezy Advisory Session"
                className={styles.mediaImage}
                width="280"
                height="190"
                loading="eager"
                decoding="async"
              />
              <div className={styles.mediaOverlay}>
                <span className={styles.mediaTag}>Advisory Brief</span>
                <span className={styles.mediaTitle}>Middle East NRI Portfolio Strategy</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Category Ticker */}
      <div className={styles.categoryTicker} aria-hidden="true">
        <div className={styles.tickerTrack}>
            <span>Forex Trading Advisory</span>
            <span className={styles.tickerDot}>•</span>
            <span>Global Macro Research</span>
            <span className={styles.tickerDot}>•</span>
            <span>Financial Asset Management</span>
            <span className={styles.tickerDot}>•</span>
            <span>Middle East & NRI Specialization</span>
            <span className={styles.tickerDot}>•</span>
            <span>Systematic Risk Mitigation</span>
            <span className={styles.tickerDot}>•</span>
            {/* Seamless duplicate */}
            <span>Forex Trading Advisory</span>
            <span className={styles.tickerDot}>•</span>
            <span>Global Macro Research</span>
            <span className={styles.tickerDot}>•</span>
            <span>Financial Asset Management</span>
            <span className={styles.tickerDot}>•</span>
            <span>Middle East & NRI Specialization</span>
            <span className={styles.tickerDot}>•</span>
            <span>Systematic Risk Mitigation</span>
            <span className={styles.tickerDot}>•</span>
          </div>
        </div>
    </section>
  );
};
