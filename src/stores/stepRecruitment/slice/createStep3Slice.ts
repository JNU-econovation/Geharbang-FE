import { Step3Data } from "@/src/types/models/stepRecruitment/Step3Data";
import { AllSlices } from "@/src/types/store/stepRecruitmentStore";
import { StateCreator } from "zustand";

type Updater<T> = T | ((prev: T) => T);

export const initialStep3Data: Step3Data = {
  title: "",
  introduction: "",
  advantages: [],
  employeeBenefits: [],
  mainImageUrls: [],
  introImageUrls: [],
  mainImageFiles: [],
  introImageFiles: [],
};

export interface Step3Slice {
  step3Data: Step3Data;
  setStep3Update: <K extends keyof Step3Data>(
    key: K,
    value: Updater<Step3Data[K]>
  ) => void;
}

export const createStep3Slice: StateCreator<AllSlices, [], [], Step3Slice> = (
  set
) => ({
  step3Data: initialStep3Data,

  setStep3Update: (key, value) =>
    set((state) => {
      const prev = state.step3Data[key];

      const newValue =
        typeof value === "function"
          ? (value as (p: typeof prev) => typeof prev)(prev)
          : value;

      return {
        step3Data: {
          ...state.step3Data,
          [key]: newValue,
        },
      };
    }),
});
