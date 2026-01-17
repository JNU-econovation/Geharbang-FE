import { useQuery } from '@tanstack/react-query';

import {
  Certificate,
  getCertificates,
} from '@/src/services/operator/getCertificates';

/**
 * 인증서 목록 조회 훅
 */
export const useCertificates = () => {
  const query = useQuery<Certificate[], Error>({
    queryKey: ['certificates'],
    queryFn: getCertificates,
  });

  return query;
};
