import { Step4Data } from "@/src/types/models/stepRecruitment/Step4Data";
import { AllSlices } from "@/src/types/store/stepRecruitmentStore";
import { StateCreator } from "zustand";

export const initialStep4Data: Step4Data = {
  instagram: "",
  phone: "",
  email: "",
  website: "",
  ownerMessage: "",
};

export interface Step4Slice {
  step4Data: typeof initialStep4Data;
  setStep4Update: <K extends keyof typeof initialStep4Data>(
    key: K,
    value: (typeof initialStep4Data)[K]
  ) => void;
  resetStep4: () => void;
}

export const createStep4Slice: StateCreator<AllSlices, [], [], Step4Slice> = (
  set
) => ({
  step4Data: initialStep4Data,

  setStep4Update: (key, value) =>
    set((state) => ({
      step4Data: {
        ...state.step4Data,
        [key]: value,
      },
    })),

  resetStep4: () =>
    set(() => ({
      step4Data: initialStep4Data,
    })),
});
