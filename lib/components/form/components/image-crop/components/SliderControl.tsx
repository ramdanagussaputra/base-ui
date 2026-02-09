interface SliderControlProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}

export function SliderControl({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: Readonly<SliderControlProps>) {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="flex w-full items-center gap-3">
      {label && (
        <label className="text-b3-500 text-secondary-800 min-w-[60px] uppercase">
          {label}
        </label>
      )}

      <div className="relative flex h-4 w-full items-center">
        {/* Background Track */}
        <div className="bg-secondary-100 absolute right-0 left-0 z-0 h-1 rounded-full" />

        {/* Active Progress Bar */}
        <div
          className="bg-primary-600 absolute z-0 h-1 rounded-full"
          style={{ width: `${percentage}%` }}
        />

        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="slider-input relative z-10 m-0 h-full w-full p-0 opacity-100"
          style={{
            backgroundImage: "none",
            background: "transparent",
          }}
        />
      </div>
    </div>
  );
}
