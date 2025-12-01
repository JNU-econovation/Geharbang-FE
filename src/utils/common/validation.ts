/**
 * 전화번호 형식 검증
 * @param phone - 검증할 전화번호 문자열
 * @returns 형식: XXX-XXX-XXXX 또는 XXX-XXXX-XXXX
 */
export const validatePhoneNumber = (phone: string): boolean => {
  return /^\d{3}-\d{3,4}-\d{4}$/.test(phone);
};

/**
 * 이메일 형식 검증
 * @param email - 검증할 이메일 문자열
 * @returns 유효한 이메일 형식 여부
 */
export const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
