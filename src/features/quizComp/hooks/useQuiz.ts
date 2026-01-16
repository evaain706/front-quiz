import { useQuizStore } from '@/store/useQuizStore';
import { useOptionStore } from '@/store/useOptionStore';
import { useUserStore } from '@/store/useUserStore';
import { instance } from '@/apis/instance';
import { privateInstance } from '@/apis/privateInstance';
import { useState } from 'react';
import { useToastStore } from '@/store/useToastStore';
import { useQueryClient } from '@tanstack/react-query';

export const useQuiz = () => {
  const quiz = useQuizStore((s) => s.quiz);
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

  return {
    fetchQuiz,
    handleSubmit,
    error,
  };
};
