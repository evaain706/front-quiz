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
    <div className='flex max-h-[50rem] overflow-auto flex-col gap-4 px-10'>
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
  );
};

export default MyPageMain;
