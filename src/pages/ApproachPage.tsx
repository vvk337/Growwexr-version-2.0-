import React from 'react';
import { PageBanner } from '../components/layout/PageBanner';
import { approachSteps } from '../content/approach';
import { FlowButton } from '../components/ui/flow-button';
import styles from './ApproachPage.module.css';
import { useSEO } from '../hooks/useSEO';
import { useJsonLd } from '../hooks/useJsonLd';
import { breadcrumbSchema, webPageSchema } from '../seo/schemas';

export const ApproachPage: React.FC = () => {
  useSEO({
    title: 'Our Approach – How Growwezy Works With You',
    description:
      'From your first consultation to ongoing market updates, see exactly how Growwezy matches you with an analyst team, delivers trading signals, and manages your account.',
    canonical: '/approach',
  });

  useJsonLd([
    webPageSchema({
      url: 'https://growwezy.com/approach',
      name: 'Our Approach – Growwezy Client Journey',
      description: 'Four-step client journey: consultation, analyst matching, service delivery, and ongoing reporting.',
      breadcrumbs: [
        { name: 'Home', item: 'https://growwezy.com/' },
        { name: 'Our Approach', item: 'https://growwezy.com/approach' },
      ],
    }),
    breadcrumbSchema([
      { name: 'Home', item: 'https://growwezy.com/' },
      { name: 'Our Approach', item: 'https://growwezy.com/approach' },
    ]),
  ]);

  return (
    <main id="main-content">
      {/* Dark navy hero with label, title on left and intro on right */}
      <PageBanner
        overline="THE CLIENT JOURNEY"
        title="Our Approach"
        description="From the first consultation to ongoing updates, see how we match you with an analyst team and how your chosen service works."
      />

      {/* Light content area */}
      <section className={`section section-white ${styles.approachSection}`} aria-labelledby="approach-overview-heading">
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 id="approach-overview-heading" className={styles.sectionTitle}>
              How We Work With You
            </h2>
          </div>

          {/* Connected vertical 01–04 timeline */}
          <div className={styles.stepsTimeline}>
            {approachSteps.map((step, idx) => (
              <div key={step.number} className={styles.timelineRow}>
                {/* Number circles connected with a thin vertical line */}
                <div className={styles.timelineTrack} aria-hidden="true">
                  <div className={styles.stepCircle}>{step.number}</div>
                  {idx < approachSteps.length - 1 && <div className={styles.connectingLine} />}
                </div>

                {/* Card container */}
                <div className={styles.cardCol}>
                  <article className={styles.stepCard} aria-labelledby={`step-title-${step.number}`}>
                    {/* Media photo: right on desktop, stacked top on mobile */}
                    <div className={styles.cardMedia}>
                      <img
                        src={step.image}
                        alt={step.title}
                        className={styles.cardImg}
                        style={{ objectPosition: step.imagePosition || 'center center' }}
                        width="600"
                        height="400"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>

                    {/* Text copy: left on desktop (60%), below photo on mobile */}
                    <div className={styles.cardText}>
                      <span className={styles.stepTag}>Step {step.number}</span>
                      <h3 id={`step-title-${step.number}`} className={styles.stepTitle}>
                        {step.title}
                      </h3>

                      {step.description && !step.subsections && (
                        <p className={styles.stepBody}>{step.description}</p>
                      )}

                      {/* Step 03 specialized service subsections */}
                      {step.subsections && (
                        <div className={styles.subsectionsList}>
                          {step.subsections.map((sub, sIdx) => (
                            <div key={sIdx} className={styles.subsectionBlock}>
                              <h4 className={styles.subheading}>{sub.subheading}</h4>
                              <p className={styles.subtext}>{sub.text}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </article>
                </div>
              </div>
            ))}
          </div>

          {/* Single Navy Closing Banner */}
          <div className={styles.closingBanner}>
            <h2 className={styles.closingHeading}>
              Let’s Talk About How You Trade
            </h2>
            <div className={styles.closingAction}>
              <FlowButton to="/contact" text="Book a Consultation" variant="white" size="lg" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
