import RecruitmentStepLayout from "@/app/step/recruitment/_components/RecruitmentStepLayout";
import { router } from "expo-router";
import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";

import Flex from "@/src/components/layout/Flex";
import Button from "@/src/components/ui/Button/Button";
import FormField from "@/src/components/ui/Form/FormField";
import FormSection from "@/src/components/ui/Form/FormSection";
import MultiImagePicker from "@/src/components/ui/imagePicker/MultiImagePicker";
import TextInput from "@/src/components/ui/TextInput";
import { useRecruitmentStep3Validation } from "@/src/hooks/recruitment/useRecruitmentStep3Validation";
import { useStepRecruitmentStore } from "@/src/stores/stepRecruitment/useStepRecruitmentStore";
import AppendableInputGroup from "../../../src/components/ui/Form/AppendableInputGroup";

export default function RecruitmentStep3() {
  const { step3Data, setStep3Update } = useStepRecruitmentStore();

  const { errors, clearError, validateForm } =
    useRecruitmentStep3Validation(step3Data);

  const handleNext = () => {
    if (validateForm()) {
      router.push("/step/recruitment/step4");
    }
  };

  return (
    <RecruitmentStepLayout currentStep={3} stepTitle='게스트하우스 소개'>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className='flex-1'
      >
        <ScrollView
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
                    placeholder='예: 제주 점박이 게스트하우스 스텝 모집'
                    error={!!errors.title}
                    maxLength={30}
                  />
                </FormField>

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
                    clearError={() => {
                      clearError("mainImageFiles");
                    }}
                  />
                </FormField>

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
                    placeholder='우리 게스트하우스를 소개해주세요'
                    error={!!errors.introduction}
                    multiline={true}
                    height={400}
                  />
                </FormField>

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
                    clearError={() => {
                      clearError("introImageFiles");
                    }}
                  />
                </FormField>
              </FormSection>

              <FormSection title='스텝 모집 정보'>
                <FormField
                  label='우대사항'
                  required={false}
                  description='최대 5개까지 등록할 수 있습니다'
                  errorMessage={errors.advantages}
                >
                  <AppendableInputGroup
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

                <FormField
                  label='복지'
                  required={false}
                  description='최대 5개까지 등록할 수 있습니다'
                  errorMessage={errors.employeeBenefits}
                >
                  <AppendableInputGroup
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
              </FormSection>

              <Button
                variant='primary'
                width={370}
                height={50}
                textColor='white'
                content='다음'
                onPress={handleNext}
              />
            </Flex>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </RecruitmentStepLayout>
  );
}
