import { AnimatePresence } from 'motion/react';
import Toast from './Toast';
import { useToastStore } from '../../../store/useToastStore';

const ToastContainer = () => {
  const toasts = useToastStore((state) => state.toasts);

  return (
    <AnimatePresence>
      {toasts.map((toast) => (
        <Toast key={toast.id} mode={toast.mode} message={toast.message} />
      ))}
    </AnimatePresence>
  );
};

export default ToastContainer;
