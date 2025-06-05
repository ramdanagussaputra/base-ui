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
  const dragCounter = useRef(0);

  // Optional: Reset drag state if drag leaves the window
  useEffect(() => {
    const handleWindowDragLeave = (e: DragEvent) => {
      if (!e.relatedTarget && !(e as any).toElement) {
        dragCounter.current = 0;
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
    const failsafe = setTimeout(() => {
      dragCounter.current = 0;
      setIsDragging(false);
    }, 2000); // 2 seconds
    return () => clearTimeout(failsafe);
  }, [isDragging, setIsDragging]);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    dragCounter.current += 1;
    if (e.dataTransfer.types.includes("Files")) {
      setIsDragging(true);
    }
  };
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    dragCounter.current -= 1;
    if (dragCounter.current < 0) dragCounter.current = 0;
    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    dragCounter.current = 0;
    setIsDragging(false);
    if (onDrop) onDrop(e.dataTransfer.files);
  };

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
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
