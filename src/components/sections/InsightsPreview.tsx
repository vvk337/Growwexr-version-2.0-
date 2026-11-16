import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock } from 'lucide-react';
import { insightsData } from '../../content/insights';
import { AnimateIn } from '../ui/AnimateIn';
import { StaticAsciiHorizon } from '../ui/StaticAsciiHorizon';
import styles from './InsightsPreview.module.css';

export const InsightsPreview: React.FC = () => {
  return (
    <section className={`section section-ice ${styles.insightsSection}`} aria-labelledby="insights-preview-heading">
      {/* Mirrored ASCII currency horizon background layer bookmatched with Why Growwezy above */}
      <StaticAsciiHorizon
        theme="light"
        cellSize={18}
        density={0.8}
        className={styles.bgArtwork}
      />

      <div className={`container ${styles.contentContainer}`}>
        {/* Accessible screen reader heading */}
        <h2 id="insights-preview-heading" className={styles.visuallyHidden}>
          Market Intelligence & Insights
        </h2>

        {/* Section Header with Brand Split Layout */}
        <AnimateIn animation="default">
          <div className={styles.introHeader}>
            <div className={styles.badgeCol}>
              <div className={styles.labelRow}>
                <span className={styles.smallLabel}>OUR</span>
                <span className={styles.accentDash} aria-hidden="true" />
              </div>
              <div className={`${styles.insightsHeading} brand-gradient-text`}>INSIGHTS</div>
            </div>

            <div className={styles.headerDivider} aria-hidden="true" />

            <div className={styles.statementCol}>
              <p className={styles.statementHeading}>
                Market intelligence and practical trading perspectives.
              </p>
              <p className={styles.supportingText}>
                Educational analysis on currency dynamics, precious metals, and risk management strategies.
              </p>
              <div>
                <Link to="/insights" className={`${styles.viewAllLink} arrow-link`}>
                  <span>View all articles</span>
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </AnimateIn>

        {/* 3 Editorial Cards Grid / Mobile Carousel */}
        <div className={styles.cardsGrid}>
          {insightsData.map((article, idx) => (
            <AnimateIn
              key={article.slug}
              delay={(100 * (idx + 1)) as 100 | 200 | 300}
              animation="default"
              className={styles.cardItem}
            >
              <Link to={`/insights/${article.slug}`} className={styles.articleCard}>
                <div className={styles.imageContainer}>
                  <img
                    src={article.image}
                    alt={article.title}
                    className={styles.articleImage}
                    loading="lazy"
                  />
                  <span className={styles.categoryBadge}>{article.category}</span>
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.metaRow}>
                    <span className={styles.metaNotice}>{article.publishDate}</span>
                    <span className={styles.metaDot}>•</span>
                    <span className={styles.metaTime}>
                      <Clock size={13} className={styles.clockIcon} />
                      {article.readTime}
                    </span>
                  </div>
                  <h3 className={styles.articleTitle}>{article.title}</h3>
                  <p className={styles.articleSummary}>{article.summary}</p>
                  <div className={styles.readMore}>
                    <span>Read Analysis</span>
                    <ArrowUpRight size={15} />
                  </div>
                </div>
              </Link>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
};

