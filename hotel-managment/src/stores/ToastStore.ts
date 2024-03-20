import { create } from 'zustand';

interface ToastStore  {
    toastText: string,
    setToastText: (toastText: string) => void
}


export const useToastStore = create<ToastStore>(set => ({
  toastText: "", 
  setToastText: (toastText:string) => set({ toastText }),
}));
