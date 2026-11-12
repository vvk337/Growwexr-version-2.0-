import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Eye, MessageSquare, ArrowRight } from 'lucide-react';
import { AnimateIn } from '../ui/AnimateIn';
import styles from './AboutIntro.module.css';

export const AboutIntro: React.FC = () => {
  return (
    <section className={`section ${styles.aboutSection}`} aria-labelledby="about-intro-title">
      <div className="container">
        {/* Asymmetrical Top Layout */}
        <AnimateIn animation="default">
          <div className={styles.introHeader}>
            <div className={styles.badgeCol}>
              <div className={styles.aboutRow}>
                <span className={styles.aboutLabel}>ABOUT</span>
                <span className={styles.aboutDash} aria-hidden="true" />
              </div>
              <div className={styles.usHeading}>US</div>
            </div>

            <div className={styles.headerDivider} aria-hidden="true" />

            <div className={styles.statementCol}>
              <h2 id="about-intro-title" className={styles.statementHeading}>
                A considered approach to global markets, built around your objectives.
              </h2>
              <div className={styles.aboutLinkWrap}>
                <Link to="/about" className={`${styles.aboutLink} arrow-link`}>
                  <span>Learn more about our advisory philosophy</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </AnimateIn>

        {/* Three Card Row: 2 text cards + 1 image card */}
        <div className={styles.cardsGrid}>
          {/* Card 1: Clear Perspective */}
          <AnimateIn delay={100} animation="default">
            <div className={styles.textCard}>
              <div className={styles.cardIconBox}>
                <Compass size={22} className={styles.cardIcon} />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>Clear Perspective</h3>
                <p className={styles.cardText}>
                  Cutting through market noise with objective macroeconomic fundamentals and quantitative currency correlation models.
                </p>
              </div>
            </div>
          </AnimateIn>

          {/* Card 2: Research-Led Thinking */}
          <AnimateIn delay={200} animation="default">
            <div className={styles.textCard}>
              <div className={styles.cardIconBox}>
                <Eye size={22} className={styles.cardIcon} />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>Research-Led Thinking</h3>
                <p className={styles.cardText}>
                  Every strategy is rooted in sovereign debt yields, trade flows, and central bank monetary paths, eliminating speculative bias.
                </p>
              </div>
            </div>
          </AnimateIn>

          {/* Card 3: Editorial Image Card */}
          <AnimateIn delay={300} animation="default">
            <div className={styles.imageCard}>
              <img
                src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=700&q=75"
                alt="Ongoing Dialogue and Collaboration"
                className={styles.imageCardImg}
                width="700"
                height="450"
                loading="lazy"
                decoding="async"
              />
              <div className={styles.imageCardOverlay}>
                <div className={styles.imageCardIconBox}>
                  <MessageSquare size={20} />
                </div>
                <h3 className={styles.imageCardTitle}>Ongoing Dialogue</h3>
                <p className={styles.imageCardText}>
                  Direct, transparent consultation keeping your portfolio aligned with evolving global conditions.
                </p>
              </div>
            </div>
          </AnimateIn>
        </div>
      </div>

      {/* Large Low-Contrast Word Marquee */}
      <div className={styles.wordMarquee} aria-hidden="true">
        <div className={styles.marqueeTrack}>
          <span>Research</span>
          <span className={styles.marqueeSlash}>/</span>
          <span>Perspective</span>
          <span className={styles.marqueeSlash}>/</span>
          <span>Discipline</span>
          <span className={styles.marqueeSlash}>/</span>
          <span>Dialogue</span>
          <span className={styles.marqueeSlash}>/</span>
          <span>Research</span>
          <span className={styles.marqueeSlash}>/</span>
          <span>Perspective</span>
          <span className={styles.marqueeSlash}>/</span>
          <span>Discipline</span>
          <span className={styles.marqueeSlash}>/</span>
          <span>Dialogue</span>
          <span className={styles.marqueeSlash}>/</span>
        </div>
      </div>
    </section>
  );
};
