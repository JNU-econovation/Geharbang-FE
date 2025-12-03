import { StepPostData } from "@/src/types/models/application/StepPostData";
import { StepPostFormErrors } from "@/src/types/models/stepPost/StepPostFormErrors";

export const stepPostValidationStep2 = (
  data: StepPostData,
  currentErrors: StepPostFormErrors
): { isValid: boolean; errors: StepPostFormErrors } => {
  let isValid = true;
  const newErrors: StepPostFormErrors = { ...currentErrors };

  if (!data.workingStartDate) {
    newErrors.workingStartDate = "근무 시작일을 선택해주세요.";
    isValid = false;
  }

  if (data.workingPeriod === "") {
    newErrors.workingPeriod = "근무 기간을 선택해주세요.";
    isValid = false;
  }

  if (data.gender === "") {
    newErrors.gender = "성별을 선택해주세요.";
    isValid = false;
  }

  return { isValid, errors: newErrors };
};
