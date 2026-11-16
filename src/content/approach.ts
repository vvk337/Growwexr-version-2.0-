export interface ApproachStepSubsection {
  subheading: string;
  text: string;
}

export interface ApproachStepItem {
  number: string;
  title: string;
  image: string;
  imagePosition?: string;
  description?: string;
  subsections?: ApproachStepSubsection[];
  summary: string;
  details: string[];
}

export const approachSteps: ApproachStepItem[] = [
  {
    number: '01',
    title: 'Start With a Consultation',
    image: '/assets/approach/01-consultation.webp',
    imagePosition: 'center 20%',
    description:
      'We ask which markets you trade, how much capital you’re working with, and what you want to achieve. Then we discuss how involved you want to be. You can receive trading signals and place your own trades, or discuss having Growwezy handle trade execution through account management.',
    summary:
      'We ask which markets you trade, how much capital you’re working with, and what you want to achieve. Then we discuss how involved you want to be.',
    details: [
      'Identification of active markets and traded instruments',
      'Capital allocation and risk tolerance alignment',
      'Selection between independent signal execution and trade-only account management'
    ]
  },
  {
    number: '02',
    title: 'Meet Your Analyst Team',
    image: '/assets/approach/02-analyst-team.webp',
    imagePosition: 'center 25%',
    description:
      'Your package determines which team you join. Client groups are organised in batches of 100, 50, or 25, with a lead analyst overseeing a team of relationship managers. Higher tiers have smaller groups, more experienced analysts and relationship managers, and fewer clients per relationship manager.',
    summary:
      'Your package determines which team you join. Groups are organised in batches with dedicated lead analysts.',
    details: [
      'Tier-based group sizing (batches of 100, 50, or 25 clients)',
      'Lead analyst oversight with dedicated relationship managers',
      'Senior analyst coverage and tighter client ratios on higher tiers'
    ]
  },
  {
    number: '03',
    title: 'See How Your Service Works',
    image: '/assets/approach/03-service-workflow.webp',
    imagePosition: 'center 35%',
    description:
      'Clear, structured operating models whether you act on analyst signals independently or delegate trade execution to our team.',
    subsections: [
      {
        subheading: 'Trading Signals',
        text:
          'Analysts assess trade setups using their own methods. Depending on the setup, they may review trends, support and resistance levels, or volatility using tools such as Bollinger Bands. Each signal includes an entry level, a stop-loss, and two take-profit targets (TP1 and TP2). You receive signals through your preferred channel and decide which trades to place.'
      },
      {
        subheading: 'Account Management',
        text:
          'Before trading begins, we explain the management fee, when it’s due, and any trial terms that apply. We discuss your trading objectives and how much risk you’re comfortable taking. Your funds stay in your own broker account. Growwezy can place trades but cannot withdraw funds, and service fees are paid separately.'
      }
    ],
    summary:
      'Full visibility into trading signals analysis and trade-only account management protocols.',
    details: [
      'Technical assessment across trends, key levels, and volatility bands',
      'Precise entry, stop-loss, and multi-tier take-profit targets (TP1 & TP2)',
      'Custody guarantee: funds remain strictly within your personal broker account'
    ]
  },
  {
    number: '04',
    title: 'Stay Informed',
    image: '/assets/approach/04-client-reporting.webp',
    imagePosition: 'center 40%',
    description:
      'Your relationship manager keeps you updated, and you also receive reports you can refer back to. You can speak with your relationship manager if you have questions about an update or report.',
    summary:
      'Continuous client reporting, market debriefs, and direct relationship manager access.',
    details: [
      'Periodic portfolio and market update broadcasts',
      'Archived performance and execution reporting for reference',
      'Direct communication channel with your assigned relationship manager'
    ]
  }
];
