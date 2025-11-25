import { cn } from '../utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  type?: 'text' | 'password' | 'number' | 'email';
  placeholder: string;
  className?: string;
}

const Input = ({
  label,
  name,
  type,
  placeholder,
  className,
  ...props
}: InputProps) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        className={cn(
          'w-full rounded-lg border-3 border-black bg-white px-4 py-4 text-[1.6rem] font-bold text-black',
          className,
        )}
        type={type}
        id={name}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
};

export default Input;
