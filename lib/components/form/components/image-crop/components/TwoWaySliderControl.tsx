interface TwoWaySliderControlProps {
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
}

export function TwoWaySliderControl({
  label,
  value,
  min = -180,
  max = 180,
  step = 1,
  onChange,
}: Readonly<TwoWaySliderControlProps>) {
  const range = max - min;
  const zeroPosition = 0 - min;

  // Percentages for positions
  const centerPercent = (zeroPosition / range) * 100;
  const currentPercent = ((value - min) / range) * 100;

  // Active bar Position and Width
  // The active bar connects the center (0) to the current value
  const activeLeft = Math.min(centerPercent, currentPercent);
  const activeWidth = Math.abs(currentPercent - centerPercent);

  return (
    <div className="flex w-full items-center gap-3">
      {label && (
        <label className="text-b3-500 text-secondary-800 min-w-[60px] uppercase">
          {label}
        </label>
      )}

      <div className="relative flex h-4 w-full items-center">
        {/* Background Track - Full width */}
        <div className="bg-secondary-100 absolute right-0 left-0 z-0 h-1 rounded-full" />

        {/* Center Dot - Marks the zero position */}
        <div
          className="bg-secondary-200 absolute z-0 size-1 -translate-y-2.5 rounded-full"
          style={{
            left: `${centerPercent}%`,
            transform: "translateX(-50%)",
          }}
        />

        {/* Active Track (Orange) - Fills from zero to value */}
        <div
          className="bg-primary-600 absolute z-0 h-1 rounded-full"
          style={{
            left: `${activeLeft}%`,
            width: `${activeWidth}%`,
          }}
        />

        {/* Input Slider - Transparent track, visible thumb */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="slider-input absolute z-10 m-0 h-full w-full p-0 opacity-100"
          style={{
            backgroundImage: "none",
            background: "transparent",
            // Ensure padding/margin doesn't offset the thumb from our track
          }}
        />
      </div>

      {/* Optional value display could go here */}
    </div>
  );
}
