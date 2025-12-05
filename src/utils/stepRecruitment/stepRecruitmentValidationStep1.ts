import { StepRecruitmentData } from "@/src/types/models/stepRecruitment/StepRecruitmentData";
import { StepRecruitmentFormErrors } from "@/src/types/models/stepRecruitment/StepRecruitmentFormErrors";

export const stepRecruitmentValidationStep1 = (
  data: StepRecruitmentData,
  currentErrors: StepRecruitmentFormErrors
): { isValid: boolean; errors: StepRecruitmentFormErrors } => {
  let isValid = true;
  const newErrors: StepRecruitmentFormErrors = { ...currentErrors };

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
