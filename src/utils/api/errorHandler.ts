import axios from 'axios';

/**
 * API 에러를 사용자 친화적인 메시지로 변환합니다.
 * @param error - catch 블록에서 받은 에러 객체
 * @returns 사용자에게 표시할 에러 메시지
 */

export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;

      if (data?.message) {
        return `[${status}] ${data.message}`;
      }
      if (data?.error) {
        return `[${status}] ${data.error}`;
      }
      return `[${status}] 서버 오류가 발생했습니다.`;
    }

    if (error.request) {
      return '서버로부터 응답이 없습니다. 네트워크를 확인해주세요.';
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return '데이터를 불러오는데 실패했습니다.';
}
