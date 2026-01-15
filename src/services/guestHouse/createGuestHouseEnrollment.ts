import {
  GuestHouseEnrollRequest,
  GuestHouseEnrollResponse,
} from '@/src/types/api/guestHouse/GuestHouseEnrollRequest';
import { axiosPrivate } from '../api/customAxios';

/**
 * 게스트하우스 등록
 * POST /api/v1/guest-houses
 *
 * @param data - 게스트하우스 등록 데이터
 * @returns 생성된 게스트하우스 ID
 * @throws 네트워크 에러, 서버 에러 등
 */
export const createGuestHouseEnrollment = async (
  data: GuestHouseEnrollRequest,
): Promise<number> => {
  try {
    const response = await axiosPrivate.post<GuestHouseEnrollResponse>(
      '/api/v1/guest-houses',
      data,
    );

    return response.data.guestHouseId;
  } catch (error) {
    console.error('===== 게스트하우스 등록 실패 =====');
    console.error('Error:', error);
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as {
        response?: { data?: unknown; status?: number };
        message?: string;
      };
      console.error('Response:', axiosError.response?.data);
      console.error('Status:', axiosError.response?.status);
      console.error('Message:', axiosError.message);
    }
    throw error;
  }
};
