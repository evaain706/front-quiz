import type { ReactNode } from 'react';

export interface DropDownRootProps {
  children: ReactNode;
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
}

export interface DropdownProps {
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
}

export interface DropDownContextType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
