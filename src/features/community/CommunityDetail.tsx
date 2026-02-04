import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { instance } from '@/apis/instance';
import { useState } from 'react';
import PostCard from './components/communityDetail/PostCard';
import CommentList from './components/communityDetail/CommentList';
import CommentForm from './components/communityDetail/CommentForm';
import DeleteModal from '@/components/DeleteModal/DeleteModal';
import { useNavigate } from 'react-router-dom';

import type { Post } from '@/types/communityTypes';
import Button from '@/components/Button';
import BackIcon from '@/assets/svg/BackIcon';
import CommunityDetailSkeleton from '@/components/ui/Skeleton/CommunityDetailSkeleton';
import ErrorComp from '@/components/ui/ErrorComp';
import Dropdown from '@/components/ui/Dropdown';
import DotIcon from '@/assets/svg/DotIcon';
import { useCommunityDetail } from './hooks/useCommunityDetail';

const CommunityDetail = () => {
  const { id } = useParams();

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const [deleteCommentId, setDeleteCommentId] = useState<string | null>(null);
  const [postDeleteError, setPostDeleteError] = useState('');
  const [postEditError, setPostEditError] = useState('');
  const [commentDeleteError, setCommentDeleteError] = useState('');

  const navigate = useNavigate();

  const {
    handleDeletePostMutate,
    handleAddCommentMutate,
    handleDeleteCommentMutate,
    handleCheckPasswordMutate,
  } = useCommunityDetail();

  const { data: post, isLoading } = useQuery<Post>({
    queryKey: ['post', id],
    queryFn: async () => {
      const res = await instance.get(`/api/community/getPost/${id}`);
      return res.data;
    },
  });

  const handleDeletePost = (password: string) => {
    handleDeletePostMutate.mutate(
      { postId: id!, password },
      {
        onSuccess: () => {
          setDeleteModalOpen(false);
          setPostDeleteError('');
        },
        onError: (error: any) => {
          setPostDeleteError(error.message || '게시글 삭제 실패');
        },
      },
    );
  };

  const handleEditPost = (password: string) => {
    handleCheckPasswordMutate.mutate(
      { postId: id!, password },
      {
        onSuccess: () => {
          setEditModalOpen(false);
          setPostEditError('');
          navigate(`/community/create`, { state: { post } });
        },
        onError: (error: any) => {
          setPostEditError(error.message || '비밀번호 확인 실패');
        },
      },
    );
  };

  const handleDeleteComment = (password: string) => {
    if (!deleteCommentId) return;

    handleDeleteCommentMutate.mutate(
      {
        postId: id!,
        commentId: deleteCommentId,
        password,
      },
      {
        onSuccess: () => {
          setCommentModalOpen(false);
          setDeleteCommentId(null);
          setCommentDeleteError('');
        },
        onError: (error: any) => {
          setCommentDeleteError(error.message || '댓글 삭제 실패');
        },
      },
    );
  };

  if (isLoading) return <CommunityDetailSkeleton />;
  if (!post)
    return (
      <div className='mt-5 flex min-h-[calc(100vh-6rem)] items-center justify-center'>
        <ErrorComp
          PageName='게시글불러오기중 에러'
          message='게시글상세정보를 불러오지못했습니다'
        />
      </div>
    );

  return (
    <div className='mt-[3rem] flex h-full items-center justify-center md:mt-[10rem]'>
      <div className='relative mx-auto w-full'>
        <PostCard post={post} />
        <div className='mt-5 flex w-full items-center justify-end'>
          <div className='relative text-white'>
            <Dropdown>
              <Dropdown.Trigger>
                <DotIcon />
              </Dropdown.Trigger>
              <Dropdown.Content>
                <Dropdown.Item
                  onClick={() => {
                    setDeleteModalOpen(true);
                  }}
                >
                  게시글 삭제
                </Dropdown.Item>

                <Dropdown.Item onClick={() => setEditModalOpen(true)}>
                  게시글 수정
                </Dropdown.Item>
              </Dropdown.Content>
            </Dropdown>
          </div>
          <Button
            onClick={() => navigate(-1)}
            className='absolute top-0 right-5 mt-17 w-15 md:mt-5'
          >
            <BackIcon />
          </Button>
        </div>

        {isDeleteModalOpen && (
          <DeleteModal
            isOpen={isDeleteModalOpen}
            onOpenChange={setDeleteModalOpen}
            onDelete={handleDeletePost}
            isLoading={handleDeletePostMutate.isPending}
            title='게시글 삭제'
            errorMessage={postDeleteError}
          />
        )}

        {isEditModalOpen && (
          <DeleteModal
            isOpen={isEditModalOpen}
            onOpenChange={setEditModalOpen}
            onDelete={handleEditPost}
            isLoading={handleCheckPasswordMutate.isPending}
            title='게시글 수정'
            errorMessage={postEditError}
          />
        )}

        <div>
          <CommentList
            comments={post.comments}
            onClickDelete={(commentId) => {
              setDeleteCommentId(commentId);
              setCommentModalOpen(true);
              setCommentDeleteError('');
            }}
            deleteCommentId={deleteCommentId}
            isLoading={handleDeleteCommentMutate.isPending}
          />

          <CommentForm
            postId={id!}
            mutate={handleAddCommentMutate}
            isLoading={handleAddCommentMutate.isPending}
          />
        </div>

        {commentModalOpen && (
          <DeleteModal
            isOpen={commentModalOpen}
            onOpenChange={setCommentModalOpen}
            onDelete={handleDeleteComment}
            isLoading={handleDeleteCommentMutate.isPending}
            title='댓글 삭제'
            errorMessage={commentDeleteError}
          />
        )}
      </div>
    </div>
  );
};

export default CommunityDetail;
