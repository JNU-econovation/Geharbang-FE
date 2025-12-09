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

/**
 * 다중 항목 배열 검증
 * @param items - 검증할 문자열 배열
 * @returns [boolean, string | null] - [검증 성공 여부, 오류 메시지 (없으면 null)]
 */
export const validateRepeatableItems = (
  items: string[],
  maxLength: number
): [boolean, string] => {
  for (const item of items) {
    // 1. 빈 항목 검증
    if (item.trim().length === 0) {
      const errorMessage = "내용을 입력하거나 빈 항목을 삭제해주세요";
      return [false, errorMessage];
    }

    // 2. 글자수 제한 검증
    if (item.length > maxLength) {
      const errorMessage = `내용을 ${maxLength}자 이내로 입력해주세요`;
      return [false, errorMessage];
    }
  }

  return [true, ""];
};
