import { useMutation } from '@tanstack/react-query';
import { Alert } from 'react-native';

import {
  submitCertificate,
  SubmitCertificateData,
} from '@/src/services/operator/submitCertificate';

/**
 * 인증서 제출 훅
 */
export const useSubmitCertificate = () => {
  return useMutation<void, Error, SubmitCertificateData>({
    mutationFn: submitCertificate,
    onError: (error) => {
      console.error('========== 인증서 제출 실패 ==========');
      console.error('에러 메시지:', error.message);
      console.error('에러 스택:', error.stack);
      console.error('에러 전체 객체:', JSON.stringify(error, null, 2));
      console.error('====================================');
      Alert.alert('오류', '인증서 제출에 실패했습니다.');
    },
  });
};
