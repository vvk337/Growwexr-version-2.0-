import React from 'react';
import { PageBanner } from '../components/layout/PageBanner';
import { SocialBar } from '../components/ui/SocialButtons';
import { ConsultationForm } from '../components/forms/ConsultationForm';
import styles from './ContactPage.module.css';

export const ContactPage: React.FC = () => {
  return (
    <main id="main-content">
      <PageBanner
        overline="Direct Dialogue"
        title="Contact & Consultation Booking"
        description="Schedule a confidential consultation to review your foreign exchange risk parameters and cross-border financial objectives."
      />

      <section className={`section section-white ${styles.contactSection}`}>
        <div className="container">
          <div className={styles.formCol}>
            <ConsultationForm variant="page" leadSource="Contact Page" />

            {/* Quick Direct Communication Channels */}
            <div className={styles.quickChannelsBox}>
              <span className={styles.quickChannelsTitle}>Or Connect With Us Directly</span>
              <SocialBar variant="pill" align="center" className={styles.contactSocialBar} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
