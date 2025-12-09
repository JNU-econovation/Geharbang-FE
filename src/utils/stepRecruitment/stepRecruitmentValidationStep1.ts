import { Step1Data } from "@/src/types/models/stepRecruitment/Step1Data";
import { Step1FormErrors } from "@/src/types/models/stepRecruitment/Step1FormErrors";

export const stepRecruitmentValidationStep1 = (
  data: Step1Data,
  currentErrors: Step1FormErrors
): { isValid: boolean; errors: Step1FormErrors } => {
  let isValid = true;
  const newErrors: Step1FormErrors = { ...currentErrors };

  if (!data.guestHouseName || data.guestHouseName.trim() === "") {
    newErrors.guestHouseName = "게스트하우스 이름을 입력해주세요.";
    isValid = false;
  }

  if (!data.workingRegion || data.workingRegion.trim() === "") {
    newErrors.workingRegion = "근무 지역을 선택해주세요.";
    isValid = false;
  }

  if (!data.location) {
    newErrors.location = "근무 위치를 선택해주세요.";
    isValid = false;
  }

  return { isValid, errors: newErrors };
};
