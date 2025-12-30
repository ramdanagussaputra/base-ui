import {
  Button,
  CarouselLanding,
  DiscoverCatalogueLanding,
  HeaderLanding,
  ListItemLanding,
  DiscoverSearchOption,
  TableOfContent,
} from "massive-base-ui";
import { useState } from "react";
import { SingleValue } from "react-select";

import StyleguideGroup from "@/component/styleguide/StyleguideGroup";
import StyleguideSubtitle from "@/component/styleguide/StyleguideSubtitle";
import { useNavigate } from "react-router";
import TopItem from "#/components/landing/list-item/components/TopItem";

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
  {
    title: "Song Title 3",
    description: "Performer Name",
    additionalInformation: "Additional Information",
    image: {
      src: "https://i.pravatar.cc/300",
      alt: "Performer Name",
      shape: "string" as any,
    },
  },
  {
    title: "Song Title 4",
    description: "Performer Name",
    additionalInformation: "Additional Information",
    image: {
      src: "https://i.pravatar.cc/300",
      alt: "Performer Name",
      shape: "square" as any,
    },
  },
];

const tableOfContents: Array<{
  groupTitle?: string;
  list: Array<{ title: string; href: string }>;
}> = [
  {
    list: [
      { title: "Introduction", href: "#introduction" },
      { title: "General Terms", href: "#general-terms" },
      { title: "Use of Site, Application, and Services", href: "#use-of-site" },
      { title: "Signing-up and Signing-in", href: "#signing-up-signing-in" },
      { title: "Rate and Fees", href: "#rate-and-fees" },
      {
        title: "Content Information and Accuracy",
        href: "#content-information",
      },
      { title: "Personal Information", href: "#personal-information" },
      { title: "Application Software", href: "#application-software" },
    ],
  },
  {
    groupTitle: "What We Expect From You",
    list: [
      { title: "Your Account", href: "#your-account" },
      { title: "Account Deactivation", href: "#account-deactivation" },
      { title: "Your Statement", href: "#your-statement" },
      { title: "Your Responsibility", href: "#your-responsibility" },
    ],
  },
  {
    groupTitle: "Intellectual Property Terms",
    list: [
      { title: "Intellectual Property", href: "#intellectual-property" },
      { title: "Troubleshoot", href: "#troubleshoot" },
      {
        title: "Actions We Consider Necessary",
        href: "#actions-we-consider-necessary",
      },
      { title: "Force Majeure", href: "#force-majeure" },
      { title: "Governing Laws", href: "#governing-laws" },
      { title: "Dispute", href: "#dispute" },
      { title: "Miscellaneous", href: "#miscellaneous" },
      { title: "Contact Us", href: "#contact-us" },
    ],
  },
];

function LandingComponent() {
  const maxPage = 3;
  const [page, setPage] = useState(1);
  const [activeItem, setActiveItem] = useState(0);
  const [searchValue, setSearchValue] =
    useState<SingleValue<DiscoverSearchOption>>(null);

  const navigate = useNavigate();

  const loadOptions = async (
    inputValue: string,
  ): Promise<DiscoverSearchOption[]> => {
    if (!inputValue) return [];
    // Mock data
    const options: DiscoverSearchOption[] = [
      {
        value: "1",
        label: "Monokrom",
        secondLabel: "Tulus",
        imageUrl: null,
        type: "song",
        onClick: () => navigate("/discover/catalogue?song=1"),
      },
      {
        value: "2",
        label: "Monokrom",
        secondLabel: "RAN",
        // imageUrl:
        //   "https://i.scdn.co/image/ab67616d0000b2736d6a0a2d7e0a3a0a2d7e0a3a",
        type: "song",
        onClick: () => navigate("/discover/catalogue?song=2"),
      },
      {
        value: "3",
        label: "Monokrom",
        secondLabel: "Songwriter",
        type: "songwriter",
        onClick: () => navigate("/discover/catalogue?composer=1"),
      },
    ];

    return options.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase()),
    );
  };

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
            <ListItemLanding.Searchbar
              value={""}
              onChange={() => {}}
              placeholder="Discover"
            />
            <ListItemLanding.Item.Container>
              {items.map((item, index) => {
                if (index === 0) {
                  return <TopItem {...item} number={index + 1} />;
                }
                return (
                  <ListItemLanding.Item.Content
                    key={index}
                    title={item.title}
                    description={item.description}
                    additionalInformation={item.additionalInformation}
                    image={item.image}
                    number={index + 1}
                    rightContent="spotify-icon"
                  />
                );
              })}
            </ListItemLanding.Item.Container>
            <ListItemLanding.PaginationIndicator />
          </ListItemLanding>
        </div>
      </div>

      <HeaderLanding />
      <DiscoverCatalogueLanding
        title="Catalogue"
        subtitle="Discover Our"
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        loadOptions={loadOptions}
        onSearchEnter={(value) => console.log("Search entered:", value)}
        onSearchInputChange={(value) => console.log(value)}
      />

      <TableOfContent items={tableOfContents} />
    </StyleguideGroup>
  );
}

export default LandingComponent;
