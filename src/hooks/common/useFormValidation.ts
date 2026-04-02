import { useState } from "react";

export interface ValidationResult<E> {
  isValid: boolean;
  errors: E;
}
interface UseFormValidationProps<T, E> {
  formData: T;
  validators: { [key: number]: (data: T, errors: E) => ValidationResult<E> };
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

  const clearError = (field: keyof E, index?: number, key?: string) => {
    setErrors((prev) => {
      if (index !== undefined && Array.isArray(prev[field])) {
        const arr = [...(prev[field] as any[])];
        if (!arr[index]) arr[index] = {};

        if (key) {
          arr[index] = { ...arr[index], [key]: "" };
        } else {
          arr[index] = Object.fromEntries(
            Object.keys(arr[index]).map((k) => [k, ""])
          );
        }

        return { ...prev, [field]: arr } as E;
      } else if (key) {
        return { ...prev, [field]: { ...prev[field], [key]: "" } } as E;
      } else {
        return { ...prev, [field]: "" } as E;
      }
    });
  };

  const validateForm = (): boolean => {
    const validator = validators[step];
    if (!validator) return true;
    const { isValid, errors: newErrors } = validator(formData, errors);
    setErrors(newErrors);
    return isValid;
  };

  const validateField = (field: keyof E, index?: number, subField?: string): void => {
    const validator = validators[step];
    if (!validator) return;
    const { errors: newErrors } = validator(formData, initialErrors);

    if (index !== undefined && subField && Array.isArray(newErrors[field])) {
      setErrors((prev) => {
        const arr = Array.isArray(prev[field]) ? [...(prev[field] as any[])] : [];
        if (!arr[index]) arr[index] = {};
        arr[index] = {
          ...arr[index],
          [subField]: (newErrors[field] as any[])[index]?.[subField] ?? "",
        };
        return { ...prev, [field]: arr } as E;
      });
    } else {
      setErrors((prev) => ({ ...prev, [field]: newErrors[field as keyof E] }));
    }
  };

  return { errors, clearError, validateForm, validateField };
};
