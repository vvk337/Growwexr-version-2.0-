'use client';
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import styles from './flow-button.module.css';

export interface FlowButtonProps {
  text?: string;
  children?: React.ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'gold' | 'white' | 'light';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  inverted?: boolean;
}

export function FlowButton({
  text = 'Modern Button',
  children,
  to,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  disabled = false,
  inverted = true
}: FlowButtonProps) {
  const displayText = children || text;

  // Variant class mapping
  const variantClass =
    variant === 'gold'
      ? styles.variantGold
      : variant === 'white'
        ? styles.variantWhite
        : variant === 'light'
          ? styles.variantLight
          : styles.variantPrimary;

  const sizeClass = styles[size] || styles.md;
  const circleClass = inverted ? styles.circleInverted : styles.circleNonInverted;
  const combinedClass = `group relative flex items-center gap-1 overflow-hidden rounded-[100px] border-[1.5px] cursor-pointer transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:rounded-[12px] active:scale-[0.95] ${styles.flowButton} ${sizeClass} ${variantClass} ${className}`;

  const innerContent = (
    <>
      {/* Left arrow (arr-2): slides in from left on hover */}
      <ArrowRight
        className={`left-arrow absolute w-4 h-4 left-[-25%] fill-none z-[9] group-hover:left-4 transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${styles.leftArrow}`}
        size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16}
        aria-hidden="true"
      />

      {/* Text: shifts right on hover */}
      <span
        className={`text-label relative z-[1] -translate-x-3 group-hover:translate-x-3 transition-all duration-[800ms] ease-out ${styles.textSpan}`}
      >
        {displayText}
      </span>

      {/* Circle Ripple: Inverted (starts full, shrinks to 0 on hover) or Non-Inverted */}
      <span
        className={`circle-ripple absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-[50%] pointer-events-none ${circleClass}`}
        aria-hidden="true"
      />

      {/* Right arrow (arr-1): slides offscreen right on hover */}
      <ArrowRight
        className={`right-arrow absolute w-4 h-4 right-4 fill-none z-[9] group-hover:right-[-25%] transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${styles.rightArrow}`}
        size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16}
        aria-hidden="true"
      />
    </>
  );

  if (to) {
    return (
      <Link to={to} className={combinedClass} onClick={onClick}>
        {innerContent}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={combinedClass} onClick={onClick} target="_blank" rel="noopener noreferrer">
        {innerContent}
      </a>
    );
  }

  return (
    <button type={type} className={combinedClass} onClick={onClick} disabled={disabled}>
      {innerContent}
    </button>
  );
}

export default FlowButton;

