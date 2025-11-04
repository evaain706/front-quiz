import ReactMarkdown from 'react-markdown';
import type { Quiz } from '../../types/quizTypes';
import React from 'react';

interface QuestionCardProps {
  error: Error | null;
  isLoading: boolean;
  quiz: Quiz | null;
}

const QuestionCard = ({ error, isLoading, quiz }: QuestionCardProps) => {
  if (error) {
    throw error;
  }

  if (isLoading) {
    return (
      <div className='flex min-h-[15rem] w-[40rem] items-center justify-center rounded-md border-5 border-gray-500 bg-white md:w-[70rem] lg:w-[90rem]'>
        <div className='h-[3rem] w-1/2 animate-pulse rounded-md bg-gray-300' />
      </div>
    );
  }

  const markdownContnet = quiz?.question;

  return (
    <div className='bg-navy-black scanline-overlay flex min-h-[15rem] items-center justify-center rounded-md border-5 border-gray-500 p-6 md:w-[70rem] lg:w-[90rem]'>
      <div className='text-glow-green animate-flicker flex max-h-[30rem] w-full flex-col items-center justify-center overflow-auto text-[1.2rem] leading-[3rem] font-bold text-green-400 md:text-[1.6rem] md:leading-[4rem]'>
        <ReactMarkdown>{markdownContnet}</ReactMarkdown>
      </div>
    </div>
  );
};

export default React.memo(QuestionCard);
