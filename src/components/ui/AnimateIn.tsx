import React, { useEffect, useRef } from 'react';

interface AnimateInProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'default' | 'slide-left' | 'slide-right' | 'scale-up' | 'fade';
  delay?: 0 | 100 | 150 | 200 | 250 | 300 | 350 | 400 | 500;
  threshold?: number;
  as?: 'div' | 'section' | 'article' | 'span';
}

// Singleton observer pool to drastically minimize memory & thread overhead
let sharedObserver: IntersectionObserver | null = null;
const observedElements = new Set<Element>();

function getSharedObserver() {
  if (!sharedObserver && typeof window !== 'undefined' && 'IntersectionObserver' in window) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            sharedObserver?.unobserve(entry.target);
            observedElements.delete(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
  }
  return sharedObserver;
}

export const AnimateIn: React.FC<AnimateInProps> = ({
  children,
  className = '',
  animation = 'default',
  delay = 0,
  threshold = 0.12,
  as = 'div',
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Immediately visible (above fold) — skip animation
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.95) {
      el.classList.add('animate-in');
      return;
    }

    const observer = getSharedObserver();
    if (observer) {
      observer.observe(el);
      observedElements.add(el);
    } else {
      el.classList.add('animate-in');
    }

    return () => {
      if (observer) {
        observer.unobserve(el);
        observedElements.delete(el);
      }
    };
  }, [threshold]);

  const dataAnimate = animation === 'default' ? '' : animation;
  const dataDelay = delay ? String(delay) : undefined;
  const Component = as as keyof JSX.IntrinsicElements;

  return React.createElement(
    Component,
    {
      ref,
      className,
      'data-animate': dataAnimate || 'true',
      ...(dataDelay ? { 'data-delay': dataDelay } : {}),
    },
    children
  );
};

