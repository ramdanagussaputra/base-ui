import { useState, useCallback } from "react";

/**
 * Hook to manage carousel navigation state (current index)
 */
export const useCarouselNavigation = (totalSlides: number) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  }, [totalSlides]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  return { currentIndex, nextSlide, prevSlide, goToSlide };
};
