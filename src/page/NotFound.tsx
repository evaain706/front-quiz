import Button from '@/components/Button';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className='flex h-screen-safe w-full min-w-0 flex-col items-center justify-center gap-5 overflow-x-hidden bg-black'>
      <h2 className='text-[4rem] font-bold text-white/40 md:text-[5rem]'>
        404 NOT FOUND
      </h2>
      <h2 className='text-[3rem] font-bold text-white'>
        존재하지않는 페이지입니다
      </h2>
      <Button className='bg-white/70' onClick={() => navigate('/main')}>
        메인페이지로
      </Button>
    </div>
  );
};

export default NotFound;
