interface AspectRatioOption {
  label: string;
  value: number | undefined;
}

const ASPECT_RATIO_OPTIONS: AspectRatioOption[] = [
  { label: "Free", value: undefined },
  { label: "Square", value: 1 },
  { label: "16:9", value: 16 / 9 },
  { label: "4:3", value: 4 / 3 },
];

interface AspectRatioToggleProps {
  currentValue: number | undefined;
  onChange: (value: number | undefined) => void;
}

export function AspectRatioToggle({
  currentValue,
  onChange,
}: Readonly<AspectRatioToggleProps>) {
  const getButtonClassName = (isActive: boolean) =>
    `rounded-lg border px-3 py-1 text-xs transition-colors ${
      isActive
        ? "border-primary-600 bg-primary-50 text-primary-600"
        : "border-secondary-300 text-secondary-700 hover:bg-secondary-50 bg-transparent"
    }`;

  return (
    <div className="flex items-center gap-2">
      <span className="text-small-text-600 text-secondary-600 uppercase">
        Aspect:
      </span>
      {ASPECT_RATIO_OPTIONS.map((option) => (
        <button
          key={option.label}
          type="button"
          onClick={() => onChange(option.value)}
          className={getButtonClassName(currentValue === option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
