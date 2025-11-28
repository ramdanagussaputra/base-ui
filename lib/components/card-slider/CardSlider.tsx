import { useRef, useState, useEffect, MouseEvent, TouchEvent } from "react";
import { ArrowLeft, ArrowRight } from "iconsax-react";

import { generateUniqueId } from "#/utils";
import { CardSliderItem } from "#/components/card-slider/model";
import Icon from "#/components/icon/Icon";
import { CardItem } from "#/components/card-slider/CardItem";

interface CardSliderProps {
  items?: CardSliderItem[];
}

export const CardSlider = ({ items }: Readonly<CardSliderProps>) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // finite state: posisi scroll
  const [scrollPosition, setScrollPosition] = useState<
    "start" | "end" | "middle"
  >("start");

  // refs untuk drag (tidak memicu re-render)
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftStartRef = useRef(0);

  const checkScrollPosition = () => {
    if (!containerRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;

    const isAtStart = scrollLeft <= 0;
    const isAtEnd = Math.ceil(scrollLeft + clientWidth) >= scrollWidth;

    if (isAtStart) {
      setScrollPosition("start");
    } else if (isAtEnd) {
      setScrollPosition("end");
    } else {
      setScrollPosition("middle");
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  useEffect(() => {
    checkScrollPosition();
  }, [items]);

  // ===== Mouse drag =====
  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    scrollLeftStartRef.current = containerRef.current.scrollLeft;
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || !containerRef.current) return;

    e.preventDefault(); // hindari teks ke-select
    const x = e.clientX;
    const walk = x - startXRef.current;
    containerRef.current.scrollLeft = scrollLeftStartRef.current - walk;
    checkScrollPosition();
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
  };

  // ===== Touch drag (mobile) =====
  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const touch = e.touches[0];
    isDraggingRef.current = true;
    startXRef.current = touch.clientX;
    scrollLeftStartRef.current = containerRef.current.scrollLeft;
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || !containerRef.current) return;

    const touch = e.touches[0];
    const x = touch.clientX;
    const walk = x - startXRef.current;
    containerRef.current.scrollLeft = scrollLeftStartRef.current - walk;
    checkScrollPosition();
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="hide-scrollbar flex cursor-grab items-start gap-5 overflow-x-auto overflow-y-hidden select-none active:cursor-grabbing"
        onScroll={checkScrollPosition}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {items?.map((item) => (
          <CardItem key={generateUniqueId("card-")} item={item} />
        ))}
      </div>

      {scrollPosition !== "start" && (
        <button
          type="button"
          onClick={scrollLeft}
          className="bg-neutral-0 border-secondary-100 absolute top-1/2 left-5 z-10 flex size-[2.875rem] -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border"
        >
          <Icon icon={ArrowLeft} className="text-secondary-700" />
        </button>
      )}

      {scrollPosition !== "end" && (
        <button
          type="button"
          onClick={scrollRight}
          className="bg-neutral-0 border-secondary-100 absolute top-1/2 right-5 z-10 flex size-[2.875rem] -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border"
        >
          <Icon icon={ArrowRight} className="text-secondary-700" />
        </button>
      )}
    </div>
  );
};
