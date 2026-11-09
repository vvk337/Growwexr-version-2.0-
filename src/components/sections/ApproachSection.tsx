import React, { useState } from 'react';
import { approachSteps } from '../../content/approach';
import { Button } from '../ui/Button';
import { AnimateIn } from '../ui/AnimateIn';
import styles from './ApproachSection.module.css';

export const ApproachSection: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const activeStep = approachSteps[activeStepIndex];

  return (
    <section className={`section section-ice ${styles.approachSection}`} aria-labelledby="approach-heading">
      <div className="container">
        {/* Section Heading */}
        <AnimateIn animation="default">
          <div className={styles.sectionHeader}>
            <span className="section-overline">Consultation Framework</span>
            <h2 id="approach-heading" className="section-title">
              Our 3-Step Engagement Approach
            </h2>
            <p className={styles.subtitle}>
              A structured, objective pathway from initial risk assessment to bespoke foreign exchange allocation strategy.
            </p>
          </div>
        </AnimateIn>

        {/* Desktop Interactive Layout (Left steps list, Right active step panel) */}
        <div className={styles.desktopLayout}>
          {/* Step Selector List */}
          <div className={styles.stepList} role="tablist" aria-label="Approach Steps">
            {approachSteps.map((step, idx) => {
              const isActive = idx === activeStepIndex;
              return (
                <button
                  key={step.number}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`approach-panel-${step.number}`}
                  id={`approach-tab-${step.number}`}
                  className={`${styles.stepButton} ${isActive ? styles.stepButtonActive : ''}`}
                  onClick={() => setActiveStepIndex(idx)}
                >
                  <span className={styles.stepNumber}>{step.number}</span>
                  <div className={styles.stepBtnText}>
                    <h3 className={styles.stepBtnTitle}>{step.title}</h3>
                    <p className={styles.stepBtnSummary}>{step.summary}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Step Showcase Panel */}
          <div
            id={`approach-panel-${activeStep.number}`}
            role="tabpanel"
            aria-labelledby={`approach-tab-${activeStep.number}`}
            className={styles.stepPanel}
          >
            <div className={styles.panelImageWrapper}>
              <img
                key={activeStep.number}
                src={activeStep.image}
                alt={activeStep.title}
                className={styles.panelImage}
                loading="lazy"
              />
              <div className={styles.panelBadge}>
                <span>Step {activeStep.number} of 03</span>
              </div>
            </div>
            <div className={styles.panelBody} key={activeStep.number}>
              <h3 className={styles.panelHeading}>{activeStep.title}</h3>
              <p className={styles.panelSummaryText}>{activeStep.summary}</p>
              <ul className={styles.detailsList}>
                {activeStep.details.map((detail, dIdx) => (
                  <li key={dIdx} className={styles.detailItem}>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Mobile Stacked Layout (Direct ordinary stacked cards) */}
        <div className={styles.mobileStack}>
          {approachSteps.map((step) => (
            <div key={step.number} className={styles.mobileCard}>
              <div className={styles.mobileCardHeader}>
                <span className={styles.mobileStepNum}>{step.number}</span>
                <h3 className={styles.mobileStepTitle}>{step.title}</h3>
              </div>
              <div className={styles.mobileImageWrapper}>
                <img
                  src={step.image}
                  alt={step.title}
                  className={styles.mobileCardImg}
                  loading="lazy"
                />
              </div>
              <p className={styles.mobileCardSummary}>{step.summary}</p>
              <ul className={styles.mobileDetailsList}>
                {step.details.map((detail, dIdx) => (
                  <li key={dIdx}>{detail}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Consultation Call to Action */}
        <div className={styles.bottomCta}>
          <Button to="/contact" variant="primary" size="lg">
            Schedule Your Step 01 Review
          </Button>
        </div>
      </div>
    </section>
  );
};
