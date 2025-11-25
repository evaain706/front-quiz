import { cn } from '../../utils/cn';

interface ProfileImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src?: string | null;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const ProfileImage = ({
  src,
  size = 'md',
  className,
  ...props
}: ProfileImageProps) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-20 h-20',
    lg: 'w-80 h-80',
  };

  return (
    <div
      className={cn(
        'overflow-hidden rounded-full bg-gray-200',
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      <img
        src={src || '/default-profile.png'}
        alt='profileImage'
        className='h-full w-full object-cover'
      />
    </div>
  );
};

export default ProfileImage;
