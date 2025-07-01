import type { IconProps } from "iconsax-react";
import type { FC } from "react";

interface Props extends IconProps {
  icon: FC<IconProps>;
}

function Icon({ icon: IconComponent, ...props }: Props) {
  return <IconComponent size={50} color="currentColor" {...props} />;
}

export default Icon;
