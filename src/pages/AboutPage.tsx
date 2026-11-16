import React from 'react';
import { PageBanner } from '../components/layout/PageBanner';
import { AboutIntro } from '../components/sections/AboutIntro';
import { FinalCTA } from '../components/sections/FinalCTA';
import styles from './AboutPage.module.css';

export const AboutPage: React.FC = () => {
  return (
    <main id="main-content">
      <PageBanner
        overline="About Growwezy"
        title="Disciplined Advisory for Global Participants"
        description="Established in India in 2019, Growwezy Global Tech provides specialized forex trading advisory and financial asset management for NRIs and international clients across the Middle East."
      />

      <section className={`section section-white ${styles.storySection}`}>
        <div className="container">
          <div className={styles.storyGrid}>
            <div className={styles.storyContent}>
              <span className="section-overline">OUR STORY</span>
              <h2 className={`section-title ${styles.storyTitle}`}>
                Rooted in India.
                <br className={styles.desktopBr} />
                Connected to{' '}
                <br className={styles.desktopBr} />
                Global Markets.
              </h2>
              <p className={styles.leadPara}>
                Established in India seven years ago, Growwezy has grown to serve more than 2,800 retail clients, alongside corporate investors. With an office in the Middle East, we support clients across the region through financial consultancy, forex trading advisory, and account management.
              </p>
              <p className={styles.bodyPara}>
                Our team brings together specialists in forex markets and portfolio management, supporting both individual and business objectives. From personalised trading guidance to managing investments for companies, our approach begins with understanding each client’s priorities and the support they need.
              </p>

              <div className={styles.keyFacts}>
                <div className={styles.factItem}>
                  <span className={styles.factNumber}>9 Years</span>
                  <span className={styles.factLabel}>Since Our Establishment</span>
                </div>
                <div className={styles.factItem}>
                  <span className={styles.factNumber}>2,800+</span>
                  <span className={styles.factLabel}>Retail Clients</span>
                </div>
                <div className={styles.factItem}>
                  <span className={styles.factNumber}>5+</span>
                  <span className={styles.factLabel}>Corporate Investors</span>
                </div>
                <div className={styles.factItem}>
                  <span className={styles.factNumber}>2</span>
                  <span className={styles.factLabel}>
                    Companies Under
                    <br className={styles.desktopBr} />
                    Investment Management
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.storyImageCol}>
              <div className={styles.storyCard}>
                <img
                  src="/assets/about-specialist-research.webp"
                  alt="Growwezy Global Tech Specialist Research"
                  className={styles.storyImage}
                  width="800"
                  height="520"
                  loading="lazy"
                  decoding="async"
                />
                <div className={styles.storyCardOverlay}>
                  <span className={styles.storyTag}>INDIA & THE MIDDLE EAST</span>
                  <span className={styles.storyCaption}>Local presence. A global market perspective.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three Pillars Introduction on Pale Ice */}
      <AboutIntro />

      <FinalCTA />
    </main>
  );
};

