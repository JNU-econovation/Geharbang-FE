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
  const response = await axiosPrivate.post<GuestHouseEnrollResponse>(
    '/api/v1/guest-houses',
    data
  );
  return response.data.guestHouseId;
};
