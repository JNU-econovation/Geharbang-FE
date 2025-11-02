import { ApplicationData } from "@/src/types/models/ApplicationData";
import { useState } from "react";

interface FormErrors {
  image: string;
  name: string;
  phoneNumber: string;
  birthDate: string;
  gender: string;
  availableStartDate: string;
  selfIntroduction: string;
  mbti: string;
  instagramId: string;
}

interface UseApplicationFormValidationProps {
  data: ApplicationData;
  selectedImageFile: string | null;
  step?: number;
}

export function useApplicationFormValidation({
  data,
  selectedImageFile,
  step = 1,
}: UseApplicationFormValidationProps) {
  const [errors, setErrors] = useState<FormErrors>({
    image: "",
    name: "",
    phoneNumber: "",
    birthDate: "",
    gender: "",
    availableStartDate: "",
    selfIntroduction: "",
    mbti: "",
    instagramId: "",
  });

  const clearError = (field: keyof FormErrors) => {
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const setError = (field: keyof FormErrors, message: string) => {
    setErrors((prev) => ({ ...prev, [field]: message }));
  };

  const validatePhoneNumber = (phoneNumber: string): boolean => {
    return /^010-(\d{3,4})-\d{4}$/.test(phoneNumber);
  };

  //1단계 항목 검증
  const validateStep1 = (): boolean => {
    let isValid = true;
    const newErrors: FormErrors = { ...errors };

    if (!selectedImageFile) {
      newErrors.image = "대표 사진을 선택해주세요";
      isValid = false;
    }

    if (!data.name || data.name.trim() === "") {
      newErrors.name = "이름을 입력해주세요";
      isValid = false;
    }

    if (!data.phoneNumber || data.phoneNumber.trim() === "") {
      newErrors.phoneNumber = "전화번호를 입력해주세요";
      isValid = false;
    } else if (!validatePhoneNumber(data.phoneNumber)) {
      newErrors.phoneNumber = "올바른 전화번호 형식이 아닙니다";
      isValid = false;
    }

    if (!data.birthDate || data.birthDate.trim() === "") {
      newErrors.birthDate = "생일을 선택해주세요";
      isValid = false;
    }

    if (!data.gender) {
      newErrors.gender = "성별을 선택해주세요";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // 2단게 항목 검증
  const validateStep2 = (): boolean => {
    let isValid = true;
    const newErrors: FormErrors = { ...errors };

    if (!data.availableStartDate) {
      newErrors.availableStartDate = "근무 시작 가능일을 선택해주세요";
      isValid = false;
    }

    if (!data.selfIntroduction || data.selfIntroduction.trim() === "") {
      newErrors.selfIntroduction = "자기소개를 입력해주세요";
      isValid = false;
    } else if (data.selfIntroduction.trim().length < 10) {
      newErrors.selfIntroduction = "자기소개는 10자 이상 입력해주세요";
      isValid = false;
    }

    if (!data.mbti || data.mbti.trim() === "") {
      newErrors.mbti = "MBTI를 입력해주세요";
      isValid = false;
    }

    if (data.instagramId && data.instagramId.trim() !== "") {
      const instagramRegex = /^[a-zA-Z0-9_]+$/;
      if (!instagramRegex.test(data.instagramId)) {
        newErrors.instagramId = "영문, 숫자, 밑줄만 입력 가능합니다";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const validateForm = (): boolean => {
    if (step === 1) {
      return validateStep1();
    } else if (step === 2) {
      return validateStep2();
    }
    return false;
  };

  return {
    errors,
    clearError,
    setError,
    validateForm,
  };
}
