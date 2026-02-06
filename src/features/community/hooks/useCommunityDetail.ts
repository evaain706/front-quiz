import { useQueryClient, useMutation } from '@tanstack/react-query';
import { instance } from '@/apis/instance';
import { useToastStore } from '@/store/useToastStore';
import { useNavigate } from 'react-router-dom';
import type { AxiosError } from 'axios';
import { queryKeys } from '@/queryKeys';

interface AddCommentParams {
  postId: string;
  nickname: string;
  content: string;
  password?: string;
}

export const useCommunityDetail = () => {
  const addToast = useToastStore((s) => s.addToast);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleDeletePostMutate = useMutation({
    mutationFn: async ({
      postId,
      password,
    }: {
      postId: string;
      password?: string;
    }) => {
      const response = await instance.delete(`/api/community/${postId}`, {
        data: { password },
      });
      return response.data;
    },
    onSuccess: () => {
      addToast('success', '게시글이 삭제되었습니다.');
      queryClient.invalidateQueries({ queryKey: queryKeys.community.all });
      navigate('/community');
    },
  });

  const handleAddCommentMutate = useMutation({
    mutationFn: async ({
      postId,
      nickname,
      content,
      password,
    }: AddCommentParams) => {
      const response = await instance.post(
        `/api/community/${postId}/comments`,
        {
          nickname,
          password,
          content,
        },
      );
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.community.detail(variables.postId),
      });
      addToast('success', '댓글이 작성되었습니다.');
    },
    onError: (error: AxiosError) => {
      addToast('error', error.message || '댓글 작성 중 오류가 발생했습니다.');
    },
  });

  const handleCheckPasswordMutate = useMutation({
    mutationFn: async ({
      postId,
      password,
    }: {
      postId: string;
      password?: string;
    }) => {
      const response = await instance.post(
        `/api/community/${postId}/verify-password`,
        { password },
      );
      return response.data;
    },
    onError: (error: any) => {
      addToast(
        'error',
        error.response?.data?.message ||
          '비밀번호가 일치하지 않거나 유효하지 않습니다.',
      );
      throw error;
    },
  });

  const handleDeleteCommentMutate = useMutation({
    mutationFn: async ({
      postId,
      commentId,
      password,
    }: {
      postId: string;
      commentId: string;
      password: string;
    }) => {
      const response = await instance.delete(
        `/api/community/${postId}/comments/${commentId}`,
        {
          data: { password },
        },
      );
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.community.detail(variables.postId),
      });
      addToast('success', '댓글이 삭제되었습니다.');
    },
  });

  return {
    handleDeletePostMutate,
    handleAddCommentMutate,
    handleCheckPasswordMutate,
    handleDeleteCommentMutate,
  };
};
