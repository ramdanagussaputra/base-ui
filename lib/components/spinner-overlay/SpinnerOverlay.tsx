import { Spinner } from "#/components/spinner";

interface SpinnerOverlayProps {
  size?: number;
  className?: string;
}

export default function SpinnerOverlay({ size = 24, className }: Readonly<SpinnerOverlayProps>) {
  return (
    <div className="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-[rgba(18,18,18,0.25)]">
      <div className={`bg-neutral-0 border-secondary-100 rounded-xl border p-[1.875rem] ${className ?? ""}`}>
        <Spinner size={size} />
      </div>
    </div>
  );
}