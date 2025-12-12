import { Step5Data } from "@/src/types/models/stepRecruitment/Step5Data";
import { Question } from "@/src/types/models/stepRecruitment/Question";
import { AllSlices } from "@/src/types/store/stepRecruitmentStore";
import { StateCreator } from "zustand";

export const initialStep5Data: Step5Data = {
  questions: [],
};

export interface Step5Slice {
  step5Data: typeof initialStep5Data;
  setStep5Questions: (questions: Question[]) => void;
  addStep5Question: (question: Question) => void;
  updateStep5Question: (id: string, text: string) => void;
  removeStep5Question: (id: string) => void;
}

export const createStep5Slice: StateCreator<AllSlices, [], [], Step5Slice> = (
  set
) => ({
  step5Data: initialStep5Data,

  setStep5Questions: (questions) =>
    set((state) => ({
      step5Data: {
        ...state.step5Data,
        questions,
      },
    })),

  addStep5Question: (question) =>
    set((state) => ({
      step5Data: {
        ...state.step5Data,
        questions: [...state.step5Data.questions, question],
      },
    })),

  updateStep5Question: (id, text) =>
    set((state) => ({
      step5Data: {
        ...state.step5Data,
        questions: state.step5Data.questions.map((q) =>
          q.id === id ? { ...q, text } : q
        ),
      },
    })),

  removeStep5Question: (id) =>
    set((state) => ({
      step5Data: {
        ...state.step5Data,
        questions: state.step5Data.questions.filter((q) => q.id !== id),
      },
    })),
});
