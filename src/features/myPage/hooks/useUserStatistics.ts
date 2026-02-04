import { privateInstance } from '@/apis/privateInstance';

export const useUserStatistics = () => {
  const getUserStatistics = async () => {
    const response = await privateInstance.get('/api/quiz/statistics');
    return response.data;
  };

  return {
    getUserStatistics,
  };
};
