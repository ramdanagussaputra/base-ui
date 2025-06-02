import { createContext, ReactNode, useContext, useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

import { cn } from "#/utils";

type ModalContext = {
  showModal: () => void;
  closeModal: () => void;
  setModalComponent: (component: ReactNode) => void;
  setContainerClassname: (className: string) => void;
  setBackdropClassname: (className: string) => void;
  setPanelContainerClassname: (className: string) => void;
  setPanelClassname: (className: string) => void;
};

export const modalContext = createContext<ModalContext | undefined>({
  showModal: () => {},
  closeModal: () => {},
  setModalComponent: () => {},
  setBackdropClassname: () => {},
  setContainerClassname: () => {},
  setPanelClassname: () => {},
  setPanelContainerClassname: () => {},
});

export function useModalContext() {
  const context = useContext(modalContext);

  if (!context) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }

  return context;
}

interface ModalProviderProps {
  children: ReactNode;
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalComponent, setModalComponent] = useState<ReactNode | null>(null);
  const [containerClassName, setContainerClassName] = useState<string>("");
  const [backdropClassName, setBackdropClassName] = useState<string>("");
  const [panelContainerClassName, setPanelContainerClassName] =
    useState<string>("");
  const [panelClassName, setPanelClassName] = useState<string>("");

  function closeModal() {
    setIsModalOpen(false);
  }

  function showModal() {
    setIsModalOpen(true);
  }

  return (
    <modalContext.Provider
      value={{
        showModal,
        closeModal,
        setModalComponent(component) {
          setModalComponent(component);
        },
        setContainerClassname(className) {
          setContainerClassName(className);
        },
        setBackdropClassname(className) {
          setBackdropClassName(className);
        },
        setPanelContainerClassname(className) {
          setPanelContainerClassName(className);
        },
        setPanelClassname(className) {
          setPanelClassName(className);
        },
      }}
    >
      {children}

      <Dialog
        open={isModalOpen}
        onClose={closeModal}
        className={cn("relative z-50 outline-none", containerClassName)}
      >
        <DialogBackdrop
          className={cn(
            "fixed inset-0 z-50 bg-[rgba(18,18,18,0.4)]",
            backdropClassName,
          )}
        />

        <div
          className={cn(
            "fixed inset-0 z-50 flex min-h-full w-screen items-center justify-center overflow-y-auto p-4",
            panelContainerClassName,
          )}
        >
          <DialogPanel
            transition
            className={cn(
              "bg-neutral-0 z-50 h-auto w-[54rem] rounded-xl shadow-[0px_0px_18px_0px_rgba(0,0,0,0.09)] duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0",
              panelClassName,
            )}
          >
            {modalComponent}
          </DialogPanel>
        </div>
      </Dialog>
    </modalContext.Provider>
  );
}
