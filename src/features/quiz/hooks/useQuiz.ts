import { useQuizStore } from '@/store/useQuizStore';
import { useOptionStore } from '@/store/useOptionStore';
import { useUserStore } from '@/store/useUserStore';
import { instance } from '@/apis/instance';
import { privateInstance } from '@/apis/privateInstance';
import { useToastStore } from '@/store/useToastStore';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/queryKeys';
import type { Quiz } from '@/types/quizTypes';

const generateQuiz = async (category: string, level: string): Promise<Quiz> => {
  const response = await instance.post('/api/quiz/generate-quiz', {
    topic: category,
    level,
  });

  if (!response.data || !response.data.question) {
    throw new Error('유효하지 않은 퀴즈 데이터');
  }

  return response.data;
};

export const useQuiz = () => {
  const userAnswer = useQuizStore((s) => s.userAnswer);

  const setUserAnswer = useQuizStore((s) => s.setUserAnswer);
  const setResult = useQuizStore((s) => s.setResult);
  const setIsGrading = useQuizStore((s) => s.setIsGrading);

  const category = useOptionStore((s) => s.category);
  const level = useOptionStore((s) => s.level);

  const user = useUserStore((s) => s.user);

  const addToast = useToastStore((s) => s.addToast);

  const queryClient = useQueryClient();

  const {
    data: quiz,
    isLoading,
    isError,
    refetch,
  } = useQuery<Quiz>({
    queryKey: queryKeys.quiz.all,
    queryFn: () => generateQuiz(category, level),
    enabled: false,
    retry: false,
  });

  const fetchQuiz = () => {
    setResult(null);
    setUserAnswer('');
    queryClient.resetQueries({ queryKey: queryKeys.quiz.all });
    refetch();
  };

  const handleSubmit = async () => {
    if (!quiz || !userAnswer) return;

    setIsGrading(true);
    try {
      const response = await instance.post('/api/quiz/grade-answer', {
        quiz,
        userAnswer,
      });

      setResult(response.data);
      if (user) {
        handleAddStatistics(response.data.isCorrect);
        queryClient.invalidateQueries({
          queryKey: queryKeys.statistics.all,
        });
      }
    } catch (error) {
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
    quiz,
    isLoading,
    isError,
    fetchQuiz,
    handleSubmit,
  };
};
