import React from 'react';
import { cn } from '../utils/cn';

type Option = {
  label: string;
  value: string | number;
};

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
  value?: string | number;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  selectSize?: 'sm' | 'md' | 'lg';
  error?: string;
}

const sizeStyles = {
  sm: 'h-8 text-sm px-2',
  md: 'h-10 text-base px-3',
  lg: 'h-12 text-lg px-4',
};

const Select = ({
  options,
  value,
  onChange,
  placeholder = '선택하세요',
  className,
  selectSize = 'md',
  error,
  ...props
}: SelectProps) => {
  return (
    <div className='flex flex-col gap-1'>
      <select
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className={cn(
          'w-full rounded border border-gray-300 bg-white focus:border-blue-500 focus:outline-none',
          sizeStyles[selectSize],
          error && 'border-red-500',
          className,
        )}
        {...props}
      >
        <option value='' disabled>
          {placeholder}
        </option>

        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {error && <p className='text-sm text-red-500'>{error}</p>}
    </div>
  );
};

export default Select;
