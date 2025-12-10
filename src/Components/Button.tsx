import type React from 'react';
import { cn } from '../utils/cn';
import {
  BUTTON_ROUND,
  BUTTON_SIZE,
  BUTTON_VARIANTS,
} from '../constants/buttonVarient';
import Spinner from './ui/Spinner';

interface ButtonTypes {
  size?: 'sm' | 'md' | 'xl';
  variant?: 'primary' | 'secondary' | 'ghost';
  round?: 'rounded' | 'square';
  type?: 'button' | 'submit' | 'reset';
  isLoading?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
  onClick: () => void;
  ref?: React.Ref<HTMLButtonElement>;
}

const Button = ({
  size = 'md',
  onClick,
  type = 'button',
  variant = 'primary',
  round = 'rounded',
  disabled = false,
  isLoading = false,
  children,
  className = '',
  ref,
  ...props
}: ButtonTypes) => {
  const buttonClassName = cn(
    'sub-content-text flex gap-3 flex-shrink-0 justify-center items-center hover:opacity-75 cursor-pointer p-2 disabled:cursor-not-allowed disabled:opacity-60',
    variant ? BUTTON_VARIANTS[variant] : 'border-none',
    BUTTON_SIZE[size],
    BUTTON_ROUND[round],
    className,
  );

  return (
    <button
      ref={ref}
      className={buttonClassName}
      disabled={disabled || isLoading}
      type={type}
      onClick={onClick}
      {...props}
    >
      {isLoading ? <Spinner /> : children}
    </button>
  );
};

export default Button;
