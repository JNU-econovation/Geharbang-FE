import { ApplicationData } from "@/src/types/models/ApplicationData";
import { create } from "zustand";

interface ApplicationStore {
  data: ApplicationData;
  setUpdate: <K extends keyof ApplicationData>(
    key: K,
    value: ApplicationData[K]
  ) => void;
  currentStep: number;
  goToNextStep: () => void;
  goToPrevStep: () => void;
}

export const useApplicationStore = create<ApplicationStore>((set) => ({
  data: {
    name: "",
    phoneNumber: "",
    birthDate: "",
    gender: "",
    availableStartDate: "",
    availableDayOfWeek: [],
    selfIntroduction: "",
    mbti: "",
    style: [],
    instagramId: "",
    imageUrl: "",
  },

  setUpdate: (key, value) =>
    set((state) => ({
      data: {
        ...state.data,
        [key]: value,
      },
    })),
    
  currentStep: 1,

  goToNextStep: () =>
    set((state) => ({
      currentStep: state.currentStep + 1,
    })),

  goToPrevStep: () =>
    set((state) => ({
      currentStep: state.currentStep - 1,
    })),
}));
