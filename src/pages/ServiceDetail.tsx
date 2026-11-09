import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, HelpCircle } from 'lucide-react';
import { PageBanner } from '../components/layout/PageBanner';
import { servicesData } from '../content/services';
import { FlowButton } from '../components/ui/flow-button';
import { FinalCTA } from '../components/sections/FinalCTA';
import styles from './ServiceDetail.module.css';

export const ServiceDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  return (
    <main id="main-content">
      <PageBanner
        overline="Advisory Mandate"
        title={service.title}
        description={service.shortDescription}
      />

      <section className={`section section-white ${styles.detailSection}`}>
        <div className="container">
          {/* Back link */}
          <div className={styles.backNav}>
            <Link to="/services" className={styles.backLink}>
              <ArrowLeft size={16} />
              <span>Back to all services</span>
            </Link>
          </div>

          <div className={styles.contentLayout}>
            {/* Main Content Body */}
            <div className={styles.mainCol}>
              <div className={styles.leadBlock}>
                <h2 className={styles.leadHeading}>Advisory Overview</h2>
                <p className={styles.leadText}>{service.fullDescription}</p>
              </div>

              {/* Target Audience */}
              <div className={styles.infoCard}>
                <h3 className={styles.subHeading}>Who This Advisory Is For</h3>
                <p className={styles.cardBody}>{service.targetAudience}</p>
              </div>

              {/* Key Discussion Topics */}
              <div className={styles.topicsSection}>
                <h3 className={styles.subHeading}>Core Consultation Topics</h3>
                <div className={styles.topicsGrid}>
                  {service.discussionTopics.map((topic, idx) => (
                    <div key={idx} className={styles.topicCard}>
                      <CheckCircle2 size={18} className={styles.topicIcon} />
                      <span className={styles.topicTitle}>{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deliverables */}
              <div className={styles.deliverablesSection}>
                <h3 className={styles.subHeading}>Advisory Deliverables</h3>
                <ul className={styles.deliverablesList}>
                  {service.deliverables.map((deliv, idx) => (
                    <li key={idx} className={styles.deliverableItem}>
                      <strong>{deliv}</strong>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Service Specific FAQs */}
              {service.faqs.length > 0 && (
                <div className={styles.faqSection}>
                  <h3 className={styles.subHeading}>Service Clarifications</h3>
                  <div className={styles.faqList}>
                    {service.faqs.map((faq, idx) => (
                      <div key={idx} className={styles.faqItem}>
                        <div className={styles.faqQuestion}>
                          <HelpCircle size={18} className={styles.faqIcon} />
                          <h4>{faq.question}</h4>
                        </div>
                        <p className={styles.faqAnswer}>{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Sticky CTA Card */}
            <aside className={styles.sidebarCol}>
              <div className={styles.stickyCard}>
                <img
                  src={service.image}
                  alt={service.title}
                  className={styles.sidebarImg}
                  width="400"
                  height="220"
                  loading="lazy"
                  decoding="async"
                />
                <div className={styles.sidebarBody}>
                  <span className={styles.sidebarOverline}>Consultation Booking</span>
                  <h3 className={styles.sidebarTitle}>Discuss {service.title}</h3>
                  <p className={styles.sidebarText}>
                    Schedule a 45-minute strategic review call to assess your current parameters and align on next steps.
                  </p>
                  <FlowButton
                    to="/contact"
                    text="Book Consultation"
                    variant="primary"
                    size="lg"
                    className={styles.fullWidthBtn}
                  />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <FinalCTA />
    </main>
  );
};
