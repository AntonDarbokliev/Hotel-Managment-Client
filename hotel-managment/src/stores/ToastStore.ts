import { create } from 'zustand';

interface ToastStore  {
    toastText: string,
    setToastText: (toastText: string,positive?:boolean) => void,
    positive: boolean
}


export const useToastStore = create<ToastStore>(set => ({
  toastText: "", 
  positive: false,
  setToastText: (toastText:string,positive? : boolean) => set({ toastText,positive }),
}));
