import type { IncorrectQuiz } from '../../types/quizTypes';
import Button from '../Button';
import Modal from '../Modal';

interface AnswerHistoryCardProps {
  data: IncorrectQuiz;
  isOpen: boolean;
  setIsopen: (open: boolean) => void;
}

const IncorrectModal = ({
  data,
  isOpen,
  setIsopen,
}: AnswerHistoryCardProps) => {
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={setIsopen}>
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>상세</Modal.Title>
            <Modal.Close />
          </Modal.Header>
          <Modal.Item>
            <div className='flex flex-col items-center justify-center gap-5'>
              <h3 className='text-lg font-bold text-gray-900'>
                {data.question}
              </h3>

              {Object.entries(data.options).map(([key, value]) => {
                const isCorrectAnswer = key === data.correctAnswer;
                const isSelectedAnswer = key === data.selectedAnswer;

                const textColorClass = isCorrectAnswer
                  ? 'text-green-600 font-bold'
                  : isSelectedAnswer
                    ? 'text-red-600 font-semibold'
                    : 'text-gray-800';

                return (
                  <div
                    key={key}
                    className={`flex w-full items-center gap-4 rounded-lg border-2 p-4 transition-all duration-200 ${isCorrectAnswer ? 'border-green-500 bg-green-50' : isSelectedAnswer ? 'border-red-500 bg-red-50' : 'border-gray-200'} `}
                  >
                    <div className={`relative ${textColorClass}`}>
                      <span className='flex-1 font-medium'>
                        <span className='font-bold'>{key}.</span>
                        <span className='ml-2'>{value}</span>
                      </span>
                    </div>
                  </div>
                );
              })}

              <div className='mt-2 space-y-1 text-gray-700'>
                <p> 설명: {data.explanation}</p>

                <div className='mt-2 flex gap-3 text-sm text-gray-500'>
                  <p> 토픽: {data.topic}</p>
                  <p> 레벨: {data.level}</p>
                </div>
              </div>
            </div>
          </Modal.Item>
          <Modal.Footer>
            <Button onClick={() => setIsopen(false)}>닫기</Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default IncorrectModal;
