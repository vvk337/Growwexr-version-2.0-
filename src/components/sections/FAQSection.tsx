import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { generalFAQs } from '../../content/faq';
import { Button } from '../ui/Button';
import { AnimateIn } from '../ui/AnimateIn';
import styles from './FAQSection.module.css';

export const FAQSection: React.FC = () => {
  // First item open by default
  const [openId, setOpenId] = useState<string | null>(generalFAQs[0].id);

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className={`section section-white ${styles.faqSection}`} aria-labelledby="faq-heading">
      <div className="container">
        <div className={styles.faqGrid}>
          {/* Left Title & Support Block */}
          <AnimateIn animation="slide-left" className={styles.supportCol}>
            <span className="section-overline">Frequently Asked</span>
            <h2 id="faq-heading" className="section-title">
              Common Questions About Our Advisory
            </h2>
            <p className={styles.supportDesc}>
              Clear answers regarding our service scope, custody independence, and Middle East consultation model.
            </p>
            <div className={styles.supportCta}>
              <span className={styles.ctaPrompt}>Have a specific scenario?</span>
              <Button to="/contact" variant="primary" size="md">
                Speak With an Advisor
              </Button>
            </div>
          </AnimateIn>

          {/* Right Accordion List */}
          <AnimateIn animation="slide-right" delay={150} className={styles.accordionList} as="div">
            {generalFAQs.map((faq) => {
              const isOpen = faq.id === openId;
              return (
                <div key={faq.id} className={`${styles.accordionItem} ${isOpen ? styles.itemOpen : ''}`}>
                  <button
                    type="button"
                    className={styles.questionBtn}
                    onClick={() => toggleFAQ(faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                    id={`faq-btn-${faq.id}`}
                  >
                    <span className={styles.questionText}>{faq.question}</span>
                    <div className={styles.toggleIcon} aria-hidden="true">
                      {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                    </div>
                  </button>

                  <div
                    id={`faq-answer-${faq.id}`}
                    role="region"
                    aria-labelledby={`faq-btn-${faq.id}`}
                    className={`${styles.answerWrapper} ${isOpen ? styles.answerOpen : ''}`}
                  >
                    <div className={styles.answerInner}>
                      <p className={styles.answerText}>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </AnimateIn>
        </div>
      </div>
    </section>
  );
};
