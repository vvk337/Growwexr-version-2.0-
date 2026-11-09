import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { ArrowLeft, Clock, ArrowUpRight } from 'lucide-react';
import { PageBanner } from '../components/layout/PageBanner';
import { insightsData } from '../content/insights';
import { FinalCTA } from '../components/sections/FinalCTA';
import styles from './InsightDetail.module.css';

export const InsightDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const article = insightsData.find((a) => a.slug === slug);

  if (!article) {
    return <Navigate to="/insights" replace />;
  }

  const relatedArticles = insightsData.filter((a) => a.slug !== slug).slice(0, 2);

  return (
    <main id="main-content">
      <PageBanner
        overline={article.category}
        title={article.title}
        description={article.summary}
      />

      <article className={`section section-white ${styles.articleSection}`}>
        <div className="container">
          <div className={styles.articleNav}>
            <Link to="/insights" className={styles.backLink}>
              <ArrowLeft size={16} />
              <span>Back to all insights</span>
            </Link>
          </div>

          <div className={styles.articleLayout}>
            {/* Main Reading Content */}
            <div className={styles.contentCol}>
              <div className={styles.articleMeta}>
                <span>Category: <strong>{article.category}</strong></span>
                <span>•</span>
                <span className={styles.readTime}>
                  <Clock size={13} />
                  {article.readTime}
                </span>
                <span>•</span>
                <span>{article.publishDate}</span>
              </div>

              <div className={styles.featuredImageWrapper}>
                <img
                  src={article.image}
                  alt={article.title}
                  className={styles.featuredImg}
                  width="800"
                  height="480"
                  loading="eager"
                  decoding="async"
                />
              </div>

              <div className={styles.articleProse}>
                {article.content.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              <div className={styles.disclaimerCallout}>
                <p>
                  <strong>Disclaimer:</strong> This article is authored for educational purposes by the research desk at Growwezy Global Tech. It does not constitute investment advice or a trade recommendation.
                </p>
              </div>
            </div>

            {/* Related Insights Sidebar */}
            <aside className={styles.sidebarCol}>
              <h3 className={styles.sidebarHeading}>Related Perspectives</h3>
              <div className={styles.relatedList}>
                {relatedArticles.map((rel) => (
                  <Link key={rel.slug} to={`/insights/${rel.slug}`} className={styles.relatedCard}>
                    <img
                      src={rel.image}
                      alt={rel.title}
                      className={styles.relatedImg}
                      width="160"
                      height="120"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className={styles.relatedBody}>
                      <span className={styles.relatedCat}>{rel.category}</span>
                      <h4 className={styles.relatedTitle}>{rel.title}</h4>
                      <span className={styles.readLinkSmall}>
                        Read <ArrowUpRight size={13} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </article>

      <FinalCTA />
    </main>
  );
};

