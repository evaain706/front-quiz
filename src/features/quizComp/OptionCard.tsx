import Button from '../../components/Button';
import { useQuizStore } from '../../store/useQuizStore';
import { useUserStore } from '../../store/useUserStore';
import { useQuiz } from './hooks/useQuiz';
import ResultDisplay from './ResultDisplay';
import React from 'react';

const OptionsCard = () => {
  const { quiz, userAnswer, setUserAnswer, result } = useQuizStore();
  const { handleAddInCorrect } = useQuiz();
  const { user } = useUserStore();

  if (!quiz) {
    return (
      <div className='mt-8 mb-8 min-h-[15rem] md:w-[70rem] lg:w-[90rem]'>
        <div className='rounded-md border border-gray-200 bg-white p-6 shadow-sm'>
          <div className='animate-pulse space-y-3'>
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className='flex items-center gap-4 rounded-lg border-2 border-gray-200 p-4'
              >
                <div className='h-6 w-6 flex-shrink-0 rounded-full bg-gray-300'></div>

                <div className='h-5 w-4/5 rounded bg-gray-300'></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const isSubmitted = !!result;

  return (
    <div className='mt-8 mb-8 min-h-[15rem] md:w-[70rem] lg:w-[90rem]'>
      <div className='rounded-xl border border-gray-200 bg-gray-400 p-6 shadow-md'>
        <div className='space-y-3'>
          {Object.entries(quiz.options).map(([key, value]) => {
            const isCorrectAnswer = key === quiz.answer;
            const isSelectedAnswer = key === userAnswer;

            let optionStyles = '';

            if (isSubmitted) {
              if (isCorrectAnswer) {
                optionStyles = 'border-green-500 bg-green-50 text-green-800';
              } else if (isSelectedAnswer) {
                optionStyles = 'border-red-500 bg-red-50 text-red-800';
              } else {
                optionStyles = 'border-gray-200 bg-gray-50 text-gray-500';
              }
            } else {
              if (isSelectedAnswer) {
                optionStyles = 'border-blue-500 bg-blue-50';
              } else {
                optionStyles =
                  'border-gray-300 hover:border-blue-400 hover:bg-gray-50';
              }
            }

            return (
              <label
                key={key}
                className={`flex items-center gap-4 rounded-lg border-2 p-4 transition-all duration-200 ${optionStyles} ${isSubmitted ? 'cursor-default' : 'cursor-pointer'} `}
              >
                <div className='relative flex-shrink-0'>
                  <input
                    type='radio'
                    name='answer'
                    value={key}
                    checked={isSelectedAnswer}
                    onChange={() => !isSubmitted && setUserAnswer(key)}
                    disabled={isSubmitted}
                    className='h-6 w-6 appearance-none rounded-full border-2 border-gray-300 transition-all duration-200 checked:border-blue-500 checked:bg-blue-500 disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-200'
                  />

                  {isSelectedAnswer && (
                    <svg
                      className='pointer-events-none absolute inset-0 h-6 w-6 text-white'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={3}
                        d='M5 13l4 4L19 7'
                      />
                    </svg>
                  )}
                </div>

                <span className='flex-1 font-bold text-gray-800 md:text-[1.8rem]'>
                  <span className='font-bold'>{key}.</span>
                  <span className='ml-2'>{value}</span>
                </span>
              </label>
            );
          })}
        </div>

        {result && (
          <div className='w-full'>
            <ResultDisplay
              explanation={result.explanation}
              isCorrect={result.isCorrect}
            />
          </div>
        )}

        {/* 로그인된 유저만 뜨도록 수정하기 */}
        {user && result?.isCorrect === false && (
          <div>
            <Button onClick={() => handleAddInCorrect()}>
              오답노트에 등록
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(OptionsCard);
