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
  } = useModalContext();

  function showModal({
    component,
    backdropClassname,
    containerClassname,
    panelClassname,
    panelContainerClassname,
  }: {
    component: ReactNode;
    containerClassname?: string;
    backdropClassname?: string;
    panelContainerClassname?: string;
    panelClassname?: string;
  }) {
    closeModal();

    setModalComponent(component);
    setContainerClassname(containerClassname || "");
    setBackdropClassname(backdropClassname || "");
    setPanelContainerClassname(panelContainerClassname || "");
    setPanelClassname(panelClassname || "");

    showModalContext();
  }

  return {
    closeModal,
    showModal,
  };
}
