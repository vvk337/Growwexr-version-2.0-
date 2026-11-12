import React from 'react';
import { Link } from 'react-router-dom';
import { PageBanner } from '../components/layout/PageBanner';
import styles from './LegalPage.module.css';

export const PrivacyPage: React.FC = () => {
  return (
    <main id="main-content">
      <PageBanner
        overline="Legal"
        title="Privacy Policy"
        description="Last Updated: February 13, 2026. How Growwezy Technologies Private Limited collects, uses, and safeguards your personal data."
      />

      <section className={styles.legalSection}>
        <div className={`container ${styles.legalContainer}`}>
          {/* Quick Tab Switcher */}
          <nav className={styles.legalTabs} aria-label="Legal documents navigation">
            <Link to="/terms" className={styles.tabLink}>
              Terms of Services
            </Link>
            <Link to="/privacy" className={styles.tabLinkActive}>
              Privacy Policy
            </Link>
            <Link to="/disclaimer" className={styles.tabLink}>
              Disclaimer
            </Link>
          </nav>

          <div className={styles.calloutBox}>
            <p>
              Growwezy Technologies Private Limited (&ldquo;Growwezy&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is committed to respecting your privacy and protecting the personal information you share with us. This Privacy Policy describes how we collect, store, process, and protect your information when you access or use our analytical platform, website, and related services (&ldquo;Services&rdquo;).
            </p>
          </div>

          <div className={styles.legalBody}>
            <h2>1. Information We Collect</h2>
            <p>We collect information to provide, maintain, and enhance our analytical software platform:</p>
            <ul>
              <li><strong>Account Credentials:</strong> Full name, verified email address, mobile phone number, and encrypted password credentials required for account creation and access control.</li>
              <li><strong>Analytical Parameters:</strong> Custom alert rules, monitoring thresholds, technical criteria, and indicator parameters that you independently configure within the platform.</li>
              <li><strong>Billing &amp; Transaction Details:</strong> Subscription plan type, billing intervals, payment reference identifiers, and GST/tax details. Payment card and net banking processing is executed through secure, PCI-DSS compliant payment gateways; Growwezy does not store raw credit/debit card numbers or CVVs.</li>
              <li><strong>Technical &amp; Telemetry Data:</strong> IP address, browser type, operating system, device identifiers, session timestamps, and platform performance logs used strictly for security monitoring and fraud prevention.</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>We process your data under legitimate business grounds and with your consent to:</p>
            <ul>
              <li>Authenticate your identity and manage account access securely.</li>
              <li>Execute automated monitoring routines on market feeds and deliver notifications based on your chosen parameters.</li>
              <li>Process subscription billings, renewals, and generate tax invoices.</li>
              <li>Deliver critical operational notices, security advisories, and mandatory policy updates (including minimum 7 days&apos; notice for Terms amendments).</li>
              <li>Investigate and prevent prohibited activities, unauthorized account access, and security breaches.</li>
              <li>Comply with applicable Indian and international regulatory obligations.</li>
            </ul>

            <h2>3. Information Sharing &amp; Third Parties</h2>
            <p>
              <strong>We do not sell, rent, monetize, or trade your personal data to third parties or marketing brokers.</strong> We disclose data only in the following limited circumstances:
            </p>
            <ul>
              <li><strong>Trusted Service Providers:</strong> Cloud hosting infrastructure (AWS/Google Cloud), SMS/email notification delivery vendors, and RBI-authorized payment processors who operate under strict non-disclosure and security covenants.</li>
              <li><strong>Legal &amp; Regulatory Compliance:</strong> If mandated by law, court order, or regulatory authorities (such as SEBI, law enforcement, or Indian judicial bodies) having lawful jurisdiction.</li>
              <li><strong>Corporate Reorganization:</strong> In connection with a merger, acquisition, or restructuring, subject to equivalent confidentiality protections.</li>
            </ul>

            <h2>4. Data Retention &amp; Deletion</h2>
            <p>
              We retain your personal information only as long as your account remains active or as needed to provide you with Services.
            </p>
            <ul>
              <li><strong>Post-Termination Purge:</strong> In accordance with Section 9 of our <Link to="/terms">Terms of Services</Link>, analytical parameters, alerts, and user data associated with terminated accounts may be permanently deleted 30 days after subscription termination.</li>
              <li><strong>Statutory Records:</strong> Financial invoices and transaction logs are retained for the statutory period mandated by Indian tax, GST, and corporate accounting laws.</li>
            </ul>

            <h2>5. Data Security Measures</h2>
            <p>
              We implement comprehensive technical and organizational safeguards to ensure confidentiality, integrity, and availability of user data:
            </p>
            <ul>
              <li>End-to-end transport encryption (TLS 1.3 / HTTPS) for all data in transit.</li>
              <li>Industry-standard AES-256 encryption for data at rest, credentials, and sensitive configurations.</li>
              <li>Zero direct access to client trading accounts or brokerage logins—Growwezy does not execute trades or hold client capital.</li>
              <li>Role-based access controls, continuous vulnerability scans, and perimeter firewalls.</li>
            </ul>

            <h2>6. Your Rights &amp; Choices</h2>
            <p>Under the Digital Personal Data Protection Act (DPDP), 2023 and applicable privacy frameworks, you have the right to:</p>
            <ul>
              <li>Access, review, or obtain an export of the personal information we hold about you.</li>
              <li>Rectify inaccurate or outdated account information via your user dashboard.</li>
              <li>Request the complete erasure of your personal data upon subscription termination.</li>
              <li>Opt-out of non-essential promotional communications (essential account and security alerts will continue).</li>
            </ul>

            <h2>7. Cookies &amp; Tracking Technologies</h2>
            <p>
              We use strictly necessary session cookies and security tokens to maintain your authenticated login state. We do not use third-party behavioral tracking cookies for intrusive advertising. You may disable cookies in your browser settings, though doing so may prevent logging into the platform.
            </p>

            <h2>8. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy periodically to reflect technological advances, service improvements, or legal revisions. We will notify you of any material changes via your registered email or through a visible notification on your user dashboard before changes take effect.
            </p>

            <h2>9. Contact Our Privacy Office</h2>
            <div className={styles.contactBlock}>
              <h3>Growwezy Technologies Private Limited</h3>
              <p>Attn: Data Protection &amp; Privacy Officer</p>
              <p>Email: <a href="mailto:support@growwezy.com">support@growwezy.com</a></p>
              <p>Location: Bhopal, Madhya Pradesh, India</p>
            </div>

            <div className={styles.footerNote}>
              By using Growwezy, you signify your acceptance of this Privacy Policy and our <Link to="/terms">Terms of Services</Link>.
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PrivacyPage;
