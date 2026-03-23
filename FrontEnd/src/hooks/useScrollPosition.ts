import { useState, useEffect, useCallback } from 'react';
import { throttle } from '@utils/helpers';

interface ScrollPosition {
  x: number;
  y: number;
  direction: 'up' | 'down' | null;
  isAtTop: boolean;
  isAtBottom: boolean;
  scrollPercentage: number;
}

interface UseScrollPositionOptions {
  throttleMs?: number;
  offset?: number;
}

/**
 * Hook to track scroll position
 */
export const useScrollPosition = (
  options: UseScrollPositionOptions = {}
): ScrollPosition => {
  const { throttleMs = 100, offset = 0 } = options;

  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    x: 0,
    y: 0,
    direction: null,
    isAtTop: true,
    isAtBottom: false,
    scrollPercentage: 0,
  });

  const handleScroll = useCallback(() => {
    const currentY = window.scrollY;
    const currentX = window.scrollX;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const maxScroll = documentHeight - windowHeight;
    const scrollPercentage = maxScroll > 0 ? (currentY / maxScroll) * 100 : 0;

    setScrollPosition((prev) => ({
      x: currentX,
      y: currentY,
      direction: currentY > prev.y ? 'down' : currentY < prev.y ? 'up' : prev.direction,
      isAtTop: currentY <= offset,
      isAtBottom: currentY >= maxScroll - offset,
      scrollPercentage: Math.min(100, Math.max(0, scrollPercentage)),
    }));
  }, [offset]);

  useEffect(() => {
    const throttledScroll = throttle(handleScroll, throttleMs);

    window.addEventListener('scroll', throttledScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [handleScroll, throttleMs]);

  return scrollPosition;
};

export default useScrollPosition;
