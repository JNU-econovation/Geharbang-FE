import QuestionSection from '@/app/step/recruitment/_components/QuestionSection';
import RecruitmentStepLayout from '@/app/step/recruitment/_components/RecruitmentStepLayout';
import Flex from '@/src/components/layout/Flex';
import Button from '@/src/components/ui/Button/Button';
import { useCreateStaffRecruitment } from '@/src/hooks/stepRecruitment/useCreateStaffRecruitment';
import { useUploadRecruitmentImages } from '@/src/hooks/stepRecruitment/useUploadRecruitmentImages';
import { useStepRecruitmentStore } from '@/src/stores/stepRecruitment/useStepRecruitmentStore';
import { getApiErrorMessage } from '@/src/utils/api/errorHandler';
import { createFinalRequest } from '@/src/utils/stepRecruitment/transformStoreToApi';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
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
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

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

      // 4. 공고 생성 API 호출
      const recruitmentId = await createRecruitmentMutation.mutateAsync(
        requestData,
      );

      Alert.alert('공고 등록 완료', '스텝 공고가 성공적으로 등록되었습니다.', [
        {
          text: '확인',
          onPress: () => {
            router.replace('/(tabs)');
          },
        },
      ]);
    } catch (error) {
      const errorMessage = getApiErrorMessage(error);
      Alert.alert(
        '공고 등록 실패',
        errorMessage || '공고 등록 중 오류가 발생했습니다.',
      );
    } finally {
      setIsSubmitting(false);
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
                content={isSubmitting ? '등록 중...' : '공고 등록하기'}
                onPress={handleSubmit}
                disabled={isSubmitting}
              />
            </Flex>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </RecruitmentStepLayout>
  );
}
