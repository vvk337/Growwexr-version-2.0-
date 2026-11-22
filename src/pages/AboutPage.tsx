import React, { useState, useEffect, useRef } from 'react';
import { PageBanner } from '../components/layout/PageBanner';
import { AboutIntro } from '../components/sections/AboutIntro';
import { FinalCTA } from '../components/sections/FinalCTA';
import styles from './AboutPage.module.css';
import { useSEO } from '../hooks/useSEO';
import { useJsonLd } from '../hooks/useJsonLd';
import { breadcrumbSchema, webPageSchema } from '../seo/schemas';

interface CounterStatProps {
  value: number;
  suffix?: string;
  duration?: number;
  startAnimation: boolean;
}

const CounterStat: React.FC<CounterStatProps> = ({
  value,
  suffix = '',
  duration = 1600,
  startAnimation,
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!startAnimation) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Classic countdown/countup easeOutExpo curve
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.round(ease * value);
      setDisplayValue(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [value, duration, startAnimation]);

  return (
    <div className={styles.numberWrapper}>
      <span className={styles.factNumber}>
        {startAnimation ? displayValue.toLocaleString() : '0'}
      </span>
      {suffix && <span className={styles.factUnit}>{suffix}</span>}
    </div>
  );
};

export const AboutPage: React.FC = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const keyFactsRef = useRef<HTMLDivElement>(null);

  useSEO({
    title: 'About Growwezy – Disciplined Forex Advisory Since 2019',
    description:
      'Established in India in 2019, Growwezy Global Tech serves 2,800+ retail clients with specialized forex trading advisory and financial asset management across the UAE and Middle East.',
    canonical: '/about',
  });

  useJsonLd([
    webPageSchema({
      url: 'https://growwezy.com/about',
      name: 'About Growwezy Global Tech',
      description: 'Established in India in 2019, serving 2,800+ clients with forex advisory across the UAE and Middle East.',
      breadcrumbs: [
        { name: 'Home', item: 'https://growwezy.com/' },
        { name: 'About', item: 'https://growwezy.com/about' },
      ],
    }),
    breadcrumbSchema([
      { name: 'Home', item: 'https://growwezy.com/' },
      { name: 'About', item: 'https://growwezy.com/about' },
    ]),
  ]);

  useEffect(() => {
    const el = keyFactsRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <main id="main-content">
      <PageBanner
        overline="About Growwezy"
        title="Disciplined Advisory for Global Participants"
        description="Established in India in 2019, Growwezy Global Tech provides specialized forex trading advisory and financial asset management for NRIs and international clients across the Middle East."
      />

      <section className={`section section-white ${styles.storySection}`}>
        <div className="container">
          <div className={styles.storyGrid}>
            <div className={styles.storyContent}>
              <span className="section-overline">OUR STORY</span>
              <h2 className={`section-title ${styles.storyTitle}`}>
                Rooted in India.
                <br className={styles.desktopBr} />
                Connected to{' '}
                <br className={styles.desktopBr} />
                Global Markets.
              </h2>
              <p className={styles.leadPara}>
                Established in India seven years ago, Growwezy has grown to serve more than 2,800 retail clients, alongside corporate investors. With an office in the Middle East, we support clients across the region through financial consultancy, forex trading advisory, and account management.
              </p>
              <p className={styles.bodyPara}>
                Our team brings together specialists in forex markets and portfolio management, supporting both individual and business objectives. From personalised trading guidance to managing investments for companies, our approach begins with understanding each client’s priorities and the support they need.
              </p>

              <div className={styles.keyFacts} ref={keyFactsRef}>
                <div className={styles.factItem}>
                  <CounterStat
                    value={9}
                    suffix="Years"
                    duration={1400}
                    startAnimation={hasAnimated}
                  />
                  <span className={styles.factLabel}>Since Our Establishment</span>
                </div>
                <div className={styles.factItem}>
                  <CounterStat
                    value={2800}
                    suffix="+"
                    duration={1800}
                    startAnimation={hasAnimated}
                  />
                  <span className={styles.factLabel}>Retail Clients</span>
                </div>
                <div className={styles.factItem}>
                  <CounterStat
                    value={5}
                    suffix="+"
                    duration={1200}
                    startAnimation={hasAnimated}
                  />
                  <span className={styles.factLabel}>Corporate Investors</span>
                </div>
                <div className={styles.factItem}>
                  <CounterStat
                    value={2}
                    duration={1000}
                    startAnimation={hasAnimated}
                  />
                  <span className={styles.factLabel}>
                    Companies Under
                    <br className={styles.desktopBr} />
                    Investment Management
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.storyImageCol}>
              <div className={styles.storyCard}>
                <img
                  src="/assets/about-specialist-research.webp"
                  alt="Growwezy Global Tech Specialist Research"
                  className={styles.storyImage}
                  width="800"
                  height="520"
                  loading="lazy"
                  decoding="async"
                />
                <div className={styles.storyCardOverlay}>
                  <span className={styles.storyTag}>INDIA & THE MIDDLE EAST</span>
                  <span className={styles.storyCaption}>Local presence. A global market perspective.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three Pillars Introduction on Pale Ice */}
      <AboutIntro />

      <FinalCTA />
    </main>
  );
};

