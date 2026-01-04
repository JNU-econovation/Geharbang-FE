import { useState } from "react";
import { Step1Data } from "@/src/types/models/guestHouse/enroll";

interface FormErrors {
  guestHouseName: string;
  workingRegion: string;
  location: string;
}

export function useGuestHouseStep1Validation(step1Data: Step1Data) {
  const [errors, setErrors] = useState<FormErrors>({
    guestHouseName: "",
    workingRegion: "",
    location: "",
  });

  const clearError = (field: keyof FormErrors) => {
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: FormErrors = {
      guestHouseName: "",
      workingRegion: "",
      location: "",
    };

    const { guestHouseName, workingRegion, location } = step1Data;

    // 게스트하우스 이름 검증
    if (!guestHouseName || guestHouseName.trim() === "") {
      newErrors.guestHouseName = "게스트하우스 이름을 입력해주세요";
      isValid = false;
    } else if (guestHouseName.length < 2 || guestHouseName.length > 30) {
      newErrors.guestHouseName = "게스트하우스 이름은 2~30자 사이로 입력해주세요";
      isValid = false;
    }

    // 지역 검증
    if (!workingRegion || workingRegion.trim() === "") {
      newErrors.workingRegion = "지역을 선택해주세요";
      isValid = false;
    }

    // 위치 검증
    if (!location) {
      newErrors.location = "위치를 선택해주세요";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  return {
    errors,
    clearError,
    validateForm,
  };
}
