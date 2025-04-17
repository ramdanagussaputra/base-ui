import StyleguideGroup from "@/component/styleguide/StyleguideGroup";
import StyleguideTitle from "@/component/styleguide/StyleguideTitle";
import Stepper from "@/component/styleguide/navigations/stepper/Stepper";
import Tabs from "@/component/styleguide/navigations/tabs/Tabs";
import Breadcrumbs from "@/component/styleguide/navigations/breadcrumbs/Breadcrumbs";

function Navigation() {
  return (
    <StyleguideGroup>
      <StyleguideTitle>Navigations</StyleguideTitle>

      <Stepper />

      <div className="grid grid-cols-2 gap-10">
        <Tabs />
        <Breadcrumbs />
      </div>
    </StyleguideGroup>
  );
}

export default Navigation;
