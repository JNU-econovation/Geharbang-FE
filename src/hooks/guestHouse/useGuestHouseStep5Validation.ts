import { Step5Data } from "@/src/types/models/guestHouse/enroll";
import { validatePhoneNumber } from "@/src/utils/common/validation";
import { useState } from "react";

interface FormErrors {
  instagram: string;
  phone: string;
  website: string;
  ownerMessage: string;
}

export function useGuestHouseStep5Validation(step5Data: Step5Data) {
  const [errors, setErrors] = useState<FormErrors>({
    instagram: "",
    phone: "",
    website: "",
    ownerMessage: "",
  });

  const clearError = (field: keyof FormErrors) => {
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateField = (field: keyof FormErrors): void => {
    let errorMsg = "";
    const { instagram, phone, website, ownerMessage } = step5Data;

    if (field === "instagram" && instagram) {
      if (instagram.trim() === "") {
        errorMsg = "공백만 입력할 수 없습니다";
      } else if (instagram.length > 30) {
        errorMsg = "내용을 30자 이내로 입력해주세요";
      }
    }

    if (field === "phone" && phone) {
      if (phone.trim() === "") {
        errorMsg = "공백만 입력할 수 없습니다";
      } else if (!validatePhoneNumber(phone)) {
        errorMsg = "전화번호 길이가 올바르지 않습니다";
      }
    }

    if (field === "website" && website) {
      if (website.trim() === "") {
        errorMsg = "공백만 입력할 수 없습니다";
      } else if (website.length > 100) {
        errorMsg = "내용을 100자 이내로 입력해주세요";
      }
    }

    if (field === "ownerMessage" && ownerMessage) {
      if (ownerMessage.trim() === "") {
        errorMsg = "공백만 입력할 수 없습니다";
      } else if (ownerMessage.length > 50) {
        errorMsg = "내용을 50자 이내로 입력해주세요";
      }
    }

    setErrors((prev) => ({ ...prev, [field]: errorMsg }));
  };

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: FormErrors = {
      instagram: "",
      phone: "",
      website: "",
      ownerMessage: "",
    };

    const { instagram, phone, website, ownerMessage } = step5Data;

    if (instagram) {
      if (instagram.trim() === "") {
        newErrors.instagram = "공백만 입력할 수 없습니다";
        isValid = false;
      } else if (instagram.length > 30) {
        newErrors.instagram = "내용을 30자 이내로 입력해주세요";
        isValid = false;
      }
    }

    if (phone) {
      if (phone.trim() === "") {
        newErrors.phone = "공백만 입력할 수 없습니다";
        isValid = false;
      } else if (!validatePhoneNumber(phone)) {
        newErrors.phone = "전화번호 길이가 올바르지 않습니다";
        isValid = false;
      }
    }

    if (website) {
      if (website.trim() === "") {
        newErrors.website = "공백만 입력할 수 없습니다";
        isValid = false;
      } else if (website.length > 100) {
        newErrors.website = "내용을 100자 이내로 입력해주세요";
        isValid = false;
      }
    }

    if (ownerMessage) {
      if (ownerMessage.trim() === "") {
        newErrors.ownerMessage = "공백만 입력할 수 없습니다";
        isValid = false;
      } else if (ownerMessage.length > 50) {
        newErrors.ownerMessage = "내용을 50자 이내로 입력해주세요";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  return {
    errors,
    clearError,
    validateForm,
    validateField,
  };
}
