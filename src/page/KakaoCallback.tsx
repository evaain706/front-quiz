import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUserStore } from '@/store/useUserStore';
import { instance } from '@/apis/instance';

const KakaoCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const setUser = useUserStore((s) => s.setUser);
  const calledRef = useRef(false);

  useEffect(() => {
    const code = new URLSearchParams(location.search).get('code');

    if (!code || calledRef.current) return;

    calledRef.current = true;

    const sendCodeToBackend = async () => {
      try {
        const response = await instance.post(
          '/api/auth/kakao',
          { code },
          { withCredentials: true },
        );

        setUser(response.data.user);
        navigate('/main', { replace: true });
      } catch (error) {
        console.error('카카오 로그인 에러:', error);
        navigate('/main', { replace: true });
      }
    };

    sendCodeToBackend();
  }, []);
};

export default KakaoCallback;
