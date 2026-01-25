import { Link, useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/useUserStore';
import OauthLogin from '../page/OauthLogin';
import Dropdown from './ui/Dropdown';
import ProfileImage from './ui/ProfileImage';
import { useLogout } from '../hooks/useLogout';

const Header = () => {
  const user = useUserStore((s) => s.user);
  const navigate = useNavigate();

  const logout = useLogout();

  return (
    <div className='fixed top-0 z-50 flex w-full items-center justify-between bg-slate-200 px-[3rem] py-[1rem] md:px-[10rem]'>
      <div>
        <Link to='/main'>
          <h2 className='text-[2rem] font-bold md:text-[4rem]'>FrontQuiz</h2>
        </Link>
      </div>

      <div className='flex gap-5 md:gap-50'>
        {user ? (
          <>
            <div className='relative'>
              <Dropdown>
                <Dropdown.Trigger>
                  <ProfileImage
                    className='h-16 w-16 md:h-24 md:w-24'
                    src={user.profileImage}
                  />
                </Dropdown.Trigger>
                <Dropdown.Content>
                  <Dropdown.Item onClick={() => navigate('/mypage')}>
                    마이페이지로 이동
                  </Dropdown.Item>

                  <Dropdown.Item onClick={() => logout()}>
                    로그아웃
                  </Dropdown.Item>
                </Dropdown.Content>
              </Dropdown>
            </div>
          </>
        ) : (
          <div>
            <OauthLogin />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
