
export interface Quiz {
  question: string;
  options: { [key: string]: string };
  answer: string;
}

export interface Result {
  explanation : string;
  isCorrect : boolean;
}


export interface QuizState {
  quiz : Quiz | null
  setQuiz : (quiz : Quiz | null) => void;
  userAnswer : string;
  setUserAnswer : (userAnswer: string) => void;
  result : Result | null;
  setResult : (result: Result | null) => void;
  isLoading : boolean;
  setIsLoading : (isLoading: boolean) => void;
  isGrading: boolean;
  setIsGrading : (isGrading: boolean) => void;
}
