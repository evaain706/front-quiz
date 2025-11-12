import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { instance } from '../../apis/instance';
import Button from '../../components/Button';
import { useState } from 'react';
import Modal from '../../components/Modal';
import { useCommunity } from './hooks/useCommunity';

const CommunityDetail = () => {
  const { id } = useParams();

  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState('');
  const [nickname, setNickname] = useState('');

  const { password, setPassword, handleDeletePost, handleAddComment } =
    useCommunity();

  const { data: post, isLoading } = useQuery({
    queryKey: ['post', id],
    queryFn: async () => {
      const res = await instance.get(`/api/community/getPost/${id}`);
      return res.data;
    },
  });

  const handleSubmitComment = () => {
    if (!nickname.trim() || !comment.trim()) return;
    handleAddComment.mutate({
      postId: id!,
      nickname,
      content: comment,
    });
    setNickname('');
    setComment('');
  };

  if (isLoading) return <p>로딩중...</p>;
  if (!post) return <p>게시글을 찾을 수 없습니다.</p>;

  return (
    <div className='mx-auto w-[80rem] bg-white p-10'>
      <h2 className='mb-2 text-2xl font-bold'>{post.title}</h2>
      <p className='mb-4 text-gray-600'>{post.nickname}</p>
      <p>{post.content}</p>

      <Button onClick={() => setOpen((prev) => !prev)}>삭제</Button>

      {open && (
        <Modal isOpen={open} onOpenChange={setOpen}>
          <Modal.Content>
            <Modal.Header>
              <Modal.Title>
                게시글 삭제
                <Modal.Close />
              </Modal.Title>
            </Modal.Header>

            <Modal.Item className='flex flex-col gap-2'>
              <label className='text-sm text-gray-600'>
                비밀번호를 입력하세요
              </label>
              <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full rounded border px-2 py-1'
              />
              <div className='mt-4 flex justify-end gap-2'>
                <Button onClick={() => setOpen(false)}>취소</Button>
                <Button
                  onClick={() => handleDeletePost.mutate(id!)}
                  disabled={handleDeletePost.isPending}
                >
                  삭제
                </Button>
              </div>
            </Modal.Item>
          </Modal.Content>
        </Modal>
      )}

      <div className='mt-10 border-t pt-4'>
        <h3 className='mb-2 text-lg font-semibold'>댓글</h3>
        {post.comments.length > 0 ? (
          post.comments.map((c: any, index: number) => (
            <div key={index} className='mb-3 border-b pb-2'>
              <p className='font-bold'>{c.nickname}</p>
              <p>{c.content}</p>
            </div>
          ))
        ) : (
          <p>아직 댓글이 없습니다.</p>
        )}
      </div>

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
            disabled={handleAddComment.isPending}
          >
            작성
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommunityDetail;
