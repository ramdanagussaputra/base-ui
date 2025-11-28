import React, { useState, useEffect, useCallback } from "react";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
import { cn } from "#/utils";
import { Button } from "#/components/button/Button";
import Icon from "#/components/icon/Icon";

export interface CarouselProps {
  children: React.ReactNode[];
  className?: string;
  showArrows?: boolean;
  showDots?: boolean;
  autoPlay?: boolean;
  interval?: number;
}

export function Carousel({
  children,
  className,
  showArrows = true,
  showDots = true,
  autoPlay = false,
  interval = 3000,
}: Readonly<CarouselProps>) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === React.Children.count(children) - 1 ? 0 : prevIndex + 1
    );
  }, [children]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? React.Children.count(children) - 1 : prevIndex - 1
    );
  }, [children]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (autoPlay && !isHovered) {
      intervalId = setInterval(nextSlide, interval);
    }
    return () => clearInterval(intervalId);
  }, [autoPlay, interval, isHovered, nextSlide]);

  return (
    <div
      className={cn("relative w-full group h-96", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="overflow-hidden rounded-xl h-full">
        <div
          className="flex transition-transform duration-500 ease-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {React.Children.map(children, (child) => (
            <div className="w-full flex-shrink-0 h-full">{child}</div>
          ))}
        </div>
      </div>

      {showArrows && (
        <>
          <div className="absolute top-1/2 left-4 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              variant="light"
              color="secondary"
              size="small"
              onClick={prevSlide}
              className="rounded-full !p-2 !h-auto !min-w-0"
            >
              <Icon icon={ArrowLeft2} size={20} />
            </Button>
          </div>
          <div className="absolute top-1/2 right-4 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              variant="light"
              color="secondary"
              size="small"
              onClick={nextSlide}
              className="rounded-full !p-2 !h-auto !min-w-0"
            >
              <Icon icon={ArrowRight2} size={20} />
            </Button>
          </div>
        </>
      )}

      {showDots && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 items-center">
          {React.Children.map(children, (_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "rounded-full transition-all duration-300 cursor-pointer",
                currentIndex === index
                  ? "bg-secondary-400 w-8 h-2.5"
                  : "bg-secondary-300 w-2.5 h-2.5 hover:bg-secondary-400"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
