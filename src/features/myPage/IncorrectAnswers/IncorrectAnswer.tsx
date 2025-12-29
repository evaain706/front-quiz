import { useInfiniteQuery } from '@tanstack/react-query';
import { useQuiz } from '@/features/quizComp/hooks/useQuiz';
import type { IncorrectQuiz } from '@/types/quizTypes';
import AnswerHistoryCard from './AnswerHistoryCard';
import IncorrectModal from '@/components/IncorrectModal/IncorrectModal';
import { useState } from 'react';
import { categorylist } from '@/constants/categoryList';
import Button from '@/components/Button';
import { useUserStore } from '@/store/useUserStore';
import IncorrectAnswerSkeleton from '@/components/ui/Skeleton/IncorrectAnswerSkeleton';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';

const IncorrectAnswerPage = () => {
  const { getIncorrectAnswers } = useQuiz();
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState<string>('');
  const [level, setLevel] = useState('');
  const [selectedQuiz, setSelectedQuiz] = useState<IncorrectQuiz | null>(null);
  const user = useUserStore((s) => s.user);

  interface IncorrectAnswerResponse {
    items: IncorrectQuiz[];
    nextCursor: string | null;
    hasNextPage: boolean;
  }

  const {
    data,
    isPending,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<IncorrectAnswerResponse>({
    queryKey: ['incorrectAnswer', category, level],
    queryFn: ({ pageParam }) =>
      getIncorrectAnswers({
        category,
        level,
        cursor: pageParam as string | null,
      }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    staleTime: 5 * 60 * 1000,
  });

  const handleOpenModal = (quiz: IncorrectQuiz) => {
    setSelectedQuiz(quiz);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedQuiz(null);
  };

  if (error) return <>에러발생: {error.message}</>;

  const incorrectAnswers = data?.pages.flatMap((page) => page.items) ?? [];

  const targetRef = useInfiniteScroll({
    loading: isFetchingNextPage,
    hasNextPage: !!hasNextPage,
    onLoadMore: fetchNextPage,
  });

  return (
    <div className='mt-10 flex min-h-[calc(100vh-10rem)] w-full flex-col justify-center'>
      <div className='mb-5 flex items-center justify-center'>
        <h2 className='text-[1.8rem] font-bold text-white md:text-[4rem]'>
          <span className='text-gray-600'>{user?.nickname}</span>님의 오답문제
        </h2>
      </div>
      <div className='flex flex-col items-center gap-4 px-10 md:flex-row md:justify-between'>
        <div className='flex flex-col gap-4 md:flex-row'>
          <select
            className='rounded-xl bg-white px-2 py-4 text-[1.4rem] font-bold'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value=''>카테고리를 선택하세요</option>

            {categorylist.map((item) => (
              <option key={item.id} value={item.text}>
                {item.text}
              </option>
            ))}
          </select>

          <select
            className='rounded-xl bg-white px-2 py-4 text-[1.4rem] font-bold'
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            <option value='' disabled selected>
              난이도 선택
            </option>

            <option value='쉬움'>쉬움</option>
            <option value='보통'>보통</option>
            <option value='어려움'>어려움</option>
          </select>
        </div>

        <Button
          size='sm'
          className='text-center md:w-auto'
          onClick={() => {
            setCategory('');
            setLevel('');
          }}
        >
          초기화
        </Button>
      </div>

      <div className='relative mt-4 flex h-[40rem] flex-col gap-4 overflow-auto p-10 md:h-[60rem] lg:h-[70rem]'>
        {isPending && <IncorrectAnswerSkeleton />}

        {!isPending && incorrectAnswers.length === 0 && (
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 py-10 text-center text-[1.6rem] font-bold text-white md:text-[2rem]'>
            저장된 문제가 없습니다
          </div>
        )}

        {incorrectAnswers.map((item) => (
          <div key={item.id} onClick={() => handleOpenModal(item)}>
            <AnswerHistoryCard data={item} />
          </div>
        ))}

        <div ref={targetRef} />

        {isFetchingNextPage && <IncorrectAnswerSkeleton />}

        {selectedQuiz && (
          <IncorrectModal
            data={selectedQuiz}
            isOpen={open}
            setIsopen={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
};

export default IncorrectAnswerPage;
