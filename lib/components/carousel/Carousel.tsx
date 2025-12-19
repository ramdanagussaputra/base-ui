import React, { useState, useRef } from "react";
import { cn } from "#/utils";
import { useCarouselNavigation } from "./hooks/useCarouselNavigation";
import { useAutoplay } from "./hooks/useAutoplay";
import { useCarouselDrag } from "./hooks/useCarouselDrag";
import { CarouselProvider } from "./context/CarouselContext";
import { CarouselContent } from "./components/CarouselContent";
import { CarouselArrow } from "./components/CarouselArrow";
import { CarouselDots } from "./components/CarouselDots";

export interface CarouselProps {
  children: React.ReactNode;
  className?: string;
  autoPlay?: boolean;
  interval?: number;
  activeItem?: number;
  onItemChange?: (index: number) => void;
}

function CarouselRoot({
  children,
  className,
  autoPlay = false,
  interval = 3000,
  activeItem,
  onItemChange,
}: Readonly<CarouselProps>) {
  const [totalSlides, setTotalSlides] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const { currentIndex, nextSlide, prevSlide, goToSlide } =
    useCarouselNavigation(totalSlides, activeItem, onItemChange);

  const { isDragging, dragOffset, handlers } = useCarouselDrag(
    nextSlide,
    prevSlide,
    containerRef,
  );

  // Pause autoplay on hover or drag
  useAutoplay(nextSlide, interval, autoPlay, isHovered || isDragging);

  return (
    <CarouselProvider
      value={{
        currentIndex,
        totalSlides,
        nextSlide,
        prevSlide,
        goToSlide,
        isDragging,
        dragOffset,
        containerRef,
        handlers,
        setIsHovered,
        setTotalSlides,
      }}
    >
      <div className={cn("group relative h-96 w-full", className)}>
        {children}
      </div>
    </CarouselProvider>
  );
}

type CarouselComponent = (props: CarouselProps) => React.ReactElement;

export const Carousel: CarouselComponent & {
  Content: typeof CarouselContent;
  Arrow: typeof CarouselArrow;
  Dots: typeof CarouselDots;
} = Object.assign(CarouselRoot as unknown as CarouselComponent, {
  Content: CarouselContent,
  Arrow: CarouselArrow,
  Dots: CarouselDots,
});
