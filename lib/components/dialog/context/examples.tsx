import { useDialog, useConfirmDialog } from "./index";

// Example of using the modern API
export function ModernDialogExample() {
  const { show, close, setCallbacks } = useDialog();
  const { showConfirmDialog } = useConfirmDialog();

  const handleShowSimpleDialog = () => {
    // Using the modern fluent API
    show({
      title: "Confirmation",
      description: "Are you sure you want to continue?",
      confirmText: "Yes",
      cancelText: "No",
      type: "small",
    });

    setCallbacks({
      onConfirm: () => {
        console.log("Confirmed!");
        close();
      },
      onCancel: () => {
        console.log("Cancelled!");
      },
    });
  };

  const handleShowConfirmDialog = () => {
    // Using the convenience hook
    showConfirmDialog({
      title: "Delete Item",
      description: "This action cannot be undone.",
      confirmText: "Delete",
      cancelText: "Cancel",
      type: "regular",
      onConfirm: () => {
        console.log("Item deleted!");
      },
      onCancel: () => {
        console.log("Delete cancelled!");
      },
    });
  };

  return (
    <div>
      <button onClick={handleShowSimpleDialog}>Show Simple Dialog</button>
      <button onClick={handleShowConfirmDialog}>Show Confirm Dialog</button>
    </div>
  );
}

// Example of using the legacy API (for backward compatibility)
export function LegacyDialogExample() {
  const dialog = useDialog();

  const handleShowLegacyDialog = () => {
    // Using the legacy API
    dialog.setTitle("Legacy Dialog");
    dialog.setDescription("This uses the old API");
    dialog.setConfirmText("OK");
    dialog.setCancelText("Cancel");
    dialog.setDialogType("small");

    dialog.setOnConfirm(() => {
      console.log("Legacy confirmed!");
      dialog.closeDialog();
    });

    dialog.showDialog();
  };

  return <button onClick={handleShowLegacyDialog}>Show Legacy Dialog</button>;
}
