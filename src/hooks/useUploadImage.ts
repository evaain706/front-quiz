import { useState } from 'react';
import { privateInstance } from '../apis/privateInstance';

export const useUploadImage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

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

      return response.data.user.profileImage;
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  return { uploadImage, loading, error };
};
