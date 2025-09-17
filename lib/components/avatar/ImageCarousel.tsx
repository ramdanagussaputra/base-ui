import { cn } from "#/utils";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
import { useState } from "react";

import Icon from "#/components/icon/Icon";

interface ImageCarouselProps {
  images: {
    src: string;
    alt: string;
  }[];
  className?: string;
  sliderClassName?: string;
}

export function ImageCarousel({
  images,
  className,
  sliderClassName,
}: Readonly<ImageCarouselProps>) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    );
  };
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl",
        !className && "h-20 w-20",
        className,
      )}
    >
      <div
        className="flex transition-transform duration-300 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <img
            src={image.src}
            alt={image.alt}
            className="h-full w-full flex-shrink-0 object-cover"
            key={`${index}-${image.alt ?? "carousel"}`}
          />
        ))}
      </div>

      <button
        type="button"
        className="absolute top-0 left-0 z-10 flex h-full cursor-pointer items-center"
        onClick={goToPrevious}
      >
        <Icon
          icon={ArrowLeft2}
          className={cn(
            "h-6 w-6 cursor-pointer text-[#FBFBFB]",
            sliderClassName,
          )}
        />
      </button>

      <button
        type="button"
        className="absolute top-0 right-0 z-10 flex h-full cursor-pointer items-center"
        onClick={goToNext}
      >
        <Icon
          icon={ArrowRight2}
          className={cn("h-6 w-6 text-[#FBFBFB]", sliderClassName)}
        />
      </button>
    </div>
  );
}
