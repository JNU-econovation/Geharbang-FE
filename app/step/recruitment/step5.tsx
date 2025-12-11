import QuestionSection from '@/app/step/recruitment/_components/QuestionSection';
import RecruitmentStepLayout from '@/app/step/recruitment/_components/RecruitmentStepLayout';
import Flex from '@/src/components/layout/Flex';
import Button from '@/src/components/ui/Button/Button';
import { useCreateStaffRecruitment } from '@/src/hooks/stepRecruitment/useCreateStaffRecruitment';
import { useUploadRecruitmentImages } from '@/src/hooks/stepRecruitment/useUploadRecruitmentImages';
import { useStepRecruitmentStore } from '@/src/stores/stepRecruitment/useStepRecruitmentStore';
import { createFinalRequest } from '@/src/utils/stepRecruitment/transformStoreToApi';
import { router } from 'expo-router';
import React, { useRef } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';

export default function RecruitmentStep5() {
  const storeData = useStepRecruitmentStore();
  const {
    step3Data,
    step5Data,
    addStep5Question,
    removeStep5Question,
    updateStep5Question,
    setStep3Update,
  } = storeData;
  const { questions } = step5Data;
  const scrollViewRef = useRef<ScrollView>(null);

  const uploadImagesMutation = useUploadRecruitmentImages();
  const createRecruitmentMutation = useCreateStaffRecruitment();

  const addQuestion = () => {
    if (questions.length >= 5) {
      Alert.alert('알림', '최대 5개까지만 등록할 수 있습니다.');
      return;
    }
    const newQuestion = {
      id: Date.now().toString(),
      text: '',
    };
    addStep5Question(newQuestion);

    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const deleteQuestion = (id: string) => {
    removeStep5Question(id);
  };

  const updateQuestion = (id: string, text: string) => {
    updateStep5Question(id, text);
  };

  const canAddMore = questions.length < 5;

  const handleSubmit = async () => {
    router.replace({
      pathname: '/step/recruitment/result' as any,
      params: { status: 'pending' },
    });

    try {
      let mainImageUrls: string[] = [];
      if (step3Data.mainImageFiles.length > 0) {
        mainImageUrls = await uploadImagesMutation.mutateAsync(
          step3Data.mainImageFiles,
        );
        setStep3Update('mainImageUrls', mainImageUrls);
      } else {
        mainImageUrls = step3Data.mainImageUrls;
      }

      let introImageUrls: string[] = [];
      if (step3Data.introImageFiles.length > 0) {
        introImageUrls = await uploadImagesMutation.mutateAsync(
          step3Data.introImageFiles,
        );
        setStep3Update('introImageUrls', introImageUrls);
      } else {
        introImageUrls = step3Data.introImageUrls;
      }

      const updatedStep3Data = {
        ...step3Data,
        mainImageUrls,
        introImageUrls,
      };

      const requestData = createFinalRequest(
        {
          step1Data: storeData.step1Data,
          step2Data: storeData.step2Data,
          step3Data: updatedStep3Data,
          step4Data: storeData.step4Data,
          step5Data: storeData.step5Data,
        },
        mainImageUrls,
      );

      console.log('공고 등록 요청 데이터:', requestData);

      await createRecruitmentMutation.mutateAsync(requestData);

      router.setParams({ status: 'success' });
    } catch (error) {
      console.error('공고 등록 실패:', error);

      router.setParams({ status: 'error' });
    }
  };

  return (
    <RecruitmentStepLayout currentStep={5} stepTitle="추가 질문">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          ref={scrollViewRef}
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="pt-4 px-3">
            <Flex justify="start" items="center" gap={24}>
              <QuestionSection
                questions={questions}
                onAddQuestion={addQuestion}
                onDeleteQuestion={deleteQuestion}
                onUpdateQuestion={updateQuestion}
                canAddMore={canAddMore}
              />

              <Button
                variant="primary"
                width={370}
                height={50}
                textColor="white"
                content="공고 등록하기"
                onPress={handleSubmit}
              />
            </Flex>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </RecruitmentStepLayout>
  );
}
