import { File } from "@/src/types/File";
import { ApplicationData } from "@/src/types/models/ApplicationData";
import { create } from "zustand";

const initialData: ApplicationData = {
  name: "",
  phoneNumber: "",
  birthDate: "",
  gender: "무관",
  availableStartDate: "",
  availableDayOfWeek: [],
  selfIntroduction: "",
  mbti: "",
  style: [],
  instagramId: "",
  imageUrl: "",
};

const initialImageFile: File = {
  uri: "",
  type: "",
  name: "",
};

interface ApplicationStore {
  data: ApplicationData;
  setUpdate: <K extends keyof ApplicationData>(
    key: K,
    value: ApplicationData[K]
  ) => void;
  currentStep: number;
  goToNextStep: () => void;
  goToPrevStep: () => void;
  resetData: () => void;
  imageFile: File;
  setImageFile: (file: File) => void;
}

export const useApplicationSlice = create<ApplicationStore>((set) => ({
  data: initialData,

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
      currentStep: Math.max(1, state.currentStep - 1),
    })),

  resetData: () =>
    set({
      data: initialData,
      imageFile: initialImageFile,
      currentStep: 1,
    }),

  imageFile: initialImageFile,

  setImageFile: (file) => set({ imageFile: file }),
}));
