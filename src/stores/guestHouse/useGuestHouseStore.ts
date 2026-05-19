import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GuestHouseStore } from "@/src/types/store/guestHouseStore";
import {
  createStep1Slice,
  initialStep1Data,
} from "./slice/createStep1Slice";
import {
  createStep2Slice,
  initialStep2Data,
} from "./slice/createStep2Slice";
import {
  createStep3Slice,
  initialStep3Data,
} from "./slice/createStep3Slice";
import {
  createStep4Slice,
  initialStep4Data,
} from "./slice/createStep4Slice";
import {
  createStep5Slice,
  initialStep5Data,
} from "./slice/createStep5Slice";

export const useGuestHouseStore = create<GuestHouseStore>()(
  persist(
    (set, get, api) => ({
      ...createStep1Slice(set, get, api),
      ...createStep2Slice(set, get, api),
      ...createStep3Slice(set, get, api),
      ...createStep4Slice(set, get, api),
      ...createStep5Slice(set, get, api),

      shouldScrollToError: false,
      setShouldScrollToError: (value: boolean) => set({ shouldScrollToError: value }),

      editingId: null,
      setEditingId: (id: number | null) => set({ editingId: id }),

      resetAllData: () => {
        set(() => ({
          step1Data: initialStep1Data,
          step2Data: initialStep2Data,
          step3Data: initialStep3Data,
          step4Data: initialStep4Data,
          step5Data: initialStep5Data,
          shouldScrollToError: false,
          editingId: null,
        }));
      },
    }),
    {
      name: "guesthouse-enrollment-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
