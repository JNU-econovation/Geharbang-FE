import { axiosPrivate } from '../api/customAxios';

export interface SubmitCertificateData {
  certificateType: string;
  guestHouseName: string;
  ownerName: string;
  phoneNumber: string;
  fileUrl: string;
}

/**
 * 사장님 인증서 제출
 * @param data - certificateType, guestHouseName, ownerName, phoneNumber, fileUrl
 * @returns void (성공 시 200 status code)
 */
export const submitCertificate = async (
  data: SubmitCertificateData,
): Promise<void> => {
  const response = await axiosPrivate.post('/api/v1/certificate/owner', data);
  return response.data;
};
