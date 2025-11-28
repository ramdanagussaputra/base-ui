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
        <Carousel className="w-full max-w-2xl h-96" autoPlay interval={1000} showArrows={false}>
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          ))}
        </Carousel>
      </div>

      <div className="space-y-5">
        <StyleguideSubtitle>Autoplay & No Dots</StyleguideSubtitle>
        <Carousel
          className="w-full max-w-2xl h-64"
          autoPlay
          interval={2000}
          showDots={false}
        >
          {images.map((_, index) => (
            <div
              key={index}
              className="w-full h-full flex items-center justify-center bg-gray-200 text-3xl font-bold text-gray-700"
            >
              Slide {index + 1}
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default CarouselExamples;
