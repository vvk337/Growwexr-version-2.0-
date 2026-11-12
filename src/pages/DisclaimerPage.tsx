import React from 'react';
import { Link } from 'react-router-dom';
import { PageBanner } from '../components/layout/PageBanner';
import styles from './LegalPage.module.css';

export const DisclaimerPage: React.FC = () => {
  return (
    <main id="main-content">
      <PageBanner
        overline="Legal &amp; Regulatory"
        title="Regulatory &amp; Market Disclaimer"
        description="Last Updated: February 13, 2026. Important disclosure regarding financial risk, non-advisory technology scope, and regulatory compliance."
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

          {/* Critical Risk Banner */}
          <div className={styles.dangerBox}>
            <p>
              <strong>CRITICAL REGULATORY &amp; FINANCIAL RISK NOTICE:</strong>
            </p>
            <p>
              GROWWEZY TECHNOLOGIES PRIVATE LIMITED IS A TECHNOLOGY AND ANALYTICAL SOFTWARE PROVIDER. GROWWEZY IS <strong>NOT</strong> A REGISTERED INVESTMENT ADVISER (RIA), RESEARCH ANALYST (RA), BROKER-DEALER, OR PORTFOLIO MANAGEMENT SERVICE (PMS) UNDER THE SECURITIES AND EXCHANGE BOARD OF INDIA (SEBI) OR ANY INTERNATIONAL FINANCIAL REGULATORY AUTHORITY.
            </p>
            <p>
              NO INFORMATION, CHART ANALYSIS, ALGORITHM, OR NOTIFICATION DELIVERED THROUGH GROWWEZY CONSTITUTES FINANCIAL ADVICE, INVESTMENT RECOMMENDATIONS, OR AN ENDORSEMENT TO BUY OR SELL ANY FINANCIAL ASSET.
            </p>
          </div>

          <div className={styles.legalBody}>
            <h2>1. Technology Scope &amp; Non-Advisory Nature</h2>
            <p>
              Growwezy develops and operates computational software tools that allow users to monitor market charts (NSE, BSE, MCX, global foreign exchange pairs, and macroeconomic indicators) based exclusively on user-defined parameters.
            </p>
            <p>
              When a notification or alert is delivered, it reflects solely that the numerical conditions selected by the user were identified in historical or streaming market data. It does not reflect a human or algorithmic recommendation of future price movements or trading efficacy. Growwezy explicitly does <strong>NOT</strong>:
            </p>
            <ul>
              <li>Offer individualized or collective investment recommendations, stock tips, or trading advisory.</li>
              <li>Accept, solicit, hold, or manage client capital, deposits, or margin funds.</li>
              <li>Execute trades, route orders, or interact with brokerage account balances.</li>
              <li>Guarantee profits, capital preservation, target win-rates, or specific economic outcomes.</li>
            </ul>

            <h2>2. Substantial Market Risk &amp; Capital Loss Disclosure</h2>
            <p>
              Trading and investing in financial markets—including domestic equities, commodities, futures, options, and foreign exchange (Forex)—carries an inherently high level of risk and is speculative in nature:
            </p>
            <ul>
              <li><strong>Risk of Complete Capital Loss:</strong> You may lose all or more than your initial invested capital. You should never allocate funds you cannot afford to lose entirely.</li>
              <li><strong>Leverage &amp; Derivatives Volatility:</strong> Leverage magnifies both gains and losses. Rapid price swings triggered by central bank rate announcements, geopolitical developments, or illiquid market sessions can result in instantaneous margin calls and liquidation.</li>
              <li><strong>Past Performance Disclaimer:</strong> Past performance, backtested results, historical chart correlations, and hypothetical simulations are not reliable indicators of future performance. Market conditions change continuously.</li>
            </ul>

            <h2>3. User Responsibility &amp; Independent Due Diligence</h2>
            <p>
              As outlined in Section 3 of our <Link to="/terms">Terms of Services</Link>, you are solely and unconditionally responsible for:
            </p>
            <ul>
              <li>All parameter configurations, indicator choices, and criteria set within the software.</li>
              <li>Every decision to enter, modify, or exit market positions.</li>
              <li>Independent verification of market data and economic indicators prior to taking financial actions.</li>
              <li>Consulting with a licensed and accredited financial advisor or tax professional before making capital commitments.</li>
            </ul>

            <h2>4. Third-Party Market Data Feeds</h2>
            <p>
              Market charts, quotations, pricing data, and economic calendar metrics displayed or analyzed on Growwezy are sourced from third-party data vendors, public exchanges, and liquidity providers. While we strive to maintain reliable software:
            </p>
            <ul>
              <li>Data feeds may be subject to transmission latency, exchange delays, inaccuracies, or unexpected feed interruptions.</li>
              <li>Growwezy does not warrant or guarantee that market feeds will be uninterrupted, error-free, or real-time.</li>
              <li>We disclaim all liability for trading decisions or losses resulting from data delays or technical glitches.</li>
            </ul>

            <h2>5. International &amp; Cross-Border Compliance (NRI / Middle East)</h2>
            <p>
              Growwezy serves participants internationally, including Non-Resident Indians (NRIs) and private clients in the UAE and Middle East. Users are obligated to verify and adhere to:
            </p>
            <ul>
              <li>The Foreign Exchange Management Act (FEMA) regulations and Reserve Bank of India (RBI) guidelines governing cross-border remittances and currency trading.</li>
              <li>All local regulatory frameworks administered by authorities such as the Securities and Commodities Authority (SCA) or DFSA/ADGM in the UAE, or equivalent bodies in your jurisdiction of residence.</li>
              <li>Terms, margin requirements, and execution rules of your licensed broker and depository participant.</li>
            </ul>

            <h2>6. No Guarantee of Performance</h2>
            <p>
              Any marketing testimonials, performance examples, or historical observations referenced on the website are non-representative examples and do not constitute an assurance or projection of your trading results.
            </p>

            <h2>7. Contact for Regulatory Queries</h2>
            <div className={styles.contactBlock}>
              <h3>Growwezy Technologies Private Limited</h3>
              <p>Corporate Compliance &amp; Legal Operations</p>
              <p>Email: <a href="mailto:support@growwezy.com">support@growwezy.com</a></p>
              <p>Registered Office: Bhopal, Madhya Pradesh, India</p>
            </div>

            <div className={styles.footerNote}>
              By accessing Growwezy or using any of our analytical tools, you acknowledge that you have read, understood, and consented to this Disclaimer and our <Link to="/terms">Terms of Services</Link>.
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default DisclaimerPage;
