import { useState } from 'react';
import { validateEmail, validatePhoneNumber } from '@/src/utils/common/validation';

interface FormErrors {
  instagram: string;
  phone: string;
  email: string;
  website: string;
  ownerMessage: string;
}

interface UseStep4ValidationProps {
  instagram: string;
  phone: string;
  email: string;
  website: string;
  ownerMessage: string;
}

export function useStep4Validation({
  instagram,
  phone,
  email,
  website,
  ownerMessage,
}: UseStep4ValidationProps) {
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

  const validateField = (field: keyof FormErrors): void => {
    let errorMsg = '';

    if (field === 'instagram' && instagram) {
      if (instagram.trim() === '') {
        errorMsg = '공백만 입력할 수 없습니다';
      } else if (instagram.length > 30) {
        errorMsg = '인스타그램 아이디는 30자 이내로 입력해주세요';
      }
    }

    if (field === 'phone' && phone) {
      if (!validatePhoneNumber(phone)) {
        errorMsg = '올바른 전화번호 형식이 아닙니다 (예: 064-123-4567)';
      }
    }

    if (field === 'email' && email) {
      if (email.length > 30) {
        errorMsg = '이메일은 30자 이내로 입력해주세요';
      } else if (!validateEmail(email)) {
        errorMsg = '올바른 이메일 형식이 아닙니다';
      }
    }

    if (field === 'website' && website) {
      if (website.trim() === '') {
        errorMsg = '공백만 입력할 수 없습니다';
      } else if (website.length > 30) {
        errorMsg = '웹사이트 주소는 30자 이내로 입력해주세요';
      }
    }

    if (field === 'ownerMessage' && ownerMessage) {
      if (ownerMessage.trim() === '') {
        errorMsg = '공백만 입력할 수 없습니다';
      } else if (ownerMessage.length > 100) {
        errorMsg = '메시지는 100자 이내로 입력해주세요';
      }
    }

    setErrors((prev) => ({ ...prev, [field]: errorMsg }));
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

    if (instagram) {
      if (instagram.trim() === '') {
        newErrors.instagram = '공백만 입력할 수 없습니다';
        isValid = false;
      } else if (instagram.length > 30) {
        newErrors.instagram = '인스타그램 아이디는 30자 이내로 입력해주세요';
        isValid = false;
      }
    }

    if (phone) {
      if (!validatePhoneNumber(phone)) {
        newErrors.phone = '올바른 전화번호 형식이 아닙니다 (예: 064-123-4567)';
        isValid = false;
      }
    }

    if (email) {
      if (email.length > 30) {
        newErrors.email = '이메일은 30자 이내로 입력해주세요';
        isValid = false;
      } else if (!validateEmail(email)) {
        newErrors.email = '올바른 이메일 형식이 아닙니다';
        isValid = false;
      }
    }

    if (website) {
      if (website.trim() === '') {
        newErrors.website = '공백만 입력할 수 없습니다';
        isValid = false;
      } else if (website.length > 30) {
        newErrors.website = '웹사이트 주소는 30자 이내로 입력해주세요';
        isValid = false;
      }
    }

    if (ownerMessage) {
      if (ownerMessage.trim() === '') {
        newErrors.ownerMessage = '공백만 입력할 수 없습니다';
        isValid = false;
      } else if (ownerMessage.length > 100) {
        newErrors.ownerMessage = '메시지는 100자 이내로 입력해주세요';
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
