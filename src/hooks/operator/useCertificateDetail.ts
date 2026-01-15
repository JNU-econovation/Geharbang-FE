import { useQuery } from '@tanstack/react-query';

import {
  getCertificateDetail,
  CertificateDetail,
} from '@/src/services/operator/getCertificateDetail';

/**
 * 인증서 상세 조회 훅
 * @param id - certificateId
 */
export const useCertificateDetail = (id: string) => {
  return useQuery<CertificateDetail, Error>({
    queryKey: ['certificate', id],
    queryFn: () => getCertificateDetail(id),
    enabled: !!id,
  });
};
