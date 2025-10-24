'use client';

import { cn } from '../../utils/cn';
import type { ModalProps } from '../../types/modalTypes';

export default function ModalFooter({ children, className }: ModalProps) {
  return (
    <div className={cn('mt-5 flex w-full justify-center gap-3', className)}>
      {children}
    </div>
  );
}
