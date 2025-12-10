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
        'w-full rounded-lg bg-white px-4 py-3 text-[1.6rem] shadow-sm transition-all hover:border-emerald-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none',
        className,
      )}
      type={type}
      placeholder={placeholder}
      {...props}
    />
  );
};

export default Input;
