import { forwardRef, ReactNode } from "react";
import { cn } from "#/utils";
import composyncLogo from "#/components/landing/header/assets/composync.svg";

interface HeaderLandingProps {
  className?: string;
  brandLogo?: string;
  children?: ReactNode;
}

const HeaderLanding = forwardRef<HTMLElement, HeaderLandingProps>(
  ({ className, brandLogo = composyncLogo, children }, ref) => {
    return (
      <header
        ref={ref}
        className={cn(
          `flex h-[5.5rem] w-full items-center justify-between`,
          className,
        )}
      >
        <img
          src={brandLogo}
          alt="Brand Logo"
          className="h-[1.5rem] w-[13.740625rem]"
        />

        {children}
      </header>
    );
  },
);

HeaderLanding.displayName = "HeaderLanding";

export default HeaderLanding;
