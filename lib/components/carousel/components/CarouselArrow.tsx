import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
import { cn } from "#/utils";
import { Button } from "#/components/button/Button";
import Icon from "#/components/icon/Icon";
import { useCarouselContext } from "../context/CarouselContext";

interface CarouselArrowProps {
  direction: "left" | "right";
}

export const CarouselArrow = ({ direction }: CarouselArrowProps) => {
  const { nextSlide, prevSlide } = useCarouselContext();
  const isLeft = direction === "left";
  const IconComponent = isLeft ? ArrowLeft2 : ArrowRight2;
  const positionClass = isLeft ? "left-4" : "right-4";
  const onClick = isLeft ? prevSlide : nextSlide;

  return (
    <div
      className={cn(
        "absolute top-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100",
        positionClass,
      )}
    >
      <Button
        variant="light"
        color="secondary"
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        className="!h-auto !min-w-0 rounded-full !p-2"
      >
        <Icon icon={IconComponent} size={20} />
      </Button>
    </div>
  );
};
