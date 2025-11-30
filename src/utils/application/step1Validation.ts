import { File } from "@/src/types/File";
import { ApplicationData } from "@/src/types/models/application/ApplicationData";
import { FormErrors } from "@/src/types/models/application/FormErrors";

const validatePhoneNumber = (phoneNumber: string): boolean => {
  return /^010-(\d{4})-\d{4}$/.test(phoneNumber);
};

export const validateStep1 = (
  data: ApplicationData,
  imageFile: File | null,
  currentErrors: FormErrors
): { isValid: boolean; errors: FormErrors } => {
  let isValid = true;
  const newErrors: FormErrors = { ...currentErrors };

  if (!imageFile || imageFile.uri === "") {
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
    newErrors.birthDate = "생년월일을 선택해주세요";
    isValid = false;
  }

  if (data.gender === "무관") {
    newErrors.gender = "성별을 선택해주세요";
    isValid = false;
  }

  return { isValid, errors: newErrors };
};
