import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useUserStore } from '../store/useUserStore';
import { instance } from '../apis/instance';
import KakaoLoading from '../components/KakaoLoading';

const KakaoCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setUser } = useUserStore();

  useEffect(() => {
    const code = new URLSearchParams(location.search).get('code');

    if (code) {
      const sendCodeToBackend = async () => {
        try {
          const response = await instance.post(
            '/api/auth/kakao',
            { code: code },
            { withCredentials: true },
          );

          const { user } = response.data;

          setUser(user);

          navigate('/');
        } catch (error) {
          console.error('카카오 로그인 에러:', error);

          navigate('/');
        }
      };

      sendCodeToBackend();
    }
  }, [location, navigate]);

  return <KakaoLoading />;
};

export default KakaoCallback;
