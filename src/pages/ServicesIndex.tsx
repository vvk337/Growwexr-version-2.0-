import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2, ChevronDown } from 'lucide-react';
import { PageBanner } from '../components/layout/PageBanner';
import { servicesData, ServiceItem } from '../content/services';
import { FlowButton } from '../components/ui/flow-button';
import { FinalCTA } from '../components/sections/FinalCTA';
import styles from './ServicesIndex.module.css';
import { useSEO } from '../hooks/useSEO';
import { useJsonLd } from '../hooks/useJsonLd';
import { breadcrumbSchema, webPageSchema } from '../seo/schemas';

const imagePositions: Record<string, string> = {
  'forex-signals': 'center 30%',
  'comex-signals': 'center 35%',
  'combo-signals': 'center 40%',
  'hni-signals': 'center 25%',
  'account-management': 'center 25%',
};

export const ServicesIndex: React.FC = () => {
  const [isDesktop, setIsDesktop] = React.useState(() =>
    typeof window !== 'undefined' ? window.innerWidth >= 860 : true
  );

  useSEO({
    title: 'Trading Signals & Account Management Services',
    description:
      'Explore Growwezy\'s forex signals, Comex gold & silver signals, combo plans, and trade-only account management for NRIs and international clients in the UAE and Middle East.',
    canonical: '/services',
  });

  useJsonLd([
    webPageSchema({
      url: 'https://growwezy.com/services',
      name: 'Trading Signals & Account Management – Growwezy',
      description: 'Forex signals, Comex signals, combo plans, and trade-only account management for Middle East NRIs.',
      breadcrumbs: [
        { name: 'Home', item: 'https://growwezy.com/' },
        { name: 'Services', item: 'https://growwezy.com/services' },
      ],
    }),
    breadcrumbSchema([
      { name: 'Home', item: 'https://growwezy.com/' },
      { name: 'Services', item: 'https://growwezy.com/services' },
    ]),
  ]);

  React.useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 860);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const signalsServices = servicesData.filter((s) => s.id !== 'account-management');
  const accountManagement = servicesData.find((s) => s.id === 'account-management');

  const renderServiceCard = (service: ServiceItem, isFullWidth = false) => {
    const focalPoint = imagePositions[service.id] || 'center center';

    return (
      <article
        key={service.id}
        className={isFullWidth ? styles.fullWidthCard : styles.serviceCard}
        aria-labelledby={`service-title-${service.id}`}
      >
        <div className={isFullWidth ? styles.fullWidthMedia : styles.cardMedia}>
          <img
            src={service.image}
            alt={service.title}
            className={styles.serviceImg}
            style={{ objectPosition: focalPoint }}
            width="600"
            height="380"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className={isFullWidth ? styles.fullWidthContent : styles.cardContent}>
          <div className={styles.metaRow}>
            <span className={styles.serviceTag}>{service.category}</span>
            {service.offerPrice ? (
              <div className={styles.priceWrapper}>
                {service.originalPrice && (
                  <span className={styles.originalPrice}>{service.originalPrice}</span>
                )}
                <span className={styles.offerPrice}>{service.offerPrice}</span>
              </div>
            ) : (
              <span className={styles.consultationTag}>Custom Terms</span>
            )}
          </div>

          <h3 id={`service-title-${service.id}`} className={isFullWidth ? styles.fullWidthTitle : styles.serviceTitle}>
            {service.title}
          </h3>
          <p className={styles.serviceDesc}>{service.shortDescription}</p>

          {/* Features: Collapsible toggle on mobile, direct list on desktop */}
          <details
            key={isDesktop ? `desktop-${service.id}` : `mobile-${service.id}`}
            open={isDesktop ? true : undefined}
            className={styles.featuresToggle}
          >
            <summary className={styles.featuresSummary}>
              <span>What's included</span>
              <ChevronDown size={15} className={styles.featuresChevron} aria-hidden="true" />
            </summary>
            <div className={styles.featuresList}>
              {service.features.map((feature, fIdx) => (
                <div key={fIdx} className={styles.featureItem}>
                  <CheckCircle2 size={16} className={styles.featureIcon} />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </details>

          <div className={styles.ctaRow}>
            <FlowButton
              to="/contact"
              text="Book Consultation"
              variant="primary"
              size="sm"
              className={styles.consultationBtn}
            />
            <Link to={`/services/${service.slug}`} className={styles.detailLink}>
              <span>Explore {service.title}</span>
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </article>
    );
  };

  return (
    <main id="main-content">
      <PageBanner
        overline="Advisory Scope & Plans"
        title="Trading Signals & Account Management"
        description="Structured foreign exchange signals, precious metals coverage, and trade-only account management for NRIs and international participants."
      />

      <section className={`section ${styles.servicesSection}`} aria-labelledby="services-overview-heading">
        <div className="container">
          {/* Screen reader accessible heading */}
          <h2 id="services-overview-heading" className={styles.visuallyHidden}>
            Our Services & Plans
          </h2>

          {/* Split Section Header */}
          <div className={styles.introHeader}>
            <div className={styles.badgeCol}>
              <div className={styles.labelRow}>
                <span className={styles.smallLabel}>OUR</span>
                <span className={styles.accentDash} aria-hidden="true" />
              </div>
              <div className={`${styles.servicesHeading} brand-gradient-text`}>SERVICES</div>
            </div>

            <div className={styles.headerDivider} aria-hidden="true" />

            <div className={styles.statementCol}>
              <p className={styles.statementHeading}>
                Research. Signals. Disciplined Execution.
              </p>
              <p className={styles.supportingText}>
                Choose trading signals you can act on yourself, or speak with us about having our team execute trades on your behalf. With account management, your funds stay securely in your own broker account.
              </p>
            </div>
          </div>

          {/* Responsive Services Cards: Desktop 2×2 grid + full-width card; Mobile swipeable signals carousel + standalone card */}
          <div className={styles.servicesContainer}>
            <div className={styles.signalsGrid}>
              {signalsServices.map((service) => renderServiceCard(service, false))}
            </div>

            {accountManagement && (
              <div className={styles.accountWrapper}>
                {renderServiceCard(accountManagement, true)}
              </div>
            )}
          </div>
        </div>
      </section>

      <FinalCTA />
    </main>
  );
};
