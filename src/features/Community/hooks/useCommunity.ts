import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { instance } from '../../../apis/instance';
import { useToastStore } from '../../../store/useToastStore';
import { useNavigate } from 'react-router-dom';

export const useCommunity = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<Error | null>(null);
  const { addToast } = useToastStore();

  const navigate = useNavigate();

  const queryClient = useQueryClient();

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

  const handleAddComment = useMutation({
    mutationFn: async ({
      postId,
      nickname,
      content,
    }: {
      postId: string;
      nickname: string;
      content: string;
    }) => {
      const res = await instance.post(`/api/community/${postId}/comments`, {
        nickname,
        password,
        content,
      });
      return res.data;
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

  return {
    password,
    setPassword,
    handleDeletePost,
    handleAddComment,
    error,
  };
};
