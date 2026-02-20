import { useEffect } from 'react';
import { useQuiz } from './hooks/useQuiz';
import QuizHeader from './components/QuizHeader';
import QuizErrorFallback from './components/QuizErrorFallback';
import QuizActionButtons from './components/QuizActionButtons';
import QuestionCard from './QuestionCard';
import OptionsCard from './OptionCard';

const QuizScreen = () => {
 throw new Error('테스트용에러');
  const { quiz, isLoading, isError, fetchQuiz } = useQuiz();

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
        <QuestionCard isLoading={isLoading} quiz={quiz} />
      )}

      <OptionsCard quiz={quiz} />

      <QuizActionButtons />
    </div>
  );
};

export default QuizScreen;
