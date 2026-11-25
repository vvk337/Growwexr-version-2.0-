/**
 * Pre-rendering Script for Growwezy Global Tech
 * ---------------------------------------------
 * Generates static HTML for each canonical indexable route and 404 page.
 * Injects:
 *   - Accurate <title> and <meta name="description">
 *   - Route-specific <link rel="canonical"> (no homepage canonical on subpages)
 *   - Full Open Graph and Twitter Card tags
 *   - Valid JSON-LD structured data in <head>
 *   - Semantic HTML inside <div id="root"> so content is available before JS executes
 *   - Preserves Vite script and style tags for seamless client-side hydration
 */

const fs = require('fs');
const path = require('path');

const DIST_DIR = path.join(__dirname, '../dist');
const TEMPLATE_PATH = path.join(DIST_DIR, 'index.html');

if (!fs.existsSync(TEMPLATE_PATH)) {
  console.error('dist/index.html not found! Run vite build first.');
  process.exit(1);
}

const templateHtml = fs.readFileSync(TEMPLATE_PATH, 'utf8');

const BASE_URL = 'https://growwezy.com';
const SITE_NAME = 'Growwezy Global Tech';
const DEFAULT_OG_IMAGE = `${BASE_URL}/assets/og-growwezy.jpg`;

// Base Organization Schema (verified factual data only)
const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${BASE_URL}/#organization`,
  name: SITE_NAME,
  legalName: 'Growwezy Global Tech Private Limited',
  url: BASE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${BASE_URL}/assets/Growwezy-Global-Tech-HD.svg`,
    width: 160,
    height: 42,
  },
  description:
    'Forex trading advisory and financial asset management services for NRIs and international clients in the Middle East. Established in India in 2019.',
  foundingDate: '2019',
  sameAs: [
    'https://www.instagram.com/teamgrowwezy/',
    'https://www.facebook.com/profile.php?id=61586211570915',
    'https://t.me/growwezyglobaltech',
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'contact@growwezy.com',
      availableLanguage: ['English'],
    },
  ],
  areaServed: ['IN', 'AE', 'SA', 'QA', 'KW', 'BH', 'OM'],
};

// Base WebSite Schema
const webSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${BASE_URL}/#website`,
  url: BASE_URL,
  name: SITE_NAME,
  publisher: { '@id': `${BASE_URL}/#organization` },
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: `${BASE_URL}/insights?q={search_term_string}` },
    'query-input': 'required name=search_term_string',
  },
};

function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((crumb, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: crumb.name,
      item: crumb.item,
    })),
  };
}

function serviceSchema(opts) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    description: opts.description,
    url: opts.url,
    image: `${BASE_URL}${opts.image}`,
    provider: { '@id': `${BASE_URL}/#organization` },
    areaServed: ['IN', 'AE', 'SA', 'QA', 'KW', 'BH', 'OM'],
    serviceType: 'Financial Advisory',
  };
}

function articleSchema(opts) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${opts.url}#article`,
    headline: opts.title,
    description: opts.description,
    image: opts.image,
    url: opts.url,
    author: opts.author && opts.author.name
      ? {
        '@type': 'Person',
        name: opts.author.name,
        ...(opts.author.designation ? { jobTitle: opts.author.designation } : {}),
      }
      : {
        '@type': 'Organization',
        name: SITE_NAME,
        url: BASE_URL,
      },
    publisher: {
      '@id': `${BASE_URL}/#organization`,
    },
    isPartOf: { '@id': `${BASE_URL}/#website` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': opts.url },
  };

  if (opts.datePublished) {
    schema.datePublished = opts.datePublished;
  }
  if (opts.dateModified) {
    schema.dateModified = opts.dateModified;
  }

  return schema;
}

function faqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// 22 Canonical Routes + 404 Definition
const routes = [
  {
    path: '/',
    outPath: 'index.html',
    title: 'Growwezy Global Tech | Forex Advisory & Asset Management',
    description:
      'Growwezy provides forex trading advisory and financial asset management for NRIs and international clients across the UAE and Middle East. Clearer perspective. Informed decisions.',
    canonical: `${BASE_URL}/`,
    ogType: 'website',
    schemas: [
      orgSchema,
      webSiteSchema,
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': `${BASE_URL}/#webpage`,
        url: `${BASE_URL}/`,
        name: 'Growwezy Global Tech – Home',
        description: 'Forex trading advisory and financial asset management for NRIs across the UAE and Middle East.',
        isPartOf: { '@id': `${BASE_URL}/#website` },
      },
    ],
    bodyHtml: `
      <main id="main-content">
        <section aria-label="Hero Overview">
          <h1>A Guided Approach to Your Financial Future</h1>
          <p>Growwezy provides financial consultancy to clients across the UAE and the wider Middle East, offering personalised guidance, trading advisory, and account management to help you navigate global forex markets.</p>
          <div>
            <a href="/contact">Book Consultation</a>
            <a href="/services">Explore Services</a>
          </div>
          <div aria-label="Financial Market Overview">
            <p>Indicative Market Rates • <a href="https://crystalballmarkets.com/markets" rel="noopener">Rates by Crystal Ball Markets</a></p>
          </div>
        </section>
        <section aria-label="About Summary">
          <h2>Three Pillars of Guidance</h2>
          <p>Consultancy, advisory, and account management tailored to cross-border financial participants.</p>
        </section>
        <section aria-label="Services Rail">
          <h2>Our Core Capabilities</h2>
          <ul>
            <li><a href="/services/forex-signals">Forex Signals</a>: Disciplined setups across major and cross pairs.</li>
            <li><a href="/services/comex-signals">Comex Signals</a>: Specialized signals for Gold (XAU/USD) and Silver (XAG/USD).</li>
            <li><a href="/services/combo-signals">Combo Signals</a>: Unified coverage for both forex currencies and precious metals.</li>
            <li><a href="/services/hni-signals">HNI Signals & Dedicated Advisory</a>: Priority routing and 24/7 relationship manager support.</li>
            <li><a href="/services/account-management">Account Management</a>: Trade-only execution on your own regulated broker account.</li>
          </ul>
        </section>
      </main>
    `,
  },
  {
    path: '/services',
    outPath: 'services/index.html',
    title: 'Trading Signals & Account Management Services | Growwezy Global Tech',
    description:
      "Explore Growwezy's forex signals, Comex gold & silver signals, combo plans, and trade-only account management for NRIs and international clients in the UAE and Middle East.",
    canonical: `${BASE_URL}/services`,
    ogType: 'website',
    schemas: [
      breadcrumbSchema([
        { name: 'Home', item: `${BASE_URL}/` },
        { name: 'Services', item: `${BASE_URL}/services` },
      ]),
    ],
    bodyHtml: `
      <main id="main-content">
        <header>
          <span>Advisory Scope &amp; Plans</span>
          <h1>Trading Signals &amp; Account Management</h1>
          <p>Structured foreign exchange signals, precious metals coverage, and trade-only account management for NRIs and international participants.</p>
        </header>
        <section aria-label="Services List">
          <article>
            <h2>Forex Signals</h2>
            <p>Clear, disciplined guidance on potential entries and exits across major and cross currency pairs.</p>
            <a href="/services/forex-signals">Explore Forex Signals</a>
          </article>
          <article>
            <h2>Comex Signals</h2>
            <p>Focused, high-precision trading signals for gold (XAU/USD) and silver (XAG/USD).</p>
            <a href="/services/comex-signals">Explore Comex Signals</a>
          </article>
          <article>
            <h2>Combo Signals</h2>
            <p>Complete market coverage combining all forex currency pairs, gold, and silver in one comprehensive plan.</p>
            <a href="/services/combo-signals">Explore Combo Signals</a>
          </article>
          <article>
            <h2>HNI Signals &amp; Dedicated Advisory</h2>
            <p>Premium tier featuring 24/7 relationship manager support, priority trade setups, and bespoke strategy consultations.</p>
            <a href="/services/hni-signals">Explore HNI Advisory</a>
          </article>
          <article>
            <h2>Account Management</h2>
            <p>Direct trade execution on your own broker account. Your funds stay entirely in your custody with trade-only access.</p>
            <a href="/services/account-management">Explore Account Management</a>
          </article>
        </section>
      </main>
    `,
  },
  {
    path: '/services/forex-signals',
    outPath: 'services/forex-signals/index.html',
    title: 'Forex Signals – Forex Advisory Service | Growwezy Global Tech',
    description:
      'Clear, disciplined guidance on potential entries and exits across major and cross currency pairs. Tailored for NRIs and international clients in the UAE and Middle East by Growwezy Global Tech.',
    canonical: `${BASE_URL}/services/forex-signals`,
    ogType: 'website',
    schemas: [
      serviceSchema({
        name: 'Forex Signals',
        description:
          'Our Forex Signals plan delivers timely, high-probability trade setups across major, minor, and exotic currency pairs. Backed by rigorous technical analysis and structured risk parameters.',
        url: `${BASE_URL}/services/forex-signals`,
        image: '/assets/services/services-forex-signals.webp',
      }),
      breadcrumbSchema([
        { name: 'Home', item: `${BASE_URL}/` },
        { name: 'Services', item: `${BASE_URL}/services` },
        { name: 'Forex Signals', item: `${BASE_URL}/services/forex-signals` },
      ]),
      faqSchema([
        {
          question: 'How are signals delivered?',
          answer: 'Signals are broadcast instantly via dedicated real-time channels with complete entry, stop loss, and target levels.',
        },
        {
          question: 'Do you execute the trades for me on this plan?',
          answer: 'No, on the Forex Signals plan you place and execute trades yourself in your own broker account.',
        },
      ]),
    ],
    bodyHtml: `
      <main id="main-content">
        <header>
          <span>Advisory Mandate</span>
          <h1>Forex Signals</h1>
          <p>Clear, disciplined guidance on potential entries and exits across major and cross currency pairs.</p>
        </header>
        <section>
          <h2>Advisory Overview</h2>
          <p>Our Forex Signals plan delivers timely, high-probability trade setups across major, minor, and exotic currency pairs.</p>
          <a href="/contact">Book Consultation</a>
        </section>
      </main>
    `,
  },
  {
    path: '/services/comex-signals',
    outPath: 'services/comex-signals/index.html',
    title: 'Comex Signals – Forex Advisory Service | Growwezy Global Tech',
    description:
      'Focused, high-precision trading signals for gold (XAU/USD) and silver (XAG/USD). Tailored for NRIs and international clients in the UAE and Middle East by Growwezy Global Tech.',
    canonical: `${BASE_URL}/services/comex-signals`,
    ogType: 'website',
    schemas: [
      serviceSchema({
        name: 'Comex Signals',
        description: 'Specialized coverage for precious metals markets focused on XAU/USD and XAG/USD with structured risk parameters.',
        url: `${BASE_URL}/services/comex-signals`,
        image: '/assets/services/services-comex-signals.webp',
      }),
      breadcrumbSchema([
        { name: 'Home', item: `${BASE_URL}/` },
        { name: 'Services', item: `${BASE_URL}/services` },
        { name: 'Comex Signals', item: `${BASE_URL}/services/comex-signals` },
      ]),
      faqSchema([
        {
          question: 'Which precious metals are included in this plan?',
          answer: 'The plan covers Spot Gold (XAU/USD) and Spot Silver (XAG/USD), as well as Comex futures equivalents.',
        },
        {
          question: 'What is the typical risk-to-reward ratio for Comex setups?',
          answer: 'Our setups target a minimum 1:2 risk-to-reward ratio, often extending to 1:3 or higher with trailing stops.',
        },
      ]),
    ],
    bodyHtml: `
      <main id="main-content">
        <header>
          <span>Advisory Mandate</span>
          <h1>Comex Signals</h1>
          <p>Focused, high-precision trading signals for gold (XAU/USD) and silver (XAG/USD).</p>
        </header>
        <section>
          <h2>Advisory Overview</h2>
          <p>Specialized coverage for precious metals markets. Engineered for both intraday momentum and swing opportunities.</p>
          <a href="/contact">Book Consultation</a>
        </section>
      </main>
    `,
  },
  {
    path: '/services/combo-signals',
    outPath: 'services/combo-signals/index.html',
    title: 'Combo Signals – Forex Advisory Service | Growwezy Global Tech',
    description:
      'Complete market coverage combining all forex currency pairs, gold, and silver in one comprehensive plan. Tailored for NRIs and international clients in the UAE and Middle East by Growwezy Global Tech.',
    canonical: `${BASE_URL}/services/combo-signals`,
    ogType: 'website',
    schemas: [
      serviceSchema({
        name: 'Combo Signals',
        description: 'Complete market coverage combining all forex currency pairs, gold, and silver in one comprehensive plan.',
        url: `${BASE_URL}/services/combo-signals`,
        image: '/assets/services/services-combo-signals.webp',
      }),
      breadcrumbSchema([
        { name: 'Home', item: `${BASE_URL}/` },
        { name: 'Services', item: `${BASE_URL}/services` },
        { name: 'Combo Signals', item: `${BASE_URL}/services/combo-signals` },
      ]),
      faqSchema([
        {
          question: 'Can I switch between Forex and Comex signals?',
          answer: 'With the Combo plan, you receive all signals simultaneously without needing to choose between currencies and metals.',
        },
      ]),
    ],
    bodyHtml: `
      <main id="main-content">
        <header>
          <span>Advisory Mandate</span>
          <h1>Combo Signals</h1>
          <p>Complete market coverage combining all forex currency pairs, gold, and silver in one comprehensive plan.</p>
        </header>
        <section>
          <h2>Advisory Overview</h2>
          <p>The Combo Signals plan unifies our full market intelligence across global trading sessions.</p>
          <a href="/contact">Book Consultation</a>
        </section>
      </main>
    `,
  },
  {
    path: '/services/hni-signals',
    outPath: 'services/hni-signals/index.html',
    title: 'HNI Forex Signals & Advisory | Growwezy Global Tech',
    description:
      'Premium tier with 24/7 relationship manager support, priority trade setups, and bespoke strategy consultations for NRIs and Middle East investors.',
    canonical: `${BASE_URL}/services/hni-signals`,
    ogType: 'website',
    schemas: [
      serviceSchema({
        name: 'HNI Signals & Dedicated Advisory',
        description: 'Premium tier featuring 24/7 relationship manager support, priority trade setups, and bespoke strategy consultations.',
        url: `${BASE_URL}/services/hni-signals`,
        image: '/assets/services/services-hni-signals.webp',
      }),
      breadcrumbSchema([
        { name: 'Home', item: `${BASE_URL}/` },
        { name: 'Services', item: `${BASE_URL}/services` },
        { name: 'HNI Signals', item: `${BASE_URL}/services/hni-signals` },
      ]),
    ],
    bodyHtml: `
      <main id="main-content">
        <header>
          <span>Advisory Mandate</span>
          <h1>HNI Signals &amp; Dedicated Advisory</h1>
          <p>Premium tier featuring 24/7 relationship manager support, priority trade setups, and bespoke strategy consultations.</p>
        </header>
        <section>
          <h2>Advisory Overview</h2>
          <p>Engineered for high-volume participants and family offices. Gain direct access to a dedicated relationship manager available 24/7.</p>
          <a href="/contact">Book Consultation</a>
        </section>
      </main>
    `,
  },
  {
    path: '/services/account-management',
    outPath: 'services/account-management/index.html',
    title: 'Account Management – Forex Advisory | Growwezy Global Tech',
    description:
      'Direct trade execution on your own broker account. Your funds stay entirely in your custody with trade-only access for NRIs and Middle East clients.',
    canonical: `${BASE_URL}/services/account-management`,
    ogType: 'website',
    schemas: [
      serviceSchema({
        name: 'Account Management',
        description: 'Direct trade execution on your own broker account. Funds stay 100% in your custody with trade-only access.',
        url: `${BASE_URL}/services/account-management`,
        image: '/assets/about-consultation-advisory.webp',
      }),
      breadcrumbSchema([
        { name: 'Home', item: `${BASE_URL}/` },
        { name: 'Services', item: `${BASE_URL}/services` },
        { name: 'Account Management', item: `${BASE_URL}/services/account-management` },
      ]),
      faqSchema([
        {
          question: 'Do I ever transfer my money to Growwezy?',
          answer: 'No. Never. Your trading capital stays in your own broker account in your own name. We only receive trade-execution access and have zero access to withdraw or transfer funds.',
        },
      ]),
    ],
    bodyHtml: `
      <main id="main-content">
        <header>
          <span>Advisory Mandate</span>
          <h1>Account Management</h1>
          <p>Direct trade execution on your own broker account. Your funds stay entirely in your custody with trade-only access.</p>
        </header>
        <section>
          <h2>Advisory Overview</h2>
          <p>For clients who prefer hands-off execution, our experienced trading team places trades directly on your behalf while capital remains in your custody.</p>
          <a href="/contact">Book Consultation</a>
        </section>
      </main>
    `,
  },
  {
    path: '/approach',
    outPath: 'approach/index.html',
    title: 'Our Approach – How Growwezy Works With You | Growwezy Global Tech',
    description:
      'From your first consultation to ongoing market updates, see exactly how Growwezy matches you with an analyst team, delivers trading signals, and manages your account.',
    canonical: `${BASE_URL}/approach`,
    ogType: 'website',
    schemas: [
      breadcrumbSchema([
        { name: 'Home', item: `${BASE_URL}/` },
        { name: 'Our Approach', item: `${BASE_URL}/approach` },
      ]),
    ],
    bodyHtml: `
      <main id="main-content">
        <header>
          <span>THE CLIENT JOURNEY</span>
          <h1>Our Approach</h1>
          <p>From the first consultation to ongoing updates, see how we match you with an analyst team and how your chosen service works.</p>
        </header>
        <section>
          <h2>How We Work With You</h2>
          <ol>
            <li><strong>Start With a Consultation</strong>: Aligning on active markets, risk tolerance, and service selection.</li>
            <li><strong>Meet Your Analyst Team</strong>: Structured analyst groups with dedicated relationship managers.</li>
            <li><strong>See How Your Service Works</strong>: Clear operating models for trading signals or account management.</li>
            <li><strong>Stay Informed</strong>: Continuous reporting, debriefs, and direct communication.</li>
          </ol>
          <a href="/contact">Book a Consultation</a>
        </section>
      </main>
    `,
  },
  {
    path: '/about',
    outPath: 'about/index.html',
    title: 'About Growwezy – Forex Advisory Since 2019 | Growwezy Global Tech',
    description:
      'Established in India in 2019, Growwezy Global Tech serves 2,800+ retail clients with specialized forex trading advisory and financial asset management across the UAE and Middle East.',
    canonical: `${BASE_URL}/about`,
    ogType: 'website',
    schemas: [
      breadcrumbSchema([
        { name: 'Home', item: `${BASE_URL}/` },
        { name: 'About', item: `${BASE_URL}/about` },
      ]),
    ],
    bodyHtml: `
      <main id="main-content">
        <header>
          <span>About Growwezy</span>
          <h1>Disciplined Advisory for Global Participants</h1>
          <p>Established in India in 2019, Growwezy Global Tech provides specialized forex trading advisory and financial asset management for NRIs and international clients across the Middle East.</p>
        </header>
        <section>
          <h2>Rooted in India. Connected to Global Markets.</h2>
          <p>Serving over 2,800 retail clients alongside corporate investors with presence across India and the Middle East.</p>
          <a href="/contact">Book Consultation</a>
        </section>
      </main>
    `,
  },
  {
    path: '/insights',
    outPath: 'insights/index.html',
    title: 'Forex Market Insights & Research – Growwezy | Growwezy Global Tech',
    description:
      'Educational perspectives on sovereign macroeconomic divergence, foreign exchange volatility, cross-border currency risk management, and capital preservation for NRI investors.',
    canonical: `${BASE_URL}/insights`,
    ogType: 'website',
    schemas: [
      breadcrumbSchema([
        { name: 'Home', item: `${BASE_URL}/` },
        { name: 'Insights', item: `${BASE_URL}/insights` },
      ]),
    ],
    bodyHtml: `
      <main id="main-content">
        <header>
          <span>Research &amp; Intelligence</span>
          <h1>Market Insights</h1>
          <p>Educational perspectives on sovereign macroeconomic divergence, foreign exchange volatility, and cross-border currency risk management.</p>
        </header>
        <section>
          <h2>Educational Articles</h2>
          <ul>
            <li><a href="/insights/managing-cross-border-currency-risk-nri-guide">Managing Cross-Border Currency Risk: A Strategic Framework for Middle East NRIs</a></li>
            <li><a href="/insights/principles-of-capital-preservation-in-volatile-fx-markets">Principles of Capital Preservation in Volatile Global Currency Markets</a></li>
            <li><a href="/insights/macroeconomic-divergence-g10-monetary-policy-impact">Macroeconomic Divergence: How Central Bank Policies Shape Global Liquidity</a></li>
            <li><a href="/insights/forex-trading-sessions-uae-time-gst">Forex Trading Sessions &amp; Market Hours in UAE Time (GST): When Liquidity and Volatility Peak</a></li>
            <li><a href="/insights/nri-currency-risk-remittance-considerations">FEMA Guidelines &amp; Offshore Forex Trading for NRIs: Compliance and Remittance Considerations</a></li>
            <li><a href="/insights/non-custodial-account-management-education">The Non-Custodial Advantage: How Trade-Only Investor Access Protects Your Capital</a></li>
            <li><a href="/insights/macroeconomic-divergence-global-liquidity-playbook">The Global Macro Playbook: Navigating Central Bank Liquidity Shifts and Forex Trends</a></li>
            <li><a href="/insights/trading-gold-xauusd-vs-forex-volatility">Trading Gold (XAU/USD) vs. Major Forex Pairs: Volatility, Leverage, and Strategy Differences</a></li>
          </ul>
        </section>
      </main>
    `,
  },
  {
    path: '/insights/managing-cross-border-currency-risk-nri-guide',
    outPath: 'insights/managing-cross-border-currency-risk-nri-guide/index.html',
    title: 'Cross-Border Currency Risk for Middle East NRIs | Growwezy Global Tech',
    description:
      'Understanding how exchange rate fluctuations between USD-pegged Middle Eastern currencies and the Indian Rupee impact long-term capital repatriation and asset purchasing power.',
    canonical: `${BASE_URL}/insights/managing-cross-border-currency-risk-nri-guide`,
    ogType: 'article',
    schemas: [
      articleSchema({
        url: `${BASE_URL}/insights/managing-cross-border-currency-risk-nri-guide`,
        title: 'Managing Cross-Border Currency Risk: A Strategic Framework for Middle East NRIs',
        description: 'Understanding how exchange rate fluctuations between USD-pegged Middle Eastern currencies and the Indian Rupee impact capital repatriation.',
        image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80&fm=webp',
      }),
      breadcrumbSchema([
        { name: 'Home', item: `${BASE_URL}/` },
        { name: 'Insights', item: `${BASE_URL}/insights` },
        { name: 'Managing Cross-Border Currency Risk', item: `${BASE_URL}/insights/managing-cross-border-currency-risk-nri-guide` },
      ]),
    ],
    bodyHtml: `
      <main id="main-content">
        <article>
          <header>
            <span>Currency Risk</span>
            <h1>Managing Cross-Border Currency Risk: A Strategic Framework for Middle East NRIs</h1>
            <p>Understanding how exchange rate fluctuations between USD-pegged Middle Eastern currencies and the Indian Rupee impact long-term capital repatriation.</p>
          </header>
          <section>
            <p>For non-resident Indians living in the United Arab Emirates and broader GCC nations, managing capital across jurisdictions introduces a unique dynamic: earnings are denominated in USD-pegged currencies, while long-term liabilities often reside in INR.</p>
          </section>
        </article>
      </main>
    `,
  },
  {
    path: '/insights/principles-of-capital-preservation-in-volatile-fx-markets',
    outPath: 'insights/principles-of-capital-preservation-in-volatile-fx-markets/index.html',
    title: 'Capital Preservation in Volatile FX Markets | Growwezy Global Tech',
    description:
      'Why drawdown mitigation, position sizing, and correlation awareness matter significantly more than maximizing high-frequency trade frequency.',
    canonical: `${BASE_URL}/insights/principles-of-capital-preservation-in-volatile-fx-markets`,
    ogType: 'article',
    schemas: [
      articleSchema({
        url: `${BASE_URL}/insights/principles-of-capital-preservation-in-volatile-fx-markets`,
        title: 'Principles of Capital Preservation in Volatile Global Currency Markets',
        description: 'Why drawdown mitigation, position sizing, and correlation awareness matter significantly more than trade frequency.',
        image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80&fm=webp',
      }),
      breadcrumbSchema([
        { name: 'Home', item: `${BASE_URL}/` },
        { name: 'Insights', item: `${BASE_URL}/insights` },
        { name: 'Principles of Capital Preservation', item: `${BASE_URL}/insights/principles-of-capital-preservation-in-volatile-fx-markets` },
      ]),
    ],
    bodyHtml: `
      <main id="main-content">
        <article>
          <header>
            <span>Risk Management</span>
            <h1>Principles of Capital Preservation in Volatile Global Currency Markets</h1>
            <p>Why drawdown mitigation, position sizing, and correlation awareness matter significantly more than maximizing high-frequency trade frequency.</p>
          </header>
          <section>
            <p>In foreign exchange trading, the mathematical reality of drawdowns is unforgiving: professional market participants prioritize asymmetric risk profiles.</p>
          </section>
        </article>
      </main>
    `,
  },
  {
    path: '/insights/macroeconomic-divergence-g10-monetary-policy-impact',
    outPath: 'insights/macroeconomic-divergence-g10-monetary-policy-impact/index.html',
    title: 'Macroeconomic Divergence & Global Liquidity | Growwezy Global Tech',
    description:
      'An analysis of how conflicting interest rate trajectories across the US Federal Reserve, ECB, and Asian central banks influence currency trends.',
    canonical: `${BASE_URL}/insights/macroeconomic-divergence-g10-monetary-policy-impact`,
    ogType: 'article',
    schemas: [
      articleSchema({
        url: `${BASE_URL}/insights/macroeconomic-divergence-g10-monetary-policy-impact`,
        title: 'Macroeconomic Divergence: How Central Bank Policies Shape Global Liquidity',
        description: 'An analysis of how conflicting interest rate trajectories across central banks influence currency trends.',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80&fm=webp',
      }),
      breadcrumbSchema([
        { name: 'Home', item: `${BASE_URL}/` },
        { name: 'Insights', item: `${BASE_URL}/insights` },
        { name: 'Macroeconomic Divergence', item: `${BASE_URL}/insights/macroeconomic-divergence-g10-monetary-policy-impact` },
      ]),
    ],
    bodyHtml: `
      <main id="main-content">
        <article>
          <header>
            <span>Macroeconomics</span>
            <h1>Macroeconomic Divergence: How Central Bank Policies Shape Global Liquidity</h1>
            <p>An analysis of how conflicting interest rate trajectories across the US Federal Reserve, ECB, and Asian central banks influence currency trends.</p>
          </header>
          <section>
            <p>Central bank policy divergence remains one of the primary drivers of sustained foreign exchange momentum.</p>
          </section>
        </article>
      </main>
    `,
  },
  {
    path: '/insights/forex-trading-sessions-uae-time-gst',
    outPath: 'insights/forex-trading-sessions-uae-time-gst/index.html',
    title: 'Forex Trading Sessions in UAE Time (GST) | Growwezy Global Tech',
    description:
      'A practical guide to global forex trading sessions converted to Gulf Standard Time (GST). Learn when London and New York overlaps create peak liquidity in Dubai.',
    canonical: `${BASE_URL}/insights/forex-trading-sessions-uae-time-gst`,
    ogType: 'article',
    schemas: [
      articleSchema({
        url: `${BASE_URL}/insights/forex-trading-sessions-uae-time-gst`,
        title: 'Forex Trading Sessions & Market Hours in UAE Time (GST): When Liquidity and Volatility Peak',
        description: 'A practical guide to global forex trading sessions converted to Gulf Standard Time (GST). Learn when London and New York overlaps create peak liquidity in Dubai.',
        image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80&fm=webp',
      }),
      breadcrumbSchema([
        { name: 'Home', item: `${BASE_URL}/` },
        { name: 'Insights', item: `${BASE_URL}/insights` },
        { name: 'Forex Trading Sessions UAE (GST)', item: `${BASE_URL}/insights/forex-trading-sessions-uae-time-gst` },
      ]),
    ],
    bodyHtml: `
      <main id="main-content">
        <article>
          <header>
            <span>Trading Sessions</span>
            <h1>Forex Trading Sessions &amp; Market Hours in UAE Time (GST): When Liquidity and Volatility Peak</h1>
            <p>A practical guide to global forex trading sessions converted to Gulf Standard Time (GST). Learn when London and New York overlaps create peak liquidity in Dubai.</p>
          </header>
          <section>
            <p>The international foreign exchange market operates continuously 24 hours a day, five days a week across decentralized interbank networks. For active retail traders and expatriates living in Dubai, Abu Dhabi, and across the Gulf Cooperation Council (GCC), Gulf Standard Time (GST / UTC+4) provides one of the most advantageous vantage points in global finance.</p>
            <p>The single most important window occurs between 16:30 and 20:00 GST during the London and New York session overlap, accounting for over 50% of daily currency turnover.</p>
            <a href="/services/forex-signals">Explore Forex Signals</a>
          </section>
        </article>
      </main>
    `,
  },
  {
    path: '/insights/nri-currency-risk-remittance-considerations',
    outPath: 'insights/nri-currency-risk-remittance-considerations/index.html',
    title: 'FEMA Rules for NRI Forex Trading & Currency Remittances | Growwezy',
    description:
      'A compliance-focused analysis of FEMA regulations for Non-Resident Indians engaging in offshore forex trading and cross-border currency remittances from the UAE and GCC.',
    canonical: `${BASE_URL}/insights/nri-currency-risk-remittance-considerations`,
    ogType: 'article',
    schemas: [
      articleSchema({
        url: `${BASE_URL}/insights/nri-currency-risk-remittance-considerations`,
        title: 'FEMA Guidelines & Offshore Forex Trading for NRIs: Compliance and Remittance Considerations',
        description: 'A compliance-focused analysis of FEMA regulations for Non-Resident Indians engaging in offshore forex trading and cross-border currency remittances from the UAE and GCC.',
        image: 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&w=800&q=80&fm=webp',
      }),
      breadcrumbSchema([
        { name: 'Home', item: `${BASE_URL}/` },
        { name: 'Insights', item: `${BASE_URL}/insights` },
        { name: 'NRI FEMA & Forex Remittances', item: `${BASE_URL}/insights/nri-currency-risk-remittance-considerations` },
      ]),
    ],
    bodyHtml: `
      <main id="main-content">
        <article>
          <header>
            <span>NRI Banking &amp; FEMA</span>
            <h1>FEMA Guidelines &amp; Offshore Forex Trading for NRIs: Compliance and Remittance Considerations</h1>
            <p>A compliance-focused analysis of FEMA regulations for Non-Resident Indians engaging in offshore forex trading and cross-border currency remittances from the UAE and GCC.</p>
          </header>
          <section>
            <p>For Non-Resident Indians living in the UAE, Saudi Arabia, and across the GCC, international currency trading and capital repatriation involve navigating local Gulf frameworks and India's Foreign Exchange Management Act (FEMA).</p>
            <p>When trading using income earned abroad deposited in foreign bank accounts, domestic FEMA restrictions on offshore trading do not apply to verified NRIs.</p>
            <a href="/services/account-management">Explore Account Management</a>
          </section>
        </article>
      </main>
    `,
  },
  {
    path: '/insights/non-custodial-account-management-education',
    outPath: 'insights/non-custodial-account-management-education/index.html',
    title: 'Non-Custodial Managed Forex Accounts – Capital Protection | Growwezy',
    description:
      'Understand the critical distinction between custodial deposit-taking schemes and safe, non-custodial trade-only account management for forex and commodities investors.',
    canonical: `${BASE_URL}/insights/non-custodial-account-management-education`,
    ogType: 'article',
    schemas: [
      articleSchema({
        url: `${BASE_URL}/insights/non-custodial-account-management-education`,
        title: 'The Non-Custodial Advantage: How Trade-Only Investor Access Protects Your Capital',
        description: 'Understand the critical distinction between custodial deposit-taking schemes and safe, non-custodial trade-only account management for forex and commodities investors.',
        image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80&fm=webp',
      }),
      breadcrumbSchema([
        { name: 'Home', item: `${BASE_URL}/` },
        { name: 'Insights', item: `${BASE_URL}/insights` },
        { name: 'Non-Custodial Account Management', item: `${BASE_URL}/insights/non-custodial-account-management-education` },
      ]),
    ],
    bodyHtml: `
      <main id="main-content">
        <article>
          <header>
            <span>Account Security</span>
            <h1>The Non-Custodial Advantage: How Trade-Only Investor Access Protects Your Capital</h1>
            <p>Understand the critical distinction between custodial deposit-taking schemes and safe, non-custodial trade-only account management for forex and commodities investors.</p>
          </header>
          <section>
            <p>Understanding the technical and legal distinction between custodial deposit-taking schemes and genuine non-custodial execution is the most important security lesson in financial market management.</p>
            <p>In a non-custodial architecture, client funds remain 100% in their own regulated broker account with trade-only execution access, making unauthorized withdrawals technically impossible.</p>
            <a href="/services/account-management">Learn About Account Management</a>
          </section>
        </article>
      </main>
    `,
  },
  {
    path: '/insights/macroeconomic-divergence-global-liquidity-playbook',
    outPath: 'insights/macroeconomic-divergence-global-liquidity-playbook/index.html',
    title: 'Central Bank Liquidity Shifts & Forex Strategy Playbook | Growwezy',
    description:
      'An actionable institutional trading playbook for analyzing Federal Reserve, ECB, and BOJ interest rate decisions, bond yield curves, and liquidity cycles.',
    canonical: `${BASE_URL}/insights/macroeconomic-divergence-global-liquidity-playbook`,
    ogType: 'article',
    schemas: [
      articleSchema({
        url: `${BASE_URL}/insights/macroeconomic-divergence-global-liquidity-playbook`,
        title: 'The Global Macro Playbook: Navigating Central Bank Liquidity Shifts and Forex Trends',
        description: 'An actionable institutional trading playbook for analyzing Federal Reserve, ECB, and BOJ interest rate decisions, bond yield curves, and liquidity cycles.',
        image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80&fm=webp',
      }),
      breadcrumbSchema([
        { name: 'Home', item: `${BASE_URL}/` },
        { name: 'Insights', item: `${BASE_URL}/insights` },
        { name: 'Global Macro Playbook', item: `${BASE_URL}/insights/macroeconomic-divergence-global-liquidity-playbook` },
      ]),
    ],
    bodyHtml: `
      <main id="main-content">
        <article>
          <header>
            <span>Central Banking</span>
            <h1>The Global Macro Playbook: Navigating Central Bank Liquidity Shifts and Forex Trends</h1>
            <p>An actionable institutional trading playbook for analyzing Federal Reserve, ECB, and BOJ interest rate decisions, bond yield curves, and liquidity cycles.</p>
          </header>
          <section>
            <p>In professional macroeconomic trading, market movements are viewed through the lens of institutional liquidity cycles. When central banks adjust interest rates or liquidity facilities, their decisions set the prevailing directional trend for major currencies and commodities.</p>
            <p>A disciplined trading desk structures its operational posture across a 3-stage event lifecycle: Pre-Meeting Build-Up, Headline Release, and Press Conference Directional Trend.</p>
            <a href="/services/hni-signals">Explore HNI Dedicated Advisory</a>
          </section>
        </article>
      </main>
    `,
  },
  {
    path: '/insights/trading-gold-xauusd-vs-forex-volatility',
    outPath: 'insights/trading-gold-xauusd-vs-forex-volatility/index.html',
    title: 'Gold Trading (XAU/USD) vs Forex Volatility & Risk Guide | Growwezy',
    description:
      'Compare Spot Gold (XAU/USD) and major forex currency trading. Learn pip value calculations, margin requirements, volatility dynamics, and risk controls in Dubai.',
    canonical: `${BASE_URL}/insights/trading-gold-xauusd-vs-forex-volatility`,
    ogType: 'article',
    schemas: [
      articleSchema({
        url: `${BASE_URL}/insights/trading-gold-xauusd-vs-forex-volatility`,
        title: 'Trading Gold (XAU/USD) vs. Major Forex Pairs: Volatility, Leverage, and Strategy Differences',
        description: 'Compare Spot Gold (XAU/USD) and major forex currency trading. Learn pip value calculations, margin requirements, volatility dynamics, and risk controls in Dubai.',
        image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=800&q=80&fm=webp',
      }),
      breadcrumbSchema([
        { name: 'Home', item: `${BASE_URL}/` },
        { name: 'Insights', item: `${BASE_URL}/insights` },
        { name: 'Gold vs Forex Volatility', item: `${BASE_URL}/insights/trading-gold-xauusd-vs-forex-volatility` },
      ]),
    ],
    bodyHtml: `
      <main id="main-content">
        <article>
          <header>
            <span>Precious Metals</span>
            <h1>Trading Gold (XAU/USD) vs. Major Forex Pairs: Volatility, Leverage, and Strategy Differences</h1>
            <p>Compare Spot Gold (XAU/USD) and major forex currency trading. Learn pip value calculations, margin requirements, volatility dynamics, and risk controls in Dubai.</p>
          </header>
          <section>
            <p>In the Middle East—and particularly across the UAE, where Dubai has earned global recognition as the City of Gold—trading precious metals holds immense cultural and financial significance.</p>
            <p>Spot Gold (XAU/USD) exhibits 3x to 4x the daily price velocity of major currencies like EUR/USD, requiring tailored position sizing to maintain rigorous capital preservation.</p>
            <a href="/services/comex-signals">Explore Comex Signals</a>
          </section>
        </article>
      </main>
    `,
  },
  {
    path: '/contact',
    outPath: 'contact/index.html',
    title: 'Book a Forex Consultation – Contact Growwezy | Growwezy Global Tech',
    description:
      "Schedule a confidential consultation with Growwezy's advisory team to review your forex risk parameters, trading goals, and cross-border financial objectives.",
    canonical: `${BASE_URL}/contact`,
    ogType: 'website',
    schemas: [
      breadcrumbSchema([
        { name: 'Home', item: `${BASE_URL}/` },
        { name: 'Contact', item: `${BASE_URL}/contact` },
      ]),
    ],
    bodyHtml: `
      <main id="main-content">
        <header>
          <span>Direct Dialogue</span>
          <h1>Contact &amp; Consultation Booking</h1>
          <p>Schedule a confidential consultation to review your foreign exchange risk parameters and cross-border financial objectives.</p>
        </header>
        <section>
          <h2>Schedule Consultation</h2>
          <p>Connect with our advisory desk via email or schedule your introductory consultation.</p>
        </section>
      </main>
    `,
  },
  {
    path: '/terms',
    outPath: 'terms/index.html',
    title: 'Terms of Service – Growwezy Global Tech | Growwezy Global Tech',
    description: 'Read the Terms of Service governing access to and use of Growwezy Global Tech advisory services.',
    canonical: `${BASE_URL}/terms`,
    ogType: 'website',
    robots: 'index,follow,noarchive',
    schemas: [
      breadcrumbSchema([
        { name: 'Home', item: `${BASE_URL}/` },
        { name: 'Terms of Service', item: `${BASE_URL}/terms` },
      ]),
    ],
    bodyHtml: `
      <main id="main-content">
        <header>
          <span>Legal</span>
          <h1>Terms of Services</h1>
          <p>Please read these terms carefully before accessing or using Growwezy services.</p>
        </header>
        <section>
          <h2>1. Our Services</h2>
          <p>Growwezy provides analytical research and advisory software.</p>
        </section>
      </main>
    `,
  },
  {
    path: '/privacy',
    outPath: 'privacy/index.html',
    title: 'Privacy Policy – Growwezy Global Tech | Growwezy Global Tech',
    description: "Read Growwezy Global Tech's Privacy Policy to understand how we collect, use, and protect your personal information.",
    canonical: `${BASE_URL}/privacy`,
    ogType: 'website',
    robots: 'index,follow,noarchive',
    schemas: [
      breadcrumbSchema([
        { name: 'Home', item: `${BASE_URL}/` },
        { name: 'Privacy Policy', item: `${BASE_URL}/privacy` },
      ]),
    ],
    bodyHtml: `
      <main id="main-content">
        <header>
          <span>Legal</span>
          <h1>Privacy Policy</h1>
          <p>This Privacy Policy explains how we collect, use, disclose, store, and protect your information.</p>
        </header>
      </main>
    `,
  },
  {
    path: '/disclaimer',
    outPath: 'disclaimer/index.html',
    title: 'Risk & Investment Disclaimer – Growwezy Global Tech | Growwezy Global Tech',
    description:
      'Important risk disclosure: Growwezy Global Tech provides research and advisory services only. All trading and investment decisions are made independently by clients.',
    canonical: `${BASE_URL}/disclaimer`,
    ogType: 'website',
    robots: 'index,follow,noarchive',
    schemas: [
      breadcrumbSchema([
        { name: 'Home', item: `${BASE_URL}/` },
        { name: 'Disclaimer', item: `${BASE_URL}/disclaimer` },
      ]),
    ],
    bodyHtml: `
      <main id="main-content">
        <header>
          <span>Legal</span>
          <h1>Disclaimer</h1>
          <p>Please read this disclaimer carefully before using our trading signals or advisory services.</p>
        </header>
      </main>
    `,
  },
  {
    path: '/404',
    outPath: '404.html',
    title: '404 – Page Not Found | Growwezy Global Tech',
    description: 'The page you are looking for does not exist on Growwezy Global Tech. Return to the homepage or contact our advisory desk.',
    canonical: '',
    ogType: 'website',
    robots: 'noindex,nofollow',
    schemas: [],
    bodyHtml: `
      <main id="main-content">
        <div>
          <span>404 — Page Not Found</span>
          <h1>Perspective Unclear</h1>
          <p>The page you are looking for does not exist or has been relocated within our advisory architecture.</p>
          <div>
            <a href="/">Return to Homepage</a>
            <a href="/contact">Contact Advisory Desk</a>
          </div>
        </div>
      </main>
    `,
  },
];

