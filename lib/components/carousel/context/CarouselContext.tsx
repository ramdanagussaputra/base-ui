import React, { createContext, useContext } from "react";

export interface CarouselContextType {
  currentIndex: number;
  totalSlides: number;
  nextSlide: () => void;
  prevSlide: () => void;
  goToSlide: (index: number) => void;
  isDragging: boolean;
  dragOffset: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
  handlers: {
    onTouchStart: (e: React.TouchEvent) => void;
    onTouchMove: (e: React.TouchEvent) => void;
    onTouchEnd: () => void;
    onMouseDown: (e: React.MouseEvent) => void;
    onMouseMove: (e: React.MouseEvent) => void;
    onMouseUp: (e: React.MouseEvent) => void;
    onMouseLeave: () => void;
  };
  setIsHovered: (hovered: boolean) => void;
  setTotalSlides: (count: number) => void;
}

const CarouselContext = createContext<CarouselContextType | null>(null);

export const useCarouselContext = () => {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarouselContext must be used within a Carousel");
  }
  return context;
};

export const CarouselProvider = CarouselContext.Provider;
