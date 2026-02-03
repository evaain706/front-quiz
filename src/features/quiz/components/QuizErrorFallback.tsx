import Button from '@/components/Button';

interface QuizErrorFallbackProps {
  onRetry: () => void;
  reset: () => void;
}

const QuizErrorFallback = ({ onRetry, reset }: QuizErrorFallbackProps) => {
  const handleRetry = () => {
    reset();
    onRetry();
  };

  return (
    <div className='flex flex-col items-center p-10 text-white'>
      <p className='mb-4 text-2xl'>퀴즈 불러오기 실패</p>
      <Button onClick={handleRetry}>다시 시도</Button>
    </div>
  );
};

export default QuizErrorFallback;
