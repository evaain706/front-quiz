import { cn } from '../../utils/cn';
import type { ModalProps } from '../../types/modalTypes';

export default function ModalTitle({ children, className }: ModalProps) {
  return (
    <h2 className={cn('text-xl font-bold text-black md:text-2xl', className)}>
      {children}
    </h2>
  );
}
