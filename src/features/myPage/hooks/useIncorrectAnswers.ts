import { useQuizStore } from '@/store/useQuizStore';
import { useOptionStore } from '@/store/useOptionStore';
import { useUserStore } from '@/store/useUserStore';

import { privateInstance } from '@/apis/privateInstance';

import { useToastStore } from '@/store/useToastStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/queryKeys';

export const useIncorrectAnswers = () => {
  const quiz = useQuizStore((s) => s.quiz);
  const result = useQuizStore((s) => s.result);
  const userAnswer = useQuizStore((s) => s.userAnswer);

  const category = useOptionStore((s) => s.category);
  const level = useOptionStore((s) => s.level);

  const user = useUserStore((s) => s.user);

  const addToast = useToastStore((s) => s.addToast);

  const queryClient = useQueryClient();

  const handleAddInCorrect = async () => {
    try {
      await privateInstance.post('/api/quiz/save-incorrect-answer', {
        userId: user?.id,
        quiz,
        selectedAnswer: userAnswer,
        explanation: result?.explanation,
        level,
        topic: category,
      });

      addToast('success', '오답이 등록되었습니다.');
      queryClient.invalidateQueries({
        queryKey: queryKeys.incorrectAnswer.all,
      });
    } catch (err) {
      addToast('error', '오답등록중 오류가 발생했습니다');
    }
  };

  const handleDeleteIncorrect = useMutation({
    mutationFn: async (incorrectId: string) => {
      const response = await privateInstance.delete(
        '/api/mypage/delete-incorrect-answer',
        {
          data: {
            userId: user?.id,
            id: incorrectId,
          },
        },
      );
      return response.data;
    },
    onSuccess: () => {
      addToast('success', '오답이 삭제되었습니다.');
      queryClient.invalidateQueries({
        queryKey: queryKeys.incorrectAnswer.all,
      });
    },
    onError: () => {
      addToast('error', '오답삭제중 오류가 발생했습니다');
    },
  });

  const getIncorrectAnswers = async ({
    category,
    level,
    cursor,
    limit = 10,
  }: {
    category?: string;
    level?: string;
    cursor?: string | null;
    limit?: number;
  }) => {
    const query = new URLSearchParams();

    if (category) query.append('category', category);
    if (level) query.append('level', level);
    if (cursor) query.append('cursor', cursor);
    query.append('limit', limit.toString());

    const response = await privateInstance.get(
      `/api/mypage/incorrect-answers?${query.toString()}`,
    );

    return response.data;
  };

  return {
    handleAddInCorrect,
    getIncorrectAnswers,

    handleDeleteIncorrect,
  };
};
