import {
  IWorkingTimeAndWork,
  Step2Data,
} from "@/src/types/models/stepRecruitment/Step2Data";
import { AllSlices } from "@/src/types/store/stepRecruitmentStore";
import { StateCreator } from "zustand";

export const initialWorkingTimeAndWorkData: IWorkingTimeAndWork = {
  workingTimeName: "",
  startTime: new Date(new Date().setHours(9, 0, 0, 0)),
  endTime: new Date(new Date().setHours(18, 0, 0, 0)),
  thatTimeWork: "",
  perWorkingDay: "",
  workingCount: "",
  closedCount: "",
};

export const initialStep2Data: Step2Data = {
  workingStartDate: "",
  workingPeriod: "",
  workingTimeAndWork: [initialWorkingTimeAndWorkData],
  gender: "",
};

export interface Step2Slice {
  step2Data: typeof initialStep2Data;
  setStep2Update: <K extends keyof typeof initialStep2Data>(
    key: K,
    value: (typeof initialStep2Data)[K]
  ) => void;
}

export const createStep2Slice: StateCreator<AllSlices, [], [], Step2Slice> = (
  set
) => ({
  step2Data: initialStep2Data,

  setStep2Update: (key, value) =>
    set((state) => ({
      step2Data: {
        ...state.step2Data,
        [key]: value,
      },
    })),
});
