import DismissKeyboardView from "@/src/components/layout/DismissKeyboardView";
import BackArrow from "@/src/components/ui/BackArrow";
import Button from "@/src/components/ui/Button";
import ImagePicker from "@/src/components/ui/ImagePicker";
import { useApplicationFormValidation } from "@/src/hooks/application/useApplicationFormValidation";
import { useApplicationStore } from "@/src/stores/slices /applicationSlice";
import { formatPhoneNumber } from "@/src/utils/common/phoneNumberFormatter";
import { COLORS } from "@/src/utils/constants/colors";
import { GENDER_BASIC } from "@/src/utils/constants/options";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateInputField from "../_components/DateInputField";
import FormSection from "../_components/FormSection";
import GenderSelector from "../_components/GenderSelector";
import ProgressBar from "../_components/ProgressBar";
import TextInputField from "../_components/TextInputField";

export default function CreateCrewScreen() {
  
  const {
    data, // 전역 값
    setUpdate,
    currentStep,
    goToNextStep,
    resetData,
    imageFile,
    setImageFile
  } = useApplicationStore();

  useEffect(() => {
    resetData();
  }, [resetData]);

  const { errors, clearError, validateForm } = useApplicationFormValidation({
    data,
    imageFile,
    step: 1,
  });

  const handleNext = () => {
    if (validateForm()) {
      router.push("/application/create/step2");
      goToNextStep();
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <DismissKeyboardView>
        <SafeAreaView className="flex-1 bg-white">
          <View className="p-2 flex-row gap-32">
            <BackArrow
              color="black"
              size={24}
            ></BackArrow>
            <Text className="text-base ">지원서 작성</Text>
          </View>
          <ProgressBar
            stepTitle="기본정보"
            currentStep={currentStep}
            totalSteps={2}
          ></ProgressBar>

          <ScrollView>
            <View className="px-3 pt-4 bg-[#F9FAFB] relative">
              {/* 대표 사진 */}
              <FormSection title="대표사진">
                <ImagePicker
                  selectedImageFile={imageFile}
                  setSelectedImageFile={(file) => {
                    setImageFile(file);
                    if (file) clearError("image");
                  }}
                  size={100}
                  errorMessage={errors.image}
                ></ImagePicker>
              </FormSection>

              {/* 개인정보 */}
              <FormSection title="개인정보">
                <TextInputField
                  label="이름"
                  value={data.name}
                  isRequired={true}
                  onChangeText={(text) => {
                    setUpdate("name", text);
                    clearError("name");
                  }}
                  placeholder="이름을 입력하세요"
                  errorMessage={errors.name}
                ></TextInputField>

                <TextInputField
                  label="전화번호"
                  value={data.phoneNumber}
                  isRequired={true}
                  onChangeText={(phoneNumber) => {
                    setUpdate("phoneNumber", formatPhoneNumber(phoneNumber));
                    clearError("phoneNumber");
                  }}
                  placeholder="010-0000-0000"
                  keyboardType="numeric"
                  maxLength={13}
                  errorMessage={errors.phoneNumber}
                ></TextInputField>

                <DateInputField
                  selectedDate={data.birthDate}
                  setSelectedDate={(date) => {
                    setUpdate("birthDate", date);
                    clearError("birthDate");
                  }}
                  label="생일"
                  isRequired={true}
                  size={330}
                  align="center"
                  maxDate={new Date().toISOString().split("T")[0]}
                  errorMessage={errors.birthDate}
                ></DateInputField>

                <GenderSelector
                  label="성별"
                  size="45%"
                  option={GENDER_BASIC}
                  isRequired={true}
                  selectedGender={data.gender}
                  setSelectedGender={(gender) => {
                    setUpdate("gender", gender);
                    clearError("gender");
                  }}
                  errorMessage={errors.gender}
                ></GenderSelector>
              </FormSection>

              <Button
                width={365}
                height={40}
                bgColor={COLORS.PRIMARY.BLUE}
                textColor="white"
                content="다음"
                onPress={handleNext}
              ></Button>
            </View>
          </ScrollView>
        </SafeAreaView>
      </DismissKeyboardView>
    </>
  );
}
