import DeleteIcon from '../../../assets/svg/DeleteIcon';
import Button from '../../../components/Button';
import type { IncorrectQuiz } from '../../../types/quizTypes';
import { cn } from '../../../utils/cn';
import { useQuiz } from '../../quizComp/hooks/useQuiz';

interface AnswerHistoryCardProps {
  data: IncorrectQuiz;
}

const AnswerHistoryCard = ({ data }: AnswerHistoryCardProps) => {
  let topicClassName = '';
  let levelClassName = '';

  const { handleDeleteIncorrect } = useQuiz();

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleDeleteIncorrect.mutate(data.id);
  };

  if (data.topic?.includes('React')) {
    topicClassName = 'text-blue-500';
  } else if (data.topic?.includes('TypeScript')) {
    topicClassName = 'text-sky-300';
  } else if (data.topic?.includes('JavaScript')) {
    topicClassName = 'text-yellow-500';
  } else if (data.topic?.includes('CSS')) {
    topicClassName = 'text-pink-500';
  } else {
    topicClassName = 'text-white/80';
  }

  if (data.level === '쉬움') {
    levelClassName += 'text-green-300';
  } else if (data.level === '보통') {
    levelClassName += 'text-yellow-300';
  } else {
    levelClassName += 'text-red-600';
  }

  return (
    <div className='hover:ring-blue w-full rounded-xl border border-gray-300 bg-white/10 px-10 py-8 shadow-sm hover:animate-pulse hover:cursor-pointer hover:ring-2'>
      <h3 className='text-[1.2rem] font-bold text-white md:text-[1.6rem]'>
        {data.question}
      </h3>

      <div className='mt-2 flex justify-between space-y-1 text-gray-700'>
        <div className='mt-2 flex flex-col gap-3 text-[1.4rem] font-bold text-gray-500 md:text-[1.6rem]'>
          <p className={cn('font-bold', topicClassName)}>{data.topic}</p>
          <p className={cn(`font-bold`, levelClassName)}>{data.level}</p>
        </div>

        <div className='text-red-500' onClick={handleDelete}>
          <DeleteIcon />
        </div>
      </div>
    </div>
  );
};

export default AnswerHistoryCard;
