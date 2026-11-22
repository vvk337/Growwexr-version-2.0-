# Growwezy Global Tech — Project Inputs & Launch Checklist

> **Central Source of Truth** for business decisions, pending owner inputs, technical dependencies, hosting workflow, and external platform deployment actions for **Growwezy Global Tech** (`https://growwezy.com`).

---

## 1. Executive Status Dashboard

| Metric | Status / Value | Operational Notes |
| :--- | :---: | :--- |
| **Hosting Provider** | **Not yet decided** | Under evaluation; existing `vercel.json` kept intact as routing reference |
| **Deployment Responsibility** | **Designated Deployment Person** | Website owner does not handle CLI commands, hosting auth, or deployments |
| **Total Tracked Requirements** | **23** | Comprehensive scope across content, legal, technical SEO, E-E-A-T, and hosting |
| **Completed & Verified (Local)** | **15** | Confirmed business decisions, 7-year chronology fix, 8 published articles, 22 canonical routes, 569 SEO tests, 28 HTTP tests |
| **Pending Owner Input** | **7** | Phone, WhatsApp, deployment contact, client metrics, real author bios, regulatory scope, original publication dates |
| **Deferred by Owner** | **1** | Registered office physical address |
| **Pending Deployment Person** | **4** | Hosting selection, `GOOGLE_SHEETS_WEBHOOK_URL` env variable setup, staging/preview URL generation, production deployment |
| **External Platform Actions** | **5** | GSC, Bing Webmaster, sitemap submission, social card test, live DNS |
| **Next Recommended Action** | — | **Deployment person coordination for hosting selection, environment variables, and staging URL** |

---

## 2. Confirmed Business Decisions (Implemented & Verified)

Every item below has been implemented in source code, pre-rendered into static HTML, and verified via automated test suites.

