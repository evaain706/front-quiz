import { useEffect } from 'react';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import { useQuiz } from './hooks/useQuiz';
import { useQuizStore } from '@/store/useQuizStore';
import QuizHeader from './components/QuizHeader';
import QuizErrorFallback from './components/QuizErrorFallback';
import QuizActionButtons from './components/QuizActionButtons';
import QuestionCard from './QuestionCard';
import OptionsCard from './OptionCard';

const QuizScreen = () => {
  const { fetchQuiz, error } = useQuiz();
  const isLoading = useQuizStore((s) => s.isLoading);
  const quiz = useQuizStore((s) => s.quiz);

  useEffect(() => {
    fetchQuiz();
  }, []);

  return (
    <div className='mt-7 flex flex-col gap-3'>
      <div className='flex flex-col items-center justify-center'>
        <QuizHeader />
      </div>

      <ErrorBoundary
        fallback={(reset) => (
          <QuizErrorFallback onRetry={fetchQuiz} reset={reset} />
        )}
      >
        <QuestionCard error={error} isLoading={isLoading} quiz={quiz} />
      </ErrorBoundary>

      <OptionsCard />

      <QuizActionButtons />
    </div>
  );
};

export default QuizScreen;
