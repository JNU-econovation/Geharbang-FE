import RecruitmentStepLayout from "@/app/step/recruitment/_components/RecruitmentStepLayout";
import { router } from "expo-router";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";

import Flex from "@/src/components/layout/Flex";
import Button from "@/src/components/ui/Button/Button";
import FormField from "@/src/components/ui/Form/FormField";
import FormSection from "@/src/components/ui/Form/FormSection";
import MultiImagePicker from "@/src/components/ui/imagePicker/MultiImagePicker";
import TextInput from "@/src/components/ui/TextInput";
import { useRecruitmentStep3Validation } from "@/src/hooks/recruitment/useRecruitmentStep3Validation";
import { File } from "@/src/types/File";
import { Feature } from "@/src/types/models/stepRecruitment/Feature";
import AppendableInputGroup from "../../../src/components/ui/Form/AppendableInputGroup";

export default function RecruitmentStep3() {
  const [title, setTitle] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [mainImageFiles, setMainImageFiles] = useState<File[]>([]);
  const [introImageFiles, setIntroImageFiles] = useState<File[]>([]);
  const [advantages, setAdvantages] = useState<Feature[]>([]);
  const [employeeBenefits, setEmployeeBenefits] = useState<Feature[]>([]);

  const { errors, clearError, validateForm } = useRecruitmentStep3Validation({
    title,
    mainImageFiles,
    introduction,
    introImageFiles,
    advantages,
    employeeBenefits,
  });

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
                    value={title}
                    onChangeText={(text) => {
                      setTitle(text);
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
                    selectedImageFiles={mainImageFiles}
                    setSelectedImageFiles={setMainImageFiles}
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
                    value={introduction}
                    onChangeText={(text) => {
                      setIntroduction(text);
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
                    selectedImageFiles={introImageFiles}
                    setSelectedImageFiles={setIntroImageFiles}
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
                    features={advantages}
                    setFeatures={setAdvantages}
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
                    features={employeeBenefits}
                    setFeatures={setEmployeeBenefits}
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
