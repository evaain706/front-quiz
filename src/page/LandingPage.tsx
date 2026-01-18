import Button from '@/components/Button';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

import QuizImg1 from '@/assets/img/quiz-img.png';
import QuizImg2 from '@/assets/img/quiz-img2.png';
import CommunityImg from '@/assets/img/community-img.png';
import CommunityDetailImg from '@/assets/img//community-detail-img.png';
import UserStatImg from '@/assets/img/user-statistic-img.png';
import IncorrectMainImg from '@/assets/img/incorrect-img.png';
import IncorrectModalImg from '@/assets/img/incorrect-modal-img.png';

import ImageSlider from '@/components/ui/ImgaSlider';
import { useEffect, useRef, useState } from 'react';
import MouseIcon from '@/assets/svg/MouseIcon';

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

      <section className='relative flex h-screen snap-center flex-col items-center justify-center gap-10 bg-black font-bold text-white'>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='text-foreground text-center text-[3rem] font-bold text-balance md:text-[6rem] lg:text-[8rem]'
        >
          여러가지 토픽 중
          <br />
          <p className='text-muted-foreground text-gray-500'>
            선택해 문제를 풀어보세요
          </p>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className='text-muted-foreground max-w-2xl text-center text-[1.6rem] md:text-[2rem]'
        >
          JavaScript, React, TypeScript등 다양한 프론트엔드 기술 토픽을 선택하고
          난이도별로 학습하세요
        </motion.p>

        <ImageSlider
          images={[
            { src: QuizImg1, alt: 'QuizImg' },
            { src: QuizImg2, alt: 'QuizImg2' },
          ]}
        />
      </section>

      <section className='relative flex h-screen snap-center flex-col items-center justify-center gap-10 bg-black font-bold text-white'>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='text-foreground text-center text-[3rem] font-bold text-balance md:text-[6rem] lg:text-[8rem]'
        >
          풀었던 문제들에 대한
          <br />
          <p className='text-muted-foreground text-gray-500'>
            통계를 확인해보세요
          </p>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className='text-muted-foreground max-w-2xl text-center text-[1.6rem] md:text-[2rem]'
        >
          전체,카테고리별,난이도별 통계를 확인할수있습니다
        </motion.p>

        <ImageSlider images={[{ src: UserStatImg, alt: 'UserStatImg' }]} />
      </section>

      <section className='relative flex h-screen snap-center flex-col items-center justify-center gap-10 bg-black font-bold text-white'>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='text-foreground text-center text-[3rem] font-bold text-balance md:text-[6rem] lg:text-[8rem]'
        >
          문제를 오답노트에 등록하고
          <br />
          <p className='text-muted-foreground text-gray-500'>
            다시 확인해보세요
          </p>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className='text-muted-foreground max-w-2xl text-center text-[1.6rem] md:text-[2rem]'
        >
          틀렸던 문제를 저장하고 언제든지 다시 확인할수있습니다
        </motion.p>

        <ImageSlider
          images={[
            { src: IncorrectMainImg, alt: 'Incorrect Main' },
            { src: IncorrectModalImg, alt: 'Incorrect Modal' },
          ]}
        />
      </section>

      <section className='flex min-h-screen snap-center flex-col items-center justify-center gap-10 bg-black px-4 text-white'>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='text-foreground text-center text-[3rem] font-bold text-balance md:text-[6rem] lg:text-[8rem]'
        >
          서로의 정보를
          <br />
          <p className='text-muted-foreground text-gray-500'>공유해보세요</p>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className='text-muted-foreground max-w-2xl text-center text-[1.6rem] font-bold md:text-[2rem]'
        >
          질문을 올리거나 정보를 올려 함께 학습하세요
        </motion.p>

        <ImageSlider
          images={[
            { src: CommunityImg, alt: 'Community Main' },
            { src: CommunityDetailImg, alt: 'Community Detail' },
          ]}
        />
      </section>

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
