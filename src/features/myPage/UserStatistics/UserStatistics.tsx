import type { UserStatistics } from '../../../types/statTypes';
import { useQuiz } from '../../quizComp/hooks/useQuiz';
import { useQuery } from '@tanstack/react-query';
import StatisticCard from '../../../components/ui/MyPage/Statistics/StatisticsCard';
import StatisticGrid from '../../../components/ui/MyPage/Statistics/StatisticGrid';
import StatisticSection from '../../../components/ui/MyPage/Statistics/StatisticSection';
import Button from '../../../components/Button';
import { useNavigate } from 'react-router-dom';
import BackIcon from '../../../assets/svg/BackIcon';

const UserStatisticPage = () => {
  const { getUserStatistics } = useQuiz();

  const navigate = useNavigate();

  const { data, isLoading } = useQuery<UserStatistics | null>({
    queryKey: ['statistics'],
    queryFn: getUserStatistics,
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className='flex flex-col items-center justify-center gap-5 overflow-auto'>
      {data && (
        <div className='w-screen bg-gray-900 p-10 text-white md:w-[70rem] lg:w-[100rem]'>
          <div className='relative mb-6 flex flex-col items-center'>
            <h1 className='text-[3rem] font-bold'>내 통계</h1>

            <Button
              onClick={() => navigate(-1)}
              className='mt-4 w-20 text-[1.4rem] md:absolute md:right-0 md:mt-0'
            >
              <BackIcon className='h-10 w-20' />
            </Button>
          </div>

          <StatisticSection title='전체 정답/오답'>
            <div className='flex items-center justify-center gap-4'>
              <StatisticCard label='정답' value={data.totalStats.correct} />
              <StatisticCard label='오답' value={data.totalStats.incorrect} />
              <StatisticCard
                label='정답률'
                value={`${Math.floor(
                  (data.totalStats.correct /
                    (data.totalStats.correct + data.totalStats.incorrect)) *
                    100,
                )}%`}
              />
            </div>
          </StatisticSection>

          <StatisticSection title='카테고리별 통계'>
            <StatisticGrid data={data.categoryStats} />
          </StatisticSection>

          <StatisticSection title='레벨별 통계'>
            <StatisticGrid data={data.levelStats} />
          </StatisticSection>
        </div>
      )}
    </div>
  );
};

export default UserStatisticPage;
