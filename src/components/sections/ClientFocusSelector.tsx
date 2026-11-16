import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { AnimateIn } from '../ui/AnimateIn';
import { DubaiSkylineLayers } from './DubaiSkylineLayers';
import { InternationalSkylineLayers } from './InternationalSkylineLayers';
import styles from './ClientFocusSelector.module.css';

interface ClientAudience {
  id: string;
  label: string;
  imageLabel: string;
  caption: string;
  panelHeading: string;
  description: string;
  focusPoints: string[];
  image: string;
}

const audiences: ClientAudience[] = [
  {
    id: 'nris-in-the-uae',
    label: 'NRIs in the UAE',
    imageLabel: 'NRIs IN THE UAE',
    caption: 'Forex Guidance for NRIs in the UAE',
    panelHeading: 'Forex Guidance for NRIs in the UAE',
    description:
      'For Indian professionals and business owners living in the UAE who want support trading global markets. You can use signals to make and execute your own decisions, or discuss account management with our team.',
    focusPoints: [
      'Forex, gold, and silver signals, depending on the plan you choose',
      'Place your own trades when you use a signals plan',
      'With account management, your funds stay in your own broker account and our team can place trades but cannot withdraw funds',
      'Discuss fees and account access before choosing a service'
    ],
    image:
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'international-private-clients',
    label: 'International Private Clients',
    imageLabel: 'INTERNATIONAL PRIVATE CLIENTS',
    caption: 'Global Forex Advisory for Private Clients',
    panelHeading: 'Global Forex Advisory for Private Clients',
    description:
      'For private clients across the Middle East who already trade or want more direct support with execution. Compare signal plans by market coverage, or discuss how account management would work for you.',
    focusPoints: [
      'Forex and precious metals coverage through the Forex, Comex, and Combo plans',
      'Trading signals with guidance on potential entries and exits',
      'Account management with trade-only access to your own broker account',
      '24/7 relationship manager support with the HNI plan'
    ],
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80'
  }
];

export const ClientFocusSelector: React.FC = () => {
  const [activeAudienceId, setActiveAudienceId] = useState<string>(audiences[0].id);
  const [tabSwitchCount, setTabSwitchCount] = useState<number>(0);

  const activeAudience = audiences.find((a) => a.id === activeAudienceId) || audiences[0];

  const selectAudience = (id: string) => {
    setActiveAudienceId(id);
    setTabSwitchCount((c) => c + 1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    let nextIndex: number | null = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      nextIndex = (currentIndex + 1) % audiences.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      nextIndex = (currentIndex - 1 + audiences.length) % audiences.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      nextIndex = audiences.length - 1;
    }

    if (nextIndex !== null) {
      const nextAudience = audiences[nextIndex];
      selectAudience(nextAudience.id);
      const nextButton = document.getElementById(`tab-${nextAudience.id}`);
      nextButton?.focus();
    }
  };

  return (
    <section className={`section section-dark ${styles.selectorSection}`} aria-labelledby="who-we-advise-heading">
      <div className="container">
        {/* Accessible heading for screen readers */}
        <h2 id="who-we-advise-heading" className={styles.visuallyHidden}>
          Who We Advise
        </h2>

        {/* Section Header with Split Layout */}
        <AnimateIn animation="default">
          <div className={styles.introHeader}>
            <div className={styles.badgeCol}>
              <div className={styles.labelRow}>
                <span className={styles.smallLabel}>WHO WE</span>
                <span className={styles.tealDash} aria-hidden="true" />
              </div>
              <div className={`${styles.adviseHeading} brand-gradient-text`}>ADVISE</div>
            </div>

            <div className={styles.headerDivider} aria-hidden="true" />

            <div className={styles.statementCol}>
              <p className={styles.statementHeading}>
                Forex guidance for the way you trade.
              </p>
              <p className={styles.supportingText}>
                We work with NRIs in the UAE and international private clients across the Middle East. Choose trading signals you can act on yourself, or speak with us about having our team execute trades on your behalf.
              </p>
            </div>
          </div>
        </AnimateIn>

        {/* 2-Column Focus Layout */}
        <div className={styles.focusGrid}>
          {/* Left: Dynamic Image Showcase */}
          <AnimateIn animation="scale-up" delay={150} className={styles.imageColumn}>
            <div className={styles.imageCard}>
              <div
                className={styles.skylinePanelWrapper}
                style={{
                  opacity: activeAudience.id === 'nris-in-the-uae' ? 1 : 0,
                  pointerEvents: activeAudience.id === 'nris-in-the-uae' ? 'auto' : 'none',
                  visibility: activeAudience.id === 'nris-in-the-uae' ? 'visible' : 'hidden'
                }}
              >
                <DubaiSkylineLayers
                  isActive={activeAudience.id === 'nris-in-the-uae'}
                  tabSwitchCount={tabSwitchCount}
                  imageLabel={audiences[0].imageLabel}
                  caption={audiences[0].caption}
                />
              </div>

              <div
                className={styles.skylinePanelWrapper}
                style={{
                  opacity: activeAudience.id === 'international-private-clients' ? 1 : 0,
                  pointerEvents: activeAudience.id === 'international-private-clients' ? 'auto' : 'none',
                  visibility: activeAudience.id === 'international-private-clients' ? 'visible' : 'hidden'
                }}
              >
                <InternationalSkylineLayers
                  isActive={activeAudience.id === 'international-private-clients'}
                  tabSwitchCount={tabSwitchCount}
                  imageLabel={audiences[1].imageLabel}
                  caption={audiences[1].caption}
                />
              </div>
            </div>
          </AnimateIn>

          {/* Right: Selectable Labels & Content */}
          <AnimateIn animation="slide-right" delay={250} className={styles.selectorColumn}>
            {/* Single Segmented Control Rail */}
            <div
              className={styles.segmentedRail}
              role="tablist"
              aria-label="Audience selector"
            >
              {/* Inset Sliding Highlight */}
              <div
                className={styles.segmentedHighlight}
                style={{
                  transform: `translate3d(${activeAudienceId === audiences[0].id ? '0%' : '100%'}, 0, 0)`
                }}
                aria-hidden="true"
              />

              {audiences.map((audience, idx) => {
                const isSelected = audience.id === activeAudienceId;
                return (
                  <button
                    key={audience.id}
                    role="tab"
                    aria-selected={isSelected}
                    aria-controls={`panel-${audience.id}`}
                    id={`tab-${audience.id}`}
                    tabIndex={isSelected ? 0 : -1}
                    className={`${styles.segmentedButton} ${isSelected ? styles.segmentedButtonActive : ''}`}
                    onClick={() => selectAudience(audience.id)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                  >
                    <span className={styles.segmentedLabel}>{audience.label}</span>
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
              <h3 className={styles.panelTitle}>{activeAudience.panelHeading}</h3>
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
          </AnimateIn>
        </div>
      </div>
    </section>
  );
};
