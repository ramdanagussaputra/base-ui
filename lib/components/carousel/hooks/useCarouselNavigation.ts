import { useState, useCallback } from "react";

/**
 * Hook to manage carousel navigation state (current index)
 */
export const useCarouselNavigation = (
  totalSlides: number,
  controlledIndex?: number,
  onIndexChange?: (index: number) => void,
) => {
  const [internalIndex, setInternalIndex] = useState(0);

  const isControlled = controlledIndex !== undefined;
  const currentIndex = isControlled ? controlledIndex : internalIndex;

  const setCurrentIndex = useCallback(
    (newIndex: number | ((prev: number) => number)) => {
      if (isControlled) {
        const nextIndex =
          typeof newIndex === "function" ? newIndex(currentIndex) : newIndex;
        onIndexChange?.(nextIndex);
      } else {
        setInternalIndex(newIndex);
      }
    },
    [isControlled, currentIndex, onIndexChange],
  );

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  }, [totalSlides, setCurrentIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  }, [totalSlides, setCurrentIndex]);

  const goToSlide = useCallback(
    (index: number) => {
      setCurrentIndex(index);
    },
    [setCurrentIndex],
  );

  return { currentIndex, nextSlide, prevSlide, goToSlide };
};
