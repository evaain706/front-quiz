export interface UserStatistics {
  totalStats: {
    correct: number;
    incorrect: number;
  };
  categoryStats: Record<string, StatDetail>;
  levelStats: Record<string, StatDetail>;
}

export interface StatDetail {
  correct: number;
  incorrect: number;
  _id: string;
}
