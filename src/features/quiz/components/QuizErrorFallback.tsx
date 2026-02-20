import Button from '@/components/Button';

interface QuizErrorFallbackProps {
  onRetry: () => void;
}

const QuizErrorFallback = ({ onRetry }: QuizErrorFallbackProps) => {
  return (
    <div className='flex flex-col items-center p-10 text-white'>
      <p className='mb-4 text-2xl'>퀴즈 불러오기 실패</p>
      <Button onClick={onRetry}>다시 시도</Button>
    </div>
  );
};

export default QuizErrorFallback;
