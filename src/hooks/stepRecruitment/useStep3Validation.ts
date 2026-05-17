import { Step3Data } from "@/src/types/models/stepRecruitment/Step3Data";
import { validateRepeatableItems } from "@/src/utils/common/validation";
import { useState } from "react";

interface FormErrors {
  title: string;
  mainImageFiles: string;
  introduction: string;
  introImageFiles: string;
  advantages: string;
  employeeBenefits: string;
}

export function useStep3Validation(step3Data: Step3Data) {
  const [errors, setErrors] = useState<FormErrors>({
    title: "",
    mainImageFiles: "",
    introduction: "",
    introImageFiles: "",
    advantages: "",
    employeeBenefits: "",
  });

  const clearError = (field: keyof FormErrors) => {
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateField = (field: keyof FormErrors): void => {
    let errorMsg = "";

    if (field === "title") {
      const { title } = step3Data;
      if (!title || title.trim() === "") {
        errorMsg = "공고글 제목을 입력해주세요";
      } else if (title.length < 5 || title.length > 30) {
        errorMsg = "공고글 제목은 최소 5~30자 이내로 입력해주세요";
      }
    }

    if (field === "introduction") {
      const { introduction } = step3Data;
      if (!introduction || introduction.trim() === "") {
        errorMsg = "소개글을 입력해주세요.";
      } else if (introduction.length < 10) {
        errorMsg = "소개글은 최소 10자 이상 입력해주세요";
      }
    }

    setErrors((prev) => ({ ...prev, [field]: errorMsg }));
  };

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: FormErrors = {
      title: "",
      mainImageFiles: "",
      introduction: "",
      introImageFiles: "",
      advantages: "",
      employeeBenefits: "",
    };

    const {
      title,
      mainImageFiles,
      mainImageUrls,
      introduction,
      introImageFiles,
      introImageUrls,
      advantages,
      employeeBenefits,
    } = step3Data;

    // 공고글 제목 검증
    if (!title || title.trim() === "") {
      newErrors.title = "공고글 제목을 입력해주세요";
      isValid = false;
    } else if (title.length < 5 || title.length > 30) {
      newErrors.title = "공고글 제목은 최소 5~30자 이내로 입력해주세요";
      isValid = false;
    }

    // 대표 사진 검증
    if (mainImageFiles.length === 0 && mainImageUrls.length === 0) {
      newErrors.mainImageFiles = "최소 1장 이상의 사진을 추가해주세요";
      isValid = false;
    }

    // 소개글 검증
    if (!introduction || introduction.trim() === "") {
      newErrors.introduction = "소개글을 입력해주세요.";
      isValid = false;
    } else if (introduction.length < 10) {
      newErrors.introduction = "소개글을 더 자세히 입력해주세요";
      isValid = false;
    }

    // 소개 사진 검증
    if (introImageFiles.length === 0 && introImageUrls.length === 0) {
      newErrors.introImageFiles = "최소 1장 이상의 사진을 추가해주세요";
      isValid = false;
    }

    // 우대사항 검증
    const advantageTexts = advantages.map((f) => f.text);
    const [isAdvantagesValid, advantageError] = validateRepeatableItems(
      advantageTexts,
      30
    );
    if (!isAdvantagesValid) {
      newErrors.advantages = advantageError;
      isValid = false;
    }

    // 복지 검증
    const benefitTexts = employeeBenefits.map((f) => f.text);
    const [isBenefitsValid, benefitError] = validateRepeatableItems(
      benefitTexts,
      30
    );

    if (!isBenefitsValid) {
      newErrors.employeeBenefits = benefitError;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  return {
    errors,
    clearError,
    validateForm,
    validateField,
  };
}
