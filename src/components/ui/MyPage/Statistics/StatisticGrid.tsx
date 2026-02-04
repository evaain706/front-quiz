import { useOptionStore } from '@/store/useOptionStore';

interface StatisticGridProps {
  data: Record<string, { correct: number; incorrect: number; _id: string }>;
  onClick?: () => void;
}

const StatisticGrid = ({ data, onClick }: StatisticGridProps) => {
  const setCategory = useOptionStore((s) => s.setCategory);
  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3'>
      {Object.entries(data).map(([key, v]) => (
        <div
          onClick={() => {
            setCategory(key);
            onClick?.();
          }}
          key={v._id}
          className='cursor-pointer rounded-xl bg-gray-800 p-4 shadow-md transition-colors hover:bg-gray-700'
        >
          <h3 className='mb-2 text-[1.8rem] font-bold'>{key}</h3>
          <p className='text-[1.6rem]'>
            정답: <span className='font-bold text-green-400'>{v.correct}</span>
          </p>
          <p className='text-[1.6rem]'>
            오답: <span className='font-bold text-red-400'>{v.incorrect}</span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default StatisticGrid;
