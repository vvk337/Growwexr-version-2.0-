# Growwezy Global Tech — Final Technical Deployment & Operations Handover

> **Audience**: Designated Technical Operations, Hosting & Deployment Engineer  
> **Project**: Growwezy Global Tech (`https://growwezy.com`)  
> **Status**: Development Phase Closed — Ready for Staging & Production Deployment  
> **Source Directory**: Root of project repository (`d:\Growwezy 2.0`)  
> **Associated Checklist**: [`PROJECT-INPUTS-AND-LAUNCH-CHECKLIST.md`](./PROJECT-INPUTS-AND-LAUNCH-CHECKLIST.md)

---

## 1. Executive Summary & Project State

Website development and automated quality engineering for **Growwezy Global Tech** are officially closed. The application is packaged, verified, and pre-rendered for deployment.

### Core Deliverables in Repository
* **22 Canonical Routes**: Fully pre-rendered static HTML files with self-referencing canonical links, route-specific metadata, and Open Graph tags.
* **8 Published Research Articles**: In-depth financial research guides located at `/insights/:slug` complete with author attribution models, citations, related guides, and Article JSON-LD structured data.
* **Complete Technical SEO Implementation**: Automated Schema markup (`Organization`, `WebSite`, `Service`, `Article`, `BreadcrumbList`), canonical enforcement, edge 301 redirects, genuine HTTP 404 error page, and crawl directives.
* **Authoritative Open Graph Asset**: Validated 1200×630px JPEG (`public/assets/og-growwezy.jpg`) featuring the approved currency-symbol globe motif. A read-only verification guardian (`scripts/generate-og.cjs`) enforces exact dimensions and prevents accidental overwrites during builds.
* **Lead Capture & Consultation Infrastructure**: Multi-step consultation form with country dial-code auto-detection, phone validation, honeypot anti-spam protection, and serverless forwarding to Google Sheets.
* **Responsive Architecture**: Built on React 18, TypeScript, and Vite with custom CSS Modules, tested across standard mobile (360px, 440px), tablet (768px), and desktop (1024px, 1440px) breakpoints with zero horizontal overflow.

### Verification Status & Disclaimer
Automated test suites were executed against the production build:
* **Automated SEO Audit (`scripts/seo-qa-audit.cjs`)**: **569 / 569 checks passed** (0 warnings, 0 failed).
* **HTTP Routing & Status Emulation (`scripts/test-http-server.cjs`)**: **28 / 28 tests passed** (0 failed).
* **Production Build (`npm run build`)**: Compiled and pre-rendered with zero errors.

> [!IMPORTANT]
> **Local Build vs. Live Hosting Verification**:
> The test results above represent **local pre-deployment verification**. They confirm that static files, metadata, and routing configurations build correctly. 
> The deployment person is responsible for performing **live staging verification** on the actual target hosting platform to ensure headers, edge redirects, serverless API execution, and SSL certificates function in the live network environment.

---

## 2. Technical Stack & Build Specifications

| Parameter | Specification | Notes |
| :--- | :--- | :--- |
| **Runtime Environment** | **Node.js 18.x, 20.x, or 22.x LTS** | Local development and verification executed on Node.js v25.2.1 / v20 LTS recommended for production |
| **Package Manager** | **npm** (v10+ or v11+) | `package-lock.json` is authoritative. Compatible with `pnpm` or `yarn` if configured |
| **Framework & Tooling** | **React 18.3.1**, **TypeScript 5.6.3**, **Vite 5.4.10** | Single Page Application (SPA) with Static Site Generation (SSG) pre-rendering |
| **Styling** | **CSS Modules** + CSS Variables | Zero external CSS runtime overhead; scoped styles |
| **Icons** | **Lucide React** (`lucide-react`) | Tree-shaken and bundled locally |
| **Pre-Rendering Engine** | Custom static renderer (`scripts/prerender.cjs`) | Uses JSDOM and Vite production chunks to generate static `index.html` for all 22 routes |
| **Production Output Directory** | `dist/` | Contains all HTML pages, bundled CSS/JS assets, `sitemap.xml`, `robots.txt`, and `assets/` |

