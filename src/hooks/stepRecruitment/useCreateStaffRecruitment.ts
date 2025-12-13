import { createStaffRecruitment } from '@/src/services/step/createStaffRecruitment';
import { StaffRecruitmentRequest } from '@/src/types/models/stepRecruitment/StaffRecruitmentRequest';
import { useMutation } from '@tanstack/react-query';

export const useCreateStaffRecruitment = () => {
  return useMutation<number, Error, StaffRecruitmentRequest>({
    mutationFn: createStaffRecruitment,
    onSuccess: (recruitmentId) => {
      console.log('공고 등록 성공, ID:', recruitmentId);
    },
    onError: (err) => {
      console.error('공고 등록 실패:', err);
    },
  });
};
