import React from "react";
import { cn } from "#/utils";
import { useCarouselContext } from "../context/CarouselContext";

export const CarouselDots = () => {
  const { totalSlides, currentIndex, goToSlide } = useCarouselContext();

  return (
    <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <button
          key={index}
          onClick={(e) => {
            e.stopPropagation();
            goToSlide(index);
          }}
          className={cn(
            "cursor-pointer rounded-full transition-all duration-300",
            currentIndex === index
              ? "bg-secondary-400 h-2.5 w-8"
              : "bg-secondary-300 hover:bg-secondary-400 h-2.5 w-2.5",
          )}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
};
