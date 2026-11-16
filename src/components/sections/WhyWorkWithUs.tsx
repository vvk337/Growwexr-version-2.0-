import React from 'react';
import { Target, Layers, HelpCircle, ShieldCheck, Activity, ArrowRight } from 'lucide-react';
import { AnimateIn } from '../ui/AnimateIn';
import { StaticAsciiHorizon } from '../ui/StaticAsciiHorizon';
import styles from './WhyWorkWithUs.module.css';

export const WhyWorkWithUs: React.FC = () => {
  const tradingOptions = [
    {
      icon: Target,
      title: 'Trade for yourself.',
      desc: 'Choose forex signals, gold and silver signals, or a plan that covers both. You decide which trades to place.'
    },
    {
      icon: Layers,
      title: 'Have our team place trades.',
      desc: 'With account management, Growwezy handles trade execution in your broker account.'
    },
    {
      icon: HelpCircle,
      title: 'Speak to a dedicated relationship manager.',
      desc: 'The HNI Signals plan includes 24/7 relationship manager support.'
    }
  ];

  const accountAccess = [
    {
      icon: ShieldCheck,
      title: 'You fund your own account.',
      desc: 'Trading funds stay in the broker account held in your name.'
    },
    {
      icon: Activity,
      title: 'Our access is limited to trading.',
      desc: 'For account management, Growwezy can place trades but cannot withdraw funds.'
    },
    {
      icon: ArrowRight,
      title: 'Service fees are paid separately.',
      desc: 'You pay Growwezy directly for the service, separate from the funds you deposit with your broker.'
    }
  ];

  return (
    <section className={`section section-navy ${styles.whySection}`} aria-labelledby="why-heading">
      {/* Background artwork shared directly with Our Services section */}
      <StaticAsciiHorizon cellSize={18} density={0.8} className={styles.bgArtwork} />

      <div className={`container ${styles.contentContainer}`}>
        {/* Accessible screen reader heading */}
        <h2 id="why-heading" className={styles.visuallyHidden}>
          Why Growwezy
        </h2>

        {/* Section Heading with Brand Split Layout */}
        <AnimateIn animation="default">
          <div className={styles.introHeader}>
            <div className={styles.badgeCol}>
              <div className={styles.labelRow}>
                <span className={styles.smallLabel}>WHY</span>
                <span className={styles.tealDash} aria-hidden="true" />
              </div>
              <div className={`${styles.whyHeading} brand-gradient-text`}>GROWWEZY</div>
            </div>

            <div className={styles.headerDivider} aria-hidden="true" />

            <div className={styles.statementCol}>
              <p className={styles.statementHeading}>
                Trade your way, with a team you can speak to.
              </p>
              <p className={styles.supportingText}>
                Choose how involved you want to be in trading, and know exactly what access our team has.
              </p>
            </div>
          </div>
        </AnimateIn>

        {/* Two-Column Comparison Rhythm (Mobile Carousel / Desktop 2-Col Grid) */}
        <div className={styles.comparisonGrid}>
          {/* Column 1: Trading Options */}
          <AnimateIn animation="slide-left" delay={150} className={styles.cardWrapper}>
            <div className={styles.columnCard}>
              <div className={styles.cardHeader}>
                <span className={styles.colTag}>TRADING OPTIONS</span>
                <h3 className={styles.colHeading}>Choose how you trade</h3>
              </div>
              <div className={styles.rowsList}>
                {tradingOptions.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className={styles.comparisonRow}>
                      <div className={styles.iconWrapper}>
                        <Icon size={18} />
                      </div>
                      <div>
                        <h4 className={styles.rowTitle}>{item.title}</h4>
                        <p className={styles.rowDesc}>{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </AnimateIn>

          {/* Column 2: Account Access */}
          <AnimateIn animation="slide-right" delay={250} className={styles.cardWrapper}>
            <div className={`${styles.columnCard} ${styles.columnHighlight}`}>
              <div className={styles.cardHeader}>
                <span className={styles.colTagHighlight}>ACCOUNT ACCESS</span>
                <h3 className={styles.colHeading}>Your funds stay in your broker account</h3>
              </div>
              <div className={styles.rowsList}>
                {accountAccess.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className={styles.comparisonRow}>
                      <div className={`${styles.iconWrapper} ${styles.iconHighlight}`}>
                        <Icon size={18} />
                      </div>
                      <div>
                        <h4 className={styles.rowTitle}>{item.title}</h4>
                        <p className={styles.rowDesc}>{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
};
