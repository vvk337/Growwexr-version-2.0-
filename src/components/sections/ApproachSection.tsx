import React, { useState, useRef, useEffect } from 'react';
import { approachSteps } from '../../content/approach';
import { Button } from '../ui/Button';
import { AnimateIn } from '../ui/AnimateIn';
import styles from './ApproachSection.module.css';

export const ApproachSection: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const activeStepRef = useRef(0);
  activeStepRef.current = activeStepIndex;

  const completedRef = useRef(false);
  const isAnimatingRef = useRef(false);
  const deltaAccumulatorRef = useRef(0);

  useEffect(() => {
    // Check if user has already scrolled past this section on mount
    const section = sectionRef.current;
    if (section) {
      const rect = section.getBoundingClientRect();
      if (rect.top < -100) {
        completedRef.current = true;
        setActiveStepIndex(approachSteps.length - 1);
        activeStepRef.current = approachSteps.length - 1;
      }
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      completedRef.current = true;
      return;
    }

    const handleWheel = (e: WheelEvent) => {
      // Only apply on desktop view (where 3-step switcher layout is active)
      if (window.innerWidth < 1024) return;

      // If all steps have been presented, let normal scrolling proceed in both directions
      if (completedRef.current) return;

      // NEVER intercept reverse (upward) scrolling - user is completely free to scroll back up
      if (e.deltaY <= 0) {
        deltaAccumulatorRef.current = 0;
        return;
      }

      const sec = sectionRef.current;
      if (!sec) return;

      const rect = sec.getBoundingClientRect();
      const vh = window.innerHeight;

      // If user has already scrolled past the section via scrollbar or anchor, unlock
      if (rect.top < -120) {
        completedRef.current = true;
        return;
      }

      // Check if section is in the middle / view zone of the screen
      // Top near navbar (<= 100px) and bottom still well within view
      if (rect.top <= 100 && rect.bottom >= vh * 0.6) {
        // Intercept downward scroll to step through 01 -> 02 -> 03
        e.preventDefault();

        // Lock section into comfortable centered position below header
        const targetTop = Math.max(20, Math.min(76, Math.round((vh - 680) / 2)));
        const diff = rect.top - targetTop;
        if (Math.abs(diff) > 4) {
          window.scrollTo({
            top: Math.round(window.scrollY + diff),
            behavior: 'auto'
          });
        }

        // If currently in a step animation cooldown, swallow momentum
        if (isAnimatingRef.current) return;

        deltaAccumulatorRef.current += e.deltaY;

        // Require deliberate downward scroll notch / swipe before advancing step
        if (deltaAccumulatorRef.current >= 40) {
          deltaAccumulatorRef.current = 0;
          isAnimatingRef.current = true;

          const nextIndex = activeStepRef.current + 1;
          setActiveStepIndex(nextIndex);
          activeStepRef.current = nextIndex;

          if (nextIndex >= approachSteps.length - 1) {
            // Reached Step 3 (last step) - allow brief viewing time, then unlock normal downward scroll
            setTimeout(() => {
              completedRef.current = true;
              isAnimatingRef.current = false;
            }, 600);
          } else {
            // Cooldown between step 1 -> step 2 to allow smooth transition animation
            setTimeout(() => {
              isAnimatingRef.current = false;
            }, 450);
          }
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (window.innerWidth < 1024) return;
      if (completedRef.current) return;
      if (e.key !== 'ArrowDown' && e.key !== 'PageDown') return;

      const sec = sectionRef.current;
      if (!sec) return;

      const rect = sec.getBoundingClientRect();
      const vh = window.innerHeight;

      if (rect.top <= 100 && rect.bottom >= vh * 0.6) {
        if (activeStepRef.current < approachSteps.length - 1) {
          e.preventDefault();
          if (isAnimatingRef.current) return;

          isAnimatingRef.current = true;
          const nextIndex = activeStepRef.current + 1;
          setActiveStepIndex(nextIndex);
          activeStepRef.current = nextIndex;

          if (nextIndex >= approachSteps.length - 1) {
            setTimeout(() => {
              completedRef.current = true;
              isAnimatingRef.current = false;
            }, 600);
          } else {
            setTimeout(() => {
              isAnimatingRef.current = false;
            }, 450);
          }
        }
      }
    };

    const handleScroll = () => {
      if (completedRef.current) return;
      const sec = sectionRef.current;
      if (!sec) return;
      const rect = sec.getBoundingClientRect();
      // If user drags scrollbar far past section, permanently unlock
      if (rect.top < -150) {
        completedRef.current = true;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const activeStep = approachSteps[activeStepIndex];

  return (
    <section ref={sectionRef} className={`section section-ice ${styles.approachSection}`} aria-labelledby="approach-heading">
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
                  onClick={() => {
                    setActiveStepIndex(idx);
                    activeStepRef.current = idx;
                    if (idx >= approachSteps.length - 1) {
                      completedRef.current = true;
                    }
                  }}
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
