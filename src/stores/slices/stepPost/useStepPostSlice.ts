import { create } from "zustand";

import {
  IWorkingTimeAndWork,
  StepPostData,
} from "@/src/types/models/application/StepPostData";

export const initialWorkingTimeAndWorkData: IWorkingTimeAndWork = {
  workingTimeName: "",
  startTime: new Date(new Date().setHours(9, 0, 0, 0)),
  endTime: new Date(new Date().setHours(18, 0, 0, 0)),
  thatTimeWork: "",
  perWorkingDay: "",
  workingCount: 0,
  closedCount: 0,
};

const initialStepPostData: StepPostData = {
  guestHouseName: "",
  workingRegion: "",
  location: null,
  workingStartDate: "",
  workingPeriod: "",
  workingTimeAndWork: [initialWorkingTimeAndWorkData],
  gender: "",
};

interface StepPostSlice {
  stepPostData: StepPostData;
  setStepPostData: <K extends keyof StepPostData>(
    key: K,
    value: StepPostData[K]
  ) => void;

  resetStepPost: () => void;
}

export const useStepPostSlice = create<StepPostSlice>((set) => ({
  stepPostData: initialStepPostData,

  setStepPostData: (key, value) =>
    set((state) => ({
      stepPostData: {
        ...state.stepPostData,
        [key]: value,
      },
    })),

  resetStepPost: () =>
    set({
      stepPostData: initialStepPostData,
    }),
}));
