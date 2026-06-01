import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Alert } from 'react-native';

import { Certificate } from '@/src/services/operator/getCertificates';
import { updateCertificateStatus } from '@/src/services/operator/updateCertificateStatus';

interface UpdateCertificateStatusParams {
  id: string;
  approved: boolean;
}

interface UpdateCertificateStatusContext {
  previousCertificates?: Certificate[];
}

/**
 * 인증서 승인/거부 훅 (Optimistic Update)
 */
export const useUpdateCertificateStatus = () => {
  const queryClient = useQueryClient();

  return useMutation<
    void,
    Error,
    UpdateCertificateStatusParams,
    UpdateCertificateStatusContext
  >({
    mutationFn: ({ id, approved }) => updateCertificateStatus(id, { approved }),

    onMutate: async ({ id, approved }) => {
      await queryClient.cancelQueries({ queryKey: ['certificates'] });

      const previousCertificates = queryClient.getQueryData<Certificate[]>([
        'certificates',
      ]);

      const updatedData = queryClient.setQueryData<Certificate[]>(
        ['certificates'],
        (old) => {
          if (!old) return [];

          return old.map((cert) =>
            cert.id === Number(id)
              ? {
                  ...cert,
                  status: approved ? '승인_완료' : '거부됨',
              }
              : cert,
          );
        },
      );

      return { previousCertificates };
    },

    onSuccess: (_, variables) => {
      const message = variables.approved
        ? '승인되었습니다.'
        : '거부되었습니다.';
      Alert.alert('성공', message);
    },

    onError: (error, _, context) => {
      if (context?.previousCertificates) {
        queryClient.setQueryData(
          ['certificates'],
          context.previousCertificates,
        );
      }

      console.error('========== 상태 업데이트 실패 ==========');
      console.error('에러:', error);
      console.error('에러 메시지:', error.message);
      console.error('====================================');
      Alert.alert('오류', '상태 업데이트에 실패했습니다.');
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['certificates'] });
    },
  });
};
