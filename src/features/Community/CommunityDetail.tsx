import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { instance } from '../../apis/instance';
import { useState } from 'react';
import { useCommunity } from './hooks/useCommunity';
import PostCard from './components/communityDetail/PostCard';
import CommentList from './components/communityDetail/CommentList';
import CommentForm from './components/communityDetail/CommentForm';
import DeleteModal from '../../components/DeleteModal/DeleteModal';

import type { Post } from '../../types/communityTypes';

const CommunityDetail = () => {
  const { id } = useParams();

  const [open, setOpen] = useState(false);
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const [deleteCommentId, setDeleteCommentId] = useState<string | null>(null);

  const {
    password,
    setPassword,
    handleDeletePost,
    handleAddCommentMutate,
    handleDeleteCommentMutate,
  } = useCommunity();

  const { data: post, isLoading } = useQuery<Post>({
    queryKey: ['post', id],
    queryFn: async () => {
      const res = await instance.get(`/api/community/getPost/${id}`);
      return res.data;
    },
  });

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
        onError: () => setPassword(''),
      },
    );
  };

  if (isLoading) return <p>로딩중...</p>;
  if (!post) return <p>게시글을 찾을 수 없습니다.</p>;

  return (
    <div className='mx-auto w-[100rem] bg-gradient-to-br from-slate-50 via-white to-slate-100 p-10 px-4 py-10'>
      <PostCard post={post} onDeleteClick={() => setOpen(true)} />

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

      <CommentList
        comments={post.comments}
        onClickDelete={(commentId) => {
          setDeleteCommentId(commentId);
          setCommentModalOpen(true);
        }}
      />

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

      <CommentForm
        postId={id!}
        mutate={handleAddCommentMutate}
        isLoading={handleAddCommentMutate.isPending}
        password={password}
        setPassword={setPassword}
      />
    </div>
  );
};

export default CommunityDetail;
