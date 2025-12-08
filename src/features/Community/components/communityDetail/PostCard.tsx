import Button from '../../../../components/Button';
import type { Post } from '../../../../types/communityTypes';

const PostCard = ({
  post,
  onDeleteClick,
}: {
  post: Post;
  onDeleteClick: () => void;
}) => {
  return (
    <article className='overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-slate-100'>
      <header className='border-b border-slate-100 px-6 py-6 sm:px-8'>
        <h1 className='text-[2rem] font-bold'>{post.title}</h1>

        <div className='mt-4 flex items-center gap-4 text-sm text-slate-500'>
          <span className='text-[1.6rem] font-bold text-slate-700'>
            작성자: {post.nickname}
          </span>
          <time className='text-[1.6rem] text-slate-400'>{post.createdAt}</time>
        </div>
      </header>

      <div className='px-6 py-8 sm:px-8'>
        <p className='text-[1.8rem] leading-7 font-bold whitespace-pre-wrap text-slate-700'>
          {post.content}
        </p>

        <div className='mt-8 flex justify-end border-t border-slate-100 pt-6'>
          <Button
            onClick={onDeleteClick}
            className='rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-[1.6rem] font-bold text-red-600 hover:bg-red-100'
          >
            삭제하기
          </Button>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