---

## 3. Installation, Build & Preview Commands

Run all commands from the project root directory:

### Step 1: Install Dependencies
```bash
# Clean, deterministic installation for CI/CD and deployment environments
npm ci

# Or standard install for manual workspace setup
npm install
```

### Step 2: Run Production Build
```bash
npm run build
```
The build script performs four operations sequentially:
1. `node scripts/generate-og.cjs`: Asserts that `public/assets/og-growwezy.jpg` exists, matches 1200×630px JPEG format, and is byte-accurate.
2. `tsc`: Executes TypeScript type-checking across all components and configs.
3. `vite build`: Compiles, minifies, and hashes JavaScript and CSS bundles into `dist/assets/`.
4. `node scripts/prerender.cjs`: Generates individual `index.html` files for all 22 canonical routes and `dist/404.html`.

### Step 3: Run Automated Pre-Deployment Verification Suites
```bash
# 1. Run Automated SEO QA Audit (569 assertions)
node scripts/seo-qa-audit.cjs

# 2. Run Local HTTP Status & Edge Routing Test Server (28 tests)
node scripts/test-http-server.cjs
```

### Step 4: Preview Production Build Locally
```bash
npm run preview
```
Spawns a local preview server on `http://localhost:4173`.

---

## 4. Hosting Architecture & Serverless API Requirements

The hosting provider has **not yet been finalized**. The deployment person must evaluate hosting options based on the following architectural requirements:

