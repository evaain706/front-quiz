import type { ModalProps } from '../../types/modalTypes';

import { cn } from '../../utils/cn';

export default function ModalHeader({ children, className }: ModalProps) {
  return <div className={cn('mb-5', className)}>{children}</div>;
}
