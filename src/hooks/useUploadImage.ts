import { useState } from 'react';
import { privateInstance } from '@/apis/privateInstance';
import { useToastStore } from '@/store/useToastStore';

export const useUploadImage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const addToast = useToastStore((s) => s.addToast);

  const uploadImage = async (file: File) => {
    setLoading(true);
    setError(false);

    const formData = new FormData();
    formData.append('profile_image', file);

    try {
      const response = await privateInstance.post(
        '/api/upload/profile',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        },
      );
      setLoading(false);
      addToast('success', '프로필사진 변경이 완료되었습니다');
      return response.data.user.profileImage;
    } catch (err) {
      setError(true);
      console.log(err);
      addToast('error', '프로필사진 변경에 실패했습니다');
    }
  };

  return { uploadImage, loading, error };
};
