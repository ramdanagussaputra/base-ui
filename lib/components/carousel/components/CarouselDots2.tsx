import { cn } from "#/utils";
import { useCarouselContext } from "../context/CarouselContext";

export const CarouselDots2 = () => {
  const { totalSlides, currentIndex, goToSlide } = useCarouselContext();

  return (
    <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2.5">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <button
          key={index}
          onClick={(e) => {
            e.stopPropagation();
            goToSlide(index);
          }}
          className={cn(
            "h-[0.3125rem] w-[1.583125rem] cursor-pointer rounded-full transition-all duration-300",
            currentIndex === index
              ? "bg-primary-600"
              : "bg-secondary-100 hover:bg-secondary-400",
          )}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
};
