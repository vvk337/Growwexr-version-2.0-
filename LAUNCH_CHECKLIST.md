# Launch Readiness Checklist for Site Owner

Before deploying to a public production domain, please verify and supply the following details:

- [ ] **Contact Information**:
  - [ ] Official inquiry email address (currently set to placeholder `contact@growwezy.com`).
  - [ ] Official WhatsApp / Phone number for direct client consultation.
  - [ ] Registered physical office address or operational jurisdiction notes.

- [ ] **Form Destination**:
  - [ ] Connect contact form handler (e.g. Formspree, Web3Forms, Supabase, or custom backend API).
  - [ ] Toggle `enableFormSubmission: true` in `src/config/site.ts`.

- [ ] **Legal & Regulatory Compliance**:
  - [ ] Provide finalized Terms of Service and Privacy Policy text.
  - [ ] Provide mandatory financial risk disclosures for Forex & Asset Management advisory.
  - [ ] Regulatory registration statements (SEBI / DIFC / ADGM / SCA if applicable).

- [ ] **Optional Content Additions**:
  - [ ] Approved client case studies (set `showClientStories: true` in `src/config/site.ts`).
  - [ ] Verified client testimonials (set `showTestimonials: true`).
  - [ ] Public fee schedule if desired (set `showPricing: true`).

- [ ] **Domain & Deployment**:
  - [ ] Connect production custom domain.
  - [ ] Verify SSL certificate and sitemap / meta tags.

