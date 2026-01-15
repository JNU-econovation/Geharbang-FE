import { useQuery } from '@tanstack/react-query';

import {
  getCertificates,
  Certificate,
} from '@/src/services/operator/getCertificates';

/**
 * 인증서 목록 조회 훅
 */
export const useCertificates = () => {
  return useQuery<Certificate[], Error>({
    queryKey: ['certificates'],
    queryFn: getCertificates,
  });
};
