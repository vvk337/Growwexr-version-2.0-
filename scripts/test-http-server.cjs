/**
 * Test HTTP Server mimicking Vercel Production Environment
 * ---------------------------------------------------------
 * Tests:
 *   - HTTP 200 for all indexable pre-rendered canonical routes
 *   - HTTP 301 for server-side redirects (/terms-of-service, /privacy-policy)
 *   - HTTP 404 for unknown routes (serving dist/404.html)
 *   - HTTP 200 for static assets including /assets/og-growwezy.jpg
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const DIST_DIR = path.join(__dirname, '../dist');
const VERCEL_CONFIG = JSON.parse(fs.readFileSync(path.join(__dirname, '../vercel.json'), 'utf8'));

const server = http.createServer((req, res) => {
  const urlPath = req.url.split('?')[0];

  // 1. Check Vercel redirects
  const matchedRedirect = VERCEL_CONFIG.redirects?.find(r => r.source === urlPath);
  if (matchedRedirect) {
    res.writeHead(matchedRedirect.permanent ? 301 : 302, {
      Location: matchedRedirect.destination,
      'Content-Type': 'text/plain',
    });
    res.end(`Redirecting to ${matchedRedirect.destination}`);
    return;
  }

  // 2. Check Static Files in dist/
  let filePath = path.join(DIST_DIR, urlPath === '/' ? 'index.html' : urlPath);

  // If path is a directory or route without extension, check for /index.html
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  } else if (!fs.existsSync(filePath) && fs.existsSync(filePath + '/index.html')) {
    filePath = filePath + '/index.html';
  } else if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) {
    filePath = filePath + '.html';
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath);
    const mimeTypes = {
      '.html': 'text/html; charset=utf-8',
      '.js': 'application/javascript',
      '.css': 'text/css',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.svg': 'image/svg+xml',
      '.webp': 'image/webp',
      '.xml': 'application/xml',
      '.txt': 'text/plain',
    };

    res.writeHead(200, {
      'Content-Type': mimeTypes[ext] || 'application/octet-stream',
    });
    fs.createReadStream(filePath).pipe(res);
    return;
  }

  // 3. Fallback: 404 Not Found (Serve dist/404.html with actual 404 status code)
  const notFoundPath = path.join(DIST_DIR, '404.html');
  if (fs.existsSync(notFoundPath)) {
    res.writeHead(404, {
      'Content-Type': 'text/html; charset=utf-8',
    });
    fs.createReadStream(notFoundPath).pipe(res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

const PORT = 4188;

server.listen(PORT, async () => {
  console.log(`Test server running at http://localhost:${PORT}`);
  console.log('\nRunning Live HTTP Status & Routing Validation...\n');

  const testCases = [
    { url: '/', expectedStatus: 200, desc: 'Homepage' },
    { url: '/services', expectedStatus: 200, desc: 'Services Index' },
    { url: '/services/forex-signals', expectedStatus: 200, desc: 'Forex Signals Service' },
    { url: '/services/comex-signals', expectedStatus: 200, desc: 'Comex Signals Service' },
    { url: '/services/combo-signals', expectedStatus: 200, desc: 'Combo Signals Service' },
    { url: '/services/hni-signals', expectedStatus: 200, desc: 'HNI Signals Service' },
    { url: '/services/account-management', expectedStatus: 200, desc: 'Account Management Service' },
    { url: '/approach', expectedStatus: 200, desc: 'Our Approach' },
    { url: '/about', expectedStatus: 200, desc: 'About Page' },
    { url: '/insights', expectedStatus: 200, desc: 'Insights Index' },
    { url: '/insights/managing-cross-border-currency-risk-nri-guide', expectedStatus: 200, desc: 'Insight Article 1' },
    { url: '/insights/principles-of-capital-preservation-in-volatile-fx-markets', expectedStatus: 200, desc: 'Insight Article 2' },
    { url: '/insights/macroeconomic-divergence-g10-monetary-policy-impact', expectedStatus: 200, desc: 'Insight Article 3' },
    { url: '/insights/forex-trading-sessions-uae-time-gst', expectedStatus: 200, desc: 'Insight Article 4' },
    { url: '/insights/nri-currency-risk-remittance-considerations', expectedStatus: 200, desc: 'Insight Article 5' },
    { url: '/insights/non-custodial-account-management-education', expectedStatus: 200, desc: 'Insight Article 6' },
    { url: '/insights/macroeconomic-divergence-global-liquidity-playbook', expectedStatus: 200, desc: 'Insight Article 7' },
    { url: '/insights/trading-gold-xauusd-vs-forex-volatility', expectedStatus: 200, desc: 'Insight Article 8' },
    { url: '/contact', expectedStatus: 200, desc: 'Contact Page' },
    { url: '/terms', expectedStatus: 200, desc: 'Terms Canonical' },
    { url: '/privacy', expectedStatus: 200, desc: 'Privacy Canonical' },
    { url: '/disclaimer', expectedStatus: 200, desc: 'Disclaimer Canonical' },
    { url: '/terms-of-service', expectedStatus: 301, expectedLocation: '/terms', desc: 'Alias 301 Redirect to /terms' },
    { url: '/privacy-policy', expectedStatus: 301, expectedLocation: '/privacy', desc: 'Alias 301 Redirect to /privacy' },
    { url: '/assets/og-growwezy.jpg', expectedStatus: 200, desc: 'OG Image Asset' },
    { url: '/sitemap.xml', expectedStatus: 200, desc: 'Sitemap XML' },
    { url: '/robots.txt', expectedStatus: 200, desc: 'Robots TXT' },
    { url: '/non-existent-sample-route', expectedStatus: 404, desc: 'Unknown Route (Actual 404 Not Found)' },
  ];

  let passed = 0;
  let failed = 0;

  for (const tc of testCases) {
    try {
      const res = await fetch(`http://localhost:${PORT}${tc.url}`, { redirect: 'manual' });
      const statusOk = res.status === tc.expectedStatus;
      const locationOk = !tc.expectedLocation || res.headers.get('location') === tc.expectedLocation;

      if (statusOk && locationOk) {
        console.log(`  ✓ [HTTP ${res.status}] ${tc.url} -> ${tc.desc}${tc.expectedLocation ? ` (Redirected to: ${tc.expectedLocation})` : ''}`);
        passed++;
      } else {
        console.error(`  ✗ [FAIL] ${tc.url} -> Expected HTTP ${tc.expectedStatus}, got ${res.status}${tc.expectedLocation ? ` (Expected Location: ${tc.expectedLocation}, got: ${res.headers.get('location')})` : ''}`);
        failed++;
      }
    } catch (e) {
      console.error(`  ✗ [ERROR] ${tc.url}:`, e.message);
      failed++;
    }
  }

  console.log(`\nHTTP Status Test Summary: ${passed} Passed, ${failed} Failed`);
  server.close(() => {
    process.exit(failed > 0 ? 1 : 0);
  });
});
