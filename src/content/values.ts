export interface ValueItem {
  id: string;
  title: string;
  description: string;
  iconName: 'Compass' | 'Shield' | 'Eye' | 'BookOpen';
}

export const valuesData: ValueItem[] = [
  {
    id: 'client-context',
    title: 'Client Context',
    description:
      'We tailor advisory frameworks around the distinct tax, currency, and regulatory environments of Middle East expatriates and cross-border families.',
    iconName: 'Compass'
  },
  {
    id: 'clear-communication',
    title: 'Clear Communication',
    description:
      'No complex financial jargon or opaque strategies. Every market observation and recommendation is articulated with clarity and practical relevance.',
    iconName: 'Eye'
  },
  {
    id: 'long-term-perspective',
    title: 'Long-Term Perspective',
    description:
      'We prioritize balance-sheet durability and structural risk control over speculative short-term chasing, protecting principal value.',
    iconName: 'Shield'
  },
  {
    id: 'research-discipline',
    title: 'Research Discipline',
    description:
      'All insights originate from quantitative liquidity tracking, sovereign macroeconomic fundamentals, and data-backed empirical models.',
    iconName: 'BookOpen'
  }
];

export const valuesCenterImage =
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=700&q=75';

