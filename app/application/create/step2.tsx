import DismissKeyboardView from "@/src/components/layout/DismissKeyboardView";
import BackArrow from "@/src/components/ui/BackArrow";
import Button from "@/src/components/ui/Button";
import { useApplicationFormValidation } from "@/src/hooks/application/useApplicationFormValidation";
import { useSubmitApplication } from "@/src/hooks/application/useSubmitApplication";
import { useUploadImage } from "@/src/hooks/application/useUploadImage";
import { useApplicationStore } from "@/src/stores/slices /applicationSlice";
import { formatUpperCase } from "@/src/utils/common/upperCaseFormatter";
import { COLORS } from "@/src/utils/constants/colors";
import { setAccessToken } from "@/src/utils/Login/secureStore";
import { router } from "expo-router";
import { ScrollView, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateInputField from "../_components/DateInputField";
import DaySelector from "../_components/DaySelector";
import FormSection from "../_components/FormSection";
import ProgressBar from "../_components/ProgressBar";
import StyleSelector from "../_components/StyleSelector";
import TextInputField from "../_components/TextInputField";

export default function Step2Screen() {
  const { data, setUpdate, currentStep, goToPrevStep, imageFile } =
    useApplicationStore();

  const { errors, clearError, validateForm } = useApplicationFormValidation({
    data,
    imageFile,
    step: 2,
  });

  const uploadMutation = useUploadImage();
  const submitMutation = useSubmitApplication();

  const handleSubmit = async () => {
    if (validateForm()) {
      router.replace({
        pathname: "/application/create/result",
        params: { status: "pending" },
      });

      try {
        await uploadMutation.mutateAsync(imageFile);
        const latestData = useApplicationStore.getState().data;
        await submitMutation.mutateAsync(latestData);
        
        router.setParams({ status: "success" });
      } catch (e) {
        console.error(e);
        router.setParams({ status: "error" });
      }
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <DismissKeyboardView>
        <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
          <View className="p-2 flex-row gap-32">
            <BackArrow
              color="black"
              size={24}
              onPress={() => {
                goToPrevStep();
                router.back();
              }}
            ></BackArrow>
            <Text className="text-base ">지원서 작성</Text>
          </View>

          <ProgressBar
            stepTitle="자기소개"
            currentStep={currentStep}
            totalSteps={2}
          ></ProgressBar>

          <ScrollView className="bg-[#F9FAFB]">
            <View className="px-3 pt-4 pb-8">
              {/* 근무 일정 */}
              <FormSection title="근무 일정">
                <DateInputField
                  selectedDate={data.availableStartDate}
                  setSelectedDate={(date) => {
                    setUpdate("availableStartDate", date);
                    clearError("availableStartDate");
                  }}
                  label="근무 시작 가능일"
                  isRequired={true}
                  size={330}
                  minDate={new Date().toISOString().split("T")[0]}
                  align="right"
                  maxDate={undefined}
                  errorMessage={errors.availableStartDate}
                ></DateInputField>

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
                  label="근무가능요일"
                ></DaySelector>
              </FormSection>

              {/* 자기소개 */}
              <FormSection title="자기소개">
                <TextInputField
                  label="자기소개글"
                  value={data.selfIntroduction}
                  isRequired={true}
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
                  errorMessage={errors.selfIntroduction}
                ></TextInputField>

                <TextInputField
                  label="MBTI"
                  value={data.mbti}
                  isRequired={true}
                  onChangeText={(text) => {
                    setUpdate("mbti", formatUpperCase(text));
                    clearError("mbti");
                  }}
                  placeholder="예: ENFP"
                  autoCapitalize="characters"
                  maxLength={4}
                ></TextInputField>
              </FormSection>

              {/* 스타일 & 소셜 */}
              <FormSection title="스타일 & 소셜" gap={32}>
                <StyleSelector
                  label="나의 스타일"
                  selectedStyles={data.style}
                  setSelectedStyles={(action) => {
                    if (typeof action === "function") {
                      setUpdate("style", action(data.style));
                    } else {
                      setUpdate("style", action);
                    }
                  }}
                  size="30%"
                ></StyleSelector>

                <TextInputField
                  label="인스타그램 아이디"
                  value={data.instagramId}
                  isRequired={false}
                  onChangeText={(id) => {
                    setUpdate("instagramId", id);
                    clearError("instagramId");
                  }}
                  placeholder="@ username"
                  errorMessage={errors.instagramId}
                ></TextInputField>
              </FormSection>

              <View className="h-52"></View>

              <Button
                width={365}
                height={40}
                bgColor={COLORS.PRIMARY.BLUE}
                textColor="white"
                content="작성 완료"
                onPress={handleSubmit}
              ></Button>
            </View>
          </ScrollView>
        </SafeAreaView>
      </DismissKeyboardView>
    </>
  );
}
