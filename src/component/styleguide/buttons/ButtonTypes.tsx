import { Button } from "massive-base-ui";
import { AddSquare } from "iconsax-react";

import StyleguideSubtitle from "@/component/styleguide/StyleguideSubtitle";

interface ButtonTypesProps {
  buttonConfigs: {
    size: "large" | "medium" | "small" | "extra-small";
    color: "primary" | "secondary" | "error";
    variant: "solid" | "light" | "no-background" | "outline" | "link";
    isDisabled: boolean;
    isLoading: boolean;
  }[];
  subtitle: string;
}

function ButtonTypes({ buttonConfigs, subtitle }: Readonly<ButtonTypesProps>) {
  return (
    <div className="space-y-5">
      <StyleguideSubtitle>{subtitle}</StyleguideSubtitle>

      <div className="grid grid-cols-4 items-center gap-2">
        {buttonConfigs.map((config) => (
          <Button
            key={`${config.size}-${config.color}-${config.variant}`}
            size={config.size}
            color={config.color}
            variant={config.variant}
            isDisabled={config.isDisabled}
            isLoading={config.isLoading}
          >
            {config.size === "large" && (
              <Button.Icon>
                <AddSquare />
              </Button.Icon>
            )}
            Button
          </Button>
        ))}
      </div>
    </div>
  );
}

export default ButtonTypes;
