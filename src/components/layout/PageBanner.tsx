import React from 'react';
import styles from './PageBanner.module.css';

interface PageBannerProps {
  overline?: string;
  title: string;
  description?: string;
}

export const PageBanner: React.FC<PageBannerProps> = ({ overline, title, description }) => {
  return (
    <section className={styles.banner} aria-labelledby="banner-heading">
      {/* Moving Atmosphere Background */}
      <div className={styles.atmosphere} aria-hidden="true">
        <div className={styles.glowRibbon1} />
        <div className={styles.glowRibbon2} />
        <div className={styles.noiseOverlay} />
      </div>

      <div className={`container ${styles.bannerInner}`}>
        <div className={styles.titleColumn}>
          {overline && <span className={styles.overline}>{overline}</span>}
          <h1 id="banner-heading" className={styles.title}>
            {title}
          </h1>
        </div>
        {description && (
          <div className={styles.descColumn}>
            <p className={styles.description}>{description}</p>
          </div>
        )}
      </div>

      <div className={styles.bottomBorder} />
    </section>
  );
};

