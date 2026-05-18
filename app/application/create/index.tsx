import { router, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, ScrollView, View } from "react-native";

import CustomSafeAreaView from "@/src/components/layout/CustomSafeAreaView";
import DismissKeyboardView from "@/src/components/layout/DismissKeyboardView";
import Flex from "@/src/components/layout/Flex/Flex";
import BackArrow from "@/src/components/ui/BackArrow";
import Button from "@/src/components/ui/Button/Button";
import FormField from "@/src/components/ui/Form/FormField";

import SingleImagePicker from "@/src/components/ui/imagePicker/SingleImagePicker";
import OptionSelector from "@/src/components/ui/OptionSelector";
import TextSize from "@/src/components/ui/TextSize";
import { COLORS } from "@/src/utils/constants/colors";
import { useApplicationSlice } from "@/src/stores/application/useApplicationSlice";
import { Gender } from "@/src/types/Gender";
import { formatPhoneNumber } from "@/src/utils/common/phoneNumberFormatter";
import { GENDER_BASIC } from "@/src/utils/constants/options";

import { useApplicationFormValidation } from "@/src/hooks/application/create/useApplicationFormValidation";
import { usePreFillApplication } from "@/src/hooks/application/create/usePreFillApplication";
import FormSection from "../../../src/components/ui/Form/FormSection";
import ProgressBar from "../../../src/components/ui/Form/ProgressBar";
import TextInput from "../../../src/components/ui/TextInput";
import DateInput from "../_components/DateInput";

export default function applicationCreate() {
  const { mode } = useLocalSearchParams<{ mode?: string }>();
  const isEditMode = mode === "edit";

  const { isPreFilling } = usePreFillApplication(isEditMode);

  const {
    data: applicationData,
    setUpdate: setApplicationData,
    imageFile,
    setImageFile,
  } = useApplicationSlice();

  const { errors, clearError, validateForm } = useApplicationFormValidation(
    applicationData,
    imageFile,
    1
  );

  const handleNext = () => {
    if (validateForm()) {
      router.push({
        pathname: "/application/create/step2",
        params: { mode },
      });
    }
  };

  return (
    <CustomSafeAreaView pageColor='bg-white'>
      <View className='p-3'>
        <Flex justify='start' items='center' dir='row' gap={124}>
          <BackArrow color='black' size={24} />
          <TextSize size={18} content={isEditMode ? "지원서 수정" : "지원서 작성"} />
        </Flex>
      </View>

      <ProgressBar stepTitle='기본정보' currentStep={1} totalSteps={2} />

      {isPreFilling ? (
        <View className='flex-1 justify-center items-center'>
          <ActivityIndicator size={60} color={COLORS.PRIMARY.BLUE} />
        </View>
      ) : <ScrollView className='bg-[#F9FAFB]'>
        <DismissKeyboardView>
          <View className='pt-4 px-3 '>
            <Flex justify='start' items='center' gap={24}>
              {/* 대표 사진 */}
              <FormSection title='대표사진'>
                <FormField label='' errorMessage={errors.image}>
                  <SingleImagePicker
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
                    value={applicationData.name}
                    onChangeText={(text) => {
                      setApplicationData("name", text);
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
                    value={applicationData.phoneNumber}
                    onChangeText={(phoneNumber) => {
                      setApplicationData(
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
                    selectedDate={applicationData.birthDate}
                    setSelectedDate={(date) => {
                      setApplicationData("birthDate", date);
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
                  <OptionSelector<Gender>
                    size='45%'
                    option={GENDER_BASIC}
                    selected={applicationData.gender}
                    setSelected={(gender) => {
                      setApplicationData("gender", gender);
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
        </DismissKeyboardView>
      </ScrollView>}
    </CustomSafeAreaView>
  );
}
