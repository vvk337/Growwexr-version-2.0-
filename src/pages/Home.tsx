import React, { lazy, Suspense } from 'react';
import { AtmosphericHero } from '../components/sections/AtmosphericHero';
import { AboutIntro } from '../components/sections/AboutIntro';
import { ServicesRail } from '../components/sections/ServicesRail';
import { useSEO } from '../hooks/useSEO';
import { useJsonLd } from '../hooks/useJsonLd';
import { organizationSchema, websiteSchema, webPageSchema } from '../seo/schemas';

// Code-split below-the-fold sections to drastically reduce initial bundle execution
const ValuesSection = lazy(() => import('../components/sections/ValuesSection').then(m => ({ default: m.ValuesSection })));
const ClientFocusSelector = lazy(() => import('../components/sections/ClientFocusSelector').then(m => ({ default: m.ClientFocusSelector })));
const WhyWorkWithUs = lazy(() => import('../components/sections/WhyWorkWithUs').then(m => ({ default: m.WhyWorkWithUs })));
const InsightsPreview = lazy(() => import('../components/sections/InsightsPreview').then(m => ({ default: m.InsightsPreview })));
const FAQSection = lazy(() => import('../components/sections/FAQSection').then(m => ({ default: m.FAQSection })));
const FinalCTA = lazy(() => import('../components/sections/FinalCTA').then(m => ({ default: m.FinalCTA })));

export const Home: React.FC = () => {
  useSEO({
    title: 'Growwezy Global Tech | Forex Advisory & Asset Management',
    description:
      'Growwezy provides forex trading advisory and financial asset management for NRIs and international clients across the UAE and Middle East. Clearer perspective. Informed decisions.',
    canonical: '/',
  });

  useJsonLd([organizationSchema, websiteSchema, webPageSchema({
    url: 'https://growwezy.com/',
    name: 'Growwezy Global Tech – Home',
    description: 'Forex trading advisory and financial asset management for NRIs across the UAE and Middle East.',
  })]);

  return (
    <main id="main-content">
      {/* 01. Signature Moving Hero + Category Strip */}
      <AtmosphericHero />

      {/* 02. Asymmetrical About intro on pale ice + Word Marquee */}
      <AboutIntro />

      {/* 03. Core capabilities carousel on white */}
      <ServicesRail />

      <Suspense fallback={null}>
        {/* 04. Five-part Values arrangement on navy */}
        <ValuesSection />

        {/* 05. Client Focus Selector on dark */}
        <ClientFocusSelector />

        {/* 06. What You Bring / What We Discuss on navy */}
        <WhyWorkWithUs />

        {/* 07. Educational Insights on pale ice */}
        <InsightsPreview />

        {/* 08. Accessible FAQ accordion on white */}
        <FAQSection />

        {/* 09. Final Call to Action */}
        <FinalCTA />
      </Suspense>
    </main>
  );
};

