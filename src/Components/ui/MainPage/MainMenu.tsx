import { useNavigate } from 'react-router-dom';

const MainMenu = () => {
  const navigate = useNavigate();

  return (
    <div className='mx-auto grid w-[100vw] max-w-[80rem] grid-cols-2 gap-2 p-5 sm:w-[50vw]'>
      <div className='aspect-square rounded-xl bg-amber-300' />
      <div className='aspect-square rounded-xl bg-red-300' />
      <div className='aspect-square rounded-xl bg-blue-300' />
      <div className='aspect-square rounded-xl bg-green-300' />
    </div>
  );
};

export default MainMenu;
