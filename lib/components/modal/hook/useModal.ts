import { useModalContext } from "#/components/modal/context/useModalContext";
import { ReactNode } from "react";

export function useModal() {
  const {
    showModal: showModalContext,
    closeModal,
    setBackdropClassname,
    setContainerClassname,
    setModalComponent,
    setPanelClassname,
    setPanelContainerClassname,
    setIsClickOutsideClose,
  } = useModalContext();

  function showModal({
    component,
    backdropClassname,
    containerClassname,
    panelClassname,
    panelContainerClassname,
    isClickOutsideClose,
  }: {
    component: ReactNode;
    containerClassname?: string;
    backdropClassname?: string;
    panelContainerClassname?: string;
    panelClassname?: string;
    isClickOutsideClose?: boolean;
  }) {
    closeModal();

    setModalComponent(component);
    setContainerClassname(containerClassname || "");
    setBackdropClassname(backdropClassname || "");
    setPanelContainerClassname(panelContainerClassname || "");
    setPanelClassname(panelClassname || "");
    console.log(isClickOutsideClose, "isClickOutsideClose 2");
    setIsClickOutsideClose(
      isClickOutsideClose === undefined || isClickOutsideClose === null
        ? true
        : isClickOutsideClose,
    );

    showModalContext();
  }

  return {
    closeModal,
    showModal,
  };
}
