import { useEffect } from 'react';
import { useQuiz } from './hooks/useQuiz';
import QuizHeader from './components/QuizHeader';
import QuizErrorFallback from './components/QuizErrorFallback';
import QuizActionButtons from './components/QuizActionButtons';
import QuestionCard from './QuestionCard';
import OptionsCard from './OptionCard';

const QuizScreen = () => {
  const { quiz, isLoading, isError, fetchQuiz, handleSubmit, isFetching } =
    useQuiz();

  useEffect(() => {
    fetchQuiz();
  }, []);

  return (
    <div className='mt-7 flex flex-col gap-3'>
      <div className='flex flex-col items-center justify-center'>
        <QuizHeader />
      </div>

      {isError ? (
        <QuizErrorFallback onRetry={fetchQuiz} />
      ) : (
        <QuestionCard isLoading={isFetching} quiz={quiz} />
      )}

      <OptionsCard quiz={quiz} isFetching={isFetching} />

      <QuizActionButtons
        fetchQuiz={fetchQuiz}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        isFetching={isFetching}
      />
    </div>
  );
};

export default QuizScreen;
