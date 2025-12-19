import Button from '@/components/Button';
import { useNavigate } from 'react-router-dom';

const MyPageMain = () => {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col gap-5 text-white'>
      <Button
        className='w-[30rem] bg-white p-10 text-[2rem] font-bold text-black'
        onClick={() => navigate('/mypage/setting')}
      >
        유저정보수정
      </Button>
      <Button
        className='w-[30rem] bg-white p-10 text-[2rem] font-bold text-black'
        onClick={() => navigate('/mypage/statistics')}
      >
        통계보기
      </Button>
      <Button
        className='w-[30rem] bg-white p-10 text-[2rem] font-bold text-black'
        onClick={() => navigate('/mypage/IncorrectAnswer')}
      >
        오답문제에 저장된 문제 조회
      </Button>
    </div>
  );
};

export default MyPageMain;
