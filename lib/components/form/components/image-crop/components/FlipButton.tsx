interface FlipButtonProps {
  isActive: boolean;
  onClick: () => void;
  icon: "horizontal" | "vertical";
  label: string;
}

export function FlipButton({
  isActive,
  onClick,
  icon,
  label,
}: Readonly<FlipButtonProps>) {
  const buttonClassName = `flex items-center gap-2 rounded-lg border px-4 py-2 transition-colors ${
    isActive
      ? "border-primary-600 bg-primary-50 text-primary-600"
      : "border-secondary-300 text-secondary-700 hover:bg-secondary-50 bg-transparent"
  }`;

  const iconPath =
    icon === "horizontal"
      ? "M2 10L6 6v3h6V6l4 4-4 4v-3H6v3l-4-4z"
      : "M10 2l4 4h-3v6h3l-4 4-4-4h3V6H6l4-4z";

  return (
    <button type="button" onClick={onClick} className={buttonClassName}>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={iconPath} fill="currentColor" />
      </svg>
      <span className="text-b4-500">{label}</span>
    </button>
  );
}
