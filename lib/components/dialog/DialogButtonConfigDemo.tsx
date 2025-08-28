import { useDialog } from "#/components/dialog";
import { Button } from "#/components/button/Button";

export function DialogButtonConfigDemo() {
  const { showDialog, confirm } = useDialog();

  const handleBasicDialog = () => {
    showDialog({
      title: "Basic Configuration",
      description: "This dialog shows basic button configuration.",
      confirmButton: {
        text: "Got it!",
        color: "primary",
        variant: "solid",
      },
      cancelButton: {
        text: "Not now",
        color: "secondary",
        variant: "outline",
      },
      onConfirm: () => console.log("User confirmed!"),
    });
  };

  const handleDeleteDialog = () => {
    confirm({
      title: "Delete Item",
      description:
        "Are you sure you want to delete this item? This action cannot be undone.",
      confirmButton: {
        text: "Delete",
        color: "error",
        variant: "solid",
        size: "medium",
      },
      cancelButton: {
        text: "Keep",
        color: "secondary",
        variant: "outline",
        size: "medium",
      },
      onConfirm: () => {
        console.log("Item deleted!");
        // Simulate deletion logic here
      },
      onCancel: () => console.log("Deletion cancelled"),
    });
  };

  const handleCustomSizeDialog = () => {
    showDialog({
      title: "Different Button Sizes",
      description: "This dialog shows different button sizes.",
      type: "small",
      confirmButton: {
        text: "Large Confirm",
        size: "large",
        color: "primary",
      },
      cancelButton: {
        text: "Small Cancel",
        size: "small",
        variant: "outline",
      },
      onConfirm: () => console.log("Large button clicked!"),
    });
  };

  const handleLoadingDialog = () => {
    showDialog({
      title: "Loading Example",
      description: "This shows a loading state simulation.",
      confirmButton: {
        text: "Process",
        color: "primary",
        isLoading: false, // Would be controlled by state in real usage
      },
      cancelButton: {
        text: "Cancel",
        variant: "outline",
      },
      onConfirm: () => {
        console.log("Processing...");
        // In real usage, you'd set loading state here
      },
    });
  };

  const handleMixedApiDialog = () => {
    showDialog({
      title: "Mixed API Usage",
      description: "This uses both old and new API styles.",
      confirmText: "Fallback Text", // Used as fallback
      confirmButton: {
        color: "error",
        variant: "solid",
        // text will fallback to confirmText
      },
      cancelText: "Cancel", // Used since no cancelButton config
      onConfirm: () => console.log("Mixed API confirmed!"),
    });
  };

  return (
    <div className="space-y-4 p-6">
      <h2 className="mb-4 text-xl font-semibold">
        Dialog Button Configuration Demo
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Button onClick={handleBasicDialog}>Basic Configuration</Button>

        <Button onClick={handleDeleteDialog} color="error">
          Delete Confirmation
        </Button>

        <Button onClick={handleCustomSizeDialog}>Different Sizes</Button>

        <Button onClick={handleLoadingDialog}>Loading Example</Button>

        <Button onClick={handleMixedApiDialog} variant="outline">
          Mixed API
        </Button>
      </div>

      <div className="mt-6 rounded-lg bg-gray-50 p-4">
        <h3 className="mb-2 font-medium">Features Demonstrated:</h3>
        <ul className="space-y-1 text-sm">
          <li>• Custom button colors (primary, secondary, error)</li>
          <li>• Different button variants (solid, outline)</li>
          <li>• Various button sizes (small, medium, large)</li>
          <li>• Loading states</li>
          <li>• Backward compatibility with legacy API</li>
          <li>• Convenient confirm() method</li>
        </ul>
      </div>
    </div>
  );
}
