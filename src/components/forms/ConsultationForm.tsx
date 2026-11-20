import React, { useState, useEffect } from 'react';
import { CheckCircle2, AlertTriangle, Send } from 'lucide-react';
import { siteConfig } from '../../config/site';
import { COUNTRIES, DEFAULT_COUNTRY, findCountryByCode, findCountryByName } from '../../data/countries';
import styles from './ConsultationForm.module.css';

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  phone: string;
  country: string;
  city: string;
  serviceInterest: string;
  message?: string;
  companyWebsite?: string; // Honeypot anti-spam
}

export interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  country?: string;
  serviceInterest?: string;
}

export interface ConsultationFormProps {
  variant?: 'page' | 'popup';
  hideTitle?: boolean;
  leadSource?: string;
  onSuccess?: (inquiryId?: string) => void;
}

export const ConsultationForm: React.FC<ConsultationFormProps> = ({
  variant = 'page',
  hideTitle = false,
  leadSource = 'Contact Page',
  onSuccess,
}) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    countryCode: DEFAULT_COUNTRY.dialCode,
    phone: '',
    country: DEFAULT_COUNTRY.name,
    city: '',
    serviceInterest: 'Forex Signals', // Preselected default
    message: '',
    companyWebsite: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'preview_success' | 'live_success' | 'error'>('idle');
  const [submissionReceipt, setSubmissionReceipt] = useState<{ inquiryId?: string; sheetSynced?: boolean }>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Auto-detect visitor's country by IP
  useEffect(() => {
    let isMounted = true;

    async function detectCountryByIP() {
      try {
        // 1. Try serverless edge endpoint first
        const res = await fetch('/api/geo').catch(() => null);
        if (res && res.ok) {
          const geo = await res.json().catch(() => null);
          if (geo?.countryCode && isMounted) {
            const matched = findCountryByCode(geo.countryCode);
            if (matched) {
              setFormData((prev) => ({
                ...prev,
                countryCode: matched.dialCode,
                country: matched.name,
                city: geo.city || prev.city,
              }));
              return;
            }
          }
        }

        // 2. Fallback: Free client IP lookup with 2.5s timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2500);

        const ipRes = await fetch('https://api.country.is/', {
          signal: controller.signal,
        }).catch(() => null);

        clearTimeout(timeoutId);

        if (ipRes && ipRes.ok) {
          const ipData = await ipRes.json().catch(() => null);
          if (ipData?.country && isMounted) {
            const matched = findCountryByCode(ipData.country);
            if (matched) {
              setFormData((prev) => ({
                ...prev,
                countryCode: matched.dialCode,
                country: matched.name,
              }));
              return;
            }
          }
        }

        // 3. Fallback: Browser timezone heuristic
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
        if (isMounted) {
          let fallbackCode = 'AE';
          if (timeZone.includes('Calcutta') || timeZone.includes('Kolkata')) fallbackCode = 'IN';
          else if (timeZone.includes('Riyadh')) fallbackCode = 'SA';
          else if (timeZone.includes('Qatar')) fallbackCode = 'QA';
          else if (timeZone.includes('Dubai') || timeZone.includes('Muscat')) fallbackCode = 'AE';
          else if (timeZone.includes('London')) fallbackCode = 'GB';
          else if (timeZone.includes('New_York') || timeZone.includes('Los_Angeles') || timeZone.includes('Chicago')) fallbackCode = 'US';

          const tzMatched = findCountryByCode(fallbackCode);
          if (tzMatched) {
            setFormData((prev) => ({
              ...prev,
              countryCode: tzMatched.dialCode,
              country: tzMatched.name,
            }));
          }
        }
      } catch {
        // Retain default UAE fallback gracefully
      }
    }

    detectCountryByIP();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountryName = e.target.value;
    const matched = findCountryByName(selectedCountryName);
    setFormData((prev) => ({
      ...prev,
      country: selectedCountryName,
      countryCode: matched ? matched.dialCode : prev.countryCode,
    }));
  };

  const validate = (): boolean => {
    const errs: FormErrors = {};

    if (!formData.firstName.trim()) {
      errs.firstName = 'First name is required';
    } else if (formData.firstName.trim().length < 2) {
      errs.firstName = 'At least 2 characters';
    }

    if (!formData.lastName.trim()) {
      errs.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email format';
    }

    // Mandatory strictly numeric phone validation
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (formData.phone.trim().length < 6) {
      errs.phone = 'Please enter a valid phone number (at least 6 digits)';
    }

    if (!formData.country.trim()) {
      errs.country = 'Country of residence is required';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    // If feature flag is disabled, show preview confirmation
    if (!siteConfig.featureFlags.enableFormSubmission) {
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmissionStatus('preview_success');
        if (onSuccess) onSuccess('PREVIEW-MODE');
      }, 600);
      return;
    }

    // Live submission mode: Dispatch request to backend endpoint
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          serviceInterest: formData.serviceInterest || 'Forex Signals',
          fullName: `${formData.firstName.trim()} ${formData.lastName.trim()}`.trim(),
          submittedAt: new Date().toISOString(),
          leadSource,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || `Submission failed with status HTTP ${response.status}`);
      }

      const generatedId = data.inquiryId || `GW-${Date.now().toString(36).toUpperCase()}`;

      setIsSubmitting(false);
      setSubmissionReceipt({
        inquiryId: generatedId,
        sheetSynced: data.sheetSynced,
      });
      setSubmissionStatus('live_success');
      if (onSuccess) onSuccess(generatedId);
    } catch (err: any) {
      setIsSubmitting(false);
      setSubmissionStatus('error');
      setErrorMessage(
        err.message || 'Unable to submit your consultation request. Please reach out to us directly by email.'
      );
    }
  };

  const handleReset = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      countryCode: DEFAULT_COUNTRY.dialCode,
      phone: '',
      country: DEFAULT_COUNTRY.name,
      city: '',
      serviceInterest: 'Forex Signals',
      message: '',
      companyWebsite: '',
    });
    setErrors({});
    setSubmissionStatus('idle');
  };

  const isPopup = variant === 'popup';

  return (
    <div className={`${styles.formWrapper} ${isPopup ? styles.popupWrapper : ''}`}>
      <div className={`${styles.formContainer} ${isPopup ? styles.popupContainer : ''}`}>
        {submissionStatus === 'preview_success' ? (
          <div className={styles.successState}>
            <CheckCircle2 size={40} className={styles.successIcon} />
            <h3 className={styles.successHeading}>Validation Succeeded (Preview Mode)</h3>
            <p className={styles.successDesc}>
              Your form inputs successfully passed all validation checks. In production mode, this transmits directly to your consultation desk.
            </p>
            <div className={styles.submittedSummary}>
              <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
              <p><strong>Email:</strong> {formData.email}</p>
              <p><strong>Phone:</strong> {formData.countryCode} {formData.phone}</p>
              <p><strong>Location:</strong> {formData.city ? `${formData.city}, ` : ''}{formData.country}</p>
              <p><strong>Advisory Scope:</strong> {formData.serviceInterest || 'Forex Signals'}</p>
            </div>
            <button
              type="button"
              className={styles.resetBtn}
              onClick={handleReset}
            >
              Reset Form Preview
            </button>
          </div>
        ) : submissionStatus === 'live_success' ? (
          <div className={styles.successState}>
            <CheckCircle2 size={40} className={styles.successIcon} />
            <h3 className={styles.successHeading}>Consultation Request Transmitted</h3>
            <p className={styles.successDesc}>
              Thank you, {formData.firstName}. Your consultation parameters have been securely received. A senior advisor will review your requirements and respond within 1 business day.
            </p>
            <div className={styles.submittedSummary}>
              <p><strong>Inquiry ID:</strong> {submissionReceipt.inquiryId}</p>
              <p><strong>Client Name:</strong> {formData.firstName} {formData.lastName}</p>
              <p><strong>Email Address:</strong> {formData.email}</p>
              <p><strong>Phone:</strong> {formData.countryCode} {formData.phone}</p>
              <p><strong>Residence / Jurisdiction:</strong> {formData.city ? `${formData.city}, ` : ''}{formData.country}</p>
              <p><strong>Advisory Scope:</strong> {formData.serviceInterest || 'Forex Signals'}</p>
            </div>
            <button
              type="button"
              className={styles.resetBtn}
              onClick={handleReset}
            >
              Submit Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className={`${styles.form} ${isPopup ? styles.popupForm : ''}`}>
            {submissionStatus === 'error' && errorMessage && (
              <div
                className={styles.previewNotice}
                style={{ borderColor: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.08)' }}
              >
                <AlertTriangle size={18} color="#ef4444" className={styles.previewIcon} />
                <div>
                  <strong style={{ color: '#dc2626' }}>Transmission Notice</strong>
                  <p style={{ margin: '4px 0 0', color: '#7f1d1d', fontSize: '13px' }}>
                    {errorMessage} You can also reach our desk directly at{' '}
                    <a href={`mailto:${siteConfig.contact.email}`} style={{ textDecoration: 'underline' }}>
                      {siteConfig.contact.email}
                    </a>.
                  </p>
                </div>
              </div>
            )}

            {!hideTitle && (
              <h3 className={`${styles.formTitle} ${isPopup ? styles.popupTitle : ''}`}>
                Book Strategic Consultation
              </h3>
            )}

            {/* Invisible Honeypot Field for Bot Spam Protection */}
            <div style={{ display: 'none' }} aria-hidden="true">
              <label htmlFor={isPopup ? 'companyWebsite-popup' : 'companyWebsite'}>Leave this field blank</label>
              <input
                id={isPopup ? 'companyWebsite-popup' : 'companyWebsite'}
                type="text"
                name="companyWebsite"
                tabIndex={-1}
                autoComplete="off"
                value={formData.companyWebsite || ''}
                onChange={(e) => setFormData({ ...formData, companyWebsite: e.target.value })}
              />
            </div>

            {/* Row 1: First Name & Last Name (in one line, separate boxes) */}
            <div className={styles.twoColRow}>
              <div className={styles.formField}>
                <label htmlFor={isPopup ? 'firstName-popup' : 'firstName'} className={styles.label}>
                  First Name <span className={styles.required}>*</span>
                </label>
                <input
                  id={isPopup ? 'firstName-popup' : 'firstName'}
                  type="text"
                  name="firstName"
                  autoComplete="given-name"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className={`${styles.input} ${errors.firstName ? styles.inputError : ''}`}
                  placeholder="e.g. Alex"
                />
                {errors.firstName && <span className={styles.errorText}>{errors.firstName}</span>}
              </div>

              <div className={styles.formField}>
                <label htmlFor={isPopup ? 'lastName-popup' : 'lastName'} className={styles.label}>
                  Last Name <span className={styles.required}>*</span>
                </label>
                <input
                  id={isPopup ? 'lastName-popup' : 'lastName'}
                  type="text"
                  name="lastName"
                  autoComplete="family-name"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className={`${styles.input} ${errors.lastName ? styles.inputError : ''}`}
                  placeholder="e.g. Sterling"
                />
                {errors.lastName && <span className={styles.errorText}>{errors.lastName}</span>}
              </div>
            </div>

            {/* Row 2: Email Address */}
            <div className={styles.formField}>
              <label htmlFor={isPopup ? 'email-popup' : 'email'} className={styles.label}>
                Email Address <span className={styles.required}>*</span>
              </label>
              <input
                id={isPopup ? 'email-popup' : 'email'}
                type="email"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                placeholder="alex@example.com"
              />
              {errors.email && <span className={styles.errorText}>{errors.email}</span>}
            </div>

            {/* Row 3: Phone Number with Country Code Dropdown */}
            <div className={styles.formField}>
              <label htmlFor={isPopup ? 'phone-popup' : 'phone'} className={styles.label}>
                Phone Number <span className={styles.required}>*</span>
              </label>
              <div className={styles.phoneInputGroup}>
                <select
                  id={isPopup ? 'countryCode-popup' : 'countryCode'}
                  name="countryCode"
                  aria-label="Country calling code"
                  value={formData.countryCode}
                  onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                  className={`${styles.select} ${styles.dialCodeSelect}`}
                >
                  <optgroup label="Popular Markets">
                    {COUNTRIES.filter((c) => c.isPriority).map((c) => (
                      <option key={`prio-${c.code}`} value={c.dialCode}>
                        {c.code} {c.dialCode}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="All Countries">
                    {COUNTRIES.filter((c) => !c.isPriority).map((c) => (
                      <option key={`all-${c.code}`} value={c.dialCode}>
                        {c.code} {c.dialCode}
                      </option>
                    ))}
                  </optgroup>
                </select>

                <input
                  id={isPopup ? 'phone-popup' : 'phone'}
                  type="tel"
                  name="phone"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  autoComplete="tel-national"
                  value={formData.phone}
                  onChange={(e) => {
                    const digitsOnly = e.target.value.replace(/\D/g, '');
                    setFormData({ ...formData, phone: digitsOnly });
                    if (errors.phone && digitsOnly.length >= 6) {
                      setErrors((prev) => ({ ...prev, phone: undefined }));
                    }
                  }}
                  className={`${styles.input} ${styles.phoneInput} ${errors.phone ? styles.inputError : ''}`}
                  placeholder="50 123 4567"
                />
              </div>
              {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
            </div>

            {/* Row 4: Country & City (beside each other) */}
            <div className={styles.twoColRow}>
              <div className={styles.formField}>
                <label htmlFor={isPopup ? 'country-popup' : 'country'} className={styles.label}>
                  Country <span className={styles.required}>*</span>
                </label>
                <select
                  id={isPopup ? 'country-popup' : 'country'}
                  name="country"
                  value={formData.country}
                  onChange={handleCountryChange}
                  className={`${styles.select} ${errors.country ? styles.inputError : ''}`}
                >
                  <optgroup label="Popular Markets">
                    {COUNTRIES.filter((c) => c.isPriority).map((c) => (
                      <option key={`country-prio-${c.code}`} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="All Countries">
                    {COUNTRIES.filter((c) => !c.isPriority).map((c) => (
                      <option key={`country-all-${c.code}`} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </optgroup>
                </select>
                {errors.country && <span className={styles.errorText}>{errors.country}</span>}
              </div>

              <div className={styles.formField}>
                <label htmlFor={isPopup ? 'city-popup' : 'city'} className={styles.label}>
                  City / State <span className={styles.optionalTag}>(Optional)</span>
                </label>
                <input
                  id={isPopup ? 'city-popup' : 'city'}
                  type="text"
                  name="city"
                  autoComplete="address-level2"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className={styles.input}
                  placeholder="e.g. Dubai, London, Zurich"
                />
              </div>
            </div>

            {/* Row 5: Advisory Scope */}
            <div className={styles.formField}>
              <label htmlFor={isPopup ? 'serviceInterest-popup' : 'serviceInterest'} className={styles.label}>
                Advisory Scope of Interest <span className={styles.required}>*</span>
              </label>
              <select
                id={isPopup ? 'serviceInterest-popup' : 'serviceInterest'}
                name="serviceInterest"
                value={formData.serviceInterest}
                onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                className={styles.select}
              >
                <option value="Forex Signals">Forex Signals</option>
                <option value="Comex Signals">Comex Signals (Gold & Silver)</option>
                <option value="Combo Signals">Combo Signals (Forex & Metals)</option>
                <option value="HNI Signals">HNI Signals & Dedicated Advisory</option>
                <option value="Account Management">Account Management (Trade-Only Execution)</option>
                <option value="General Consultation">General Consultation</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.submitBtn}
            >
              {isSubmitting ? (
                'Transmitting consultation request...'
              ) : (
                <>
                  <span>Submit Consultation Request</span>
                  <Send size={16} />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
