// useFormStore.ts
import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { v4 as uuidv4 } from "uuid"; // Run `npm install uuid`

interface FormData {
  id?: string;
  submittedAt?: string;
  formType?: "LAND" | "POND" | "PLANTATION"; // <-- added this!
  basicDetails?: any;
  landOwnership?: any;
  landDevelopment?: any;
  bankDetails?: any;
}


interface FormStore {
  data: FormData;
  submittedForms: FormData[];
  loading: boolean;
  setData: (section: keyof FormData, value: any) => void;
  resetData: () => void;
  submitForm: () => Promise<void>;
  loadSubmittedForms: () => Promise<void>;
  clearSubmittedForms: () => Promise<void>;
}

export const useFormStore = create<FormStore>((set, get) => ({
  data: {},
  submittedForms: [],
  loading: false,

  setData: (section, value) =>
    set((state) => ({
      data: {
        ...state.data,
        [section]: value,
      },
    })),
    deleteFormByIndex: async (index: number) => {
      const currentForms = get().submittedForms;
      const updatedForms = currentForms.filter((_, i) => i !== index);
      await AsyncStorage.setItem("submittedForms", JSON.stringify(updatedForms));
      set({ submittedForms: updatedForms });
    },

  resetData: () => set({ data: {} }),
 
  submitForm: async () => {
    const currentData = get().data;
  
    const formWithMeta: FormData = {
      ...currentData,
      id: String(get().submittedForms.length + 1), // Natural number ID
      submittedAt: new Date().toISOString(),
    };
  
    const newSubmittedForms = [...get().submittedForms, formWithMeta];
  
    await AsyncStorage.setItem("submittedForms", JSON.stringify(newSubmittedForms));
    set({ submittedForms: newSubmittedForms, data: {} });
  },
  
  loadSubmittedForms: async () => {
    set({ loading: true });
    try {
      const stored = await AsyncStorage.getItem("submittedForms");
      if (stored) {
        set({ submittedForms: JSON.parse(stored) });
      }
    } catch (error) {
      console.error("Failed to load submitted forms", error);
    } finally {
      set({ loading: false });
    }
  },

  clearSubmittedForms: async () => {
    await AsyncStorage.removeItem("submittedForms");
    set({ submittedForms: [] });
  },
}));
