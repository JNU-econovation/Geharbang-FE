import { StateCreator } from "zustand";
import { Step4Data, Room } from "@/src/types/models/guestHouse/enroll";
import { AllSlices, Step4Slice } from "@/src/types/store/guestHouseStore";

type Updater<T> = T | ((prev: T) => T);

export const initialStep4Data: Step4Data = {
  rooms: [],
};

export const createStep4Slice: StateCreator<AllSlices, [], [], Step4Slice> = (
  set
) => ({
  step4Data: initialStep4Data,

  setStep4Update: (key, value) =>
    set((state) => {
      const prev = state.step4Data[key];

      const newValue =
        typeof value === "function"
          ? (value as (p: typeof prev) => typeof prev)(prev)
          : value;

      return {
        step4Data: {
          ...state.step4Data,
          [key]: newValue,
        },
      };
    }),

  addRoom: (room: Room) =>
    set((state) => ({
      step4Data: {
        ...state.step4Data,
        rooms: [...state.step4Data.rooms, room],
      },
    })),

  removeRoom: (roomId: string) =>
    set((state) => ({
      step4Data: {
        ...state.step4Data,
        rooms: state.step4Data.rooms.filter((r) => r.id !== roomId),
      },
    })),

  updateRoom: (roomId: string, room: Room) =>
    set((state) => ({
      step4Data: {
        ...state.step4Data,
        rooms: state.step4Data.rooms.map((r) => (r.id === roomId ? room : r)),
      },
    })),
});
