import React from 'react';
import { Link } from 'react-router-dom';
import { PageBanner } from '../components/layout/PageBanner';
import styles from './LegalPage.module.css';

export const TermsPage: React.FC = () => {
  return (
    <main id="main-content">
      <PageBanner
        overline="Legal"
        title="Terms of Services"
        description="Last Updated: February 13, 2026. Please read these terms carefully before accessing or using Growwezy."
      />

      <section className={styles.legalSection}>
        <div className={`container ${styles.legalContainer}`}>
          {/* Quick Tab Switcher */}
          <nav className={styles.legalTabs} aria-label="Legal documents navigation">
            <Link to="/terms" className={styles.tabLinkActive}>
              Terms of Services
            </Link>
            <Link to="/privacy" className={styles.tabLink}>
              Privacy Policy
            </Link>
            <Link to="/disclaimer" className={styles.tabLink}>
              Disclaimer
            </Link>
          </nav>

          {/* Important Notice Callout */}
          <div className={styles.calloutBox}>
            <p>
              <strong>PLEASE READ CAREFULLY</strong> — These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of Growwezy services (&ldquo;Services&rdquo;) provided by Growwezy Technologies Private Limited (&ldquo;Growwezy&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;). By creating an account, starting a free trial, or using our platform, you agree to these Terms.
            </p>
          </div>

          <div className={styles.legalBody}>
            <h2>1. Our Services</h2>
            <p>
              Growwezy provides an analytical software platform that enables users to define custom parameters and criteria for market data analysis. Our system continuously monitors market charts (NSE/BSE/MCX) and delivers notifications when your specified conditions are observed. Growwezy explicitly does <strong>NOT</strong>:
            </p>
            <ul>
              <li>Offer investment advice, trading recommendations, or financial consulting.</li>
              <li>Execute trades or manage investment accounts on your behalf.</li>
              <li>Guarantee any form of financial gain, performance, or specific outcomes.</li>
              <li>Provide financial services that require registration with regulatory bodies like SEBI.</li>
            </ul>

            <h2>2. Account &amp; Security</h2>
            <ul>
              <li>You must create accounts with a valid email/mobile.</li>
              <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
              <li>You must notify us immediately of any unauthorized access or suspicious activity related to your account.</li>
              <li>We may suspend or terminate accounts for policy violations, security concerns, or suspected unauthorized use.</li>
            </ul>

            <h2>3. Your Parameters, Your Responsibility</h2>
            <p>
              You are solely responsible for defining <strong>ALL</strong> analytical parameters and criteria within the Services. Growwezy functions exclusively as a monitoring and notification tool based on your input. You bear full responsibility for:
            </p>
            <ul>
              <li>The accuracy and suitability of your analytical parameters.</li>
              <li>All independent financial decisions and actions you undertake.</li>
              <li>Ensuring your activities comply with all applicable regulatory requirements (e.g., SEBI) and your broker&apos;s terms.</li>
              <li>Accepting all market and financial risks associated with your decisions.</li>
            </ul>

            <h2>4. CRITICAL MARKET DISCLAIMER</h2>
            <div className={styles.dangerBox}>
              <p>
                <strong>GROWWEZY IS NOT A FINANCIAL ADVISOR, BROKER, OR INVESTMENT MANAGEMENT PLATFORM.</strong>
              </p>
              <p>
                <strong>NO FINANCIAL OR INVESTMENT ADVICE IS PROVIDED THROUGH GROWWEZY OR ITS SERVICES.</strong>
              </p>
              <ul>
                <li>Historical market data and past performance are not indicative of future results.</li>
                <li>Engaging with financial markets carries substantial risk, including the potential for complete loss of capital.</li>
                <li>You could lose more than your initial investment.</li>
                <li>Growwezy offers technology tools for analysis and observation only; it does not predict or guarantee financial outcomes.</li>
                <li>Users are obligated to comply with all relevant regulatory bodies (like SEBI) and their respective broker&apos;s rules.</li>
              </ul>
            </div>

            <h2>5. Prohibited Activities</h2>
            <p>You agree not to engage in the following prohibited activities:</p>
            <ul>
              <li>Sharing your account or login credentials with any other individual.</li>
              <li>Attempting to reverse engineer, decompile, or otherwise uncover the source code of our software or algorithms.</li>
              <li>Utilizing the Services for any illegal, unethical, or unauthorized purposes.</li>
              <li>Employing the Services to facilitate any form of automated transaction execution without explicit prior authorization from your broker and full compliance with all relevant regulations.</li>
              <li>Making or implying claims of guaranteed returns, assured profits, or specific financial gains based on Growwezy&apos;s Services.</li>
              <li>Interfering with, disrupting, or compromising the integrity, security, or performance of the Services or their associated data.</li>
            </ul>

            <h2>6. Limitation of Liability</h2>
            <p>
              <strong>TO THE MAXIMUM EXTENT PERMITTED BY LAW:</strong>
            </p>
            <ul>
              <li>Growwezy will not be liable for any financial losses, damages, or adverse outcomes incurred by you as a result of your independent market activities.</li>
              <li>We make no representations or warranties regarding the accuracy, completeness, reliability, or timeliness of market data provided through the Services, which is sourced from third parties.</li>
              <li>In no event shall Growwezy be liable for any indirect, incidental, consequential, punitive, or special damages, including but not limited to loss of profits, data, use, goodwill, or other intangible losses, arising from your use of or inability to use the Services.</li>
            </ul>

            <h2>7. Intellectual Property Rights</h2>
            <p>
              All content, features, and functionality of the Services (including but not limited to all information, software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof) are owned by Growwezy, its licensors, or other providers of such material and are protected by Indian and international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws. Your use of the Services grants you no right or license to reproduce or otherwise use any Growwezy or third-party trademarks.
            </p>

            <h2>8. Privacy Policy</h2>
            <p>
              Your use of the Services is also governed by our <Link to="/privacy">Privacy Policy</Link>, which details how we collect, use, and protect your personal data. By agreeing to these Terms, you also agree to our Privacy Policy.
            </p>

            <h2>9. Subscription, Fees &amp; Termination</h2>
            <ul>
              <li><strong>Subscription:</strong> Services are provided on a subscription basis. By subscribing, you agree to pay the fees for the period selected.</li>
              <li><strong>Billing:</strong> Fees are billed in advance on a recurring, periodic basis (e.g., monthly or annually). Your subscription will automatically renew at the end of each period unless you cancel it.</li>
              <li><strong>Cancellation:</strong> You may cancel your subscription at any time via your dashboard. Cancellation will take effect at the end of your current billing period.</li>
              <li><strong>Refunds:</strong> No refunds will be provided for partial months or unused portions of a subscription term upon cancellation.</li>
              <li><strong>Termination by Growwezy:</strong> We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms or for security reasons. Upon termination, your right to use the Services will immediately cease.</li>
              <li><strong>Data Deletion:</strong> Some user data associated with terminated accounts may be deleted 30 days post-termination, subject to our Privacy Policy and legal requirements.</li>
            </ul>

            <h2>10. Changes to Terms</h2>
            <p>
              We reserve the right to update or modify these Terms at any time. We will provide you with at least 7 days&apos; notice of any material changes via email or through a prominent notice on your dashboard. Your continued use of the Services after the effective date of the revised Terms constitutes your acceptance of the changes.
            </p>

            <h2>11. Governing Law &amp; Dispute Resolution</h2>
            <p>
              These Terms shall be governed and construed in accordance with the laws of India. Any disputes arising out of or relating to these Terms or the Services shall be resolved exclusively in the courts located in Bhopal, Madhya Pradesh, India.
            </p>

            <h2>12. Contact Us</h2>
            <div className={styles.contactBlock}>
              <h3>Growwezy Technologies Private Limited</h3>
              <p>Growwezy Pvt. Ltd.</p>
              <p>Email: <a href="mailto:support@growwezy.com">support@growwezy.com</a></p>
              <p>Jurisdiction: Bhopal, Madhya Pradesh, India</p>
            </div>

            <div className={styles.footerNote}>
              By using Growwezy, you acknowledge you have read, understood, and agree to these Terms, especially Sections 3, 4, and 5 regarding market risks.
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default TermsPage;

