import LogoImg from '/logo.png';
import { Link } from 'react-router-dom';
import { useUserStore } from '../store/useUserStore';
import OauthLogin from '../page/OauthLogin';
import NickName from './ui/NickName';

const Header = () => {
  const { user } = useUserStore();

  return (
    <div className='fixed top-0 flex w-full items-center justify-between bg-gray-200 px-[20rem] py-[1rem]'>
      <Link to='/'>
        <img src={LogoImg} className='aspect-auto h-20 w-50' />
      </Link>

      <div className='flex gap-20 md:gap-50'>
        {user ? (
          <NickName name={user.nickname} />
        ) : (
          <div>
            어허 <OauthLogin />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
