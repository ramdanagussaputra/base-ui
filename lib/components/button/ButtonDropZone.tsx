import React, { useRef, useEffect } from "react";
import { buttonContext } from "#/components/button/context/useButtonContext";
import { cn } from "#/utils";

interface ButtonDropZoneProps {
  children: React.ReactNode | ((isDragging: boolean) => React.ReactNode);
  onDrop?: (files: FileList) => void;
  className?: string;
  dragActiveText?: React.ReactNode;
  dragActiveClassName?: string;
}

export function ButtonDropZone({
  children,
  onDrop,
  className,
  dragActiveText,
  dragActiveClassName,
}: ButtonDropZoneProps) {
  const context = React.useContext(buttonContext);
  if (!context) {
    throw new Error("ButtonDropZone must be used within a Button");
  }
  const { isDragging, setIsDragging } = context;
  const dragEventCounter = useRef(0);

  // Reset drag state if drag leaves the window (browser edge case)
  useEffect(() => {
    const handleWindowDragLeave = (event: DragEvent) => {
      // Only reset if leaving the window (relatedTarget is null)
      if (!event.relatedTarget && !(event as any).toElement) {
        dragEventCounter.current = 0;
        setIsDragging(false);
      }
    };
    window.addEventListener("dragleave", handleWindowDragLeave);
    return () => {
      window.removeEventListener("dragleave", handleWindowDragLeave);
    };
  }, [setIsDragging]);

  // Failsafe: Reset drag state if stuck for more than 2 seconds
  useEffect(() => {
    if (!isDragging) return;
    const failsafeTimeout = setTimeout(() => {
      dragEventCounter.current = 0;
      setIsDragging(false);
    }, 2000); // 2 seconds
    return () => clearTimeout(failsafeTimeout);
  }, [isDragging, setIsDragging]);

  // Handle drag enter: increment counter and set dragging state if files are present
  const handleDropZoneDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    dragEventCounter.current += 1;
    if (event.dataTransfer.types.includes("Files")) {
      setIsDragging(true);
    }
  };

  // Handle drag leave: decrement counter and reset dragging state if counter is zero
  const handleDropZoneDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    dragEventCounter.current -= 1;
    if (dragEventCounter.current < 0) dragEventCounter.current = 0;
    if (dragEventCounter.current === 0) {
      setIsDragging(false);
    }
  };

  // Prevent default to allow drop
  const handleDropZoneDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  // Handle file drop: reset counter and dragging state, and call onDrop
  const handleDropZoneDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    dragEventCounter.current = 0;
    setIsDragging(false);
    if (onDrop) onDrop(event.dataTransfer.files);
  };

  return (
    <div
      onDragEnter={handleDropZoneDragEnter}
      onDragLeave={handleDropZoneDragLeave}
      onDragOver={handleDropZoneDragOver}
      onDrop={handleDropZoneDrop}
      className={cn(className, {
        "ring-primary-500 ring-2": isDragging,
        [`${dragActiveClassName}`]: isDragging,
      })}
    >
      {isDragging && dragActiveText
        ? dragActiveText
        : typeof children === "function"
          ? children(isDragging)
          : children}
    </div>
  );
}
