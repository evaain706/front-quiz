import type { BaseIconProps } from '../../types/iconTypes';

export default function DeleteIcon({ size = 24, className }: BaseIconProps) {
  return (
    <svg
      className={className}
      fill='none'
      height={size}
      viewBox='0 0 24 24'
      width={size}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M17 6h5v2h-2v13a1 1 0 01-1 1H5a1 1 0 01-1-1V8H2V6h5V3a1 1 0 011-1h8a1 1 0 011 1v3zm-8 5v6h2v-6H9zm4 0v6h2v-6h-2zM9 4v2h6V4H9z'
        fill='currentColor'
      />
    </svg>
  );
}
