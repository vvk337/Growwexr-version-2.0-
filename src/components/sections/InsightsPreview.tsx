import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock } from 'lucide-react';
import { insightsData } from '../../content/insights';
import styles from './InsightsPreview.module.css';

export const InsightsPreview: React.FC = () => {
  return (
    <section className={`section section-ice ${styles.insightsSection}`} aria-labelledby="insights-preview-heading">
      <div className="container">
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <div>
            <span className="section-overline">Educational Research</span>
            <h2 id="insights-preview-heading" className="section-title">
              Market Intelligence & Perspectives
            </h2>
          </div>
          <Link to="/insights" className={styles.viewAllLink}>
            <span>View all articles</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* 3 Editorial Cards Grid */}
        <div className={styles.cardsGrid}>
          {insightsData.map((article) => (
            <Link key={article.slug} to={`/insights/${article.slug}`} className={styles.articleCard}>
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
          ))}
        </div>
      </div>
    </section>
  );
};

