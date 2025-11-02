import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { FrontCloud } from '../components/ui/IconCloud/FrontCloud';
import { useToastStore } from '../store/useToastStore';

const LandingPage = () => {
  const navigate = useNavigate();

  const addToast = useToastStore((state) => state.addToast);

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
        </div>
      </section>

      <section className='flex h-screen snap-center flex-col items-center justify-center bg-black text-3xl font-bold text-white'>
        <FrontCloud />
      </section>

      <div className='sticky bottom-10 flex justify-center pb-6'>
        <Button size='md' variant='primary' onClick={() => navigate('/main')}>
          안녕
        </Button>
        <Button
          size='md'
          variant='primary'
          onClick={() => addToast('success', '테스트입니다')}
        >
          안녕
        </Button>
      </div>
    </div>
  );
};

export default LandingPage;
