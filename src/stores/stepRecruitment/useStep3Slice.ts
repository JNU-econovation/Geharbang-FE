import { Step3Data } from "@/src/types/models/stepRecruitment/Step3Data";
import { create } from "zustand";

type Updater<T> = T | ((prev: T) => T);

const initialStep3Data: Step3Data = {
  title: "",
  introduction: "",
  advantages: [],
  employeeBenefits: [],
  mainImageUrls: [],
  introImageUrls: [],
  mainImageFiles: [],
  introImageFiles: [],
};

interface Step3Store {
  step3Data: Step3Data;
  setStep3Update: <K extends keyof Step3Data>(
    key: K,
    value: Updater<Step3Data[K]>
  ) => void;
}

export const useStep3Slice = create<Step3Store>((set) => ({
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
}));
