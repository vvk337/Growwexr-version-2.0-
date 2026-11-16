import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { AnimateIn } from '../ui/AnimateIn';
import { StaticAsciiHorizon } from '../ui/StaticAsciiHorizon';
import styles from './ServicesRail.module.css';

interface ServiceCardItem {
  title: string;
  category: string;
  description: string;
  originalPrice: string;
  offerPrice: string;
  image: string;
  link: string;
  objectPosition: string;
}

const serviceCards: ServiceCardItem[] = [
  {
    title: 'Forex Signals',
    category: 'CURRENCY MARKETS',
    description: 'Guidance on potential entries and exits.',
    originalPrice: '$400',
    offerPrice: '$300',
    image: '/assets/services/services-forex-signals.webp',
    link: '/services',
    objectPosition: 'center 20%'
  },
  {
    title: 'Comex Signals',
    category: 'GOLD & SILVER',
    description: 'Focused trading signals for gold and silver.',
    originalPrice: '$499',
    offerPrice: '$350',
    image: '/assets/services/services-comex-signals.webp',
    link: '/services',
    objectPosition: 'center 15%'
  },
  {
    title: 'Combo Signals',
    category: 'FOREX & PRECIOUS METALS',
    description: 'Forex, gold, and silver signals in one plan.',
    originalPrice: '$699',
    offerPrice: '$489',
    image: '/assets/services/services-combo-signals.webp',
    link: '/services',
    objectPosition: 'center 35%'
  },
  {
    title: 'HNI Signals',
    category: 'DEDICATED SUPPORT',
    description: '24/7 relationship manager support. Additional features discussed in consultation.',
    originalPrice: '$999',
    offerPrice: '$699',
    image: '/assets/services/services-hni-signals.webp',
    link: '/services',
    objectPosition: 'center 22%'
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
        {/* Asymmetrical Top Layout matching About Intro */}
        <AnimateIn animation="default">
          <div className={styles.introHeader}>
            <div className={styles.badgeCol}>
              <div className={styles.labelRow}>
                <span className={styles.smallLabel}>OUR</span>
                <span className={styles.cyanDash} aria-hidden="true" />
              </div>
              <div className={`${styles.servicesWord} brand-gradient-text`}>SERVICES</div>
            </div>

            <div className={styles.headerDivider} aria-hidden="true" />

            <div className={styles.statementCol}>
              <h2 id="services-heading" className={styles.statementHeading}>
                Research. Signals. Support.
              </h2>
              <p className={styles.pricingNote}>Monthly plans · Prices in USD</p>
              <div className={styles.linkWrap}>
                <Link to="/services" className={`${styles.pricingLink} arrow-link`}>
                  <span>View All Plans & Pricing</span>
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
          </div>
        </AnimateIn>
      </div>

      {/* Horizontal Rail Container */}
      <div className={styles.railWrapper}>
        <div ref={railRef} className={styles.railTrack} tabIndex={0} role="region" aria-label="Services cards rail">
          {serviceCards.map((service, idx) => (
            <Link
              key={idx}
              to={service.link}
              className={styles.serviceCard}
              aria-label={`${service.title} - ${service.category}: ${service.offerPrice} per month (regular ${service.originalPrice} USD)`}
            >
              <img
                ref={(el) => {
                  imageRefs.current[idx] = el;
                }}
                src={service.image}
                alt={service.title}
                className={styles.cardBgImage}
                style={{ objectPosition: service.objectPosition }}
                width="340"
                height="500"
                loading="lazy"
                decoding="async"
              />
              <div className={styles.cardGradient} aria-hidden="true" />
              <div className={styles.cardContent}>
                <span className={styles.cardCategory}>{service.category}</span>
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardDesc}>{service.description}</p>
                <div className={styles.cardDivider} aria-hidden="true" />
                <div className={styles.cardFooter}>
                  <div className={styles.priceColumn}>
                    <div className={styles.originalPriceRow}>
                      <span className={styles.originalPrice}>{service.originalPrice}</span>
                      <span className={styles.currency}>USD</span>
                    </div>
                    <div className={styles.offerPriceRow}>
                      <span className={styles.offerPrice}>{service.offerPrice}</span>
                      <span className={styles.billingPeriod}>/ month</span>
                    </div>
                  </div>
                  <div className={styles.planAction} aria-hidden="true">
                    <span className={styles.viewPlanText}>View plan</span>
                    <ArrowUpRight size={15} className={styles.actionArrow} />
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

