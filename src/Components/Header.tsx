import LogoImg from '/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/useUserStore';
import OauthLogin from '../page/OauthLogin';
import NickName from './ui/NickName';
import Dropdown from './ui/Dropdown';

const Header = () => {
  const { user } = useUserStore();
  const navigate = useNavigate();

  return (
    <div className='fixed top-0 flex w-full items-center justify-between bg-slate-200 px-[5rem] py-[1rem] md:px-[10rem]'>
      <div>
        <Link to='/main'>
          <h2 className='text-[2rem] font-bold md:text-[4rem]'>FrontQuiz</h2>
        </Link>
      </div>

      <div className='flex gap-10 md:gap-50'>
        {user ? (
          <>
            <div className='relative'>
              <Dropdown>
                <Dropdown.Trigger>
                  <NickName name={user.nickname} />
                </Dropdown.Trigger>
                <Dropdown.Content>
                  <Dropdown.Item onClick={() => navigate('/mypage')}>
                    마이페이지로 이동
                  </Dropdown.Item>

                  <Dropdown.Item onClick={() => console.log('메뉴2 클릭')}>
                    메뉴2
                  </Dropdown.Item>
                </Dropdown.Content>
              </Dropdown>
            </div>
          </>
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
