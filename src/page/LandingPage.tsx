import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

import StatImg from '../assets/img/stat.png';
import Incorrect from '../assets/img/Incorrect.png';
import IncorrectModal from '../assets/img/IncorrectModal.png';
import Quiz from '../assets/img/Quiz.png';
import CommunityMain from '../assets/img/CommunityMain.png';
import CommunityDetailImg from '../assets/img/CommunityDetail.png';
import ImageSlider from '../components/ui/ImgaSlider';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className='h-screen snap-y snap-mandatory overflow-y-scroll bg-black p-5 font-sans text-gray-800'>
      <section className='bg-navy-black flex h-screen snap-center flex-col items-center justify-center gap-10 text-3xl font-bold text-white'>
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

        <ImageSlider images={[{ src: Quiz, alt: 'QuizImg' }]} />
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

        <ImageSlider images={[{ src: StatImg, alt: 'StatImg' }]} />
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
            { src: Incorrect, alt: 'Community Main' },
            { src: IncorrectModal, alt: 'Community Detail' },
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
            { src: CommunityMain, alt: 'Community Main' },
            { src: CommunityDetailImg, alt: 'Community Detail' },
          ]}
        />
      </section>

      <div className='sticky bottom-10 flex justify-center pb-6'>
        <Button size='md' variant='primary' onClick={() => navigate('/main')}>
          이동하기
        </Button>
      </div>
    </div>
  );
};

export default LandingPage;
