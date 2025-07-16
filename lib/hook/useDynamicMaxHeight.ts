import { useLayoutEffect, useState, useCallback } from "react";

/**
 * Calculate the total height of elements from their refs
 */
function getElementsTotalHeight(elements: React.RefObject<HTMLElement | null>[]): number {
  return elements.reduce((total, elementRef) => {
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      return total + rect.height;
    }
    return total;
  }, 0);
}

/**
 * A hook to dynamically calculate the maximum height for a container element.
 * It subtracts the height of specified elements and an offset from the viewport height.
 *
 * @param containerRef - A React ref to the container element whose max-height will be set.
 * @param elementsToSubtract - An array of React refs to elements whose height should be subtracted from the available space.
 * @param offset - An additional offset to subtract from the available height.
 * @returns The calculated maximum height in pixels.
 */
export function useDynamicMaxHeight<T extends HTMLElement>(
  containerRef: React.RefObject<T | null>,
  elementsToSubtract: React.RefObject<HTMLElement | null>[] = [],
  offset = 0,
) {
  const [maxHeight, setMaxHeight] = useState(0);

  const calculateMaxHeight = useCallback(() => {
    if (!containerRef.current) return;

    const elementsHeight = getElementsTotalHeight(elementsToSubtract);
    const containerTop = containerRef.current.getBoundingClientRect().top;

    const availableHeight = window.innerHeight - containerTop - elementsHeight - offset;

    setMaxHeight(availableHeight > 0 ? availableHeight : 0);
  }, [containerRef, elementsToSubtract, offset]);

  useLayoutEffect(() => {
    calculateMaxHeight();

    const allElements = [containerRef, ...elementsToSubtract]
      .map((ref) => ref.current)
      .filter(Boolean) as HTMLElement[];

    const resizeObserver = new ResizeObserver(calculateMaxHeight);
    allElements.forEach((el) => resizeObserver.observe(el));
    window.addEventListener("resize", calculateMaxHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", calculateMaxHeight);
    };
  }, [calculateMaxHeight, containerRef, elementsToSubtract]);

  return maxHeight;
}
