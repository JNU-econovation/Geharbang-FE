import { axiosPrivate } from '../api/customAxios';

export interface CertificateDetail {
  guestHouseName: string;
  ownerName: string;
  phoneNumber: string;
  certificateType: string;
  fileUrl: string;
  fileName: string;
}

/**
 * 사장님 인증 신청 상세 조회
 * @param id - certificateId
 * @returns 인증서 상세 정보
 */
export const getCertificateDetail = async (
  id: string,
): Promise<CertificateDetail> => {
  const response = await axiosPrivate.get<CertificateDetail>(
    `/api/v1/certificate/${id}`,
  );

  return response.data;
};
