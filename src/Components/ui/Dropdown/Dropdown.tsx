import { useState, type ReactNode } from 'react';
import { DropdownContext } from '@/contexts/DropdownContext';

const DropdownWrapper = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </DropdownContext.Provider>
  );
};

export default DropdownWrapper;
