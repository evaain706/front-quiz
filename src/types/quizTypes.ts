export interface Quiz {
  question: string;
  options: { [key: string]: string };
  answer: string;
}

export interface Result {
  explanation: string;
  isCorrect: boolean;
}

export interface QuizState {
  userAnswer: string;
  setUserAnswer: (userAnswer: string) => void;
  result: Result | null;
  setResult: (result: Result | null) => void;
  isGrading: boolean;
  setIsGrading: (isGrading: boolean) => void;
}

export interface IncorrectQuiz {
  id: string;
  topic: string;
  level: string;
  question: string;
  options: { [key: string]: string };
  selectedAnswer: string;
  correctAnswer: string;
  explanation: string;
}
