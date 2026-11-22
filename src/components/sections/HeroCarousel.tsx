import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './HeroCarousel.module.css';

export interface CarouselSlide {
  id: string;
  image: string;
  alt: string;
  tag?: string;
  title?: string;
}

const HERO_SLIDES: CarouselSlide[] = [
  {
    id: 'executive-advisory',
    image: '/assets/hero-handshake-advisory.webp',
    tag: 'Advisory Brief',
    title: 'Middle East NRI Portfolio Strategy',
    alt: 'Growwezy Advisory Strategy Session in Dubai',
  },
  {
    id: 'trading-terminal',
    image: '/assets/hero-trading-desk.jpg',
    tag: 'Market Intelligence',
    title: 'Advanced Trading Terminal & Analysis',
    alt: 'Growwezy Trading Intelligence and Chart Analysis Desk',
  },
  {
    id: 'money-talks',
    image: '/assets/hero-money-talks.jpg',
    tag: 'Market Translation',
    title: 'Money talks. We translate.',
    alt: 'Money talks. We translate - Wall Street Financial Publication',
  },
];

interface HeroCarouselProps {
  slides?: CarouselSlide[];
  autoPlayInterval?: number;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  slides = HERO_SLIDES,
  autoPlayInterval = 4000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<number | null>(null);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const totalSlides = slides.length;

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Autoplay timer with pause on hover/touch
  useEffect(() => {
    if (isPaused || autoPlayInterval <= 0 || totalSlides <= 1) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = window.setInterval(goToNext, autoPlayInterval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, autoPlayInterval, goToNext, totalSlides]);

  // Touch gesture handlers for mobile swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
    if (touchStartX.current === null || touchEndX.current === null) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 40;

    if (distance > minSwipeDistance) {
      goToNext(); // Swipe left -> next slide
    } else if (distance < -minSwipeDistance) {
      goToPrev(); // Swipe right -> prev slide
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div
      className={styles.carouselContainer}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Advisory Highlights"
    >
      <div
        className={styles.carouselViewport}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Horizontal sliding track */}
        <div
          className={styles.track}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide, index) => {
            const isActive = index === currentIndex;
            return (
              <div
                key={slide.id}
                className={styles.slideItem}
                role="group"
                aria-roledescription="slide"
                aria-label={`Slide ${index + 1} of ${totalSlides}: ${slide.title || slide.alt}`}
                aria-hidden={!isActive}
              >
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className={`${styles.slideImage} ${slide.id === 'trading-terminal' ? styles.slideTradingDesk : ''}`}
                  width="690"
                  height="446"
                  loading={index === 0 ? 'eager' : 'lazy'}
                  fetchPriority={index === 0 ? 'high' : 'low'}
                  decoding="async"
                />
              </div>
            );
          })}
        </div>

        {/* Subtle left navigation arrow near the left edge, vertically centred */}
        <button
          type="button"
          className={`${styles.navButton} ${styles.prevButton}`}
          onClick={goToPrev}
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} strokeWidth={1.5} />
        </button>

        {/* Circular next button near the right edge, vertically centred with translucent white background */}
        <button
          type="button"
          className={`${styles.navButton} ${styles.nextButton}`}
          onClick={goToNext}
          aria-label="Next slide"
        >
          <ChevronRight size={20} strokeWidth={1.5} />
        </button>

        {/* Distinctive Pagination: Bottom-centre, horizontal white pill for active, grey dots for inactive */}
        <div className={styles.pagination} role="tablist" aria-label="Slide navigation">
          {slides.map((slide, index) => {
            const isActive = index === currentIndex;
            return (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Go to slide ${index + 1}`}
                className={`${styles.paginationDot} ${isActive ? styles.paginationDotActive : ''}`}
                onClick={() => setCurrentIndex(index)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
