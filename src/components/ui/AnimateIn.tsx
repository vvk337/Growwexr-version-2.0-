import React, { useEffect, useRef } from 'react';

interface AnimateInProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'default' | 'slide-left' | 'slide-right' | 'scale-up' | 'fade';
  delay?: 0 | 100 | 150 | 200 | 250 | 300 | 350 | 400 | 500;
  threshold?: number;
  as?: 'div' | 'section' | 'article' | 'span';
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

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('animate-in');
          observer.disconnect();
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
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

