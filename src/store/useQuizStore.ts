import { create } from "zustand";
import type { Quiz, QuizState } from "../types/quizTypes";


export const useQuizStore = create<QuizState>((set) => ({

  quiz: null, 
  userAnswer: '', 
  result: '', 
  isLoading: false, 


  setQuiz: (quiz: Quiz | null) => set({ quiz: quiz }),
  
 
  setUserAnswer: (userAnswer: string) => set({ userAnswer: userAnswer }),
  

  setResult: (result: string) => set({ result: result }),

 
  setIsLoading: (isLoading: boolean) => set({ isLoading: isLoading }),
}));