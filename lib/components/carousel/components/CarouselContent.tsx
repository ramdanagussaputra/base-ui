import React, { useEffect } from "react";
import { cn } from "#/utils";
import { useCarouselContext } from "../context/CarouselContext";

interface CarouselContentProps {
  children: React.ReactNode;
  className?: string;
}

export const CarouselContent = ({
  children,
  className,
}: CarouselContentProps) => {
  const {
    containerRef,
    dragOffset,
    currentIndex,
    handlers,
    setIsHovered,
    setTotalSlides,
  } = useCarouselContext();

  const slides = React.Children.toArray(children);

  useEffect(() => {
    setTotalSlides(slides.length);
  }, [slides.length, setTotalSlides]);

  const containerWidth = containerRef.current?.offsetWidth || 0;
  const dragPercentage =
    containerWidth > 0 ? (dragOffset / containerWidth) * 100 : 0;
  const transform = `translateX(calc(-${currentIndex * 100}% + ${dragPercentage}%))`;

  return (
    <div
      className={cn("h-full overflow-hidden rounded-xl select-none", className)}
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        handlers.onMouseLeave();
      }}
      onTouchStart={handlers.onTouchStart}
      onTouchMove={handlers.onTouchMove}
      onTouchEnd={handlers.onTouchEnd}
      onMouseDown={handlers.onMouseDown}
      onMouseMove={handlers.onMouseMove}
      onMouseUp={handlers.onMouseUp}
    >
      <div
        className={cn(
          "flex h-full",
          dragOffset === 0 && "transition-transform duration-500 ease-out",
        )}
        style={{ transform }}
      >
        {slides.map((child, index) => (
          <div key={index} className="h-full w-full flex-shrink-0">
            {/* Prevent image dragging default behavior */}
            {React.isValidElement(child) && child.type === "img"
              ? React.cloneElement(child as React.ReactElement<any>, {
                  draggable: false,
                })
              : child}
          </div>
        ))}
      </div>
    </div>
  );
};
