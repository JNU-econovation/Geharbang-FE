import { File } from "@/src/types/File";
import { ApplicationData } from "@/src/types/models/application/ApplicationData";
import { ApplicationFormErrors } from "@/src/types/models/application/ApplicationFormErrors";

const validatePhoneNumber = (phoneNumber: string): boolean => {
  return /^010-(\d{4})-\d{4}$/.test(phoneNumber);
};

export const applicationValidateStep1 = (
  data: ApplicationData,
  imageFile: File | null,
  currentErrors: ApplicationFormErrors
): { isValid: boolean; errors: ApplicationFormErrors } => {
  let isValid = true;
  const newErrors: ApplicationFormErrors = { ...currentErrors };

  if (!imageFile || imageFile.uri === "") {
    newErrors.image = "대표 사진을 선택해주세요";
    isValid = false;
  }

  if (!data.name || data.name.trim() === "") {
    newErrors.name = "이름을 입력해주세요";
    isValid = false;
  } else if (data.name.length < 2 || data.name.length > 10) {
      newErrors.name = "이름은 2~10자 사이로 입력해주세요";
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
    newErrors.birthDate = "생년월일을 선택해주세요";
    isValid = false;
  }

  if (data.gender === "무관") {
    newErrors.gender = "성별을 선택해주세요";
    isValid = false;
  }

  return { isValid, errors: newErrors };
};
