import RecruitmentStepLayout from "@/app/step/recruitment/_components/RecruitmentStepLayout";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useRef } from "react";
import {
  Alert,
  BackHandler,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";

import Flex from "@/src/components/layout/Flex";
import Button from "@/src/components/ui/Button/Button";
import AppendableInputGroupContainer from "@/src/components/ui/Form/AppendableInputGroupContainer";
import FormField from "@/src/components/ui/Form/FormField";
import FormSection from "@/src/components/ui/Form/FormSection";
import MultiImagePicker from "@/src/components/ui/imagePicker/MultiImagePicker";
import TextInput from "@/src/components/ui/TextInput";
import { useStep3Validation } from "@/src/hooks/stepRecruitment/useStep3Validation";
import { useStepRecruitmentStore } from "@/src/stores/stepRecruitment/useStepRecruitmentStore";

export default function RecruitmentStep3() {
  const {
    step3Data,
    setStep3Update,
    resetAllData,
    shouldScrollToError,
    setShouldScrollToError,
  } = useStepRecruitmentStore();

  const scrollViewRef = useRef<ScrollView>(null);
  const titleRef = useRef<View>(null);
  const mainImageFilesRef = useRef<View>(null);
  const introductionRef = useRef<View>(null);
  const introImageFilesRef = useRef<View>(null);
  const advantagesRef = useRef<View>(null);
  const employeeBenefitsRef = useRef<View>(null);

  const fieldRefMap = {
    title: titleRef,
    mainImageFiles: mainImageFilesRef,
    introduction: introductionRef,
    introImageFiles: introImageFilesRef,
    advantages: advantagesRef,
    employeeBenefits: employeeBenefitsRef,
  } as const;

  const { errors, clearError, validateForm, validateField } =
    useStep3Validation(step3Data);

  const errorsRef = useRef(errors);
  errorsRef.current = errors;

  const validateFormRef = useRef(validateForm);
  validateFormRef.current = validateForm;

  const validateFieldRef = useRef(validateField);
  validateFieldRef.current = validateField;

  const step3DataRef = useRef(step3Data);
  step3DataRef.current = step3Data;

  const handleBackPress = useCallback(() => {
    Alert.alert(
      "등록 취소",
      "스텝 모집 등록을 취소하시겠습니까?\n입력한 정보가 모두 사라집니다.",
      [
        { text: "계속 작성", style: "cancel" },
        {
          text: "취소",
          style: "destructive",
          onPress: () => {
            resetAllData();
            router.replace("/");
          },
        },
      ],
    );
    return true;
  }, [resetAllData]);

  useFocusEffect(
    useCallback(() => {
      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        handleBackPress,
      );
      return () => subscription.remove();
    }, [handleBackPress]),
  );

  useFocusEffect(
    useCallback(() => {
      if (shouldScrollToError) {
        validateFormRef.current();
        setTimeout(() => {
          const fieldOrder = [
            "title",
            "mainImageFiles",
            "introduction",
            "introImageFiles",
            "advantages",
            "employeeBenefits",
          ] as const;
          const firstErrField = fieldOrder.find((k) => !!errorsRef.current[k]);
          const targetRef = firstErrField ? fieldRefMap[firstErrField] : null;
          if (targetRef?.current && scrollViewRef.current) {
            targetRef.current.measureLayout(
              scrollViewRef.current as any,
              (_x: number, y: number) =>
                scrollViewRef.current?.scrollTo({
                  y: Math.max(0, y - 16),
                  animated: true,
                }),
              () => scrollViewRef.current?.scrollTo({ y: 0, animated: true }),
            );
          } else {
            scrollViewRef.current?.scrollTo({ y: 0, animated: true });
          }
        }, 100);
        return;
      }
      if (step3DataRef.current.title) validateFieldRef.current("title");
      if (step3DataRef.current.introduction)
        validateFieldRef.current("introduction");
    }, [shouldScrollToError]),
  );

  return (
    <RecruitmentStepLayout
      currentStep={3}
      stepTitle='게스트하우스 소개'
      onBackPress={handleBackPress}
    >
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
            <Flex justify='start' items='center' gap={24}>
              <FormSection
                title='게스트하우스 소개'
                description='우리 게스트하우스만의 특별한 이야기를 들려주세요'
              >
                <View ref={titleRef}>
                  <FormField
                    label='공고글 제목'
                    required={true}
                    errorMessage={errors.title}
                  >
                    <TextInput
                      value={step3Data.title}
                      onChangeText={(text) => {
                        setStep3Update("title", text);
                        clearError("title");
                      }}
                      onBlur={() => validateField("title")}
                      onFocus={() => clearError("title")}
                      placeholder='예: 제주 점박이 게스트하우스 스텝 모집'
                      error={!!errors.title}
                      maxLength={30}
                    />
                  </FormField>
                </View>

                <View ref={mainImageFilesRef}>
                  <FormField
                    label='게스트하우스 대표 사진'
                    required={true}
                    description='최대 10장까지 등록할 수 있습니다'
                    errorMessage={errors.mainImageFiles}
                  >
                    <MultiImagePicker
                      selectedImageFiles={step3Data.mainImageFiles}
                      setSelectedImageFiles={(files) =>
                        setStep3Update("mainImageFiles", files)
                      }
                      maxCount={10}
                      error={!!errors.mainImageFiles}
                      clearError={() => clearError("mainImageFiles")}
                    />
                  </FormField>
                </View>

                <View ref={introductionRef}>
                  <FormField
                    label='소개글'
                    required={true}
                    errorMessage={errors.introduction}
                  >
                    <TextInput
                      value={step3Data.introduction}
                      onChangeText={(text) => {
                        setStep3Update("introduction", text);
                        clearError("introduction");
                      }}
                      onBlur={() => validateField("introduction")}
                      onFocus={() => clearError("introduction")}
                      placeholder='우리 게스트하우스를 소개해주세요'
                      error={!!errors.introduction}
                      multiline={true}
                      height={400}
                      textAlignVertical='top'
                    />
                  </FormField>
                </View>

                <View ref={introImageFilesRef}>
                  <FormField
                    label='게스트하우스 소개 사진'
                    required={true}
                    description='최대 10장까지 등록할 수 있습니다'
                    errorMessage={errors.introImageFiles}
                  >
                    <MultiImagePicker
                      selectedImageFiles={step3Data.introImageFiles}
                      setSelectedImageFiles={(files) =>
                        setStep3Update("introImageFiles", files)
                      }
                      maxCount={10}
                      error={!!errors.introImageFiles}
                      clearError={() => clearError("introImageFiles")}
                    />
                  </FormField>
                </View>
              </FormSection>

              <FormSection title='스텝 모집 정보'>
                <View ref={advantagesRef}>
                  <FormField
                    label='우대사항'
                    required={false}
                    description='최대 5개까지 등록할 수 있습니다'
                    errorMessage={errors.advantages}
                  >
                    <AppendableInputGroupContainer
                      features={step3Data.advantages}
                      setFeatures={(features) =>
                        setStep3Update("advantages", features)
                      }
                      maxLimit={5}
                      buttonLabel='우대사항 추가'
                      placeholder='예: 운전 가능자'
                      error={!!errors.advantages}
                      clearError={() => clearError("advantages")}
                    />
                  </FormField>
                </View>

                <View ref={employeeBenefitsRef}>
                  <FormField
                    label='복지'
                    required={false}
                    description='최대 5개까지 등록할 수 있습니다'
                    errorMessage={errors.employeeBenefits}
                  >
                    <AppendableInputGroupContainer
                      features={step3Data.employeeBenefits}
                      setFeatures={(features) =>
                        setStep3Update("employeeBenefits", features)
                      }
                      maxLimit={5}
                      buttonLabel='복지 추가'
                      placeholder='예: 숙식 제공'
                      error={!!errors.employeeBenefits}
                      clearError={() => clearError("employeeBenefits")}
                    />
                  </FormField>
                </View>
              </FormSection>
            </Flex>

            <View className='flex-row gap-2 my-4'>
              <Button
                variant='gray'
                height={50}
                textColor='black'
                content='이전'
                onPress={() => router.push("/step/recruitment/step2")}
                className='flex-1'
              />
              <Button
                variant='primary'
                height={50}
                textColor='white'
                content='다음'
                onPress={() => router.push("/step/recruitment/step4")}
                className='flex-1'
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </RecruitmentStepLayout>
  );
}
