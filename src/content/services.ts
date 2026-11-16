export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  originalPrice?: string;
  offerPrice?: string;
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
    id: 'forex-signals',
    slug: 'forex-signals',
    title: 'Forex Signals',
    category: 'CURRENCY MARKETS',
    originalPrice: '$400',
    offerPrice: '$300',
    shortDescription:
      'Clear, disciplined guidance on potential entries and exits across major and cross currency pairs.',
    fullDescription:
      'Our Forex Signals plan delivers timely, high-probability trade setups across major, minor, and exotic currency pairs. Backed by rigorous technical analysis, macroeconomic flow tracking, and structured risk parameters, each signal includes specific entry levels, stop loss, and multiple take-profit targets so you can execute with confidence on your own broker platform.',
    targetAudience:
      'Active traders, Indian professionals, and NRIs in the UAE and Middle East who want actionable, high-conviction forex trading signals they can execute independently.',
    image: '/assets/services/services-forex-signals.webp',
    features: [
      'Coverage across G10 & major liquid currency pairs',
      'Precise entry price, stop-loss, and target exit levels',
      'Calculated risk-to-reward ratios on every signal',
      'Real-time updates and trailing stop guidance'
    ],
    discussionTopics: [
      'Currency pair volatility and session timing (London & New York overlaps)',
      'Position sizing and percentage-based risk management per trade',
      'Broker platform compatibility and order execution types',
      'Managing drawdowns and trade journaling'
    ],
    deliverables: [
      'Real-time trade signal alerts with entry/exit coordinates',
      'Daily currency overview and key market levels',
      'Direct trader support for signal clarifications'
    ],
    faqs: [
      {
        question: 'How are signals delivered?',
        answer:
          'Signals are broadcast instantly via dedicated real-time channels with complete entry, stop loss, and target levels.'
      },
      {
        question: 'Do you execute the trades for me on this plan?',
        answer:
          'No, on the Forex Signals plan you place and execute trades yourself in your own broker account. If you prefer our team to execute trades on your behalf, speak with us about our Account Management service.'
      }
    ]
  },
  {
    id: 'comex-signals',
    slug: 'comex-signals',
    title: 'Comex Signals',
    category: 'GOLD & SILVER',
    originalPrice: '$499',
    offerPrice: '$350',
    shortDescription:
      'Focused, high-precision trading signals for gold (XAU/USD) and silver (XAG/USD).',
    fullDescription:
      'Specialized coverage for precious metals markets. Gold and silver move with distinctive volatility driven by geopolitical developments, inflation expectations, and dollar liquidity. Our Comex Signals plan focuses exclusively on XAU/USD and XAG/USD, providing high-probability setups engineered for both intraday momentum and swing opportunities.',
    targetAudience:
      'Precious metals traders, commodities specialists, and private clients seeking focused analysis and signals on gold and silver movements.',
    image: '/assets/services/services-comex-signals.webp',
    features: [
      'Dedicated gold (XAU/USD) & silver (XAG/USD) setups',
      'Session-specific liquidity break and momentum signals',
      'Multi-timeframe technical confluence models',
      'Dynamic stop-loss and trailing profit milestones'
    ],
    discussionTopics: [
      'Macro catalysts: US Dollar Index (DXY), real yields, and Fed rate cycles',
      'Managing gold spread and leverage considerations during high-volatility releases',
      'Intraday scalping vs. multi-day swing hold strategies in metals'
    ],
    deliverables: [
      'Direct Comex trade signals with immediate alert notifications',
      'Daily gold & silver technical roadmaps with support/resistance zones',
      'Live market update notes during major macroeconomic releases'
    ],
    faqs: [
      {
        question: 'Which precious metals are included in this plan?',
        answer:
          'The plan covers Spot Gold (XAU/USD) and Spot Silver (XAG/USD), as well as Comex futures equivalents.'
      },
      {
        question: 'What is the typical risk-to-reward ratio for Comex setups?',
        answer:
          'Our setups target a minimum 1:2 risk-to-reward ratio, often extending to 1:3 or higher with trailing stops during sustained momentum trends.'
      }
    ]
  },
  {
    id: 'combo-signals',
    slug: 'combo-signals',
    title: 'Combo Signals',
    category: 'FOREX & PRECIOUS METALS',
    originalPrice: '$699',
    offerPrice: '$489',
    shortDescription:
      'Complete market coverage combining all forex currency pairs, gold, and silver in one comprehensive plan.',
    fullDescription:
      'The Combo Signals plan unifies our full market intelligence: major and cross forex pairs alongside high-volatility gold and silver. This all-in-one package provides diversified opportunities across global trading sessions, allowing you to capitalize on uncorrelated movements between currency pairs and precious metals.',
    targetAudience:
      'Comprehensive traders and international participants who trade both currencies and metals and want unified research and signal delivery.',
    image: '/assets/services/services-combo-signals.webp',
    features: [
      'Full access to all Forex currency pair signals',
      'Full access to all Comex Gold & Silver signals',
      'Cross-asset correlation insights (e.g. USD/JPY vs. Gold)',
      'Priority alert delivery and consolidated daily briefings'
    ],
    discussionTopics: [
      'Portfolio diversification across simultaneous FX and metal positions',
      'Hedging strategies during global risk-off events',
      'Margin allocation across multi-asset trading portfolios'
    ],
    deliverables: [
      'All Forex and Comex signal broadcasts',
      'Unified daily market briefing and economic calendar playbook',
      'Dedicated support channel for multi-asset strategy queries'
    ],
    faqs: [
      {
        question: 'Can I switch between Forex and Comex signals?',
        answer:
          'With the Combo plan, you receive all signals simultaneously without needing to choose between currencies and metals.'
      },
      {
        question: 'Does the Combo plan offer better value?',
        answer:
          'Yes, the Combo plan bundles the full scope of both standalone plans at a substantial cost savings compared to purchasing each separately.'
      }
    ]
  },
  {
    id: 'hni-signals',
    slug: 'hni-signals',
    title: 'HNI Signals & Dedicated Advisory',
    category: 'DEDICATED SUPPORT',
    originalPrice: '$999',
    offerPrice: '$699',
    shortDescription:
      'Premium tier featuring 24/7 relationship manager support, priority trade setups, and bespoke strategy consultations.',
    fullDescription:
      'Engineered for high-volume participants and family offices, the HNI tier combines all Forex and Comex signals with bespoke advisory. You gain direct access to a dedicated relationship manager available 24/7, personalized risk modeling, custom position sizing recommendations, and one-on-one strategy review calls.',
    targetAudience:
      'High-Net-Worth Individuals, corporate investors, and experienced traders requiring direct access, institutional-grade depth, and continuous advisory support.',
    image: '/assets/services/services-hni-signals.webp',
    features: [
      '24/7 dedicated relationship manager access',
      'Full Forex, Gold, and Silver signals with priority routing',
      'Custom lot-size and risk-allocation consultation',
      'Periodic one-on-one portfolio and performance reviews'
    ],
    discussionTopics: [
      'Institutional execution timing and slippage reduction',
      'Cross-border capital deployment and liquidity management',
      'Tailored trade structures based on individual risk profile'
    ],
    deliverables: [
      'VIP signal channel with lowest-latency routing',
      'Direct WhatsApp and phone access to relationship manager',
      'Comprehensive monthly performance and market review dossier'
    ],
    faqs: [
      {
        question: 'What makes the HNI tier different from the Combo plan?',
        answer:
          'In addition to receiving all signals, HNI clients receive dedicated 24/7 relationship manager access, customized risk modeling tailored to their account size, and direct strategy consultations.'
      },
      {
        question: 'How do I start with the HNI plan?',
        answer:
          'You can book an introductory consultation with our senior advisory team to discuss your capital allocation, trading style, and requirements.'
      }
    ]
  },
  {
    id: 'account-management',
    slug: 'account-management',
    title: 'Account Management',
    category: 'EXECUTION SERVICE',
    shortDescription:
      'Direct trade execution on your own broker account. Your funds stay entirely in your custody with trade-only access.',
    fullDescription:
      'For clients who prefer hands-off execution, our Account Management service allows our experienced trading team to place trades directly on your behalf. Crucially, your funds remain 100% within your own broker account at all times. Our team is granted trade-only permissions via API or investor credentials—we cannot deposit, transfer, or withdraw your capital.',
    targetAudience:
      'Busy professionals, NRI business owners, and private clients who lack time to monitor charts and execute trades themselves, but want professional management while maintaining complete fund security.',
    image: '/assets/about-consultation-advisory.webp',
    features: [
      'Funds stay 100% in your own regulated broker account',
      'Trade-only access: our team has zero withdrawal permissions',
      'Disciplined risk parameters with pre-agreed maximum drawdown controls',
      'Transparent real-time visibility into all active and closed positions'
    ],
    discussionTopics: [
      'Broker platform verification and trade-only credential setup',
      'Risk tolerance, maximum drawdown ceilings, and target return parameters',
      'Fee structures and high-watermark performance metrics'
    ],
    deliverables: [
      'Professional trade execution and active position management',
      'Transparent live reporting accessible anytime directly in your broker app',
      'Monthly performance statement and strategic briefing'
    ],
    faqs: [
      {
        question: 'Do I ever transfer my money to Growwezy?',
        answer:
          'No. Never. Your trading capital stays in your own broker account in your own name. We only receive trade-execution access and have zero access to withdraw or transfer funds.'
      },
      {
        question: 'Which brokers are supported for Account Management?',
        answer:
          'We support major international, regulated brokers offering MT4, MT5, or direct API connectivity. We can review your existing broker during consultation.'
      }
    ]
  }
];
