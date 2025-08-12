import { useEffect, useRef } from "react";

interface UseOutsideClick {
  handler: () => void;
  listenCapturing?: boolean;
}
export function useOutsideClick({
  handler,
  listenCapturing = true,
}: UseOutsideClick) {
  const ref = useRef<null | HTMLDivElement>(null);

  useEffect(
    function () {
      function handleClick(event: MouseEvent) {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          handler();
        }
      }

      document.addEventListener("click", handleClick, listenCapturing);

      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [handler, listenCapturing],
  );

  return ref;
}
