import { useState } from "react";

import { Button } from "#/components";
import CarouselLanding from "#/components/landing/Carousel/Carousel";
import StyleguideGroup from "@/component/styleguide/StyleguideGroup";
import StyleguideTitle from "@/component/styleguide/StyleguideTitle";
import CarouselExamples from "./CarouselExamples";

const images = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
];

function Carousels() {
  const [activeItem, setActiveItem] = useState(0);

  return (
    <StyleguideGroup>
      <StyleguideTitle>Carousel</StyleguideTitle>
      <CarouselExamples />
      <CarouselLanding
        title="Song Title"
        performerImg="https://i.pravatar.cc/300"
        performerName="Performer Name"
        totalStreams={1000000}
        actionButton={<Button>Request License</Button>}
        images={images}
        activeItem={activeItem}
        onItemChange={setActiveItem}
        withoutArrow
        withoutDot
      />
      <div className="flex items-center gap-5">
        <Button onClick={() => setActiveItem(0)}>Go To Slide 1</Button>
        <Button onClick={() => setActiveItem(1)}>Go To Slide 2</Button>
        <Button onClick={() => setActiveItem(2)}>Go To Slide 3</Button>
      </div>
      <div>Current Active Slide: {activeItem + 1}</div>
    </StyleguideGroup>
  );
}

export default Carousels;
