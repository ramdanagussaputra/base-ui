import { SingleAvatar } from "massive-base-ui";
import StyleguideSubtitle from "@/component/styleguide/StyleguideSubtitle";

function SingleAvatarSection() {
  return (
    <div className="space-y-5">
      <StyleguideSubtitle>Single Avatars</StyleguideSubtitle>
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <SingleAvatar size="small" source="https://i.pravatar.cc/300" />
          <SingleAvatar size="medium" source="https://i.pravatar.cc/301" />
          <SingleAvatar size="large" source="https://i.pravatar.cc/302" />
        </div>

        <div className="flex items-center gap-3">
          <SingleAvatar size="small" />
          <SingleAvatar size="medium" />
          <SingleAvatar size="large" />
        </div>

        <div className="flex items-center gap-3">
          <SingleAvatar size="small" displayNumber={100} />
          <SingleAvatar size="medium" displayNumber={110} />
          <SingleAvatar size="large" displayNumber={120} />
        </div>
      </div>
    </div>
  );
}

export default SingleAvatarSection;
