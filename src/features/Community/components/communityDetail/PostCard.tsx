import DotIcon from '../../../../assets/svg/DotIcon';
import type { Post } from '../../../../types/communityTypes';
import Dropdown from '../../../../components/ui/Dropdown';

const PostCard = ({
  post,
  onDeleteClick,
  onEditClick,
}: {
  post: Post;
  onDeleteClick: () => void;
  onEditClick: () => void;
}) => {
  return (
    <div className='rounded-2xl bg-white shadow-xl ring-1 ring-slate-100'>
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
          <div className='relative'>
            <Dropdown>
              <Dropdown.Trigger>
                <DotIcon />
              </Dropdown.Trigger>
              <Dropdown.Content>
                <Dropdown.Item onClick={onDeleteClick}>삭제</Dropdown.Item>

                <Dropdown.Item onClick={onEditClick}>수정</Dropdown.Item>
              </Dropdown.Content>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
