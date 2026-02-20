import Button from "./Button";
import { useNavigate } from "react-router-dom";

const GlobalErrorFallback = () => {
  const navigate = useNavigate();
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className='flex min-h-screen-safe flex-col items-center justify-center gap-6 bg-navy-black px-4 text-center text-white'>
      <h1 className='text-[2rem] font-bold md:text-[3rem]'>
        알 수 없는 오류가 발생했어요
      </h1>
      <div className='flex flex-col gap-2'>
        <p className='max-w-[50rem] text-[1.5rem] font-bold md:text-[2rem] text-gray-300'>
          잠시 후 다시 시도해주세요.
        </p>
        <p className='max-w-[50rem] text-[1.3rem] font-bold md:text-[2rem] text-gray-300'>
           새로고침 혹은 메인화면으로 이동한뒤 잠시후 다시 시도해주세요
        </p>
      </div>
      <div className='flex w-full max-w-[40rem] gap-3 px-10'>
        <Button
          type='button'
          onClick={() => navigate('/main')}
          className='flex-1 rounded-2xl text-white transition-colors'
      >
        메인화면으로 이동
      </Button>
        <Button
          type='button'
          onClick={handleReload}
          className='flex-1 rounded-2xl text-white transition-colors'
      >
        새로고침
      </Button>
      </div>
    </div>
  );
};

export default GlobalErrorFallback;
