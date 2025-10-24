import type { ModalProps } from '../../types/modalTypes';

import { cn } from '../../utils/cn';

export default function ModalItem({ children, className }: ModalProps) {
  return (
    <div className={cn('h-fit overflow-y-auto py-4', className)}>
      {children}
    </div>
  );
}
