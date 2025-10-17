
export interface Quiz {
  question: string;
  options: { [key: string]: string };
  answer: string;
}


export interface QuizState {
  quiz : Quiz | null
  setQuiz : (quiz : Quiz | null) => void;
  userAnswer : string;
  setUserAnswer : (userAnswer: string) => void;
  result : string
  setResult : (result: string) => void;
  isLoading : boolean;
  setIsLoading : (isLoading: boolean) => void;
}
