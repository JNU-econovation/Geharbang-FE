import { uploadRecruitmentImages } from '@/src/services/step/uploadRecruitmentImages';
import { File } from '@/src/types/File';
import { useMutation } from '@tanstack/react-query';

export const useUploadRecruitmentImages = () => {
  return useMutation<string[], Error, File[]>({
    mutationFn: uploadRecruitmentImages,
    onError: (err) => {
      console.error('이미지 업로드 실패:', err);
    },
  });
};
