# Growwezy Global Tech — Forex Advisory & Asset Management Website

A modern, mobile-first, high-performance financial advisory web platform inspired by the Sterling Consult design language. Built cleanly with React, TypeScript, Vite, CSS Modules, and client-side routing.

---

## Quick Start (Windows / PowerShell)

### 1. Start Development Server
```powershell
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 2. Build for Production
```powershell
npm run build
```

### 3. Preview Production Build Locally
```powershell
npm run preview
```
Open [http://localhost:4173](http://localhost:4173) in your browser.

---

## Architectural Highlights

* **Atmospheric Moving Hero & Banners**: Layered radial/mesh ribbons in cobalt blue (`#075AF7`) and teal (`#19CBD0`) drifting smoothly over deep navy (`#132856`) and near-black (`#020713`) with subtle grain overlay and static `prefers-reduced-motion` fallback.
* **Sterling-Inspired Design System**: Large lightweight headings, white / pale ice (`#F0F7FC`) / navy section rhythm, rectangular buttons with animated arrow tiles, and 16px radius editorial cards.
* **Mobile-First Responsive Verification**: Verified breakpoints at 360px, 440px, 768px, 1024px, and 1440px with touch-friendly 44px+ targets and zero horizontal overflow.
* **Clean Route Structure**:
  * `/`: Full homepage featuring hero, category ticker, 3-card about intro with marquee, services swipe rail, values 5-part arrangement, client focus selector, 3-step consultation framework, comparison section, insights preview, FAQ accordion, and final CTA.
  * `/services`: Advisory overview and confirmed service mandates.
  * `/services/forex-advisory`: In-depth Forex advisory overview, discussion topics, deliverables, and FAQs.
  * `/services/financial-asset-management`: Comprehensive wealth management and NRI asset allocation.
  * `/approach`: 3-step consultation framework and client preparation guidance.
  * `/about`: Firm origin (established in India in 2020), Middle East focus, and core principles.
  * `/insights` & `/insights/:slug`: Educational research articles on currency risk, liquidity, and central bank policy.
  * `/contact`: Consultation booking form with visible labels, validation, and honest preview mode.
  * `*`: Custom 404 screen.

---

## Documentation & Audits

* `BUILD_STATUS.md`: Full record of implemented stages and verification results.
* `ASSUMPTIONS.md`: Documented business assumptions and strict exclusion of fabricated proof.
* `ASSET_SOURCES.md`: Commercial licensing inventory for images, fonts, and vector logos.
* `LAUNCH_CHECKLIST.md`: Pre-flight checklist for the site owner before production domain connection.

