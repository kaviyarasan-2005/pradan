import { create } from "zustand";

interface FormState {
  data: any;
  setData: (newData: any) => void;
}

export const useFormStore = create<FormState>((set) => ({
  data: {}, // Store form data here
  setData: (newData) => set((state) => ({ data: { ...state.data, ...newData } })),
}));
