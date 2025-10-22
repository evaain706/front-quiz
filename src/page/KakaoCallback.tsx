// page/KakaoCallback.tsx
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import useUserStore from '../store/useUserStore';
import { instance } from '../apis/instance';

const KakaoCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setUser } = useUserStore();

  useEffect(() => {
    const code = new URLSearchParams(location.search).get('code');

    if (code) {
      const sendCodeToBackend = async () => {
        try {
          const response = await instance.post('/api/auth/kakao', {
            code: code,
          });

          const { accessToken, user } = response.data;

          localStorage.setItem('Accesstoken', accessToken);

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

  return <div>카카오 로그인 처리 중...</div>;
};

export default KakaoCallback;
