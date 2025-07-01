import { Breadcrumb } from "massive-base-ui";
import { ArrowRight2 } from "iconsax-react";
import Icon from "#/components/icon/Icon";

import StyleguideSubtitle from "@/component/styleguide/StyleguideSubtitle";

function Breadcrumbs() {
  return (
    <div className="space-y-5">
      <StyleguideSubtitle>Breadcrumbs</StyleguideSubtitle>

      <Breadcrumb
        navigateFunction={() => {}}
        urlPath="/overview/item/item/last-item"
        breadcrumbSeparator={<Icon icon={ArrowRight2} />}
      />
    </div>
  );
}

export default Breadcrumbs;
