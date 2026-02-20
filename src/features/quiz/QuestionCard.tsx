import React, { Suspense, lazy } from 'react';
import type { Quiz } from '@/types/quizTypes';
import Spinner from '@/components/ui/Spinner';

const LazyReactMarkdown = lazy(() =>
  import('react-markdown').then((m) => ({ default: m.default })),
);

interface QuestionCardProps {
  isLoading: boolean;
  quiz: Quiz | undefined;
}

const SkeletonCard = () => (
  <div className='bg-navy-black flex min-h-[20rem] w-full min-w-[34rem] animate-pulse items-center justify-center rounded-md border-5 border-gray-500 p-6'>
    <Spinner className='h-10 w-10' />
  </div>
);

const cardClassName =
  'bg-navy-black flex min-h-[20rem] w-full min-w-[34rem] items-center justify-center rounded-md border-5 border-gray-500 p-6 md:w-[70rem] lg:w-[90rem]';

const contentClass =
  'max-h-[30rem] w-full items-center justify-center overflow-auto text-[1.4rem] leading-[3rem] font-bold text-green-400 md:text-[2rem] md:leading-[4rem]';

const QuestionCard = ({ isLoading, quiz }: QuestionCardProps) => {
  if (isLoading) {
    return <SkeletonCard />;
  }

  const markdownContent = quiz?.question;

  if (!markdownContent) {
    return (
      <div className={`${cardClassName} scanline-overlay`}>
        <div className={contentClass} />
      </div>
    );
  }

  return (
    <div className={`${cardClassName} scanline-overlay`}>
      <div className={contentClass}>
        <p>
          <Suspense
            fallback={
              <span className='whitespace-pre-wrap'>{markdownContent}</span>
            }
          >
            <LazyReactMarkdown>{markdownContent}</LazyReactMarkdown>
          </Suspense>
        </p>
      </div>
    </div>
  );
};

export default React.memo(QuestionCard);
