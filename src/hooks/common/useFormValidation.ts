import { useState } from "react";

export interface ValidationResult<E> {
  isValid: boolean;
  errors: E;
}

interface UseFormValidationProps<T, E> {
  formData: T;
  validators: {
    [key: number]: (data: T, errors: E) => ValidationResult<E>;
  };
  initialErrors: E;
  step?: number;
}

export const useFormValidation = <T, E>({
  formData,
  validators,
  initialErrors,
  step = 1,
}: UseFormValidationProps<T, E>) => {
  const [errors, setErrors] = useState<E>(initialErrors);

  const clearError = (field: keyof E) => {
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateForm = (): boolean => {
    const validator = validators[step];
    if (!validator) return true;

    const { isValid, errors: newErrors } = validator(formData, errors);
    setErrors(newErrors);
    return isValid;
  };

  return {
    errors,
    clearError,
    validateForm,
  };
};
