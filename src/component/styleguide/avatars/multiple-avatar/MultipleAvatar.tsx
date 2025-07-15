import { MultipleAvatar } from "massive-base-ui";

import StyleguideSubtitle from "@/component/styleguide/StyleguideSubtitle";

const exampleSrcs = [
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
  {
    src: "https://i.pravatar.cc/303",
    alt: "Avatar 4",
  },
  {
    src: "https://i.pravatar.cc/304",
    alt: "Avatar 5",
  },
  {
    src: "https://i.pravatar.cc/305",
    alt: "Avatar 6",
  },
  {
    src: "https://i.pravatar.cc/306",
    alt: "Avatar 7",
  },
  {
    src: "https://i.pravatar.cc/307",
    alt: "Avatar 8",
  },
];

function MultipleAvatarSection() {
  return (
    <div className="space-y-5">
      <StyleguideSubtitle>Multiple Avatars</StyleguideSubtitle>

      <div className="flex flex-col gap-5">
        <MultipleAvatar srcs={exampleSrcs} size="small" />
        <MultipleAvatar srcs={exampleSrcs} size="medium" />
        <MultipleAvatar srcs={exampleSrcs} size="large" />
      </div>
    </div>
  );
}

export default MultipleAvatarSection;
