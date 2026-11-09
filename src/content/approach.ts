export interface ProcessStep {
  number: string;
  title: string;
  summary: string;
  details: string[];
  image: string;
}

export const approachSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Understand Your Requirements',
    summary:
      'We begin with an in-depth consultation exploring your current currency exposures, risk boundaries, time horizons, and liquidity targets.',
    details: [
      'Comprehensive audit of cross-border financial commitments',
      'Assessment of existing broker relationships and custody structure',
      'Quantitative risk tolerance and volatility drawdown thresholds',
      'Definition of advisory objectives and reporting cadence'
    ],
    image:
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=750&q=75'
  },
  {
    number: '02',
    title: 'Discuss the Approach',
    summary:
      'Our team models custom scenarios and presents tailored strategic roadmaps with clear risk parameters before any action is undertaken.',
    details: [
      'Scenario modeling across contrasting global macro regimes',
      'Evaluation of direct currency pairs vs. cross-asset hedges',
      'Stress-testing liquidity against unexpected geopolitical volatility',
      'Transparent dialogue on prospective risk-to-reward dynamics'
    ],
    image:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=750&q=75'
  },
  {
    number: '03',
    title: 'Agree the Next Steps',
    summary:
      'We formalize an actionable advisory mandate with established review intervals, direct consultation access, and clear accountability.',
    details: [
      'Bespoke advisory roadmap document provided to the client',
      'Direct scheduling for periodic market briefings and review calls',
      'Defined escalation channels during anomalous market movements',
      'Continuous alignment with client sovereign and tax residency goals'
    ],
    image:
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=750&q=75'
  }
];

