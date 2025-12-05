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

  const clearError = (field: keyof E, index?: number) => {
    if (index !== undefined && Array.isArray(errors[field])) {
      const arr = [...(errors[field] as any[])];

      arr[index] = Object.fromEntries(
        Object.keys(arr[index]).map((key) => [key, ""])
      );

      setErrors((prev) => ({ ...prev, [field]: arr } as E));
    } else {
      setErrors((prev) => ({ ...prev, [field]: "" } as E));
    }
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
