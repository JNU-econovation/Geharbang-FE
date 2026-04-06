import { useState } from "react";

import { Step1Data } from "@/src/types/models/stepRecruitment/Step1Data";
import { Step1FormErrors } from "@/src/types/models/stepRecruitment/Step1FormErrors";

export function useStep1Validation(step1Data: Step1Data) {
  const [errors, setErrors] = useState<Step1FormErrors>({
    guestHouseName: "",
    workingRegion: "",
    location: "",
  });

  const clearError = (field: keyof Step1FormErrors) => {
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateField = (field: keyof Step1FormErrors): void => {
    let errorMsg = "";

    if (field === "guestHouseName") {
      const { guestHouseName } = step1Data;
      if (!guestHouseName || guestHouseName.trim() === "") {
        errorMsg = "게스트하우스 이름을 입력해주세요.";
      } else if (guestHouseName.trim().length < 2 || guestHouseName.trim().length > 30) {
        errorMsg = "게스트하우스 이름은 2~30자 사이로 입력해주세요";
      }
    }

    setErrors((prev) => ({ ...prev, [field]: errorMsg }));
  };

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: Step1FormErrors = {
      guestHouseName: "",
      workingRegion: "",
      location: "",
    };

    const { guestHouseName, workingRegion, location } = step1Data;

    if (!guestHouseName || guestHouseName.trim() === "") {
      newErrors.guestHouseName = "게스트하우스 이름을 입력해주세요.";
      isValid = false;
    } else if (guestHouseName.trim().length < 2 || guestHouseName.trim().length > 30) {
      newErrors.guestHouseName = "게스트하우스 이름은 2~30자 사이로 입력해주세요";
      isValid = false;
    }

    if (!workingRegion || workingRegion.trim() === "") {
      newErrors.workingRegion = "근무 지역을 선택해주세요.";
      isValid = false;
    }

    if (!location) {
      newErrors.location = "근무 위치를 선택해주세요.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  return { errors, clearError, validateForm, validateField };
}
