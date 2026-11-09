import React from 'react';
import { PageBanner } from '../components/layout/PageBanner';
import { approachSteps } from '../content/approach';
import { FinalCTA } from '../components/sections/FinalCTA';
import styles from './ApproachPage.module.css';

export const ApproachPage: React.FC = () => {
  return (
    <main id="main-content">
      <PageBanner
        overline="Consultation Framework"
        title="Our Approach"
        description="A disciplined, transparent three-step methodology engineered to assess, structure, and monitor cross-border foreign exchange and asset exposures."
      />

      <section className={`section section-white ${styles.approachSection}`}>
        <div className="container">
          <div className={styles.introBlock}>
            <span className="section-overline">Process Clarity</span>
            <h2 className="section-title">Structure Before Execution</h2>
            <p className={styles.introDesc}>
              Before entering any financial commitment, an investor must understand risk limits, macro catalysts, and downside exposure. Our advisory methodology enforces this discipline at every stage.
            </p>
          </div>

          <div className={styles.stepsTimeline}>
            {approachSteps.map((step, idx) => (
              <div key={step.number} className={styles.timelineRow}>
                <div className={styles.numberBadgeCol}>
                  <div className={styles.stepCircle}>{step.number}</div>
                  {idx < approachSteps.length - 1 && <div className={styles.connectingLine} />}
                </div>

                <div className={styles.cardContentCol}>
                  <div className={styles.stepCard}>
                    <div className={styles.cardText}>
                      <span className={styles.stepTag}>Phase {step.number}</span>
                      <h3 className={styles.stepTitle}>{step.title}</h3>
                      <p className={styles.stepSummary}>{step.summary}</p>

                      <div className={styles.keyDeliverables}>
                        <h4 className={styles.deliverablesTitle}>What this phase encompasses:</h4>
                        <ul className={styles.pointsList}>
                          {step.details.map((point, pIdx) => (
                            <li key={pIdx}>{point}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className={styles.cardImageWrapper}>
                      <img
                        src={step.image}
                        alt={step.title}
                        className={styles.cardImage}
                        width="480"
                        height="360"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Client Preparation Guidance */}
          <div className={styles.prepGuidanceBlock}>
            <h3 className={styles.guidanceHeading}>Client Preparation Guidance</h3>
            <p className={styles.guidanceText}>
              To maximize the value of your initial consultation, we recommend preparing an outline of your current currency holdings, your primary banking and brokerage jurisdictions, and your prospective capital timeline over the next 12 to 36 months.
            </p>
          </div>
        </div>
      </section>

      <FinalCTA />
    </main>
  );
};

