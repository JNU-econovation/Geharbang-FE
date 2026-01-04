import { StateCreator } from "zustand";
import { Step2Data, Party } from "@/src/types/models/guestHouse/enroll";
import { AllSlices, Step2Slice } from "@/src/types/store/guestHouseStore";

type Updater<T> = T | ((prev: T) => T);

export const initialStep2Data: Step2Data = {
  mainImages: [],
  introduction: "",
  facilities: [],
  atmosphere: [],
  parties: [],
};

export const createStep2Slice: StateCreator<AllSlices, [], [], Step2Slice> = (
  set
) => ({
  step2Data: initialStep2Data,

  setStep2Update: (key, value) =>
    set((state) => {
      const prev = state.step2Data[key];

      const newValue =
        typeof value === "function"
          ? (value as (p: typeof prev) => typeof prev)(prev)
          : value;

      return {
        step2Data: {
          ...state.step2Data,
          [key]: newValue,
        },
      };
    }),

  addParty: (party: Party) =>
    set((state) => ({
      step2Data: {
        ...state.step2Data,
        parties: [...state.step2Data.parties, party],
      },
    })),

  removeParty: (partyId: string) =>
    set((state) => ({
      step2Data: {
        ...state.step2Data,
        parties: state.step2Data.parties.filter((p) => p.id !== partyId),
      },
    })),

  updateParty: (partyId: string, party: Party) =>
    set((state) => ({
      step2Data: {
        ...state.step2Data,
        parties: state.step2Data.parties.map((p) =>
          p.id === partyId ? party : p
        ),
      },
    })),
});
