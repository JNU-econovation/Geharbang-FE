import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';

import CustomSafeAreaView from '@/src/components/layout/CustomSafeAreaView';
import DismissKeyboardView from '@/src/components/layout/DismissKeyboardView';
import BackArrowHeader from '@/src/components/ui/BackArrowHeader';
import Button from '@/src/components/ui/Button/Button';
import FormField from '@/src/components/ui/Form/FormField';
import TextInput from '@/src/components/ui/TextInput';
import TextSize from '@/src/components/ui/TextSize';
import { useHandleSubmit } from '@/src/hooks/stepApply/useHandleSubmit';
import { useOwnerQuestions } from '@/src/hooks/stepApply/useOwnerQuestions';
import { useStepApplyFormValidation } from '@/src/hooks/stepApply/useStepApplyFormValidation';
import { COLORS } from '@/src/utils/constants/colors';
import SelectedApplication from './_components/SelectedApplication';
import TargetPostingInfo from './_components/TargetPostingInfo';

export default function staffApply() {
  const params = useLocalSearchParams();
  const { id } = params;
  const recruitmentId = typeof id === 'string' ? parseInt(id, 10) : null;

  if (recruitmentId === null) {
    return (
      <View className="items-center pt-32">
        <TextSize size={16} content="잘못된 접근입니다." />
      </View>
    );
  }

  const { data, isLoading, isError, refetch } =
    useOwnerQuestions(recruitmentId);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});

  const { errors, clearError, validateForm } = useStepApplyFormValidation({
    questions: data?.questions,
    answers,
  });

  const handleAnswerChange = (questionId: number, text: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: text,
    }));
    clearError(questionId);
  };

  const handleSubmit = useHandleSubmit({
    recruitmentId,
    questions: data?.questions,
    answers,
    validateForm,
  });

  return (
    <DismissKeyboardView>
      <CustomSafeAreaView pageColor="bg-white">
        <View className="p-3">
          <BackArrowHeader content="지원하기" />
        </View>
        {isLoading ? (
          <View className="pt-2 h-64">
            <ActivityIndicator size={80} color={COLORS.PRIMARY.BLUE} />
          </View>
        ) : isError ? (
          <View className="py-8 items-center">
            <TextSize
              size={18}
              color={COLORS.GRAY.TEXT}
              content="잠시 오류가 발생했어요"
            />
            <View className="pt-4" />
            <Button
              variant="gray"
              height={56}
              width={320}
              content="다시 시도"
              textColor="#000"
              onPress={() => refetch()}
            />
          </View>
        ) : (
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={0}
          >
            <ScrollView>
              <View className="w-full">
                {data?.guesthouse && <TargetPostingInfo {...data.guesthouse} />}
                {data?.profile && (
                  <SelectedApplication
                    name={data.profile.name}
                    imageUrl={data.profile.imageUrl}
                  />
                )}

                <View className="gap-4 px-4 mt-6 mb-12">
                  {data?.questions?.map((question, index) => (
                    <View key={question.questionId}>
                      <FormField
                        label={`${index + 1}. ${question.content}`}
                        required={true}
                        errorMessage={errors[question.questionId]}
                      >
                        <TextInput
                          value={answers[question.questionId] || ''}
                          onChangeText={(text) =>
                            handleAnswerChange(question.questionId, text)
                          }
                          placeholder="답변을 입력하세요..."
                          multiline={true}
                          height={120}
                          error={!!errors[question.questionId]}
                        />
                      </FormField>
                    </View>
                  ))}
                </View>

                <View className="items-center">
                  <Button
                    variant="primary"
                    width={380}
                    height={50}
                    textColor="white"
                    content="지원하기"
                    onPress={handleSubmit}
                  />
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        )}
      </CustomSafeAreaView>
    </DismissKeyboardView>
  );
}
