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
        description="Last Updated: 28 January 2026. This Privacy Policy explains how we collect, use, disclose, store, and protect your information."
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
              Growwezy (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, disclose, store, and protect your information when you interact with us through our websites, forms, advertisements, and related services (collectively, the &ldquo;Services&rdquo;).
            </p>
            <p style={{ marginTop: '12px', fontSize: '14px', color: '#475569' }}>
              This Privacy Policy is designed to comply with:
              <br />
              • California Online Privacy Protection Act (CalOPPA)
              <br />
              • General Data Protection Regulation (GDPR)
              <br />
              • California Consumer Privacy Act as amended by the California Privacy Rights Act (CCPA/CPRA)
            </p>
          </div>

          <div className={styles.legalBody}>
            <h2>1. Information We Collect</h2>
            <p>
              We may collect the following categories of personal information when you voluntarily submit information through Meta Ads, Google Ads, or other online forms:
            </p>
            <ul>
              <li>
                <strong>Personal Identifiers:</strong> First Name, Last Name, Email Address, Phone Number
              </li>
              <li>
                <strong>Location Information:</strong> City, State
              </li>
              <li>
                <strong>Internet or Advertising Information:</strong> Source of submission (e.g., Meta Ads or Google Ads), Date and time of form submission, Campaign or ad interaction data (where available)
              </li>
            </ul>
            <p>
              We do not knowingly collect sensitive personal information as defined under CPRA, such as government IDs, precise geolocation, financial data, or biometric data.
            </p>

            <h2>2. How We Collect Information</h2>
            <p>We collect personal information when you:</p>
            <ul>
              <li>Submit a lead form through Meta Ads or Google Ads</li>
              <li>Contact us directly via email</li>
              <li>Voluntarily provide information through our marketing or research initiatives</li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>We use the information we collect for legitimate business purposes, including:</p>
            <ul>
              <li>Responding to inquiries and requests</li>
              <li>Providing market research insights, analytics, or educational content</li>
              <li>Conducting internal research and analysis</li>
              <li>Improving our services and marketing effectiveness</li>
              <li>Communicating updates, insights, or relevant information (where permitted by law)</li>
              <li>Compliance with legal and regulatory obligations</li>
            </ul>
            <p>
              We do not use your personal information for automated decision-making or profiling that produces legal or similarly significant effects.
            </p>

            <h2>4. Legal Basis for Processing (GDPR)</h2>
            <p>
              For individuals located in the European Economic Area (EEA) or United Kingdom, our legal bases for processing personal data include:
            </p>
            <ul>
              <li><strong>Consent</strong> – when you voluntarily submit your information</li>
              <li><strong>Legitimate Interests</strong> – for business operations, analytics, and service improvement</li>
              <li><strong>Legal Obligations</strong> – when required to comply with applicable laws</li>
            </ul>
            <p>You may withdraw consent at any time.</p>

            <h2>5. Sharing and Disclosure of Information</h2>
            <p>
              We do not sell personal information. We may share personal information only in the following circumstances:
            </p>
            <ul>
              <li>With service providers or platforms (e.g., advertising or analytics tools) strictly for business operations</li>
              <li>To comply with legal obligations, lawful requests, or government authorities</li>
              <li>To protect our rights, property, or safety</li>
            </ul>
            <p>
              All service providers are contractually required to protect personal information and use it only for authorized purposes.
            </p>

            <h2>6. Data Retention</h2>
            <p>
              We retain personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
            </p>

            <h2>7. Your Rights Under GDPR</h2>
            <p>If you are located in the EEA or UK, you have the right to:</p>
            <ul>
              <li>Access your personal data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion (&ldquo;right to be forgotten&rdquo;)</li>
              <li>Restrict or object to processing</li>
              <li>Request data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>
            <p>
              Requests may be sent to: <a href="mailto:Growwezy3@gmail.com">Growwezy3@gmail.com</a>
            </p>

            <h2>8. Your Rights Under CCPA/CPRA (California Residents)</h2>
            <ul>
              <li>Know what personal information we collect and how it is used</li>
              <li>Request access to or deletion of personal information</li>
              <li>Correct inaccurate personal information</li>
              <li>Opt out of the sale or sharing of personal information (we do not sell or share)</li>
              <li>Limit the use of sensitive personal information (not applicable, as we do not collect it)</li>
              <li>Not be discriminated against for exercising privacy rights</li>
            </ul>
            <p>
              You may submit requests by contacting: <a href="mailto:Growwezy3@gmail.com">Growwezy3@gmail.com</a>. We will verify requests and respond within the timeframes required by law.
            </p>

            <h2>9. CalOPPA Compliance</h2>
            <p>In accordance with CalOPPA:</p>
            <ul>
              <li>This Privacy Policy is accessible from our homepage</li>
              <li>We clearly disclose the types of personal information collected</li>
              <li>Users may review changes on this page</li>
              <li>We honor &ldquo;Do Not Track&rdquo; signals where applicable, though third-party platforms may collect data independently</li>
            </ul>

            <h2>10. Additional Provisions for Users in India</h2>
            <p>
              This Privacy Policy is updated to comply with the Digital Personal Data Protection Act (DPDPA), 2023 and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011.
            </p>
            <ul>
              <li>
                <strong>Consent:</strong> By submitting your information through our lead forms, you provide your free, specific, informed, unconditional, and unambiguous consent for Growwezy to process your data for the purposes of financial market research and consultation.
              </li>
              <li>
                <strong>Data Principal Rights:</strong> In addition to standard rights, users in India have the Right to Nominate an individual to exercise their privacy rights in the event of death or incapacity, and the Right to Grievance Redressal through our Grievance Officer and the Data Protection Board of India.
              </li>
            </ul>

            <h2>11. Grievance Officer (India)</h2>
            <p>
              In accordance with the Information Technology Act, 2000 and the DPDPA 2023, the name and contact details of the Grievance Officer who will address any data-related concerns or complaints are provided below:
            </p>
            <div className={styles.contactBlock} style={{ marginTop: '16px' }}>
              <p><strong>Name:</strong> Rohit Verma</p>
              <p><strong>Designation:</strong> Grievance Officer</p>
              <p><strong>Email:</strong> <a href="mailto:Growwezy3@gmail.com">Growwezy3@gmail.com</a></p>
              <p><strong>Address:</strong> Plot No. 98, Zone No. 1, CBD Belapur, Navi Mumbai, Maharashtra – 400614, India</p>
            </div>
            <p style={{ marginTop: '12px' }}>
              We will acknowledge receipt of any grievance within 24 hours and aim to resolve the issue within the statutory period of 30 days.
            </p>

            <h2>12. Data Security</h2>
            <p>
              We implement reasonable administrative, technical, and organizational measures to protect personal information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the internet is 100% secure.
            </p>

            <h2>13. Children&apos;s Privacy</h2>
            <p>
              Our Services are not intended for individuals under the age of 16. We do not knowingly collect personal information from children.
            </p>

            <h2>14. International Data Transfers</h2>
            <p>
              Your information may be processed or stored outside your country of residence. Where required, we implement appropriate safeguards to protect personal data in accordance with applicable laws.
            </p>

            <h2>15. Third-Party Platforms</h2>
            <p>
              Our lead forms may be hosted or facilitated by third-party platforms such as Meta or Google. Their data practices are governed by their respective privacy policies.
            </p>

            <h2>16. Updates to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes will be reflected by updating the &ldquo;Last Updated&rdquo; date at the top of this page.
            </p>

            <h2>17. Contact Information</h2>
            <div className={styles.contactBlock}>
              <h3>Growwezy</h3>
              <p>If you have questions, concerns, or requests regarding this Privacy Policy or your personal information, contact us at:</p>
              <p>Email: <a href="mailto:Growwezy3@gmail.com">Growwezy3@gmail.com</a></p>
            </div>

            <div className={styles.footerNote}>
              By using our Services, you acknowledge that you have read and understood this Privacy Policy, our <Link to="/terms">Terms of Services</Link>, and our <Link to="/disclaimer">Disclaimer</Link>.
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PrivacyPage;
