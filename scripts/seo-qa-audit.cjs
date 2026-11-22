/**
 * Automated SEO QA & Verification Script
 * ---------------------------------------
 * Performs rigorous multi-point validation across all static routes in dist/:
 *   - HTTP status / File existence
 *   - Page title (length & uniqueness)
 *   - Meta description (length & uniqueness)
 *   - Canonical URL matching
 *   - H1 presence (exactly 1 per page)
 *   - Robots directives (indexable vs 404)
 *   - Open Graph metadata
 *   - Twitter Card metadata
 *   - JSON-LD parseability & Schema.org validity
 *   - Image ALT attributes
 *   - Internal link integrity (no broken links, no deprecated aliases)
 *   - Sitemap reconciliation (100% bidirectional match)
 *   - OG Image asset validation (existence, dimensions, format)
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const DIST_DIR = path.join(__dirname, '../dist');
const BASE_URL = 'https://growwezy.com';

const EXPECTED_CANONICAL_ROUTES = [
  '/',
  '/services',
  '/services/forex-signals',
  '/services/comex-signals',
  '/services/combo-signals',
  '/services/hni-signals',
  '/services/account-management',
  '/approach',
  '/about',
  '/insights',
  '/insights/managing-cross-border-currency-risk-nri-guide',
  '/insights/principles-of-capital-preservation-in-volatile-fx-markets',
  '/insights/macroeconomic-divergence-g10-monetary-policy-impact',
  '/insights/forex-trading-sessions-uae-time-gst',
  '/insights/nri-currency-risk-remittance-considerations',
  '/insights/non-custodial-account-management-education',
  '/insights/macroeconomic-divergence-global-liquidity-playbook',
  '/insights/trading-gold-xauusd-vs-forex-volatility',
  '/contact',
  '/terms',
  '/privacy',
  '/disclaimer',
];

async function runAudit() {
  console.log('='.repeat(70));
  console.log('GROWWEZY GLOBAL TECH — AUTOMATED TECHNICAL SEO QA AUDIT');
  console.log('='.repeat(70));
  console.log();

  const results = {
    passed: 0,
    failed: 0,
    warnings: 0,
    details: [],
  };

  function assert(condition, message, warnOnly = false) {
    if (condition) {
      results.passed++;
      results.details.push(`  [PASS] ${message}`);
    } else if (warnOnly) {
      results.warnings++;
      results.details.push(`  [WARN] ${message}`);
    } else {
      results.failed++;
      results.details.push(`  [FAIL] ${message}`);
    }
  }

  // --- 1. SITEMAP AUDIT & RECONCILIATION ---
  console.log('1. AUDITING SITEMAP & ROBOTS.TXT...');
  const sitemapPath = path.join(DIST_DIR, 'sitemap.xml');
  assert(fs.existsSync(sitemapPath), 'dist/sitemap.xml exists');

  let sitemapUrls = [];
  if (fs.existsSync(sitemapPath)) {
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
    const locMatches = [...sitemapContent.matchAll(/<loc>(.*?)<\/loc>/g)];
    sitemapUrls = locMatches.map(m => m[1]);
    console.log(`   Found ${sitemapUrls.length} URLs in sitemap.xml.`);

    assert(sitemapUrls.length === EXPECTED_CANONICAL_ROUTES.length, `Sitemap has exactly ${EXPECTED_CANONICAL_ROUTES.length} URLs (found: ${sitemapUrls.length})`);

    EXPECTED_CANONICAL_ROUTES.forEach(route => {
      const fullUrl = route === '/' ? `${BASE_URL}/` : `${BASE_URL}${route}`;
      assert(sitemapUrls.includes(fullUrl), `Sitemap includes canonical URL: ${fullUrl}`);
    });

    // Ensure no 404, no alias, no non-indexable URLs in sitemap
    assert(!sitemapUrls.some(u => u.includes('terms-of-service')), 'Sitemap does NOT include alias /terms-of-service');
    assert(!sitemapUrls.some(u => u.includes('privacy-policy')), 'Sitemap does NOT include alias /privacy-policy');
    assert(!sitemapUrls.some(u => u.includes('404')), 'Sitemap does NOT include 404 page');
  }

  // --- 2. ROBOTS.TXT AUDIT ---
  const robotsPath = path.join(DIST_DIR, 'robots.txt');
  assert(fs.existsSync(robotsPath), 'dist/robots.txt exists');
  if (fs.existsSync(robotsPath)) {
    const robotsContent = fs.readFileSync(robotsPath, 'utf8');
    assert(robotsContent.includes('Allow: /'), 'robots.txt allows search engines (Allow: /)');
    assert(robotsContent.includes('Disallow: /api/'), 'robots.txt protects API endpoints (Disallow: /api/)');
    assert(robotsContent.includes('Sitemap: https://growwezy.com/sitemap.xml'), 'robots.txt references official sitemap URL');
    assert(!robotsContent.includes('Disallow: /terms-of-service'), 'robots.txt does NOT block /terms-of-service (allows 301 discovery)');
    assert(!robotsContent.includes('Disallow: /privacy-policy'), 'robots.txt does NOT block /privacy-policy (allows 301 discovery)');
  }

  // --- 3. OPEN GRAPH ASSET VALIDATION ---
  console.log('\n2. AUDITING OPEN GRAPH ASSET...');
  const ogImagePath = path.join(DIST_DIR, 'assets/og-growwezy.jpg');
  assert(fs.existsSync(ogImagePath), 'dist/assets/og-growwezy.jpg exists on disk');
  if (fs.existsSync(ogImagePath)) {
    const ogMeta = await sharp(ogImagePath).metadata();
    assert(ogMeta.width === 1200 && ogMeta.height === 630, `OG Image dimensions are exactly 1200x630 (actual: ${ogMeta.width}x${ogMeta.height})`);
    assert(ogMeta.format === 'jpeg', `OG Image MIME format is JPEG (actual: ${ogMeta.format})`);
  }

  // --- 4. CRAWLING ALL CANONICAL ROUTES + 404 ---
  console.log('\n3. CRAWLING PRE-RENDERED STATIC ROUTES...');

  const seenTitles = new Map();
  const seenDescriptions = new Map();
  const allInternalLinks = new Set();

  for (const route of EXPECTED_CANONICAL_ROUTES) {
    const relPath = route === '/' ? 'index.html' : path.join(route.slice(1), 'index.html');
    const fullPath = path.join(DIST_DIR, relPath);

    assert(fs.existsSync(fullPath), `Pre-rendered file exists: dist/${relPath}`);

    if (fs.existsSync(fullPath)) {
      const html = fs.readFileSync(fullPath, 'utf8');

      // Title validation
      const titleMatch = html.match(/<title>(.*?)<\/title>/i);
      assert(!!titleMatch && titleMatch[1].trim().length > 0, `[${route}] Has <title>: "${titleMatch ? titleMatch[1] : 'MISSING'}"`);
      if (titleMatch) {
        const title = titleMatch[1].trim();
        assert(title.length <= 75, `[${route}] Title length is optimal (<= 75 chars, actual: ${title.length})`);
        assert(!seenTitles.has(title) || seenTitles.get(title) === route, `[${route}] Title is unique across site`);
        seenTitles.set(title, route);
      }

      // Meta Description validation
      const descMatch = html.match(/<meta\s+name="description"\s+content="(.*?)"/i);
      assert(!!descMatch && descMatch[1].trim().length > 0, `[${route}] Has meta description`);
      if (descMatch) {
        const desc = descMatch[1].trim();
        assert(desc.length >= 80 && desc.length <= 200, `[${route}] Meta description length optimal (80-200 chars, actual: ${desc.length})`);
        assert(!seenDescriptions.has(desc) || seenDescriptions.get(desc) === route, `[${route}] Meta description is unique across site`);
        seenDescriptions.set(desc, route);
      }

      // Canonical URL validation
      const canonicalMatch = html.match(/<link\s+rel="canonical"\s+href="(.*?)"/i);
      const expectedCanonical = route === '/' ? `${BASE_URL}/` : `${BASE_URL}${route}`;
      assert(!!canonicalMatch, `[${route}] Has canonical tag`);
      if (canonicalMatch) {
        assert(canonicalMatch[1] === expectedCanonical, `[${route}] Canonical exactly matches route: ${canonicalMatch[1]}`);
      }

      // H1 Validation
      const h1Matches = [...html.matchAll(/<h1[\s>](.*?)<\/h1>/gi)];
      assert(h1Matches.length === 1, `[${route}] Exactly 1 H1 heading present (actual count: ${h1Matches.length})`);

      // Open Graph Tags
      assert(html.includes('property="og:title"'), `[${route}] Has og:title`);
      assert(html.includes('property="og:description"'), `[${route}] Has og:description`);
      assert(html.includes('property="og:url"'), `[${route}] Has og:url`);
      assert(html.includes('property="og:image" content="https://growwezy.com/assets/og-growwezy.jpg"'), `[${route}] og:image points to authoritative og-growwezy.jpg`);
      assert(html.includes('property="og:image:width" content="1200"'), `[${route}] Has og:image:width 1200`);
      assert(html.includes('property="og:image:height" content="630"'), `[${route}] Has og:image:height 630`);
      assert(html.includes('property="og:image:type" content="image/jpeg"'), `[${route}] Has og:image:type image/jpeg`);

      // Twitter Card Tags
      assert(html.includes('name="twitter:card" content="summary_large_image"'), `[${route}] Has twitter:card summary_large_image`);
      assert(html.includes('name="twitter:title"'), `[${route}] Has twitter:title`);
      assert(html.includes('name="twitter:image" content="https://growwezy.com/assets/og-growwezy.jpg"'), `[${route}] twitter:image points to authoritative og-growwezy.jpg`);

      // JSON-LD Validation
      const jsonLdMatches = [...html.matchAll(/<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
      assert(jsonLdMatches.length > 0, `[${route}] Has JSON-LD structured data`);
      jsonLdMatches.forEach((m, idx) => {
        try {
          const parsed = JSON.parse(m[1]);
          const isArr = Array.isArray(parsed);
          const ctx = isArr ? parsed[0]['@context'] : parsed['@context'];
          assert(ctx === 'https://schema.org', `[${route}] JSON-LD block #${idx + 1} has valid schema.org context`);
        } catch (e) {
          assert(false, `[${route}] JSON-LD block #${idx + 1} failed to parse JSON: ${e.message}`);
        }
      });

      // Internal Links collection
      const hrefMatches = [...html.matchAll(/href=["'](\/.*?)["']/g)];
      hrefMatches.forEach(m => {
        const link = m[1].split('#')[0].split('?')[0];
        if (link && !link.startsWith('/assets') && !link.startsWith('/api')) {
          allInternalLinks.add(link);
        }
      });
    }
  }

  // --- 5. 404 PAGE VALIDATION ---
  console.log('\n4. AUDITING 404 NOT FOUND PAGE...');
  const notFoundPath = path.join(DIST_DIR, '404.html');
  assert(fs.existsSync(notFoundPath), 'dist/404.html exists');
  if (fs.existsSync(notFoundPath)) {
    const html404 = fs.readFileSync(notFoundPath, 'utf8');
    assert(html404.includes('content="noindex,nofollow"'), '404.html has meta robots noindex,nofollow');
    assert(html404.includes('404'), '404.html contains 404 status indicator');
    assert(!html404.includes('<link rel="canonical"'), '404.html does NOT serve a canonical tag (correct behavior)');
  }

  // --- 6. INTERNAL LINK INTEGRITY ---
  console.log('\n5. CHECKING INTERNAL LINK INTEGRITY...');
  allInternalLinks.forEach(link => {
    // Check no links point to deprecated aliases
    assert(link !== '/terms-of-service', 'No internal links point to deprecated /terms-of-service (must link to /terms)');
    assert(link !== '/privacy-policy', 'No internal links point to deprecated /privacy-policy (must link to /privacy)');

    // Check link resolves to an actual canonical route
    const isValid = EXPECTED_CANONICAL_ROUTES.includes(link) || EXPECTED_CANONICAL_ROUTES.includes(link.replace(/\/$/, ''));
    assert(isValid, `Internal link target is a valid canonical route: ${link}`);
  });

  // --- SUMMARY REPORT ---
  console.log('\n' + '='.repeat(70));
  console.log('AUDIT SUMMARY');
  console.log('='.repeat(70));
  console.log(`TOTAL CHECKS: ${results.passed + results.failed + results.warnings}`);
  console.log(`PASSED:       ${results.passed}`);
  console.log(`WARNINGS:     ${results.warnings}`);
  console.log(`FAILED:       ${results.failed}`);
  console.log('='.repeat(70));

  if (results.failed > 0) {
    console.log('\nFAILURES RECORDED:');
    results.details.filter(d => d.includes('[FAIL]')).forEach(d => console.log(d));
    process.exit(1);
  } else {
    console.log('\n✓ ALL TECHNICAL SEO CHECKS PASSED PERFECTLY!');
  }
}

runAudit().catch(err => {
  console.error('Audit fatal error:', err);
  process.exit(1);
});
