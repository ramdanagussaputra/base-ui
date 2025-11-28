import { useEffect } from "react";

/**
 * Hook to manage autoplay functionality
 */
export const useAutoplay = (
  callback: () => void,
  delay: number,
  enabled: boolean,
  isPaused: boolean,
) => {
  useEffect(() => {
    if (!enabled || isPaused) return;
    const intervalId = setInterval(callback, delay);
    return () => clearInterval(intervalId);
  }, [callback, delay, enabled, isPaused]);
};
