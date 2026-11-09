import React from 'react';
import { FlowButton } from '../ui/flow-button';
import styles from './FinalCTA.module.css';

export const FinalCTA: React.FC = () => {
  return (
    <section className={`section ${styles.ctaSection}`} aria-label="Consultation Call to Action">
      <div className="container">
        <div className={styles.ctaCard}>
          <img
            src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=75"
            alt="Growwezy Strategic Financial Advisory"
            className={styles.bgImage}
            width="1000"
            height="500"
            loading="lazy"
            decoding="async"
          />
          <div className={styles.cardOverlay} />

          <div className={styles.cardContent}>
            <span className={styles.overline}>Start The Dialogue</span>
            <h2 className={styles.heading}>
              Let’s Discuss Your Market Goals
            </h2>
            <p className={styles.description}>
              Whether navigating currency exposure or seeking structured asset allocation for your Middle East wealth, our senior advisors are ready to consult.
            </p>
            <div className={styles.buttonWrap}>
              <FlowButton to="/contact" text="Book a Consultation" variant="white" size="lg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

