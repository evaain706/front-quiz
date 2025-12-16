import { useEffect } from 'react';
import Button from '../../components/Button';
import { useQuiz } from './hooks/useQuiz';
import { useQuizStore } from '../../store/useQuizStore';
import { useOptionStore } from '../../store/useOptionStore';
import QuestionCard from './QuestionCard';
import OptionsCard from './OptionCard';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';

const QuizScreen = () => {
  const { fetchQuiz, handleSubmit, error } = useQuiz();
  const isLoading = useQuizStore((s) => s.isLoading);
  const quiz = useQuizStore((s) => s.quiz);
  const isGrading = useQuizStore((s) => s.isGrading);
  const category = useOptionStore((s) => s.category);

  useEffect(() => {
    fetchQuiz();
  }, []);

  return (
    <div className='mx-3 mt-7 flex flex-col gap-3'>
      <div className='flex flex-col items-center justify-center'>
        <h2 className='text-[3rem] font-bold text-white md:text-[5rem]'>
          {category}
        </h2>
      </div>

      <ErrorBoundary
        fallback={(reset) => (
          <div className='flex flex-col items-center p-10 text-white'>
            <p className='mb-4 text-2xl'>퀴즈 불러오기 실패</p>
            <Button
              onClick={() => {
                reset();
                fetchQuiz();
              }}
            >
              다시 시도
            </Button>
          </div>
        )}
      >
        <QuestionCard error={error} isLoading={isLoading} quiz={quiz} />
      </ErrorBoundary>

      <OptionsCard />

      <div className='flex w-full items-center justify-between'>
        <Button
          onClick={fetchQuiz}
          disabled={isLoading || isGrading}
          isLoading={isGrading || isLoading}
        >
          문제받기
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isGrading || isLoading}
          isLoading={isGrading || isLoading}
        >
          채점
        </Button>
      </div>
    </div>
  );
};

export default QuizScreen;
