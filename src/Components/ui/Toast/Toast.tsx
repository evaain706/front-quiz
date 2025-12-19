import { createPortal } from 'react-dom';
import { motion } from 'motion/react';
import { cn } from '../../../utils/cn';

interface ToastProps {
  mode: 'default' | 'success' | 'error' | 'warn';
  message: string;
}

const Toast = ({ mode, message }: ToastProps) => {
  const root = document.getElementById('modal-root');

  if (!root) {
    return null;
  }

  let className = '';

  if (mode === 'default') {
    className += 'bg-white text-gray-800';
  } else if (mode === 'success') {
    className += 'bg-green-200 text-green-800';
  } else if (mode === 'error') {
    className += 'bg-red-200 text-red-800';
  } else if (mode === 'warn') {
    className += 'bg-yellow-200 text-yellow-800';
  }

  return createPortal(
    <motion.div
      className={cn(
        'fixed top-40 left-1/2 z-[999] w-[20rem] -translate-x-1/2 rounded-lg py-5 text-center shadow-lg md:w-[30rem]',
        className,
      )}
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -50, opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <p className='text-[1.6rem] font-bold text-black'>{message}</p>
    </motion.div>,
    root,
  );
};

export default Toast;
