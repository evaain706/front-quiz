import { useDropdownContext } from '../../../contexts/DropdownContext';
import type { DropdownProps } from '../../../types/dropdownTypes';
import { cn } from '../../../utils/cn';

const DropdownContent = ({ children, className }: DropdownProps) => {
  const { isOpen } = useDropdownContext();

  if (!isOpen) return null;

  return (
    <>
      <div
        className={cn(
          'absolute top-full right-0 z-999 mt-2 flex flex-col content-center justify-around gap-2 rounded-[1.6rem] border border-gray-400 bg-white p-2 shadow-lg',
          className,
        )}
      >
        {children}
      </div>
    </>
  );
};

export default DropdownContent;
