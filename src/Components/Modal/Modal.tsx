'use client';

import { useState, useEffect } from 'react';
import { ModalContext } from '../../contexts/ModalContext';
import type { ModalRootProps } from '../../types/modalTypes';

export default function ModalWrapper({
  children,
  isOpen: controlledIsOpen,
  onOpenChange,
}: ModalRootProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);

  const isControlled = controlledIsOpen !== undefined;

  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  const handleOpenChange = (open: boolean) => {
    if (onOpenChange) {
      onOpenChange(open);
    }
    if (!isControlled) {
      setInternalIsOpen(open);
    }
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleOpenChange(false);
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', onKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  return (
    <ModalContext.Provider value={{ isOpen, onOpenChange: handleOpenChange }}>
      {children}
    </ModalContext.Provider>
  );
}
