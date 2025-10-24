import { useQuizStore } from '../../../store/useQuizStore';
import { useOptionStore } from '../../../store/useOptionStore';
import { useUserStore } from '../../../store/useUserStore';
import { instance } from '../../../apis/instance';
import { privateInstance } from '../../../apis/privateInstance';
import { useState } from 'react';

export const useQuiz = () => {
  const {
    result,
    quiz,
    setQuiz,
    userAnswer,
    setUserAnswer,
    setResult,
    setIsLoading,
    setIsGrading,
  } = useQuizStore();
  const { category, level } = useOptionStore();
  const { user } = useUserStore();

  const [error, setError] = useState<Error | null>(null);

  const fetchQuiz = async () => {
    setIsLoading(true);
    setQuiz(null);
    setResult(null);
    setUserAnswer('');
    setError(null);

    try {
      const response = await instance.post('/api/generate-quiz', {
        topic: category,
        level,
      });
      setQuiz(response.data);
    } catch (error) {
      console.error('퀴즈 요청 실패:', error);
      setError(new Error('퀴즈 요청실패'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!quiz || !userAnswer) return;

    setIsGrading(true);
    try {
      const response = await instance.post('/api/grade-answer', {
        quiz,
        userAnswer,
      });
      console.log(response.data);
      setResult(response.data);
    } catch (error) {
      console.error('채점 실패:', error);
    } finally {
      setIsGrading(false);
    }
  };

  const handleAddInCorrect = async () => {
    try {
      const response = await privateInstance.post(
        '/api/save-incorrect-answer',
        {
          userId: user?.id,
          quiz: quiz,
          selectedAnswer: userAnswer,
          explanation: result?.explanation,
          level: level,
          topic: category,
        },
      );

      console.log(response.data);
    } catch (err) {
      console.log('오답등록 에러');
    }
  };

  const getIncorrectAnswers = async () => {
    try {
      const response = await privateInstance.get('/api/incorrect-answers');
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };

  return {
    fetchQuiz,
    handleSubmit,
    handleAddInCorrect,
    getIncorrectAnswers,
    error,
  };
};