| # | Requirement | Confirmed Decision | File / Component | Status | Verification Evidence |
| :-: | :--- | :--- | :--- | :---: | :--- |
| **C1** | **Primary Business Email** | `contact@growwezy.com` | `src/config/site.ts`<br>`src/pages/PrivacyPage.tsx`<br>`src/pages/TermsPage.tsx`<br>`src/pages/DisclaimerPage.tsx`<br>`src/components/layout/Footer.tsx`<br>`src/seo/schemas.ts`<br>`scripts/prerender.cjs` | **Completed** | Zero occurrences of legacy addresses (`Growwezy3@gmail.com`, `support@growwezy.com`). Verified across all 17 pre-rendered HTML files. |
| **C2** | **Registered Legal Entity Name** | `Growwezy Global Tech Private Limited` | `src/config/site.ts`<br>`src/pages/TermsPage.tsx`<br>`src/pages/PrivacyPage.tsx`<br>`src/pages/DisclaimerPage.tsx`<br>`src/seo/schemas.ts`<br>`scripts/prerender.cjs` | **Completed** | Replaced `Growwezy Technologies Private Limited`. Standardized across all legal disclosures and schema definitions. |
| **C3** | **Social Media Profiles** | Existing verified footer links:<br>• **Instagram**: `https://www.instagram.com/teamgrowwezy/`<br>• **Facebook**: `https://www.facebook.com/profile.php?id=61586211570915`<br>• **Telegram**: `https://t.me/growwezyglobaltech` | `src/config/socialChannels.ts`<br>`src/config/site.ts`<br>`src/components/ui/SocialButtons.tsx`<br>`src/seo/schemas.ts`<br>`scripts/prerender.cjs` | **Completed** | Verified all three channels in footer buttons and Organization JSON-LD `sameAs`. Unverified networks (Twitter, LinkedIn) excluded. |
| **C4** | **Article Publication Dates** | Intentionally omitted from Article JSON-LD (`datePublished`, `dateModified`) | `src/seo/schemas.ts`<br>`src/pages/InsightDetail.tsx`<br>`scripts/prerender.cjs` | **Completed** | No synthetic dates fabricated. Validated in `scripts/seo-qa-audit.cjs` and pre-rendered schemas. |
| **C5** | **Authoritative Open Graph Image** | Approved currency-symbol globe design (`public/assets/og-growwezy.jpg`) | `public/assets/og-growwezy.jpg`<br>`dist/assets/og-growwezy.jpg`<br>`scripts/generate-og.cjs`<br>`index.html`<br>`src/hooks/useSEO.ts`<br>`scripts/prerender.cjs` | **Completed** | 1200×630px JPEG (114.6 KB). SHA-256 byte-for-byte verified between source and build output. Generator script converted into read-only guardian. |
| **C6** | **Static Pre-Rendering (SSG)** | Complete static pre-rendering across all 22 canonical indexable routes | `scripts/prerender.cjs`<br>`package.json` | **Completed** | All 22 pages output unique `<title>`, `<meta name="description">`, `<link rel="canonical">`, Open Graph, and JSON-LD in initial HTML. |
| **C7** | **Edge Redirects & Status Codes** | HTTP 301 redirects for legacy URLs; true HTTP 404 with `noindex` for unknown paths | `vercel.json`<br>`scripts/test-http-server.cjs` | **Completed** | `/terms-of-service` → 301 → `/terms`; `/privacy-policy` → 301 → `/privacy`. Local edge emulator tests passed 28/28. `vercel.json` maintained as routing reference. |
| **C8** | **Crawl Directives** | Clean `robots.txt` and canonical-only `sitemap.xml` | `public/robots.txt`<br>`public/sitemap.xml`<br>`dist/robots.txt`<br>`dist/sitemap.xml` | **Completed** | Disallow rules removed for redirecting routes. Exactly 22 canonical indexable URLs listed with valid ISO dates. |
| **C9** | **Lead Capture Functionality** | Form validation with `/api/contact` serverless endpoint, honeypot protection, geo auto-detection & optional Google Sheets webhook integration | `src/components/forms/ConsultationForm.tsx`<br>`src/components/forms/CountrySelector.tsx`<br>`api/contact.ts` | **Completed** | Full validation and privacy consent preservation intact. Form operational on both desktop and mobile slide-up views. Lead storage requires `GOOGLE_SHEETS_WEBHOOK_URL` env variable in production host. |
| **C10**| **About Page Chronology Alignment** | Updated animated counter from 9 Years to confirmed 7 Years; reconciled with written text | `src/pages/AboutPage.tsx` | **Completed** | `value={7}` verified in counter animation; perfectly consistent with "Established seven years ago" copy. |
| **C11**| **Article Author & Publishing Infrastructure** | Reusable `ArticleAuthor` model, `AuthorBio` component, `status: 'published' \| 'draft'` gating, optional dates | `src/content/insights.ts`<br>`src/components/ui/AuthorBio/AuthorBio.tsx`<br>`src/seo/schemas.ts`<br>`src/pages/InsightDetail.tsx` | **Completed** | Zero fabricated authors or dates emitted. Missing authors safely render null and default schema to Organization. |
| **C12**| **Contextual Internal Linking on Services** | Connected commercial service pages to educational risk and macro research articles | `src/pages/ServiceDetail.tsx` | **Completed** | Natural, contextual in-text links to capital preservation, macro divergence, and NRI currency guides. |
| **C13**| **All 8 Insights Articles Published & Integrated** | All 8 comprehensive research articles published at canonical `/insights/...` routes with author models, schemas, related articles, and verified sitemap inclusion | `src/content/insights.ts`<br>`src/pages/InsightsIndex.tsx`<br>`src/pages/InsightDetail.tsx`<br>`public/sitemap.xml`<br>`scripts/prerender.cjs` | **Completed** | All 8 research articles published, pre-rendered to static HTML, linked bidirectionally, and verified across all 569 SEO checks. |

---

## 3. Pending Owner Inputs (Non-Blocking for Engineering)

These items require real business information from the website owner. Current development and technical verification proceed normally with safe placeholders and omissions. The website owner is **not** responsible for deployment commands or hosting authentication.

