import DeleteIcon from '@/assets/svg/DeleteIcon';

import type { IncorrectQuiz } from '@/types/quizTypes';
import { cn } from '@/utils/cn';
import { useQuiz } from '@/features/quizComp/hooks/useQuiz';
import Spinner from '@/components/ui/Spinner';
import { getTopicColor } from '@/utils/getHistoryOptionStyles';
import { getLevelColor } from '@/utils/getHistoryOptionStyles';

interface AnswerHistoryCardProps {
  data: IncorrectQuiz;
}

const AnswerHistoryCard = ({ data }: AnswerHistoryCardProps) => {
  const { handleDeleteIncorrect } = useQuiz();

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();

    handleDeleteIncorrect.mutate(data.id);
  };

  return (
    <div className='hover:ring-blue w-full rounded-xl border border-gray-300 bg-white/10 px-10 py-8 shadow-sm hover:animate-pulse hover:cursor-pointer hover:ring-2'>
      <h3 className='text-[1.2rem] font-bold text-white md:text-[1.6rem]'>
        {data.question}
      </h3>

      <div className='mt-2 flex justify-between space-y-1 text-gray-700'>
        <div className='mt-2 flex flex-col gap-3 text-[1.4rem] font-bold text-gray-500 md:text-[1.6rem]'>
          <p className={cn('font-bold', getTopicColor(data.topic))}>
            {data.topic}
          </p>
          <p className={cn(`font-bold`, getLevelColor(data.level))}>
            {data.level}
          </p>
        </div>

        {handleDeleteIncorrect.isPending ? (
          <div>
            <Spinner className='h-10 w-10' />
          </div>
        ) : (
          <div
            className={cn(
              'text-red-500',
              handleDeleteIncorrect.isPending &&
                'pointer-events-none opacity-50',
            )}
            onClick={handleDelete}
          >
            <DeleteIcon />
          </div>
        )}
      </div>
    </div>
  );
};

export default AnswerHistoryCard;
