import { useDropdownContext } from '@/contexts/DropdownContext';
import type { DropdownProps } from '@/types/dropdownTypes';
import { cn } from '@/utils/cn';

const DropdownItem = ({ children, onClick, className }: DropdownProps) => {
  const { setIsOpen } = useDropdownContext();

  const handleItemClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onClick();
    setIsOpen(false);
  };
  return (
    <button
      className={cn(
        'md:text-md z-50 h-[3.6rem] w-[9.1rem] cursor-pointer rounded-[1.2rem] border-1 border-black text-[1.2rem] font-bold text-black md:h-[4.6rem] md:w-[10.8rem]',
        className,
      )}
      type='button'
      onClick={handleItemClick}
    >
      {children}
    </button>
  );
};

export default DropdownItem;
