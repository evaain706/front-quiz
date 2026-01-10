import { useQuizStore } from '@/store/useQuizStore';
import { useOptionStore } from '@/store/useOptionStore';
import { useUserStore } from '@/store/useUserStore';
import { instance } from '@/apis/instance';
import { privateInstance } from '@/apis/privateInstance';
import { useState } from 'react';
import { useToastStore } from '@/store/useToastStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useQuiz = () => {
  const quiz = useQuizStore((s) => s.quiz);
  const result = useQuizStore((s) => s.result);
  const userAnswer = useQuizStore((s) => s.userAnswer);

  const setQuiz = useQuizStore((s) => s.setQuiz);
  const setUserAnswer = useQuizStore((s) => s.setUserAnswer);
  const setResult = useQuizStore((s) => s.setResult);
  const setIsLoading = useQuizStore((s) => s.setIsLoading);
  const setIsGrading = useQuizStore((s) => s.setIsGrading);

  const category = useOptionStore((s) => s.category);
  const level = useOptionStore((s) => s.level);

  const user = useUserStore((s) => s.user);

  const addToast = useToastStore((s) => s.addToast);

  const queryClient = useQueryClient();

  const [error, setError] = useState<Error | null>(null);

  const fetchQuiz = async () => {
    setIsLoading(true);
    setQuiz(null);
    setResult(null);
    setUserAnswer('');
    setError(null);

    try {
      const response = await instance.post('/api/quiz/generate-quiz', {
        topic: category,
        level,
      });
      setQuiz(response.data);
    } catch (error) {
      console.error('퀴즈 요청 실패:', error);

      setError(new Error('퀴즈 요청 실패'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!quiz || !userAnswer) return;

    setIsGrading(true);
    try {
      const response = await instance.post('/api/quiz/grade-answer', {
        quiz,
        userAnswer,
      });
      console.log(response.data);
      setResult(response.data);
      if (user) {
        handleAddStatistics(response.data.isCorrect);
        queryClient.invalidateQueries({
          queryKey: ['statistics'],
        });
      }
    } catch (error) {
      console.error('채점 실패:', error);
      addToast('error', '채점중 에러(다시시도해주세요)');
    } finally {
      setIsGrading(false);
    }
  };

  const handleAddStatistics = async (isCorrect: boolean) => {
    try {
      const response = await privateInstance.post('/api/quiz/add-statistics', {
        isCorrect,
        category,
        level,
      });
      console.log(response.data);
    } catch (error) {
      console.log('저장실패');
    }
  };
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
        queryKey: ['incorrectAnswer'],
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
      queryClient.invalidateQueries({ queryKey: ['incorrectAnswer'] });
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

  const getUserStatistics = async () => {
    try {
      const response = await privateInstance.get('/api/quiz/statistics');
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return {
    fetchQuiz,
    handleSubmit,
    handleAddInCorrect,
    getIncorrectAnswers,
    getUserStatistics,
    handleDeleteIncorrect,
    error,
  };
};
