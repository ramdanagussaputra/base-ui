import { MultipleAvatar } from "massive-base-ui";

import { exampleSrcs } from "@/component/styleguide/avatars/multiple-avatar/data";
import StyleguideSubtitle from "@/component/styleguide/StyleguideSubtitle";

function MultipleAvatarSection() {
  return (
    <div className="space-y-5">
      <StyleguideSubtitle>Multiple Avatars</StyleguideSubtitle>

      <div className="flex flex-col gap-5">
        <MultipleAvatar srcs={exampleSrcs} size="small" />
        <MultipleAvatar srcs={exampleSrcs} size="medium" />
        <MultipleAvatar srcs={exampleSrcs} size="large" maxDisplayCount={1} />
      </div>
    </div>
  );
}

export default MultipleAvatarSection;
