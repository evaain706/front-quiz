import ReactLogo from '../assets/svg/reactIcon';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const navigate = useNavigate();

  return (
    <div className='flex items-center justify-center gap-20 text-center'>
      <h2 className='text-[20rem]'>FrontQuiz</h2>

      <Button size='xl' variant='primary' onClick={() => navigate('/select')}>
        안녕
      </Button>

      <div className='h-40 w-40'>
        <ReactLogo />
      </div>
    </div>
  );
};

export default Main;
