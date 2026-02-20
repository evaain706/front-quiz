import { create } from 'zustand';
import type { QuizState, Result } from '@/types/quizTypes';

export const useQuizStore = create<QuizState>((set) => ({
  userAnswer: '',
  result: null,
  isGrading: false,

  setUserAnswer: (userAnswer: string) => set({ userAnswer: userAnswer }),

  setResult: (result: Result | null) => set({ result: result }),

  setIsGrading: (isGrading: boolean) => set({ isGrading: isGrading }),
}));
