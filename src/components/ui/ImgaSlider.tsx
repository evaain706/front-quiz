import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ImageSliderProps {
  images: {
    src: string;
    alt: string;
  }[];
  sildeInterval?: number;
}

const ImageSlider = ({ images, sildeInterval = 3000 }: ImageSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  const paginate = useCallback(
    (nextDirection: number) => {
      setDirection(nextDirection);
      setCurrentIndex((prev) => {
        let next = prev + nextDirection;
        if (next < 0) next = images.length - 1;
        if (next >= images.length) next = 0;
        return next;
      });
    },
    [images.length],
  );

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, sildeInterval);

    return () => clearInterval(timer);
  }, [sildeInterval, paginate]);

  return (
    <div className='relative w-full max-w-[100rem] hover:scale-[1.02]'>
      <div
        className={`group border-border/50 relative overflow-hidden rounded-2xl border bg-black p-2 backdrop-blur-md transition-all`}
      >
        <div className='relative aspect-video w-full overflow-hidden rounded-xl'>
          <AnimatePresence initial={false} custom={direction}>
            <motion.img
              key={currentIndex}
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              custom={direction}
              variants={slideVariants}
              initial='enter'
              animate='center'
              exit='exit'
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className='absolute inset-0 h-full w-full object-contain'
            />
          </AnimatePresence>
        </div>
      </div>

      {images.length > 1 && (
        <div className='mt-4 flex justify-center gap-2'>
          {images.map((_, index) => (
            <button
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex ? `w-4 bg-gray-300` : `h-2 w-2 bg-white`
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageSlider;