| # | Requirement | Why Required | Responsible Party | Relevant File / Component | Priority | Status | Dependencies | Verification Evidence Needed |
| :-: | :--- | :--- | :--- | :--- | :---: | :---: | :--- | :--- |
| **O1** | **Official Business Phone Number** | Required for direct inbound inquiries and Schema `telephone` / `ContactPoint` | Website Owner | `src/config/site.ts`<br>`src/components/layout/Footer.tsx` | High | **Pending — Owner** | Awaiting owner SIM/PBX allocation | Valid E.164 phone number confirmed by owner |
| **O2** | **Official WhatsApp Business Number** | Required for WhatsApp chat button deep-links (`wa.me`) | Website Owner | `src/config/socialChannels.ts`<br>`src/config/site.ts` | High | **Pending — Owner** | Awaiting dedicated WhatsApp Business account | Verified MSISDN with country code |
| **O3** | **Registered Office Physical Address** | Required under Indian DPDPA / IT Act rules for Grievance Redressal and corporate transparency | Website Owner | `src/config/site.ts`<br>`src/pages/PrivacyPage.tsx`<br>`src/pages/TermsPage.tsx` | Medium | **Deferred — Owner** | Owner corporate registration documentation | Registered company address in India |
| **O4** | **Original Article Publication Dates** | Required for accurate `datePublished` and `dateModified` in Article Schema and editorial datelines | Website Owner | `src/pages/InsightDetail.tsx`<br>`src/data/insightsData.ts`<br>`scripts/prerender.cjs` | Medium | **Pending — Owner** | Editorial archive records | Original publication or sign-off dates for the 3 insight articles |
| **O5** | **Deployment Coordination Details** | Contact or handoff channel for the designated deployment person | Website Owner | Project Management | High | **Pending — Owner** | Owner identifies designated technical resource | Channel established for deployment handoff |
| **O6** | **About Page Metrics Confirmation** | Confirm client and investor numbers ("2,800+ retail clients", "5+ corporate investors") for YMYL financial advertising compliance (Chronology fixed: 7 Years) | Website Owner | `src/pages/AboutPage.tsx` | High | **Pending — Owner** | Owner confirmation of official client counts | Written confirmation or qualifying narrative adjustment |
| **O7** | **Author & Analyst Attribution (E-E-A-T)** | Identifiable authors, market credentials, and bios for financial research articles (Technical infrastructure completed in Phase B2) | Website Owner | `src/content/insights.ts`<br>`src/components/ui/AuthorBio/` | Medium | **Pending — Owner** | Selection of real lead analyst / founder names and professional bios | Written editorial profiles with experience summary |
| **O8** | **Regulatory Scope & Positioning Confirmation** | Confirm non-custodial advisory, signal provider, and analytical software boundaries align with UAE (SCA/DFSA) and Indian (SEBI) standards | Website Owner / Legal | `src/content/services.ts`<br>`src/pages/DisclaimerPage.tsx` | High | **Pending — Owner** | Owner/legal review of service tier descriptions | Confirmed compliance wording for marketing copy |
| **O9** | **Slider Form Polish & Customization** | Interactive slider/modal consultation form tuning (UX transitions, field validations, mobile slide-up sheet) | Website Owner & Dev | `src/components/forms/ConsultationForm.tsx`<br>`ConsultationForm.module.css` | Medium | **Queued for Next Work Session** | Owner design preference for slider steps / slide-out view | Tested smooth interaction across mobile & desktop |
| **O10**| **Live Market Ticker Enhancement** | Market ticker integration (live/indicative price feeds for Gold, EUR/USD, GBP/USD, indices, and custom rates) | Website Owner & Dev | `src/components/ui/MarketTicker/MarketTicker.tsx`<br>`.env` | Medium | **Queued for Next Work Session** | API key / live feed endpoint configuration | Live real-time or cached rate streaming |

---

## 4. Revised Deployment & Hosting Workflow

The deployment workflow is decoupled from owner operations. Actual deployment is handled by the designated deployment person once a hosting platform is chosen.

```
[Phase A] Local Build & Tests (Completed — 22 Routes, 569 SEO Tests, 28 HTTP Tests)
    │
    ▼
[Phase B] Content & Authority SEO (Completed — 8 Research Articles Published)
    │
    ▼
[Phase C] Hosting Provider Selection & Environment Setup (Designated Deployment Person)
    │
    ▼
[Phase D] Staging / Preview Environment Validation (QA & SEO Team)
    │
    ▼
[Phase E] Final Production Deployment Checklist Handoff (Deployment Person)
    │
    ▼
[Phase F] Live Production Verification & Search Engine Indexing (QA & Owner)
```

### Tracking: Hosting & Deployment Tasks

