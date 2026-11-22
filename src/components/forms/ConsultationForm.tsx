import React, { useState, useEffect } from 'react';
import { CheckCircle2, AlertTriangle, Send } from 'lucide-react';
import { siteConfig } from '../../config/site';
import { COUNTRIES, DEFAULT_COUNTRY, findCountryByCode, findCountryByName } from '../../data/countries';
import styles from './ConsultationForm.module.css';

export interface FormData {
  fullName: string;
  firstName?: string;
  lastName?: string;
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
  fullName?: string;
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

// Persistent storage for detected/chosen geo preferences so it never reverts
function getSavedGeo() {
  try {
    const country = localStorage.getItem('gw_user_country') || sessionStorage.getItem('gw_user_country');
    const dialCode = localStorage.getItem('gw_user_dial_code') || sessionStorage.getItem('gw_user_dial_code');
    if (country && dialCode) {
      return { country, dialCode };
    }
  } catch {}
  return null;
}

function saveGeo(country: string, dialCode: string) {
  try {
    if (country) {
      localStorage.setItem('gw_user_country', country);
      sessionStorage.setItem('gw_user_country', country);
    }
    if (dialCode) {
      localStorage.setItem('gw_user_dial_code', dialCode);
      sessionStorage.setItem('gw_user_dial_code', dialCode);
    }
  } catch {}
}

export const ConsultationForm: React.FC<ConsultationFormProps> = ({
  variant = 'page',
  hideTitle = false,
  leadSource = 'Contact Page',
  onSuccess,
}) => {
  const savedGeo = getSavedGeo();

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    firstName: '',
    lastName: '',
    email: '',
    countryCode: savedGeo?.dialCode || DEFAULT_COUNTRY.dialCode,
    phone: '',
    country: savedGeo?.country || '',
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
        // If already saved in session/local storage, don't overwrite user's preference
        const currentSaved = getSavedGeo();
        if (currentSaved) {
          return;
        }

        // 1. Try serverless edge endpoint first
        const res = await fetch('/api/geo').catch(() => null);
        if (res && res.ok) {
          const geo = await res.json().catch(() => null);
          if (geo?.countryCode && isMounted) {
            const matched = findCountryByCode(geo.countryCode);
            if (matched) {
              saveGeo(matched.name, matched.dialCode);
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
              saveGeo(matched.name, matched.dialCode);
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
            saveGeo(tzMatched.name, tzMatched.dialCode);
            setFormData((prev) => ({
              ...prev,
              countryCode: tzMatched.dialCode,
              country: tzMatched.name,
            }));
          }
        }
      } catch {
        // Retain current fallback gracefully
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
    const dialCode = matched ? matched.dialCode : formData.countryCode;
    saveGeo(selectedCountryName, dialCode);
    setFormData((prev) => ({
      ...prev,
      country: selectedCountryName,
      countryCode: dialCode,
    }));
  };

  const validate = (): boolean => {
    const errs: FormErrors = {};

    if (!formData.fullName.trim()) {
      errs.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      errs.fullName = 'Please enter at least 2 characters';
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

    // Guard against rapid duplicate clicks
    if (isSubmitting) {
      return;
    }

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

    // Generate unique inquiry ID at client level
    const clientInquiryId = `GW-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    const nameParts = formData.fullName.trim().split(/\s+/);
    const resolvedFirstName = formData.firstName || nameParts[0] || '';
    const resolvedLastName = formData.lastName || nameParts.slice(1).join(' ') || '';
    const resolvedFullName = formData.fullName.trim();

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
          inquiryId: clientInquiryId,
          fullName: resolvedFullName,
          firstName: resolvedFirstName,
          lastName: resolvedLastName,
          serviceInterest: formData.serviceInterest || 'Forex Signals',
          submittedAt: new Date().toISOString(),
          leadSource,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || `Submission failed with status HTTP ${response.status}`);
      }

      const generatedId = data.inquiryId || clientInquiryId;

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
    const geo = getSavedGeo();
    setFormData({
      fullName: '',
      firstName: '',
      lastName: '',
      email: '',
      countryCode: geo?.dialCode || DEFAULT_COUNTRY.dialCode,
      phone: '',
      country: geo?.country || '',
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
              <p><strong>Name:</strong> {formData.fullName || `${formData.firstName || ''} ${formData.lastName || ''}`.trim()}</p>
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
              Thank you, {formData.fullName?.split(' ')[0] || formData.firstName || 'Client'}. Your consultation parameters have been securely received. A senior advisor will review your requirements and respond within 1 business day.
            </p>
            <div className={styles.submittedSummary}>
              <p><strong>Inquiry ID:</strong> {submissionReceipt.inquiryId}</p>
              <p><strong>Client Name:</strong> {formData.fullName || `${formData.firstName || ''} ${formData.lastName || ''}`.trim()}</p>
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

            {/* Row 1: Full Name with in-field placeholder (No heading above) */}
            <div className={styles.formField}>
              <label htmlFor={isPopup ? 'fullName-popup' : 'fullName'} className={styles.srOnly}>
                Full Name
              </label>
              <input
                id={isPopup ? 'fullName-popup' : 'fullName'}
                type="text"
                name="fullName"
                autoComplete="name"
                value={formData.fullName}
                onChange={(e) => {
                  const val = e.target.value;
                  const parts = val.trim().split(/\s+/);
                  setFormData({
                    ...formData,
                    fullName: val,
                    firstName: parts[0] || '',
                    lastName: parts.slice(1).join(' ') || '',
                  });
                  if (errors.fullName && val.trim().length >= 2) {
                    setErrors((prev) => ({ ...prev, fullName: undefined }));
                  }
                }}
                className={`${styles.input} ${errors.fullName ? styles.inputError : ''}`}
                placeholder="Full Name *"
              />
              {errors.fullName && <span className={styles.errorText}>{errors.fullName}</span>}
            </div>

            {/* Row 2: Email Address with in-field placeholder (No heading above) */}
            <div className={styles.formField}>
              <label htmlFor={isPopup ? 'email-popup' : 'email'} className={styles.srOnly}>
                Email Address
              </label>
              <input
                id={isPopup ? 'email-popup' : 'email'}
                type="email"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (errors.email) {
                    setErrors((prev) => ({ ...prev, email: undefined }));
                  }
                }}
                className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                placeholder="Email Address *"
              />
              {errors.email && <span className={styles.errorText}>{errors.email}</span>}
            </div>

            {/* Row 3: Phone Number with Country Code Dropdown & in-field placeholder (No heading above) */}
            <div className={styles.formField}>
              <label htmlFor={isPopup ? 'phone-popup' : 'phone'} className={styles.srOnly}>
                Phone Number
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
                  placeholder="Phone Number *"
                />
              </div>
              {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
            </div>

            {/* Row 4: Country & City (In-field placeholders, no headings above) */}
            <div className={styles.twoColRow}>
              <div className={styles.formField}>
                <label htmlFor={isPopup ? 'country-popup' : 'country'} className={styles.srOnly}>
                  Country
                </label>
                <select
                  id={isPopup ? 'country-popup' : 'country'}
                  name="country"
                  value={formData.country}
                  onChange={(e) => {
                    handleCountryChange(e);
                    if (errors.country) {
                      setErrors((prev) => ({ ...prev, country: undefined }));
                    }
                  }}
                  className={`${styles.select} ${errors.country ? styles.inputError : ''} ${!formData.country ? styles.placeholderSelect : ''}`}
                >
                  <option value="" disabled hidden>
                    Country *
                  </option>
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
                <label htmlFor={isPopup ? 'city-popup' : 'city'} className={styles.srOnly}>
                  City / State
                </label>
                <input
                  id={isPopup ? 'city-popup' : 'city'}
                  type="text"
                  name="city"
                  autoComplete="address-level2"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className={styles.input}
                  placeholder="City / State (Optional)"
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
