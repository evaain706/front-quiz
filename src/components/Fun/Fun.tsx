import { createPortal } from 'react-dom';
import img from '/cinema.jpg';

const Fun = () => {
  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null;

  return createPortal(
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
      <div className='relative m-auto flex flex-col items-center justify-center rounded-2xl bg-white shadow-2xl'>
        <img src={img} width={400} height={400} alt='fun image' />
      </div>
    </div>,
    modalRoot,
  );
};

export default Fun;
