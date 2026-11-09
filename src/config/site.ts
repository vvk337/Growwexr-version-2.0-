export interface SiteConfig {
  name: string;
  legalName: string;
  shortName: string;
  tagline: string;
  establishedYear: number;
  description: string;
  logo: {
    full: string;
    symbol: string;
    alt: string;
  };
  navigation: {
    label: string;
    href: string;
  }[];
  contact: {
    email: string;
    phone: string;
    whatsapp: string;
    address: string;
    hours: string;
  };
  socials: {
    name: string;
    href: string;
  }[];
  featureFlags: {
    showClientStories: boolean;
    showPricing: boolean;
    showTestimonials: boolean;
    enableFormSubmission: boolean;
  };
}

export const siteConfig: SiteConfig = {
  name: 'Growwezy Global Tech',
  legalName: 'Growwezy Global Tech Private Limited',
  shortName: 'Growwezy',
  tagline: 'Clearer Perspective. Informed Forex Decisions.',
  establishedYear: 2020,
  description:
    'Forex trading advisory and financial asset management services for NRIs and international clients in the Middle East. Established in India in 2020.',
  logo: {
    full: '/assets/Growwezy-Global-Tech-HD.svg',
    symbol: '/assets/Growwezy-G-Square.svg',
    alt: 'Growwezy Global Tech'
  },
  navigation: [
    { label: 'Services', href: '/services' },
    { label: 'Our Approach', href: '/approach' },
    { label: 'About', href: '/about' },
    { label: 'Insights', href: '/insights' },
    { label: 'Contact', href: '/contact' }
  ],
  contact: {
    email: 'contact@growwezy.com', // Tracked in LAUNCH_CHECKLIST.md for final client verification
    phone: '+91 (0) 000 000 000',
    whatsapp: '+91 (0) 000 000 000',
    address: 'India • Serving clients across UAE & Middle East',
    hours: 'Mon – Fri, 9:00 AM – 6:00 PM IST'
  },
  socials: [
    { name: 'LinkedIn', href: 'https://linkedin.com' },
    { name: 'X (Twitter)', href: 'https://x.com' }
  ],
  featureFlags: {
    showClientStories: false, // Per specification: hidden until real case studies are supplied
    showPricing: false,       // Per specification: hidden until approved fee structure is verified
    showTestimonials: false,  // Per specification: no fabricated ratings or quotes
    enableFormSubmission: false // Honest preview mode until form endpoint is linked
  }
};

