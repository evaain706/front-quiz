export interface UserStatistics {
  totalStats: {
    correct: number;
    incorrect: number;
  };
  categoryStats: Record<string, StatDetail>;
  levelStats: LevelStatistic[];
  content?: string;
}

type Level = '쉬움' | '보통' | '어려움';

export interface LevelStatistic {
  level: Level;
  correct: number;
  incorrect: number;
  _id: string;
}

export interface StatDetail {
  correct: number;
  incorrect: number;
  _id: string;
}
