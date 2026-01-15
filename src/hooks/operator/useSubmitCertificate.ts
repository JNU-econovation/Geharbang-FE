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
      console.error('인증서 제출 실패:', error);
      Alert.alert('오류', '인증서 제출에 실패했습니다.');
    },
  });
};
