import { create } from "zustand";

import { File } from "@/src/types/File";
import { ApplicationData } from "@/src/types/models/application/ApplicationData";
import {
  IWorkingTimeAndWork,
  StepPostData,
} from "@/src/types/models/application/StepPostData";

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

export const initialWorkingTimeAndWorkData: IWorkingTimeAndWork = {
  workingTimeName: "",
  startTime: "",
  endTime: "",
  thatTimeWork: "",
  perWorkingDay: "",
  workingCount: 0,
  closedCount: 0,
};

const initialStepPostData: StepPostData = {
  guestHouseName: "",
  workingRegion: "",
  location: "",
  workingStartDate: "",
  workingPeriod: "",
  workingTimeAndWork: [initialWorkingTimeAndWorkData],
  gender: "",
};

interface ApplicationStore {
  applicationData: ApplicationData;
  setApplicationData: <K extends keyof ApplicationData>(
    key: K,
    value: ApplicationData[K]
  ) => void;

  stepPostData: StepPostData;
  setStepPostData: <K extends keyof StepPostData>(
    key: K,
    value: StepPostData[K]
  ) => void;

  currentStep: number;
  goToNextStep: () => void;
  goToPrevStep: () => void;

  imageFile: File;
  setImageFile: (file: File) => void;

  resetData: () => void;
}

export const useApplicationSlice = create<ApplicationStore>((set) => ({
  applicationData: initialApplicationData,

  setApplicationData: (key, value) =>
    set((state) => ({
      applicationData: {
        ...state.applicationData,
        [key]: value,
      },
    })),

  stepPostData: initialStepPostData,
  setStepPostData: (key, value) =>
    set((state) => ({
      stepPostData: {
        ...state.stepPostData,
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

  imageFile: initialImageFile,

  setImageFile: (file) => set({ imageFile: file }),

  resetData: () =>
    set({
      applicationData: initialApplicationData,
      stepPostData: initialStepPostData,
      imageFile: initialImageFile,
      currentStep: 1,
    }),
}));
