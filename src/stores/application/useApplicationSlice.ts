import { create } from "zustand";

import { File } from "@/src/types/File";
import { ApplicationData } from "@/src/types/models/application/ApplicationData";

type Updater<T> = T | ((prev: T) => T);

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
    value: Updater<ApplicationData[K]>
  ) => void;
  resetData: () => void;
  imageFile: File;
  setImageFile: (file: File) => void;
}

export const useApplicationSlice = create<ApplicationStore>((set) => ({
  data: initialData,

  setUpdate: (key, value) =>
    set((state) => {
      const prev = state.data[key]; 
      let newValue = value; 

      if (typeof value === "function") {
        newValue = (value as (p: typeof prev) => typeof prev)(prev);
      }
      
      return {
        data: {
          ...state.data,
          [key]: newValue,
        },
      };
    }),

  resetData: () =>
    set({
      data: initialData,
      imageFile: initialImageFile,
    }),

  imageFile: initialImageFile,

  setImageFile: (file) => set({ imageFile: file }),
}));