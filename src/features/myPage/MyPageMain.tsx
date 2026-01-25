import MyPageCard from '@/components/ui/MyPage/MyPageCard';
import { useNavigate } from 'react-router-dom';
import { Settings, BarChart3, FileQuestion } from 'lucide-react';

const MyPageMain = () => {
  const navigate = useNavigate();
  return (
    <div className='flex w-full flex-col items-center gap-5 text-white'>
      <div className='text-center'>
        <h2 className='text-[3rem] font-bold'>마이페이지</h2>
        <p className='text-[2rem] font-bold text-slate-500'>
          메뉴를 선택해주세요
        </p>
      </div>

      <MyPageCard
        icon={Settings}
        title='유저정보변경'
        description='닉네임/프로필사진을 변경'
        onClick={() => navigate('/mypage/setting')}
      />
      <MyPageCard
        icon={BarChart3}
        title='문제통계'
        description='풀었던 문제들의 통계를 확인'
        onClick={() => navigate('/mypage/statistics')}
      />
      <MyPageCard
        icon={FileQuestion}
        title='오답문제확인'
        description='오답문제에 등록된 문제들을 확인'
        onClick={() => navigate('/mypage/IncorrectAnswer')}
      />
    </div>
  );
};

export default MyPageMain;
