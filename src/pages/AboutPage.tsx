import React from 'react';
import { PageBanner } from '../components/layout/PageBanner';
import { AboutIntro } from '../components/sections/AboutIntro';
import { ValuesSection } from '../components/sections/ValuesSection';
import { FinalCTA } from '../components/sections/FinalCTA';
import styles from './AboutPage.module.css';

export const AboutPage: React.FC = () => {
  return (
    <main id="main-content">
      <PageBanner
        overline="About Growwezy"
        title="Disciplined Advisory for Global Participants"
        description="Established in India in 2020, Growwezy Global Tech provides specialized forex trading advisory and financial asset management for NRIs and international clients across the Middle East."
      />

      <section className={`section section-white ${styles.storySection}`}>
        <div className="container">
          <div className={styles.storyGrid}>
            <div className={styles.storyContent}>
              <span className="section-overline">Our Origin</span>
              <h2 className="section-title">Built on Clarity and Institutional Rigor</h2>
              <p className={styles.leadPara}>
                Since our founding in 2020, we observed that international market participants—particularly Non-Resident Indians managing capital across India and the Middle East—faced fragmented advisory that prioritized product sales over risk control.
              </p>
              <p className={styles.bodyPara}>
                We built Growwezy to serve as an objective advisory partner. We do not operate as a retail brokerage, we do not take custody of client funds, and we do not manufacture speculative schemes. Instead, we deliver quantitative macroeconomic research, disciplined foreign exchange hedging models, and multi-asset wealth alignment.
              </p>

              <div className={styles.keyFacts}>
                <div className={styles.factItem}>
                  <span className={styles.factNumber}>2020</span>
                  <span className={styles.factLabel}>Established in India</span>
                </div>
                <div className={styles.factItem}>
                  <span className={styles.factNumber}>Middle East</span>
                  <span className={styles.factLabel}>Primary Focus Corridor</span>
                </div>
                <div className={styles.factItem}>
                  <span className={styles.factNumber}>Independent</span>
                  <span className={styles.factLabel}>Zero Custody Conflict</span>
                </div>
              </div>
            </div>

            <div className={styles.storyImageCol}>
              <div className={styles.storyCard}>
                <img
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=75"
                  alt="Growwezy Global Tech Financial Framework"
                  className={styles.storyImage}
                  width="800"
                  height="520"
                  loading="lazy"
                  decoding="async"
                />
                <div className={styles.storyCardOverlay}>
                  <span className={styles.storyTag}>Independent Research</span>
                  <span className={styles.storyCaption}>Objective market perspectives since 2020</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three Pillars Introduction on Pale Ice */}
      <AboutIntro />

      {/* Values on Navy */}
      <ValuesSection />

      <FinalCTA />
    </main>
  );
};

