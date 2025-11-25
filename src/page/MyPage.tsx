import MyPageMain from '../features/myPage/MyPageMain';
import UserSetting from '../features/myPage/UserSetting';


const MyPage = () => {
  return (
    <div className='flex w-full items-center justify-center'>
      <UserSetting />
    </div>
  );
};

export default MyPage;