### A. Critical Warning: Do Not Upload Only `dist/` as Plain Static Files Without API Support
The Growwezy website contains two layers:
1. **Frontend Static HTML / SPA**: Located in `dist/`.
2. **Serverless Lead Capture API**: Located in [`api/contact.ts`](file:///d:/Growwezy%202.0/api/contact.ts).

If the hosting provider only serves static files from `dist/` (e.g. basic AWS S3 bucket, GitHub Pages, or static-only CDN) without a serverless runtime or backend reverse proxy, **the consultation form at `/contact` will fail with HTTP 404 or 405 when calling `/api/contact`**.

### B. Hosting Provider Adaptation Matrix

| Hosting Provider | Static Frontend (`dist/`) | API Endpoint Support (`api/contact.ts`) | Required Configuration & Action |
| :--- | :---: | :---: | :--- |
| **Vercel** *(Default Reference)* | Native | Native | Uses existing [`vercel.json`](./vercel.json). Automatically deploys `api/contact.ts` as a Node.js Serverless Function. Zero code changes required. |
| **Cloudflare Pages** | Native | Supported via Pages Functions | Move or symlink `api/contact.ts` to `functions/api/contact.ts` (or implement an HTTP Cloudflare Worker) to handle POST requests to `/api/contact`. |
| **Netlify** | Native | Supported via Netlify Functions | Place or configure API in `netlify/functions/contact.ts` with a rewrite rule in `netlify.toml` from `/api/contact` to `/.netlify/functions/contact`. |
| **AWS Amplify / CloudFront + Lambda** | Native | Supported via Lambda / API Gateway | Route `/api/*` to an AWS Lambda function running `api/contact.ts` code, with `dist/` hosted on S3 + CloudFront. |
| **Self-Hosted Node.js / Docker (Nginx)** | Native | Supported via Express / Node.js | Serve `dist/` as static assets via Nginx; proxy `/api/*` requests to a small Node.js service running `api/contact.ts`. |

---

## 5. Routing, Redirects, 404 & Header Specifications

Regardless of the selected hosting platform, the deployment engineer must ensure the edge server or web server implements the rules defined in [`vercel.json`](./vercel.json):

### 1. HTTP 301 Permanent Redirects
Legacy and alias paths must redirect with `HTTP 301` to avoid duplicate content penalties:
* `/terms-of-service`  ⟶ `HTTP 301` ⟶  `/terms`
* `/privacy-policy`    ⟶ `HTTP 301` ⟶  `/privacy`

### 2. Clean URLs & Directory Slashing
* All 22 canonical routes must resolve without `.html` extensions (e.g., `https://growwezy.com/services/forex-signals`).
* Pre-rendered routes are output as `dist/<route>/index.html`. Ensure web server configuration resolves `<route>/` or `<route>` cleanly without redirect loops.

### 3. Genuine HTTP 404 Handling
* Any request to a non-existent route must return a genuine **HTTP 404 Not Found** status code serving `dist/404.html`.
* **Avoid Soft 404s**: Do **not** redirect non-existent URLs to `/` or serve `index.html` with an HTTP 200 status code. The 404 page includes a `<meta name="robots" content="noindex, follow">` tag to protect crawl budget.

### 4. Cache-Control Header Directives
Configure edge caching according to asset type:
* **Hashed Bundles** (`/assets/*.[js|css]`):  
  `Cache-Control: public, max-age=31536000, immutable`
* **Authoritative OG Image** (`/assets/og-growwezy.jpg`):  
  `Cache-Control: public, max-age=604800, stale-while-revalidate=86400`
* **Sitemap & Robots** (`/sitemap.xml`, `/robots.txt`):  
  `Cache-Control: public, max-age=86400`
* **Static HTML Pages** (`/*`):  
  `Cache-Control: public, max-age=0, must-revalidate` (allows immediate cache invalidation on deployment)

---

## 6. Google Sheets Lead Integration & Environment Setup

The website owner has already tested and verified the Google Sheets lead capture integration during local development. For production, the integration relies on a secure environment variable.

### Production Environment Variable

```env
GOOGLE_SHEETS_WEBHOOK_URL="https://script.google.com/macros/s/<YOUR_SCRIPT_ID>/exec"
```

### Operational Rules for Deployment Person
1. **Never Hardcode**: Never paste or hardcode the webhook URL into `api/contact.ts`, client-side code, or git-tracked files.
2. **Add to Hosting Dashboard**: Add `GOOGLE_SHEETS_WEBHOOK_URL` in the secure Environment Variables panel of the chosen hosting platform (e.g. *Vercel Project Settings > Environment Variables*, *Cloudflare Pages Settings > Environment Variables*).
3. **API Logic Verification**:
   * When `GOOGLE_SHEETS_WEBHOOK_URL` is set: The serverless endpoint sends a POST request to Google Apps Script (with an 8-second timeout and `redirect: follow`). On success, it returns `{ status: "ok", sheetSynced: true, inquiryId: "GW-..." }`.
   * When `GOOGLE_SHEETS_WEBHOOK_URL` is missing: The endpoint logs the lead to server stdout and returns `{ status: "ok", sheetSynced: false, inquiryId: "GW-..." }`.
4. **Mandatory Post-Deployment Test**:
   * Navigate to the live `/contact` page on the staging/preview URL.
   * Fill out and submit a legitimate test inquiry.
   * Verify that:
     1. The submission UI displays the green confirmation with the unique reference ID (`GW-XXXX`).
     2. The serverless function logs report `HTTP 200` with `sheetSynced: true`.
     3. A new row containing all submitted fields is created in the connected Google Sheet.
   * **Do not consider the consultation form operational in production until this end-to-end check passes.**

### Additional Application Flags
In [`src/config/site.ts`](file:///d:/Growwezy%202.0/src/config/site.ts):
* `siteConfig.featureFlags.enableFormSubmission`: Set to `true` (enables live network submissions to `/api/contact`). If set to `false`, the form falls back to local preview mode without dispatching network requests.

---

## 7. Confirmed Decisions to Preserve (Do Not Modify)

The deployment person must strictly preserve the following confirmed owner business parameters:

| Business Parameter | Authoritative Value | Canonical Locations |
| :--- | :--- | :--- |
| **Primary Business Email** | `contact@growwezy.com` | `src/config/site.ts`, all legal pages, footer, JSON-LD schemas |
| **Registered Legal Entity Name**| `Growwezy Global Tech Private Limited` | `src/config/site.ts`, Terms, Privacy, Disclaimer, Organization schema |
| **Company Chronology (Age)** | **7 Years** | `src/pages/AboutPage.tsx` (`value={7}` in counter, "seven years ago" in text) |
| **Official Social Profiles** | • Instagram: `https://www.instagram.com/teamgrowwezy/`<br>• Facebook: `https://www.facebook.com/profile.php?id=61586211570915`<br>• Telegram: `https://t.me/growwezyglobaltech` | `src/config/socialChannels.ts`, Footer, Schema `sameAs` |
| **Authoritative OG Image** | Approved currency-symbol globe JPEG (`public/assets/og-growwezy.jpg`) | `scripts/generate-og.cjs` enforces dimensions; do not replace |
| **Article Publishing Dates** | Intentionally omitted from schemas until owner confirms original editorial records | `src/seo/schemas.ts`, `src/pages/InsightDetail.tsx` (No synthetic dates) |
| **Phone / WhatsApp Links** | Telephone text only (`+91 (0) 000 000 000`); dummy WhatsApp omitted from default active buttons | `src/components/layout/Footer.tsx`, `SocialBar.tsx` (Prevents invalid links) |

---

## 8. Complete Canonical Route Inventory (22 Routes)

The pre-rendering and hosting configuration must verify `HTTP 200` responses across all 22 routes:

### Core Pages (8 Routes)
1. `/` (Homepage)
2. `/about` (About Us)
3. `/approach` (Our Approach)
4. `/contact` (Contact & Consultation)
5. `/terms` (Terms of Service)
6. `/privacy` (Privacy Policy)
7. `/disclaimer` (Risk Disclaimer)
8. `/insights` (Research & Insights Index)

### Commercial Service Pages (6 Routes)
9. `/services` (Services Index)
10. `/services/forex-signals` (Forex Signals)
11. `/services/comex-signals` (Comex Precious Metals Signals)
12. `/services/combo-signals` (Forex & Comex Combo Package)
13. `/services/hni-signals` (High Net Worth Individual Signals)
14. `/services/account-management` (Non-Custodial Account Management)

### Published Research Articles (8 Routes)
15. `/insights/managing-cross-border-currency-risk-nri-guide`
16. `/insights/principles-of-capital-preservation-in-volatile-fx-markets`
17. `/insights/macroeconomic-divergence-g10-monetary-policy-impact`
18. `/insights/forex-trading-sessions-uae-time-gst`
19. `/insights/nri-currency-risk-remittance-considerations`
20. `/insights/non-custodial-account-management-education`
21. `/insights/macroeconomic-divergence-global-liquidity-playbook`
22. `/insights/trading-gold-xauusd-vs-forex-volatility`

---

## 9. Post-Deployment Verification Checklist for Operations Person

Once deployed to staging or production, execute this sequence:

- [ ] **1. DNS & SSL**: Verify HTTPS certificate validity and HTTP ⟶ HTTPS automatic upgrade.
- [ ] **2. Route Status Checks**: Confirm all 22 canonical routes return `HTTP 200` without redirect loops or blank client-side flashes.
- [ ] **3. Redirect Verification**:
  - `curl -I https://growwezy.com/terms-of-service` ⟶ Expect `HTTP 301` to `/terms`.
  - `curl -I https://growwezy.com/privacy-policy` ⟶ Expect `HTTP 301` to `/privacy`.
- [ ] **4. Error Status Check**:
  - `curl -I https://growwezy.com/non-existent-sample-url` ⟶ Expect `HTTP 404`.
- [ ] **5. Crawl Directive Access**:
  - `curl -I https://growwezy.com/robots.txt` ⟶ Expect `HTTP 200`.
  - `curl -I https://growwezy.com/sitemap.xml` ⟶ Expect `HTTP 200` (contains exactly 22 URLs).
- [ ] **6. Social Sharing Debuggers**:
  - Test `https://growwezy.com` in Facebook Sharing Debugger, Twitter/X Card Validator, and LinkedIn Post Inspector. Confirm `og:image` displays the currency globe image.
- [ ] **7. Live Form Lead Test**:
  - Submit a test lead through `/contact`.
  - Confirm receipt in Google Sheets and verify green UI confirmation.
- [ ] **8. Search Engine Console Registration**:
  - Submit `https://growwezy.com/sitemap.xml` in Google Search Console.
  - Submit sitemap in Bing Webmaster Tools.
