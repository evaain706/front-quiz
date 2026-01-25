import { privateInstance } from '@/apis/privateInstance';

export const useUserStatistics = () => {
  const getUserStatistics = async () => {
    try {
      const response = await privateInstance.get('/api/quiz/statistics');
      return response.data;
    } catch (error) {
      return null;
    }
  };

  return {
    getUserStatistics,
  };
};
