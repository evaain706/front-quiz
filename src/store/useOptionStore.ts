import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface OptionState {
  category: string;
  level: string;
  setCategory: (category: string) => void;
  setLevel: (level: string) => void;
  resetCategory: () => void;
  resetLevel: () => void;
}

export const useOptionStore = create<OptionState>()(
  devtools(
    persist(
      (set) => ({
        category: '',
        level: '',

        setCategory: (category) => set({ category }),
        setLevel: (level) => set({ level }),

        resetCategory: () => set({ category: '' }),
        resetLevel: () => set({ level: '' }),
      }),
      {
        name: 'option-store',
      },
    ),
  ),
);
