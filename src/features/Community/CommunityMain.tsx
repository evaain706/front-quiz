import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useCommunity } from './hooks/useCommunity';
import { useState } from 'react';
import Pagination from '../../components/ui/Pagination/Pagination';

import type { Post, PostResponse } from '../../types/communityTypes';
import PostGrid from './components/PostGrid';
import Button from '../../components/Button';

const CommunityMain = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState<string | null>(null);
  const { fetchPosts } = useCommunity();

  const { data, isPending, error } = useQuery<PostResponse, Error>({
    queryKey: ['post', page, category],
    queryFn: () => fetchPosts(page, 5, category || undefined),
    staleTime: 5 * 60 * 1000,
  });

  if (isPending) return <>로딩중..</>;
  if (error) return <>에러발생: {error.message}</>;

  return (
    <div className='flex w-full flex-col items-center gap-5 p-6 md:gap-10 md:p-14'>
      <h2 className='text-[2rem] font-extrabold text-white md:text-[3rem]'>
        커뮤니티 게시판
      </h2>

      <div className='flex gap-3 rounded-full bg-white p-2 shadow-md'>
        {[
          { label: '전체', value: null },
          { label: '질문', value: 'question' },
          { label: '정보', value: 'information' },
        ].map((c) => (
          <button
            key={c.label}
            onClick={() => {
              setCategory(c.value);
              setPage(1);
            }}
            className={`rounded-full px-10 py-2 text-[1.4rem] font-bold transition md:text-[1.6rem] ${
              category === c.value
                ? 'bg-blue-500 text-white shadow-md'
                : 'bg-gray-100 text-white hover:bg-gray-200'
            } `}
          >
            {c.label}
          </button>
        ))}
      </div>

      <PostGrid data={data} />

      <div className='justify-end'>
        <Pagination
          currentPage={data.currentPage}
          totalPages={data.totalPages}
          totalItems={data.totalCount}
          onPageChange={setPage}
        />
      </div>

      <Button onClick={() => navigate('/community/create')}>새 글 작성</Button>
    </div>
  );
};

export default CommunityMain;
