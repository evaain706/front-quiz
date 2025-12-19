import { cn } from '@/utils/cn';

interface SpinnerProps {
  className?: string;
}

const Spinner = ({ className }: SpinnerProps) => (
  <div
    className={cn(
      'animate-spinner h-5 w-5 rounded-full border-2 border-green-400 border-t-transparent',
      className,
    )}
  />
);

export default Spinner;
