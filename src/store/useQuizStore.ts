import { create } from 'zustand';
import type { Quiz, QuizState, Result } from '@/types/quizTypes';

export const useQuizStore = create<QuizState>((set) => ({
  quiz: null,
  userAnswer: '',
  result: null,
  isLoading: false,
  isGrading: false,

  setQuiz: (quiz: Quiz | null) => set({ quiz: quiz }),

  setUserAnswer: (userAnswer: string) => set({ userAnswer: userAnswer }),

  setResult: (result: Result | null) => set({ result: result }),

  setIsLoading: (isLoading: boolean) => set({ isLoading: isLoading }),

  setIsGrading: (isGrading: boolean) => set({ isGrading: isGrading }),
}));
