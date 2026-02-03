import Button from '@/components/Button';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import MouseIcon from '@/assets/svg/MouseIcon';
import LandingSection from '@/components/ui/LandingSection';
import { LandingSectionData } from '@/constants/LandingSectionData';

const LandingPage = () => {
  const navigate = useNavigate();

  const [showButton, setShowButton] = useState(false);
  const firstSectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!firstSectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowButton(!entry.isIntersecting);
      },
      {
        threshold: 0.3,
      },
    );

    observer.observe(firstSectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className='h-screen snap-y snap-mandatory overflow-y-scroll bg-black p-5 font-sans text-gray-800'>
      <section
        ref={firstSectionRef}
        className='bg-navy-black relative flex h-screen snap-center flex-col items-center justify-center gap-10 text-3xl font-bold text-white'
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className='text-foreground text-center text-[6rem] font-bold tracking-tight md:text-[13rem] lg:text-[20rem]'
        >
          <p className='animate-pulse bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent'>
            FRONTQUIZ
          </p>
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className='text-center text-[3.5rem] md:text-[4rem]'
        >
          프론트엔드 개발자를 위한
          <br /> 퀴즈 플랫폼
        </motion.h2>

        <div className='absolute bottom-20 animate-bounce text-white'>
          <MouseIcon />
        </div>
      </section>

      {LandingSectionData.map((section, index) => (
        <LandingSection
          key={index}
          mainText={section.mainText}
          subText={section.subText}
          explanationText={section.explanationText}
          images={section.images}
        />
      ))}

      {showButton && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className='sticky bottom-20 flex justify-center pb-6'
        >
          <Button size='md' variant='primary' onClick={() => navigate('/main')}>
            이동하기
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default LandingPage;
