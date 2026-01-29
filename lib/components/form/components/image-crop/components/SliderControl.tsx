import { getSliderBackground } from "#/utils/imageCrop";

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
  return (
    <div className="flex flex-col gap-2">
      <label className="text-small-text-600 text-secondary-600 uppercase">
        {label}
      </label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="bg-secondary-100 h-2 w-full cursor-pointer appearance-none rounded-lg"
        style={{ background: getSliderBackground(value, min, max) }}
      />
    </div>
  );
}
