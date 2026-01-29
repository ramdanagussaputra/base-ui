import { Button } from "#/components/button/Button";

interface ActionButtonsProps {
  onCancel: () => void;
  onSave: () => void;
  isProcessing: boolean;
}

export function ActionButtons({
  onCancel,
  onSave,
  isProcessing,
}: Readonly<ActionButtonsProps>) {
  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        color="secondary"
        size="medium"
        onClick={onCancel}
        isDisabled={isProcessing}
      >
        Cancel
      </Button>
      <Button
        variant="solid"
        color="primary"
        size="medium"
        onClick={onSave}
        isLoading={isProcessing}
        isDisabled={isProcessing}
      >
        Save
      </Button>
    </div>
  );
}
