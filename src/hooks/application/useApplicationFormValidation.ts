import { File } from "@/src/types/File";
import { ApplicationData } from "@/src/types/models/ApplicationData";
import { FormErrors } from "@/src/types/models/FormErrors";
import { validateStep1 } from "@/src/utils/application/step1Validation";
import { validateStep2 } from "@/src/utils/application/step2Validation";
import { useState } from "react";

interface UseApplicationFormValidationProps {
  data: ApplicationData;
  imageFile: File;
  step?: number;
}

export function useApplicationFormValidation({
  data,
  imageFile,
  step = 1,
}: UseApplicationFormValidationProps) {
  const [errors, setErrors] = useState<FormErrors>({
    image: "",
    name: "",
    phoneNumber: "",
    birthDate: "",
    gender: "",
    availableStartDate: "",
    selfIntroduction: "",
    mbti: "",
    instagramId: "",
  });

  const clearError = (field: keyof FormErrors) => {
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const runValidateStep1 = (): boolean => {
    const { isValid, errors: newErrors } = validateStep1(
      data,
      imageFile,
      errors
    );
    setErrors(newErrors);
    return isValid;
  };

  const runValidateStep2 = (): boolean => {
    const { isValid, errors: newErrors } = validateStep2(data, errors);
    setErrors(newErrors);
    return isValid;
  };

  const validateForm = (): boolean => {
    if (step === 1) return runValidateStep1();
    if (step === 2) return runValidateStep2();
    return false;
  };

  return {
    errors,
    clearError,
    validateForm,
  };
}
