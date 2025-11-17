import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useCommunity } from './hooks/useCommunity';
import { useState } from 'react';
import Pagination from '../../components/ui/Pagination/Pagination';
import Button from '../../components/Button';
import type { Post, PostResponse } from '../../types/communityTypes';

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

  const handleNavigateDetail = (post: Post) => {
    navigate(`/community/detail/${post._id}`);
  };

  return (
    <div className='flex w-[120rem] flex-col items-center justify-center gap-5 p-10'>
      <h1 className='mb-6 text-2xl font-bold text-white'>커뮤니티 게시판</h1>

      <div className='mb-4 flex gap-2'>
        <Button
          onClick={() => {
            setCategory(null);
            setPage(1);
          }}
          className={category === null ? 'font-bold text-blue-500' : ''}
        >
          전체
        </Button>

        <Button
          onClick={() => {
            setCategory('question');
            setPage(1);
          }}
          className={category === 'question' ? 'font-bold text-blue-500' : ''}
        >
          질문
        </Button>

        <Button
          onClick={() => {
            setCategory('information');
            setPage(1);
          }}
          className={
            category === 'information' ? 'font-bold text-blue-500' : ''
          }
        >
          정보
        </Button>
      </div>
      <div className='w-full rounded-xl border border-gray-300 bg-white shadow'>
        <div className='grid grid-cols-3 border-b bg-gray-100 px-4 py-2 font-semibold'>
          <span>카테고리</span>
          <span>작성자</span>
          <span>제목</span>
        </div>

        {data.posts.map((post: Post) => (
          <div
            key={post._id}
            className='grid cursor-pointer grid-cols-3 border-b px-4 py-3 transition hover:bg-gray-50'
            onClick={() => handleNavigateDetail(post)}
          >
            <span
              className={`${
                post.category === 'question'
                  ? 'text-blue-500'
                  : 'text-green-500'
              } font-medium`}
            >
              {post.category === 'question' ? '질문' : '정보'}
            </span>
            <span className='text-gray-700'>{post.nickname}</span>
            <span className='truncate text-gray-900'>{post.title}</span>
          </div>
        ))}
      </div>
      <div className='justify-end'>
        <Pagination
          currentPage={data.currentPage}
          totalPages={data.totalPages}
          totalItems={data.totalCount}
          onPageChange={setPage}
        />
      </div>

      <button
        className='rounded bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600'
        onClick={() => navigate('/community/create')}
      >
        새 글 작성
      </button>
    </div>
  );
};

export default CommunityMain;
