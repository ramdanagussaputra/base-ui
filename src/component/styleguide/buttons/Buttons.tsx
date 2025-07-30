import StyleguideGroup from "@/component/styleguide/StyleguideGroup";
import StyleguideTitle from "@/component/styleguide/StyleguideTitle";
import ButtonTypes from "@/component/styleguide/buttons/ButtonTypes";
import DropdownButtons from "@/component/styleguide/buttons/DropdownButtons";

import {
  solidButtonConfigs,
  lightButtonConfigs,
  noBGButtonConfigs,
  linkButtonConfigs,
  outlineButtonConfigs,
} from "@/component/styleguide/buttons/data";

function Buttons() {
  return (
    <StyleguideGroup>
      <StyleguideTitle>Buttons</StyleguideTitle>

      <div className="grid grid-cols-2 gap-10">
        <ButtonTypes buttonConfigs={solidButtonConfigs} subtitle="Solid" />
        <ButtonTypes buttonConfigs={lightButtonConfigs} subtitle="Light" />
        <ButtonTypes
          buttonConfigs={noBGButtonConfigs}
          subtitle="No Background"
        />
        <ButtonTypes buttonConfigs={outlineButtonConfigs} subtitle="Outline" />
        <ButtonTypes buttonConfigs={linkButtonConfigs} subtitle="Link" />
      </div>
      
      <div className="mt-10">
        <DropdownButtons />
      </div>
    </StyleguideGroup>
  );
}

export default Buttons;
