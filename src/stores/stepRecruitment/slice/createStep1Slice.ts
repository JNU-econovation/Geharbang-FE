import { Step1Data } from "@/src/types/models/stepRecruitment/Step1Data";
import { AllSlices } from "@/src/types/store/stepRecruitmentStore";
import { StateCreator } from "zustand";

export const initialStep1Data: Step1Data = {
  guestHouseName: "",
  workingRegion: "",
  location: null,
};

export interface Step1Slice {
  step1Data: typeof initialStep1Data;
  setStep1Update: <K extends keyof typeof initialStep1Data>(
    key: K,
    value: (typeof initialStep1Data)[K]
  ) => void;
}

export const createStep1Slice: StateCreator<AllSlices, [], [], Step1Slice> = (
  set
) => ({
  step1Data: initialStep1Data,

  setStep1Update: (key, value) =>
    set((state) => ({
      step1Data: {
        ...state.step1Data,
        [key]: value,
      },
    })),
});
