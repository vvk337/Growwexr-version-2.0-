import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { approachSteps } from '../../content/approach';
import { Button } from '../ui/Button';
import { AnimateIn } from '../ui/AnimateIn';
import styles from './ApproachSection.module.css';

export const ApproachSection: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState<{ top: number; height: number }>({ top: 0, height: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  const stepButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const activeStepRef = useRef(0);
  activeStepRef.current = activeStepIndex;

  const completedRef = useRef(false);
  const isGestureLockedRef = useRef(false);
  const gestureTimerRef = useRef<number | null>(null);
  const lastStepTimeRef = useRef(0);
  const hasPositionedRef = useRef(false);
  const readyToUnlockOnNextGestureRef = useRef(false);

  // Synchronize the sliding blue background indicator position and height
  const updateIndicator = () => {
    const el = stepButtonRefs.current[activeStepIndex];
    if (el) {
      setIndicatorStyle({
        top: el.offsetTop,
        height: el.offsetHeight,
      });
    }
  };

  useLayoutEffect(() => {
    updateIndicator();
  }, [activeStepIndex]);

  useEffect(() => {
    updateIndicator();
    const handleResize = () => updateIndicator();
    window.addEventListener('resize', handleResize);
    const timer = setTimeout(updateIndicator, 60);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, [activeStepIndex]);

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

      // If all steps have been presented and unlocked, normal scrolling proceeds freely
      if (completedRef.current) return;

      const targetTop = 52; // 1/4 inch below 76px navbar

      // NEVER intercept reverse (upward) scrolling - user is completely free to scroll back up
      if (e.deltaY <= 0) {
        const sec = sectionRef.current;
        if (sec) {
          const r = sec.getBoundingClientRect();
          if (r.top > targetTop + 35) {
            hasPositionedRef.current = false;
            isGestureLockedRef.current = false;
          }
        }
        return;
      }

      const sec = sectionRef.current;
      if (!sec) return;

      const rect = sec.getBoundingClientRect();
      const vh = window.innerHeight;

      // If user has already scrolled past the section via scrollbar or anchor, unlock
      if (rect.top < -140) {
        completedRef.current = true;
        return;
      }

      // Check if section has reached the lock zone
      if (rect.top <= targetTop + 8 && rect.bottom >= vh * 0.55) {
        // Intercept downward scroll
        e.preventDefault();

        // 1. Smoothly snap the page ONCE when entering the lock zone to eliminate vibration
        if (!hasPositionedRef.current) {
          hasPositionedRef.current = true;
          isGestureLockedRef.current = true;
          lastStepTimeRef.current = performance.now();

          // Calculate exact document scroll position where section top lands at targetTop
          const secTopInDoc = window.scrollY + rect.top;
          const targetScrollY = Math.round(secTopInDoc - targetTop);

          window.scrollTo({
            top: targetScrollY,
            behavior: 'smooth'
          });
          return;
        }

        // 2. Debounce gesture timer: 220ms of silence indicates the swipe/wheel gesture has ended
        if (gestureTimerRef.current !== null) {
          clearTimeout(gestureTimerRef.current);
        }
        gestureTimerRef.current = window.setTimeout(() => {
          isGestureLockedRef.current = false;
          // If we are on the last step (Step 3) and the gesture has ended,
          // arm the next gesture to unlock and scroll down the website!
          if (activeStepRef.current >= approachSteps.length - 1) {
            readyToUnlockOnNextGestureRef.current = true;
          }
        }, 220);

        const now = performance.now();

        // If this gesture already advanced a step or we are in cooldown (450ms),
        // safely swallow momentum so no extra steps or jumps occur
        if (isGestureLockedRef.current || now - lastStepTimeRef.current < 450) {
          return;
        }

        // If we are already on Step 3 and the previous gesture has ended, unlock!
        if (readyToUnlockOnNextGestureRef.current && activeStepRef.current >= approachSteps.length - 1) {
          completedRef.current = true;
          return;
        }

        // Advance exactly ONE step smoothly
        if (activeStepRef.current < approachSteps.length - 1) {
          isGestureLockedRef.current = true;
          lastStepTimeRef.current = now;

          const nextIndex = activeStepRef.current + 1;
          setActiveStepIndex(nextIndex);
          activeStepRef.current = nextIndex;
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
      const targetTop = 52;

      if (rect.top <= targetTop + 8 && rect.bottom >= vh * 0.55) {
        const now = performance.now();
        if (now - lastStepTimeRef.current < 450) {
          e.preventDefault();
          return;
        }

        if (activeStepRef.current < approachSteps.length - 1) {
          e.preventDefault();
          lastStepTimeRef.current = now;
          const nextIndex = activeStepRef.current + 1;
          setActiveStepIndex(nextIndex);
          activeStepRef.current = nextIndex;
        } else {
          completedRef.current = true;
        }
      }
    };

    const handleScroll = () => {
      if (completedRef.current) return;
      const sec = sectionRef.current;
      if (!sec) return;
      const rect = sec.getBoundingClientRect();
      if (rect.top < -150) {
        completedRef.current = true;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (gestureTimerRef.current !== null) {
        clearTimeout(gestureTimerRef.current);
      }
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
            {/* 1. Static White Card Backdrops */}
            <div className={styles.cardBackdropLayer} aria-hidden="true">
              {approachSteps.map((step) => (
                <div key={step.number} className={styles.cardBackdrop} />
              ))}
            </div>

            {/* 2. Sliding Blue Background Indicator with Smooth Transition */}
            <div
              className={styles.slidingIndicator}
              style={{
                transform: `translateY(${indicatorStyle.top}px)`,
                height: indicatorStyle.height > 0 ? `${indicatorStyle.height}px` : undefined,
                opacity: indicatorStyle.height > 0 ? 1 : 0,
              }}
              aria-hidden="true"
            />

            {/* 3. Interactive Step Buttons */}
            {approachSteps.map((step, idx) => {
              const isActive = idx === activeStepIndex;
              return (
                <button
                  key={step.number}
                  ref={(el) => (stepButtonRefs.current[idx] = el)}
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
                      readyToUnlockOnNextGestureRef.current = true;
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

          {/* Active Step Showcase Panel (Equal Height with 3 Step Boxes Combined) */}
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

        {/* Consultation Call to Action - Centered directly below both boxes */}
        <div className={styles.bottomCta}>
          <Button to="/contact" variant="primary" size="lg">
            Schedule Your Step 01 Review
          </Button>
        </div>
      </div>
    </section>
  );
};
