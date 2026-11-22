# Launch Readiness Checklist for Site Owner

> **Note**: For the full project status, confirmed business decisions, and revised deployment workflow, refer to **[`PROJECT-INPUTS-AND-LAUNCH-CHECKLIST.md`](./PROJECT-INPUTS-AND-LAUNCH-CHECKLIST.md)**.

Before deploying to a public production domain, please verify and supply the following details:

- [x] **Primary Business Email**:
  - [x] Standardized across the website as `contact@growwezy.com`.

- [ ] **Pending Owner Contact Details**:
  - [ ] Official WhatsApp / Phone number for direct client consultation (leave as-is until numbers are allocated).
  - [ ] Registered physical office address or operational jurisdiction notes (deferred by owner).
  - [ ] Original publication dates for the 3 insight articles (currently omitted from schemas).
  - [ ] Designated deployment person's contact/coordination details.

- [x] **Form Destination**:
  - [x] Live Google Sheets proxy operational with country auto-detection and fallback protection.
  - [x] Form submission active (`enableFormSubmission: true` in `src/config/site.ts`).

- [x] **Legal & Regulatory Compliance**:
  - [x] Terms of Service updated with legal name `Growwezy Global Tech Private Limited`.
  - [x] Privacy Policy updated with DPDPA/GDPR/CalOPPA compliance and Grievance Officer details.
  - [x] Financial risk disclosures active across homepage, footer, services, and disclaimer.

- [ ] **Optional Content Additions**:
  - [ ] Approved client case studies (currently hidden: `showClientStories: false`).
  - [ ] Verified client testimonials (currently hidden: `showTestimonials: false`).
  - [ ] Public fee schedule if desired (currently hidden: `showPricing: false`).

- [ ] **Hosting & Deployment (Handled by Designated Deployment Person)**:
  - [ ] Select hosting provider (Vercel, Cloudflare Pages, Netlify, AWS, etc.).
  - [ ] Deploy build to staging/preview environment and provide URL for QA validation.
  - [ ] Complete staging validation protocol (17 routes, 301 redirects, true 404, raw HTML SEO).
  - [ ] Connect production custom domain (`growwezy.com`).
  - [ ] Verify SSL certificate, XML sitemap, and search engine webmaster properties.