function buildRouteHtml(route) {
  let html = templateHtml;

  // 1. Replace <title>
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${route.title}</title>`);

  // 2. Replace <meta name="description" ...>
  html = html.replace(/<meta\s+name="description"[\s\S]*?>/i, `<meta name="description" content="${route.description.replace(/"/g, '&quot;')}" />`);

  // 3. Replace/Set robots
  const robotsDirective = route.robots || 'index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1';
  html = html.replace(/<meta\s+name="robots"[\s\S]*?>/i, `<meta name="robots" content="${robotsDirective}" />`);

  // 4. Set Open Graph tags
  html = html.replace(/<meta\s+property="og:title"[\s\S]*?>/i, `<meta property="og:title" content="${route.title.replace(/"/g, '&quot;')}" />`);
  html = html.replace(/<meta\s+property="og:description"[\s\S]*?>/i, `<meta property="og:description" content="${route.description.replace(/"/g, '&quot;')}" />`);
  html = html.replace(/<meta\s+property="og:type"[\s\S]*?>/i, `<meta property="og:type" content="${route.ogType || 'website'}" />`);
  html = html.replace(/<meta\s+property="og:url"[\s\S]*?>/i, `<meta property="og:url" content="${route.canonical || BASE_URL}" />`);
  html = html.replace(/<meta\s+property="og:image"[\s\S]*?>/i, `<meta property="og:image" content="${DEFAULT_OG_IMAGE}" />`);
  html = html.replace(/<meta\s+property="og:image:secure_url"[\s\S]*?>/i, `<meta property="og:image:secure_url" content="${DEFAULT_OG_IMAGE}" />`);
  html = html.replace(/<meta\s+property="og:image:width"[\s\S]*?>/i, `<meta property="og:image:width" content="1200" />`);
  html = html.replace(/<meta\s+property="og:image:height"[\s\S]*?>/i, `<meta property="og:image:height" content="630" />`);
  html = html.replace(/<meta\s+property="og:image:type"[\s\S]*?>/i, `<meta property="og:image:type" content="image/jpeg" />`);
  html = html.replace(/<meta\s+property="og:image:alt"[\s\S]*?>/i, `<meta property="og:image:alt" content="Growwezy Global Tech – A Guided Approach to Your Financial Future" />`);

  // 5. Set Twitter Card tags
  html = html.replace(/<meta\s+name="twitter:card"[\s\S]*?>/i, `<meta name="twitter:card" content="summary_large_image" />`);
  html = html.replace(/<meta\s+name="twitter:title"[\s\S]*?>/i, `<meta name="twitter:title" content="${route.title.replace(/"/g, '&quot;')}" />`);
  html = html.replace(/<meta\s+name="twitter:description"[\s\S]*?>/i, `<meta name="twitter:description" content="${route.description.replace(/"/g, '&quot;')}" />`);
  html = html.replace(/<meta\s+name="twitter:image"[\s\S]*?>/i, `<meta name="twitter:image" content="${DEFAULT_OG_IMAGE}" />`);
  html = html.replace(/<meta\s+name="twitter:image:alt"[\s\S]*?>/i, `<meta name="twitter:image:alt" content="Growwezy Global Tech – A Guided Approach to Your Financial Future" />`);

  // 6. Inject Canonical (only if not empty)
  if (route.canonical) {
    const canonicalTag = `\n    <link rel="canonical" href="${route.canonical}" />`;
    html = html.replace('</head>', `${canonicalTag}\n  </head>`);
  }

  // 7. Inject JSON-LD Schema
  if (route.schemas && route.schemas.length > 0) {
    const jsonLdContent = JSON.stringify(route.schemas.length === 1 ? route.schemas[0] : route.schemas);
    const jsonLdTag = `\n    <script type="application/ld+json" id="prerendered-jsonld">${jsonLdContent}</script>`;
    html = html.replace('</head>', `${jsonLdTag}\n  </head>`);
  }

  // 8. Inject Semantic Content inside <div id="root">
  if (route.bodyHtml) {
    const semanticRoot = `<div id="root">${route.bodyHtml.trim()}</div>`;
    html = html.replace('<div id="root"></div>', semanticRoot);
  }

  return html;
}

console.log(`Pre-rendering ${routes.length} routes...`);

routes.forEach((route) => {
  const fullOutPath = path.join(DIST_DIR, route.outPath);
  const outDir = path.dirname(fullOutPath);
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const routeHtml = buildRouteHtml(route);
  fs.writeFileSync(fullOutPath, routeHtml, 'utf8');
  console.log(`  ✓ Rendered [${route.path}] -> dist/${route.outPath} (${(routeHtml.length / 1024).toFixed(1)} KB)`);
});

console.log('Pre-rendering complete successfully!');
