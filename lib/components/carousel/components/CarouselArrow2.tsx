import { ArrowLeft, ArrowRight } from "iconsax-react";
import { cn } from "#/utils";
import { Button } from "#/components/button/Button";
import Icon from "#/components/icon/Icon";
import { useCarouselContext } from "../context/CarouselContext";

interface CarouselArrow2Props {
  direction: "left" | "right";
}

export const CarouselArrow2 = ({ direction }: CarouselArrow2Props) => {
  const { nextSlide, prevSlide } = useCarouselContext();
  const isLeft = direction === "left";
  const IconComponent = isLeft ? ArrowLeft : ArrowRight;
  const positionClass = isLeft ? "left-4" : "right-4";
  const onClick = isLeft ? prevSlide : nextSlide;

  return (
    <div
      className={cn(
        "bg-neutral-0 absolute top-1/2 -translate-y-1/2 rounded-full duration-300",
        positionClass,
      )}
    >
      <Button
        variant="outline"
        color="secondary"
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        className="!h-auto !min-w-0 rounded-full !p-[1.230625rem]"
      >
        <Icon icon={IconComponent} className="size-[1.53875rem]" />
      </Button>
    </div>
  );
};
