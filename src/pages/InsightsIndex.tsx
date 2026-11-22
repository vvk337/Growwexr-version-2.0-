import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock, AlertCircle } from 'lucide-react';
import { PageBanner } from '../components/layout/PageBanner';
import { getPublishedArticles } from '../content/insights';
import { FinalCTA } from '../components/sections/FinalCTA';
import styles from './InsightsIndex.module.css';
import { useSEO } from '../hooks/useSEO';
import { useJsonLd } from '../hooks/useJsonLd';
import { breadcrumbSchema, webPageSchema } from '../seo/schemas';

export const InsightsIndex: React.FC = () => {
  const [activeCategory, setActiveCategory] = React.useState('All');
  const allArticles = getPublishedArticles();

  const categories = ['All', ...Array.from(new Set(allArticles.map((a) => a.category)))];

  const filteredArticles =
    activeCategory === 'All'
      ? allArticles
      : allArticles.filter((article) => article.category === activeCategory);

  useSEO({
    title: 'Forex Market Insights & Research – Growwezy',
    description:
      'Educational perspectives on sovereign macroeconomic divergence, foreign exchange volatility, cross-border currency risk management, and capital preservation for NRI investors.',
    canonical: '/insights',
  });

  useJsonLd([
    webPageSchema({
      url: 'https://growwezy.com/insights',
      name: 'Forex Market Insights & Research – Growwezy',
      description: 'Educational forex and macroeconomic research for NRI investors in the UAE and Middle East.',
      breadcrumbs: [
        { name: 'Home', item: 'https://growwezy.com/' },
        { name: 'Insights', item: 'https://growwezy.com/insights' },
      ],
    }),
    breadcrumbSchema([
      { name: 'Home', item: 'https://growwezy.com/' },
      { name: 'Insights', item: 'https://growwezy.com/insights' },
    ]),
  ]);

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

          {/* Category Filter Pills */}
          <div className={styles.filterBar} role="tablist" aria-label="Filter articles by category">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat}
                className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterBtnActive : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat} {cat === 'All' ? `(${allArticles.length})` : ''}
              </button>
            ))}
          </div>

          {/* Articles Grid */}
          <div className={styles.articlesGrid}>
            {filteredArticles.map((article) => (
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

