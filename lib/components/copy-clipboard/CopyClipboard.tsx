import { useState, useRef } from "react";
import { createPortal } from "react-dom";
import { Copy } from "iconsax-react";
import Icon from "#/components/icon/Icon";
import { cn } from "#/utils";

interface CopyClipboardProps {
  readonly value: string;
  readonly iconClassName?: string;
  readonly onCopy?: () => void;
}

function CopyClipboard({ value, iconClassName, onCopy }: CopyClipboardProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const iconRef = useRef<HTMLDivElement>(null);

  async function copyClipboard() {
    try {
      await navigator.clipboard.writeText(value);
      
      // Calculate tooltip position relative to the icon
      if (iconRef.current) {
        const rect = iconRef.current.getBoundingClientRect();
        setTooltipPosition({
          top: rect.top - 32, // 32px above the icon
          left: rect.left + rect.width / 2 - 24.5, // Center horizontally (49px width / 2)
        });
      }
      
      setShowTooltip(true);
      onCopy?.();
      
      // Hide tooltip after 1 second
      // setTimeout(() => {
      //   setShowTooltip(false);
      // }, 1000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  }

  // Render tooltip in a portal to avoid being clipped by parent
  const tooltipElement = showTooltip ? createPortal(
    <div 
      className="fixed z-[9999] pointer-events-none"
      style={{
        top: `${tooltipPosition.top}px`,
        left: `${tooltipPosition.left}px`,
      }}
    >
      <div className="bg-secondary-900 flex h-[1.375rem] w-[49px] items-center justify-center rounded-[4px] shadow-lg">
        <span className="text-secondary-0 text-xs font-medium">Copied</span>
      </div>
    </div>,
    document.body
  ) : null;

  return (
    <>
      <div ref={iconRef}>
        <Icon
          icon={Copy}
          onClick={copyClipboard}
          className={cn("text-secondary-300 size-4 cursor-pointer hover:text-secondary-400 transition-colors", iconClassName)}
        />
      </div>
      {tooltipElement}
    </>
  );
}

export default CopyClipboard;
