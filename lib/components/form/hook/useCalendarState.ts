import { useEffect, useState } from "react";

import { useOutsideClick } from "#/hook/useOutsideClick";

export const useCalendarState = () => {
  const [open, setOpen] = useState(false);

  const calendarRef = useOutsideClick({
    handler: () => setOpen(false),
  });

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return { open, setOpen, calendarRef };
};