| # | Task | Scope | Environment | Responsible Party | Status | Notes |
| :-: | :--- | :--- | :--- | :--- | :---: | :--- |
| **D1** | **Local Production Build & Automated Tests** | TypeScript compilation, Vite asset bundling, SSG pre-rendering, 569 SEO assertions, 28 HTTP tests | Local Workspace | Developer / CI | **Completed** | Runs cleanly via `npm run build` and test scripts across all 22 canonical routes. |
| **D2** | **Content & Authority SEO** | Informational architecture, keyword-targeted guides, schema enhancements | Local Workspace | SEO Strategist | **Completed** | All 8 comprehensive articles published, pre-rendered, and cross-linked. |
| **D3** | **Hosting Provider Selection** | Selection of static/SPA hosting platform (Vercel, Cloudflare Pages, Netlify, AWS S3/CloudFront, etc.) | Hosting Platform | Designated Deployment Person | **Pending** | `vercel.json` preserved as edge routing reference; adaptable to other providers. |
| **D4** | **Environment Variables Setup (`GOOGLE_SHEETS_WEBHOOK_URL`)** | Configure webhook endpoint for lead capture synchronization | Hosting Platform / Serverless | Designated Deployment Person | **Pending** | **CRITICAL**: Inquiries submitted to `/api/contact` only sync to Google Sheets if `GOOGLE_SHEETS_WEBHOOK_URL` is set. Without it, inquiries return `sheetSynced: false` and are logged to server output only. **Never claim persistent lead storage until verified.** |
| **D5** | **Staging / Preview URL Provision** | Deploying current build to a staging environment and providing URL | Staging Host | Designated Deployment Person | **Pending** | Awaiting provider selection and initial deploy. |
| **D6** | **Actual Hosting Environment Validation** | Validating all 22 canonical routes, 301 redirects, true 404, raw HTML metadata, JSON-LD, sitemap, robots.txt, OG image, and social cards | Live Staging Host | QA / SEO Engineer | **Pending Staging URL** | Conducted immediately once staging URL is provided. |
| **D7** | **Production Deployment Checklist Handoff** | Providing verified pre-flight checklist, headers config, redirect rules, and env var confirmation | Deployment Handoff | Developer / QA | **Pending Staging Pass** | Delivered to the designated deployment person. |
| **D8** | **Production Deployment Confirmation** | Live deployment to custom domain `https://growwezy.com` | Production Host | Designated Deployment Person | **Pending** | Executed after staging sign-off. |
| **D9** | **Live Domain Verification & Search Indexing** | Live HTTP response check, Google Search Console & Bing Webmaster verification, XML sitemap submission | Production Web | QA / Owner | **Pending Production** | Executed post-launch. |

---

## 5. Staging Environment Validation Protocol (Phase D)

Once the designated deployment person provides the staging or preview URL, the QA team will execute the following validation suite against the live endpoint:

1. **All 22 Canonical Routes**:
   - Verify each returns `HTTP 200` with pre-rendered HTML (no client-side blank flash).
2. **HTTP 301 Server Redirects**:
   - `/terms-of-service` → `HTTP 301` → `/terms`
   - `/privacy-policy` → `HTTP 301` → `/privacy`
3. **Genuine HTTP 404 Behavior**:
   - Random non-existent URLs return true `HTTP 404 Not Found` with `noindex, follow` directive.
4. **Raw HTML Metadata Inspection (Without JavaScript)**:
   - Unique `<title>` and `<meta name="description">` on each route.
   - Self-referencing `<link rel="canonical">` matching requested path.
5. **JSON-LD Structured Data**:
   - Organization, WebSite, Service, Article, and BreadcrumbList schemas valid in initial response.
6. **Crawl Directives**:
   - `/robots.txt` accessible with `HTTP 200` and correct sitemap declaration.
   - `/sitemap.xml` accessible with `HTTP 200` listing exactly 22 canonical URLs.
7. **Open Graph & Twitter Cards**:
   - `/assets/og-growwezy.jpg` returns `HTTP 200` with `image/jpeg`.
   - Verified via live crawlers (LinkedIn Post Inspector, Twitter/X Card Validator, Facebook Sharing Debugger).

---

## 6. Permanent Maintenance Instructions

This document must remain an active, living artifact throughout the lifespan of the Growwezy platform.

### Update Triggers
Whenever any of the following events occur during development, testing, or auditing:
1. **Missing Information**: A new placeholder or unknown value is uncovered in any component.
2. **Business Decisions**: The owner confirms or modifies a corporate parameter (e.g. phone number, address, pricing).
3. **Owner Inputs Delivered**: An item listed in Section 3 is supplied.
4. **Hosting Selection**: The designated deployment person selects a provider and configures staging.
5. **Technical Dependencies**: New third-party services, APIs, or environment variables are introduced.
6. **Launch Blockers**: Any defect or misconfiguration that blocks staging or production release.

### Mandatory Entry Schema
Every entry added to this checklist must contain:
- **Description**: Plain-language explanation of what is required.
- **Why Required**: Technical or legal justification.
- **Responsible Party**: Role assigned to deliver or implement.
- **Relevant File / Component**: Exact workspace file path.
- **Priority**: High / Medium / Low.
- **Status**: Completed / Pending / Blocked / Deferred.
- **Dependencies**: Prerequisites needed before work can begin.
- **Verification Evidence**: Proof of completion (commit hash, test log, curl output, screenshot).

> [!IMPORTANT]
> **Integrity Rule**: Never delete or hide an unresolved item simply to present a clean dashboard. All deferred, pending, or blocked items must remain visible until genuinely resolved and verified.
