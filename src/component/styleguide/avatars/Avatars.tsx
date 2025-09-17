import { ImageCarousel } from "massive-base-ui";
import StyleguideGroup from "@/component/styleguide/StyleguideGroup";
import StyleguideTitle from "@/component/styleguide/StyleguideTitle";
import MultipleAvatarSection from "@/component/styleguide/avatars/multiple-avatar/MultipleAvatar";
import SingleAvatarSection from "@/component/styleguide/avatars/single-avatar/SingleAvatar";

function Avatars() {
  return (
    <StyleguideGroup>
      <StyleguideTitle>Avatars</StyleguideTitle>

      <div className="grid grid-cols-2 gap-8">
        <SingleAvatarSection />
        <MultipleAvatarSection />
        <ImageCarousel
          images={[
            {
              src: "https://i.pravatar.cc/300",
              alt: "Avatar 1",
            },
            {
              src: "https://i.pravatar.cc/301",
              alt: "Avatar 2",
            },
            {
              src: "https://i.pravatar.cc/302",
              alt: "Avatar 3",
            },
          ]}
        />
      </div>
    </StyleguideGroup>
  );
}

export default Avatars;
