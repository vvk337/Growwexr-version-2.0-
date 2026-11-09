export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const generalFAQs: FAQItem[] = [
  {
    id: 'services-scope',
    question: 'What exact services does Growwezy Global Tech provide?',
    answer:
      'We specialize in two core areas: Forex Trading Advisory and Financial Asset Management. Our work focuses on market research, currency exposure analysis, macroeconomic risk management, and multi-asset portfolio advisory for NRIs and international clients.'
  },
  {
    id: 'custody-and-broker',
    question: 'Does Growwezy hold client funds or execute direct trades on our accounts?',
    answer:
      'No. We operate strictly as an independent advisory firm. We do not hold client funds, accept deposits, or take custody of assets. Clients execute trades and maintain their capital directly through their own preferred, regulated brokerages and banking institutions.'
  },
  {
    id: 'middle-east-nris',
    question: 'Why do you specifically focus on clients in the Middle East?',
    answer:
      'Since our establishment in India in 2020, we have identified a significant need among Non-Resident Indians and expatriates across the UAE and GCC for objective currency hedging, repatriation timing, and cross-border financial asset alignment.'
  },
  {
    id: 'consultation-format',
    question: 'How do client consultations work?',
    answer:
      'Consultations are conducted remotely via scheduled video calls or private briefings. We review your current market exposures, discuss tailored frameworks, address your specific questions, and provide actionable research deliverables.'
  },
  {
    id: 'fees-structure',
    question: 'How does your advisory fee structure work?',
    answer:
      'Our advisory engagements operate on a transparent, agreed fee schedule based on the consultation scope and advisory duration. We do not charge hidden spreads or take undisclosed commissions from brokers.'
  }
];

