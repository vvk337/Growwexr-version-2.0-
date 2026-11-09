import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';
import styles from './ClientFocusSelector.module.css';

interface ClientAudience {
  id: string;
  label: string;
  tagline: string;
  description: string;
  focusPoints: string[];
  image: string;
}

const audiences: ClientAudience[] = [
  {
    id: 'middle-east-nris',
    label: 'NRIs in the Middle East',
    tagline: 'Cross-Border Currency Remittance & Rupee Asset Protection',
    description:
      'For Indian professionals, business founders, and family offices living in the UAE, Saudi Arabia, Qatar, and Oman. We structure timing, FX hedging, and portfolio repatriation against INR volatility.',
    focusPoints: [
      'AED/SAR to INR conversion timing & hedging strategies',
      'Dual-jurisdiction purchasing power management',
      'Expatriate capital allocation & estate liquidity frameworks',
      'Coordination with existing overseas bank and brokerage accounts'
    ],
    image:
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'international-clients',
    label: 'International Private Clients',
    tagline: 'Disciplined Global Forex & Macro Asset Advisory',
    description:
      'For high-net-worth investors and international firms operating in Middle East financial hubs requiring institutional FX intelligence, volatility stress-testing, and multi-asset capital preservation.',
    focusPoints: [
      'Macroeconomic divergence tracking across G10 & emerging currencies',
      'Systematic drawdown limits and quantitative scenario testing',
      'Direct consultation on currency exposure and sovereign debt cycles',
      'Independent fee-only advisory without broker commission bias'
    ],
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80'
  }
];

export const ClientFocusSelector: React.FC = () => {
  const [activeAudienceId, setActiveAudienceId] = useState<string>(audiences[0].id);

  const activeAudience = audiences.find((a) => a.id === activeAudienceId) || audiences[0];

  return (
    <section className={`section section-dark ${styles.selectorSection}`} aria-labelledby="focus-heading">
      <div className="container">
        {/* Header */}
        <div className={styles.sectionHeader}>
          <span className="section-overline">Target Specialization</span>
          <h2 id="focus-heading" className="section-title">
            Who We Advise
          </h2>
          <p className={styles.subtitle}>
            Tailored advisory frameworks addressing the distinct cross-border challenges of Middle East participants.
          </p>
        </div>

        {/* 2-Column Focus Layout */}
        <div className={styles.focusGrid}>
          {/* Left: Dynamic Image Showcase */}
          <div className={styles.imageColumn}>
            <div className={styles.imageCard}>
              <img
                key={activeAudience.id}
                src={activeAudience.image}
                alt={activeAudience.label}
                className={styles.focusImage}
                loading="lazy"
              />
              <div className={styles.imageOverlay}>
                <span className={styles.imageTag}>{activeAudience.label}</span>
                <h3 className={styles.imageHeadline}>{activeAudience.tagline}</h3>
              </div>
            </div>
          </div>

          {/* Right: Selectable Labels & Content */}
          <div className={styles.selectorColumn}>
            {/* Label Tabs */}
            <div className={styles.tabList} role="tablist" aria-label="Audience selector">
              {audiences.map((audience) => {
                const isSelected = audience.id === activeAudienceId;
                return (
                  <button
                    key={audience.id}
                    role="tab"
                    aria-selected={isSelected}
                    aria-controls={`panel-${audience.id}`}
                    id={`tab-${audience.id}`}
                    className={`${styles.tabButton} ${isSelected ? styles.tabSelected : ''}`}
                    onClick={() => setActiveAudienceId(audience.id)}
                  >
                    <span className={styles.tabLabel}>{audience.label}</span>
                    <ArrowUpRight
                      size={18}
                      className={`${styles.tabArrow} ${isSelected ? styles.tabArrowActive : ''}`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Selected Panel Content */}
            <div
              id={`panel-${activeAudience.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${activeAudience.id}`}
              className={styles.panelContent}
            >
              <h3 className={styles.panelTitle}>{activeAudience.tagline}</h3>
              <p className={styles.panelDesc}>{activeAudience.description}</p>

              <div className={styles.focusPointsList}>
                {activeAudience.focusPoints.map((point, idx) => (
                  <div key={idx} className={styles.focusPointItem}>
                    <CheckCircle2 size={18} className={styles.checkIcon} />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              <div className={styles.panelCta}>
                <Button to="/contact" variant="primary" size="md">
                  Discuss Your Requirements
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
