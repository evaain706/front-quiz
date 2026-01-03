import Button from '../Button';
import { useNavigate } from 'react-router-dom';

interface ErrorCompProps {
  PageName: string;
  message: string;
}

const ErrorComp = ({ PageName, message }: ErrorCompProps) => {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col items-center justify-center gap-5'>
      <h2 className='text-[3rem] font-bold text-white/70 md:text-[5rem]'>
        {PageName}
      </h2>
      <p className='text-[2rem] font-bold text-white md:text-[3rem]'>
        {message}
      </p>

      <div className='flex gap-5'>
        <Button onClick={() => location.reload()}>새로고침</Button>
        <Button onClick={() => navigate('/main')}>메인페이지로 이동</Button>
      </div>
    </div>
  );
};

export default ErrorComp;
