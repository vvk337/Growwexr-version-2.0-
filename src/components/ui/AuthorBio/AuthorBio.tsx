import React from 'react';
import { ExternalLink } from 'lucide-react';
import { ArticleAuthor } from '../../../content/insights';
import styles from './AuthorBio.module.css';

export interface AuthorBioProps {
  author?: ArticleAuthor;
}

/**
 * Reusable Author Bio Component
 * ------------------------------
 * Strictly renders null if author information is missing or unverified.
 * Never outputs placeholder or fictional author profiles.
 */
export const AuthorBio: React.FC<AuthorBioProps> = ({ author }) => {
  if (!author || !author.name.trim()) {
    return null;
  }

  const initials = author.name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <section className={styles.authorCard} aria-label="Author information">
      <div className={styles.avatarCol}>
        {author.avatar ? (
          <img
            src={author.avatar}
            alt={author.name}
            className={styles.avatarImg}
            width="64"
            height="64"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className={styles.avatarFallback} aria-hidden="true">
            {initials}
          </div>
        )}
      </div>

      <div className={styles.infoCol}>
        <div className={styles.authorHeader}>
          <h4 className={styles.authorName}>{author.name}</h4>
          {author.designation && (
            <span className={styles.authorDesignation}>{author.designation}</span>
          )}
        </div>

        {author.qualifications && author.qualifications.length > 0 && (
          <ul className={styles.qualificationsList}>
            {author.qualifications.map((qual, idx) => (
              <li key={idx} className={styles.qualBadge}>
                {qual}
              </li>
            ))}
          </ul>
        )}

        {author.bio && <p className={styles.authorBioText}>{author.bio}</p>}

        {author.socialUrls?.linkedin && (
          <div className={styles.authorSocials}>
            <a
              href={author.socialUrls.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              <span>Verified LinkedIn Profile</span>
              <ExternalLink size={12} aria-hidden="true" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
};
