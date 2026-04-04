import QuestionSection from "@/app/step/recruitment/_components/QuestionSection";
import RecruitmentStepLayout from "@/app/step/recruitment/_components/RecruitmentStepLayout";
import Button from "@/src/components/ui/Button/Button";
import { useHandleStepRecruitmentSubmit } from "@/src/hooks/stepRecruitment/useHandleStepRecruitmentSubmit";
import { useStep1Validation } from "@/src/hooks/stepRecruitment/useStep1Validation";
import { useStep2Validation } from "@/src/hooks/stepRecruitment/useStep2Validation";
import { useStep3Validation } from "@/src/hooks/stepRecruitment/useStep3Validation";
import { useStep4Validation } from "@/src/hooks/stepRecruitment/useStep4Validation";
import { useStepRecruitmentStore } from "@/src/stores/stepRecruitment/useStepRecruitmentStore";
import { Href, router } from "expo-router";
import { useRef } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
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
    removeStep5Question(id);
  };

  const updateQuestion = (id: string, text: string) => {
    updateStep5Question(id, text);
  };

  const canAddMore = questions.length < 5;

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
            <QuestionSection
              questions={questions}
              onAddQuestion={addQuestion}
              onDeleteQuestion={deleteQuestion}
              onUpdateQuestion={updateQuestion}
              canAddMore={canAddMore}
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
                content='공고 등록하기'
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
