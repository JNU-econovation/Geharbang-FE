import { createStaffRecruitment } from '@/src/services/step/createStaffRecruitment';
import { StaffRecruitmentRequest } from '@/src/types/models/stepRecruitment/StaffRecruitmentRequest';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Alert } from 'react-native';

export const useCreateStaffRecruitment = () => {
  return useMutation<number, Error, StaffRecruitmentRequest>({
    mutationFn: createStaffRecruitment,
    onError: (err) => {
      if (axios.isAxiosError(err) && err.response?.status === 403) {
        Alert.alert('인증 필요', '스텝 공고 등록은 인증서 심사가 완료된 사장님만 가능합니다.');
        return;
      }
      console.error('공고 등록 실패:', err);
    },
  });
};
