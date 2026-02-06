import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useCommunity } from './hooks/useCommunity';
import { useState } from 'react';
import Pagination from '@/components/ui/Pagination/Pagination';

import type { PostResponse } from '@/types/communityTypes';
import PostGrid from './components/communityMain/PostGrid';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { useDebounce } from '@/hooks/useDebounce';
import ErrorComp from '@/components/ui/ErrorComp';
import { queryKeys } from '@/queryKeys';

const CommunityMain = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const debounceSearch = useDebounce(search, 300);
  const { fetchPosts } = useCommunity();

  const { data, isPending, isError } = useQuery<PostResponse, Error>({
    queryKey: queryKeys.community.list({
      page,
      category: category,
      search: debounceSearch,
    }),
    queryFn: () => fetchPosts(page, 5, category || undefined, debounceSearch),
    staleTime: 5 * 60 * 1000,
  });

  if (isError)
    return (
      <ErrorComp
        PageName='커뮤니티페이지에러'
        message='데이터를 불러오는중 에러가 발생하였습니다'
      />
    );

  const categories = [
    { label: '전체', value: null },
    { label: '질문', value: 'question' },
    { label: '정보', value: 'information' },
  ];

  return (
    <div className='mx-auto flex w-full flex-col items-center gap-5 p-6 md:gap-10 md:p-14'>
      <h2 className='text-[2rem] font-extrabold text-white md:text-[3rem]'>
        커뮤니티 게시판
      </h2>

      <div className='flex gap-2 rounded-2xl bg-white/10 p-1.5 backdrop-blur-sm'>
        {categories.map((c) => {
          const isActive = category === c.value;
          return (
            <button
              key={c.label}
              onClick={() => {
                setCategory(c.value);
                setPage(1);
              }}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-[1.6rem] font-bold transition-all md:px-10 ${
                isActive
                  ? 'bg-white text-slate-900 shadow-lg shadow-white/20'
                  : 'text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              {c.label}
            </button>
          );
        })}
      </div>

      <div className='flex gap-5 px-10'>
        <Input
          placeholder='검색'
          className='rounded-xl bg-white/5 text-white'
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
      </div>

      <PostGrid data={data} isPending={isPending} />

      <div className='justify-end'>
        {data && (
          <Pagination
            currentPage={data.currentPage}
            totalPages={data.totalPages}
            totalItems={data.totalCount}
            onPageChange={setPage}
          />
        )}
      </div>

      <Button onClick={() => navigate('/community/create')}>새 글 작성</Button>
    </div>
  );
};

export default CommunityMain;
