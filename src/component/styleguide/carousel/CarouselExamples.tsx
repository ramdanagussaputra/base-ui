import { Carousel } from "massive-base-ui";
import StyleguideSubtitle from "@/component/styleguide/StyleguideSubtitle";

function CarouselExamples() {
  const images = [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  ];

  return (
    <div className="space-y-10">
      <div className="space-y-5">
        <StyleguideSubtitle>Basic Carousel</StyleguideSubtitle>
        <Carousel className="h-96 w-full max-w-2xl">
          <Carousel.Content>
            {images.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Slide ${index + 1}`}
                className="h-full w-full object-cover"
              />
            ))}
          </Carousel.Content>
          <Carousel.Arrow2 direction="left" />
          <Carousel.Arrow2 direction="right" />
          <Carousel.Dots2 />
        </Carousel>
      </div>

      <div className="space-y-5">
        <StyleguideSubtitle>Autoplay & No Dots</StyleguideSubtitle>
        <Carousel className="h-64 w-full max-w-2xl" autoPlay interval={2000}>
          <Carousel.Content>
            {images.map((_, index) => (
              <div
                key={index}
                className="text-primary-300 bg-secondary-400 flex h-full w-full items-center justify-center text-3xl font-bold"
              >
                Slide {index + 1}
              </div>
            ))}
          </Carousel.Content>
          <Carousel.Arrow direction="left" />
          <Carousel.Arrow direction="right" />
        </Carousel>
      </div>
    </div>
  );
}

export default CarouselExamples;
