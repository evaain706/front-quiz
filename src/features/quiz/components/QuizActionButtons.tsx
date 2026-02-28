import Button from '@/components/Button';

import { useQuizStore } from '@/store/useQuizStore';

const QuizActionButtons = ({
  fetchQuiz,
  handleSubmit,
  isLoading,
  isFetching,
}: {
  fetchQuiz: () => void;
  handleSubmit: () => void;
  isLoading: boolean;
  isFetching: boolean;
}) => {
  const isGrading = useQuizStore((s) => s.isGrading);
  const userAnswer = useQuizStore((s) => s.userAnswer);
  const result = useQuizStore((s) => s.result);

  return (
    <div className='flex min-h-[4.8rem] w-full items-center justify-between gap-3'>
      <Button
        className='w-50 bg-white/30 text-white hover:text-black'
        onClick={fetchQuiz}
        disabled={isFetching || isGrading}
        isLoading={isFetching || isLoading}
      >
        문제받기
      </Button>
      {userAnswer && !result ? (
        <Button
          className='w-50 bg-white/20 text-white hover:text-black'
          onClick={handleSubmit}
          disabled={isGrading}
          isLoading={isGrading}
        >
          채점
        </Button>
      ) : (
        <span className='w-50' aria-hidden />
      )}
    </div>
  );
};

export default QuizActionButtons;
