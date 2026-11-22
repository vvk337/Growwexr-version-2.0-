import React from 'react';
import { Button } from '../components/ui/Button';
import styles from './NotFoundPage.module.css';
import { useSEO } from '../hooks/useSEO';

export const NotFoundPage: React.FC = () => {
  useSEO({
    title: '404 – Page Not Found',
    description: 'The page you are looking for does not exist on Growwezy Global Tech. Return to the homepage or contact our advisory desk.',
    canonical: '/404',
    noIndex: true,
  });

  return (
    <main id="main-content" className={styles.notFoundPage}>
      <div className={styles.atmosphere} aria-hidden="true">
        <div className={styles.glowRibbon} />
      </div>

      <div className={`container ${styles.notFoundInner}`}>
        <span className={styles.badge}>404 — Page Not Found</span>
        <h1 className={styles.title}>Perspective Unclear</h1>
        <p className={styles.description}>
          The page you are looking for does not exist or has been relocated within our advisory architecture.
        </p>

        <div className={styles.actions}>
          <Button to="/" variant="primary" size="lg">
            Return to Homepage
          </Button>
          <Button to="/contact" variant="outline" size="lg">
            Contact Advisory Desk
          </Button>
        </div>
      </div>
    </main>
  );
};
