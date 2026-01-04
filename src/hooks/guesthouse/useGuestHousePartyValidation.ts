import { useState } from 'react';

interface FormErrors {
  type: string;
  customTypeName: string;
  images: string;
  startTime: string;
  endTime: string;
  days: string;
  location: string;
  mood: string;
  allowExternal: string;
  guestFee: string;
  externalFee: string;
  description: string;
}

interface PartyFormData {
  type: string;
  customTypeName: string;
  images: any[];
  startTime: Date;
  endTime: Date;
  days: string[];
  location: string;
  mood: string;
  allowExternal: boolean | null;
  guestFee: string;
  externalFee: string;
  description: string;
}

export function useGuestHousePartyValidation(partyData: PartyFormData) {
  const [errors, setErrors] = useState<FormErrors>({
    type: '',
    customTypeName: '',
    images: '',
    startTime: '',
    endTime: '',
    days: '',
    location: '',
    mood: '',
    allowExternal: '',
    guestFee: '',
    externalFee: '',
    description: '',
  });

  const clearError = (field: keyof FormErrors) => {
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: FormErrors = {
      type: '',
      customTypeName: '',
      images: '',
      startTime: '',
      endTime: '',
      days: '',
      location: '',
      mood: '',
      allowExternal: '',
      guestFee: '',
      externalFee: '',
      description: '',
    };

    const {
      type,
      customTypeName,
      images,
      startTime,
      endTime,
      days,
      location,
      mood,
      allowExternal,
      guestFee,
      externalFee,
      description,
    } = partyData;

    if (!type || type.trim() === '') {
      newErrors.type = '파티 종류를 선택해주세요';
      isValid = false;
    } else if (type === '기타') {
      if (!customTypeName || customTypeName.trim() === '') {
        newErrors.customTypeName = '기타 파티명을 입력해주세요';
        isValid = false;
      } else if (customTypeName.length < 1 || customTypeName.length > 20) {
        newErrors.customTypeName = '파티명은 1~20자 사이로 입력해주세요';
        isValid = false;
      }
    }

    if (!images || images.length === 0) {
      newErrors.images = '파티 사진을 최소 1장 이상 등록해주세요';
      isValid = false;
    } else if (images.length > 10) {
      newErrors.images = '사진은 최대 10장까지 등록할 수 있습니다';
      isValid = false;
    }

    if (!startTime) {
      newErrors.startTime = '시작 시간을 입력해주세요';
      isValid = false;
    }
    if (!endTime) {
      newErrors.endTime = '종료 시간을 입력해주세요';
      isValid = false;
    }
    if (startTime && endTime && startTime >= endTime) {
      newErrors.endTime = '종료 시간은 시작 시간보다 늦어야 합니다';
      isValid = false;
    }

    if (!days || days.length === 0) {
      newErrors.days = '파티 진행 요일을 선택해주세요';
      isValid = false;
    }

    if (!location || location.trim() === '') {
      newErrors.location = '파티 장소를 입력해주세요';
      isValid = false;
    } else if (location.length < 1 || location.length > 20) {
      newErrors.location = '파티 장소는 1~20자 사이로 입력해주세요';
      isValid = false;
    }

    if (!mood || mood.trim() === '') {
      newErrors.mood = '파티 분위기를 입력해주세요';
      isValid = false;
    } else if (mood.length < 1 || mood.length > 20) {
      newErrors.mood = '파티 분위기는 1~20자 사이로 입력해주세요';
      isValid = false;
    }

    if (allowExternal === null) {
      newErrors.allowExternal = '외부인 참여 가능 여부를 선택해주세요';
      isValid = false;
    }

    if (!guestFee || guestFee.trim() === '') {
      newErrors.guestFee = '숙박객 파티비를 입력해주세요';
      isValid = false;
    }
    if (allowExternal && (!externalFee || externalFee.trim() === '')) {
      newErrors.externalFee = '외부인 파티비를 입력해주세요';
      isValid = false;
    }

    if (!description || description.trim() === '') {
      newErrors.description = '파티 설명을 입력해주세요';
      isValid = false;
    } else if (description.length < 10) {
      newErrors.description = '파티 설명은 최소 10자 이상 입력해주세요';
      isValid = false;
    } else if (description.length > 500) {
      newErrors.description = '파티 설명은 500자 이내로 입력해주세요';
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
