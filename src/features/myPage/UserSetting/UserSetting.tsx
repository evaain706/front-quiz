import Button from '@/components/Button';
import Input from '@/components/Input';
import ImageUpload from '@/components/ui/ImageUpload';
import { useState } from 'react';
import { privateInstance } from '@/apis/privateInstance';
import { useUserStore } from '@/store/useUserStore';
import { useToastStore } from '@/store/useToastStore';
import BackIcon from '@/assets/svg/BackIcon';
import { useNavigate } from 'react-router-dom';

const UserSettingPage = () => {
  const [nickName, setNickName] = useState('');

  const updateUser = useUserStore((s) => s.updateUser);

  const addToast = useToastStore((s) => s.addToast);

  const user = useUserStore((s) => s.user);

  const navigate = useNavigate();

  const handleNickNameUpdate = async () => {
    if (nickName.length === 0) {
      addToast('warn', '한글자이상 입력해주세요');
      return;
    }

    try {
      const response = await privateInstance.post('/api/auth/update', {
        nickname: nickName,
      });
      console.log(response.data.user.nickname);
      updateUser(response.data.user.nickname);
      addToast('success', '닉네임이 변경되었습니다.');
    } catch (err) {
      console.log(err);
      addToast('error', '닉네임 변경에 실패했습니다.');
    } finally {
      setNickName('');
    }
  };

  return (
    <div className='flex min-h-[calc(100vh-6rem)] w-full flex-col justify-center gap-4 p-10'>
      <h2 className='text-center text-[2rem] font-bold text-white md:text-[3rem]'>
        유저정보변경
      </h2>

      <div className='relative flex h-[50rem] w-full flex-col items-center justify-around rounded-md bg-slate-300 p-10 transition-transform md:flex-row'>
        <Button
          onClick={() => navigate(-1)}
          className='absolute top-3 right-10 w-20'
        >
          <BackIcon />
        </Button>
        <div className='flex flex-col items-center gap-5'>
          <h2 className='text-[1.6rem] font-bold text-black md:text-[2rem]'>
            닉네임 변경
          </h2>
          <Input
            name='name'
            placeholder='닉네임을 입력해주세요'
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
          />
          <Button onClick={handleNickNameUpdate}>변경</Button>
        </div>

        <div className='flex flex-col items-center gap-5'>
          <h2 className='text-[1.6rem] font-bold text-black md:text-[2rem]'>
            프로필 이미지 변경
          </h2>
          <ImageUpload initialSrc={user?.profileImage} />
        </div>
      </div>
    </div>
  );
};

export default UserSettingPage;
