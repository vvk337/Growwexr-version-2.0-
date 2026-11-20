import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ConsultationForm } from '../../forms/ConsultationForm';
import styles from './ConsultationSlideIn.module.css';

export const ConsultationSlideIn: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Auto slide up drawer after 3 seconds on desktop
  useEffect(() => {
    if (location.pathname === '/contact') {
      setIsOpen(false);
      return;
    }

    const timer = window.setTimeout(() => {
      setIsOpen(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Hide completely on the contact page to avoid duplicate forms
  if (location.pathname === '/contact') {
    return null;
  }

  const toggleDrawer = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <aside className={styles.drawerWrapper} aria-label="Consultation Drawer">
      {/* Slide Up / Slide Down Drawer Card */}
      <div
        className={`${styles.drawerCard} ${isOpen ? styles.drawerOpen : styles.drawerClosed}`}
        role="dialog"
        aria-modal="true"
        aria-label="Get In Touch"
      >
        {/* Clickable Header Bar (Touching/clicking anywhere on the header slides the form up and down) */}
        <div
          className={styles.drawerHeader}
          onClick={toggleDrawer}
          role="button"
          tabIndex={0}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Click to slide down form' : 'Click to slide up form'}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              toggleDrawer();
            }
          }}
        >
          {/* Top Handle Pill */}
          <div className={styles.handleBar}>
            <div className={styles.handlePill} />
          </div>

          <div className={styles.headerContent}>
            <h3 className={styles.drawerTitle}>Get In Touch</h3>
          </div>
        </div>

        {/* Scrollable Form Body */}
        <div className={styles.drawerBody}>
          <ConsultationForm
            variant="popup"
            hideTitle={true}
            leadSource="Desktop Slide Drawer"
            onSuccess={() => {
              // Keep success message visible inside drawer
            }}
          />
        </div>
      </div>
    </aside>
  );
};
