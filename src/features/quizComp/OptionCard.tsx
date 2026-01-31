import React, { lazy, Suspense } from 'react';
import Button from '@/components/Button';
import { useQuizStore } from '@/store/useQuizStore';
import { useUserStore } from '@/store/useUserStore';
import { getOptionsCardStyle } from '@/utils/getOptionsCardStyle';
import { useIncorrectAnswers } from '../myPage/hooks/useIncorrectAnswers';

const ResultDisplay = lazy(() => import('./ResultDisplay'));

const OptionsCard = () => {
  const quiz = useQuizStore((s) => s.quiz);
  const userAnswer = useQuizStore((s) => s.userAnswer);
  const setUserAnswer = useQuizStore((s) => s.setUserAnswer);
  const result = useQuizStore((s) => s.result);
  const user = useUserStore((s) => s.user);

  const { handleAddInCorrect } = useIncorrectAnswers();

  const containerClassName =
    'mt-8 mb-8 min-h-[15rem] w-full md:w-[70rem] lg:w-[90rem]';

  if (!quiz) {
    return (
      <div className={containerClassName}>
        <div className='rounded-md border border-gray-200 bg-white/10 p-6 shadow-sm'>
          <div className='animate-pulse space-y-3'>
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className='flex items-center gap-4 rounded-lg border-2 border-gray-200 p-6'
              >
                <div className='h-8 w-full rounded bg-gray-300'></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const isSubmitted = !!result;

  return (
    <div className={containerClassName}>
      <div className='flex flex-col rounded-xl border border-gray-200 bg-white/10 p-6 shadow-md'>
        <div className='space-y-3'>
          {Object.entries(quiz.options).map(([key, value]) => {
            const isCorrectAnswer = key === quiz.answer;
            const isSelectedAnswer = key === userAnswer;

            const optionStyles = getOptionsCardStyle({
              isSubmitted,
              isCorrect: isCorrectAnswer,
              isSelected: isSelectedAnswer,
            });

            return (
              <label
                key={key}
                className={`group flex items-center gap-4 rounded-xl border-2 p-4 transition-all duration-300 ease-out md:p-5 ${optionStyles} ${isSubmitted ? 'cursor-default' : 'cursor-pointer'}`}
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

                <span className='flex-1 font-bold text-white md:text-[1.8rem]'>
                  <span className='font-bold'>{key}.</span>
                  <span className='ml-2'>{value}</span>
                </span>
              </label>
            );
          })}
        </div>

        {result && (
          <div className='w-full'>
            <Suspense
              fallback={
                <div className='mt-6 h-20 w-full animate-pulse rounded-md bg-white/10' />
              }
            >
              <ResultDisplay
                explanation={result.explanation}
                isCorrect={result.isCorrect}
              />
            </Suspense>
          </div>
        )}

        {/* 로그인된 유저만 뜨도록 수정하기 */}
        {user && result?.isCorrect === false && (
          <div className='mt-3 self-center'>
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
