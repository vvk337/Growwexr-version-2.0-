import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock, AlertCircle } from 'lucide-react';
import { PageBanner } from '../components/layout/PageBanner';
import { insightsData } from '../content/insights';
import { FinalCTA } from '../components/sections/FinalCTA';
import styles from './InsightsIndex.module.css';

export const InsightsIndex: React.FC = () => {
  return (
    <main id="main-content">
      <PageBanner
        overline="Research & Intelligence"
        title="Market Insights"
        description="Educational perspectives on sovereign macroeconomic divergence, foreign exchange volatility, and cross-border currency risk management."
      />

      <section className={`section section-white ${styles.insightsSection}`}>
        <div className="container">
          {/* Regulatory Disclaimer Banner */}
          <div className={styles.disclaimerBox}>
            <AlertCircle size={20} className={styles.disclaimerIcon} />
            <p className={styles.disclaimerText}>
              <strong>Educational Notice:</strong> The articles below represent general macroeconomic analysis and risk management principles. They are intended for educational evaluation and do not constitute specific investment advice, trade recommendations, or guarantees of market outcomes.
            </p>
          </div>

          {/* Articles Grid */}
          <div className={styles.articlesGrid}>
            {insightsData.map((article) => (
              <Link key={article.slug} to={`/insights/${article.slug}`} className={styles.articleCard}>
                <div className={styles.imageWrap}>
                  <img
                    src={article.image}
                    alt={article.title}
                    className={styles.articleImg}
                    width="400"
                    height="260"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className={styles.categoryBadge}>{article.category}</span>
                </div>
                <div className={styles.articleBody}>
                  <div className={styles.metaRow}>
                    <span>{article.publishDate}</span>
                    <span>•</span>
                    <span className={styles.readTime}>
                      <Clock size={12} />
                      {article.readTime}
                    </span>
                  </div>
                  <h2 className={styles.articleTitle}>{article.title}</h2>
                  <p className={styles.articleSummary}>{article.summary}</p>
                  <div className={styles.readLink}>
                    <span>Read Full Article</span>
                    <ArrowUpRight size={15} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </main>
  );
};

