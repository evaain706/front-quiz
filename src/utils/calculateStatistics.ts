import type { UserStatistics } from '@/types/statTypes';

export const calculateStatistics = (data: UserStatistics) => {
  const totalCorrect = data.totalStats.correct;
  const totalIncorrect = data.totalStats.incorrect;
  const totalCount = totalCorrect + totalIncorrect;

  const accuracy =
    totalCount === 0 ? 0 : Math.floor((totalCorrect / totalCount) * 100);

  const isEmptyStats = totalCount === 0;
  const isEmptyCategory = Object.keys(data.categoryStats).length === 0;
  const isEmptyLevel = Object.keys(data.levelStats).length === 0;

  return {
    totalCorrect,
    totalIncorrect,
    accuracy,
    isEmptyStats,
    isEmptyCategory,
    isEmptyLevel,
  };
};
