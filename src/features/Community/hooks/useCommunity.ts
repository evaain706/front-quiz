import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { instance } from '../../../apis/instance';
import { useToastStore } from '../../../store/useToastStore';
import { useNavigate } from 'react-router-dom';
import type { PostForm } from '../../../types/communityTypes';

export const useCommunity = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<Error | null>(null);
  const { addToast } = useToastStore();

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const fetchPosts = async (
    page: number,
    limit: number = 5,
    category?: string,
  ) => {
    const query = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });

    if (category) {
      query.append('category', category);
    }

    const response = await instance.get(`/api/community/getPost?${query}`);
    return response.data;
  };

  const handleDeletePost = useMutation({
    mutationFn: async (postId: string) => {
      const response = await instance.delete(`/api/community/${postId}`, {
        data: { password },
      });
      return response.data;
    },
    onSuccess: () => {
      addToast('success', '게시글이 삭제되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['post'] });
      navigate('/community');
    },
    onError: (error: any) => {
      addToast('error', error.message || '삭제 중 오류가 발생했습니다.');
    },
  });

  const handleAddPostMutate = useMutation({
    mutationFn: async (data: PostForm) => {
      const response = await instance.post('/api/community/createPost', data);
      return response.data;
    },

    onSuccess: () => {
      addToast('success', '게시글이 등록되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['post'] });
      navigate('/community');
    },

    onError: (error: any) => {
      addToast('error', error.message || '게시글 등록 중 오류가 발생했습니다.');
    },
  });

  const handleAddCommentMutate = useMutation({
    mutationFn: async ({
      postId,
      nickname,
      content,
    }: {
      postId: string;
      nickname: string;
      content: string;
    }) => {
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
      queryClient.invalidateQueries({ queryKey: ['post', variables.postId] });
      addToast('success', '댓글이 작성되었습니다.');
      setPassword('');
    },
    onError: (error: any) => {
      addToast('error', error.message || '댓글 작성 중 오류가 발생했습니다.');
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
      queryClient.invalidateQueries({ queryKey: ['post', variables.postId] });
      addToast('success', '댓글이 삭제되었습니다.');
      setPassword('');
    },
    onError: (error: any) => {
      addToast('error', error.message || '댓글 삭제 중 오류가 발생했습니다.');
    },
  });

  return {
    fetchPosts,
    password,
    setPassword,
    handleAddPostMutate,
    handleDeletePost,
    handleAddCommentMutate,
    handleDeleteCommentMutate,
    error,
  };
};
