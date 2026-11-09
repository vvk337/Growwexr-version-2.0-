import React from 'react';
import { Compass, Eye, Shield, BookOpen } from 'lucide-react';
import { valuesData, valuesCenterImage } from '../../content/values';
import { AnimateIn } from '../ui/AnimateIn';
import styles from './ValuesSection.module.css';

const iconMap = {
  Compass,
  Eye,
  Shield,
  BookOpen
};

export const ValuesSection: React.FC = () => {
  // Left 2 values, Right 2 values
  const leftValues = valuesData.slice(0, 2);
  const rightValues = valuesData.slice(2, 4);

  return (
    <section className={`section section-navy ${styles.valuesSection}`} aria-labelledby="values-heading">
      <div className="container">
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
        <div className={styles.fivePartGrid}>
          {/* Left Column */}
          <AnimateIn animation="slide-left" delay={100} className={styles.sideColumn}>
            {leftValues.map((val) => {
              const IconComponent = iconMap[val.iconName];
              return (
                <div key={val.id} className={styles.valuePanel}>
                  <div className={styles.iconBox}>
                    <IconComponent size={20} />
                  </div>
                  <h3 className={styles.panelTitle}>{val.title}</h3>
                  <p className={styles.panelDesc}>{val.description}</p>
                </div>
              );
            })}
          </AnimateIn>

          {/* Center Editorial Portrait Image */}
          <AnimateIn animation="scale-up" delay={200} className={styles.centerMediaWrapper}>
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
          </AnimateIn>

          {/* Right Column */}
          <AnimateIn animation="slide-right" delay={300} className={styles.sideColumn}>
            {rightValues.map((val) => {
              const IconComponent = iconMap[val.iconName];
              return (
                <div key={val.id} className={styles.valuePanel}>
                  <div className={styles.iconBox}>
                    <IconComponent size={20} />
                  </div>
                  <h3 className={styles.panelTitle}>{val.title}</h3>
                  <p className={styles.panelDesc}>{val.description}</p>
                </div>
              );
            })}
          </AnimateIn>
        </div>
      </div>
    </section>
  );
};

