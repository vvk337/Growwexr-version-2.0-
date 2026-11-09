import React, { useState } from 'react';
import { Mail, MapPin, Clock, Info, CheckCircle2, AlertTriangle } from 'lucide-react';
import { PageBanner } from '../components/layout/PageBanner';
import { siteConfig } from '../config/site';
import styles from './ContactPage.module.css';

interface FormData {
  name: string;
  email: string;
  country: string;
  phone: string;
  serviceInterest: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  country?: string;
  serviceInterest?: string;
  message?: string;
}

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    country: 'United Arab Emirates',
    phone: '',
    serviceInterest: 'Forex Trading Advisory',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'preview_success' | 'live_success' | 'error'>('idle');

  const validate = (): boolean => {
    const errs: FormErrors = {};

    if (!formData.name.trim()) {
      errs.name = 'Full name is required';
    }

    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email format';
    }

    if (!formData.country.trim()) {
      errs.country = 'Country of residence is required';
    }

    if (!formData.message.trim()) {
      errs.message = 'Please provide brief details on your inquiry';
    } else if (formData.message.trim().length < 15) {
      errs.message = 'Please provide at least 15 characters of detail';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    // Operational Honesty Protocol (Page 15 of Dossier):
    // If featureFlags.enableFormSubmission is false, show honest preview acknowledgment without fabricating external transmission
    setTimeout(() => {
      setIsSubmitting(false);
      if (siteConfig.featureFlags.enableFormSubmission) {
        setSubmissionStatus('live_success');
      } else {
        setSubmissionStatus('preview_success');
      }
    }, 600);
  };

  return (
    <main id="main-content">
      <PageBanner
        overline="Direct Dialogue"
        title="Contact & Consultation Booking"
        description="Schedule a confidential consultation to review your foreign exchange risk parameters and cross-border financial objectives."
      />

      <section className={`section section-white ${styles.contactSection}`}>
        <div className="container">
          <div className={styles.contactGrid}>
            {/* Left Column: Context & Direct Details */}
            <div className={styles.infoCol}>
              <span className="section-overline">Consultation Desk</span>
              <h2 className={styles.infoHeading}>Let’s Discuss Your Market Parameters</h2>
              <p className={styles.infoDesc}>
                Whether you are managing NRI currency remittances between the Middle East and India or seeking institutional asset advisory, we look forward to the conversation.
              </p>

              <div className={styles.channelsList}>
                <div className={styles.channelCard}>
                  <div className={styles.channelIcon}>
                    <Mail size={20} />
                  </div>
                  <div>
                    <h3 className={styles.channelTitle}>Direct Email</h3>
                    <p className={styles.channelValue}>
                      <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
                    </p>
                    <span className={styles.channelNote}>Typically replies within 1 business day</span>
                  </div>
                </div>

                <div className={styles.channelCard}>
                  <div className={styles.channelIcon}>
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className={styles.channelTitle}>Location & Jurisdiction</h3>
                    <p className={styles.channelValue}>{siteConfig.contact.address}</p>
                    <span className={styles.channelNote}>Serving clients across Dubai, Abu Dhabi, Riyadh, and Doha</span>
                  </div>
                </div>

                <div className={styles.channelCard}>
                  <div className={styles.channelIcon}>
                    <Clock size={20} />
                  </div>
                  <div>
                    <h3 className={styles.channelTitle}>Advisory Hours</h3>
                    <p className={styles.channelValue}>{siteConfig.contact.hours}</p>
                    <span className={styles.channelNote}>Scheduled consultations by appointment</span>
                  </div>
                </div>
              </div>

              {/* Consultation Prep Note */}
              <div className={styles.prepNotice}>
                <Info size={18} className={styles.prepIcon} />
                <p>
                  <strong>Confidentiality Assurance:</strong> We never request trading passwords, API account secrets, or custody deposits. Consultations focus strictly on macroeconomic strategy and risk architecture.
                </p>
              </div>
            </div>

            {/* Right Column: Contact & Booking Form */}
            <div className={styles.formCol}>
              <div className={styles.formContainer}>
                {/* Honest Prototype Notice */}
                {!siteConfig.featureFlags.enableFormSubmission && (
                  <div className={styles.previewNotice}>
                    <AlertTriangle size={18} className={styles.previewIcon} />
                    <div>
                      <strong>Prototype Preview Mode</strong>
                      <p>
                        Form validation and UI are fully active. External backend endpoint integration is tracked in <code>LAUNCH_CHECKLIST.md</code>.
                      </p>
                    </div>
                  </div>
                )}

                {submissionStatus === 'preview_success' ? (
                  <div className={styles.successState}>
                    <CheckCircle2 size={44} className={styles.successIcon} />
                    <h3 className={styles.successHeading}>Validation Succeeded (Preview Mode)</h3>
                    <p className={styles.successDesc}>
                      Your form inputs successfully passed all validation checks. In production mode with your configured endpoint, this transmits directly to your consultation desk.
                    </p>
                    <div className={styles.submittedSummary}>
                      <p><strong>Name:</strong> {formData.name}</p>
                      <p><strong>Email:</strong> {formData.email}</p>
                      <p><strong>Residence:</strong> {formData.country}</p>
                      <p><strong>Interest:</strong> {formData.serviceInterest}</p>
                    </div>
                    <button
                      type="button"
                      className={styles.resetBtn}
                      onClick={() => setSubmissionStatus('idle')}
                    >
                      Reset Form Preview
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className={styles.form}>
                    <h3 className={styles.formTitle}>Book Strategic Consultation</h3>

                    {/* Name */}
                    <div className={styles.formField}>
                      <label htmlFor="name" className={styles.label}>
                        Full Name <span className={styles.required}>*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        autoComplete="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                        placeholder="e.g. Rahul Sharma"
                      />
                      {errors.name && <span className={styles.errorText}>{errors.name}</span>}
                    </div>

                    {/* Email */}
                    <div className={styles.formField}>
                      <label htmlFor="email" className={styles.label}>
                        Email Address <span className={styles.required}>*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                        placeholder="name@example.com"
                      />
                      {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                    </div>

                    {/* Country of Residence */}
                    <div className={styles.formField}>
                      <label htmlFor="country" className={styles.label}>
                        Country of Residence <span className={styles.required}>*</span>
                      </label>
                      <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className={styles.select}
                      >
                        <option value="United Arab Emirates">United Arab Emirates (UAE)</option>
                        <option value="Saudi Arabia">Saudi Arabia (KSA)</option>
                        <option value="Qatar">Qatar</option>
                        <option value="Oman">Oman</option>
                        <option value="Kuwait">Kuwait</option>
                        <option value="Bahrain">Bahrain</option>
                        <option value="India">India</option>
                        <option value="Other">Other Country</option>
                      </select>
                    </div>

                    {/* Phone / WhatsApp (Optional) */}
                    <div className={styles.formField}>
                      <label htmlFor="phone" className={styles.label}>
                        Phone / WhatsApp (Optional)
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        name="phone"
                        autoComplete="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={styles.input}
                        placeholder="+971 50 000 0000"
                      />
                    </div>

                    {/* Service Interest */}
                    <div className={styles.formField}>
                      <label htmlFor="serviceInterest" className={styles.label}>
                        Advisory Scope of Interest <span className={styles.required}>*</span>
                      </label>
                      <select
                        id="serviceInterest"
                        name="serviceInterest"
                        value={formData.serviceInterest}
                        onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                        className={styles.select}
                      >
                        <option value="Forex Trading Advisory">Forex Trading Advisory</option>
                        <option value="Financial Asset Management">Financial Asset Management</option>
                        <option value="NRI Currency Hedging">NRI Cross-Border Currency Hedging</option>
                        <option value="General Strategic Consultation">General Strategic Consultation</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div className={styles.formField}>
                      <label htmlFor="message" className={styles.label}>
                        Brief Description of Objectives <span className={styles.required}>*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
                        placeholder="Please outline your current foreign exchange or asset allocation goals..."
                      />
                      {errors.message && <span className={styles.errorText}>{errors.message}</span>}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={styles.submitBtn}
                    >
                      {isSubmitting ? 'Validating...' : 'Submit Consultation Request'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

