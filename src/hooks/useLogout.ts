import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/store/useUserStore';
import { privateInstance } from '@/apis/privateInstance';
import { useToastStore } from '@/store/useToastStore';

export const useLogout = () => {
  const navigate = useNavigate();
  const clearUser = useUserStore((state) => state.clearUser);
  const addToat = useToastStore((state) => state.addToast);

  const logout = useCallback(async () => {
    try {
      await privateInstance.post(
        '/api/auth/logout',
        {},
        { withCredentials: true },
      );
      addToat('success', '로그아웃되었습니다');
    } catch (error) {
      console.error('서버 로그아웃 실패:', error);
      addToat('error', '로그아웃중 에러가발생하였습니다');
    } finally {
      clearUser();

      navigate('/main', { replace: true });
    }
  }, [clearUser, navigate]);

  return logout;
};
