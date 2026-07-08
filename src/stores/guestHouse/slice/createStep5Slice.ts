import { StateCreator } from "zustand";
import { Step5Data } from "@/src/types/models/guestHouse/enroll";
import { AllSlices, Step5Slice } from "@/src/types/store/guestHouseStore";

export const initialStep5Data: Step5Data = {
  instagram: "",
  phone: "",
  website: "",
  reservationUrl: "",
  ownerMessage: "",
};

export const createStep5Slice: StateCreator<AllSlices, [], [], Step5Slice> = (
  set
) => ({
  step5Data: initialStep5Data,

  setStep5Update: (key, value) =>
    set((state) => ({
      step5Data: {
        ...state.step5Data,
        [key]: value,
      },
    })),
});
