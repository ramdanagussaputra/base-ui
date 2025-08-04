import { Warning2 } from "iconsax-react";
import {
  Dialog,
  Button,
  useDialog,
  useDialogHook,
  useModal,
  useConfirmDialog,
} from "massive-base-ui";
import { useState } from "react";
import Icon from "#/components/icon/Icon";

function DialogPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleOpenDialog() {
    setIsDialogOpen(true);
  }

  function handleCloseDialog() {
    setIsDialogOpen(false);
  }

  // Modern API examples from examples.tsx
  const { show, close, setCallbacks } = useDialog();
  const { showConfirmDialog } = useConfirmDialog();
  const { showModal, closeModal } = useModal();

  // Example functions from examples.tsx
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

  // Original showDialog from hook version
  const { showDialog } = useDialogHook();

  // Legacy API example using context methods
  const dialog = useDialog();
  const handleShowLegacyDialog = () => {
    // Using the legacy API from context
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

  return (
    <div className="p-10">
      <Dialog
        isDialogOpen={isDialogOpen}
        closeDialog={handleCloseDialog}
        showDialog={handleOpenDialog}
        onCancel={() => console.log("Cancel")}
        onConfirm={() => console.log("Confirm")}
      >
        <Dialog.Trigger>
          <Button>Open Dialog</Button>
        </Dialog.Trigger>

        <Dialog.Panel className="flex items-center justify-center">
          <img
            src="/dialog-warning.svg"
            className="h-auto w-[13.1875rem]"
            alt="Warning icon"
          />

          <div className="flex flex-col items-center justify-center gap-5">
            <Dialog.Panel.Title>
              Are you sure want to discard changes?
            </Dialog.Panel.Title>

            <Dialog.Panel.Description>
              All the changes will be lost.
            </Dialog.Panel.Description>
          </div>

          <div className="flex w-full gap-2.5">
            <Dialog.Panel.SlotButtonCancel>
              <Button variant="outline" color="secondary" className="w-full">
                Keep Editing
              </Button>
            </Dialog.Panel.SlotButtonCancel>

            <Dialog.Panel.SlotButtonConfirm>
              <Button className="w-full">Discard Changes</Button>
            </Dialog.Panel.SlotButtonConfirm>
          </div>
        </Dialog.Panel>
      </Dialog>

      <div className="mt-10">
        <Button
          onClick={() =>
            showDialog({
              title: "Are you sure want to discard changes?",
              description: "All the changes will be lost.",
              dialogContent: (
                <div className="bg-error-300 max-w-[400px]">test lagi</div>
              ),
              confirmText: "Discard",
              cancelText: "Keep Editing",
              onConfirm: () => console.log("Cancel"),
              onCancel: () => console.log("Cancel"),
              icon: <Icon icon={Warning2} className="h-auto w-[13.1875rem]" />,
              isConfirmLoading: true,
              onClose: () => console.log("on Close"),
            })
          }
        >
          Dialog Programmatically
        </Button>
      </div>

      <div className="mt-10">
        <Button
          onClick={() =>
            showDialog({
              title: "Title",
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
              dialogContent: (
                <div className="bg-error-300 max-w-[400px]">test lagi</div>
              ),
              confirmText: "Discard",
              cancelText: "Keep Editing",
              onConfirm: () => console.log("Cancel"),
              onCancel: () => console.log("Cancel"),
              icon: <Icon icon={Warning2} className="h-auto w-[13.1875rem]" />,
              // isConfirmLoading: true,
              onClose: () => console.log("on Close"),
              dialogType: "small",
            })
          }
        >
          Dialog Small Type Programmatically
        </Button>
      </div>

      <div className="mt-10">
        <Button
          onClick={() =>
            showModal({
              component: (
                <div>
                  <p>test</p>
                  <button onClick={closeModal}>close</button>
                </div>
              ),
              panelClassname: "bg-primary-100 w-[200px]",
              // isClickOutsideClose: false,
            })
          }
        >
          Modal Programmatically
        </Button>
      </div>

      {/* New Examples from examples.tsx */}
      <div className="mt-10">
        <h2 className="mb-4 text-xl font-bold">Modern API Examples</h2>

        <div className="flex flex-wrap gap-4">
          <Button onClick={handleShowSimpleDialog}>
            Show Simple Dialog (Modern API)
          </Button>

          <Button onClick={handleShowConfirmDialog}>
            Show Confirm Dialog (Convenience Hook)
          </Button>

          <Button onClick={handleShowLegacyDialog}>
            Show Legacy Dialog (Context API)
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DialogPage;
