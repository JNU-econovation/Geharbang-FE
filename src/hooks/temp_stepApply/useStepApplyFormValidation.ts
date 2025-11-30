import { Question } from "@/src/types/models/stepApply";
import { useState } from "react";

interface FormErrors {
  [questionId: number]: string;
}

interface UseStepApplyFormValidationProps {
  questions?: Question[];
  answers: { [key: number]: string };
}

export const useStepApplyFormValidation = ({
  questions,
  answers,
}: UseStepApplyFormValidationProps) => {
  const [errors, setErrors] = useState<FormErrors>({});

  const clearError = (questionId: number) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[questionId]; 
      return newErrors;
    });
  };

  const validateForm = (): boolean => {
    //질문 없으면 유효성 검사 패스
    if (!questions || questions.length === 0) {
      return true;
    }

    const newErrors: FormErrors = {};
    let isValid = true;

    questions.forEach((question) => {
      const answer = answers[question.questionId]?.trim();
      if (!answer) {
        newErrors[question.questionId] = "이 항목은 필수 입력 사항입니다.";
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  return {
    errors,
    clearError,
    validateForm,
  };
};
