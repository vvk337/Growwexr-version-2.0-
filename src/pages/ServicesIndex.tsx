import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { PageBanner } from '../components/layout/PageBanner';
import { servicesData } from '../content/services';
import { FinalCTA } from '../components/sections/FinalCTA';
import styles from './ServicesIndex.module.css';

export const ServicesIndex: React.FC = () => {
  return (
    <main id="main-content">
      <PageBanner
        overline="Advisory Scope"
        title="Our Capabilities"
        description="Structured foreign exchange risk advisory and financial asset management for NRIs and international participants in the Middle East."
      />

      <section className={`section section-white ${styles.servicesSection}`}>
        <div className="container">
          <div className={styles.introBlock}>
            <span className="section-overline">Focused Mandates</span>
            <h2 className="section-title">Independent, Fee-Only Advisory</h2>
            <p className={styles.introText}>
              We do not distribute high-commission retail products or hold client funds. Our role is strictly analytical and advisory: empowering you to make informed decisions with clarity.
            </p>
          </div>

          <div className={styles.servicesGrid}>
            {servicesData.map((service) => (
              <div key={service.id} className={styles.serviceBlock}>
                <div className={styles.imageCol}>
                  <img
                    src={service.image}
                    alt={service.title}
                    className={styles.serviceImg}
                    width="540"
                    height="380"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className={styles.contentCol}>
                  <span className={styles.serviceTag}>Confirmed Service</span>
                  <h3 className={styles.serviceTitle}>{service.title}</h3>
                  <p className={styles.serviceDesc}>{service.fullDescription}</p>

                  <div className={styles.featuresList}>
                    {service.features.map((feature, fIdx) => (
                      <div key={fIdx} className={styles.featureItem}>
                        <CheckCircle2 size={16} className={styles.featureIcon} />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className={styles.ctaRow}>
                    <Link to={`/services/${service.slug}`} className={styles.detailLink}>
                      <span>Explore {service.title}</span>
                      <ArrowUpRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </main>
  );
};

