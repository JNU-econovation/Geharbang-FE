import { create } from "zustand";

import { File } from "@/src/types/File";
import { ApplicationData } from "@/src/types/models/application/ApplicationData";

const initialApplicationData: ApplicationData = {
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

interface ApplicationSlice {
  applicationData: ApplicationData;
  setApplicationData: <K extends keyof ApplicationData>(
    key: K,
    value: ApplicationData[K]
  ) => void;

  imageFile: File;
  setImageFile: (file: File) => void;

  currentStep: number;
  goToPrevStep: () => void;

  resetApplication: () => void;
}

export const useApplicationSlice = create<ApplicationSlice>((set) => ({
  applicationData: initialApplicationData,

  setApplicationData: (key, value) =>
    set((state) => ({
      applicationData: {
        ...state.applicationData,
        [key]: value,
      },
    })),

  imageFile: initialImageFile,

  currentStep: 1,

  setImageFile: (file) => set({ imageFile: file }),

  goToPrevStep: () =>
    set((state) => ({
      currentStep: Math.max(1, state.currentStep - 1),
    })),

  resetApplication: () =>
    set({
      applicationData: initialApplicationData,
      imageFile: initialImageFile,
    }),
}));
