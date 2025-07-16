import { useState } from "react";
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

  async function copyClipboard() {
    try {
      await navigator.clipboard.writeText(value);
      setShowTooltip(true);
      onCopy?.();
      
      // Hide tooltip after 1 second
      setTimeout(() => {
        setShowTooltip(false);
      }, 1000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  }

  return (
    <div className="relative">
      <Icon
        icon={Copy}
        onClick={copyClipboard}
        className={cn("text-secondary-300 size-4 cursor-pointer hover:text-secondary-400 transition-colors", iconClassName)}
      />
      
      {showTooltip && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-secondary-900 flex h-[1.375rem] w-[49px] items-center justify-center rounded-[4px] shadow-lg">
            <span className="text-secondary-0 text-xs font-medium">Copied</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default CopyClipboard;
