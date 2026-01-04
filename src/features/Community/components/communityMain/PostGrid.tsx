import type { Post, PostResponse } from '@/types/communityTypes';
import { useNavigate } from 'react-router-dom';

const PostGrid = ({ data }: { data: PostResponse }) => {
  const navigate = useNavigate();

  const handleNavigateDetail = (post: Post) => {
    navigate(`/community/detail/${post._id}`);
  };

  return (
    <div className='w-full max-w-[90rem] overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-xl shadow-black/10 backdrop-blur-sm'>
      <div className='grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,2fr)] gap-4 border-b border-white/10 bg-white/20 px-6 py-4 text-[1.4rem] font-bold tracking-wider text-white md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]'>
        <div className='flex min-w-0 items-center'>
          <p>카테고리</p>
        </div>
        <div className='flex min-w-0 items-center'>
          <p>작성자</p>
        </div>
        <div className='flex min-w-0 items-center'>
          <p>제목</p>
        </div>
      </div>

      {data?.posts?.length > 0 ? (
        <div className='divide-y divide-white/20'>
          {data.posts.map((post: Post) => (
            <div
              key={post._id}
              className='group grid cursor-pointer grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,2fr)] gap-4 px-6 py-4 transition-all hover:bg-white/5 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] md:py-10'
              onClick={() => handleNavigateDetail(post)}
            >
              <div className='flex min-w-0 items-center'>
                <p
                  className={`inline-flex items-center gap-1.5 truncate rounded-full px-5 py-1.5 text-[1.6rem] font-bold transition-transform group-hover:scale-105 ${
                    post.category === 'question'
                      ? 'bg-blue-500/20 text-blue-300 ring-1 ring-blue-500/30'
                      : 'bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-500/30'
                  }`}
                >
                  {post.category === 'question' ? '질문' : '정보'}
                </p>
              </div>

              <div className='flex min-w-0 items-center gap-2 text-[1.6rem] text-slate-300'>
                <span className='truncate'>{post.nickname}</span>
              </div>

              <div className='flex min-w-0 items-center justify-between gap-2'>
                <p className='truncate text-[1.6rem] font-medium text-slate-200 transition-colors group-hover:text-white'>
                  {post.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center py-16 text-slate-500'>
          <p className='text-[1.6rem]'>게시글이 없습니다</p>
        </div>
      )}
    </div>
  );
};

export default PostGrid;
