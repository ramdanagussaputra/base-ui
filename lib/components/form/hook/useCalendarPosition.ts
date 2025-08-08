import { useState, RefObject, useLayoutEffect } from "react";

interface UseCalendarPositionProps {
  isOpen: boolean;
  triggerRef: RefObject<HTMLElement | null>;
  calendarHeight?: number;
}

interface CalendarPosition {
  openUpward: boolean;
  position: {
    top?: string;
    bottom?: string;
  };
}

export const useCalendarPosition = ({
  isOpen,
  triggerRef,
  calendarHeight = 320,
}: UseCalendarPositionProps): CalendarPosition => {
  const [position, setPosition] = useState<CalendarPosition>({
    openUpward: false,
    position: { top: "100%" },
  });

  useLayoutEffect(() => {
    if (!isOpen || !triggerRef.current) return;

    const calculatePosition = () => {
      const triggerElement = triggerRef.current;
      if (!triggerElement) return;

      const triggerRect = triggerElement.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Calculate available space below and above the trigger
      const spaceBelow = viewportHeight - triggerRect.bottom;
      const spaceAbove = triggerRect.top;

      // Add some padding for better UX
      const padding = 16;
      const requiredSpace = calendarHeight + padding;

      // Determine if calendar should open upward
      const hasEnoughSpaceBelow = spaceBelow >= requiredSpace;
      const hasEnoughSpaceAbove = spaceAbove >= requiredSpace;

      const shouldOpenUpward = !hasEnoughSpaceBelow && hasEnoughSpaceAbove;

      if (shouldOpenUpward) {
        setPosition({
          openUpward: true,
          position: {
            bottom: "100%",
            top: undefined,
          },
        });
      } else {
        setPosition({
          openUpward: false,
          position: {
            top: "100%",
            bottom: undefined,
          },
        });
      }
    };

    // Calculate initial position
    calculatePosition();
  }, [isOpen, triggerRef, calendarHeight]);

  return position;
};
