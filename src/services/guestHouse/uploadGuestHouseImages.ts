import { File } from '@/src/types/File';
import { axiosPrivate } from '../api/customAxios';

/**
 * 게스트하우스 이미지 업로드
 * POST /api/v1/images
 *
 * @param files - 업로드할 이미지 파일 배열
 * @returns 업로드된 이미지 URL 배열
 * @throws 네트워크 에러, 서버 에러 등
 */
export const uploadGuestHouseImages = async (
  files: File[]
): Promise<string[]> => {
  if (files.length === 0) {
    return [];
  }

  const formData = new FormData();

  files.forEach((file) => {
    formData.append('images', file as unknown as Blob);
  });

  const response = await axiosPrivate.post<{ imageUrl: string[] }>(
    '/api/v1/images',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return response.data.imageUrl;
};
