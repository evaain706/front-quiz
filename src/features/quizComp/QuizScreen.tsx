import { useEffect } from 'react';
import Button from '../../components/Button';
import { useQuiz } from './hooks/useQuiz';
import { useQuizStore } from '../../store/useQuizStore';
import { useOptionStore } from '../../store/useOptionStore';
import QuestionCard from './QuestionCard';
import OptionsCard from './OptionCard';

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
    <div className='mx-3 flex flex-col gap-3'>
      <div className='flex flex-col items-center justify-center'>
        <h2 className='text-[3rem] font-bold text-white md:text-[5rem]'>
          {category}
        </h2>
      </div>

      <div>
        <QuestionCard error={error} isLoading={isLoading} quiz={quiz} />
      </div>

      <OptionsCard />

      <div className='flex items-center justify-between'>
        <Button onClick={fetchQuiz} disabled={isLoading}>
          문제받기
        </Button>
        <Button onClick={handleSubmit} disabled={isGrading}>
          채점
        </Button>
      </div>
    </div>
  );
};

export default QuizScreen;
