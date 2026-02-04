import type { Post } from '@/types/communityTypes';

import { formatDate } from '@/utils/formatDate';
import ReactMarkdown from 'react-markdown';

const PostCard = ({ post }: { post: Post }) => {
  const markdownContent = post.content;

  return (
    <div className='rounded-md shadow-xl ring-1 ring-slate-100'>
      <header className='border-b border-slate-100 bg-white px-6 py-6 sm:px-8'>
        <h1 className='text-[2rem] font-bold'>{post.title}</h1>

        <div className='mt-4 flex items-center gap-4 text-sm text-slate-500'>
          <span className='text-[1.6rem] font-bold text-slate-700'>
            작성자: {post.nickname}
          </span>
          <p className='text-[1.6rem] text-slate-400'>
            {formatDate(post.createdAt)}
          </p>
        </div>
      </header>

      <div className='max-h-[45rem] min-h-[20rem] overflow-y-scroll rounded-md bg-white/20 px-6 py-8 sm:px-8'>
        <p className='text-[1.4rem] leading-8 font-bold whitespace-pre-wrap text-white md:text-[1.8rem]'>
          <ReactMarkdown>{markdownContent}</ReactMarkdown>
        </p>
      </div>
    </div>
  );
};

export default PostCard;
