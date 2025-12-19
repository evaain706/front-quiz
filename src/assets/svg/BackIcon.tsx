import type { BaseIconProps } from '@/types/iconTypes';

export default function BackIcon({ size = 18, className }: BaseIconProps) {
  return (
    <svg
      className={className}
      fill='none'
      height={size}
      viewBox='0 0 50 50'
      width={size}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M48.6,23H15.4c-0.9,0-1.3-1.1-0.7-1.7l9.6-9.6c0.6-0.6,0.6-1.5,0-2.1l-2.2-2.2c-0.6-0.6-1.5-0.6-2.1,0L2.5,25c-0.6,0.6-0.6,1.5,0,2.1L20,44.6c0.6,0.6,1.5,0.6,2.1,0l2.1-2.1c0.6-0.6,0.6-1.5,0-2.1l-9.6-9.6C14,30.1,14.4,29,15.3,29h33.2c0.8,0,1.5-0.6,1.5-1.4v-3C50,23.8,49.4,23,48.6,23z'
        fill='currentColor'
      />
    </svg>
  );
}
