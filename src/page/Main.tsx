import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import OauthLogin from './OauthLogin';
import { motion } from 'motion/react';
import { FrontCloud } from '../components/ui/IconCloud/FrontCloud';

const Main = () => {
  const navigate = useNavigate();

  return (
    <div className='h-screen snap-y snap-mandatory overflow-y-scroll bg-gray-100 font-sans text-gray-800'>
      <section className='bg-navy-black flex h-screen snap-center items-center justify-center text-3xl font-bold text-white'>
        <div className='flex flex-col items-center gap-10'>
          <motion.h1
            initial={{ opacity: 0.2, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8 }}
            className='text-[5rem] font-bold md:text-[20rem]'
          >
            FRONTQUIZ
          </motion.h1>

          <div className='flex flex-col gap-4'>
            <Button
              size='sm'
              variant='primary'
              onClick={() => navigate('/select')}
            >
              안녕
            </Button>
            <OauthLogin />
          </div>
        </div>
      </section>

      <section className='flex h-screen snap-center items-center justify-center bg-black text-3xl font-bold text-white'>
        <FrontCloud />
      </section>
    </div>
  );
};

export default Main;
