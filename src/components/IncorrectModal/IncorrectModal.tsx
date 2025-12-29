import type { IncorrectQuiz } from '@/types/quizTypes';
import Button from '../Button';
import Modal from '../Modal';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';

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
  const markdownContent = data.question;

  const navigate = useNavigate();

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={setIsopen}>
        <Modal.Content className='rounded-4xl bg-gray-900'>
          <Modal.Item>
            <div className='flex flex-col items-center justify-center gap-5 md:gap-8'>
              <h3 className='text-[1.3rem] font-bold text-white md:text-[1.6rem]'>
                <ReactMarkdown>{markdownContent}</ReactMarkdown>
              </h3>

              {Object.entries(data.options).map(([key, value]) => {
                const isCorrectAnswer = key === data.correctAnswer;
                const isSelectedAnswer = key === data.selectedAnswer;

                const textColorClass = isCorrectAnswer
                  ? 'text-green-600 font-bold '
                  : isSelectedAnswer
                    ? 'text-red-600 font-semibold'
                    : 'text-white';

                return (
                  <div
                    key={key}
                    className={`flex w-full items-center gap-4 rounded-lg border-2 bg-white/10 p-4 transition-all duration-200 ${isCorrectAnswer ? 'border-green-500 bg-green-50' : isSelectedAnswer ? 'border-red-500 bg-red-50' : 'border-gray-200'} `}
                  >
                    <div className={`relative ${textColorClass}`}>
                      <span className='flex-1 text-[1.2rem] font-bold md:text-[1.6rem]'>
                        <span className='font-bold'>{key}.</span>
                        <span className='ml-2'>{value}</span>
                      </span>
                    </div>
                  </div>
                );
              })}

              <div className='mt-2 space-y-1 text-[1.4rem] font-bold text-white'>
                <p> {data.explanation}</p>

                <div className='mt-2 flex gap-3 text-[1.2rem] font-bold text-white/80 md:text-[1.4rem]'>
                  <p> 토픽: {data.topic}</p>
                  <p> 레벨: {data.level}</p>
                </div>
              </div>
            </div>
          </Modal.Item>
          <Modal.Footer>
            <Button onClick={() => setIsopen(false)}>닫기</Button>
            <Button
              onClick={() => {
                navigate('/community/create', {
                  state: {
                    fromWrongQuiz: data,
                  },
                });
              }}
            >
              질문으로 올리기 ✍️
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default IncorrectModal;
