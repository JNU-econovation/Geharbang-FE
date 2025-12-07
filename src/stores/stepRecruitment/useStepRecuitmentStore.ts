import { StepRecruitmentStore } from "@/src/types/store/stepRecruitmentStore";
import { create } from "zustand";
import { createStep1Slice } from "./slice/createStep1Slice";
import { createStep2Slice } from "./slice/createStep2Slice";
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
      set((state) => ({
        step1Data: { ...state.step1Data },
        step2Data: { ...state.step2Data },
        // step3Data: { ...state.step3Data },
      }));
    },
  })
);
