import { StepPostData } from "@/src/types/models/application/StepPostData";
import { StepPostFormErrors } from "@/src/types/models/stepPost/StepPostFormErrors";

export const stepPostValidationStep1 = (
  data: StepPostData,
  currentErrors: StepPostFormErrors
): { isValid: boolean; errors: StepPostFormErrors } => {
  let isValid = true;
  const newErrors: StepPostFormErrors = { ...currentErrors };

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
