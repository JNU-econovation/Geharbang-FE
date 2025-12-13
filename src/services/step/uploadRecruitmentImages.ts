import { File } from '@/src/types/File';
import { axiosPrivate } from '../api/customAxios';

export const uploadRecruitmentImages = async (
  files: File[],
): Promise<string[]> => {
  if (files.length === 0) {
    return [];
  }

  const formData = new FormData();

  files.forEach((file) => {
    formData.append('images', file);
  });

  const response = await axiosPrivate.post('/api/v1/images', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data.imageUrl;
};
