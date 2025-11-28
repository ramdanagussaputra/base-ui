import BadgesTags from "@/component/styleguide/badges-tags/BadgesTags";
import Buttons from "@/component/styleguide/buttons/Buttons";
import Colors from "@/component/styleguide/colors/Colors";
import Fonts from "@/component/styleguide/fonts/Fonts";
import Forms from "@/component/styleguide/forms/Forms";
import FormSelects from "@/component/styleguide/form-selects/FormSelects";
import Navigation from "@/component/styleguide/navigations/Navigations";
import Tooltips from "@/component/styleguide/tooltip/Tooltips";
import MessageBoxes from "@/component/styleguide/messagebox/MessageBoxes";
import Avatars from "@/component/styleguide/avatars/Avatars";
import Accordion from "@/component/styleguide/accordion/Accordion";
<<<<<<< HEAD
import CardSlider from "@/component/styleguide/card-slider/CardSlider";
=======
import Carousels from "@/component/styleguide/carousel/Carousels";
>>>>>>> f034c8dc1e8dd505d069cad2ee594fbeb8b04a5b

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
        <Tooltips />
        <Forms />
        <FormSelects />
        <Navigation />
        <MessageBoxes />
        <Avatars />
        <Accordion />
<<<<<<< HEAD
        <CardSlider />
=======
        <Carousels />
>>>>>>> f034c8dc1e8dd505d069cad2ee594fbeb8b04a5b
      </div>
    </section>
  );
}

export default StyleguidePage;
