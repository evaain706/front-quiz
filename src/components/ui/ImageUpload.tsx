import { useRef, useState } from 'react';
import ProfileImage from './ProfileImage';
import Button from '../Button';
import { useUploadImage } from '@/hooks/useUploadImage';
import { useUserStore } from '@/store/useUserStore';

interface ImageUploadProps {
  initialSrc?: string | null;
  handleUpload: (url: string) => void;
}

const ImageUpload = ({ initialSrc, handleUpload }: ImageUploadProps) => {
  const [preview, setPreview] = useState(initialSrc);
  const [src, setSrc] = useState<File | null>(null);
  const [onChange, setOnchange] = useState(false);
  const InputRef = useRef<HTMLInputElement>(null);

  const { updateProfileImage } = useUserStore();

  const { uploadImage } = useUploadImage();

  const handleClick = () => {
    InputRef.current?.click();
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSrc(file);
    setPreview(URL.createObjectURL(file));
    setOnchange(true);
  };

  const handleUploadClick = async () => {
    if (!src) return;

    const uploadUrl = await uploadImage(src);
    if (uploadUrl) {
      updateProfileImage(uploadUrl);
      setOnchange(false);
    }
  };

  const handleCancelClick = () => {
    setPreview(initialSrc || '');
    setSrc(null);
    setOnchange(false);
  };

  return (
    <div className='relative flex cursor-pointer flex-col items-center'>
      <ProfileImage src={preview} size='lg' onClick={handleClick} />

      <input
        type='file'
        ref={InputRef}
        className='hidden'
        accept='image/*'
        onChange={handleChange}
      />
      {onChange && (
        <div className='absolute -bottom-15 flex h-10 gap-2'>
          <Button
            className='w-[10rem] py-5 md:w-[18rem]'
            onClick={handleUploadClick}
          >
            변경
          </Button>
          <Button
            className='w-[10rem] py-5 md:w-[18rem]'
            onClick={handleCancelClick}
          >
            취소
          </Button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
