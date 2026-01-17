import { axiosPrivate } from '../api/customAxios';

export interface UpdateCertificateStatusData {
  approved: boolean;
}

/**
 * 사장님 인증 승인/거부
 * @param id - certificateId
 * @param data - approved (true: 승인, false: 거부)
 * @returns void (성공 시 200 status code)
 */
export const updateCertificateStatus = async (
  id: string,
  data: UpdateCertificateStatusData,
): Promise<void> => {
  await axiosPrivate.post(`/api/v1/certificate/${id}`, data);
};
