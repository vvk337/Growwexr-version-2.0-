import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { servicesData } from '../../content/services';
import { AnimateIn } from '../ui/AnimateIn';
import { StaticAsciiHorizon } from '../ui/StaticAsciiHorizon';
import styles from './ServicesRail.module.css';

// Include the 2 confirmed services + 2 dedicated capability topics under those services
const serviceCards = [
  {
    title: servicesData[0].title,
    category: 'Core Advisory',
    description: servicesData[0].shortDescription,
    image: servicesData[0].image,
    link: `/services/${servicesData[0].slug}`
  },
  {
    title: servicesData[1].title,
    category: 'Wealth Strategy',
    description: servicesData[1].shortDescription,
    image: servicesData[1].image,
    link: `/services/${servicesData[1].slug}`
  },
  {
    title: 'Cross-Border Capital Architecture',
    category: 'NRI Specialization',
    description:
      'Structuring remittance timing, purchasing power preservation, and dual-currency exposures for UAE & GCC expatriates.',
    image:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=700&q=75',
    link: '/services/financial-asset-management'
  },
  {
    title: 'Systematic Macro & Volatility Modeling',
    category: 'Quantitative Research',
    description:
      'Rigorous monitoring of sovereign debt spreads, inflation differentials, and central bank terminal rates to guide FX allocations.',
    image:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=700&q=75',
    link: '/services/forex-advisory'
  }
];

export const ServicesRail: React.FC = () => {
  const railRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (railRef.current) {
      const scrollAmount = railRef.current.clientWidth * 0.75;
      railRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className={`section section-navy ${styles.servicesSection}`} aria-labelledby="services-heading">
      {/* Static ASCII Horizon Background (Zero GPU/CPU continuous load, bookmark-matched with Values section) */}
      <StaticAsciiHorizon cellSize={18} density={0.8} />

      <div className={`container ${styles.contentContainer}`}>
        {/* Header with Title & Controls */}
        <AnimateIn animation="default">
          <div className={styles.sectionHeader}>
            <div>
              <span className="section-overline">Core Capabilities</span>
              <h2 id="services-heading" className="section-title">
                What We Advise On
              </h2>
            </div>
            <div className={styles.headerActions}>
              <Link to="/services" className={`${styles.viewAllLink} arrow-link`}>
                <span>View all services</span>
                <ArrowUpRight size={16} />
              </Link>
              <div className={styles.navControls} aria-label="Services carousel controls">
                <button
                  type="button"
                  className={styles.controlBtn}
                  onClick={() => scroll('left')}
                  aria-label="Previous service"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  className={styles.controlBtn}
                  onClick={() => scroll('right')}
                  aria-label="Next service"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </AnimateIn>
      </div>

      {/* Horizontal Rail Container */}
      <div className={styles.railWrapper}>
        <div ref={railRef} className={styles.railTrack} tabIndex={0} role="region" aria-label="Services cards rail">
          {serviceCards.map((service, idx) => (
            <Link key={idx} to={service.link} className={styles.serviceCard}>
              <img
                src={service.image}
                alt={service.title}
                className={styles.cardBgImage}
                width="340"
                height="480"
                loading="lazy"
                decoding="async"
              />
              <div className={styles.cardGradient} />
              <div className={styles.cardContent}>
                <span className={styles.cardCategory}>{service.category}</span>
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardDesc}>{service.description}</p>
                <div className={styles.cardFooter}>
                  <span className={styles.exploreText}>View Advisory Details</span>
                  <div className={styles.cardArrow}>
                    <ArrowUpRight size={16} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

