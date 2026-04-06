import { StateCreator } from "zustand";
import { Step3Data, Party } from "@/src/types/models/guestHouse/enroll";
import { AllSlices, Step3Slice } from "@/src/types/store/guestHouseStore";

type Updater<T> = T | ((prev: T) => T);

export const initialStep3Data: Step3Data = {
  parties: [],
};

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

  addParty: (party: Party) =>
    set((state) => ({
      step3Data: {
        ...state.step3Data,
        parties: [...state.step3Data.parties, party],
      },
    })),

  removeParty: (partyId: string) =>
    set((state) => ({
      step3Data: {
        ...state.step3Data,
        parties: state.step3Data.parties.filter((p) => p.id !== partyId),
      },
    })),

  updateParty: (partyId: string, party: Party) =>
    set((state) => ({
      step3Data: {
        ...state.step3Data,
        parties: state.step3Data.parties.map((p) =>
          p.id === partyId ? party : p
        ),
      },
    })),
});
