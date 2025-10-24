'use client';

import { cn } from '../../utils/cn';
import { useModalContext } from '../../contexts/ModalContext';
import type { ModalProps } from '../../types/modalTypes';
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';

interface ExtendedModalContentProps extends ModalProps {
  zIndex?: number;
  backdropClassName?: string;
}

export default function ModalContent({
  children,
  className,
  zIndex,
  backdropClassName = '',
}: ExtendedModalContentProps) {
  const { isOpen } = useModalContext();
  const [isMounted, setIsMounted] = useState(false);

  const zIndexClass = zIndex ? `z-[${zIndex}]` : 'z-999';

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || !isOpen) return null;

  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null;

  return createPortal(
    <div
      className={cn(
        'fixed inset-0 flex items-center justify-center bg-black/50',
        zIndexClass,
        backdropClassName,
      )}
    >
      <div
        className={cn(
          'relative m-auto flex h-fit max-h-[85%] w-screen min-w-[375] flex-col bg-white p-8 px-10 shadow-2xl inset-shadow-sm inset-shadow-gray-300 md:h-fit md:w-[50%] md:max-w-600',
          className,
        )}
      >
        {children}
      </div>
    </div>,
    modalRoot,
  );
}
