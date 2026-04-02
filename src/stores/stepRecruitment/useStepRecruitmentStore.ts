import { create } from 'zustand';

import { StepRecruitmentStore } from '@/src/types/store/stepRecruitmentStore';
import { createStep1Slice, initialStep1Data } from './slice/createStep1Slice';
import { createStep2Slice, initialStep2Data } from './slice/createStep2Slice';
import { createStep3Slice, initialStep3Data } from './slice/createStep3Slice';
import { createStep4Slice, initialStep4Data } from './slice/createStep4Slice';
import { createStep5Slice, initialStep5Data } from './slice/createStep5Slice';

export const useStepRecruitmentStore = create<StepRecruitmentStore>()(
  (set, get, api) => ({
    ...createStep1Slice(set, get, api),
    ...createStep2Slice(set, get, api),
    ...createStep3Slice(set, get, api),
    ...createStep4Slice(set, get, api),
    ...createStep5Slice(set, get, api),

    shouldScrollToError: false,
    setShouldScrollToError: (value: boolean) => set({ shouldScrollToError: value }),

    resetAllData: () => {
      set(() => ({
        step1Data: initialStep1Data,
        step2Data: initialStep2Data,
        step3Data: initialStep3Data,
        step4Data: initialStep4Data,
        step5Data: initialStep5Data,
        shouldScrollToError: false,
      }));
    },
  }),
);
