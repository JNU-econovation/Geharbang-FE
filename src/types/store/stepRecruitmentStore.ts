import { Step1Slice } from '@/src/stores/stepRecruitment/slice/createStep1Slice';
import { Step2Slice } from '@/src/stores/stepRecruitment/slice/createStep2Slice';
import { Step3Slice } from '@/src/stores/stepRecruitment/slice/createStep3Slice';
import { Step4Slice } from '@/src/stores/stepRecruitment/slice/createStep4Slice';
import { Step5Slice } from '@/src/stores/stepRecruitment/slice/createStep5Slice';

// 전체 슬라이스 타입
export type AllSlices = Step1Slice &
  Step2Slice &
  Step3Slice &
  Step4Slice &
  Step5Slice;
// 전체 스토어 타입

export type StepRecruitmentStore = AllSlices & {
  shouldScrollToError: boolean;
  setShouldScrollToError: (value: boolean) => void;
  resetAllData: () => void;
  editingId: number | null;
  setEditingId: (id: number | null) => void;
  existingQuestions: { id: string; text: string }[];
  setExistingQuestions: (questions: { id: string; text: string }[]) => void;
};
