'use client';

import { cn } from '../../utils/cn';
import { useModalContext } from '../../contexts/ModalContext';
import type { ModalProps } from '../../types/modalTypes';

export default function ModalClose({ children, className }: ModalProps) {
  const { onOpenChange } = useModalContext();
  return (
    <button
      className={cn('absolute top-8 right-8 cursor-pointer', className)}
      onClick={() => onOpenChange(false)}
    >
      {children || 'X'}
    </button>
  );
}
