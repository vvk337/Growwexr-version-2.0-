import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../../config/site';
import { FlowButton } from '../ui/flow-button';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer} role="contentinfo">
      {/* Top Pre-Footer Consultation Invite */}
      <div className={styles.preFooter}>
        <div className={`container ${styles.preFooterInner}`}>
          <div className={styles.preFooterText}>
            <span className={styles.preFooterOverline}>Next Step</span>
            <h2 className={styles.preFooterHeading}>
              Ready for disciplined forex guidance?
            </h2>
            <p className={styles.preFooterDesc}>
              Schedule a strategic consultation to review your currency risk exposure and cross-border portfolio architecture.
            </p>
          </div>
          <div className={styles.preFooterAction}>
            <FlowButton to="/contact" text="Book a Consultation" variant="white" size="lg" />
          </div>
        </div>
      </div>

      {/* Main Footer Links & Information */}
      <div className={`container ${styles.mainFooter}`}>
        <div className={styles.grid}>
          {/* Brand Column */}
          <div className={styles.brandCol}>
            <Link to="/" className={styles.footerLogoLink} aria-label={`${siteConfig.name} Home`}>
              <img
                src={siteConfig.logo.full}
                alt={siteConfig.logo.alt}
                className={styles.footerLogo}
                width="160"
                height="42"
              />
            </Link>
            <p className={styles.brandBio}>
              Forex trading advisory and financial asset management services for NRIs and international clients across the Middle East. Established in India in 2020.
            </p>
            <div className={styles.contactBrief}>
              <p>Email: <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a></p>
              <p>Presence: {siteConfig.contact.address}</p>
            </div>
          </div>

          {/* Navigation Column 1: Services */}
          <div className={styles.navCol}>
            <h3 className={styles.colTitle}>Services</h3>
            <ul className={styles.linkList}>
              <li>
                <Link to="/services/forex-advisory">Forex Trading Advisory</Link>
              </li>
              <li>
                <Link to="/services/financial-asset-management">Financial Asset Management</Link>
              </li>
              <li>
                <Link to="/services">All Advisory Capabilities</Link>
              </li>
              <li>
                <Link to="/approach">Our 3-Step Approach</Link>
              </li>
            </ul>
          </div>

          {/* Navigation Column 2: Firm */}
          <div className={styles.navCol}>
            <h3 className={styles.colTitle}>Firm</h3>
            <ul className={styles.linkList}>
              <li>
                <Link to="/about">About Growwezy</Link>
              </li>
              <li>
                <Link to="/insights">Research & Insights</Link>
              </li>
              <li>
                <Link to="/contact">Contact & Consultations</Link>
              </li>
            </ul>
          </div>

          {/* Navigation Column 3: Audiences */}
          <div className={styles.navCol}>
            <h3 className={styles.colTitle}>Client Focus</h3>
            <ul className={styles.linkList}>
              <li>
                <span className={styles.mutedFocus}>Middle East NRIs</span>
              </li>
              <li>
                <span className={styles.mutedFocus}>International Private Clients</span>
              </li>
              <li>
                <span className={styles.mutedFocus}>Cross-Border Family Portfolios</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Regulatory & Risk Notice */}
        <div className={styles.riskNotice}>
          <p>
            <strong>Risk Disclosure:</strong> Foreign exchange (forex) trading and international capital allocation carry substantial financial risks, including the potential loss of principal. Past performance or macroeconomic analysis is not indicative of future returns. Growwezy Global Tech provides research, scenario modeling, and advisory consultations; we do not accept deposits, execute direct trades on client accounts, or provide custody of assets. All investment decisions are executed independently by clients through their designated licensed brokers and custodians.
          </p>
        </div>

        {/* Bottom Bar: Copyright & Policies */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.
          </p>
          <div className={styles.legalLinks}>
            <span>Privacy Policy</span>
            <span className={styles.dot}>•</span>
            <span>Terms of Engagement</span>
            <span className={styles.dot}>•</span>
            <span>Risk Statement</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

