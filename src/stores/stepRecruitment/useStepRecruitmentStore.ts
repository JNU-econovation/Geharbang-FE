import { StepRecruitmentStore } from "@/src/types/store/stepRecruitmentStore";
import { create } from "zustand";
import { createStep3Slice, initialStep3Data } from "./slice/createStep3Slice";

export const useStepRecruitmentStore = create<StepRecruitmentStore>()(
  (set, get, api) => ({
    ...createStep3Slice(set, get, api),

    // 나중에 모든 스텝 데이터를 제출하는 함수
    submitAllData: async () => {
      const state = get();

      const finalPayload = {
        title: state.step3Data.title,
        introduction: state.step3Data.introduction,
        advantages: state.step3Data.advantages,
        employeeBenefits: state.step3Data.employeeBenefits,
        // ... 필요한 데이터들
      };

      console.log("백엔드로 보낼 데이터:", finalPayload);
    },

    resetAllData: () => {
      set({
        step3Data: initialStep3Data,
      });
    },
  })
);
