import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface FormData {
  id?: string;
  submittedAt?: string;
  date?:string;
  formType?: "LAND" | "POND" | "PLANTATION";
  formStatus?: "Approved" | "Pending" | "Rejected";
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
  deleteFormByIndex: (index: number) => Promise<void>;
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

  resetData: () => set({ data: {} }),

  submitForm: async () => {
    const currentData = get().data;
    const allForms = get().submittedForms;
  
    let updatedForms;
  
    if (currentData.id) {
      // Update existing form
      updatedForms = allForms.map((form) =>
        form.id === currentData.id ? { ...form, ...currentData } : form
      );
    } else {
      // New submission
      const formWithMeta: FormData = {
        ...currentData,
        id: Date.now().toString(),
        submittedAt: new Date().toISOString(),
        formStatus: currentData.formStatus,  // or however you want to default it
      };
      updatedForms = [...allForms, formWithMeta];
    }
  
    await AsyncStorage.setItem("submittedForms", JSON.stringify(updatedForms));
    set({ submittedForms: updatedForms, data: {} });
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

  deleteFormByIndex: async (index: number) => {
    const currentForms = get().submittedForms;
    const updatedForms = currentForms.filter((_, i) => i !== index);
    await AsyncStorage.setItem("submittedForms", JSON.stringify(updatedForms));
    set({ submittedForms: updatedForms });
  },
}));