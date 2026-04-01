import { router } from "expo-router";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";

import Flex from "@/src/components/layout/Flex";
import Button from "@/src/components/ui/Button/Button";
import FormField from "@/src/components/ui/Form/FormField";
import FormSection from "@/src/components/ui/Form/FormSection";
import TextInput from "@/src/components/ui/TextInput";
import { useGuestHouseEnrollment } from "@/src/hooks/guestHouse/useGuestHouseEnrollment";
import { useGuestHouseStep5Validation } from "@/src/hooks/guestHouse/useGuestHouseStep5Validation";
import { useGuestHouseStore } from "@/src/stores/guestHouse/useGuestHouseStore";
import { formatPhoneNumber } from "@/src/utils/common/phoneNumberFormatter";
import {
  BUTTON_LABELS,
  INPUT_HEIGHTS,
  INPUT_MAX_LENGTHS,
  PLACEHOLDERS,
} from "@/src/utils/constants/guestHouseEnrollment";
import GuestHouseEnrollLayout from "./_components/GuestHouseEnrollLayout";

export default function GuestHouseEnrollStep5() {
  const { step1Data, step2Data, step3Data, step4Data, step5Data, setStep5Update } =
    useGuestHouseStore();
  const { instagram, phone, website, ownerMessage } = step5Data;

  const { errors, clearError, validateForm } = useGuestHouseStep5Validation({
    instagram,
    phone,
    website,
    ownerMessage,
  });

  const { mutateAsync: enrollGuestHouse, isPending } =
    useGuestHouseEnrollment();

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const enrollData = {
      guestHouseName: step1Data.guestHouseName,
      workingRegion: step1Data.workingRegion,
      location: step1Data.location,

      mainImages: step2Data.mainImages,
      introduction: step2Data.introduction,
      facilities: step2Data.facilities,
      atmosphere: step2Data.atmosphere,
      parties: step3Data.parties,

      rooms: step4Data.rooms,

      instagram,
      phone,
      website,
      ownerMessage,
    };

    try {
      const guestHouseId = await enrollGuestHouse(enrollData);

      if (guestHouseId) {
        router.push({
          pathname: "/guestHouse/enroll/result",
          params: { status: "success", guestHouseId: guestHouseId.toString() },
        });
      }
    } catch (error) {
      console.error("Enrollment Failed", error);

      let userFriendlyMessage = "등록 중 오류가 발생했습니다.";

      if (error instanceof Error) {
        if (error.message.includes("이미지")) {
          userFriendlyMessage = error.message;
        } else if (error.message.includes("네트워크")) {
          userFriendlyMessage = "네트워크 연결을 확인하고 다시 시도해주세요.";
        } else if (error.message.includes("유효한 숫자")) {
          userFriendlyMessage = "입력 정보를 다시 확인해주세요.";
        } else {
          userFriendlyMessage =
            "등록 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
        }
      }

      router.push({
        pathname: "/guestHouse/enroll/result",
        params: {
          status: "error",
          error: userFriendlyMessage,
        },
      });
    }
  };

  return (
    <GuestHouseEnrollLayout currentStep={5} stepTitle='연락처 및 사장님 한마디'>
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
              <FormSection title='연락처 및 사장님 한마디'>
                <FormField
                  label='인스타그램'
                  required={false}
                  errorMessage={errors.instagram}
                >
                  <TextInput
                    value={instagram}
                    onChangeText={(text) => {
                      setStep5Update("instagram", text);
                      clearError("instagram");
                    }}
                    placeholder={PLACEHOLDERS.INSTAGRAM}
                    error={!!errors.instagram}
                    maxLength={INPUT_MAX_LENGTHS.INSTAGRAM}
                  />
                </FormField>

                <FormField
                  label='전화번호'
                  required={false}
                  errorMessage={errors.phone}
                >
                  <TextInput
                    value={phone}
                    onChangeText={(text) => {
                      setStep5Update("phone", formatPhoneNumber(text));
                      clearError("phone");
                    }}
                    placeholder={PLACEHOLDERS.PHONE}
                    keyboardType='phone-pad'
                    error={!!errors.phone}
                    maxLength={INPUT_MAX_LENGTHS.PHONE}
                  />
                </FormField>

                <FormField
                  label='웹사이트'
                  required={false}
                  errorMessage={errors.website}
                >
                  <TextInput
                    value={website}
                    onChangeText={(text) => {
                      setStep5Update("website", text);
                      clearError("website");
                    }}
                    placeholder={PLACEHOLDERS.WEBSITE}
                    keyboardType='url'
                    error={!!errors.website}
                    maxLength={INPUT_MAX_LENGTHS.WEBSITE}
                  />
                </FormField>

                <FormField
                  label='사장님 한마디'
                  required={false}
                  errorMessage={errors.ownerMessage}
                >
                  <TextInput
                    value={ownerMessage}
                    onChangeText={(text) => {
                      setStep5Update("ownerMessage", text);
                      clearError("ownerMessage");
                    }}
                    placeholder={PLACEHOLDERS.OWNER_MESSAGE}
                    multiline={true}
                    height={INPUT_HEIGHTS.OWNER_MESSAGE}
                    error={!!errors.ownerMessage}
                    maxLength={INPUT_MAX_LENGTHS.OWNER_MESSAGE}
                  />
                </FormField>
              </FormSection>

              <Flex items='center'>
                <Button
                  variant='primary'
                  width={370}
                  height={50}
                  textColor='white'
                  content={isPending ? "등록 중..." : BUTTON_LABELS.SUBMIT}
                  onPress={handleSubmit}
                  disabled={isPending}
                  className='mt-4'
                />
              </Flex>
            </Flex>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </GuestHouseEnrollLayout>
  );
}
