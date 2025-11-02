import { create } from 'zustand';

type ToastMode = 'default' | 'success' | 'error' | 'warn';

interface ToastItem {
  id: number;
  mode: ToastMode;
  message: string;
}

interface ToastStore {
  toasts: ToastItem[];
  addToast: (mode: ToastMode, message: string) => void;
  removeToast: (id: number) => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (mode, message) => {
    const id = Date.now();
    set((state) => ({ toasts: [...state.toasts, { id, mode, message }] }));

    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((toast) => toast.id !== id),
      }));
    }, 3000);
  },
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),
}));
