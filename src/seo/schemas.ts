/**
 * SEO Schema definitions – shared JSON-LD building blocks for Growwezy Global Tech.
 * Import these in page components and pass to useJsonLd().
 */

const BASE_URL  = 'https://growwezy.com';
const SITE_NAME = 'Growwezy Global Tech';

// ─── Organization (used on every page) ───────────────────────────────────────
export const organizationSchema = {
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

// ─── WebSite (used on homepage) ──────────────────────────────────────────────
export const websiteSchema = {
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

// ─── WebPage helper ──────────────────────────────────────────────────────────
export function webPageSchema(opts: {
  url: string;
  name: string;
  description: string;
  breadcrumbs?: { name: string; item: string }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${opts.url}#webpage`,
    url: opts.url,
    name: opts.name,
    description: opts.description,
    isPartOf: { '@id': `${BASE_URL}/#website` },
    ...(opts.breadcrumbs
      ? {
          breadcrumb: breadcrumbSchema(opts.breadcrumbs),
        }
      : {}),
  };
}

// ─── BreadcrumbList helper ───────────────────────────────────────────────────
export function breadcrumbSchema(items: { name: string; item: string }[]) {
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

// ─── Service / Product helper ────────────────────────────────────────────────
export function serviceSchema(opts: {
  name: string;
  description: string;
  url: string;
  image: string;
}) {
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

// ─── Article helper ──────────────────────────────────────────────────────────
export function articleSchema(opts: {
  url: string;
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${opts.url}#article`,
    headline: opts.title,
    description: opts.description,
    image: opts.image,
    url: opts.url,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified || opts.datePublished,
    author: {
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
}

// ─── FAQPage helper ──────────────────────────────────────────────────────────
export function faqSchema(faqs: { question: string; answer: string }[]) {
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
