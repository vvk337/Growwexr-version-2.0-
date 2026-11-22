import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { ArrowLeft, Clock, ArrowUpRight } from 'lucide-react';
import { PageBanner } from '../components/layout/PageBanner';
import { getPublishedArticles, getArticleBySlug } from '../content/insights';
import { AuthorBio } from '../components/ui/AuthorBio/AuthorBio';
import { MarkdownContent } from '../components/ui/MarkdownContent/MarkdownContent';
import { FinalCTA } from '../components/sections/FinalCTA';
import styles from './InsightDetail.module.css';
import { useSEO } from '../hooks/useSEO';
import { useJsonLd } from '../hooks/useJsonLd';
import { breadcrumbSchema, articleSchema } from '../seo/schemas';

export const InsightDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const article = slug ? getArticleBySlug(slug) : undefined;

  if (!article || article.status !== 'published') {
    return <Navigate to="/insights" replace />;
  }

  const allPublished = getPublishedArticles();
  const relatedArticles = article.relatedSlugs
    ? article.relatedSlugs
        .map((rSlug) => allPublished.find((a) => a.slug === rSlug))
        .filter((a): a is typeof article => Boolean(a))
    : allPublished.filter((a) => a.slug !== slug).slice(0, 2);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useSEO({
    title: article.seoTitle || article.title,
    description: article.metaDescription || article.summary,
    canonical: `/insights/${article.slug}`,
    ogType: 'article',
  });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useJsonLd([
    articleSchema({
      url: `https://growwezy.com/insights/${article.slug}`,
      title: article.title,
      description: article.summary,
      image: article.image,
      author: article.author,
      datePublished: article.datePublished,
      dateModified: article.dateModified,
    }),
    breadcrumbSchema([
      { name: 'Home', item: 'https://growwezy.com/' },
      { name: 'Insights', item: 'https://growwezy.com/insights' },
      { name: article.title, item: `https://growwezy.com/insights/${article.slug}` },
    ]),
  ]);

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

              <MarkdownContent content={article.content} className={styles.articleProse} />

              {/* Optional Verified Author Profile (Strictly null if omitted) */}
              <AuthorBio author={article.author} />

              {/* Optional Authoritative References */}
              {article.references && article.references.length > 0 && (
                <div className={styles.referencesBlock} style={{ margin: '24px 0 16px', fontSize: '0.875rem', color: '#64748b' }}>
                  <h4 style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#132856', marginBottom: '8px' }}>
                    References & Data Sources:
                  </h4>
                  <ul style={{ paddingLeft: '20px', margin: 0 }}>
                    {article.references.map((ref, rIdx) => (
                      <li key={rIdx} style={{ marginBottom: '4px' }}>
                        {ref.url ? (
                          <a href={ref.url} target="_blank" rel="noopener noreferrer" style={{ color: '#075af7' }}>
                            {ref.title}
                          </a>
                        ) : (
                          <span>{ref.title}</span>
                        )}
                        {ref.note && <span> — {ref.note}</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

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

