import React from 'react';
import { Link } from 'react-router-dom';
import { PageBanner } from '../components/layout/PageBanner';
import styles from './LegalPage.module.css';

export const DisclaimerPage: React.FC = () => {
  return (
    <main id="main-content">
      <PageBanner
        overline="Legal"
        title="Disclaimer"
        description="Please read this disclaimer carefully before using our trading signals."
      />

      <section className={styles.legalSection}>
        <div className={`container ${styles.legalContainer}`}>
          {/* Quick Tab Switcher */}
          <nav className={styles.legalTabs} aria-label="Legal documents navigation">
            <Link to="/terms" className={styles.tabLink}>
              Terms of Services
            </Link>
            <Link to="/privacy" className={styles.tabLink}>
              Privacy Policy
            </Link>
            <Link to="/disclaimer" className={styles.tabLinkActive}>
              Disclaimer
            </Link>
          </nav>

          {/* Important Callout */}
          <div className={styles.calloutBox}>
            <p>
              Please read this disclaimer carefully before using our trading signals.
            </p>
          </div>

          <div className={styles.legalBody}>
            <h2>1. Educational Purposes Only</h2>
            <p>
              The trading signals, analysis, and information provided by Growwezy Global Tech are for educational and informational purposes only. They do not constitute financial advice, investment recommendations, or an offer to buy or sell any financial instruments.
            </p>

            <h2>2. Risk of Loss</h2>
            <div className={styles.dangerBox}>
              <p>
                <strong>Trading in Forex, Commodities (Comex), and high-net-worth instruments involves a high degree of risk and may not be suitable for all investors.</strong> You could lose some or all of your initial investment. Never trade with money you cannot afford to lose.
              </p>
            </div>

            <h2>3. No Guarantees</h2>
            <p>
              Past performance of any trading system or methodology is not necessarily indicative of future results. We do not guarantee any specific outcome or profit from using our signals.
            </p>

            <div className={styles.contactBlock}>
              <h3>Growwezy Global Tech</h3>
              <p>For inquiries regarding this disclaimer or our advisory capabilities:</p>
              <p>Email: <a href="mailto:Growwezy3@gmail.com">Growwezy3@gmail.com</a></p>
            </div>

            <div className={styles.footerNote}>
              By using our signals or accessing Growwezy, you acknowledge that you have read and agreed to this Disclaimer, our <Link to="/terms">Terms of Services</Link>, and our <Link to="/privacy">Privacy Policy</Link>.
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default DisclaimerPage;
