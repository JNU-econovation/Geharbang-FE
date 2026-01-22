import { axiosPrivate } from '../api/customAxios';

export interface Certificate {
  id: number;
  guestHouseName: string;
  ownerName: string;
  certificateType: string;
  status: string;
  createdAt: string;
}

export interface GetCertificatesResponse {
  certificates: Certificate[];
}

/**
 * 사장님 인증 신청 목록 조회
 * @returns certificates 배열
 */
export const getCertificates = async (): Promise<Certificate[]> => {
  const response = await axiosPrivate.get<GetCertificatesResponse>(
    '/api/v1/certificate',
  );

  return response.data.certificates;
};
