import { ApplicationData } from "@/src/types/models/application/ApplicationData";
import { FormErrors } from "@/src/types/models/application/FormErrors";

export const validateStep2 = (
  data: ApplicationData,
  currentErrors: FormErrors
): { isValid: boolean; errors: FormErrors } => {
  let isValid = true;
  const newErrors: FormErrors = { ...currentErrors };

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
  } else if (data.selfIntroduction.trim().length > 300) {
    newErrors.selfIntroduction = "자기소개는 300자 이하로 입력해주세요";
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
    } else {
      newErrors.instagramId = "";
    }
  }
  return { isValid, errors: newErrors };
};
