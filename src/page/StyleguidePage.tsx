import BadgesTags from "@/component/styleguide/badges-tags/BadgesTags";
import Buttons from "@/component/styleguide/buttons/Buttons";
import Colors from "@/component/styleguide/colors/Colors";
import Fonts from "@/component/styleguide/fonts/Fonts";

function StyleguidePage() {
  return (
    <section className="px-14 py-5">
      <h1 className="text-h1-700 text-primary-600 mb-8">
        Style<span className="text-neutral-950">guide</span>
      </h1>

      <div className="flex flex-col gap-14">
        <Colors />
        <Fonts />
        <Buttons />
        <BadgesTags />
      </div>
    </section>
  );
}

export default StyleguidePage;
