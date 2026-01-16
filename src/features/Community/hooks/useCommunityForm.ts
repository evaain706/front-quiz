import { useQueryClient, useMutation } from '@tanstack/react-query';
import { instance } from '@/apis/instance';
import { useToastStore } from '@/store/useToastStore';
import { useNavigate } from 'react-router-dom';
import type { PostForm, EditPostForm } from '@/types/communityTypes';

export const useCommunityForm = () => {
  const addToast = useToastStore((s) => s.addToast);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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

  const handleEditPostMutation = useMutation({
    mutationFn: async (data: EditPostForm) => {
      const { postId, ...body } = data;

      const response = await instance.put(`/api/community/${postId}`, body);

      return response.data;
    },
    onSuccess: () => {
      addToast('success', '게시글이 수정되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['post'] });
      navigate('/community');
    },
    onError: (error: any) => {
      addToast(
        'error',
        error.response?.data?.message || '게시글 수정 중 오류가 발생했습니다.',
      );
    },
  });

  return {
    handleAddPostMutate,
    handleEditPostMutation,
  };
};
