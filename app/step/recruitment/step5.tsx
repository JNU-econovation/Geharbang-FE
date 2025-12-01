import RecruitmentStepLayout from '@/app/step/recruitment/_components/RecruitmentStepLayout';
import QuestionSection from '@/app/step/recruitment/_components/QuestionSection';
import Flex from '@/src/components/layout/Flex';
import Button from '@/src/components/ui/Button/Button';
import { useQuestions } from '@/src/hooks/recruitment/useQuestions';
import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';

export default function RecruitmentStep5() {
  const {
    questions,
    addQuestion,
    deleteQuestion,
    updateQuestion,
    canAddMore,
    scrollViewRef,
  } = useQuestions();

  const handleSubmit = () => {
    console.log('제출로직', questions);
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
