import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { instance } from '../../apis/instance';
import Button from '../../components/Button';
import { useState } from 'react';
import DeleteModal from '../../components/DeleteModal/DeleteModal';
import { useCommunity } from './hooks/useCommunity';

const CommunityDetail = () => {
  const { id } = useParams();

  const [open, setOpen] = useState(false);
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const [comment, setComment] = useState('');
  const [nickname, setNickname] = useState('');
  const [deleteCommentId, setDeleteCommentId] = useState<string | null>(null);

  const {
    password,
    setPassword,
    handleDeletePost,
    handleAddCommentMutate,
    handleDeleteCommentMutate,
  } = useCommunity();

  const { data: post, isLoading } = useQuery({
    queryKey: ['post', id],
    queryFn: async () => {
      const res = await instance.get(`/api/community/getPost/${id}`);
      return res.data;
    },
  });

  const handleSubmitComment = () => {
    if (!nickname.trim() || !comment.trim()) return;
    handleAddCommentMutate.mutate({
      postId: id!,
      nickname,
      content: comment,
    });
    setNickname('');
    setComment('');
  };

  const handleDeleteComment = () => {
    if (!deleteCommentId) return;

    handleDeleteCommentMutate.mutate(
      {
        postId: id!,
        commentId: deleteCommentId,
        password,
      },
      {
        onSuccess: () => {
          setPassword('');
          setCommentModalOpen(false);
          setDeleteCommentId(null);
        },
        onError: () => {},
      },
    );
  };

  if (isLoading) return <p>로딩중...</p>;
  if (!post) return <p>게시글을 찾을 수 없습니다.</p>;

  return (
    <div className='mx-auto w-[80rem] bg-white p-10'>
      <h2 className='mb-2 text-2xl font-bold'>{post.title}</h2>
      <p className='mb-4 text-gray-600'>{post.nickname}</p>
      <p>{post.content}</p>

      <Button onClick={() => setOpen(true)}>삭제</Button>

      {open && (
        <DeleteModal
          isOpen={open}
          onOpenChange={setOpen}
          password={password}
          setPassword={setPassword}
          onDelete={() => handleDeletePost.mutate(id!)}
          isLoading={handleDeletePost.isPending}
          title='게시글 삭제'
        />
      )}

      <div className='mt-10 border-t pt-4'>
        <h3 className='mb-2 text-lg font-semibold'>댓글</h3>
        {post.comments.length > 0 ? (
          post.comments.map((c: any) => (
            <div
              key={c._id}
              className='mb-3 flex items-center justify-between border-b pb-2'
            >
              <p className='font-bold'>{c.nickname}</p>
              <p>{c.content}</p>
              <Button
                onClick={() => {
                  setDeleteCommentId(c._id);
                  setCommentModalOpen(true);
                }}
              >
                삭제
              </Button>
            </div>
          ))
        ) : (
          <p>아직 댓글이 없습니다.</p>
        )}
      </div>

      {commentModalOpen && (
        <DeleteModal
          isOpen={commentModalOpen}
          onOpenChange={setCommentModalOpen}
          password={password}
          setPassword={setPassword}
          onDelete={handleDeleteComment}
          isLoading={handleDeleteCommentMutate.isPending}
          title='댓글 삭제'
        />
      )}

      <div className='mt-6 rounded bg-gray-50 p-4'>
        <h4 className='mb-2 font-semibold'>댓글 작성</h4>
        <input
          placeholder='닉네임'
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className='mb-2 w-full rounded border px-2 py-1'
        />
        <input
          placeholder='비밀번호'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='mb-2 w-full rounded border px-2 py-1'
        />
        <textarea
          placeholder='댓글 내용'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className='w-full rounded border px-2 py-1'
        />
        <div className='mt-3 flex justify-end'>
          <Button
            onClick={handleSubmitComment}
            disabled={handleAddCommentMutate.isPending}
          >
            작성
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommunityDetail;
