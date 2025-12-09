import { create } from "zustand";

import { StepRecruitmentStore } from "@/src/types/store/stepRecruitmentStore";
import { createStep1Slice, initialStep1Data } from "./slice/createStep1Slice";
import { createStep2Slice, initialStep2Data } from "./slice/createStep2Slice";
// import { createStep3Slice } from "./slice/createStep3Slice";

export const useStepRecruitmentStore = create<StepRecruitmentStore>()(
  (set, get, api) => ({
    ...createStep1Slice(set, get, api),
    ...createStep2Slice(set, get, api),
    // ...createStep3Slice(set, get, api),

    submitAllData: async () => {
      const state = get();

      const finalPayload = {
        ...state.step1Data,
        ...state.step2Data,
        // ...state.step3Data,
      };

      console.log("백엔드로 보낼 데이터:", finalPayload);
    },

    resetAllData: () => {
      set(() => ({
        step1Data: initialStep1Data,
        step2Data: initialStep2Data,
        // step3Data: { ...state.step3Data },
      }));
    },
  })
);
