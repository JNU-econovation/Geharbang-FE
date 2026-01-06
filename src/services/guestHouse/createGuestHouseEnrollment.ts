import { axiosPrivate } from '../api/customAxios';
import {
  GuestHouseEnrollRequest,
  GuestHouseEnrollResponse,
} from '@/src/types/api/guestHouse/GuestHouseEnrollRequest';

/**
 * 게스트하우스 등록
 * POST /api/v1/guest-houses
 *
 * @param data - 게스트하우스 등록 데이터
 * @returns 생성된 게스트하우스 ID
 * @throws 네트워크 에러, 서버 에러 등
 */
export const createGuestHouseEnrollment = async (
  data: GuestHouseEnrollRequest
): Promise<number> => {
  try {
    console.log('===== 게스트하우스 등록 요청 데이터 =====');
    console.log(JSON.stringify(data, null, 2));

    const response = await axiosPrivate.post<GuestHouseEnrollResponse>(
      '/api/v1/guest-houses',
      data
    );

    console.log('===== 게스트하우스 등록 성공 =====');
    console.log('guestHouseId:', response.data.guestHouseId);

    return response.data.guestHouseId;
  } catch (error: any) {
    console.error('===== 게스트하우스 등록 실패 =====');
    console.error('Error:', error);
    console.error('Response:', error.response?.data);
    console.error('Status:', error.response?.status);
    console.error('Message:', error.message);
    throw error;
  }
};
