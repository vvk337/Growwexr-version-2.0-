import React from 'react';
import { AtmosphericHero } from '../components/sections/AtmosphericHero';
import { AboutIntro } from '../components/sections/AboutIntro';
import { ServicesRail } from '../components/sections/ServicesRail';
import { ValuesSection } from '../components/sections/ValuesSection';
import { ClientFocusSelector } from '../components/sections/ClientFocusSelector';
import { ApproachSection } from '../components/sections/ApproachSection';
import { WhyWorkWithUs } from '../components/sections/WhyWorkWithUs';
import { InsightsPreview } from '../components/sections/InsightsPreview';
import { FAQSection } from '../components/sections/FAQSection';
import { FinalCTA } from '../components/sections/FinalCTA';

export const Home: React.FC = () => {
  return (
    <main id="main-content">
      {/* 01. Signature Moving Hero + Category Strip */}
      <AtmosphericHero />

      {/* 02. Asymmetrical About intro on pale ice + Word Marquee */}
      <AboutIntro />

      {/* 03. Core capabilities carousel on white */}
      <ServicesRail />

      {/* 04. Five-part Values arrangement on navy */}
      <ValuesSection />

      {/* 05. Client Focus Selector on dark */}
      <ClientFocusSelector />

      {/* 06. 3-Step Consultation Framework on pale ice */}
      <ApproachSection />

      {/* 07. What You Bring / What We Discuss on navy */}
      <WhyWorkWithUs />

      {/* 08. Educational Insights on pale ice */}
      <InsightsPreview />

      {/* 09. Accessible FAQ accordion on white */}
      <FAQSection />

      {/* 10. Final Call to Action */}
      <FinalCTA />
    </main>
  );
};

