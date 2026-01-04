import { StateCreator } from "zustand";
import { Step1Data } from "@/src/types/models/guestHouse/enroll";
import { AllSlices, Step1Slice } from "@/src/types/store/guestHouseStore";

export const initialStep1Data: Step1Data = {
  guestHouseName: "",
  workingRegion: "",
  location: null,
};

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
