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
      <div className='bg-navy-black flex min-h-[15rem] w-full items-center justify-center rounded-md border-[5px] border-gray-500 p-6 md:w-[70rem] lg:w-[90rem]'>
        <div className='animate-spinner h-12 w-12 rounded-full border-4 border-green-400 border-t-transparent' />
      </div>
    );
  }

  const markdownContnet = quiz?.question;

  return (
    <div className='bg-navy-black scanline-overlay flex min-h-[15rem] items-center justify-center rounded-md border-5 border-gray-500 p-6 md:w-[70rem] lg:w-[90rem]'>
      <div className='text-glow-green animate-flicker max-h-[30rem] w-full items-center justify-center overflow-auto text-[1.4rem] leading-[3rem] font-bold text-green-400 md:text-[2rem] md:leading-[4rem]'>
        <ReactMarkdown>{markdownContnet}</ReactMarkdown>
      </div>
    </div>
  );
};

export default React.memo(QuestionCard);
