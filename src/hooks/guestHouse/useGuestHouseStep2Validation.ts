import { Step2Data } from "@/src/types/models/guestHouse/enroll";
import { validateRepeatableItems } from "@/src/utils/common/validation";
import { useState } from "react";

interface FormErrors {
  mainImages: string;
  introduction: string;
  facilities: string;
  atmosphere: string;
  parties: string;
}

export function useGuestHouseStep2Validation(step2Data: Step2Data) {
  const [errors, setErrors] = useState<FormErrors>({
    mainImages: "",
    introduction: "",
    facilities: "",
    atmosphere: "",
    parties: "",
  });

  const clearError = (field: keyof FormErrors) => {
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const setError = (field: keyof FormErrors, message: string) => {
    setErrors((prev) => ({ ...prev, [field]: message }));
  };

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: FormErrors = {
      mainImages: "",
      introduction: "",
      facilities: "",
      atmosphere: "",
      parties: "",
    };

    const { mainImages, introduction, facilities, atmosphere } = step2Data;

    if (!mainImages || mainImages.length === 0) {
      newErrors.mainImages = "게스트하우스 사진을 최소 1장 이상 등록해주세요";
      isValid = false;
    } else if (mainImages.length > 10) {
      newErrors.mainImages = "사진은 최대 10장까지 등록할 수 있습니다";
      isValid = false;
    }

    if (!introduction || introduction.trim() === "") {
      newErrors.introduction = "소개글을 입력해주세요";
      isValid = false;
    } else if (introduction.length < 10) {
      newErrors.introduction = "소개글은 최소 10자 이상 입력해주세요";
      isValid = false;
    } else if (introduction.length > 500) {
      newErrors.introduction = "소개글은 최대 500자까지 입력할 수 있습니다";
      isValid = false;
    }

    if (!facilities || facilities.length === 0) {
      newErrors.facilities = "편의시설을 등록해주세요";
      isValid = false;
    } else if (facilities.length > 10) {
      newErrors.facilities = "편의시설은 최대 10개까지 등록할 수 있습니다";
      isValid = false;
    } else {
      const [isFacilitiesValid, facilitiesError] = validateRepeatableItems(
        facilities,
        20
      );
      if (!isFacilitiesValid) {
        newErrors.facilities = facilitiesError;
        isValid = false;
      }
    }

    if (!atmosphere || atmosphere.length === 0) {
      newErrors.atmosphere = "게스트하우스 분위기를 선택해주세요";
      isValid = false;
    } else if (atmosphere.length > 2) {
      newErrors.atmosphere = "분위기는 최대 2개까지 선택할 수 있습니다";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  return {
    errors,
    clearError,
    setError,
    validateForm,
  };
}
