import { motion } from 'motion/react';
import ImageSlider from './ImgaSlider';

interface LandingSectionProps {
  mainText: string;
  subText: string;
  explanationText: string;
  images: {
    src: string;
    alt: string;
  }[];
}

const LandingSection = ({
  mainText,
  subText,
  explanationText,
  images,
}: LandingSectionProps) => {
  return (
    <section className='relative flex h-screen snap-center flex-col items-center justify-center gap-10 bg-black font-bold text-white'>
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className='text-foreground text-center text-[3rem] font-bold text-balance md:text-[6rem] lg:text-[8rem]'
      >
        {mainText}
        <br />
        <p className='text-muted-foreground text-gray-500'>{subText}</p>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className='text-muted-foreground max-w-2xl text-center text-[1.6rem] md:text-[2rem]'
      >
        {explanationText}
      </motion.p>

      <ImageSlider images={images} />
    </section>
  );
};

export default LandingSection;
