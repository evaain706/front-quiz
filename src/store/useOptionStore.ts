import { create } from 'zustand';

interface OptionState {
  category: string;
  level: string;
  setCategory: (category: string) => void;
  setLevel: (level: string) => void;
  resetCategory: () => void;
  resetLevel: () => void;
}

export const useOptionStore = create<OptionState>((set) => ({
  category: '',
  level: '',

  setCategory: (category) => set({ category: category }),

  setLevel: (level) => set({ level: level }),

  resetCategory: () => set({ category: '' }),

  resetLevel: () => set({ level: '' }),
}));
