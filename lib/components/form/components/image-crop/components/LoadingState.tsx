import { Spinner } from "#/components/spinner/Spinner";

export function LoadingState() {
  return (
    <div className="bg-secondary-100 flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <Spinner size={32} color="secondary" />
        <span className="text-b4-400 text-secondary-600">Loading image...</span>
      </div>
    </div>
  );
}
