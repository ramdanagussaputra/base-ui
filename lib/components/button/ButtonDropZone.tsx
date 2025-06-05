import React from "react";
import { buttonContext } from "#/components/button/context/useButtonContext";
import { cn } from "#/utils";

interface ButtonDropZoneProps {
  children: React.ReactNode;
  onDrop?: (files: FileList) => void;
  className?: string;
}

export function ButtonDropZone({
  children,
  onDrop,
  className,
}: ButtonDropZoneProps) {
  const context = React.useContext(buttonContext);
  if (!context) {
    throw new Error("ButtonDropZone must be used within a Button");
  }
  const { isDragging, setIsDragging } = context;
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (onDrop) onDrop(e.dataTransfer.files);
  };
  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(isDragging ? "ring-primary-500 ring-2" : "", className)}
    >
      {children}
    </div>
  );
}
