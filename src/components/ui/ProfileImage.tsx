import { cn } from '@/utils/cn';
import Spinner from './Spinner';

interface ProfileImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src?: string | null;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  isloading?: boolean;
}

const ProfileImage = ({
  src,
  size = 'md',
  className,
  isloading,
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
      {isloading ? (
        <div className='flex h-full w-full items-center justify-center'>
          <Spinner />
        </div>
      ) : (
        <img
          src={src || '/default-profile.png'}
          alt='profileImage'
          className='h-full w-full object-cover'
        />
      )}
    </div>
  );
};

export default ProfileImage;
