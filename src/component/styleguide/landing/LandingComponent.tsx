import {
  Button,
  CarouselLanding,
  DiscoverCatalogueLanding,
  HeaderLanding,
  ListItemLanding,
} from "massive-base-ui";
import { useState } from "react";

import StyleguideGroup from "@/component/styleguide/StyleguideGroup";
import StyleguideSubtitle from "@/component/styleguide/StyleguideSubtitle";

const images = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
];

const items = [
  {
    title: "Song Title",
    description: "Performer Name",
    additionalInformation: "Additional Information",
    image: {
      src: "https://i.pravatar.cc/300",
      alt: "Performer Name",
      shape: "square" as any,
    },
  },
  {
    title: "Song Title 2",
    description: "Performer Name",
    additionalInformation: "Additional Information",
    image: {
      src: "https://i.pravatar.cc/300",
      alt: "Performer Name",
      shape: "rounded" as any,
    },
  },
];

function LandingComponent() {
  const maxPage = 3;
  const [page, setPage] = useState(1);
  const [activeItem, setActiveItem] = useState(0);
  return (
    <StyleguideGroup>
      <StyleguideSubtitle>Landing Component</StyleguideSubtitle>
      <div className="flex flex-col gap-4">
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
          disableDrag
        />
        <div className="flex items-center gap-5">
          <Button onClick={() => setActiveItem(0)}>Go To Slide 1</Button>
          <Button onClick={() => setActiveItem(1)}>Go To Slide 2</Button>
          <Button onClick={() => setActiveItem(2)}>Go To Slide 3</Button>
        </div>
        <div>Current Active Slide: {activeItem + 1}</div>

        <div className="flex flex-col gap-3">
          <ListItemLanding
            title="Song Title"
            description="Performer Name"
            currentPage={page}
            maxPage={maxPage}
            handlePrevPage={() => setPage((p) => Math.max(1, p - 1))}
            handleNextPage={() => setPage((p) => Math.min(maxPage, p + 1))}
          >
            <ListItemLanding.Header>
              {/* <ListItemLanding.Header.ViewAllAction onClick={() => {}} /> */}
              <ListItemLanding.Header.PaginationControl />
            </ListItemLanding.Header>
            <ListItemLanding.Item.Container>
              {items.map((item, index) => (
                <ListItemLanding.Item.Content
                  key={index}
                  title={item.title}
                  description={item.description}
                  additionalInformation={item.additionalInformation}
                  image={item.image}
                  isLastItem={index === items.length - 1}
                  rightContent={index === 0 && "spotify-icon"}
                />
              ))}
            </ListItemLanding.Item.Container>
            <ListItemLanding.PaginationIndicator />
          </ListItemLanding>
          <p>{page}</p>
        </div>
      </div>

      <HeaderLanding />
      <DiscoverCatalogueLanding title="Catalogue" />
    </StyleguideGroup>
  );
}

export default LandingComponent;
