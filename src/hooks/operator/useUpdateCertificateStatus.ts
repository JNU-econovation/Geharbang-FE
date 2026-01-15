import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Alert } from 'react-native';

import { updateCertificateStatus } from '@/src/services/operator/updateCertificateStatus';

interface UpdateCertificateStatusParams {
  id: string;
  approved: boolean;
}

/**
 * 인증서 승인/거부 훅
 */
export const useUpdateCertificateStatus = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, UpdateCertificateStatusParams>({
    mutationFn: ({ id, approved }) => updateCertificateStatus(id, { approved }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['certificates'] });

      const message = variables.approved
        ? '승인되었습니다.'
        : '거부되었습니다.';
      Alert.alert('성공', message);
    },
    onError: (error) => {
      console.error('상태 업데이트 실패:', error);
      Alert.alert('오류', '상태 업데이트에 실패했습니다.');
    },
  });
};
