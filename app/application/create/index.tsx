import { router } from "expo-router";
import { useEffect } from "react";
import { ScrollView, StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import DismissKeyboardView from "@/src/components/layout/DismissKeyboardView";
import Flex from "@/src/components/layout/Flex/Flex";
import BackArrow from "@/src/components/ui/BackArrow";
import Button from "@/src/components/ui/Button/Button";
import ImagePicker from "@/src/components/ui/ImagePicker";
import TextSize from "@/src/components/ui/TextSize";
import { useApplicationFormValidation } from "@/src/hooks/application/create/useApplicationFormValidation";
import { useApplicationSlice } from "@/src/stores/slices/useApplicationSlice";
import { formatPhoneNumber } from "@/src/utils/common/phoneNumberFormatter";
import { GENDER_BASIC } from "@/src/utils/constants/options";
import TextInput from "../../../src/components/ui/TextInput";
import DateInput from "../_components/DateInput";
import FormField from "../_components/FormField";
import FormSection from "../_components/FormSection";
import GenderSelector from "../_components/GenderSelector";
import ProgressBar from "../_components/ProgressBar";

export default function applicationCreate() {
  const {
    data,
    setUpdate,
    currentStep,
    goToNextStep,
    resetData,
    imageFile,
    setImageFile,
  } = useApplicationSlice();

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
      <StatusBar barStyle='dark-content' />
      <DismissKeyboardView>
        <SafeAreaView className='flex-1 bg-white'>
          <View className='p-3'>
            <Flex justify='start' items='center' dir='row' gap={80}>
              <BackArrow color='black' size={24} />
              <TextSize size={18} content='지원서 작성' />
            </Flex>
          </View>

          <ProgressBar
            stepTitle='기본정보'
            currentStep={currentStep}
            totalSteps={2}
          />

          <ScrollView className='bg-[#F9FAFB]'>
            <View className='pt-4 px-3 '>
              <Flex justify='start' items='center' gap={24}>
                {/* 대표 사진 */}
                <FormSection title='대표사진'>
                  <FormField label='' errorMessage={errors.image}>
                    <ImagePicker
                      selectedImageFile={imageFile}
                      setSelectedImageFile={(file) => {
                        setImageFile(file);
                        if (file) clearError("image");
                      }}
                      error={!!errors.image}
                    />
                  </FormField>
                </FormSection>

                {/* 개인정보 */}
                <FormSection title='개인정보'>
                  <FormField
                    label='이름'
                    required={true}
                    errorMessage={errors.name}
                  >
                    <TextInput
                      value={data.name}
                      onChangeText={(text) => {
                        setUpdate("name", text);
                        clearError("name");
                      }}
                      placeholder='이름을 입력하세요'
                      error={!!errors.name}
                    />
                  </FormField>

                  <FormField
                    label='전화번호'
                    required={true}
                    errorMessage={errors.phoneNumber}
                  >
                    <TextInput
                      value={data.phoneNumber}
                      onChangeText={(phoneNumber) => {
                        setUpdate(
                          "phoneNumber",
                          formatPhoneNumber(phoneNumber)
                        );
                        clearError("phoneNumber");
                      }}
                      placeholder='010-0000-0000'
                      keyboardType='numeric'
                      maxLength={13}
                      error={!!errors.phoneNumber}
                    />
                  </FormField>

                  <FormField
                    label='생년월일'
                    required={true}
                    errorMessage={errors.birthDate}
                  >
                    <DateInput
                      selectedDate={data.birthDate}
                      setSelectedDate={(date) => {
                        setUpdate("birthDate", date);
                        clearError("birthDate");
                      }}
                      maxDate={String(new Date())}
                      error={!!errors.birthDate}
                    />
                  </FormField>

                  <FormField
                    label='성별'
                    required={true}
                    errorMessage={errors.gender}
                  >
                    <GenderSelector
                      size='45%'
                      option={GENDER_BASIC}
                      selectedGender={data.gender}
                      setSelectedGender={(gender) => {
                        setUpdate("gender", gender);
                        clearError("gender");
                      }}
                      error={!!errors.gender}
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
        </SafeAreaView>
      </DismissKeyboardView>
    </>
  );
}
