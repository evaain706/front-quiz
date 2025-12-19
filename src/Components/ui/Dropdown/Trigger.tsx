import type { DropdownProps } from '@/types/dropdownTypes';
import { useDropdownContext } from '@/contexts/DropdownContext';

const DropDownTrigger = ({ children }: DropdownProps) => {
  const { isOpen, setIsOpen } = useDropdownContext();
  return (
    <button
      aria-expanded={isOpen}
      aria-haspopup='true'
      className='cursor-pointer'
      type='button'
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen((prev) => !prev);
      }}
    >
      {children}
    </button>
  );
};

export default DropDownTrigger;
