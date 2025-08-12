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
      </div>
    </StyleguideGroup>
  );
}

export default Avatars;
