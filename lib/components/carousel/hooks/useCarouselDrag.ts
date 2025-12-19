import React, { useState } from "react";
import { MIN_SWIPE_DISTANCE } from "../utils/constants";

/**
 * Hook to manage drag and swipe interactions
 */
export const useCarouselDrag = (
  nextSlide: () => void,
  prevSlide: () => void,
  containerRef: React.RefObject<HTMLDivElement | null>,
  disableDrag: boolean = false,
) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);

  // Touch state
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    setCurrentX(clientX);
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging && touchStart === null) return;

    const current = clientX;
    setCurrentX(current);

    const start = isDragging ? startX : (touchStart ?? 0);
    const diff = current - start;

    // Clamp drag
    const containerWidth = containerRef.current?.offsetWidth || 0;
    const maxDrag = containerWidth * 0.5;
    const clampedDiff = Math.max(-maxDrag, Math.min(maxDrag, diff));

    setDragOffset(clampedDiff);
  };

  const handleDragEnd = (clientX: number, isTouch: boolean = false) => {
    const start = isTouch ? (touchStart ?? 0) : startX;
    const distance = start - clientX; // Dragged left (positive) or right (negative)

    if (distance > MIN_SWIPE_DISTANCE) {
      nextSlide();
    } else if (distance < -MIN_SWIPE_DISTANCE) {
      prevSlide();
    }

    setIsDragging(false);
    setTouchStart(null);
    setDragOffset(0);
    setStartX(0);
    setCurrentX(0);
  };

  // Event Handlers
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setCurrentX(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    handleDragMove(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (touchStart === null) return;
    handleDragEnd(currentX, true);
  };

  const onMouseDown = (e: React.MouseEvent) => {
    handleDragStart(e.clientX);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleDragMove(e.clientX);
  };

  const onMouseUp = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleDragEnd(e.clientX, false);
  };

  const onMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      setDragOffset(0);
    }
  };

  // If drag is disabled, return empty handlers
  if (disableDrag) {
    return {
      isDragging: false,
      dragOffset: 0,
      handlers: {
        onTouchStart: () => {},
        onTouchMove: () => {},
        onTouchEnd: () => {},
        onMouseDown: () => {},
        onMouseMove: () => {},
        onMouseUp: () => {},
        onMouseLeave: () => {},
      },
    };
  }

  return {
    isDragging,
    dragOffset,
    handlers: {
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      onMouseDown,
      onMouseMove,
      onMouseUp,
      onMouseLeave,
    },
  };
};
