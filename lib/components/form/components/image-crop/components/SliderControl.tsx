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
    <div className="flex items-center gap-3">
      <label className="text-b3-500 text-secondary-800 uppercase">
        {label}
      </label>

      <div className="relative h-4 w-full">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="slider-input"
          style={{
            backgroundImage: `linear-gradient(to right, #FF5D01 0%, #FF5D01 ${percentage}%, #E9EAF0 ${percentage}%, #E9EAF0 100%)`,
            backgroundSize: "100% 4px",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      </div>
    </div>
  );
}
