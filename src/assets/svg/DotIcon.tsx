import type { BaseIconProps } from '../../types/iconTypes';

export default function DotIcon({
  size = 24,
  className,
  ...props
}: BaseIconProps) {
  return (
    <svg
      className={className}
      fill='none'
      height={size}
      viewBox='0 0 30 30'
      width={size}
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M13,16c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,14.346,13,16z'
        id='XMLID_294_'
        fill='currentColor'
      />
      <path
        d='M13,26c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,24.346,13,26z'
        id='XMLID_295_'
        fill='currentColor'
      />
      <path
        d='M13,6c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,4.346,13,6z'
        id='XMLID_297_'
        fill='currentColor'
      />
    </svg>
  );
}
