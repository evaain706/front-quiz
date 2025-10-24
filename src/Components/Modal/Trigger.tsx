import { useModalContext } from '../../contexts/ModalContext';
import type { ModalProps } from '../../types/modalTypes';

export default function ModalTrigger({ children }: ModalProps) {
  const { onOpenChange } = useModalContext();

  return <div onClick={() => onOpenChange(true)}>{children}</div>;
}
