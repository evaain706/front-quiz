import LogoImg from '/logo.png';
import { Link } from 'react-router-dom';
import useUserStore from '../store/useUserStore';

const Header = () => {
  const { user } = useUserStore();

  return (
    <div className='fixed top-0 mb-[2rem] flex w-full items-center justify-between bg-gray-200 px-[4rem] py-[1rem]'>
      <Link to='/'>
        <img src={LogoImg} className='aspect-auto h-20 w-50' />
      </Link>

      <div className='flex gap-20 md:gap-50'>
        <Link to='/oauth'>로그인</Link>

        <h2>{user?.nickname}</h2>
      </div>
    </div>
  );
};

export default Header;
