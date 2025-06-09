import { Warning2 } from "iconsax-react";
import { Dialog, Button, useDialog, useModal } from "massive-base-ui";
import { useState } from "react";

function DialogPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleOpenDialog() {
    setIsDialogOpen(true);
  }

  function handleCloseDialog() {
    setIsDialogOpen(false);
  }

  const { showDialog } = useDialog();
  const { showModal, closeModal } = useModal();

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
          <img src="/dialog-warning.svg" className="h-auto w-[13.1875rem]" />

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
              confirmText: "Discard",
              cancelText: "Keep Editing",
              onConfirm: () => console.log("Cancel"),
              onCancel: () => console.log("Cancel"),
              icon: <Warning2 className="h-auto w-[13.1875rem]" />,
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
    </div>
  );
}

export default DialogPage;
