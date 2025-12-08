import Button from '../../../../components/Button';
import type { Comment } from '../../../../types/communityTypes';

const CommentList = ({
  comments,
  onClickDelete,
}: {
  comments: Comment[];
  onClickDelete: (id: string) => void;
}) => {
  return (
    <section className='mt-10'>
      <h2 className='mb-6 pl-5 text-[1.6rem] font-bold text-slate-900'>
        댓글 <span className='text-blue-600'>{comments.length}</span>
      </h2>

      <div className='max-h-[50rem] space-y-4 overflow-y-auto'>
        {comments.length > 0 ? (
          comments.map((c) => (
            <div
              key={c._id}
              className='group rounded-xl bg-white p-10 shadow-sm ring-1 ring-slate-100 hover:shadow-md hover:ring-slate-200'
            >
              <div className='flex justify-between'>
                <div>
                  <p className='text-[1.4rem] font-semibold'>{c.nickname}</p>
                  <p className='mt-1 text-[1.6rem] text-slate-600'>
                    {c.content}
                  </p>
                </div>

                <Button
                  onClick={() => onClickDelete(c._id)}
                  className='rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-[1.6rem] font-bold text-red-600 hover:bg-red-100'
                >
                  삭제
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className='flex flex-col items-center justify-center rounded-xl border-2 border-dashed bg-slate-50 py-12 text-center'>
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
