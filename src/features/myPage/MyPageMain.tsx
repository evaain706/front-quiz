import { useQuery } from '@tanstack/react-query';
import { useQuiz } from '../quizComp/hooks/useQuiz';
import type { IncorrectQuiz } from '../../types/quizTypes';
import AnswerHistoryCard from './IncorrectAnswers/AnswerHistoryCard';
import IncorrectModal from '../../components/IncorrectModal/IncorrectModal';
import { useState } from 'react';

const MyPageMain = () => {
  const { getIncorrectAnswers } = useQuiz();
  const [open, setOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<IncorrectQuiz | null>(null);

  const { isPending, error, data } = useQuery<IncorrectQuiz[]>({
    queryKey: ['incorrectAnswer'],
    queryFn: getIncorrectAnswers,
    staleTime: 5 * 60 * 1000,
  });

  const handleOpenModal = (quiz: IncorrectQuiz) => {
    setSelectedQuiz(quiz);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedQuiz(null);
  };

  if (isPending) return <>로딩중..</>;
  if (error) return <>에러발생: {error.message}</>;

  return (
    <div>
      <div className='mb-5 flex items-center justify-center'>
        <h2 className='text-[1.8rem] font-bold text-white md:text-[4rem]'>
          저장된 오답문제
        </h2>
      </div>

      <div className='flex h-[50rem] flex-col gap-4 overflow-auto p-10 md:h-[70rem]'>
        {data?.map((item) => (
          <div key={item.id} onClick={() => handleOpenModal(item)}>
            <AnswerHistoryCard data={item} />
          </div>
        ))}

        {selectedQuiz && (
          <IncorrectModal
            data={selectedQuiz}
            isOpen={open}
            setIsopen={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
};

export default MyPageMain;
