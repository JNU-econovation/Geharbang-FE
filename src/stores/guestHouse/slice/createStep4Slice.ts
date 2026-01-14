import { StateCreator } from "zustand";
import { Step4Data } from "@/src/types/models/guestHouse/enroll";
import { AllSlices, Step4Slice } from "@/src/types/store/guestHouseStore";

export const initialStep4Data: Step4Data = {
  instagram: "",
  phone: "",
  website: "",
  ownerMessage: "",
};

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
});
