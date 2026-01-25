import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUserStore } from '@/store/useUserStore';
import { kakaoAuthInstance } from '@/apis/kakaoAuthInstance';
import KakaoLoading from '@/components/KakaoLoading';

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
        const response = await kakaoAuthInstance.post(
          '/api/auth/kakao',
          { code },
          { withCredentials: true },
        );

        setUser(response.data.user);
        navigate('/main', { replace: true });
      } catch (error) {
        navigate('/main', { replace: true });
      }
    };

    sendCodeToBackend();
  }, []);

  return <KakaoLoading />;
};

export default KakaoCallback;
