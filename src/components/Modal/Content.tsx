'use client';

import { cn } from '@/utils/cn';
import { useModalContext } from '@/contexts/ModalContext';
import type { ModalProps } from '@/types/modalTypes';
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ExtendedModalContentProps extends ModalProps {
  zIndex?: number;
  backdropClassName?: string;
}

export default function ModalContent({
  children,
  className,
  zIndex,
  backdropClassName = '',
}: ExtendedModalContentProps) {
  const { isOpen } = useModalContext();
  const [isMounted, setIsMounted] = useState(false);

  const zIndexClass = zIndex ? `z-[${zIndex}]` : 'z-999';

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key='backdrop'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className={cn(
            'fixed inset-0 flex items-center justify-center bg-black/50',
            zIndexClass,
            backdropClassName,
          )}
        >
          <motion.div
            key='modal'
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ scaleX: 0, opacity: 0.1 }}
            transition={{
              duration: 0.35,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className={cn(
              'relative m-auto flex h-fit max-h-[85%] w-screen min-w-[30rem] origin-center flex-col bg-white p-8 px-10 shadow-2xl md:h-fit md:w-[40%] md:max-w-600',
              className,
            )}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    modalRoot,
  );
}
