import QuestionSection from '@/app/step/recruitment/_components/QuestionSection';
import RecruitmentStepLayout from '@/app/step/recruitment/_components/RecruitmentStepLayout';
import Flex from '@/src/components/layout/Flex';
import Button from '@/src/components/ui/Button/Button';
import { useHandleStepRecruitmentSubmit } from '@/src/hooks/stepRecruitment/useHandleStepRecruitmentSubmit';
import { useStepRecruitmentStore } from '@/src/stores/stepRecruitment/useStepRecruitmentStore';
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
    step5Data,
    addStep5Question,
    removeStep5Question,
    updateStep5Question,
  } = storeData;
  const { questions } = step5Data;
  const scrollViewRef = useRef<ScrollView>(null);

  const { handleSubmit } = useHandleStepRecruitmentSubmit();

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
