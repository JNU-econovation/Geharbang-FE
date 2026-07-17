import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { StepRecruitmentStore } from '@/src/types/store/stepRecruitmentStore';
import { migrateLegacyRegionValue } from '@/src/utils/region';
import { createStep1Slice, initialStep1Data } from './slice/createStep1Slice';
import { createStep2Slice, initialStep2Data } from './slice/createStep2Slice';
import { createStep3Slice, initialStep3Data } from './slice/createStep3Slice';
import { createStep4Slice, initialStep4Data } from './slice/createStep4Slice';
import { createStep5Slice, initialStep5Data } from './slice/createStep5Slice';

const asyncStorageWithDateReviver = {
  getItem: async (name: string) => {
    const str = await AsyncStorage.getItem(name);
    if (!str) return null;
    return JSON.parse(str, (key, value) => {
      if ((key === 'startTime' || key === 'endTime') && typeof value === 'string') {
        return new Date(value);
      }
      return value;
    });
  },
  setItem: (name: string, value: unknown) =>
    AsyncStorage.setItem(name, JSON.stringify(value)),
  removeItem: (name: string) => AsyncStorage.removeItem(name),
};

export const useStepRecruitmentStore = create<StepRecruitmentStore>()(
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

      existingQuestions: [],
      setExistingQuestions: (questions) => set({ existingQuestions: questions }),

      resetAllData: () => {
        set(() => ({
          step1Data: initialStep1Data,
          step2Data: initialStep2Data,
          step3Data: initialStep3Data,
          step4Data: initialStep4Data,
          step5Data: initialStep5Data,
          shouldScrollToError: false,
          editingId: null,
          existingQuestions: [],
        }));
      },
    }),
    {
      name: 'step-recruitment-storage',
      storage: asyncStorageWithDateReviver,
      version: 1,
      migrate: (persistedState) => {
        const state = persistedState as { step1Data?: { workingRegion?: string } };
        if (state?.step1Data?.workingRegion) {
          state.step1Data.workingRegion = migrateLegacyRegionValue(
            state.step1Data.workingRegion
          );
        }
        return state;
      },
    }
  )
);
