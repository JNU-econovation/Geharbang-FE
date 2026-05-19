import { useCreateStaffRecruitment } from '@/src/hooks/stepRecruitment/useCreateStaffRecruitment';
import { useUploadRecruitmentImages } from '@/src/hooks/stepRecruitment/useUploadRecruitmentImages';
import { updateStaffRecruitment } from '@/src/services/step/updateStaffRecruitment';
import { useStepRecruitmentStore } from '@/src/stores/stepRecruitment/useStepRecruitmentStore';
import { transformStoreToApi } from '@/src/utils/stepRecruitment/transformStoreToApi';
import { router } from 'expo-router';

export const useHandleStepRecruitmentSubmit = () => {
  const storeData = useStepRecruitmentStore();
  const { step3Data, setStep3Update, editingId, existingQuestions } = storeData;

  const uploadImagesMutation = useUploadRecruitmentImages();
  const createRecruitmentMutation = useCreateStaffRecruitment();

  const uploadImages = async () => {
    const uploadedMainUrls =
      step3Data.mainImageFiles.length > 0
        ? await uploadImagesMutation.mutateAsync(step3Data.mainImageFiles)
        : [];

    const uploadedIntroUrls =
      step3Data.introImageFiles.length > 0
        ? await uploadImagesMutation.mutateAsync(step3Data.introImageFiles)
        : [];

    const mainImageUrls = [...step3Data.mainImageUrls, ...uploadedMainUrls];
    const introImageUrls = [...step3Data.introImageUrls, ...uploadedIntroUrls];

    if (uploadedMainUrls.length > 0) {
      setStep3Update('mainImageUrls', mainImageUrls);
    }
    if (uploadedIntroUrls.length > 0) {
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

    const mergedStep5Data = editingId
      ? {
          questions: [
            ...existingQuestions.map((q) => ({ id: q.id, text: q.text })),
            ...storeData.step5Data.questions,
          ],
        }
      : storeData.step5Data;

    return transformStoreToApi({
      step1Data: storeData.step1Data,
      step2Data: storeData.step2Data,
      step3Data: updatedStep3Data,
      step4Data: storeData.step4Data,
      step5Data: mergedStep5Data,
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

      if (editingId) {
        await updateStaffRecruitment(editingId, requestData);
        router.setParams({ status: 'success', recruitmentId: editingId.toString() });
      } else {
        const staffRecruitmentId = await createRecruitmentMutation.mutateAsync(requestData);
        router.setParams({ status: 'success', recruitmentId: staffRecruitmentId.toString() });
      }
    } catch (error) {
      console.error('공고 등록/수정 실패:', error);
      router.setParams({ status: 'error' });
    }
  };

  return {
    handleSubmit,
    isSubmitting:
      uploadImagesMutation.isPending || createRecruitmentMutation.isPending,
  };
};
