import { axiosPrivate } from '../api/customAxios';
import { File } from '@/src/types/File';

export interface UploadCertificateFileParams {
  file: File;
  fileType: string;
  fileName: string;
}

export interface UploadCertificateFileResponse {
  fileUrl: string;
}

/**
 * 인증서 파일 업로드
 * @param params - file, fileType, fileName
 * @returns fileUrl
 */
export const uploadCertificateFile = async (
  params: UploadCertificateFileParams,
): Promise<UploadCertificateFileResponse> => {
  const formData = new FormData();
  formData.append('file', params.file as unknown as Blob);
  formData.append('fileType', params.fileType);
  formData.append('fileName', params.fileName);

  const response = await axiosPrivate.post<UploadCertificateFileResponse>(
    '/api/v1/certificate/file-upload',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return response.data;
};
