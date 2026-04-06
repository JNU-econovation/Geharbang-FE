import { File } from '@/src/types/File';

export type DocumentType = 'business' | 'tourism';

export interface OperatorVerifyData {
  documentType: DocumentType | null;
  guestHouseName: string;
  representativeName: string;
  phoneNumber: string;
  uploadedFile: File | null;
}

export interface OperatorVerifyErrors {
  documentType: string;
  guestHouseName: string;
  representativeName: string;
  phoneNumber: string;
  uploadedFile: string;
}

/**
 * 전화번호 형식 검증 (휴대폰 또는 일반 전화번호)
 * @param phone - 검증할 전화번호 문자열
 * @returns 형식: 010-XXXX-XXXX 또는 0XX-XXX-XXXX
 */
const validatePhoneNumber = (phone: string): boolean => {
  // 휴대폰: 010-1234-5678
  const mobilePattern = /^010-\d{4}-\d{4}$/;
  // 일반 전화: 064-123-4567 (지역번호-국번-번호)
  const landlinePattern = /^0\d{1,2}-\d{3,4}-\d{4}$/;

  return mobilePattern.test(phone) || landlinePattern.test(phone);
};

/**
 * 게스트하우스 이름 검증 (한글, 영문, 숫자, 공백만 허용)
 * @param name - 검증할 이름 문자열
 * @returns 허용된 문자만 포함 여부
 */
const validateGuestHouseName = (name: string): boolean => {
  return /^[가-힣a-zA-Z0-9\s]+$/.test(name);
};

/**
 * 대표자명 검증 (한글, 영문, 공백만 허용)
 * @param name - 검증할 이름 문자열
 * @returns 허용된 문자만 포함 여부
 */
const validateRepresentativeName = (name: string): boolean => {
  return /^[가-힣a-zA-Z\s]+$/.test(name);
};

/**
 * 운영자 인증 폼 유효성 검사
 * @param data - 검증할 운영자 인증 데이터
 * @returns { isValid: boolean, errors: OperatorVerifyErrors }
 */
export const validateOperatorVerify = (
  data: OperatorVerifyData,
): { isValid: boolean; errors: OperatorVerifyErrors } => {
  const errors: OperatorVerifyErrors = {
    documentType: '',
    guestHouseName: '',
    representativeName: '',
    phoneNumber: '',
    uploadedFile: '',
  };

  let isValid = true;

  if (!data.documentType) {
    errors.documentType = '증빙 서류 종류를 선택해주세요';
    isValid = false;
  }

  if (!data.uploadedFile) {
    errors.uploadedFile = '증빙 서류 파일을 업로드해주세요';
    isValid = false;
  }

  if (!data.guestHouseName.trim()) {
    errors.guestHouseName = '게스트하우스 이름을 입력해주세요';
    isValid = false;
  } else if (
    data.guestHouseName.length < 2 ||
    data.guestHouseName.length > 30
  ) {
    errors.guestHouseName = '게스트하우스 이름은 2~30자 사이로 입력해주세요';
    isValid = false;
  } else if (!validateGuestHouseName(data.guestHouseName)) {
    errors.guestHouseName = '한글, 영문, 숫자만 입력할 수 있습니다';
    isValid = false;
  }

  if (!data.representativeName.trim()) {
    errors.representativeName = '대표자명을 입력해주세요';
    isValid = false;
  } else if (
    data.representativeName.length < 2 ||
    data.representativeName.length > 20
  ) {
    errors.representativeName = '대표자명은 2~20자 사이로 입력해주세요';
    isValid = false;
  } else if (!validateRepresentativeName(data.representativeName)) {
    errors.representativeName = '대표자명에는 문자만 입력할 수 있습니다';
    isValid = false;
  }

  if (!data.phoneNumber.trim()) {
    errors.phoneNumber = '연락처를 입력해주세요';
    isValid = false;
  } else if (!validatePhoneNumber(data.phoneNumber)) {
    errors.phoneNumber = '올바른 전화번호 형식으로 입력해주세요';
    isValid = false;
  }

  return { isValid, errors };
};
