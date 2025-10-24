import type { IncorrectQuiz } from '../../../types/quizTypes';

interface AnswerHistoryCardProps {
  data: IncorrectQuiz;
}

const AnswerHistoryCard = ({ data }: AnswerHistoryCardProps) => {
  return (
    <div className='w-full rounded-xl border border-gray-300 bg-white px-10 py-5 shadow-sm'>
      <h3 className='text-lg font-semibold text-gray-900'>{data.question}</h3>

      <div className='mt-2 space-y-1 text-gray-700'>
        <p>
          선택한 답:
          <span className='font-medium text-red-500'>
            {data.selectedAnswer}
          </span>
        </p>
        <p>
          정답:
          <span className='font-medium text-green-600'>
            {data.correctAnswer}
          </span>
        </p>
        <p> 설명: {data.explanation}</p>

        <div className='mt-2 flex gap-3 text-sm text-gray-500'>
          <p> 토픽: {data.topic}</p>
          <p> 레벨: {data.level}</p>
        </div>
      </div>
    </div>
  );
};

export default AnswerHistoryCard;
