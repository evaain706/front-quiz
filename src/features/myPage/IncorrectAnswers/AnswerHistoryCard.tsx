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

  const handleDelete = () => {
    handleDeleteIncorrect.mutate(data.id);
  };

  if (data.topic?.includes('React')) {
    topicClassName = 'text-blue-800';
  } else if (data.topic?.includes('TypeScript')) {
    topicClassName = 'text-sky-300';
  } else if (data.topic?.includes('JavaScript')) {
    topicClassName = 'text-yellow-500';
  } else if (data.topic?.includes('CSS')) {
    topicClassName = 'text-pink-500';
  } else {
    topicClassName = 'text-gray-600';
  }

  if (data.level === '쉬움') {
    levelClassName += 'text-green-600';
  } else if (data.level === '보통') {
    levelClassName += 'text-yellow-500';
  } else {
    levelClassName += 'text-red-600';
  }

  return (
    <div className='w-full rounded-xl border border-gray-300 bg-white px-10 py-5 shadow-sm hover:animate-pulse hover:cursor-pointer'>
      <h3 className='text-[1.2rem] font-bold text-black md:text-[1.4rem]'>
        {data.question}
      </h3>

      <div className='mt-2 flex justify-between space-y-1 text-gray-700'>
        <div className='text-md mt-2 flex flex-col gap-3 font-bold text-gray-500'>
          <p className={cn('text-xl font-bold text-black', topicClassName)}>
            {data.topic}
          </p>
          <p className={cn(`text-xl font-bold`, levelClassName)}>
            {data.level}
          </p>
        </div>

        <div>
          <Button
            onClick={() => handleDelete()}
            className='w-[6rem] py-[1rem] md:w-[10rem]'
          >
            삭제
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnswerHistoryCard;
