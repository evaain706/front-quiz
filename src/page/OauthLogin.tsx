import KakaoImg from '@/assets/img/kakao-login.png';

const OauthLogin = () => {
  const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const KAKAO_REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}`;

  function handleKakaoLogin() {
    window.location.href = KAKAO_AUTH_URL;
  }

  return (
    <div>
      <img
        src={KakaoImg}
        className='w-60 cursor-pointer object-cover md:w-full'
        onClick={handleKakaoLogin}
      />
    </div>
  );
};

export default OauthLogin;
