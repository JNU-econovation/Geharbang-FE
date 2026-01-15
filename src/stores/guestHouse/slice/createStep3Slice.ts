import { StateCreator } from "zustand";
import { Step3Data, Room } from "@/src/types/models/guestHouse/enroll";
import { AllSlices, Step3Slice } from "@/src/types/store/guestHouseStore";

type Updater<T> = T | ((prev: T) => T);

export const initialStep3Data: Step3Data = {
  rooms: [],
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

  addRoom: (room: Room) =>
    set((state) => ({
      step3Data: {
        ...state.step3Data,
        rooms: [...state.step3Data.rooms, room],
      },
    })),

  removeRoom: (roomId: string) =>
    set((state) => ({
      step3Data: {
        ...state.step3Data,
        rooms: state.step3Data.rooms.filter((r) => r.id !== roomId),
      },
    })),

  updateRoom: (roomId: string, room: Room) =>
    set((state) => ({
      step3Data: {
        ...state.step3Data,
        rooms: state.step3Data.rooms.map((r) => (r.id === roomId ? room : r)),
      },
    })),
});
