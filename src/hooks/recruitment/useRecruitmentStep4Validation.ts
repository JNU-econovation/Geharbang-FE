import { useState } from 'react';

interface FormErrors {
  instagram: string;
  phone: string;
  email: string;
  website: string;
  ownerMessage: string;
}

interface UseRecruitmentStep4ValidationProps {
  instagram: string;
  phone: string;
  email: string;
  website: string;
  ownerMessage: string;
}

const validatePhoneNumber = (phone: string): boolean => {
  // 형식: XXX-XXX-XXXX 또는 XXX-XXXX-XXXX
  return /^\d{3}-\d{3,4}-\d{4}$/.test(phone);
};

const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export function useRecruitmentStep4Validation({
  instagram,
  phone,
  email,
  website,
  ownerMessage,
}: UseRecruitmentStep4ValidationProps) {
  const [errors, setErrors] = useState<FormErrors>({
    instagram: '',
    phone: '',
    email: '',
    website: '',
    ownerMessage: '',
  });

  const clearError = (field: keyof FormErrors) => {
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: FormErrors = {
      instagram: '',
      phone: '',
      email: '',
      website: '',
      ownerMessage: '',
    };

    // 인스타그램 검증 (선택 필드)
    if (instagram && instagram.length > 30) {
      newErrors.instagram = '인스타그램 아이디는 30자 이내로 입력해주세요';
      isValid = false;
    }

    // 전화번호 검증 (선택 필드)
    if (phone) {
      if (!validatePhoneNumber(phone)) {
        newErrors.phone = '올바른 전화번호 형식이 아닙니다 (예: 064-123-4567)';
        isValid = false;
      }
    }

    // 이메일 검증 (선택 필드)
    if (email) {
      if (email.length > 30) {
        newErrors.email = '이메일은 30자 이내로 입력해주세요';
        isValid = false;
      } else if (!validateEmail(email)) {
        newErrors.email = '올바른 이메일 형식이 아닙니다';
        isValid = false;
      }
    }

    // 웹사이트 검증 (선택 필드)
    if (website && website.length > 30) {
      newErrors.website = '웹사이트 주소는 30자 이내로 입력해주세요';
      isValid = false;
    }

    // 사장님 한마디 검증 (선택 필드)
    if (ownerMessage && ownerMessage.length > 100) {
      newErrors.ownerMessage = '메시지는 100자 이내로 입력해주세요';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  return {
    errors,
    clearError,
    validateForm,
  };
}
