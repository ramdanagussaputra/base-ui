import { forwardRef, ReactNode } from "react";
import { cn } from "#/utils";
import composyncLogo from "#/components/landing/header/assets/composync.svg";

interface HeaderLandingProps {
  className?: string;
  brandLogo?: string;
  children?: ReactNode;
  brandRedirect?: () => void;
}

const HeaderLanding = forwardRef<HTMLElement, HeaderLandingProps>(
  (
    {
      className,
      brandLogo = composyncLogo,
      children,
      brandRedirect = () => {},
    },
    ref,
  ) => {
    return (
      <header
        ref={ref}
        className={cn(
          `flex h-[5.5rem] w-full max-w-375 items-center justify-between`,
          className,
        )}
      >
        <button onClick={brandRedirect}>
          <img
            src={brandLogo}
            alt="Brand Logo"
            className="h-[1.5rem] w-[13.740625rem]"
          />
        </button>

        {children}
      </header>
    );
  },
);

HeaderLanding.displayName = "HeaderLanding";

export default HeaderLanding;
