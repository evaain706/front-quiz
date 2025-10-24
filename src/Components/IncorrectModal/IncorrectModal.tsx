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
            <div className='flex min-h-[40rem] flex-col items-center justify-center gap-5'>
              <h3 className='text-lg font-semibold text-gray-900'>
                {data.question}
              </h3>

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
