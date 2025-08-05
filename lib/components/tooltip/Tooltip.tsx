import { ReactNode, useRef, useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

import { cn } from "#/utils";

// Constants
const OFFSET = 8;
const DEFAULT_TOOLTIP_HEIGHT = 30;
const POSITION_CALCULATION_DELAYS = [0, 10, 50];

interface TooltipProps {
  children: ReactNode;
  message: string;
  position?: "top" | "bottom" | "left" | "right";
  variant?: "default" | "without-tail";
  isPortal?: boolean;
  portalContainer?: Element | null;
}

export function Tooltip({
  children,
  message,
  position = "top",
  variant = "default",
  isPortal = true,
  portalContainer,
}: Readonly<TooltipProps>) {
  const triggerRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [portalTarget, setPortalTarget] = useState<Element | null>(null);

  // Initialize portal target
  useEffect(() => {
    if (isPortal) {
      const target =
        portalContainer ||
        (typeof document !== "undefined" ? document.body : null);
      setPortalTarget(target);
    }
  }, [isPortal, portalContainer]);

  // Calculate tooltip position for portal
  const calculatePosition = useCallback(() => {
    if (!triggerRef.current || !isPortal) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipHeight =
      position === "top" && tooltipRef.current
        ? tooltipRef.current.offsetHeight
        : DEFAULT_TOOLTIP_HEIGHT;

    const positions = {
      top: {
        top: triggerRect.top - OFFSET - tooltipHeight,
        left: triggerRect.left + triggerRect.width / 2,
      },
      bottom: {
        top: triggerRect.bottom + OFFSET,
        left: triggerRect.left + triggerRect.width / 2,
      },
      left: {
        top: triggerRect.top + triggerRect.height / 2,
        left: triggerRect.left - OFFSET,
      },
      right: {
        top: triggerRect.top + triggerRect.height / 2,
        left: triggerRect.left + triggerRect.width + OFFSET,
      },
    };

    setTooltipPosition(positions[position]);
  }, [isPortal, position]);

  // Get transform based on position
  const getTransform = (): string | undefined => {
    if (!isPortal) return undefined;

    const transforms = {
      top: "translateX(-50%)",
      bottom: "translateX(-50%)",
      left: "translate(-100%, -50%)",
      right: "translateY(-50%)",
    };

    return transforms[position];
  };

  const schedulePositionCalculation = () => {
    POSITION_CALCULATION_DELAYS.forEach((delay) => {
      setTimeout(() => calculatePosition(), delay);
    });
  };

  const handleMouseEnter = () => {
    setIsVisible(true);
    if (isPortal) {
      requestAnimationFrame(() => calculatePosition());
      schedulePositionCalculation();
    }
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  }; // Recalculate position on scroll/resize when using portal

  useEffect(() => {
    if (isPortal && isVisible) {
      const handleReposition = () => calculatePosition();

      window.addEventListener("scroll", handleReposition, true);
      window.addEventListener("resize", handleReposition);

      return () => {
        window.removeEventListener("scroll", handleReposition, true);
        window.removeEventListener("resize", handleReposition);
      };
    }
  }, [isPortal, isVisible, calculatePosition]);

  const getTooltipClasses = () => {
    const baseClasses =
      "bg-secondary-900 text-secondary-200 text-small-text-400 pointer-events-none z-[9999] w-max max-w-[13rem] rounded-sm p-2";

    if (isPortal) {
      return cn(baseClasses, "fixed");
    }

    const nonPortalClasses = {
      top: "absolute bottom-full left-1/2 mb-2 -translate-x-1/2",
      bottom: "absolute top-full left-1/2 mt-2 -translate-x-1/2",
      left: "absolute top-1/2 right-full mr-2 -translate-y-1/2",
      right: "absolute top-1/2 left-full ml-2 -translate-y-1/2",
    };

    return cn(baseClasses, nonPortalClasses[position]);
  };

  const getTailClasses = () => {
    const tailClasses = {
      top: "border-t-secondary-900 top-full left-1/2 -translate-x-1/2 border-t-[6px] border-r-[3px] border-l-[3px] border-r-transparent border-l-transparent",
      bottom:
        "border-b-secondary-900 bottom-full left-1/2 -translate-x-1/2 border-r-[3px] border-b-[6px] border-l-[3px] border-r-transparent border-l-transparent",
      left: "border-l-secondary-900 top-1/2 left-full -translate-y-1/2 border-t-[3px] border-b-[3px] border-l-[6px] border-t-transparent border-b-transparent",
      right:
        "border-r-secondary-900 top-1/2 right-full -translate-y-1/2 border-t-[3px] border-r-[6px] border-b-[3px] border-t-transparent border-b-transparent",
    };

    return cn("absolute h-0 w-0", tailClasses[position]);
  };

  const tooltipContent = (
    <div
      ref={tooltipRef}
      className={getTooltipClasses()}
      style={
        isPortal
          ? {
              top: `${tooltipPosition.top}px`,
              left: `${tooltipPosition.left}px`,
              transform: getTransform(),
            }
          : undefined
      }
    >
      {message}
      {variant === "default" && <div className={getTailClasses()} />}
    </div>
  );

  return (
    <span
      className="relative inline-block"
      ref={triggerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={0}
    >
      {children}

      {/* Render tooltip */}
      {isVisible &&
        isPortal &&
        portalTarget &&
        createPortal(tooltipContent, portalTarget)}
      {isVisible && !isPortal && tooltipContent}
    </span>
  );
}
