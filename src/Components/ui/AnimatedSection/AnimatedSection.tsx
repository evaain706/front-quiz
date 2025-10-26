import React from 'react';
import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import useScroll from '../../hooks/useScroll';

interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

const AnimatedSection = ({
  children,
  delay = 0,
  className = '',
}: AnimatedSectionProps) => {
  const [targetRef, isVisible] = useScroll({
    threshold: 0.5,
    freezeOnceVisible: true,
  });

  return (
    <motion.div
      ref={targetRef as React.RefObject<HTMLDivElement>}
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut', delay: delay }}
      className={`flex items-center justify-center py-20 text-center ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
