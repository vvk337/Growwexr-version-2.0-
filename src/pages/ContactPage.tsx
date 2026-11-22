import React from 'react';
import { PageBanner } from '../components/layout/PageBanner';
import { SocialBar } from '../components/ui/SocialButtons';
import { ConsultationForm } from '../components/forms/ConsultationForm';
import styles from './ContactPage.module.css';
import { useSEO } from '../hooks/useSEO';
import { useJsonLd } from '../hooks/useJsonLd';
import { breadcrumbSchema, webPageSchema } from '../seo/schemas';

export const ContactPage: React.FC = () => {
  useSEO({
    title: 'Book a Forex Consultation – Contact Growwezy',
    description:
      'Schedule a confidential consultation with Growwezy\'s advisory team to review your forex risk parameters, trading goals, and cross-border financial objectives.',
    canonical: '/contact',
  });

  useJsonLd([
    webPageSchema({
      url: 'https://growwezy.com/contact',
      name: 'Contact & Consultation Booking – Growwezy',
      description: 'Book a confidential forex advisory consultation with Growwezy Global Tech.',
      breadcrumbs: [
        { name: 'Home', item: 'https://growwezy.com/' },
        { name: 'Contact', item: 'https://growwezy.com/contact' },
      ],
    }),
    breadcrumbSchema([
      { name: 'Home', item: 'https://growwezy.com/' },
      { name: 'Contact', item: 'https://growwezy.com/contact' },
    ]),
  ]);

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
