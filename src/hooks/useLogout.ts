import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/store/useUserStore';
import { privateInstance } from '@/apis/privateInstance';

export const useLogout = () => {
  const navigate = useNavigate();
  const clearUser = useUserStore((state) => state.clearUser);

  const logout = useCallback(async () => {
    try {
      await privateInstance.post(
        '/api/auth/logout',
        {},
        { withCredentials: true },
      );
    } catch (error) {
      console.error('서버 로그아웃 실패:', error);
    } finally {
      clearUser();

      navigate('/', { replace: true });
    }
  }, [clearUser, navigate]);

  return logout;
};
