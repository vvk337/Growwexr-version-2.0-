export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  targetAudience: string;
  image: string;
  features: string[];
  discussionTopics: string[];
  deliverables: string[];
  faqs: { question: string; answer: string }[];
}

export const servicesData: ServiceItem[] = [
  {
    id: 'forex-trading-advisory',
    slug: 'forex-advisory',
    title: 'Forex Trading Advisory',
    shortDescription:
      'Disciplined currency pair analysis, macroeconomic context, and risk mitigation strategies tailored for international market participants.',
    fullDescription:
      'Our Forex Trading Advisory provides professional analysis and structured decision frameworks for major and cross currency pairs. We combine macroeconomic fundamentals, liquidity flow monitoring, and disciplined risk parameters to help clients navigate foreign exchange volatility with clarity.',
    targetAudience:
      'High-net-worth individuals, NRIs hedging international exposures, and institutional capital allocators requiring objective FX insights.',
    image:
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=75',
    features: [
      'G10 & Emerging Market currency analysis',
      'Macro trend & central bank policy tracking',
      'Systematic volatility & drawdown controls',
      'Bespoke hedging structures for NRI assets'
    ],
    discussionTopics: [
      'Current currency exposure evaluation',
      'Interest rate differential impacts on cross-border capital',
      'Risk tolerance modeling and scenario planning',
      'Execution frameworks and liquidity timing'
    ],
    deliverables: [
      'Weekly currency intelligence briefing',
      'Direct advisory consultations for strategic allocations',
      'Custom risk exposure matrix'
    ],
    faqs: [
      {
        question: 'Do you execute trades directly on client accounts?',
        answer:
          'No. As an independent advisory firm, we provide analysis, strategic consultation, and risk modeling. Clients retain full custody and execution control through their regulated brokers.'
      },
      {
        question: 'How do you handle currency risk for Middle East NRIs?',
        answer:
          'We evaluate AED, USD, and INR correlations, examining remittance timing, purchasing power preservation, and appropriate hedging mechanisms.'
      }
    ]
  },
  {
    id: 'financial-asset-management',
    slug: 'financial-asset-management',
    title: 'Financial Asset Management',
    shortDescription:
      'Comprehensive capital preservation, multi-asset allocation, and long-term wealth strategy designed for cross-border families and firms.',
    fullDescription:
      'Structured wealth advisory engineered for long-term capital preservation and balanced growth. We design resilient multi-asset allocation frameworks taking into account international tax considerations, currency dynamics, and bespoke risk constraints.',
    targetAudience:
      'NRI business leaders, expatriate families in the UAE/GCC, and private investors seeking structured portfolio architecture.',
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=75',
    features: [
      'Multi-asset strategic allocation frameworks',
      'Downside protection & stress-tested portfolios',
      'Cross-border financial architecture for NRIs',
      'Independent fee-only consultation models'
    ],
    discussionTopics: [
      'Global asset distribution across equities, fixed income, and FX',
      'Inflation-adjusted purchasing power preservation',
      'Geographic risk diversification outside home jurisdiction',
      'Generational wealth transition parameters'
    ],
    deliverables: [
      'Comprehensive portfolio diagnosis',
      'Custom asset allocation playbook',
      'Quarterly macroeconomic rebalancing review'
    ],
    faqs: [
      {
        question: 'What is the onboarding process for new asset advisory clients?',
        answer:
          'We begin with an in-depth consultation to map your balance sheet, liabilities, liquidity needs, and risk tolerance before delivering any recommendation.'
      },
      {
        question: 'Are recommendations tied to specific proprietary financial products?',
        answer:
          'No. Our advisory is strictly independent. We do not manufacture proprietary retail products or receive commission kicks.'
      }
    ]
  }
];

