import type { LevelStatistic } from '@/types/statTypes';

interface LevelStatisticGridProps {
  data: LevelStatistic[];
}

const LevelStatisticGrid = ({ data }: LevelStatisticGridProps) => {
  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3'>
      {data.map(({ _id, level, correct, incorrect }) => (
        <div key={_id} className='rounded-xl bg-gray-800 p-4 shadow-md'>
          <h3 className='mb-2 text-[1.8rem] font-bold'>{level}</h3>
          <p className='text-[1.6rem]'>
            정답: <span className='font-bold text-green-400'>{correct}</span>
          </p>
          <p className='text-[1.6rem]'>
            오답: <span className='font-bold text-red-400'>{incorrect}</span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default LevelStatisticGrid;
