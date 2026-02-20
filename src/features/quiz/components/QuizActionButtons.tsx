import Button from '@/components/Button';
import { useQuiz } from '../hooks/useQuiz';
import { useQuizStore } from '@/store/useQuizStore';

const QuizActionButtons = () => {
  const { fetchQuiz, handleSubmit, isLoading } = useQuiz();
  const isGrading = useQuizStore((s) => s.isGrading);
  const userAnswer = useQuizStore((s) => s.userAnswer);
  const result = useQuizStore((s) => s.result);

  return (
    <div className='flex min-h-[4.8rem] w-full items-center justify-between gap-3'>
      <Button
        className='w-50 bg-white/30 text-white hover:text-black'
        onClick={fetchQuiz}
        disabled={isLoading || isGrading}
        isLoading={isGrading || isLoading}
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
