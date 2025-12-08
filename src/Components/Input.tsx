import { cn } from '../utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input = ({
  type = 'text',
  placeholder,
  className,
  ...props
}: InputProps) => {
  return (
    <input
      className={cn(
        'w-full rounded-lg border border-black bg-white px-4 py-4 text-[1.6rem] font-bold text-black',
        className,
      )}
      type={type}
      placeholder={placeholder}
      {...props}
    />
  );
};

export default Input;
