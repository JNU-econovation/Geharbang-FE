import {
  IWorkingTimeAndWork,
  StepRecruitmentData,
} from "@/src/types/models/stepRecruitment/StepRecruitmentData";
import { create } from "zustand";

export const initialWorkingTimeAndWorkData: IWorkingTimeAndWork = {
  workingTimeName: "",
  startTime: new Date(new Date().setHours(9, 0, 0, 0)),
  endTime: new Date(new Date().setHours(18, 0, 0, 0)),
  thatTimeWork: "",
  perWorkingDay: "",
  workingCount: "",
  closedCount: "",
};

const initialStepRecruitmentData: StepRecruitmentData = {
  guestHouseName: "",
  workingRegion: "",
  location: null,
  workingStartDate: "",
  workingPeriod: "",
  workingTimeAndWork: [initialWorkingTimeAndWorkData],
  gender: "",
};

interface StepRecruitmentSlice {
  stepPostData: StepRecruitmentData;
  setStepPostData: <K extends keyof StepRecruitmentData>(
    key: K,
    value: StepRecruitmentData[K]
  ) => void;

  resetStepPost: () => void;
}

export const useStepRecruitmentSlice = create<StepRecruitmentSlice>((set) => ({
  stepPostData: initialStepRecruitmentData,

  setStepPostData: (key, value) =>
    set((state) => ({
      stepPostData: {
        ...state.stepPostData,
        [key]: value,
      },
    })),

  resetStepPost: () =>
    set({
      stepPostData: initialStepRecruitmentData,
    }),
}));
