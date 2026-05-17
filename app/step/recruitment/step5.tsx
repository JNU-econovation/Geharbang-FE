import QuestionSection from "@/app/step/recruitment/_components/QuestionSection";
import RecruitmentStepLayout from "@/app/step/recruitment/_components/RecruitmentStepLayout";
import Button from "@/src/components/ui/Button/Button";
import { useHandleStepRecruitmentSubmit } from "@/src/hooks/stepRecruitment/useHandleStepRecruitmentSubmit";
import { useStep1Validation } from "@/src/hooks/stepRecruitment/useStep1Validation";
import { useStep2Validation } from "@/src/hooks/stepRecruitment/useStep2Validation";
import { useStep3Validation } from "@/src/hooks/stepRecruitment/useStep3Validation";
import { useStep4Validation } from "@/src/hooks/stepRecruitment/useStep4Validation";
import { useStep5Validation } from "@/src/hooks/stepRecruitment/useStep5Validation";
import { useStepRecruitmentStore } from "@/src/stores/stepRecruitment/useStepRecruitmentStore";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import { Href, router } from "expo-router";
import { useCallback, useRef } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function RecruitmentStep5() {
  const storeData = useStepRecruitmentStore();
  const {
    step1Data,
    step2Data,
    step3Data,
    step4Data,
    step5Data,
    addStep5Question,
    removeStep5Question,
    updateStep5Question,
    setShouldScrollToError,
    shouldScrollToError,
    editingId,
    existingQuestions,
  } = storeData;
  const { questions } = step5Data;
  const { instagram, phone, email, website, ownerMessage } = step4Data;

  const scrollViewRef = useRef<ScrollView>(null);

  const { validateForm: validateStep1 } = useStep1Validation(step1Data);
  const { validateForm: validateStep2 } = useStep2Validation(step2Data);
  const { validateForm: validateStep3 } = useStep3Validation(step3Data);
  const { validateForm: validateStep4 } = useStep4Validation({
    instagram,
    phone,
    email,
    website,
    ownerMessage,
  });
  const {
    errors: questionErrors,
    clearError: clearQuestionError,
    removeError: removeQuestionError,
    validateForm: validateStep5,
    validateField: validateQuestion,
  } = useStep5Validation(questions);

  const validateStep5Ref = useRef(validateStep5);
  validateStep5Ref.current = validateStep5;

  const validateQuestionRef = useRef(validateQuestion);
  validateQuestionRef.current = validateQuestion;

  const questionsRef = useRef(questions);
  questionsRef.current = questions;

  const { handleSubmit: submitRecruitment } = useHandleStepRecruitmentSubmit();

  const addQuestion = () => {
    if (questions.length >= 5) {
      Alert.alert("알림", "최대 5개까지만 등록할 수 있습니다.");
      return;
    }
    const newQuestion = {
      id: Date.now().toString(),
      text: "",
    };
    addStep5Question(newQuestion);

    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const deleteQuestion = (id: string) => {
    const index = questions.findIndex((q) => q.id === id);
    removeStep5Question(id);
    if (index !== -1) removeQuestionError(index);
  };

  const updateQuestion = (id: string, text: string) => {
    updateStep5Question(id, text);
    const index = questions.findIndex((q) => q.id === id);
    if (index !== -1) clearQuestionError(index);
  };

  const blurQuestion = (id: string) => {
    const index = questions.findIndex((q) => q.id === id);
    if (index !== -1) validateQuestionRef.current(index);
  };

  const focusQuestion = (id: string) => {
    const index = questions.findIndex((q) => q.id === id);
    if (index !== -1) clearQuestionError(index);
  };

  const totalQuestions = existingQuestions.length + questions.length;
  const canAddMore = totalQuestions < 5;

  useFocusEffect(
    useCallback(() => {
      if (shouldScrollToError) {
        validateStep5Ref.current();
      } else {
        questionsRef.current.forEach((_, index) => {
          validateQuestionRef.current(index);
        });
      }
    }, [shouldScrollToError])
  );

  const validateStepAndNavigate = (
    validator: () => boolean,
    route: Href,
  ): boolean => {
    if (!validator()) {
      setShouldScrollToError(true);
      router.navigate(route);
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateStepAndNavigate(validateStep1, "/step/recruitment/step1"))
      return;
    if (!validateStepAndNavigate(validateStep2, "/step/recruitment/step2"))
      return;
    if (!validateStepAndNavigate(validateStep3, "/step/recruitment/step3"))
      return;
    if (!validateStepAndNavigate(validateStep4, "/step/recruitment/step4"))
      return;
    if (!validateStep5()) return;

    submitRecruitment();
  };

  return (
    <RecruitmentStepLayout currentStep={5} stepTitle='추가 질문'>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className='flex-1'
      >
        <ScrollView
          ref={scrollViewRef}
          className='flex-1'
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          <View className='pt-4 px-3'>
            {editingId && (
              <View className='mb-4 px-4 py-3 bg-amber-50 rounded-xl flex-row items-start gap-2 border border-amber-200'>
                <Ionicons name='information-circle-outline' size={18} color='#d97706' style={{ marginTop: 1 }} />
                <Text className='flex-1 text-amber-700 text-sm leading-5'>
                  기존 질문은 수정할 수 없어요.{"\n"}새 질문만 추가할 수 있어요.
                </Text>
              </View>
            )}

            <QuestionSection
              questions={questions}
              existingQuestions={editingId ? existingQuestions : undefined}
              onAddQuestion={addQuestion}
              onDeleteQuestion={deleteQuestion}
              onUpdateQuestion={updateQuestion}
              onBlurQuestion={blurQuestion}
              onFocusQuestion={focusQuestion}
              canAddMore={canAddMore}
              errors={questionErrors}
            />

            <View className='flex-row gap-2 my-4'>
              <Button
                variant='gray'
                height={50}
                textColor='black'
                content='이전'
                onPress={() => router.push("/step/recruitment/step4")}
                className='flex-1'
              />
              <Button
                variant='primary'
                height={50}
                textColor='white'
                content={editingId ? '공고 수정하기' : '공고 등록하기'}
                onPress={handleSubmit}
                className='flex-1'
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </RecruitmentStepLayout>
  );
}
