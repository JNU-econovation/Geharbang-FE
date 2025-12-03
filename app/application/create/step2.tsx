import CustomSafeAreaView from "@/src/components/layout/CustomSafeAreaView";
import { router } from "expo-router";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";

import DismissKeyboardView from "@/src/components/layout/DismissKeyboardView";
import Flex from "@/src/components/layout/Flex/Flex";
import BackArrow from "@/src/components/ui/BackArrow";
import Button from "@/src/components/ui/Button/Button";
import FormField from "@/src/components/ui/Form/FormField";
import TextSize from "@/src/components/ui/TextSize";
import { useApplicationFormValidation } from "@/src/hooks/application/create/useApplicationFormValidation";
import { useHandleCreate } from "@/src/hooks/application/create/useHandleCreate";
import { usePreventHardwareBack } from "@/src/hooks/common/usePreventHardwareBack";
import { useApplicationSlice } from "@/src/stores/slices/useApplicationSlice";
import { formatUpperCase } from "@/src/utils/common/upperCaseFormatter";
import FormSection from "../../../src/components/ui/Form/FormSection";
import ProgressBar from "../../../src/components/ui/Form/ProgressBar";
import TextInput from "../../../src/components/ui/TextInput";
import DateInput from "../_components/DateInput";
import DaySelector from "../_components/DaySelector";
import StyleSelector from "../_components/StyleSelector";

export default function Step2Screen() {
  const { data, setUpdate, currentStep, goToPrevStep, imageFile } =
    useApplicationSlice();

  const { errors, clearError } = useApplicationFormValidation({
    data,
    imageFile,
    step: 2,
  });

  usePreventHardwareBack(); // 안드로이드 하드웨어 뒤로가기 방지

  const handleCreate = useHandleCreate();

  return (
    <DismissKeyboardView>
      <CustomSafeAreaView pageColor='bg-white'>
        <View className='p-3'>
          <Flex justify='start' items='center' dir='row' gap={124}>
            <BackArrow
              color='black'
              size={24}
              onPress={() => {
                goToPrevStep();
                router.back();
              }}
            />
            <TextSize size={18} content='지원서 작성' />
          </Flex>
        </View>

        <ProgressBar
          stepTitle='자기소개'
          currentStep={currentStep}
          totalSteps={2}
        />

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={0}
        >
          <ScrollView className='bg-[#F9FAFB]'>
            <View className='pt-4 px-3'>
              <Flex justify='start' items='center' gap={24}>
                {/* 근무 일정 */}
                <FormSection title='근무 일정'>
                  <FormField
                    label='근무 시작 가능일'
                    required={true}
                    errorMessage={errors.availableStartDate}
                  >
                    <DateInput
                      selectedDate={data.availableStartDate}
                      setSelectedDate={(date) => {
                        setUpdate("availableStartDate", date);
                        clearError("availableStartDate");
                      }}
                      minDate={String(new Date())}
                      error={!!errors.availableStartDate}
                    />
                  </FormField>

                  <FormField label='근무 가능 요일' required={false}>
                    <DaySelector
                      selectedDays={data.availableDayOfWeek}
                      setSelectedDays={(action) => {
                        if (typeof action === "function") {
                          setUpdate(
                            "availableDayOfWeek",
                            action(data.availableDayOfWeek)
                          );
                        } else {
                          setUpdate("availableDayOfWeek", action);
                        }
                      }}
                    />
                  </FormField>
                </FormSection>

                {/* 자기소개 */}
                <FormSection title='자기소개'>
                  <FormField
                    label='자기소개글'
                    required={true}
                    errorMessage={errors.selfIntroduction}
                  >
                    <TextInput
                      value={data.selfIntroduction}
                      onChangeText={(text) => {
                        setUpdate("selfIntroduction", text);
                        clearError("selfIntroduction");
                      }}
                      placeholder={
                        "본인을 소개해주세요.\n성격, 경험, 장점 등을 자유롭게 적어주세요"
                      }
                      multiline={true}
                      lineHeight={22}
                      height={150}
                      error={!!errors.selfIntroduction}
                    />
                  </FormField>

                  <FormField
                    label='MBTI'
                    required={true}
                    errorMessage={errors.mbti}
                  >
                    <TextInput
                      value={data.mbti}
                      onChangeText={(text) => {
                        setUpdate("mbti", formatUpperCase(text));
                        clearError("mbti");
                      }}
                      placeholder='예: ENFP'
                      autoCapitalize='characters'
                      maxLength={4}
                      error={!!errors.mbti}
                    />
                  </FormField>
                </FormSection>

                {/* 스타일 & 소셜 */}
                <FormSection title='스타일 & 소셜' gap={22}>
                  <FormField label='나의 스타일' required={false}>
                    <StyleSelector
                      selectedStyles={data.style}
                      setSelectedStyles={(action) => {
                        if (typeof action === "function") {
                          setUpdate("style", action(data.style));
                        } else {
                          setUpdate("style", action);
                        }
                      }}
                      size='32%'
                    />
                  </FormField>

                  <FormField
                    label='인스타그램 아이디'
                    required={false}
                    errorMessage={errors.instagramId}
                  >
                    <TextInput
                      value={data.instagramId}
                      onChangeText={(id) => {
                        setUpdate("instagramId", id);
                        clearError("instagramId");
                      }}
                      placeholder='@ username'
                      error={!!errors.instagramId}
                    />
                  </FormField>
                </FormSection>

                <Button
                  variant='primary'
                  width={370}
                  height={50}
                  textColor='white'
                  content='작성 완료'
                  onPress={handleCreate}
                />
              </Flex>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </CustomSafeAreaView>
    </DismissKeyboardView>
  );
}
