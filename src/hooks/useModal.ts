"use client";

import { useCallback, useState } from "react";

export interface IUseModalReturn {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  toggleModal: () => void;
}

export function useModal(initialOpen = false): IUseModalReturn {
  const [isOpen, setIsOpen] = useState(initialOpen);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleModal = useCallback(() => {
    setIsOpen((currentState) => !currentState);
  }, []);

  return {
    isOpen,
    openModal,
    closeModal,
    toggleModal,
  };
}