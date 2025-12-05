import { Step3Slice } from "@/src/stores/stepRecruitment/slice/createStep3Slice";
// import { Step4Slice } from "@/src/stores/stepRecruitment/slice/createStep4Slice";

// 전체 슬라이스 타입
export type AllSlices = 
  // Step1Slice &
  // Step2Slice &
  Step3Slice;
  // & Step4Slice
  // & Step5Slice;
// 전체 스토어 타입 

export type StepRecruitmentStore = 
  AllSlices
  & {
    submitAllData: () => Promise<void>;
    resetAllData: () => void;
  };

