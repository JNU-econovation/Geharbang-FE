import { useCreateStaffRecruitment } from '@/src/hooks/stepRecruitment/useCreateStaffRecruitment';
import { useUploadRecruitmentImages } from '@/src/hooks/stepRecruitment/useUploadRecruitmentImages';
import { useStepRecruitmentStore } from '@/src/stores/stepRecruitment/useStepRecruitmentStore';
import { transformStoreToApi } from '@/src/utils/stepRecruitment/transformStoreToApi';
import { router } from 'expo-router';

export const useHandleStepRecruitmentSubmit = () => {
  const storeData = useStepRecruitmentStore();
  const { step3Data, setStep3Update } = storeData;

  const uploadImagesMutation = useUploadRecruitmentImages();
  const createRecruitmentMutation = useCreateStaffRecruitment();

  const uploadImages = async () => {
    const mainImageUrls =
      step3Data.mainImageFiles.length > 0
        ? await uploadImagesMutation.mutateAsync(step3Data.mainImageFiles)
        : step3Data.mainImageUrls;

    const introImageUrls =
      step3Data.introImageFiles.length > 0
        ? await uploadImagesMutation.mutateAsync(step3Data.introImageFiles)
        : step3Data.introImageUrls;

    if (step3Data.mainImageFiles.length > 0) {
      setStep3Update('mainImageUrls', mainImageUrls);
    }
    if (step3Data.introImageFiles.length > 0) {
      setStep3Update('introImageUrls', introImageUrls);
    }

    return { mainImageUrls, introImageUrls };
  };

  const createRequestData = (
    mainImageUrls: string[],
    introImageUrls: string[],
  ) => {
    const updatedStep3Data = {
      ...step3Data,
      mainImageUrls,
      introImageUrls,
    };

    return transformStoreToApi({
      step1Data: storeData.step1Data,
      step2Data: storeData.step2Data,
      step3Data: updatedStep3Data,
      step4Data: storeData.step4Data,
      step5Data: storeData.step5Data,
    });
  };

  const handleSubmit = async () => {
    router.replace({
      pathname: '/step/recruitment/result' as any,
      params: { status: 'pending' },
    });

    try {
      const { mainImageUrls, introImageUrls } = await uploadImages();
      const requestData = createRequestData(mainImageUrls, introImageUrls);
      await createRecruitmentMutation.mutateAsync(requestData);
      router.setParams({ status: 'success' });
    } catch (error) {
      console.error('공고 등록 실패:', error);
      router.setParams({ status: 'error' });
    }
  };

  return {
    handleSubmit,
    isSubmitting:
      uploadImagesMutation.isPending || createRecruitmentMutation.isPending,
  };
};
