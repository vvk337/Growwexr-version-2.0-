const fs = require('fs');
const path = require('path');

function getFiles(dir, exts = ['.ts', '.tsx']) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(file, exts));
    } else {
      if (exts.some(ext => file.endsWith(ext))) results.push(file);
    }
  });
  return results;
}

const files = getFiles(path.join(__dirname, '../src'));

// Collect all Link to or a href in tsx
const linkRegex = /(?:to|href)=["']([^"']+)["']/g;
const linksFound = [];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  let match;
  while ((match = linkRegex.exec(content)) !== null) {
    const url = match[1];
    if (url.startsWith('/')) {
      linksFound.push({ file: path.relative(path.join(__dirname, '..'), f), url });
    }
  }
});

console.log('Total internal links found:', linksFound.length);
const uniqueUrls = [...new Set(linksFound.map(l => l.url))];
console.log('Unique internal URLs count:', uniqueUrls.length);
uniqueUrls.sort().forEach(u => console.log('  ', u));

// Also check against defined canonical routes
const KNOWN_ROUTES = [
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
  '/terms-of-service',
  '/privacy-policy'
];

console.log('\n--- Checking for dead/unrecognized internal links ---');
const deadLinks = linksFound.filter(l => !KNOWN_ROUTES.includes(l.url) && !l.url.startsWith('/assets/'));
if (deadLinks.length === 0) {
  console.log('✓ All internal links point to valid known routes!');
} else {
  console.log('✗ Found suspicious/dead links:');
  deadLinks.forEach(d => console.log(`  File: ${d.file} -> ${d.url}`));
}
