import { Carousel } from "#/components/carousel";
import { cn } from "#/utils";

interface CarouselLandingProps {
  title: string;
  performerImg: string;
  performerName: string;
  totalStreams: number;
  images: string[];
  actionButton?: React.ReactNode;
  autoPlay?: boolean;
  interval?: number;
  activeItem?: number;
  onItemChange?: (index: number) => void;
  withoutArrow?: boolean;
  withoutDot?: boolean;
  disableDrag?: boolean;
  className?: string;
  cardClassName?: string;
}

export default function CarouselLanding({
  title,
  performerImg,
  performerName,
  totalStreams,
  actionButton,
  autoPlay = false,
  interval = 3000,
  images,
  activeItem,
  onItemChange,
  withoutArrow = false,
  withoutDot = false,
  disableDrag = false,
  className,
  cardClassName,
}: CarouselLandingProps) {
  const formatTotalStreams =
    totalStreams !== null && totalStreams !== undefined
      ? totalStreams.toLocaleString()
      : "-";

  return (
    <div
      className={cn(
        "bg-neutral-0 border-secondary-100 flex flex-col rounded-xl border",
        cardClassName,
      )}
    >
      <Carousel
        autoPlay={autoPlay}
        interval={interval}
        activeItem={activeItem}
        onItemChange={onItemChange}
        disableDrag={disableDrag}
        className={className}
      >
        <Carousel.Content className="rounded-b-none">
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Slide ${index + 1}`}
              className="h-full w-full object-cover"
            />
          ))}
        </Carousel.Content>
        {!withoutArrow && <Carousel.Arrow direction="left" />}
        {!withoutArrow && <Carousel.Arrow direction="right" />}
        {!withoutDot && <Carousel.Dots />}
      </Carousel>
      <div className="flex flex-col gap-[2rem] p-5">
        <div className="flex flex-col gap-3">
          <span className="text-h5-600 text-secondary-900">{title}</span>
          <div className="flex items-center gap-3">
            <img
              src={performerImg}
              alt={performerName}
              className="size-9 rounded-full object-cover object-center"
            />
            <span className="text-b2-400 text-secondary-500 truncate leading-none">
              {performerName}
            </span>
            <span className="bg-secondary-500 size-1 shrink-0 rounded-full" />
            <span className="text-b2-400 text-secondary-500 shrink-0 leading-none">
              {formatTotalStreams} streams
            </span>
          </div>
        </div>

        {actionButton}
      </div>
    </div>
  );
}
