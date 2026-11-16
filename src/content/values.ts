export interface ValueItem {
  id: string;
  stepNumber: string;
  title: string;
  description: string;
  iconName: 'Compass' | 'Shield' | 'Eye' | 'BookOpen';
  order: number;
}

export const valuesData: ValueItem[] = [
  {
    id: 'step-01',
    stepNumber: '01',
    title: 'Let’s Talk',
    description:
      'Book a consultation to discuss your experience, goals, and questions. You don’t need to have everything figured out before speaking with us.',
    iconName: 'Compass',
    order: 1
  },
  {
    id: 'step-02',
    stepNumber: '02',
    title: 'Find Your Fit',
    description:
      'Explore trading signals or account management with our team. Understand how your chosen service works, including its fees and trading risks.',
    iconName: 'Eye',
    order: 2
  },
  {
    id: 'step-03',
    stepNumber: '03',
    title: 'Get Set Up',
    description:
      'We’ll walk you through the setup for your chosen service, explain any account access needed, and make sure you know how to get support.',
    iconName: 'Shield',
    order: 3
  },
  {
    id: 'step-04',
    stepNumber: '04',
    title: 'Begin with Guidance',
    description:
      'Start receiving signals or begin the agreed account management service. Stay in touch with our team as you get familiar with the process.',
    iconName: 'BookOpen',
    order: 4
  }
];

export const valuesCenterImage = '/assets/growwezy-onboarding.webp';

