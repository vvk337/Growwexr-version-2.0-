import React from 'react';
import { Target, HelpCircle, Layers, ShieldCheck, ArrowRight, Activity } from 'lucide-react';
import { AnimateIn } from '../ui/AnimateIn';
import styles from './WhyWorkWithUs.module.css';

export const WhyWorkWithUs: React.FC = () => {
  const whatYouBring = [
    {
      icon: Target,
      title: 'Your Capital & Liquidity Objectives',
      desc: 'Clear articulation of your current cross-border wealth, timeline, and return targets.'
    },
    {
      icon: HelpCircle,
      title: 'Current Currency Exposures',
      desc: 'The specific currency pairs (USD, AED, EUR, INR) and volatility challenges you face.'
    },
    {
      icon: Layers,
      title: 'Existing Broker & Custody Context',
      desc: 'Your preferred execution platforms and regulatory residency boundaries.'
    }
  ];

  const whatWeDiscuss = [
    {
      icon: ShieldCheck,
      title: 'Objective Market Research',
      desc: 'Independent macroeconomic analysis without broker incentives or hidden commission models.'
    },
    {
      icon: Activity,
      title: 'Disciplined Risk Frameworks',
      desc: 'Systematic drawdown modeling, hedging structures, and volatility stress-tests.'
    },
    {
      icon: ArrowRight,
      title: 'Transparent Next Steps',
      desc: 'Clear, actionable roadmap recommendations with regular advisory review checkpoints.'
    }
  ];

  return (
    <section className={`section section-navy ${styles.whySection}`} aria-labelledby="why-heading">
      <div className="container">
        {/* Centered Heading */}
        <AnimateIn animation="default">
          <div className={styles.sectionHeader}>
            <span className="section-overline">Mutual Collaboration</span>
            <h2 id="why-heading" className="section-title">
              What Sets Our Engagements Apart
            </h2>
            <p className={styles.subtitle}>
              A balanced partnership built on clarity, shared context, and rigorous financial analysis.
            </p>
          </div>
        </AnimateIn>

        {/* Two-Column Comparison Rhythm */}
        <div className={styles.comparisonGrid}>
          {/* Column 1: What You Bring */}
          <AnimateIn animation="slide-left" delay={150}>
            <div className={styles.columnCard}>
              <div className={styles.cardHeader}>
                <span className={styles.colTag}>Your Contribution</span>
                <h3 className={styles.colHeading}>What You Bring</h3>
                <p className={styles.colSummary}>
                  The context and clarity regarding your international commitments.
                </p>
              </div>
              <div className={styles.rowsList}>
                {whatYouBring.map((item, idx) => {
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

          {/* Column 2: What We Discuss */}
          <AnimateIn animation="slide-right" delay={250}>
            <div className={`${styles.columnCard} ${styles.columnHighlight}`}>
              <div className={styles.cardHeader}>
                <span className={styles.colTagHighlight}>Our Advisory Delivery</span>
                <h3 className={styles.colHeading}>What We Discuss</h3>
                <p className={styles.colSummary}>
                  The quantitative perspective and risk architecture we provide.
                </p>
              </div>
              <div className={styles.rowsList}>
                {whatWeDiscuss.map((item, idx) => {
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

