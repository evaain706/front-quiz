import type { UserStatistics } from '@/types/statTypes';
import { useQuery } from '@tanstack/react-query';
import StatisticCard from '@/components/ui/MyPage/Statistics/StatisticsCard';
import StatisticGrid from '@/components/ui/MyPage/Statistics/StatisticGrid';
import StatisticSection from '@/components/ui/MyPage/Statistics/StatisticSection';
import Button from '@/components/Button';
import { useNavigate } from 'react-router-dom';
import BackIcon from '@/assets/svg/BackIcon';
import UserStatisticsSkeleton from '@/components/ui/Skeleton/UserStatisticsSkeleton';
import { useUserStore } from '@/store/useUserStore';
import ErrorComp from '@/components/ui/ErrorComp';
import { useUserStatistics } from '../hooks/useUserStatistics';
import LevelStatisticGrid from '@/components/ui/MyPage/Statistics/LevelStatisticGrid';
import { useState } from 'react';
import NavigateQuizModal from '@/components/NavigateQuizModal/NavigateQuizModal';
import { checkStatistics } from '@/utils/checkStatistics';

const UserStatisticPage = () => {
  const { getUserStatistics } = useUserStatistics();

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery<UserStatistics>({
    queryKey: ['statistics'],
    queryFn: getUserStatistics,
    staleTime: 30 * 60 * 1000,
  });

  const user = useUserStore((s) => s.user);

  if (isLoading) {
    return <UserStatisticsSkeleton />;
  }

  if (isError) {
    return (
      <div className='flex min-h-content flex-col items-center justify-center gap-5 overflow-auto'>
        <ErrorComp
          PageName='유저통계페이지 에러'
          message='유저통계데이터를 불러오는데 실패했습니다'
        />
      </div>
    );
  }

  if (!data) {
    return (
      <div className='flex min-h-content flex-col items-center justify-center gap-5 overflow-auto'>
        <ErrorComp
          PageName='유저통계페이지 데이터 오류'
          message='통계 데이터에 이상이 존재합니다'
        />
      </div>
    );
  }

  const {
    totalCorrect,
    totalIncorrect,
    accuracy,
    isEmptyStats,
    isEmptyCategory,
    isEmptyLevel,
  } = checkStatistics(data);

  return (
    <div className='flex min-h-content-7 flex-col items-center justify-center gap-5 overflow-auto'>
      <div className='mt-8 w-full bg-gray-900 p-10 text-white'>
        <div className='relative mb-6 flex flex-col items-center'>
          <h1 className='text-[3rem] font-bold'>
            <span className='text-gray-600'>{user?.nickname}</span> 님의 통계
            <p>{data?.content}</p>
          </h1>

          <Button
            onClick={() => navigate(-1)}
            className='mt-4 w-20 text-[1.4rem] md:absolute md:right-0 md:mt-0'
          >
            <BackIcon className='h-10 w-20' />
          </Button>
        </div>

        <StatisticSection title='전체 정답/오답'>
          {isEmptyStats ? (
            <p className='py-10 text-center text-[1.6rem] text-gray-400'>
              아직 퀴즈 기록이 없습니다
            </p>
          ) : (
            <div className='flex items-center justify-center gap-4'>
              <StatisticCard label='정답' value={totalCorrect} />
              <StatisticCard label='오답' value={totalIncorrect} />
              <StatisticCard label='정답률' value={`${accuracy}%`} />
            </div>
          )}
        </StatisticSection>

        <StatisticSection title='카테고리별 통계'>
          {isEmptyCategory ? (
            <p className='py-10 text-center text-[1.6rem] text-gray-400'>
              아직 카테고리별 통계가 없어요
            </p>
          ) : (
            <StatisticGrid
              onClick={() => setOpen((prev) => !prev)}
              data={data.categoryStats}
            />
          )}
        </StatisticSection>

        <StatisticSection title='레벨별 통계'>
          {isEmptyLevel ? (
            <p className='py-10 text-center text-[1.6rem] text-gray-400'>
              아직 레벨별 통계가 없어요
            </p>
          ) : (
            <LevelStatisticGrid data={data.levelStats} />
          )}
        </StatisticSection>

        {isEmptyStats && (
          <div className='mt-10 flex justify-center'>
            <Button onClick={() => navigate('/select')}>퀴즈 풀러 가기</Button>
          </div>
        )}
      </div>

      <NavigateQuizModal isOpen={open} onOpenChange={setOpen} />
    </div>
  );
};

export default UserStatisticPage;
