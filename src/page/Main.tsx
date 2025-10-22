import ReactLogo from '../assets/svg/reactIcon';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import OauthLogin from './OauthLogin';
import { privateInstance } from '../apis/privateInstance';

const Main = () => {
  const navigate = useNavigate();

  async function handleTest() {
    try {
      const response = await privateInstance.get('/api/auth/test');
      console.log(response.data);
    } catch (err) {
      console.log('에러');
    }
  }

  return (
    <div className='flex items-center justify-center gap-20 text-center'>
      <h2 className='text-[20rem]'>FrontQuiz</h2>

      <Button size='xl' variant='primary' onClick={() => navigate('/select')}>
        안녕
      </Button>

      <div className='h-40 w-40'>
        <ReactLogo />
      </div>
      <Button size='xl' variant='primary' onClick={() => handleTest()}>
        테스트
      </Button>
      <OauthLogin />
    </div>
  );
};

export default Main;
