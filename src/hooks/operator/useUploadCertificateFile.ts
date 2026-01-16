import { useMutation } from '@tanstack/react-query';
import { Alert } from 'react-native';

import {
  uploadCertificateFile,
  UploadCertificateFileParams,
  UploadCertificateFileResponse,
} from '@/src/services/operator/uploadCertificateFile';

/**
 * 인증서 파일 업로드 훅
 */
export const useUploadCertificateFile = () => {
  return useMutation<
    UploadCertificateFileResponse,
    Error,
    UploadCertificateFileParams
  >({
    mutationFn: uploadCertificateFile,
    onError: (error) => {
      console.error('========== 파일 업로드 실패 ==========');
      console.error('에러 메시지:', error.message);
      console.error('에러 스택:', error.stack);
      console.error('에러 전체 객체:', JSON.stringify(error, null, 2));
      console.error('====================================');
      Alert.alert('오류', '파일 업로드에 실패했습니다.');
    },
  });
};
