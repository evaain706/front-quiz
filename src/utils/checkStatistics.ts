import type { UserStatistics } from '@/types/statTypes';

export const checkStatistics = (data: UserStatistics) => {
  const totalCorrect = data.totalStats.correct;
  const totalIncorrect = data.totalStats.incorrect;
  const totalCount = totalCorrect + totalIncorrect;

  const accuracy =
    totalCount === 0 ? 0 : Math.floor((totalCorrect / totalCount) * 100);

  return {
    totalCorrect,
    totalIncorrect,
    totalCount,
    accuracy,

    isEmptyStats: totalCount === 0,
    isEmptyCategory: Object.keys(data.categoryStats).length === 0,
    isEmptyLevel: data.levelStats.length === 0,
  };
};
