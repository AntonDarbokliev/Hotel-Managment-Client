import { create } from 'zustand';

interface ToastStore  {
    toastText: string,
    setToastText: (toastText: string) => void
}


// Define your store
export const useToastStore = create<ToastStore>(set => ({
  toastText: "", // Initial state for error
  setToastText: (toastText:string) => set({ toastText }), // Action to set error
}));
