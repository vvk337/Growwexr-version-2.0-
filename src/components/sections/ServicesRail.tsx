import React, { useRef, useEffect } from 'react';
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
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const images = imageRefs.current.filter((el): el is HTMLImageElement => el !== null);
    if (images.length === 0) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      images.forEach((img) => {
        img.style.filter = 'none';
      });
      return;
    }

    let rafId: number | null = null;
    let lastProgress = -1;

    const smoothstep = (t: number) => t * t * (3 - 2 * t);

    const updateScrollProgress = () => {
      const vh = window.innerHeight;
      const railRect = rail.getBoundingClientRect();

      // Start unblurring when top of cards enters viewport near bottom (96% vh)
      // Fully complete unblurring when cards are centered in full view (38% vh)
      const startY = vh * 0.96;
      const endY = vh * 0.38;

      const currentProgress = Math.min(Math.max((startY - railRect.top) / (startY - endY), 0), 1);

      // Skip DOM updates if progress has settled (e.g. far above or far below active zone)
      if (Math.abs(currentProgress - lastProgress) < 0.002) return;
      lastProgress = currentProgress;

      const eased = smoothstep(currentProgress);

      // Maximum blur is 16px when section first appears, smoothly resolving to 0px (and re-blurring on reverse scroll)
      const maxBlur = 16;
      const blurAmount = (1 - eased) * maxBlur;

      images.forEach((img) => {
        img.style.filter = `blur(${blurAmount.toFixed(2)}px)`;
      });
    };

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        updateScrollProgress();
        rafId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    // Initial calculation on mount
    updateScrollProgress();

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

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
                ref={(el) => {
                  imageRefs.current[idx] = el;
                }}
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

