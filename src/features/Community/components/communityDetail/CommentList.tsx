import DeleteIcon from '@/assets/svg/DeleteIcon';
import Spinner from '@/components/ui/Spinner';

import type { Comment } from '@/types/communityTypes';

const CommentList = ({
  comments,
  onClickDelete,
  isLoading,
}: {
  comments: Comment[];
  onClickDelete: (id: string) => void;
  isLoading: boolean;
}) => {
  return (
    <section className='mt-10 bg-white py-5'>
      <h2 className='mb-6 pl-5 text-[1.6rem] font-bold text-slate-900'>
        댓글 <span className='text-blue-600'>{comments.length}</span>
      </h2>

      <div className='max-h-[50rem] space-y-4 overflow-y-auto'>
        {comments.length > 0 ? (
          comments.map((c) => (
            <div
              key={c._id}
              className='group rounded-xl bg-white p-10 shadow-sm ring-slate-100 hover:shadow-md hover:ring-slate-200'
            >
              <div className='flex justify-between'>
                <div>
                  <p className='text-[1.4rem] font-semibold'>{c.nickname}</p>
                  <p className='mt-1 text-[1.6rem] text-slate-600'>
                    {c.content}
                  </p>
                </div>

                {isLoading ? (
                  <div>
                    <Spinner className='h-10 w-10' />
                  </div>
                ) : (
                  <div
                    onClick={() => onClickDelete(c._id)}
                    className='w-12 cursor-pointer rounded-lg bg-red-50 px-4 py-2 text-[1.6rem] text-red-600'
                  >
                    <DeleteIcon />
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className='mx-5 flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-400 bg-slate-50 py-12 text-center'>
            <p className='text-[1.6rem] font-bold text-slate-400'>
              아직 댓글이 없습니다
            </p>
          </div>
        )}
      </div>

      <div className='my-8 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent' />
    </section>
  );
};

export default CommentList;
