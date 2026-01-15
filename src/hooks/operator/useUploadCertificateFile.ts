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
      console.error('파일 업로드 실패:', error);
      Alert.alert('오류', '파일 업로드에 실패했습니다.');
    },
  });
};
